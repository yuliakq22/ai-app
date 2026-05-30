import { Inter, Lora } from 'next/font/google';

import './globals.css';
import { AppShell } from '@/components/layout/app-shell';
import { cn } from '@/lib/utils';

import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
});

export const metadata: Metadata = {
  title: 'EQ Coach',
  description: 'Structured AI coaching for emotional intelligence and reflection.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, lora.variable, 'font-sans antialiased')}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
