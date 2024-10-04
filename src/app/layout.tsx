import '~/styles/globals.css';

import type { Metadata } from 'next';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { GeistSans } from 'geist/font/sans';

import { ThemeProvider } from '~/components/ThemeProvider';
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
        <ThemeProvider>
          <AntdRegistry>
            <TRPCReactProvider>
              <Layout rootClassName="h-lvh">
                <Header className="flex items-center bg-white">
                  <Title
                    level={2}
                    className="m-0 p-0"
                  >
                    App title
                  </Title>
                </Header>
                <Content className="p-3 px-44">{children}</Content>
              </Layout>
            </TRPCReactProvider>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
