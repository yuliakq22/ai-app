import { Card } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Profile</h1>
      <p className="mt-3 text-muted-foreground">
        Supabase Auth is staying as the auth layer. These settings are UI placeholders until profile
        persistence is connected.
      </p>

      <div className="mt-8 space-y-5">
        <Card className="p-5">
          <h2 className="font-semibold">Account</h2>
          <div className="mt-5 space-y-3 text-sm">
            <InfoRow label="Name" value="Not set" />
            <InfoRow label="Preferred framework" value="No default" />
            <InfoRow label="Daily reminder" value="Off" />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Data</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Once sessions are persisted, this page should include export and delete-account flows.
          </p>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/60 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
