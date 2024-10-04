'use client';

import type { PropsWithChildren } from 'react';

import { StyleProvider } from '@ant-design/cssinjs';

export const ThemeProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  return <StyleProvider layer>{children}</StyleProvider>;
};
