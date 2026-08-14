import { UmrahPackage, HajjPackage, TourPackage, BlogPost, Language } from '../types';

export interface ItineraryDay {
  dayNumber: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  mealsBn?: string;
  mealsEn?: string;
}

export interface StandardPackageItem {
  id: string;
  serviceType: 'Umrah' | 'Hajj' | 'Tour & Visa' | 'Air Ticket' | 'Blog';
  titleBn: string;
  titleEn: string;
  durationBn: string;
  durationEn: string;
  locationBn: string;
  locationEn: string;
  priceBDT: number;
  badgeBn?: string;
  badgeEn?: string;
  image: string;
  galleryImages: string[];
  inclusionsBn: string[];
  inclusionsEn: string[];
  exclusionsBn: string[];
  exclusionsEn: string[];
  itinerary: ItineraryDay[];
  cancellationBn: string;
  cancellationEn: string;
  policiesBn: string[];
  policiesEn: string[];
  suitableForBn: string;
  suitableForEn: string;
  groupSizeBn: string;
  groupSizeEn: string;
  hotelsBn?: string[];
  hotelsEn?: string[];
  rawItem: any;
}

export function adaptUmrahPackage(pkg: UmrahPackage): StandardPackageItem {
  return {
    id: pkg.id,
    serviceType: 'Umrah',
    titleBn: pkg.titleBn,
    titleEn: pkg.titleEn,
    durationBn: pkg.durationBn,
    durationEn: pkg.durationEn,
    locationBn: `মক্কা (${pkg.makkahDistanceBn}) — মদীনা (${pkg.madinahDistanceBn})`,
    locationEn: `Makkah (${pkg.makkahDistanceEn}) — Madinah (${pkg.madinahDistanceEn})`,
    priceBDT: pkg.priceBDT,
    badgeBn: pkg.badgeBn || 'পবিত্র উমরাহ্',
    badgeEn: pkg.badgeEn || 'Holy Umrah',
    image: pkg.image,
    galleryImages: [
      pkg.image,
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80', // Kaaba Tawaf
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80', // Madinah Nabawi
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80', // Makkah Haram Sanctuary
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80', // Madinah Mosque
    ],
    inclusionsBn: pkg.inclusionsBn || [
      'এয়ার টিকিট (ঢাকা-জেদ্দা-ঢাকা)',
      'সৌদি উমরাহ্ ই-ভিসা ও ইন্স্যুরেন্স',
      `মক্কা হোটেল: ${pkg.makkahHotelBn}`,
      `মদীনা হোটেল: ${pkg.madinahHotelBn}`,
      pkg.foodBn,
      pkg.transportBn,
      pkg.ziyaraBn,
      'অভিজ্ঞ মোয়াল্লেম ও গাইড সুবিধা',
    ],
    inclusionsEn: pkg.inclusionsEn || [
      'Roundtrip Air Ticket (Dhaka-Jeddah-Dhaka)',
      'Saudi Umrah E-Visa & Insurance',
      `Makkah Hotel: ${pkg.makkahHotelEn}`,
      `Madinah Hotel: ${pkg.madinahHotelEn}`,
      pkg.foodEn,
      pkg.transportEn,
      pkg.ziyaraEn,
      'Experienced Moallem & Guide Services',
    ],
    exclusionsBn: [
      'ব্যক্তিগত কেনাকাটা ও ব্যাক্তিগত খরচ',
      'অতিরিক্ত ব্যাগেজ চার্জ (নির্দিষ্ট সীমার বাইরে)',
      'প্যাকেজ শিডিউলের বাইরে ব্যক্তিগত খাবার বা পানীয়',
      'হোটেল রুম সার্ভিস ও লন্ড্রি খরচ',
    ],
    exclusionsEn: [
      'Personal shopping and individual expenses',
      'Excess baggage charges beyond standard flight limits',
      'Personal meals or drinks outside scheduled catering',
      'Hotel room service and personal laundry charges',
    ],
    itinerary: [
      {
        dayNumber: '01',
        titleBn: 'ঢাকা থেকে জেদ্দা বিমান যাত্রা ও মক্কা হোটেল আগমন',
        titleEn: 'Flight from Dhaka to Jeddah & Hotel Check-in at Makkah',
        descBn: 'ঢাকার হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে পবিত্র জেদ্দার উদ্দেশ্যে রওয়ানা। জেদ্দা বিমানবন্দরে আমাদের প্রতিনিধি কর্তৃক উষ্ণ অভ্যর্থনা ও এয়ারকন্ডিশন লাক্সারি বাসে মক্কা হোটেলের উদ্দেশ্যে যাত্রা। হোটেল চেক-ইন ও বিশ্রাম।',
        descEn: 'Depart from Hazrat Shahjalal International Airport, Dhaka to Jeddah. Warm reception by our representative at Jeddah Airport, transfer to Makkah hotel via AC luxury bus, followed by hotel check-in and rest.',
        mealsBn: 'রাতের খাবার অন্তর্ভুক্ত',
        mealsEn: 'Dinner Included',
      },
      {
        dayNumber: '02',
        titleBn: 'পবিত্র উমরাহ্ সম্পন্নকরণ (তাওয়াফ, সাঈ ও হালাক)',
        titleEn: 'Performing Holy Umrah (Tawaf, Sa’i & Halq)',
        descBn: 'অভিজ্ঞ মোয়াল্লেমের দিকনির্দেশনায় কাবা শরীফে প্রবেশ, তাওয়াফ সম্পন্ন, মাকামে ইব্রাহিমে ২ রাকাত নামাজ, জমজমের পানি পান, সাফা-মারওয়া সাঈ এবং হালাক/কসর করার মাধ্যমে পবিত্র উমরাহ্ সম্পন্নকরণ।',
        descEn: 'Under expert Moallem guidance, enter Masjid al-Haram, perform Tawaf around Kaaba, offer 2 Rakat prayers at Maqam Ibrahim, drink Zamzam water, complete Sa’i between Safa & Marwah, and perform Halq/Taqsir.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '03',
        titleBn: 'মসজিদুল হারামে ইবাদত ও ব্যক্তিগত সময়',
        titleEn: 'Daily Ibadah & Personal Time at Haram Sharif',
        descBn: 'পবিত্র মসজিদুল হারামে ৫ ওয়াক্ত নামাজ আদায়, নফল তাওয়াফ ও কুরআন তেলাওয়াতে সময় অতিবাহিত করা।',
        descEn: 'Spend quality time in Makkah for 5 daily prayers at Haram Sharif, voluntary Tawaf, and Quran recitation.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '04',
        titleBn: 'মক্কা নগরীর ঐতিহাসিক স্থানসমূহ জিয়ারাহ্',
        titleEn: 'Makkah Historical Ziyarah Excursion',
        descBn: 'এসি বাসে জাবালে নূর (হেরা গুহা), জাবালে সওর (সওর গুহা), মিনা, আরাফাত ময়দান, মুজদালিফা ও জাবালে রহমত জিয়ারাহ্।',
        descEn: 'Guided AC coach tour to Jabal al-Nour (Cave Hira), Jabal Thawr, Mina, Arafat, Muzdalifah, and Jabal al-Rahmah.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '05-08',
        titleBn: 'মক্কায় অবস্থান, নফল উমরাহ্ ও ইবাদত',
        titleEn: 'Makkah Stay, Optional Umrah & Devotion',
        descBn: 'মসজিদে আয়েশা (তানঈম) থেকে নফল উমরাহ্ করার সুযোগ। হারামে ইবাদতে নিমগ্ন থাকা।',
        descEn: 'Opportunity for optional Umrah from Masjid Taneem (Aisha Mosque) and continuous Ibadah at Haram Sharif.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '09',
        titleBn: 'মক্কা থেকে মদীনা মুনাওয়ারাহ্ গমনাগমন',
        titleEn: 'Transfer from Makkah to Madinah Al-Munawwarah',
        descBn: 'মক্কা হোটেল চেক-আউট। সুসজ্জিত এসি বাসে আল্লাহর রাসূল (সাঃ)-এর শহর মদীনা মুনাওয়ারার উদ্দেশ্যে যাত্রা। মদীনা হোটেল চেক-ইন।',
        descEn: 'Check-out from Makkah hotel. Journey to Madinah via comfortable AC coach, hotel check-in at Madinah.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '10',
        titleBn: 'মসজিদে নববী, রিয়াজুল জান্নাহ্ সালাম পেশ ও জিয়ারাহ্',
        titleEn: 'Riad ul-Jannah Salam & Madinah Ziyarah',
        descBn: 'মসজিদে নববীতে বিশ্বনবী (সাঃ)-এর রওজা মোবারকে সালাম নিবেদন। মদীনার ঐতিহাসিক স্থানসমূহ: মসজিদে কুবা, মসজিদে ক্বিবলাতাইন, উহুদ যুদ্ধক্ষেত্র ও সাত মসজিদ জিয়ারাহ্।',
        descEn: 'Offer Salam at Rawdah Mubarak inside Masjid An-Nabawi. Guided Ziyarah to Masjid Quba, Masjid al-Qiblatayn, Mount Uhud, and Seven Mosques.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '11-13',
        titleBn: 'মদীনায় ইবাদত ও দরূদ শরীফ পাঠ',
        titleEn: 'Ibadah & Reflection at Madinah An-Nabawi',
        descBn: 'মসজিদে নববীতে নিয়মিত ৫ ওয়াক্ত সালাত আদায় এবং রওজা শরীফের সান্নিধ্যে ইবাদত-বন্দেগী।',
        descEn: 'Perform daily prayers at Prophet\'s Mosque, offering Darood Sharif and personal prayers.',
        mealsBn: 'সকাল, দুপুর ও রাতের খাবার',
        mealsEn: 'Breakfast, Lunch & Dinner',
      },
      {
        dayNumber: '14',
        titleBn: 'মদীনা/জেদ্দা বিমানবন্দর থেকে ঢাকায় শুভ প্রত্যাবর্তন',
        titleEn: 'Return Journey from Madinah/Jeddah Airport to Dhaka',
        descBn: 'হোটেল চেক-আউট ও বিমানবন্দরের উদ্দেশ্যে রওয়ানা। উমরাহ্ সম্পন্ন করে ঢাকায় নিরাপদ আগমন।',
        descEn: 'Hotel check-out and airport transfer for return flight to Dhaka with unforgettable spiritual memories.',
        mealsBn: 'সকালে প্রাতরাশ',
        mealsEn: 'Breakfast Included',
      },
    ],
    cancellationBn: 'যাত্রা শুরুর ১৫ দিন বা তার বেশি পূর্বে বাতিল করলে ২০% ফি প্রযোজ্য। ৭-১৪ দিন পূর্বে ৫০% এবং ৭ দিনের কম সময়ে সম্পূর্ণ টাকা অফেরতযোগ্য (ভিসা ও টিকিট নন-রিফান্ডেবল)।',
    cancellationEn: '20% processing fee applies for cancellations 15+ days prior. 50% charge for 7-14 days prior, and 100% non-refundable if cancelled less than 7 days before departure.',
    policiesBn: [
      'পাসপোর্টের মেয়াদ নূন্যতম ৬ মাস থাকতে হবে।',
      'সৌদি ধর্ম মন্ত্রণালয় ও বাংলাদেশ হাব (HAAB) এর সকল নিয়মকানুন মেনে চলা বাধ্যবাধকতা।',
      'হোটেল চেক-ইন সময় দুপুর ২:০০ টা, চেক-আউট বেলা ১২:০০ টা।',
      'ফ্লাইটের সময়সূচী এয়ারলাইন্সের সিদ্ধান্ত অনুযায়ী পরিবর্তন হতে পারে।',
    ],
    policiesEn: [
      'Passport must have at least 6 months validity from the travel date.',
      'Must strictly follow Saudi Ministry of Hajj & Umrah guidelines.',
      'Hotel check-in time is 2:00 PM and check-out is 12:00 PM.',
      'Flight schedules are subject to airline operations and timing.',
    ],
    suitableForBn: 'পরিবার, একক ও গ্রুপ যাত্রী',
    suitableForEn: 'Family, Individuals & Groups',
    groupSizeBn: '১৫ - ৫০ জন উমরাহ্ কাফেলা',
    groupSizeEn: '15 - 50 Pilgrims Group',
    hotelsBn: [pkg.makkahHotelBn, pkg.madinahHotelBn],
    hotelsEn: [pkg.makkahHotelEn, pkg.madinahHotelEn],
    rawItem: pkg,
  };
}

