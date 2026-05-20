import { Badge } from '@/components/ui/badge';

export function PersonalityBadge({ children }: { children: React.ReactNode }) {
  return <Badge className="border-primary/20 bg-primary/8 text-primary">{children}</Badge>;
}
