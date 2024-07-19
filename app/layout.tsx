import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/top';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import LocalFont from 'next/font/local';

import './globals.css';

const maple = LocalFont({
  src: '../public/MapleMono-Regular.woff2',
  variable: '--font-maple',
});

export const metadata: Metadata = {};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(222.2 84% 4.9%)' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="porter.cat"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="porter.cat"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="rss.json"
          title="porter.cat"
        />
      </head>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-maple antialiased',
          maple.variable
        )}
      >
        <ThemeProvider>
          <Header />
          <div className="container flex h-full max-w-5xl flex-grow py-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