export function adaptHajjPackage(pkg: HajjPackage): StandardPackageItem {
  const isStandardWithTrain = pkg.bulletTrainBn || pkg.id.includes('standard');
  const defaultGallery = [
    'https://lh3.googleusercontent.com/d/12r4H9iF0KgHrHPi0hciMhvKPxU-4eWHt', // মক্কা ১
    'https://lh3.googleusercontent.com/d/10oFD9Le8oEeucvjzrJ4w8WaTdpD8UUfp', // মদিনা ১
    'https://lh3.googleusercontent.com/d/13E6zxdAkmFG6_U3coxwl-9wDBBrT-r3X', // মিনা ১
    'https://lh3.googleusercontent.com/d/1WXbn599ZILjt0T-lfCTQQ3AuGaqvKYHq', // আরাফাত ১
    'https://lh3.googleusercontent.com/d/1FicUBcNXriSeuHcrmIw7WaSrbUzYlAQL', // মুজদালিফা ১
    'https://lh3.googleusercontent.com/d/1c72GWSQMJ6U9U4ntWGfylOwvwM2RBG3f', // মক্কা ২
    'https://lh3.googleusercontent.com/d/1A8-ulMjjQH6PnQjJZ7W-jh2paU6XKm8j', // মদিনা ২
    'https://lh3.googleusercontent.com/d/1lgcQh28xDqdDVLTLHBJlEUmHz1m6Jz1V', // মিনা ২
    'https://lh3.googleusercontent.com/d/1KZe5xi2XDQ-lipnXpwftQHQhzJX68aCm', // আরাফাত ২
    'https://lh3.googleusercontent.com/d/1ymiaZfrE7qDYUDh34w-oiYCzrQO49Qma', // মুজদালিফা ২
  ];

  return {
    id: pkg.id,
    serviceType: 'Hajj',
    titleBn: pkg.titleBn,
    titleEn: pkg.titleEn,
    durationBn: pkg.durationBn,
    durationEn: pkg.durationEn,
    locationBn: isStandardWithTrain 
      ? 'মক্কা, মদীনা, তায়েফ, জেদ্দা, মিনা, আরাফাত ও মুজদালিফা' 
      : 'মক্কা, মদীনা, মিনা, আরাফাত ও মুজদালিফা',
    locationEn: isStandardWithTrain
      ? 'Makkah, Madinah, Taif, Jeddah, Mina, Arafat & Muzdalifah'
      : 'Makkah, Madinah, Mina, Arafat & Muzdalifah',
    priceBDT: pkg.totalPriceBDT,
    badgeBn: pkg.badgeBn || `হজ্ব ${pkg.year}`,
    badgeEn: pkg.badgeEn || `Hajj ${pkg.year}`,
    image: pkg.image,
    galleryImages: pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : defaultGallery,
    inclusionsBn: pkg.facilitiesBn || [
      'বাংলাদেশ ও সৌদি সরকার অনুমোদিত ডিরেক্ট ফ্লাইট (Direct Flight)',
      'কোরবানি সম্পূর্ণ প্যাকেজের অন্তর্ভুক্ত',
      `মক্কা হোটেল: ${pkg.makkahHotelBn}`,
      `মদীনা হোটেল: ${pkg.madinahHotelBn}`,
      'মিনা ও আরাফাত তাঁবুতে শীতাতপ নিয়ন্ত্রিত অবস্থান ও ক্যাটারিং',
      pkg.foodBn,
      pkg.transportBn,
      pkg.ziyarahBn || 'মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহ বিশেষ জিয়ারাহ',
      `হজ্ব প্রশিক্ষণ কর্মশালা ও মোয়াল্লেম গাইড: ${pkg.moallemBn}`,
      pkg.giftItemsBn || 'ইহরাম প্যাকেজ ও গিফট আইটেম',
    ],
    inclusionsEn: pkg.facilitiesEn || [
      'Approved Direct Flight (Dhaka - Jeddah/Madinah - Dhaka)',
      'Qurbani / Animal Sacrifice Included in Package',
      `Makkah Hotel: ${pkg.makkahHotelEn}`,
      `Madinah Hotel: ${pkg.madinahHotelEn}`,
      'AC Tent Accommodation & Full Catering in Mina & Arafat',
      pkg.foodEn,
      pkg.transportEn,
      pkg.ziyarahEn || 'Historical Ziyarah in Sacred Places',
      `Guided Hajj Orientation & Moallem: ${pkg.moallemEn}`,
      pkg.giftItemsEn || 'Ihram Kit & Gift Bag',
    ],
    exclusionsBn: [
      'ব্যক্তিগত কেনাকাটা ও ব্যক্তিগত ঔষধের খরচ',
      'অতিরিক্ত লাগেজ চার্জ ও ব্যক্তিগত আলাদা ঘোরাঘুরি',
    ],
    exclusionsEn: [
      'Personal shopping, SIM card and private medicine expenses',
      'Excess baggage charge and private transportation outside group itinerary',
    ],
    itinerary: [
      {
        dayNumber: '01',
        titleBn: 'ঢাকা থেকে ডিরেক্ট ফ্লাইটে জেদ্দা/মদিনা আগমন',
        titleEn: 'Direct Flight from Dhaka to Jeddah / Madinah',
        descBn: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে ডিরেক্ট ফ্লাইটে সৌদি আরব আগমন। এয়ারপোর্টে অভ্যর্থনা শেষে শীতাতপ নিয়ন্ত্রিত বাসে হোটেলে চেক-ইন ও প্রথম উমরাহ্ আদায়।',
        descEn: 'Depart Dhaka on direct flight, arrive in Saudi Arabia, airport reception, transfer by AC bus to hotel, and perform welcome Umrah.',
        mealsBn: 'ফ্লাইট ও হোটেল ক্যাটারিং',
        mealsEn: 'In-Flight & Hotel Meals',
      },
      {
        dayNumber: '02-07',
        titleBn: 'পবিত্র হারামাইন শরিফাইনে ইবাদত ও হজ্ব প্রস্তুতি',
        titleEn: 'Prayers in Holy Harams & Pre-Hajj Orientation',
        descBn: 'পবিত্র কাবা শরিফ ও মসজিদে নববীতে ৫ ওয়াক্ত সালাত আদায়, নফল তাওয়াফ ও মোয়াল্লেমের পরিচালনায় ব্যবহারিক হজ্ব প্রশিক্ষণ কর্মশালা।',
        descEn: 'Daily prayers at Holy Kaaba & Prophet\'s Mosque, Nafil Tawaf, and practical Hajj workshop by Islamic scholars.',
        mealsBn: '৩ বেলা উন্নত মানসম্মত বাংলা খাবার',
        mealsEn: '3 Bengali Quality Meals Daily',
      },
      {
        dayNumber: '08',
        titleBn: '৮ জিলহজ্জ - তালবিয়া পাঠসহ মিনা তাঁবু সিটিতে আগমন',
        titleEn: '8th Dhul Hijjah - Move to Mina AC Tent City',
        descBn: 'ইহরাম পরিধান করে "লাব্বায়েক আল্লাহুম্মা লাব্বায়েক" পাঠ করতে করতে মিনা তাঁবু সিটিতে অবস্থান। ৫ ওয়াক্ত নামাজ মিনায় আদায় ও রাতযাপন।',
        descEn: 'Wear Ihram, recite Talbiyah, and settle into Mina AC Tent City for 5 mandatory prayers & overnight stay.',
        mealsBn: 'মিনা ক্যাটারিং সেবা',
        mealsEn: 'Mina Catering Service',
      },
      {
        dayNumber: '09',
        titleBn: '৯ জিলহজ্জ - আরাফাত ময়দানে অবস্থান (মূল হজ্ব) ও মুজদালিফায় রাতযাপন',
        titleEn: '9th Dhul Hijjah - Day of Arafat (Core Hajj) & Muzdalifah Night',
        descBn: 'সূর্যোদয়ের পর আরাফাতের ময়দানে উকুফ (অবস্থান), খুতবা শ্রবণ ও মোনাজাত। সূর্যাস্তের পর মুজদালিফায় গমন, খোলা আকাশের নিচে রাতযাপন ও কঙ্কর সংগ্রহ।',
        descEn: 'Wuquf at Arafat Plains, listen to Hajj Khutbah and Duas. After sunset move to Muzdalifah for open-sky night stay & collecting 70 pebbles.',
        mealsBn: 'আরাফাত ও মুজদালিফা বিশেষ খাবার প্যাকেট',
        mealsEn: 'Arafat & Muzdalifah Meals',
      },
      {
        dayNumber: '10',
        titleBn: '১০ জিলহজ্জ - জামারাতে কঙ্কর নিক্ষেপ, কোরবানি ও তাওয়াফে জিয়ারাহ',
        titleEn: '10th Dhul Hijjah - Jamarat Stoning, Qurbani & Tawaf al-Ziyarah',
        descBn: 'মুজদালিফা থেকে মিনায় এসে বড় শয়তানকে ৭টি কঙ্কর নিক্ষেপ, প্যাকেজভুক্ত কোরবানি সম্পন্ন, মাথা মুণ্ডন (হালাক) করে ইহরাম খোলা এবং মক্কায় তাওয়াফে জিয়ারাহ ও সাঈ আদায়।',
        descEn: 'Stone Jamarat al-Aqaba, complete included Qurbani, shave head (Halq) to exit Ihram, and perform Tawaf al-Ziyarah & Sai at Kaaba.',
        mealsBn: '৩ বেলা উন্নত খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '11-12',
        titleBn: '১১-১২ জিলহজ্জ - মিনায় অবস্থান ও ৩ শয়তানকে কঙ্কর নিক্ষেপ',
        titleEn: '11-12th Dhul Hijjah - Mina Days & Stoning 3 Jamarat',
        descBn: 'মিনায় অবস্থান এবং প্রতিদিন ছোট, মধ্যম ও বড় শয়তানকে ৭টি করে কঙ্কর নিক্ষেপ সম্পন্ন করে মক্কার হোটেলে প্রত্যাবর্তন।',
        descEn: 'Stay in Mina tents, pelt 7 pebbles at each of the 3 Jamarat daily, and return smoothly to Makkah hotel.',
        mealsBn: '৩ বেলা উন্নত খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '13-35',
        titleBn: isStandardWithTrain 
          ? 'মক্কা-মদিনা বুলেট ট্রেনে ভ্রমণ ও ঐতিহাসিক জিয়ারাহ (তায়েফ, জেদ্দা, বদর)' 
          : 'মক্কা ও মদিনা মুনাওয়ারাহ অবস্থান ও পবিত্র জিয়ারাহ',
        titleEn: isStandardWithTrain
          ? 'Haramain Bullet Train Ride & Extended Ziyarah (Taif, Jeddah, Badr)'
          : 'Makkah & Madinah Stay and Holy Sites Ziyarah',
        descBn: isStandardWithTrain
          ? 'সৌদি আরবের আধুনিক বুলেট ট্রেনে (Haramain Bullet Train) মক্কা-মদিনা যাতায়াত। মদীনায় মসজিদে নববীতে ৪০ ওয়াক্ত নামাজ ও রওজা শরিফে সালাম নিবেদন। মক্কা, মদিনা, তায়েফ, জেদ্দা ও বদর প্রান্তরে বিশেষ জিয়ারাহ।'
          : 'মদীনায় মসজিদে নববীতে নামাজ আদায় ও রাসূল (সাঃ)-এর রওজা মোবারকে সালাম নিবেদন। মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহ মোয়াল্লেমের সাথে জিয়ারাহ।',
        descEn: isStandardWithTrain
          ? 'Experience high-speed Haramain Bullet Train journey between Makkah and Madinah. 40 prayers at Prophet\'s Mosque, Rawdah Mubarak Salam, and extended Ziyarah covering Makkah, Madinah, Taif Mountains, Jeddah Coastal Mosque & Historic Badr Battleground.'
          : 'Stay at Madinah Al-Munawwarah for prayers at Prophet\'s Mosque and Rawdah Mubarak Salam, with historic Ziyarah guided by scholars.',
        mealsBn: '৩ বেলা মানসম্মত বাংলা খাবার',
        mealsEn: '3 Bengali Meals Daily',
      },
      {
        dayNumber: '36-45',
        titleBn: 'বিদায়ী তাওয়াফ ও ডিরেক্ট ফ্লাইটে ঢাকায় প্রত্যাবর্তন',
        titleEn: 'Farewell Tawaf & Direct Flight Back to Dhaka',
        descBn: 'পবিত্র কাবা শরিফে বিদায়ী তাওয়াফ সম্পন্ন করে জেদ্দা/মদীনা আন্তর্জাতিক বিমানবন্দর থেকে ডিরেক্ট ফ্লাইটে হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর ঢাকায় প্রত্যাবর্তন।',
        descEn: 'Complete Tawaf al-Wada (Farewell Tawaf) and return to Dhaka with holy Hajj Mabrur.',
        mealsBn: 'ফ্লাইট খাবার',
        mealsEn: 'In-Flight Catering',
      },
    ],
    cancellationBn: 'বাংলাদেশ ধর্ম মন্ত্রণালয় ও সৌদি হজ্ব কর্তৃপক্ষের পলিসি অনুযায়ী হজ্ব প্রাক-নিবন্ধন ফি অফেরতযোগ্য হতে পারে।',
    cancellationEn: 'Hajj registration and Moallem draft fees are subject to Ministry of Religious Affairs regulations.',
    policiesBn: [
      'জাতীয় পরিচয়পত্র (NID) ও কমপক্ষে ৬ মাস মেয়াদসহ বায়োমেট্রিক পাসপোর্ট বাধ্যতামূলক।',
      'সরকারি অনুমোদিত মেডিকেল সেন্টার থেকে স্বাস্থ্য পরীক্ষা ও ভ্যাকসিন সার্টিফিকেট আবশ্যক।',
      'সৌদি হজ্ব ও ওমরাহ মন্ত্রণালয়ের সার্বিক নিয়ম ও গাইডলাইন মেনে চলতে হবে।',
      'কাফেলার শৃঙ্খলা রক্ষা ও মোয়াল্লেমের নির্দেশনা অনুসরণ করা বাধ্যতামূলক।',
    ],
    policiesEn: [
      'Valid National ID (NID) & Biometric Passport (min. 6 months validity) are mandatory.',
      'Approved health screening and compulsory vaccination certificates required.',
      'Must strictly adhere to Saudi Ministry of Hajj regulations.',
      'Pilgrims must maintain group discipline and follow Moallem instructions.',
    ],
    suitableForBn: 'সকল প্রাপ্তবয়স্ক পুরুষ ও মহিলা হজ্বযাত্রী',
    suitableForEn: 'Adult Men and Women Hajj Pilgrims',
    groupSizeBn: 'সরকারি অনুমোদিত সুশৃঙ্খল কাফেলা',
    groupSizeEn: 'Government Authorized Disciplined Group',
    hotelsBn: [pkg.makkahHotelBn, pkg.madinahHotelBn],
    hotelsEn: [pkg.makkahHotelEn, pkg.madinahHotelEn],
    rawItem: pkg,
  };
}

