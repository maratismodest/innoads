import "i18next";

import common from "./public/locales/ru/common.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
    };
    language: string;
  }
}
