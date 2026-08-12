export const toBengaliDigits = (numStr: string): string => {
  if (!numStr) return '';
  const banglaDigits: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return numStr.replace(/[0-9]/g, (match) => banglaDigits[match] || match);
};

export const formatPhone = (numStr: string, lang: 'bn' | 'en'): string => {
  if (lang === 'bn') {
    return toBengaliDigits(numStr);
  }
  return numStr;
};
