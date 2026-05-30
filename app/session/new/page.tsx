import { MessageCircleHeart, PanelRightClose } from 'lucide-react';

import { Card } from '@/components/ui/card';

export default function NewSessionPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-5 px-4 py-6 pb-28 lg:grid-cols-[1fr_340px]">
      <Card className="flex min-h-[72vh] flex-col overflow-hidden bg-background/62 shadow-soft">
        <div className="border-b bg-card/72 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">New coaching session</p>
              <h1 className="text-xl font-semibold">Untitled reflection</h1>
            </div>
            <button className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
              End session
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="flex justify-start">
            <div className="max-w-[86%] rounded-lg border bg-card px-4 py-3 text-sm leading-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
                <MessageCircleHeart className="size-4" />
                Coach
              </div>
              What emotion feels most present right now?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-lg bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground shadow-sm">
              I am not sure yet. I just know something feels heavy.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[86%] rounded-lg border bg-card px-4 py-3 text-sm leading-6 shadow-sm">
              That is a useful place to begin. If you had to choose between anxiety, sadness, anger,
              guilt, or overwhelm, which one is closest?
            </div>
          </div>
        </div>

        <div className="border-t bg-card/72 p-3">
          <div className="flex gap-2">
            <textarea
              placeholder="Write what is true right now..."
              rows={1}
              className="min-h-12 flex-1 resize-none rounded-md border bg-background px-3 py-3 text-sm outline-none ring-ring transition focus:ring-2"
            />
            <button className="rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
              Send
            </button>
          </div>
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <PanelRightClose className="size-5 text-primary" />
            <h2 className="font-semibold">Session info</h2>
          </div>
          <div className="space-y-3 text-sm">
            <InfoRow label="Framework" value="Detecting" />
            <InfoRow label="Emotion" value="Not named yet" />
            <InfoRow label="Exercise" value="None assigned" />
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Boundary</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            EQ Coach is a coaching tool, not therapy or crisis care. If someone is in immediate
            danger, this flow should direct them to professional support.
          </p>
        </Card>
      </aside>
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
