export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_IMAGES_DOMAIN: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_NODE_ENV: string;
      NEXT_PUBLIC_ADMIN: string;
      NEXT_PUBLIC_PASSWORD:string;
    }
  }
}
