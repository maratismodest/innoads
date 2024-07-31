import ru from '@/locales/en.json';

type Messages = typeof ru;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

export interface Option {
  value: number;
  label: string;
}

export interface TgUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}
