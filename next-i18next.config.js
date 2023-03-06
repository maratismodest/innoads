/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru', 'en'],
        fallbackLng: {
            default: ['ru'],
            ru: ['ru'],
        },
        localePath:
            typeof window === 'undefined'
                ? require('path').resolve('./public/locales')
                : '/locales',

        reloadOnPrerender: process.env.NODE_ENV === 'development',
        localeDetection: false
    }

}
