const seoTitleLength = 50;
const seoDescriptionLength = 320;

const substringByLettersCount = (text: string, count = seoTitleLength): string => {
  const words = text.substring(0, count).split(' ');
  return words.slice(0, words.length).join(' ');
};

export { seoDescriptionLength, seoTitleLength, substringByLettersCount };
