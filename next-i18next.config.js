module.exports = {
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru', 'en'],
    },
    fallbackLng: {
        default: ['ru'],
        en: ['ru'],
    },
    localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
    reloadOnPrerender: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
}
