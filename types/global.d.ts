import ru from '@/locales/en.json';

type Messages = typeof ru;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
