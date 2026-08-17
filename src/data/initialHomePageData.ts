import { HomePageConfig } from '../types';

export const initialHomePageConfig: HomePageConfig = {
  // Section Visibility Toggles
  showHeroSection: true,
  showHajjAnnouncementCard: true,
  showImportantInfoSection: true,
  showServicesSection: true,
  showFeaturedPackagesSection: true,
  showAccordionSection: true,
  showFeaturesSection: true,
  showAccreditationsSection: true,
  showContactBannerSection: true,

  // 1. Hero Section
  heroBgImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1920&q=80',
  typewriterMessagesBn: [
    'অনুমোদিত ও বিশ্বস্ত হজ্ব, উমরাহ্ এবং এয়ার টিকিট এজেন্সী',
    '১০০% বিশ্বস্ত ও শরীয়তসম্মত হজ্ব-উমরাহ্ সেবা',
    'বিশ্বস্ততায় আমাদের ৭+ বছরের গৌরবময় অভিজ্ঞতা',
    'সরাসরি পান্থপথ প্রধান কার্যালয় থেকে পরিচালিত'
  ],
  typewriterMessagesEn: [
    'Authorized & Trusted Hajj, Umrah & Air Ticket Agency',
    '100% Shariah-Compliant Hajj & Umrah Services',
    'Over 7+ Years of Trusted Pilgrimage Heritage',
    'Operated Directly from Panthapath Main Office'
  ],
  heroTitleBn: 'পবিত্র উমরাহ্, হজ্ব ও ফ্লাইট টিকিটে সর্বোচ্চ বিশ্বস্ততা',
  heroTitleEn: 'Your Trusted Partner for Holy Umrah, Hajj & Flights',
  heroSubtitleBn: 'ঢাকা পান্থপথ প্রধান কার্যালয় থেকে সরাসরি বাংলাদেশ সরকার ও সৌদি ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে পরিচালিত।',
  heroSubtitleEn: 'Operating directly from Panthapath main office with 100% Shariah compliance and government licensing.',
  stats: [
    {
      id: 'stat_1',
      valueBn: '৫০০০+',
      valueEn: '5,000+',
      labelBn: 'সফল হাজী সেবা',
      labelEn: 'Pilgrims Served'
    },
    {
      id: 'stat_2',
      valueBn: '০৭+ বছর',
      valueEn: '07+ Years',
      labelBn: 'অভিজ্ঞতা',
      labelEn: 'Experience'
    },
    {
      id: 'stat_3',
      valueBn: '১০০%',
      valueEn: '100%',
      labelBn: 'শরীয়তসম্মত',
      labelEn: 'Shariah Compliant'
    },
    {
      id: 'stat_4',
      valueBn: '২৪/৭',
      valueEn: '24/7',
      labelBn: 'হটলাইন সাপোর্ট',
      labelEn: 'Hotline Support'
    }
  ],
  trustBadges: [
    {
      id: 'badge_1',
      textBn: 'সরকারি অনুমোদিত এজেন্সী',
      textEn: 'Govt. Licensed Agency'
    },
    {
      id: 'badge_2',
      textBn: 'অভিজ্ঞ আলেম ও মোয়াল্লিম গাইড',
      textEn: 'Scholarly Guidance'
    },
    {
      id: 'badge_3',
      textBn: 'নিকটবর্তী হারাম শরীফ হোটেল',
      textEn: 'Nearby Haram Hotels'
    }
  ],
  heroBtnUmrahBn: 'উমরাহ্ প্যাকেজসমূহ',
  heroBtnUmrahEn: 'Umrah Packages',
  heroBtnHajjBn: 'পবিত্র হজ্ব ২০২৭',
  heroBtnHajjEn: 'Holy Hajj 2027',
  showHadithMarquee: true,

  // 2. Hajj Announcement Box (Right side of Hero)
  hajjCardBadgeBn: 'বিশেষ ঘোষণা',
  hajjCardBadgeEn: 'Announcement',
  hajjCardCycleBn: 'হজ্ব চক্র ২০২৭-২০২৮',
  hajjCardCycleEn: 'Cycle 2027-2028',
  hajjCardPortalUrl: 'https://hajj.gov.bd',
  hajjCardPortalTextBn: 'হজ পোর্টাল',
  hajjCardPortalTextEn: 'Hajj Portal',

  // Tab 1 (2027 Hajj)
  hajjTab1YearBn: '২০২৭',
  hajjTab1YearEn: '2027',
  hajjTab1TitleBn: '২০২৭ সালের পবিত্র হজ্ব প্রাক-নিবন্ধন',
  hajjTab1TitleEn: 'Holy Hajj 2027 Pre-Reg',
  hajjTab1SubtitleBn: 'প্রাথমিক প্রাক-নিবন্ধন কার্যক্রম চলছে',
  hajjTab1SubtitleEn: 'Primary registration is open',
  hajjTab1GovtFeeBn: '৩০,০০০ টাকা',
  hajjTab1GovtFeeEn: '30,000 BDT',
  hajjTab1StartDateBn: '০১ সেপ্টেম্বর ২০২৫',
  hajjTab1StartDateEn: '01 Sep 2025',
  hajjTab1EndDateBn: 'চলমান রয়েছে',
  hajjTab1EndDateEn: 'Ongoing',
  hajjTab1HajjDateBn: 'মে/জুন ২০২৭',
  hajjTab1HajjDateEn: 'May/Jun 2027',
  hajjTab1ConditionsBn: [
    'সর্বনিম্ন বয়স: হজে গমনেচ্ছু ব্যক্তির বয়স কমপক্ষে ১৫ বছর হতে হবে।',
    'পাসপোর্ট মেয়াদ: অন্তত ৩১ ডিসেম্বর ২০২৭ পর্যন্ত মেয়াদসহ বৈধ পাসপোর্ট থাকতে হবে।',
    'প্রাক-নিবন্ধন ফি: সরকারিভাবে নির্ধারিত প্রাক-নিবন্ধন ফি ৩০,০০০ টাকা।'
  ],
  hajjTab1ConditionsEn: [
    'Min Age: Age must be at least 15 years.',
    'Passport Validity: Valid passport required until at least 31 Dec 2027.',
    'Pre-reg Fee: Government prescribed pre-registration fee 30,000 BDT.'
  ],

  // Tab 2 (2028 Hajj)
  hajjTab2YearBn: '২০২৮',
  hajjTab2YearEn: '2028',
  hajjTab2TitleBn: '২০২৮ সালের হজ প্রাক-নিবন্ধন নির্দেশিকা',
  hajjTab2TitleEn: 'Hajj 2028 Notice',
  hajjTab2SubtitleBn: 'বর্তমানে যৌথভাবে ২০২৭-২০২৮ সালের হজের প্রাক-নিবন্ধন চলছে। প্রাক-নিবন্ধন সাধারণত ২ বছর কার্যকর থাকে।',
  hajjTab2SubtitleEn: 'Joint pre-registration for 2027-2028 is ongoing. Pre-registration remains valid for 2 years.',
  hajjTab2RegFeeBn: '৩০,০০০ টাকা',
  hajjTab2RegFeeEn: '30,000 BDT',
  hajjTab2ValidityBn: '২ বছর কার্যকর',
  hajjTab2ValidityEn: 'Valid 2 yrs',
  hajjTab2NoteBn: '২০২৭ সালের হজ সম্পন্ন হওয়ার পর ২০২৮ সালের মূল হজ প্যাকেজ ঘোষণা করা হবে।',
  hajjTab2NoteEn: 'Main package will be announced after Hajj 2027.',
  hajjCardCtaBtnBn: 'এখনই হজের রেজিস্ট্রেশন করুন',
  hajjCardCtaBtnEn: 'Register for Hajj Now',

  // 3. Important Guidance Section ("একটু জেনে নিন...")
  importantTaglineBn: 'Important Guidance',
  importantTaglineEn: 'Important Guidance',
  importantTitleBn: 'একটু জেনে নিন...',
  importantTitleEn: 'Key Information for Pilgrims',
  importantDescBn: 'যাঁরা পবিত্র উমরাহ্ ও হজ্ব পালন করতে চান, আমরা সরাসরি বাংলাদেশ সরকার ও সৌদি আরব ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে সেবা প্রদান করি। বিশেষত ঢাকা, কুমিল্লা, সিলেট ও চট্টগ্রামসহ সারা দেশের সম্মানিত হাজীদের এয়ার টিকিট, ভিসা প্রসেসিং এবং হারামের নিকটবর্তী থ্রি-স্টার / ফাইভ-স্টার হোটেল সুবিধা নিশ্চিত করা হয়।',
  importantDescEn: 'For pilgrims intending to perform Holy Umrah or Hajj, we strictly adhere to the guidelines of the Ministry of Religious Affairs Bangladesh and Saudi Arabia. We ensure seamless air tickets, visa processing, and guaranteed 3-star/5-star hotels near Haram.',
  importantBoxTitleBn: 'গুরত্বপূর্ণ যে বিষয়গুলো খেয়াল রাখবেন:',
  importantBoxTitleEn: 'Key Prerequisites:',
  importantBoxPointsBn: [
    'পাসপোর্টের মেয়াদ ন্যূনতম ৬ মাস অবশিষ্ট থাকতে হবে।',
    'অভিজ্ঞ মোয়াল্লেম দ্বারা উমরাহের তাওয়াফ ও সাঈ হাতে-কলমে প্রশিক্ষণ দেওয়া হয়।',
    'মক্কা ও মদিনায় ৩ বেলা দেশীয় সুস্বাদু খাবার অন্তর্ভুক্ত প্যাকেজের ব্যবস্থা রয়েছে।'
  ],
  importantBoxPointsEn: [
    'Passport must have at least 6 months validity.',
    'Hands-on Tawaf and Sa’i training provided by experienced Moallem.',
    'Delicious 3-time Bengali meals included in standard packages.'
  ],
  importantBtnTextBn: 'বিস্তারিত জানতে যোগাযোগ করুন',
  importantBtnTextEn: 'Contact for More Details',

  // 4. Core Services Section
  servicesTaglineBn: 'Our Core Services',
  servicesTaglineEn: 'Our Core Services',
  servicesTitleBn: 'আমাদের প্রধান সেবাসমূহ',
  servicesTitleEn: 'Our Major Services',
  servicesList: [
    {
      id: 'srv_umrah',
      emoji: '🕋',
      titleBn: 'উমরাহ্ প্যাকেজ',
      titleEn: 'Umrah Packages',
      descBn: 'শরীয়তসম্মত ও সুশৃঙ্খল উমরাহ্ সফরের জন্য বিভিন্ন ক্যাটাগরির বাজেট ও প্রিমিয়াম প্যাকেজ।',
      descEn: 'Shariah-compliant and disciplined Umrah packages for pilgrims.',
      btnTextBn: 'বিস্তারিত দেখুন',
      btnTextEn: 'View Details',
      pageId: 'umrah'
    },
    {
      id: 'srv_hajj',
      emoji: '🕌',
      titleBn: 'পবিত্র হজ্ব',
      titleEn: 'Holy Hajj',
      descBn: '২০২৭ সালের পবিত্র হজ্ব্বসহ দীর্ঘ ৪০ দিন ও সংক্ষিপ্ত মেয়াদী প্যাকেজ সুবিধা।',
      descEn: 'Long & short duration Holy Hajj 2027 packages.',
      btnTextBn: 'বিস্তারিত দেখুন',
      btnTextEn: 'View Details',
      pageId: 'hajj'
    },
    {
      id: 'srv_air',
      emoji: '✈️',
      titleBn: 'এয়ার টিকিট',
      titleEn: 'Air Tickets',
      descBn: 'সৌদিয়া, বিমান বাংলাদেশসহ দেশী-বিদেশী সকল এয়ারলাইন্সের টিকিট বুকিং।',
      descEn: 'Domestic & International flight bookings at best rates.',
      btnTextBn: 'বিস্তারিত দেখুন',
      btnTextEn: 'View Details',
      pageId: 'air-tickets'
    },
    {
      id: 'srv_tours',
      emoji: '🌍',
      titleBn: 'ট্যুর ও ভিসা',
      titleEn: 'Tours & Visas',
      descBn: 'থাইল্যান্ড, মালয়েশিয়া, দুবাই ও তুরস্ক ট্যুর প্যাকেজ এবং দ্রুত ই-ভিসা।',
      descEn: 'International tour packages and fast e-visa processing.',
      btnTextBn: 'বিস্তারিত দেখুন',
      btnTextEn: 'View Details',
      pageId: 'tours-visas'
    }
  ],

  // 5. Featured Packages Section
  featuredTaglineBn: 'Featured Packages',
  featuredTaglineEn: 'Featured Packages',
  featuredTitleBn: 'আমাদের বিশেষ আকর্ষণীয় প্যাকেজসমূহ',
  featuredTitleEn: 'Featured Umrah & Hajj Packages',
  featuredFilterAllBn: 'সব',
  featuredFilterAllEn: 'All',
  featuredFilterUmrahBn: 'উমরাহ্',
  featuredFilterUmrahEn: 'Umrah',
  featuredFilterHajjBn: 'হজ্ব',
  featuredFilterHajjEn: 'Hajj',
  featuredExploreBtnBn: 'সকল প্যাকেজ একসাথে দেখুন',
  featuredExploreBtnEn: 'Explore All Travel Packages',

  // 6. Accordion FAQ & Guides
  accordionTitleBn: 'আরও দেখুন & প্রয়োজনীয় নির্দেশিকা',
  accordionTitleEn: 'Explore More Guides & Instructions',
  accordionItems: [
    {
      id: 'acc_1',
      titleBn: 'ইতিহাস ও এজেন্সী পরিচিতি (Agency Background & History)',
      titleEn: 'Agency History & Background',
      contentBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস বিগত দীর্ঘ সময় ধরে সততা ও বিশ্বস্ততার সাথে বাংলাদেশ থেকে উমরাহ্, হজ্ব ও আন্তর্জাতিক ফ্লাইট সেবা প্রদান করে আসছে। আমাদের প্রধান লক্ষ্য হাজীদের সর্বোচ্চ খেদমত প্রদান করা।',
      contentEn: 'World Heritage Tours & Travels has been faithfully serving pilgrims and travelers from Bangladesh with top-rated flight and pilgrimage packages.'
    },
    {
      id: 'acc_2',
      titleBn: 'মেডিকেল ও ভ্রমণ নির্দেশিকা (Medical & Travel Rules)',
      titleEn: 'Medical & Travel Guidelines',
      contentBn: 'পবিত্র ভূমি মক্কা ও মদিনায় ভ্রমণের পূর্বে প্রয়োজনীয় স্বাস্থ্য পরীক্ষা, ম্যানিনজাইটিস টিকাদান এবং ট্রাভেল ইন্স্যুরেন্স সংক্রান্ত নির্দেশনাবলী আমাদের অফিস থেকে সার্বক্ষণিক প্রদান করা হয়।',
      contentEn: 'Health checkups, mandatory vaccinations, and travel insurance guidelines are thoroughly managed by our experienced team.'
    },
    {
      id: 'acc_3',
      titleBn: 'ভ্রমণ নির্দেশিকা ও ভিসা নীতি (Travel Guides & Visas)',
      titleEn: 'Travel Guides & Visa Policies',
      contentBn: 'সৌদি উমরাহ ভিসা, দুবাই ই-ভিসা, থাইল্যান্ড ট্যুরিস্ট ভিসা এবং এয়ার টিকিট বুকিংয়ের সঠিক ও সময়োপযোগী তথ্য জানতে আমাদের পান্থপথ অফিসে যোগাযোগ করুন।',
      contentEn: 'Contact our Panthapath office for Saudi Umrah E-visa, Dubai E-visa, and tourist visa processing.'
    }
  ],

  // 7. Distinctive Features
  featuresTitleBn: 'আমাদের বিশেষ বৈশিষ্ট্যসমূহ',
  featuresTitleEn: 'Our Distinctive Features',
  featuresListBn: [
    '১০০% বিশ্বস্ত ও শরীয়তসম্মত হজ্ব-উমরাহ্ কাফেলা',
    'মক্কা ও মদিনায় হারামের নিকটবর্তী থ্রি-স্টার ও ফাইভ-স্টার হোটেল',
    'অভিজ্ঞ আলেম ও মোয়াল্লিম দ্বারা সার্বক্ষণিক তত্ত্ববধান',
    '৩ বেলা উন্নতমানের দেশীয় সুস্বাদু হালাল খাবার পরিবেশন',
    'ভিআইপি শীতাতপ নিয়ন্ত্রিত (AC) কোচে জিয়ারত ভ্রমণ',
    'দ্রুততম সময়ে উমরাহ্ ও সকল দেশের ই-ভিসা প্রসেসিং'
  ],
  featuresListEn: [
    '100% Shariah-Compliant Hajj & Umrah Services',
    '3-Star and 5-Star Hotel Accommodations Near Haram',
    'Guided by Prominent Scholars & Certified Moallems',
    '3 Times Fresh & Delicious Bengali Halal Buffet Meals',
    'VIP Air-Conditioned Transport for Historical Ziyarah',
    'Superfast E-Visa Processing & Guaranteed Ticketing'
  ],

  // 8. Accreditations & Licenses
  accreditationsTaglineBn: 'Govt. Approved & Licensed Agency',
  accreditationsTaglineEn: 'Govt. Approved & Licensed Agency',
  accreditationsTitleBn: 'আমাদের সরকারি স্বীকৃতি ও আইএটিএ সদস্যপদ',
  accreditationsTitleEn: 'Our Government Approvals & Licenses',
  accreditationsList: [
    {
      id: 'acc_moa',
      iconName: 'ShieldCheck',
      titleBn: 'বাংলাদেশ ধর্ম মন্ত্রণালয়',
      titleEn: 'Ministry of Religious Affairs',
      subBn: 'অনুমোদিত হজ্ব এজেন্সী',
      subEn: 'Approved Hajj Agency'
    },
    {
      id: 'acc_saudi',
      iconName: 'Award',
      titleBn: 'সৌদি উমরাহ্ মন্ত্রণালয়',
      titleEn: 'Saudi Ministry of Hajj & Umrah',
      subBn: 'নিবন্ধিত সৌদি পার্টনার',
      subEn: 'Registered Saudi Partner'
    },
    {
      id: 'acc_caab',
      iconName: 'Building2',
      titleBn: 'সিভিল এভিয়েশন কর্তৃপক্ষ',
      titleEn: 'Civil Aviation Authority (CAAB)',
      subBn: 'লাইসেন্সপ্রাপ্ত ট্রাভেল এজেন্ট',
      subEn: 'Licensed Ticket Agent'
    },
    {
      id: 'acc_iata',
      iconName: 'Plane',
      titleBn: 'আইএটিএ মেম্বার',
      titleEn: 'IATA Member',
      subBn: 'গ্লোবাল এয়ারলাইন এক্সেস',
      subEn: 'Global Airline Access'
    }
  ],

  // 9. Contact Hotline Banner
  contactBannerTitleBn: 'যেকোনো জিজ্ঞাসায় সরাসরি আমাদের হটলাইনে যোগাযোগ করুন',
  contactBannerTitleEn: 'Call Us Directly for Any Flight or Package Query',
  contactBannerSubtitleBn: 'প্রধান অফিস: পশ্চিম পান্থপথ জামে-মসজিদের বিপরীত পাশে, ঢাকা-১২১৫',
  contactBannerSubtitleEn: 'Panthapath Main Office, Opposite to West Panthapath Mosque, Dhaka-1215',
  contactBannerHotline: '01841-868778',
  contactBannerHotlineLabelBn: 'হোয়াটসঅ্যাপ & ইমো',
  contactBannerHotlineLabelEn: 'WhatsApp & Imo',
  contactBannerCtaBtnBn: 'সরাসরি যোগাযোগ করুন',
  contactBannerCtaBtnEn: 'Contact Us Directly'
};
