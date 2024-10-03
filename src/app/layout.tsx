import '~/styles/globals.css';

import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: 'App title',
  description: 'App description',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
