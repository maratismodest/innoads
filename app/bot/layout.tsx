'use client';
import { TelegramProvider } from '@/context/TelegramContext';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <TelegramProvider>{children}</TelegramProvider>;
};

export default Layout;
