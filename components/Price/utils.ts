const getFormattedPrice = (price: number) =>
  new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, {
    style: 'currency',
    currency: process.env.NEXT_PUBLIC_CURRENCY,
    maximumFractionDigits: 0,
  }).format(price);

const getCurrencySymbol = () => getFormattedPrice(0).replace(/\d/g, '').trim();

export { getFormattedPrice, getCurrencySymbol };
