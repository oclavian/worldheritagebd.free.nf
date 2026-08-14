import { useEffect } from 'react';
import { Language, PageId } from '../types';

interface SeoInfo {
  title: string;
  description: string;
}

const seoData: Record<PageId, Record<Language, SeoInfo>> = {
  home: {
    bn: {
      title: 'World Heritage Tours & Travels | বিশ্বস্ত হজ্ব, উমরাহ্ ও এয়ার টিকিট এজেন্সি',
      description: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস - সাশ্রয়ী মূল্যে পবিত্র হজ্ব, উমরাহ্ প্যাকেজ, আন্তর্জাতিক এয়ার টিকিট ও নির্ভরযোগ্য ভিসা প্রসেসিং সেবা।',
    },
    en: {
      title: 'World Heritage Tours & Travels | Trusted Hajj, Umrah & Travel Agency',
      description: 'World Heritage Tours & Travels - Reliable Hajj & Umrah packages, international flight tickets, and visa processing services in Dhaka, Bangladesh.',
    },
  },
  umrah: {
    bn: {
      title: 'উমরাহ্ প্যাকেজসমূহ | World Heritage Tours & Travels',
      description: 'অভিজ্ঞ মোয়াল্লেম, হারামের কাছে মানসম্মত হোটেল ও বাংলা খাবারসহ সাশ্রয়ী মূল্যের উমরাহ্ প্যাকেজসমূহ দেখুন এবং বুকিং করুন।',
    },
    en: {
      title: 'Umrah Packages | World Heritage Tours & Travels',
      description: 'Explore affordable Umrah packages with experienced Moallem support, hotels near Haram, and quality Bengali catering.',
    },
  },
  hajj: {
    bn: {
      title: 'পবিত্র হজ্ব ২০২৭ রেজিস্ট্রেশন | World Heritage Tours & Travels',
      description: '২০২৭ সালের পবিত্র হজ্ব প্রাক-নিবন্ধন চলছে। সরকারি নিয়মানুযায়ী মাত্র ৩০,০০০ টাকায় হজ্ব নিবন্ধন সম্পন্ন করুন।',
    },
    en: {
      title: 'Holy Hajj 2027 Registration | World Heritage Tours & Travels',
      description: 'Official Hajj 2027 pre-registration is open under Religious Affairs Ministry guidelines. Secure your Hajj registration today.',
    },
  },
  'air-tickets': {
    bn: {
      title: 'এয়ার টিকিট বুকিং | World Heritage Tours & Travels',
      description: 'সৌদি এয়ারলাইন্স, বিমান বাংলাদেশ, এমিরেটস ও বিশ্বের নামীদামী এয়ারলাইন্সের অভ্যন্তরীণ ও আন্তর্জাতিক এয়ার টিকিট পান সেরা মূল্যে।',
    },
    en: {
      title: 'Air Tickets Booking | World Heritage Tours & Travels',
      description: 'Book domestic and international flight tickets with Saudia, Biman, Emirates, Qatar Airways at competitive prices.',
    },
  },
  'tours-visas': {
    bn: {
      title: 'ট্যুর ও ভিসা প্রসেসিং | World Heritage Tours & Travels',
      description: 'সৌদি আরব, দুবাই, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুরসহ বিভিন্ন দেশের আকর্ষণীয় ট্যুর প্যাকেজ ও বিশ্বস্ত ভিসা প্রসেসিং সেবা।',
    },
    en: {
      title: 'Tours & Visa Processing | World Heritage Tours & Travels',
      description: 'Custom family and group holiday tour packages and reliable visa processing for Dubai, Saudi Arabia, Thailand, Malaysia & more.',
    },
  },
  gallery: {
    bn: {
      title: 'ছবি গ্যালারি | World Heritage Tours & Travels',
      description: 'আমাদের সম্মানিত উমরাহ্ ও হজ্ব কাফেলার স্মরণীয় মুহূর্ত এবং ভ্রমণার্থীদের ফটো গ্যালারি দেখুন।',
    },
    en: {
      title: 'Photo Gallery | World Heritage Tours & Travels',
      description: 'Browse photos of our satisfied Umrah & Hajj pilgrims, guided tours, and memorable travel moments.',
    },
  },
  reviews: {
    bn: {
      title: 'গ্রাহক রিভিউ ও মতামত | World Heritage Tours & Travels',
      description: 'আমাদের হজ্ব, উমরাহ্ ও ট্রাভেল সেবা সম্পর্কে সম্মানীত হাজি ও ক্লায়েন্টদের রিভিউ এবং অভিজ্ঞতা জানুন।',
    },
    en: {
      title: 'Client Reviews & Feedback | World Heritage Tours & Travels',
      description: 'Read verified reviews and testimonials from our valued Hajj, Umrah, and international travel clients.',
    },
  },
  blog: {
    bn: {
      title: 'ভ্রমণ নির্দেশিকা ও ব্লগ | World Heritage Tours & Travels',
      description: 'উমরাহ্ ও হজ্ব্বের সঠিক নিয়মাবলী, প্রয়োজনীয় টিপস, এয়ার টিকিট গাইড এবং ইসলামিক ভ্রমণ সংক্রান্ত গুরুত্বপূর্ণ ব্লগ পোস্টসমূহ।',
    },
    en: {
      title: 'Travel Guides & Islamic Blog | World Heritage Tours & Travels',
      description: 'Read comprehensive Umrah & Hajj guidelines, travel tips, flight ticket guides, and Islamic pilgrimage blogs.',
    },
  },
  contact: {
    bn: {
      title: 'যোগাযোগ ও অফিস ঠিকানা | World Heritage Tours & Travels',
      description: 'আমাদের ইন্দিরা রোড, পান্থপথ, ঢাকা অফিসের সাথে সরাসরি ফোন, হোয়াটসঅ্যাপ বা ইমেইলের মাধ্যমে যোগাযোগ করুন।',
    },
    en: {
      title: 'Contact Us & Location | World Heritage Tours & Travels',
      description: 'Get in touch with World Heritage Tours & Travels at Indira Road, Panthapath, Dhaka. Call, WhatsApp or send us an inquiry.',
    },
  },
};

/**
 * Custom React hook to dynamically update document title, html lang, and meta tags on page/language transition.
 */
export function useSeoMetadata(activePage: PageId, lang: Language) {
  useEffect(() => {
    const pageSeo = seoData[activePage]?.[lang] || seoData.home[lang];

    // 1. Update Document Title
    document.title = pageSeo.title;

    // 2. Update HTML lang attribute & disable auto-translation
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    document.body.setAttribute('translate', 'no');
    document.body.classList.add('notranslate');

    // 3. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', pageSeo.description);

    // 4. Update Open Graph Meta Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageSeo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', pageSeo.description);
  }, [activePage, lang]);
}
