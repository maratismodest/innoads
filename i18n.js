module.exports = {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  pages: {
    '*': ['common'],
    '/[lang]': ['common'],
  },
  defaultNS: 'common',
};
