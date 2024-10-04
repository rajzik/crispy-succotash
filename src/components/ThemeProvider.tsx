'use client';

import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

export const ThemeProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  return (
    <StyleProvider layer>
      <ConfigProvider theme={useMemo(() => ({}), [])}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};
