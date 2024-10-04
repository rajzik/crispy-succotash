import '~/styles/globals.css';

import type { Metadata } from 'next';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GeistSans } from 'geist/font/sans';

import { ThemeProvider } from '~/components/ThemeProvider';
import { TRPCReactProvider } from '~/trpc/react';
import Layout from './layout.client';

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
        <ThemeProvider>
          <AntdRegistry>
            <TRPCReactProvider>
              <Layout>{children}</Layout>
            </TRPCReactProvider>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
