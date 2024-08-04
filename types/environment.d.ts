export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_IMAGES_DOMAIN: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_NODE_ENV: string;
      NEXT_PUBLIC_BOT_NAME: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_REVALIDATE: number;
      NEXT_PUBLIC_META_ADDITIONAL: string;
      NEXT_PUBLIC_CITY_NAME: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_LANGUAGE: string;
      NEXT_PUBLIC_CURRENCY: string;
      NEXT_PUBLIC_LOCALE: string;
      NEXT_PUBLIC_APP_DOMAIN: string;
      NEXT_PUBLIC_TELEGRAM_USER: string;
      NEXT_PUBLIC_IS_VDS: boolean;
      RESEND_API_KEY: string;
    }
  }
}
