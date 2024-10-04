'use client';

import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
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
  );
}
