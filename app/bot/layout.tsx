'use client';
import { TelegramProviderNew } from '@/context/TelegramContextNew';

interface TelegramLayout {
  children: React.ReactNode;
}
const Layout = ({ children }: TelegramLayout) => {
  return <TelegramProviderNew>{children}</TelegramProviderNew>;
};

export default Layout;
