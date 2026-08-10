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
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565552070098-fd83a8dec7df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
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
  return {
    id: pkg.id,
    serviceType: 'Hajj',
    titleBn: pkg.titleBn,
    titleEn: pkg.titleEn,
    durationBn: pkg.durationBn,
    durationEn: pkg.durationEn,
    locationBn: 'মক্কা, মদীনা, মিনা, আরাফাত ও মুজদালিফা',
    locationEn: 'Makkah, Madinah, Mina, Arafat & Muzdalifah',
    priceBDT: pkg.totalPriceBDT,
    badgeBn: `হজ্ব ${pkg.year}`,
    badgeEn: `Hajj ${pkg.year}`,
    image: pkg.image,
    galleryImages: [
      pkg.image,
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565552070098-fd83a8dec7df?auto=format&fit=crop&w=800&q=80',
    ],
    inclusionsBn: pkg.facilitiesBn || [
      'সরকারি হজ্ব প্রাক-নিবন্ধন ও চূড়ান্ত নিবন্ধন',
      'সৌদি হজ্ব ভিসা, ব্যাংক ড্রাফট ও মোয়াল্লেম ফি',
      'ঢাকা-জেদ্দা-ঢাকা এয়ার টিকিট',
      `মক্কা হোটেল: ${pkg.makkahHotelBn}`,
      `মদীনা হোটেল: ${pkg.madinahHotelBn}`,
      'মিনা ও আরাফাত তাঁবুতে শীতাতপ নিয়ন্ত্রিত অবস্থান',
      pkg.foodBn,
      pkg.transportBn,
      `অভিজ্ঞ মোয়াল্লেম: ${pkg.moallemBn}`,
    ],
    inclusionsEn: pkg.facilitiesEn || [
      'Government Hajj Pre-Registration & Final Approval',
      'Saudi Hajj Visa, Bank Draft & Moallem Fees',
      'Roundtrip Airfare (Dhaka-Jeddah-Dhaka)',
      `Makkah Hotel: ${pkg.makkahHotelEn}`,
      `Madinah Hotel: ${pkg.madinahHotelEn}`,
      'AC Tent Accommodation in Mina & Arafat',
      pkg.foodEn,
      pkg.transportEn,
      `Guided Moallem: ${pkg.moallemEn}`,
    ],
    exclusionsBn: [
      'কুরবানি ফি (প্রয়োজন অনুযায়ী অতিরিক্ত)',
      'ব্যক্তিগত কেনাকাটা ও ঔষধের খরচ',
      'অতিরিক্ত লাগেজ ও ব্যক্তিগত পরিবহন',
    ],
    exclusionsEn: [
      'Qurbani/Sacrifice charge (payable separately)',
      'Personal shopping, phone, and medical costs',
      'Excess baggage & individual transport outside schedule',
    ],
    itinerary: [
      {
        dayNumber: '01',
        titleBn: 'ঢাকাস্থ আশকোনা হজ্ব ক্যাম্প থেকে জেদ্দা গমন',
        titleEn: 'Departure from Ashkona Hajj Camp, Dhaka to Jeddah',
        descBn: 'সরকারি নিয়ম মেনে ফ্লাইট পূর্ববর্তী ইমিগ্রেশন ও এয়ারপোর্ট কার্যক্রম সম্পন্ন করে জেদ্দার উদ্দেশ্যে রওয়ানা। জেদ্দা থেকে মক্কার হোটেলে অবস্থান।',
        descEn: 'Complete immigration at Dhaka Hajj Camp, depart for Jeddah flight, and check-in to Makkah hotel.',
        mealsBn: 'ফ্লাইট ও হোটেল ক্যাটারিং',
        mealsEn: 'In-Flight & Catering',
      },
      {
        dayNumber: '02-07',
        titleBn: 'মক্কায় ইবাদত ও হজ্ব প্রাক-প্রস্তুতি',
        titleEn: 'Makkah Stay & Hajj Preparation',
        descBn: 'পবিত্র কাবা শরীফে সালাত আদায়, নফল তাওয়াফ এবং মোয়াল্লেমের অধীনে হজ্বের মাসায়েল প্রশিক্ষণ ক্লাস।',
        descEn: 'Daily prayers at Kaaba, Tawaf, and Hajj guidelines orientation by experienced Moallem.',
        mealsBn: '৩ বেলা বাংলা খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '08',
        titleBn: '৮ জিলহজ্জ - মিনা তাঁবু সিটিতে আগমন',
        titleEn: '8th Dhul Hijjah - Arrival at Mina Tent City',
        descBn: 'ইহরাম পরিধান করে তালবিয়া পাঠ করতে করতে মিনা তাঁবুতে গমন ও অবস্থান। ৫ ওয়াক্ত সালাত মিনায় আদায়।',
        descEn: 'Enter Ihram state, recite Talbiyah, and move to Mina AC Tent City for 5 mandatory prayers.',
        mealsBn: 'মিনা ক্যাটারিং সেবা',
        mealsEn: 'Mina Catering Service',
      },
      {
        dayNumber: '09',
        titleBn: '৯ জিলহজ্জ - আরাফাত ময়দান ও মুজদালিফায় অবস্থান (মূল হজ্ব)',
        titleEn: '9th Dhul Hijjah - Day of Arafat & Night at Muzdalifah (Core Hajj)',
        descBn: 'আরাফাতের ময়দানে উকুফ (অবস্থান) ও খুতবা শ্রবণ। সূর্যাস্তের পর মুজদালিফায় গমন, খোলা আকাশের নিচে রাত যাপন ও কঙ্কর সংগ্রহ।',
        descEn: 'Perform Wuquf at Arafat Plains, listen to Khutbah. After sunset proceed to Muzdalifah for overnight stay & pebble collection.',
        mealsBn: 'আরাফাত ও মুজদালিফা খাবার প্যাকেট',
        mealsEn: 'Arafat & Muzdalifah Meals',
      },
      {
        dayNumber: '10',
        titleBn: '১০ জিলহজ্জ - জামারাতে কঙ্কর নিক্ষেপ, কুরবানি ও তাওয়াফে যিয়ারাহ্',
        titleEn: '10th Dhul Hijjah - Stoning Jamarat, Qurbani & Tawaf al-Ziyarah',
        descBn: 'বড় শয়তানকে কঙ্কর নিক্ষেপ, কুরবানি সম্পন্ন, মাথা মুণ্ডন (হালাক) করে ইহরাম খোলা এবং মক্কায় তাওয়াফে যিয়ারাহ্ ও সাঈ আদায়।',
        descEn: 'Pebble stoning at Jamarat al-Aqaba, perform Qurbani, Halq/shave head, and Tawaf al-Ziyarah at Kaaba.',
        mealsBn: '৩ বেলা খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '11-12',
        titleBn: '১১-১২ জিলহজ্জ - মিনায় অবস্থান ও ৩ শয়তানকে কঙ্কর নিক্ষেপ',
        titleEn: '11-12th Dhul Hijjah - Mina Stay & Stoning 3 Jamarat',
        descBn: 'মিনায় অবস্থান এবং প্রতিদিন ছোট, মধ্যম ও বড় শয়তানকে ৭টি করে কঙ্কর নিক্ষেপ। মক্কার হোটেলে প্রত্যাবর্তন।',
        descEn: 'Stay in Mina tents, pelt 7 pebbles at each of the 3 Jamarat daily, and return to Makkah hotel.',
        mealsBn: '৩ বেলা খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '13-30',
        titleBn: 'মক্কা ও মদীনা মুনাওয়ারাহ অবস্থান',
        titleEn: 'Extended Stay at Makkah & Madinah',
        descBn: 'রাসূল (সাঃ)-এর শহর মদীনায় ৮ দিন অবস্থান করে ৪০ ওয়াক্ত নামাজ আদায় ও রওজা শরীফে সালাম নিবেদন।',
        descEn: 'Stay at Madinah Al-Munawwarah for prayers at Prophet\'s Mosque and Rawdah Mubarak Salam.',
        mealsBn: '৩ বেলা খাবার',
        mealsEn: '3 Meals Daily',
      },
      {
        dayNumber: '40',
        titleBn: 'বিদায়ী তাওয়াফ ও ঢাকায় প্রত্যাবর্তন',
        titleEn: 'Farewell Tawaf & Flight Back to Dhaka',
        descBn: 'বিদায়ী তাওয়াফ সম্পন্ন করে জেদ্দা/মদীনা বিমানবন্দর থেকে হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর ঢাকায় প্রত্যাবর্তন।',
        descEn: 'Complete Tawaf al-Wada (Farewell Tawaf) and return to Dhaka with holy Hajj Mabrur.',
        mealsBn: 'ফ্লাইট খাবার',
        mealsEn: 'In-Flight Catering',
      },
    ],
    cancellationBn: 'বাংলাদেশ ধর্ম মন্ত্রণালয় ও সৌদি হজ্ব কর্তৃপক্ষের পলিসি অনুযায়ী হজ্ব প্রাক-নিবন্ধন ফি অফেরতযোগ্য হতে পারে।',
    cancellationEn: 'Hajj registration and Moallem draft fees are subject to Ministry of Religious Affairs regulations.',
    policiesBn: [
      'জাতীয় পরিচয়পত্র (NID) ও বায়োমেট্রিক পাসপোর্ট বাধ্যতামূলক।',
      'শারীরিক ফিটনেস সনদ ও ভ্যাকসিন কার্ড আবশ্যক।',
      'সৌদি হজ্ব মন্ত্রণালয়ের সার্বিক নিয়ম মেনে চলতে হবে।',
    ],
    policiesEn: [
      'National ID (NID) & Biometric Passport are mandatory.',
      'Medical fitness certificate and vaccination card required.',
      'Must follow Saudi Ministry of Hajj rules.',
    ],
    suitableForBn: 'হজ্বযাত্রী (১৮ থেকে ঊর্ধ্ব)',
    suitableForEn: 'Hajj Pilgrims (Adults)',
    groupSizeBn: 'সরকারি অনুমোদিত ৫০ জন হজ্ব কাফেলা',
    groupSizeEn: '50 Pilgrims Authorized Group',
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
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
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