export function adaptTourPackage(pkg: TourPackage): StandardPackageItem {
  return {
    id: pkg.id,
    serviceType: 'Tour & Visa',
    titleBn: pkg.titleBn,
    titleEn: pkg.titleEn,
    durationBn: pkg.durationBn,
    durationEn: pkg.durationEn,
    locationBn: `${pkg.countryBn} (বিভিন্ন দর্শনীয় স্থান)`,
    locationEn: `${pkg.countryEn} (Top Destinations)`,
    priceBDT: pkg.priceBDT,
    badgeBn: pkg.countryBn,
    badgeEn: pkg.countryEn,
    image: pkg.image,
    galleryImages: [
      pkg.image,
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    ],
    inclusionsBn: [
      `${pkg.durationBn} তারকাচিহ্নিত হোটেল অবস্থান`,
      'প্রতিদিন সুস্বাদু প্রাতরাশ (Breakfast)',
      'এয়ারপোর্ট পিক-আপ ও ড্রপ ট্রান্সফার (Private/Shared AC Vehicle)',
      'দর্শনীয় স্থানসমূহ ঘুরিয়ে দেখানো (Guided Sightseeing Tours)',
      pkg.visaRequired ? 'ই-ভিসা প্রসেসিং সহায়াসংক্রান্ত সাপোর্ট' : 'ভিসামুক্ত / অন-অ্যারাইভাল ভিসা গাইড',
      'অভিজ্ঞ ট্যুর গাইড ও ড্রাইভার সার্ভিস',
    ],
    inclusionsEn: [
      `${pkg.durationEn} Quality Hotel Stay`,
      'Daily Buffet Breakfast at Hotel',
      'Airport Pickup & Drop Transfers in AC Coach',
      'Guided Sightseeing & Entry Ticket Assistance',
      pkg.visaRequired ? 'E-Visa Processing & Documentation Support' : 'Visa-Free / Visa on Arrival Assistance',
      'Professional Tour Guide & Driver Services',
    ],
    exclusionsBn: [
      'আন্তর্জাতিক এয়ার টিকিট (অনুরোধ সাপেক্ষে যুক্তযোগ্য)',
      'ব্যক্তিগত কেনাকাটা, শপিং ও টিপস',
      'দুপুর ও রাতের খাবার (নির্দিষ্ট মেনু ব্যতীত)',
      'হোটেল পার্সোনাল মিনিবার ও সার্ভিস চার্জ',
    ],
    exclusionsEn: [
      'International Flight Tickets (Can be added on request)',
      'Personal shopping, phone calls & driver tipping',
      'Lunch and Dinner outside package schedule',
      'Hotel minibar and personal room service fees',
    ],
    itinerary: [
      {
        dayNumber: '01',
        titleBn: 'গন্তব্যে আগমন ও হোটেল চেক-ইন',
        titleEn: 'Arrival & Hotel Check-in',
        descBn: 'বিমানবন্দরে পৌঁছানোর পর আমাদের প্রতিনিধি আপনাকে স্বাগত জানাবে এবং শীতাতপ নিয়ন্ত্রিত গাড়িতে হোটেলে নিয়ে যাবে। চেক-ইন শেষে দিনের অবশিষ্টাংশ নিজের মতো কাটানোর সুযোগ।',
        descEn: 'Warm welcome by representative at airport, AC transfer to hotel, check-in and free time to relax.',
        mealsBn: 'প্রাতরাশ / ওয়েলকাম ড্রিংকস',
        mealsEn: 'Welcome Drink / Refreshments',
      },
      {
        dayNumber: '02',
        titleBn: 'সিটি ট্যুর ও ঐতিহাসিক দর্শনীয় স্থানসমূহ',
        titleEn: 'City Tour & Sightseeing Excursion',
        descBn: 'হোটেল প্রাতরাশ শেষে শহরের প্রধান প্রধান পর্যটন কেন্দ্র, বিখ্যাত স্থাপত্য ও দর্শনীয় স্থান পরিদর্শন। দুপুরে স্থানীয় বিখ্যাত রেস্তোরাঁয় খাবারের অভিজ্ঞতা।',
        descEn: 'Guided city sightseeing tour visiting iconic monuments, historical landmarks, and culture spots.',
        mealsBn: 'বুফে প্রাতরাশ',
        mealsEn: 'Buffet Breakfast',
      },
      {
        dayNumber: '03',
        titleBn: 'প্রাকৃতিক সৌন্দর্য ভ্রমণ ও ক্রুজ/অ্যাডভেঞ্চার',
        titleEn: 'Nature Expedition & Cruise Adventure',
        descBn: 'সমুদ্র সৈকত, পাহাড়, বিখ্যাত দ্বীপ বা হ্রদে নৈসর্গিক ভ্রমণ। বোটিং/ক্রুজ ও ছবি তোলার জন্য চমৎকার সময়।',
        descEn: 'Scenic tour to pristine beaches, hills, islands, or lakes with boating/cruise experiences.',
        mealsBn: 'বুফে প্রাতরাশ',
        mealsEn: 'Buffet Breakfast',
      },
      {
        dayNumber: '04',
        titleBn: 'ঐতিহ্যবাহী মার্কেট শপিং ও মুক্ত সময়',
        titleEn: 'Traditional Shopping & Leisure Time',
        descBn: 'বিখ্যাত ট্রেডিশনাল মার্কেট থেকে প্রিয়জনদের জন্য উপহারসামগ্রী কেনাকাটা করার মুক্ত সময়।',
        descEn: 'Free day for souvenir shopping at local markets and trying regional street food.',
        mealsBn: 'বুফে প্রাতরাশ',
        mealsEn: 'Buffet Breakfast',
      },
      {
        dayNumber: '05',
        titleBn: 'হোটেল চেক-আউট ও ঢাকায় শুভ প্রত্যাবর্তন',
        titleEn: 'Hotel Check-out & Flight Departure',
        descBn: 'প্রাতরাশ শেষে হোটেল চেক-আউট। নির্ধারিত সময়ে এয়ারপোর্টে ড্রপ অফ এবং ঢাকার উদ্দেশ্যে ফ্লাইট গ্রহণ।',
        descEn: 'Breakfast, check-out from hotel, transfer to airport for return flight to Dhaka.',
        mealsBn: 'বুফে প্রাতরাশ',
        mealsEn: 'Buffet Breakfast',
      },
    ],
    cancellationBn: 'ভ্রমণ শুরুর ১৫ দিন পূর্বে বাতিল করলে ২৫% সার্ভিস চার্জ। ৭-১৪ দিন পূর্বে ৫০% এবং ৭ দিনের কম সময়ে অফেরতযোগ্য।',
    cancellationEn: '25% service fee 15 days prior to travel. 50% for 7-14 days prior, and 100% non-refundable less than 7 days.',
    policiesBn: [
      'পাসপোর্টের মেয়াদ ভ্রমণ তারিখ থেকে নূন্যতম ৬ মাস থাকতে হবে।',
      'হোটেল স্ট্যান্ডার্ড রুম ডাবল/টুইন শেয়ারিং ভিত্তিতে প্রযোজ্য।',
      'আবহাওয়া বা এয়ারলাইন্সের কারণে সময়সূচী পরিবর্তন হতে পারে।',
    ],
    policiesEn: [
      'Passport must have at least 6 months validity from departure.',
      'Hotel rooms based on twin/double sharing basis.',
      'Schedule subject to weather and airline operations.',
    ],
    suitableForBn: 'কপল, ফ্যামিলি ও গ্রুপ পর্যটক',
    suitableForEn: 'Couples, Families & Group Tours',
    groupSizeBn: '২ - ৩০ জন কাস্টমাইজড ট্যুর',
    groupSizeEn: '2 - 30 Travelers Group',
    hotelsBn: [`${pkg.countryBn} ৪-স্টার লাক্সারি হোটেল`],
    hotelsEn: [`${pkg.countryEn} 4-Star Luxury Hotel`],
    rawItem: pkg,
  };
}

