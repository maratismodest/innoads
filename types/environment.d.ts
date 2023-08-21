export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_IMAGES_DOMAIN: string;
      ym: object
    }
  }
}
