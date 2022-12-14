import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export const getDictionary = async (locale: string | undefined, list: string[] = []) => locale ? await serverSideTranslations(locale as string, ['common', ...list]) : null