export function adaptBlogPost(post: BlogPost): StandardPackageItem {
  return {
    id: post.id,
    serviceType: 'Blog',
    titleBn: post.titleBn,
    titleEn: post.titleEn,
    durationBn: post.date,
    durationEn: post.date,
    locationBn: post.categoryBn,
    locationEn: post.categoryEn,
    priceBDT: 0,
    badgeBn: post.categoryBn,
    badgeEn: post.categoryEn,
    image: post.image,
    galleryImages: [
      post.image,
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusionsBn: [
      `লেখক: ${post.authorBn}`,
      `প্রকাশিত তারিখ: ${post.date}`,
      `ক্যাটাগরি: ${post.categoryBn}`,
    ],
    inclusionsEn: [
      `Author: ${post.authorEn}`,
      `Date: ${post.date}`,
      `Category: ${post.categoryEn}`,
    ],
    exclusionsBn: [],
    exclusionsEn: [],
    itinerary: [
      {
        dayNumber: '01',
        titleBn: 'মূল নিবন্ধ',
        titleEn: 'Main Article',
        descBn: post.contentBn,
        descEn: post.contentEn,
      },
    ],
    cancellationBn: '',
    cancellationEn: '',
    policiesBn: [],
    policiesEn: [],
    suitableForBn: 'সকল সম্মানিত পাঠকদের জন্য',
    suitableForEn: 'For All Readers & Pilgrims',
    groupSizeBn: 'পড়া শেষ করতে ৩ মিনিট',
    groupSizeEn: '3 Min Read Time',
    rawItem: post,
  };
}
