import { NextResponse } from "next/server";
import { getSupabaseEnvStatus } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = getSupabaseEnvStatus();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!env.projectUrl || !anonKey) {
    return NextResponse.json(
      {
        ok: false,
        status: "missing_env",
        message: "Supabase URL or anon key is missing.",
        env
      },
      { status: 200 }
    );
  }

  const startedAt = performance.now();

  try {
    const healthUrl = new URL("/auth/v1/health", env.projectUrl);
    const response = await fetch(healthUrl, {
      headers: {
        apikey: anonKey
      },
      cache: "no-store"
    });

    const latencyMs = Math.round(performance.now() - startedAt);
    const keyStatus = getAnonKeyStatus(anonKey);
    const ok = response.ok && keyStatus.ok;

    return NextResponse.json({
      ok,
      status: ok ? "connected" : "request_failed",
      httpStatus: response.status,
      latencyMs,
      projectUrl: env.projectUrl,
      keyStatus,
      message: ok
        ? "Supabase project is reachable and the anon key is configured."
        : buildFailureMessage(response.ok, keyStatus.ok)
    });
  } catch (error) {
    const latencyMs = Math.round(performance.now() - startedAt);

    return NextResponse.json({
      ok: false,
      status: "network_error",
      latencyMs,
      projectUrl: env.projectUrl,
      message: error instanceof Error ? error.message : "Unknown Supabase connection error."
    });
  }
}

function getAnonKeyStatus(anonKey: string) {
  const parts = anonKey.split(".");

  if (parts.length !== 3) {
    return {
      ok: false,
      message: "Anon key is not a JWT."
    };
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as {
      role?: string;
      exp?: number;
    };

    const expiresAt = payload.exp ? payload.exp * 1000 : null;
    const isExpired = expiresAt ? Date.now() > expiresAt : false;

    return {
      ok: payload.role === "anon" && !isExpired,
      role: payload.role ?? "unknown",
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      message:
        payload.role === "anon" && !isExpired
          ? "Anon key has a valid shape."
          : "Anon key is missing the anon role or is expired."
    };
  } catch {
    return {
      ok: false,
      message: "Anon key payload could not be decoded."
    };
  }
}

function buildFailureMessage(projectReachable: boolean, keyLooksValid: boolean) {
  if (!projectReachable) {
    return "Supabase project did not return a healthy response.";
  }

  if (!keyLooksValid) {
    return "Supabase is reachable, but the anon key does not look valid.";
  }

  return "Supabase responded, but the connection check did not pass.";
}
