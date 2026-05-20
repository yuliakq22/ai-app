export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-lg border bg-card px-4 py-3 shadow-sm">
        <span className="size-2 animate-pulse-soft rounded-full bg-primary" />
        <span className="size-2 animate-pulse-soft rounded-full bg-primary [animation-delay:120ms]" />
        <span className="size-2 animate-pulse-soft rounded-full bg-primary [animation-delay:240ms]" />
      </div>
    </div>
  );
}
