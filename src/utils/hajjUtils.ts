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
    startDateEn: string;
    endDateBn: string;
    endDateEn: string;
    hajjDateBn: string;
    hajjDateEn: string;
    minAgeBn: string;
    minAgeEn: string;
    passportValidityBn: string;
    passportValidityEn: string;
    regFeeBn: string;
    regFeeEn: string;
    portalUrl: string;
  };

  // 2028 specific details
  hajj2028: {
    titleBn: string;
    titleEn: string;
    jointInfoBn: string;
    jointInfoEn: string;
    startDateBn: string;
    startDateEn: string;
    endDateBn: string;
    endDateEn: string;
    validityBn: string;
    validityEn: string;
    regFeeBn: string;
    regFeeEn: string;
    finalNoticeBn: string;
    finalNoticeEn: string;
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
      titleEn: `Holy Hajj ${primaryYear} Pre-Registration`,
      bookingStatusBn: `${pYearBn} সালের হজের প্রাথমিক নিবন্ধন শুরু হয়েছে ২৭ জুলাই ২০২৬ এবং নিবন্ধনের শেষ তারিখ ২৪ সেপ্টেম্বর ২০২৬ (ধর্ম মন্ত্রণালয়ের ঘোষণা অনুযায়ী কিছু বিজ্ঞপ্তিতে ২৬ সেপ্টেম্বর ২০২৬ পর্যন্ত সময়সীমা উল্লেখ রয়েছে)।`,
      bookingStatusEn: `Primary registration for Hajj ${primaryYear} started on 27 July 2026 and ends on 24 September 2026 (extended up to 26 September 2026).`,
      startDateBn: '২৭ জুলাই ২০২৬',
      startDateEn: '27 July 2026',
      endDateBn: '২৪ সেপ্টেম্বর ২০২৬',
      endDateEn: '24 Sep 2026',
      hajjDateBn: `১৫ মে ${pYearBn}`,
      hajjDateEn: `15 May ${primaryYear}`,
      minAgeBn: 'কমপক্ষে ১৫ বছর হতে হবে',
      minAgeEn: 'At least 15 years old',
      passportValidityBn: `অন্তত ৩১ ডিসেম্বর ${pYearBn} পর্যন্ত মেয়াদ থাকতে হবে`,
      passportValidityEn: `Valid until at least 31 Dec ${primaryYear}`,
      regFeeBn: '৩০,০০০ টাকা (জনপ্রতি)',
      regFeeEn: '30,000 BDT (Per Person)',
      portalUrl: 'https://hajj.gov.bd',
    },

    hajj2028: {
      titleBn: `${sYearBn} সালের হজ প্রাক-নিবন্ধন নির্দেশিকা`,
      titleEn: `Holy Hajj ${secondaryYear} Guidance`,
      jointInfoBn: `${sYearBn} সালের হজের জন্য বাংলাদেশ থেকে পৃথক কোনো স্বতন্ত্র বা নতুন প্রাক-নিবন্ধন কার্যক্রমের তারিখ এখনো আলাদাভাবে ঘোষণা করা হয়নি। বর্তমানে যৌথভাবে ${pYearBn}-${sYearBn} সালের হজের প্রাক-নিবন্ধন চলছে, যা শুরু হয়েছে ২৬ জুলাই ২০২৬ এবং নিবন্ধনের শেষ সময় ২৬ সেপ্টেম্বর ২০২৬।`,
      jointInfoEn: `Currently, joint pre-registration for Hajj ${primaryYear}-${secondaryYear} is ongoing, starting from 26 July 2026 until 26 September 2026.`,
      startDateBn: '২৬ জুলাই ২০২৬',
      startDateEn: '26 July 2026',
      endDateBn: '২৬ সেপ্টেম্বর ২০২৬ (সৌদি রোডম্যাপ অনুযায়ী)',
      endDateEn: '26 Sep 2026 (Saudi Roadmap)',
      validityBn: 'সাধারণ নিয়ম অনুযায়ী এই প্রাক-নিবন্ধন ২ বছর পর্যন্ত বৈধ থাকে',
      validityEn: 'This pre-registration remains valid for 2 years',
      regFeeBn: '৩০,০০০ টাকা (জনপ্রতি)',
      regFeeEn: '30,000 BDT (Per Person)',
      finalNoticeBn: `${pYearBn} সালের হজ সম্পন্ন হওয়ার পর ${sYearBn} সালের নির্দিষ্ট রোডম্যাপ ও মূল হজ প্যাকেজ ঘোষণা করবে ধর্ম বিষয়ক মন্ত্রণালয়।`,
      finalNoticeEn: `The official package and roadmap for Hajj ${secondaryYear} will be announced after Hajj ${primaryYear}.`,
    },
  };
};
