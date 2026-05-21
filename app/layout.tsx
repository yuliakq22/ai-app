import type { Metadata } from 'next';

import { Inter, Lora } from 'next/font/google';

import './globals.css';
import { AppShell } from '@/components/layout/app-shell';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
});

export const metadata: Metadata = {
  title: 'Human Skills',
  description: 'AI roleplay simulations for assertive, emotionally intelligent communication.'
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
