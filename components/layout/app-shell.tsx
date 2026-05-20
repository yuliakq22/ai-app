import Link from 'next/link';
import { Brain, History, Home, LineChart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthNav } from '@/components/auth/auth-nav';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/scenarios', label: 'Practice', icon: Sparkles },
  { href: '/history', label: 'History', icon: History },
  { href: '/progress', label: 'Progress', icon: LineChart }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="size-5" />
            </span>
            <span>Human Skills</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/scenarios">Start practice</Link>
            </Button>
            <AuthNav />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-lg border bg-background/90 p-1 shadow-soft backdrop-blur md:hidden">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[11px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
