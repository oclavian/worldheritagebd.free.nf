import { useEffect } from "react";
import { Language, PageId } from "../types";

interface SeoInfo {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
}

const seoData: Record<PageId, Record<Language, SeoInfo>> = {
  home: {
    bn: {
      title:
        "ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস | বিশ্বস্ত হজ্ব, উমরাহ্ ও এয়ার টিকিট এজেন্সি",
      description:
        "ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস - সাশ্রয়ী মূল্যে পবিত্র হজ্ব, উমরাহ্ প্যাকেজ, আন্তর্জাতিক এয়ার টিকিট ও নির্ভরযোগ্য ভিসা প্রসেসিং সেবা। পান্থপথ, ঢাকা।",
      keywords:
        "World Heritage Tours, হজ্ব এজেন্সি ঢাকা, উমরাহ প্যাকেজ বাংলাদেশ, এয়ার টিকিট, পান্থপথ ট্রাভেল এজেন্সি",
      canonicalPath: "",
    },
    en: {
      title:
        "World Heritage Tours & Travels | Trusted Hajj, Umrah & Travel Agency",
      description:
        "World Heritage Tours & Travels - Reliable Hajj & Umrah packages, international flight tickets, and visa processing services in Dhaka, Bangladesh.",
      keywords:
        "World Heritage Tours and Travels, Hajj Agency Dhaka, Umrah Packages Bangladesh, Air Tickets Dhaka",
      canonicalPath: "",
    },
  },
  umrah: {
    bn: {
      title: "উমরাহ্ প্যাকেজসমূহ | World Heritage Tours & Travels",
      description:
        "অভিজ্ঞ মোয়াল্লেম, হারামের কাছে মানসম্মত হোটেল ও বাংলা খাবারসহ সাশ্রয়ী মূল্যের উমরাহ্ প্যাকেজসমূহ দেখুন এবং বুকিং করুন।",
      keywords:
        "উমরাহ প্যাকেজ ২০২৬, কম খরচে উমরাহ, ভিআইপি উমরাহ প্যাকেজ, হারাম শরীফ হোটেল, উমরাহ কাফেলা",
      canonicalPath: "umrah",
    },
    en: {
      title: "Umrah Packages | World Heritage Tours & Travels",
      description:
        "Explore affordable Umrah packages with experienced Moallem support, hotels near Haram, and quality Bengali catering.",
      keywords:
        "Umrah package 2026, VIP Umrah package, luxury Umrah Dhaka, cheap Umrah packages Bangladesh",
      canonicalPath: "umrah",
    },
  },
  hajj: {
    bn: {
      title:
        "পবিত্র হজ্ব ২০২৭ প্রাক-নিবন্ধন ও প্যাকেজ | World Heritage Tours & Travels",
      description:
        "২০২৭ সালের পবিত্র হজ্ব প্রাক-নিবন্ধন চলছে। সরকারি নিয়মানুযায়ী মাত্র ৩০,০০০ টাকায় হজ্ব নিবন্ধন সম্পন্ন করুন। অভিজ্ঞ মোয়াল্লিম ও নির্ভরযোগ্য সেবা।",
      keywords:
        "হজ্ব ২০২৭ নিবন্ধন, হজ্ব প্রাক নিবন্ধন ফি, হজ প্যাকেজ ২০২৭, সরকারি হজ নিবন্ধন এজেন্সি",
      canonicalPath: "hajj",
    },
    en: {
      title:
        "Holy Hajj 2027 Pre-Registration & Packages | World Heritage Tours & Travels",
      description:
        "Official Hajj 2027 pre-registration is open under Religious Affairs Ministry guidelines. Secure your Hajj registration today with trusted agency.",
      keywords:
        "Hajj 2027 registration Bangladesh, Hajj pre-registration fee 30000, best Hajj agency Dhaka",
      canonicalPath: "hajj",
    },
  },
  "air-tickets": {
    bn: {
      title: "এয়ার টিকিট বুকিং | World Heritage Tours & Travels",
      description:
        "সৌদি এয়ারলাইন্স, বিমান বাংলাদেশ, এমিরেটস ও বিশ্বের নামীদামী এয়ারলাইন্সের অভ্যন্তরীণ ও আন্তর্জাতিক এয়ার টিকিট পান সেরা মূল্যে।",
      keywords:
        "এয়ার টিকিট বুকিং, সস্তায় বিমান টিকিট, ঢাকা টু জেদ্দা টিকিট, আন্তর্জাতিক ফ্লাইট টিকিট",
      canonicalPath: "air-tickets",
    },
    en: {
      title: "Air Tickets Booking | World Heritage Tours & Travels",
      description:
        "Book domestic and international flight tickets with Saudia, Biman, Emirates, Qatar Airways at competitive prices.",
      keywords:
        "air ticket booking Dhaka, cheap flights Jeddah, international air tickets Bangladesh",
      canonicalPath: "air-tickets",
    },
  },
  "tours-visas": {
    bn: {
      title: "ট্যুর ও ভিসা প্রসেসিং | World Heritage Tours & Travels",
      description:
        "সৌদি আরব, দুবাই, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুরসহ বিভিন্ন দেশের আকর্ষণীয় ট্যুর প্যাকেজ ও বিশ্বস্ত ভিসা প্রসেসিং সেবা।",
      keywords:
        "ভিসা প্রসেসিং ঢাকা, সৌদি ভিসা, দুবাই ট্যুর প্যাকেজ, থাইল্যান্ড ভিসা, ফ্যামিলি ট্যুর প্যাকেজ",
      canonicalPath: "tours-visas",
    },
    en: {
      title: "Tours & Visa Processing | World Heritage Tours & Travels",
      description:
        "Custom family and group holiday tour packages and reliable visa processing for Dubai, Saudi Arabia, Thailand, Malaysia & more.",
      keywords:
        "visa processing agency Dhaka, Saudi visa, Dubai tour package, tourist visa support",
      canonicalPath: "tours-visas",
    },
  },
  gallery: {
    bn: {
      title: "ছবি গ্যালারি | World Heritage Tours & Travels",
      description:
        "আমাদের সম্মানিত উমরাহ্ ও হজ্ব কাফেলার স্মরণীয় মুহূর্ত এবং ভ্রমণার্থীদের ফটো গ্যালারি দেখুন।",
      keywords:
        "হজ্ব কাফেলা ছবি, উমরাহ স্মৃতি, মক্কা মদিনা ফটো, ওয়ার্ল্ড হেরিটেজ গ্যালারি",
      canonicalPath: "gallery",
    },
    en: {
      title: "Photo Gallery | World Heritage Tours & Travels",
      description:
        "Browse photos of our satisfied Umrah & Hajj pilgrims, guided tours, and memorable travel moments.",
      keywords:
        "Umrah photos, Hajj pilgrims gallery, Makkah Madinah travel gallery",
      canonicalPath: "gallery",
    },
  },
  reviews: {
    bn: {
      title: "গ্রাহক রিভিউ ও মতামত | World Heritage Tours & Travels",
      description:
        "আমাদের হজ্ব, উমরাহ্ ও ট্রাভেল সেবা সম্পর্কে সম্মানীত হাজি ও ক্লায়েন্টদের রিভিউ এবং অভিজ্ঞতা জানুন।",
      keywords: "হজ্ব এজেন্সি রিভিউ, ট্রাভেল এজেন্সি মতামত, হাজীদের অভিজ্ঞতা",
      canonicalPath: "reviews",
    },
    en: {
      title: "Client Reviews & Feedback | World Heritage Tours & Travels",
      description:
        "Read verified reviews and testimonials from our valued Hajj, Umrah, and international travel clients.",
      keywords:
        "Hajj agency reviews Dhaka, Umrah testimonials, customer feedback World Heritage",
      canonicalPath: "reviews",
    },
  },
  blog: {
    bn: {
      title: "ভ্রমণ নির্দেশিকা ও ব্লগ | World Heritage Tours & Travels",
      description:
        "উমরাহ্ ও হজ্ব্বের সঠিক নিয়মাবলী, প্রয়োজনীয় টিপস, এয়ার টিকিট গাইড এবং ইসলামিক ভ্রমণ সংক্রান্ত গুরুত্বপূর্ণ ব্লগ পোস্টসমূহ।",
      keywords:
        "উমরাহ করার নিয়ম, হজ্বের ফরজ ও ওয়াজিব, ট্রাভেল টিপস বাংলাদেশ, ইসলামিক ব্লগ",
      canonicalPath: "blog",
    },
    en: {
      title: "Travel Guides & Islamic Blog | World Heritage Tours & Travels",
      description:
        "Read comprehensive Umrah & Hajj guidelines, travel tips, flight ticket guides, and Islamic pilgrimage blogs.",
      keywords:
        "Umrah guide Bengali, Hajj procedure step by step, Islamic travel tips",
      canonicalPath: "blog",
    },
  },
  contact: {
    bn: {
      title: "যোগাযোগ ও অফিস ঠিকানা | World Heritage Tours & Travels",
      description:
        "আমাদের ইন্দিরা রোড, পান্থপথ, ঢাকা অফিসের সাথে সরাসরি ফোন, হোয়াটসঅ্যাপ বা ইমেইলের মাধ্যমে যোগাযোগ করুন।",
      keywords:
        "ওয়ার্ল্ড হেরিটেজ ঠিকানা, পান্থপথ অফিস, হজ্ব এজেন্সির ফোন নম্বর, ইন্দিরা রোড ঢাকা",
      canonicalPath: "contact",
    },
    en: {
      title: "Contact Us & Location | World Heritage Tours & Travels",
      description:
        "Get in touch with World Heritage Tours & Travels at Indira Road, Panthapath, Dhaka. Call, WhatsApp or send us an inquiry.",
      keywords:
        "World Heritage contact number, Panthapath office location, Hajj agency Dhaka contact",
      canonicalPath: "contact",
    },
  },
  admin: {
    bn: {
      title: "এডমিন কন্ট্রোল প্যানেল | World Heritage Tours & Travels",
      description:
        "ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস ওয়েবসাইট কন্টেন্ট ম্যানেজমেন্ট সিস্টেম।",
      keywords: "admin panel, CMS, content management",
      canonicalPath: "admin",
    },
    en: {
      title: "Admin Control Panel | World Heritage Tours & Travels",
      description:
        "World Heritage Tours & Travels Content Management System Dashboard.",
      keywords: "admin panel, CMS, content management",
      canonicalPath: "admin",
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
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");
    document.body.setAttribute("translate", "no");
    document.body.classList.add("notranslate");

    // 3. Helper to update/create meta tag
    const setMetaTag = (
      selector: string,
      attrName: string,
      attrVal: string,
      content: string,
    ) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Update Meta Description & Keywords
    setMetaTag(
      'meta[name="description"]',
      "name",
      "description",
      pageSeo.description,
    );
    setMetaTag('meta[name="keywords"]', "name", "keywords", pageSeo.keywords);

    // Update Open Graph Meta Tags
    setMetaTag(
      'meta[property="og:title"]',
      "property",
      "og:title",
      pageSeo.title,
    );
    setMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageSeo.description,
    );
    setMetaTag(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      lang === "bn" ? "bn_BD" : "en_US",
    );

    // Update Twitter Cards
    setMetaTag(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      pageSeo.title,
    );
    setMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageSeo.description,
    );

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const baseUrl = "https://worldheritagetours.com/";
    const fullCanonical = pageSeo.canonicalPath
      ? `${baseUrl}#${pageSeo.canonicalPath}`
      : baseUrl;
    if (canonical) {
      canonical.setAttribute("href", fullCanonical);
    }
  }, [activePage, lang]);
}
