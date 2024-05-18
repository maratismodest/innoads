'use client';
import { TelegramProviderNew } from '@/context/TelegramContextNew';
// import { TelegramProvider } from '@/context/TelegramContext';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <TelegramProviderNew>{children}</TelegramProviderNew>;
};

export default Layout;
