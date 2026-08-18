import React, { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Star,
  Layers,
  Sparkles,
  Check,
  Calendar,
  ArrowUp,
  ArrowDown,
  Clock,
  Utensils,
  FileText,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PackageItineraryDay } from "../types";

// Curated high-res stock photo presets for easy selection
export const STOCK_PHOTO_PRESETS = {
  umrah: [
    {
      title: "পবিত্র কাবা শরীফ তাওয়াফ",
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মসজিদে নববী মদীনা",
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "কাবা চত্বর ড্রোন ভিউ",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মদীনা মুনাওয়ারা গম্বুজ",
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মক্কার ক্লক টাওয়ার ভিউ",
      url: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "হারাম শরীফে ইবাদত",
      url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "জাবালে নূর (হেরা গুহা)",
      url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "পবিত্র জমজম ও তাহাজ্জুদ",
      url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মদীনার রওজা মোবারক চত্বর",
      url: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "উমরাহ্ হাজী কাফেলা",
      url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  hajj: [
    {
      title: "পবিত্র কাবা শরীফ",
      url: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মিনা তাঁবু নগরী",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "আরাফাত ময়দান ও জাবালে রহমত",
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মসজিদে নববী মদীনা",
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মুজদালিফা প্রান্তর",
      url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "হারামাইন বুলেট ট্রেন",
      url: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মক্কা ৫-স্টার হোটেল চত্বর",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "হজ্ব কাফেলা ও মোয়াল্লেম দিকনির্দেশনা",
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  tour: [
    {
      title: "তুর্কি ইস্তাম্বুল ব্লু মস্ক",
      url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "দুবাই সিটি ও বুর্জ খলিফা",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মালয়েশিয়া কুয়ালালামপুর",
      url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মালদ্বীপ নীল সমুদ্র বিচ",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "থাইল্যান্ড ফুকেট দ্বীপপুঞ্জ",
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "কক্সবাজার সমুদ্র সৈকত",
      url: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  blog: [
    {
      title: "উমরাহ্ নিয়ত ও দোয়া",
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "মদীনা মুনাওয়ারা জিয়ারাহ",
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "হজ্ব ও উমরাহ্ প্রস্তুতি",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

// Default itinerary templates
export const DEFAULT_UMRAH_ITINERARY: PackageItineraryDay[] = [
  {
    dayNumber: "01",
    titleBn: "ঢাকা থেকে ডিরেক্ট ফ্লাইটে জেদ্দা আগমন ও প্রথম উমরাহ্ সম্পন্নকরণ",
    titleEn:
      "Direct Flight Arrival from Dhaka to Jeddah & Perform Welcome Umrah",
    descBn:
      "ঢাকার হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে জেদ্দার উদ্দেশ্যে যাত্রা। জেদ্দা বিমানবন্দরে আমাদের প্রতিনিধি কর্তৃক উষ্ণ অভ্যর্থনা, শীতাতপ নিয়ন্ত্রিত লাক্সারি বাসে মক্কা হোটেলে চেক-ইন এবং অভিজ্ঞ মোয়াল্লেমের পরিচালনায় প্রথম উমরাহ্ (তাওয়াফ, সাঈ ও হালাক) সম্পন্নকরণ।",
    descEn:
      "Depart Dhaka to Jeddah. Warm airport reception, AC transfer to Makkah hotel, check-in, and perform first Umrah under expert Moallem guidance.",
    mealsBn: "ফ্লাইট খাবার ও হোটেলের রাতের বুফে খাবার",
    mealsEn: "In-Flight Catering & Hotel Dinner",
  },
  {
    dayNumber: "02",
    titleBn: "মসজিদুল হারামে ৫ ওয়াক্ত সালাত আদায় ও নফল তাওয়াফ",
    titleEn: "5 Daily Prayers at Masjid al-Haram & Voluntary Tawaf",
    descBn:
      "পবিত্র মসজিদুল হারামে ৫ ওয়াক্ত জামাতে নামাজ আদায়, নফল তাওয়াফ, জমজমের পানি পান এবং কুরআন তেলাওয়াতে আত্মনিয়োগ।",
    descEn:
      "Attend daily prayers in congregation at Kaaba, perform voluntary Tawaf and spend time in Quran recitation.",
    mealsBn: "সকাল, দুপুর ও রাতের সুস্বাদু দেশি খাবার",
    mealsEn: "Breakfast, Lunch & Dinner",
  },
  {
    dayNumber: "03",
    titleBn: "মক্কা নগরীর ঐতিহাসিক স্থানসমূহ জিয়ারাহ্ (প্রথম পর্ব)",
    titleEn: "Makkah Historical Ziyarah Tour (Part 1)",
    descBn:
      "অভিজ্ঞ প্রবীণ আলেমের সাথে এসি কোচে জাবালে নূর (হেরা গুহা), জাবালে সওর (সওর গুহা), জান্নাতুল মুয়াল্লা কবরস্থান এবং মসজিদুল জিন পরিদর্শন।",
    descEn:
      "Guided Ziyarah to Cave Hira (Jabal al-Nour), Cave Thawr, Jannatul Mualla, and Masjid al-Jinn.",
    mealsBn: "৩ বেলা উন্নত মানের বাংলা খাবার",
    mealsEn: "3 Quality Bengali Meals",
  },
  {
    dayNumber: "04",
    titleBn: "মিনা, আরাফাত ময়দান, মুজদালিফা ও জাবালে রহমত জিয়ারাহ্",
    titleEn: "Ziyarah to Mina, Arafat, Muzdalifah & Jabal al-Rahmah",
    descBn:
      "হজ্বের পবিত্র স্থানসমূহ—মিনা তাঁবু প্রান্তর, জামারাত (শয়তানের স্থান), আরাফাতের ময়দান, নামিরা মসজিদ এবং জাবালে রহমত পরিদর্শন ও বিশেষ মোনাজাত।",
    descEn:
      "Visit holy Hajj sites: Mina, Jamarat, Plains of Arafat, Masjid Nimrah, and Jabal al-Rahmah with special Dua.",
    mealsBn: "৩ বেলা উন্নত মানের খাবার",
    mealsEn: "3 Quality Meals",
  },
  {
    dayNumber: "05-08",
    titleBn: "মসজিদে আয়েশা (তানঈম) থেকে নফল উমরাহ্ ও তাহাজ্জুদ",
    titleEn: "Optional Umrah from Masjid Aisha & Tahajjud at Kaaba",
    descBn:
      "কাফেলার সাথে মসজিদে আয়েশা (তানঈম) বা জু’রানা থেকে অতিরিক্ত নফল উমরাহ্ আদায় করার সুযোগ। হারামে রাতযাপন ও তাহাজ্জুদ সালাত।",
    descEn:
      "Opportunity for optional Umrah from Masjid Taneem / Jurana. Night stay and Tahajjud at Haram Sharif.",
    mealsBn: "৩ বেলা সুস্বাদু দেশি খাবার",
    mealsEn: "3 Daily Bengali Meals",
  },
  {
    dayNumber: "09",
    titleBn: "মক্কা থেকে মদীনা মুনাওয়ারায় যাত্রা ও মসজিদে নববীতে সালাম পেশ",
    titleEn: "Transfer to Madinah Al-Munawwarah & Salam at Rawdah Mubarak",
    descBn:
      "মক্কার হোটেল চেক-আউট করে আধুনিক এসি বাসে বা বুলেট ট্রেনে মদীনা মুনাওয়ারায় আগমন। হোটেলে চেক-ইন শেষে মসজিদে নববীতে নামাজ আদায় এবং প্রিয় নবী হযরত মুহাম্মদ (সা.)-এর পবিত্র রওজা মোবারক ও রিয়াদুল জান্নাহ্তে সালাম নিবেদন।",
    descEn:
      "Check-out from Makkah, transfer to Madinah via AC luxury bus/bullet train. Check-in, pray at Prophet's Mosque and offer Salam at Rawdah Mubarak.",
    mealsBn: "সকাল, দুপুর ও রাতের খাবার",
    mealsEn: "Breakfast, Lunch & Dinner",
  },
  {
    dayNumber: "10",
    titleBn: "মদীনা মুনাওয়ারার বরকতময় ঐতিহাসিক স্থানসমূহ জিয়ারাহ্",
    titleEn: "Madinah Historical Ziyarah Tour",
    descBn:
      "ইসলামের প্রথম মসজিদ 'মসজিদে কুবা' (২ রাকাত নামাজে ১ উমরাহ্ সওয়াব), মসজিদে কিবলাতাইন, ঐতিহাসিক ওহুদ প্রান্তর (হামজা রা. সহ শহীদদের কবরস্থান) ও খন্দকের সাত মসজিদ পরিদর্শনের মাধ্যমে জিয়ারাহ্ সম্পন্ন।",
    descEn:
      "Ziyarah to Masjid Quba (2 Rakat prayer), Masjid al-Qiblatayn, Mount Uhud martyrs cemetery, and Seven Mosques (Battle of Trench).",
    mealsBn: "৩ বেলা মানসম্মত খাবার",
    mealsEn: "3 Daily Meals",
  },
  {
    dayNumber: "11-13",
    titleBn: "মসজিদে নববীতে ৪০ ওয়াক্ত সালাত, রিয়াদুল জান্নাহ্ ও বদর প্রান্তর",
    titleEn: "40 Prayers at Prophet's Mosque, Rawdah Access & Historic Badr",
    descBn:
      "মসজিদে নববীতে নিয়মিত সালাত আদায়, নুসুক অ্যাপসের মাধ্যমে রিয়াদুল জান্নাহ্তে নফল নামাজ এবং ঐতিহাসিক বদর প্রান্তর বা খেজুরের ঐতিহ্যবাহী বাজারে কেনাকাটা।",
    descEn:
      "Offer prayers at Masjid an-Nabawi, pray in Rawdah Sharif via Nusuk permit, and visit historic Badr & dates market.",
    mealsBn: "৩ বেলা সুস্বাদু দেশি খাবার",
    mealsEn: "3 Quality Meals Daily",
  },
  {
    dayNumber: "14-15",
    titleBn:
      "বিদায়ী সালাম ও মদীনা/জেদ্দা বিমানবন্দর থেকে ঢাকায় শুভ প্রত্যাবর্তন",
    titleEn: "Farewell Salam & Return Flight to Dhaka Airport",
    descBn:
      "রওজা শরীফে বিদায়ী সালাম নিবেদন ও মোনাজাত শেষে হোটেল চেক-আউট। নির্ধারিত সময়ে বিমানবন্দরে ড্রপ অফ এবং পবিত্র সফর শেষে নিরাপদে ঢাকায় প্রত্যাবর্তন।",
    descEn:
      "Farewell Salam at Prophet's Mosque, hotel check-out, transfer to airport, and safe return flight to Dhaka.",
    mealsBn: "প্রাতরাশ ও ফ্লাইট ক্যাটারিং",
    mealsEn: "Breakfast & In-Flight Meals",
  },
];

export const DEFAULT_HAJJ_ITINERARY: PackageItineraryDay[] = [
  {
    dayNumber: "01",
    titleBn: "ঢাকা থেকে ডিরেক্ট ফ্লাইটে জেদ্দা/মদীনা আগমন",
    titleEn: "Direct Flight Arrival from Dhaka to Saudi Arabia",
    descBn:
      "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে ডিরেক্ট ফ্লাইটে সৌদি আরব আগমন। এয়ারপোর্টে অভ্যর্থনা শেষে শীতাতপ নিয়ন্ত্রিত বাসে হোটেলে চেক-ইন ও প্রথম উমরাহ্ আদায়।",
    descEn:
      "Depart Dhaka, arrive in Saudi Arabia, airport reception, transfer by AC bus to hotel, and perform welcome Umrah.",
    mealsBn: "ফ্লাইট ও হোটেল ক্যাটারিং",
    mealsEn: "In-Flight & Hotel Catering",
  },
  {
    dayNumber: "02-07",
    titleBn: "পবিত্র হারামাইন শরিফাইনে ইবাদত ও হজ্ব প্রস্তুতি",
    titleEn: "Prayers in Holy Harams & Pre-Hajj Orientation",
    descBn:
      "পবিত্র কাবা শরিফ ও মসজিদে নববীতে ৫ ওয়াক্ত সালাত আদায়, নফল তাওয়াফ ও মোয়াল্লেমের পরিচালনায় ব্যবহারিক হজ্ব প্রশিক্ষণ কর্মশালা।",
    descEn:
      "Daily prayers at Holy Kaaba & Prophet's Mosque, Nafil Tawaf, and practical Hajj workshop by Islamic scholars.",
    mealsBn: "৩ বেলা উন্নত মানসম্মত বাংলা খাবার",
    mealsEn: "3 Quality Bengali Meals Daily",
  },
  {
    dayNumber: "08",
    titleBn: "৮ জিলহজ্জ - তালবিয়া পাঠসহ মিনা তাঁবু সিটিতে আগমন",
    titleEn: "8th Dhul Hijjah - Move to Mina AC Tent City with Talbiyah",
    descBn:
      'ইহরাম পরিধান করে "লাব্বায়েক আল্লাহুম্মা লাব্বায়েক" পাঠ করতে করতে মিনা তাঁবু সিটিতে অবস্থান। ৫ ওয়াক্ত নামাজ মিনায় আদায় ও রাতযাপন।',
    descEn:
      "Wear Ihram, continuously recite Talbiyah, and settle into Mina AC Tent City for 5 mandatory prayers & overnight stay.",
    mealsBn: "মিনা ক্যাটারিং সেবা",
    mealsEn: "Mina VIP Catering Service",
  },
  {
    dayNumber: "09",
    titleBn:
      "৯ জিলহজ্জ - আরাফাত ময়দানে অবস্থান (মূল হজ্ব) ও মুজদালিফায় রাতযাপন",
    titleEn: "9th Dhul Hijjah - Day of Arafat (Core Hajj) & Muzdalifah Night",
    descBn:
      "সূর্যোদয়ের পর আরাফাতের ময়দানে উকুফ (অবস্থান), খুতবা শ্রবণ ও মোনাজাত। সূর্যাস্তের পর মুজদালিফায় গমন, খোলা আকাশের নিচে রাতযাপন ও কঙ্কর সংগ্রহ।",
    descEn:
      "Wuquf at Arafat Plains, listen to Hajj Khutbah and Duas. After sunset move to Muzdalifah for open-sky night stay & collecting pebbles.",
    mealsBn: "আরাফাত ও মুজদালিফা বিশেষ খাবার প্যাকেট",
    mealsEn: "Arafat & Muzdalifah Meal Packs",
  },
  {
    dayNumber: "10",
    titleBn: "১০ জিলহজ্জ - জামারাতে কঙ্কর নিক্ষেপ, কোরবানি ও তাওয়াফে জিয়ারাহ",
    titleEn: "10th Dhul Hijjah - Jamarat Stoning, Qurbani & Tawaf al-Ziyarah",
    descBn:
      "মুজদালিফা থেকে মিনায় এসে বড় শয়তানকে ৭টি কঙ্কর নিক্ষেপ, প্যাকেজভুক্ত কোরবানি সম্পন্ন, মাথা মুণ্ডন (হালাক) করে ইহরাম খোলা এবং মক্কায় তাওয়াফে জিয়ারাহ ও সাঈ আদায়।",
    descEn:
      "Stone Jamarat al-Aqaba, complete included Qurbani, shave head (Halq) to exit Ihram, and perform Tawaf al-Ziyarah & Sai at Kaaba.",
    mealsBn: "৩ বেলা উন্নত খাবার",
    mealsEn: "3 Quality Meals Daily",
  },
  {
    dayNumber: "11-12",
    titleBn: "১১-১২ জিলহজ্জ - মিনায় অবস্থান ও ৩ শয়তানকে কঙ্কর নিক্ষেপ",
    titleEn: "11-12th Dhul Hijjah - Mina Days & Stoning 3 Jamarat",
    descBn:
      "মিনায় অবস্থান এবং প্রতিদিন ছোট, মধ্যম ও বড় শয়তানকে ৭টি করে কঙ্কর নিক্ষেপ সম্পন্ন করে মক্কার হোটেলে প্রত্যাবর্তন।",
    descEn:
      "Stay in Mina tents, pelt 7 pebbles at each of the 3 Jamarat daily, and return smoothly to Makkah hotel.",
    mealsBn: "৩ বেলা উন্নত খাবার",
    mealsEn: "3 Quality Meals Daily",
  },
  {
    dayNumber: "13-28",
    titleBn:
      "মক্কা-মদিনা বুলেট ট্রেনে ভ্রমণ ও ঐতিহাসিক জিয়ারাহ (তায়েফ, জেদ্দা, বদর)",
    titleEn:
      "Haramain Bullet Train Ride & Extended Ziyarah (Taif, Jeddah, Badr)",
    descBn:
      "সৌদি আরবের আধুনিক বুলেট ট্রেনে (Haramain Bullet Train) মক্কা-মদিনা যাতায়াত। মদীনায় মসজিদে নববীতে ৪০ ওয়াক্ত নামাজ ও রওজা শরিফে সালাম নিবেদন। মক্কা, মদিনা, তায়েফ, জেদ্দা ও বদর প্রান্তরে বিশেষ জিয়ারাহ।",
    descEn:
      "Experience high-speed Haramain Bullet Train journey between Makkah and Madinah. 40 prayers at Prophet's Mosque, Rawdah Mubarak Salam, and extended Ziyarah.",
    mealsBn: "৩ বেলা উন্নত মানসম্মত বাংলা খাবার",
    mealsEn: "3 Quality Bengali Meals Daily",
  },
  {
    dayNumber: "29-40",
    titleBn: "বিদায়ী তাওয়াফ ও ডিরেক্ট ফ্লাইটে ঢাকায় শুভ প্রত্যাবর্তন",
    titleEn: "Farewell Tawaf & Direct Flight Back to Dhaka",
    descBn:
      "পবিত্র কাবা শরিফে বিদায়ী তাওয়াফ সম্পন্ন করে জেদ্দা/মদীনা আন্তর্জাতিক বিমানবন্দর থেকে ডিরেক্ট ফ্লাইটে হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর ঢাকায় প্রত্যাবর্তন।",
    descEn:
      "Complete Tawaf al-Wada (Farewell Tawaf) and return to Dhaka on scheduled direct flight.",
    mealsBn: "ফ্লাইট খাবার ও বুফে ক্যাটারিং",
    mealsEn: "In-Flight Catering & Meals",
  },
];

export const DEFAULT_TOUR_ITINERARY: PackageItineraryDay[] = [
  {
    dayNumber: "01",
    titleBn: "গন্তব্যে আগমন ও লাক্সারি হোটেল চেক-ইন",
    titleEn: "Arrival & Luxury Hotel Check-in",
    descBn:
      "বিমানবন্দরে পৌঁছানোর পর আমাদের প্রতিনিধি আপনাকে উষ্ণ স্বাগত জানাবে এবং শীতাতপ নিয়ন্ত্রিত গাড়িতে হোটেলে নিয়ে যাবে। চেক-ইন শেষে দিনের অবশিষ্টাংশ নিজের মতো কাটানোর সুযোগ।",
    descEn:
      "Warm welcome by representative at airport, AC transfer to hotel, check-in and leisure time.",
    mealsBn: "ওয়েলকাম ড্রিংকস ও রাতের খাবার",
    mealsEn: "Welcome Drink & Dinner",
  },
  {
    dayNumber: "02",
    titleBn: "সিটি ট্যুর ও ঐতিহাসিক বিখ্যাত দর্শনীয় স্থানসমূহ",
    titleEn: "City Tour & Historical Sightseeing Excursion",
    descBn:
      "হোটেল প্রাতরাশ শেষে শহরের প্রধান প্রধান পর্যটন কেন্দ্র, বিখ্যাত স্থাপত্য ও দর্শনীয় স্থান পরিদর্শন। দুপুরে স্থানীয় বিখ্যাত রেস্তোরাঁয় খাবারের অভিজ্ঞতা।",
    descEn:
      "Guided city sightseeing tour visiting iconic monuments, historical landmarks, and culture spots.",
    mealsBn: "বুফে প্রাতরাশ ও লাঞ্চ",
    mealsEn: "Buffet Breakfast & Lunch",
  },
  {
    dayNumber: "03",
    titleBn: "প্রাকৃতিক নৈসর্গিক সৌন্দর্য ভ্রমণ ও ক্রুজ/অ্যাডভেঞ্চার",
    titleEn: "Nature Expedition & Cruise Adventure",
    descBn:
      "সমুদ্র সৈকত, পাহাড়, বিখ্যাত দ্বীপ বা হ্রদে নৈসর্গিক ভ্রমণ। বোটিং/ক্রুজ ও ছবি তোলার জন্য চমৎকার সময়।",
    descEn:
      "Scenic tour to pristine beaches, hills, islands, or lakes with boating/cruise experiences.",
    mealsBn: "বুফে প্রাতরাশ",
    mealsEn: "Buffet Breakfast",
  },
  {
    dayNumber: "04",
    titleBn: "ঐতিহ্যবাহী মার্কেট শপিং ও মুক্ত সময়",
    titleEn: "Traditional Shopping & Leisure Time",
    descBn:
      "বিখ্যাত ট্রেডিশনাল মার্কেট ও মল থেকে প্রিয়জনদের জন্য আকর্ষণীয় উপহারসামগ্রী কেনাকাটা করার মুক্ত সময়।",
    descEn:
      "Free day for souvenir shopping at local markets and trying regional food.",
    mealsBn: "বুফে প্রাতরাশ",
    mealsEn: "Buffet Breakfast",
  },
  {
    dayNumber: "05",
    titleBn: "হোটেল চেক-আউট ও ঢাকায় শুভ প্রত্যাবর্তন",
    titleEn: "Hotel Check-out & Flight Departure to Dhaka",
    descBn:
      "প্রাতরাশ শেষে হোটেল চেক-আউট। নির্ধারিত সময়ে এয়ারপোর্টে ড্রপ অফ এবং ঢাকার উদ্দেশ্যে ফ্লাইট গ্রহণ।",
    descEn:
      "Breakfast, check-out from hotel, transfer to airport for return flight to Dhaka.",
    mealsBn: "বুফে প্রাতরাশ",
    mealsEn: "Buffet Breakfast",
  },
];

import { compressImageUrl } from "../utils/imageCompressor";

// =================== COMPONENT 1: MULTI-IMAGE GALLERY MANAGER ===================
interface MultiImageManagerProps {
  mainImage: string;
  galleryImages: string[];
  onChangeMainImage: (url: string) => void;
  onChangeGallery: (urls: string[]) => void;
  serviceType: "umrah" | "hajj" | "tour" | "blog";
}

export const MultiImageManager: React.FC<MultiImageManagerProps> = ({
  mainImage,
  galleryImages = [],
  onChangeMainImage,
  onChangeGallery,
  serviceType,
}) => {
  const [singleUrlInput, setSingleUrlInput] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Combine mainImage and galleryImages for complete list
  const allImages = Array.from(
    new Set([mainImage, ...(galleryImages || [])].filter(Boolean)),
  );

  const handleAddSingleUrl = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = singleUrlInput.trim();
    if (!trimmed) return;

    setIsProcessing(true);
    try {
      const processedUrl = await compressImageUrl(trimmed);
      if (!allImages.includes(processedUrl)) {
        const updated = [...allImages, processedUrl];
        onChangeGallery(updated);
        if (!mainImage) {
          onChangeMainImage(processedUrl);
        }
      }
      setSingleUrlInput("");
    } catch (err) {
      console.error("Failed to process image:", err);
      alert(
        "ছবি প্রসেস করতে সমস্যা হয়েছে। অনুগ্রহ করে অন্য লিংক চেষ্টা করুন।",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddBulkUrls = async () => {
    if (!bulkInput.trim()) return;
    const urls = bulkInput
      .split(/[\n,;]+/)
      .map((u) => u.trim())
      .filter(
        (u) =>
          u.startsWith("http://") ||
          u.startsWith("https://") ||
          u.startsWith("data:image"),
      );

    if (urls.length === 0) {
      alert("অনুগ্রহ করে সঠিক ইমেজ URL লিংক পেস্ট করুন (https://...)");
      return;
    }

    setIsProcessing(true);
    try {
      const processedUrls = await Promise.all(
        urls.map((url) => compressImageUrl(url)),
      );
      const merged = Array.from(new Set([...allImages, ...processedUrls]));
      onChangeGallery(merged);
      if (!mainImage && merged.length > 0) {
        onChangeMainImage(merged[0]);
      }
      setBulkInput("");
      setShowBulkInput(false);
    } catch (err) {
      console.error("Failed to process bulk images:", err);
      alert("কিছু ছবি প্রসেস করতে সমস্যা হয়েছে।");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSetCover = (url: string) => {
    onChangeMainImage(url);
    // Put cover first
    const rest = allImages.filter((u) => u !== url);
    onChangeGallery([url, ...rest]);
  };

  const handleRemoveImage = (url: string) => {
    const updated = allImages.filter((u) => u !== url);
    onChangeGallery(updated);
    if (mainImage === url) {
      onChangeMainImage(updated[0] || "");
    }
  };

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const newIdx = direction === "left" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= allImages.length) return;
    const copy = [...allImages];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    onChangeGallery(copy);
    if (index === 0 || newIdx === 0) {
      onChangeMainImage(copy[0]);
    }
  };

  const presets = STOCK_PHOTO_PRESETS[serviceType] || STOCK_PHOTO_PRESETS.umrah;

  return (
    <div className="bg-emerald-950/5 border border-emerald-900/20 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Header with image count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-emerald-900/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center shadow-xs">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-2">
              <span>মাল্টি-ইমেজ ফটো গ্যালারি ও কভার ছবি</span>
              <span className="bg-[#0D472B] text-[#F3E0A0] text-[11px] font-black px-2 py-0.5 rounded-full">
                {allImages.length} টি ছবি যুক্ত আছে
              </span>
            </h4>
            <p className="text-[11px] text-gray-500">
              আপনি এখানে ১ থেকে ২০-৩০+ ছবি যুক্ত করতে পারেন। প্রথম ছবিটি কভার
              ফটো হিসেবে প্রদর্শিত হবে।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold py-1.5 px-3 rounded-xl border border-emerald-300 shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{showPresets ? "প্রিসেট বন্ধ" : "সুন্দর ছবির তালিকা"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBulkInput(!showBulkInput)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold py-1.5 px-3 rounded-xl border border-emerald-300 shadow-xs transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {showBulkInput ? "বাল্ক বন্ধ" : "একসাথে একাধিক লিংক পেস্ট"}
            </span>
          </button>
        </div>
      </div>

      {/* Preset Stock Photos Selector */}
      {showPresets && (
        <div className="bg-white rounded-2xl p-3 border border-emerald-200 space-y-2.5 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              ১-ক্লিকে চমৎকার লাইভ ছবি যোগ করুন:
            </span>
            <button
              type="button"
              onClick={() => {
                const presetUrls = presets.map((p) => p.url);
                const merged = Array.from(
                  new Set([...allImages, ...presetUrls]),
                );
                onChangeGallery(merged);
                if (!mainImage && merged.length > 0)
                  onChangeMainImage(merged[0]);
              }}
              className="text-[11px] font-black text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              + সবগুলো ({presets.length}টি) একসাথে যুক্ত করুন
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
            {presets.map((preset, idx) => {
              const isAdded = allImages.includes(preset.url);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (isAdded) {
                      handleRemoveImage(preset.url);
                    } else {
                      const updated = [...allImages, preset.url];
                      onChangeGallery(updated);
                      if (!mainImage) onChangeMainImage(preset.url);
                    }
                  }}
                  className={`group relative rounded-xl overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                    isAdded
                      ? "border-emerald-700 bg-emerald-50 ring-2 ring-emerald-600"
                      : "border-gray-200 bg-gray-50 hover:border-emerald-400"
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="w-full h-16 object-cover rounded-lg"
                  />
                  <div className="text-[10px] font-bold text-gray-800 truncate mt-1">
                    {preset.title}
                  </div>
                  <div
                    className={`absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full ${isAdded ? "bg-emerald-700 text-white" : "bg-black/60 text-white group-hover:bg-emerald-700"}`}
                  >
                    {isAdded ? "যুক্ত ✓" : "+ যোগ"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bulk Multi-URL Paste Section */}
      {showBulkInput && (
        <div className="bg-white rounded-2xl p-3 border border-emerald-200 space-y-2 shadow-xs animate-fadeIn">
          <label className="block text-xs font-bold text-emerald-950">
            একসাথে ২০-২৫টি ছবির লিঙ্ক পেস্ট করুন (প্রতি লাইনে ১টি বা কমা দিয়ে):
          </label>
          <textarea
            rows={4}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="https://images.unsplash.com/photo-1591604466107-ec97de577aff...&#10;https://images.unsplash.com/photo-1542810634-71277d95dcbb...&#10;https://images.unsplash.com/photo-1564769625905-50e93615e769..."
            className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-700"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-500">
              প্রতি লাইনে একটি সম্পূর্ণ Image URL লিখুন
            </span>
            <button
              type="button"
              onClick={handleAddBulkUrls}
              disabled={isProcessing}
              className={`text-[#F3E0A0] text-xs font-black py-1.5 px-4 rounded-xl border border-[#D4AF37] cursor-pointer shadow-xs ${isProcessing ? "bg-emerald-800 opacity-70 cursor-not-allowed" : "bg-[#0D472B] hover:bg-emerald-800"}`}
            >
              {isProcessing ? "প্রসেস হচ্ছে..." : "সকল ছবি যোগ করুন"}
            </button>
          </div>
        </div>
      )}

      {/* Single URL Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={singleUrlInput}
          onChange={(e) => setSingleUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isProcessing) {
              e.preventDefault();
              handleAddSingleUrl();
            }
          }}
          disabled={isProcessing}
          placeholder="ছবির ওয়েব লিঙ্ক (URL) পেস্ট করুন... (https://...)"
          className="flex-1 px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-800 font-medium disabled:bg-gray-100 disabled:text-gray-400"
        />
        <button
          type="button"
          onClick={handleAddSingleUrl}
          disabled={isProcessing}
          className={`text-[#F3E0A0] text-xs font-black px-4 py-2.5 rounded-xl border border-[#D4AF37] shadow-xs flex items-center gap-1 cursor-pointer shrink-0 ${isProcessing ? "bg-emerald-800 opacity-70 cursor-not-allowed" : "bg-[#0D472B] hover:bg-emerald-800"}`}
        >
          {isProcessing ? (
            <span>অপেক্ষা করুন...</span>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>ছবি যোগ করুন</span>
            </>
          )}
        </button>
      </div>

      {/* Gallery Image Grid with Reorder, Cover & Delete Actions */}
      {allImages.length > 0 ? (
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-gray-600 flex items-center justify-between">
            <span>প্যাকেজে যুক্ত ছবির তালিকা ({allImages.length}টি):</span>
            <span className="text-[#0D472B] font-extrabold">
              🌟 স্টার আইকনে ক্লিক করে কভার ছবি সিলেক্ট করুন
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-80 overflow-y-auto p-1">
            {allImages.map((url, idx) => {
              const isCover = url === mainImage || idx === 0;
              return (
                <div
                  key={idx}
                  className={`relative group bg-white rounded-2xl border overflow-hidden transition-all shadow-xs ${
                    isCover
                      ? "border-amber-500 ring-2 ring-amber-400"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-24 sm:h-28 object-cover"
                  />

                  {/* Badge Number */}
                  <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] font-black px-1.5 py-0.2 rounded-md backdrop-blur-xs">
                    #{idx + 1}
                  </div>

                  {/* Cover Photo Indicator */}
                  {isCover && (
                    <div className="absolute top-1.5 right-1.5 bg-amber-500 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded-md flex items-center gap-0.5 shadow-sm">
                      <Star className="w-3 h-3 fill-current" />
                      <span>কভার</span>
                    </div>
                  )}

                  {/* Action Overlay */}
                  <div className="p-1.5 bg-gray-50 flex items-center justify-between gap-1 border-t border-gray-100">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveImage(idx, "left")}
                        className={`p-1 rounded text-gray-600 hover:bg-gray-200 ${idx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        title="বামে নিন"
                      >
                        <ArrowUp className="w-3 h-3 -rotate-90" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === allImages.length - 1}
                        onClick={() => handleMoveImage(idx, "right")}
                        className={`p-1 rounded text-gray-600 hover:bg-gray-200 ${idx === allImages.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        title="ডানে নিন"
                      >
                        <ArrowDown className="w-3 h-3 -rotate-90" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(url)}
                          className="p-1 text-amber-600 hover:bg-amber-100 rounded cursor-pointer"
                          title="প্রধান কভার ছবি বানান"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded cursor-pointer"
                        title="ছবিটি বাদ দিন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white rounded-xl border border-dashed border-gray-300 text-center text-xs text-gray-500">
          এখনও কোনো ছবি যুক্ত করা হয়নি। উপরের বক্সে URL পেস্ট করুন বা \'সুন্দর
          ছবির তালিকা\' থেকে পছন্দ করুন।
        </div>
      )}
    </div>
  );
};

// =================== COMPONENT 2: DAY-BY-DAY ITINERARY BUILDER ===================
interface ItineraryBuilderProps {
  itinerary: PackageItineraryDay[];
  onChangeItinerary: (itinerary: PackageItineraryDay[]) => void;
  packageType: "umrah" | "hajj" | "tour";
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  itinerary = [],
  onChangeItinerary,
  packageType,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddDay = () => {
    const nextDayNum = itinerary.length + 1;
    const formattedNum = nextDayNum < 10 ? `0${nextDayNum}` : `${nextDayNum}`;
    const newDay: PackageItineraryDay = {
      dayNumber: formattedNum,
      titleBn: `দিন ${formattedNum} - ইবাদত ও ভ্রমণ কার্যক্রম`,
      titleEn: `Day ${formattedNum} - Activity and Itinerary`,
      descBn: "পবিত্র হারামাইন শরীফ বা দর্শনীয় স্থানে ভ্রমণ ও কার্যক্রম...",
      descEn: "Visit and activities in holy destinations...",
      mealsBn: "৩ বেলা উন্নত সুস্বাদু খাবার",
      mealsEn: "3 Quality Meals Daily",
    };
    const updated = [...itinerary, newDay];
    onChangeItinerary(updated);
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdateDay = (
    index: number,
    field: keyof PackageItineraryDay,
    value: string,
  ) => {
    const updated = [...itinerary];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChangeItinerary(updated);
  };

  const handleRemoveDay = (index: number) => {
    if (itinerary.length === 1) {
      if (!window.confirm("আপনি কি এই দিনটি মুছে ফেলতে চান?")) return;
    }
    const updated = itinerary.filter((_, i) => i !== index);
    onChangeItinerary(updated);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleMoveDay = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= itinerary.length) return;
    const copy = [...itinerary];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChangeItinerary(copy);
    setExpandedIndex(targetIdx);
  };

  const handleLoadDefaultTemplate = () => {
    if (itinerary.length > 0) {
      if (
        !window.confirm(
          "বিদ্যমান ভ্রমণসূচি ডিফল্ট আদর্শ ভ্রমণসূচি দিয়ে প্রতিস্থাপন করতে চান?",
        )
      )
        return;
    }
    if (packageType === "umrah") {
      onChangeItinerary(DEFAULT_UMRAH_ITINERARY);
    } else if (packageType === "hajj") {
      onChangeItinerary(DEFAULT_HAJJ_ITINERARY);
    } else {
      onChangeItinerary(DEFAULT_TOUR_ITINERARY);
    }
    setExpandedIndex(0);
  };

  return (
    <div className="bg-amber-950/5 border border-amber-900/20 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-amber-900/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center shadow-xs">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-2">
              <span>
                কোথায় কি, কিভাবে ও কত দিন (দিনভিত্তিক বিস্তারিত ভ্রমণসূচি)
              </span>
              <span className="bg-[#0D472B] text-[#F3E0A0] text-[11px] font-black px-2 py-0.5 rounded-full">
                {itinerary.length}টি দিন নির্ধারিত
              </span>
            </h4>
            <p className="text-[11px] text-gray-500">
              প্রতিদিনের যাতায়াত, ইবাদত, হোটেল চেক-ইন, জিয়ারাহ্ ও খাবার
              বিস্তারিত উল্লেখ করুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleLoadDefaultTemplate}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-amber-50 text-amber-900 text-xs font-bold py-1.5 px-3 rounded-xl border border-amber-300 shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ডিফল্ট ভ্রমণসূচি লোড করুন</span>
          </button>

          <button
            type="button"
            onClick={handleAddDay}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] text-xs font-black py-1.5 px-3 rounded-xl border border-[#D4AF37] shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ নতুন দিন যোগ</span>
          </button>
        </div>
      </div>

      {/* Days List */}
      {itinerary.length > 0 ? (
        <div className="space-y-3">
          {itinerary.map((day, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                  isExpanded
                    ? "border-emerald-800 ring-2 ring-emerald-700/20"
                    : "border-gray-200"
                }`}
              >
                {/* Header row of the Day Card */}
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="p-3 bg-gray-50/80 hover:bg-emerald-50/50 flex items-center justify-between gap-2 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-[#0D472B] text-[#F3E0A0] text-xs font-black flex items-center justify-center shrink-0">
                      {day.dayNumber || `0${idx + 1}`}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-950 truncate">
                      {day.titleBn || `দিন ${day.dayNumber || idx + 1}`}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveDay(idx, "up")}
                      className={`p-1 rounded text-gray-500 hover:bg-gray-200 ${idx === 0 ? "opacity-30" : "cursor-pointer"}`}
                      title="উপরে নিন"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === itinerary.length - 1}
                      onClick={() => handleMoveDay(idx, "down")}
                      className={`p-1 rounded text-gray-500 hover:bg-gray-200 ${idx === itinerary.length - 1 ? "opacity-30" : "cursor-pointer"}`}
                      title="নিচে নিন"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(idx)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      title="দিনটি মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-3 bg-white border-t border-gray-100 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          দিনের ক্রমিক/রেঞ্জ (যেমন: 01 বা 02-07)
                        </label>
                        <input
                          type="text"
                          value={day.dayNumber || ""}
                          onChange={(e) =>
                            handleUpdateDay(idx, "dayNumber", e.target.value)
                          }
                          placeholder="01 বা 02-07"
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-bold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          দিনের শিরোনাম (বাংলা) *
                        </label>
                        <input
                          type="text"
                          value={day.titleBn || ""}
                          onChange={(e) =>
                            handleUpdateDay(idx, "titleBn", e.target.value)
                          }
                          placeholder="যেমন: ঢাকা থেকে জেদ্দা বিমান যাত্রা ও হোটেল আগমন"
                          className="w-full p-2 border border-gray-300 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        কোথায় কি, কিভাবে ও কত দিন - বিস্তারিত বিবরণ (বাংলা) *
                      </label>
                      <textarea
                        rows={3}
                        value={day.descBn || ""}
                        onChange={(e) =>
                          handleUpdateDay(idx, "descBn", e.target.value)
                        }
                        placeholder="বিস্তারিত বর্ণনা লিখুন: কোথায় যাবেন, কী কী দেখবেন, মোয়াল্লেমের নির্দেশনা, যাতায়াতের মাধ্যম ইত্যাদি..."
                        className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-amber-600" />
                        <span>খাবারের ব্যবস্থা (Meals)</span>
                      </label>
                      <input
                        type="text"
                        value={day.mealsBn || ""}
                        onChange={(e) =>
                          handleUpdateDay(idx, "mealsBn", e.target.value)
                        }
                        placeholder="যেমন: ৩ বেলা উন্নত মানসম্মত বাংলা খাবার ও ফলমূল"
                        className="w-full p-2 border border-gray-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-5 bg-white rounded-2xl border border-dashed border-amber-300 text-center space-y-3">
          <p className="text-xs text-gray-600">
            এই প্যাকেজে এখনও কোনো দিনভিত্তিক ভ্রমণসূচি যুক্ত করা হয়নি।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleLoadDefaultTemplate}
              className="bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] text-xs font-black py-2 px-4 rounded-xl border border-[#D4AF37] cursor-pointer shadow-xs"
            >
              ডিফল্ট আদর্শ ভ্রমণসূচি লোড করুন
            </button>
            <button
              type="button"
              onClick={handleAddDay}
              className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-2 px-4 rounded-xl border border-gray-300 cursor-pointer"
            >
              + নতুন দিন যোগ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =================== COMPONENT 3: INCLUSIONS & EXCLUSIONS LIST MANAGER ===================
interface ListManagerProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  themeColor?: "emerald" | "rose" | "amber";
}

export const ListManager: React.FC<ListManagerProps> = ({
  label,
  items = [],
  onChange,
  placeholder = "নতুন সুবিধা বা শর্ত লিখুন...",
  suggestions = [],
  themeColor = "emerald",
}) => {
  const [inputText, setInputText] = useState("");

  const handleAddItem = (text?: string) => {
    const val = (text || inputText).trim();
    if (!val) return;
    if (!items.includes(val)) {
      onChange([...items, val]);
    }
    setInputText("");
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800">{label}</label>
        <span className="text-[11px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">
          {items.length}টি আইটেম
        </span>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
          placeholder={placeholder}
          className="flex-1 p-2 bg-white border border-gray-300 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <button
          type="button"
          onClick={() => handleAddItem()}
          className="px-3 py-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] text-xs font-bold rounded-xl border border-[#D4AF37] cursor-pointer shrink-0"
        >
          + যুক্ত করুন
        </button>
      </div>

      {/* Suggested chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-gray-500 py-0.5">
            পরামর্শ:
          </span>
          {suggestions.map((sug, i) => {
            const isSelected = items.includes(sug);
            if (isSelected) return null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleAddItem(sug)}
                className="text-[10px] font-semibold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 px-2 py-0.5 rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                + {sug}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Items Chips List */}
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {items.map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold shadow-2xs ${
                themeColor === "rose"
                  ? "bg-rose-50 text-rose-900 border border-rose-200"
                  : themeColor === "amber"
                    ? "bg-amber-50 text-amber-900 border border-amber-200"
                    : "bg-emerald-50 text-emerald-950 border border-emerald-200"
              }`}
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="text-gray-400 hover:text-red-600 rounded-full p-0.5 cursor-pointer"
                title="মুছে ফেলুন"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-gray-400 italic">
          কোনো আইটেম যুক্ত করা নেই।
        </p>
      )}
    </div>
  );
};
