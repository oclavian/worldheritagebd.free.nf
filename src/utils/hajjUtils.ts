// Utility to convert numbers to Bengali digits
export const toBnDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export interface HajjInfoCycle {
  currentYear: number;
  primaryYear: number;
  secondaryYear: number;
  primaryYearBn: string;
  secondaryYearBn: string;
  
  // 2027 specific details
  hajj2027: {
    titleBn: string;
    titleEn: string;
    bookingStatusBn: string;
    bookingStatusEn: string;
    startDateBn: string;
    endDateBn: string;
    hajjDateBn: string;
    minAgeBn: string;
    passportValidityBn: string;
    regFeeBn: string;
    portalUrl: string;
  };

  // 2028 specific details
  hajj2028: {
    titleBn: string;
    titleEn: string;
    jointInfoBn: string;
    startDateBn: string;
    endDateBn: string;
    validityBn: string;
    regFeeBn: string;
    finalNoticeBn: string;
  };
}

export const getDynamicHajjInfo = (customDate?: Date): HajjInfoCycle => {
  const now = customDate || new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed (0=Jan, 7=Aug)

  // If we are past Hajj season (approx June/July), primary target is year + 1, else year
  // In 2026 (Aug), primary target is 2027, secondary is 2028.
  let primaryYear = year;
  if (month >= 5 || year < 2027) {
    primaryYear = year < 2027 ? 2027 : year + 1;
  }
  const secondaryYear = primaryYear + 1;

  const pYearBn = toBnDigits(primaryYear);
  const sYearBn = toBnDigits(secondaryYear);

  return {
    currentYear: year,
    primaryYear,
    secondaryYear,
    primaryYearBn: pYearBn,
    secondaryYearBn: sYearBn,

    hajj2027: {
      titleBn: `${pYearBn} সালের পবিত্র হজ্ব প্রাক-নিবন্ধন`,
      titleEn: `Holy Hajj ${primaryYear} Registration`,
      bookingStatusBn: `${pYearBn} সালের হজের প্রাথমিক নিবন্ধন শুরু হয়েছে ২৭ জুলাই ২০২৬ এবং নিবন্ধনের শেষ তারিখ ২৪ সেপ্টেম্বর ২০২৬ (ধর্ম মন্ত্রণালয়ের ঘোষণা অনুযায়ী কিছু বিজ্ঞপ্তিতে ২৬ সেপ্টেম্বর ২০২৬ পর্যন্ত সময়সীমা উল্লেখ রয়েছে)।`,
      bookingStatusEn: `Primary registration for Hajj ${primaryYear} started on 27 July 2026 and ends on 24 September 2026 (extended up to 26 September 2026).`,
      startDateBn: '২৭ জুলাই ২০২৬',
      endDateBn: '২৪ সেপ্টেম্বর ২০২৬',
      hajjDateBn: `১৫ মে ${pYearBn}`,
      minAgeBn: 'কমপক্ষে ১৫ বছর হতে হবে',
      passportValidityBn: `অন্তত ৩১ ডিসেম্বর ${pYearBn} পর্যন্ত মেয়াদ থাকতে হবে`,
      regFeeBn: '৩০,০০০ টাকা (জনপ্রতি)',
      portalUrl: 'https://hajj.gov.bd',
    },

    hajj2028: {
      titleBn: `${sYearBn} সালের হজ প্রাক-নিবন্ধন নির্দেশিকা`,
      titleEn: `Holy Hajj ${secondaryYear} Guidance`,
      jointInfoBn: `${sYearBn} সালের হজের জন্য বাংলাদেশ থেকে পৃথক কোনো স্বতন্ত্র বা নতুন প্রাক-নিবন্ধন কার্যক্রমের তারিখ এখনো আলাদাভাবে ঘোষণা করা হয়নি। বর্তমানে যৌথভাবে ${pYearBn}-${sYearBn} সালের হজের প্রাক-নিবন্ধন চলছে, যা শুরু হয়েছে ২৬ জুলাই ২০২৬ এবং নিবন্ধনের শেষ সময় ২৬ সেপ্টেম্বর ২০২৬।`,
      startDateBn: '২৬ জুলাই ২০২৬',
      endDateBn: '২৬ সেপ্টেম্বর ২০২৬ (সৌদি রোডম্যাপ অনুযায়ী)',
      validityBn: 'সাধারণ নিয়ম অনুযায়ী এই প্রাক-নিবন্ধন ২ বছর পর্যন্ত বৈধ থাকে',
      regFeeBn: '৩০,০০০ টাকা (জনপ্রতি)',
      finalNoticeBn: `${pYearBn} সালের হজ সম্পন্ন হওয়ার পর ${sYearBn} সালের নির্দিষ্ট রোডম্যাপ ও মূল হজ প্যাকেজ ঘোষণা করবে ধর্ম বিষয়ক মন্ত্রণালয়।`,
    },
  };
};
