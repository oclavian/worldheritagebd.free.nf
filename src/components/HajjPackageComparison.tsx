import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Train,
  Plane,
  MapPin,
  Sparkles,
  Building,
  Utensils,
  Award,
  ShieldCheck,
  Gift,
  Compass,
  Clock,
  CreditCard,
  ChevronRight,
  Check,
  Minus,
  Info,
} from "lucide-react";
import { Language } from "../types";
import { toBengaliDigits } from "../utils/formatters";

interface HajjPackageComparisonProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
  onSelectPackageDetail?: (pkgId: string) => void;
}

export const HajjPackageComparison: React.FC<HajjPackageComparisonProps> = ({
  lang,
  onOpenBookingModal,
  onSelectPackageDetail,
}) => {
  const isBn = lang === "bn";
  const [activeCategory, setActiveCategory] = useState<
    "all" | "transport" | "hotels" | "ziyarah" | "gifts"
  >("all");

  const comparisonCategories = [
    {
      id: "pricing",
      titleBn: "মূল্য ও রেজিস্ট্রেশন",
      titleEn: "Pricing & Registration",
      icon: CreditCard,
      items: [
        {
          featureBn: "প্যাকেজ সর্বমোট মূল্য",
          featureEn: "Total Package Price",
          economy: {
            textBn: "৳৬,৩০,০০০/-",
            textEn: "BDT 6,30,000/-",
            highlight: "emerald",
            subBn: "প্রতি জন (সর্বমোট)",
            subEn: "Per Person",
          },
          standard: {
            textBn: "৳৭,৫০,০০০/-",
            textEn: "BDT 7,50,000/-",
            highlight: "burgundy",
            subBn: "প্রতি জন (সব সুবিধা সহ)",
            subEn: "Per Person (All inclusive)",
          },
        },
        {
          featureBn: "সরকারি প্রাক-নিবন্ধন ফি",
          featureEn: "Govt Pre-Registration Fee",
          economy: {
            textBn: "৳৩০,০০০/- (অফেরতযোগ্য)",
            textEn: "BDT 30,000 (Non-refundable)",
            status: "included",
          },
          standard: {
            textBn: "৳৩০,০০০/- (অফেরতযোগ্য)",
            textEn: "BDT 30,000 (Non-refundable)",
            status: "included",
          },
        },
        {
          featureBn: "প্যাকেজের সম্ভাব্য মেয়াদকাল",
          featureEn: "Package Duration",
          economy: {
            textBn: "৩০ থেকে ৩৫ দিন",
            textEn: "30 to 35 Days",
          },
          standard: {
            textBn: "৩০ থেকে ৩৫ দিন",
            textEn: "30 to 35 Days",
          },
        },
        {
          featureBn: "পবিত্র হজ্বের কোরবানি (দম)",
          featureEn: "Hajj Qurbani (Dam)",
          economy: {
            textBn: "প্যাকেজ মূল্যের অন্তর্ভুক্ত",
            textEn: "Included in Package",
            status: "included",
          },
          standard: {
            textBn: "প্যাকেজ মূল্যের অন্তর্ভুক্ত",
            textEn: "Included in Package",
            status: "included",
          },
        },
      ],
    },
    {
      id: "transport",
      titleBn: "ফ্লাইট ও যাতায়াত সুবিধা",
      titleEn: "Flights & Transportation",
      icon: Plane,
      items: [
        {
          featureBn: "এয়ারলাইন্স ও ফ্লাইট টাইপ",
          featureEn: "Airlines & Flight Type",
          economy: {
            textBn: "ডিরেক্ট ফ্লাইট (বাংলাদেশ ⇄ কেএসএ)",
            textEn: "Direct Flight (BD ⇄ KSA)",
            subBn: "বিমান বাংলাদেশ / সাউদিয়া / ফ্লাইনাস",
            subEn: "Biman / Saudia / Flynas",
            status: "included",
          },
          standard: {
            textBn: "ডিরেক্ট ফ্লাইট (বাংলাদেশ ⇄ কেএসএ)",
            textEn: "Direct Flight (BD ⇄ KSA)",
            subBn: "বিমান বাংলাদেশ / সাউদিয়া / ফ্লাইনাস",
            subEn: "Biman / Saudia / Flynas",
            status: "included",
          },
        },
        {
          featureBn: "মক্কা ⇄ মদিনা বুলেট ট্রেন (হারামাইন এক্সপ্রেস)",
          featureEn: "Makkah ⇄ Madinah Haramain High-Speed Train",
          isKeyDifference: true,
          economy: {
            textBn: "অন্তর্ভুক্ত নয়",
            textEn: "Not Included",
            subBn: "সাধারণ এসি বাসে যাতায়াত (৬-৭ ঘণ্টা)",
            subEn: "Transport by Regular AC Bus (6-7 hrs)",
            status: "excluded",
          },
          standard: {
            textBn: "হারামাইন বুলেট ট্রেন ভ্রমণ অন্তর্ভুক্ত",
            textEn: "Haramain Bullet Train Included",
            subBn: "দ্রুততম ও আরামদায়ক ২ ঘণ্টার বিলাসবহুল বুলেট ট্রেন যাত্রা",
            subEn:
              "Ultra-fast & comfortable 2-hr high-speed luxury rail journey",
            status: "special",
          },
        },
        {
          featureBn: "সৌদি অভ্যন্তরীণ সকল যাতায়াত",
          featureEn: "Local Ground Transfers in KSA",
          economy: {
            textBn: "সৌদি মোয়াল্লেম অনুমোদিত এসি বাস",
            textEn: "Moallem Authorized AC Bus",
            status: "included",
          },
          standard: {
            textBn: "সৌদি মোয়াল্লেম অনুমোদিত আধুনিক এসি বাস",
            textEn: "Modern Moallem AC Bus",
            status: "included",
          },
        },
      ],
    },
    {
      id: "hotels",
      titleBn: "হোটেল, মিনা-আরাফাত ও খাবার",
      titleEn: "Hotels, Tents & Catering",
      icon: Building,
      items: [
        {
          featureBn: "পবিত্র মক্কা মুকাররমা হোটেল",
          featureEn: "Makkah Mukarramah Hotel",
          economy: {
            textBn: "আজিজিয়াদ রোড / মিসফালাহ",
            textEn: "Aziziyah Road / Misfalah",
            subBn: "মসজিদুল হারাম থেকে আনুমানিক ৫০০ মিটার",
            subEn: "Approx 500m from Masjid al-Haram",
            status: "included",
          },
          standard: {
            textBn: "আজিজিয়াদ রোড / মিসফালাহ",
            textEn: "Aziziyah Road / Misfalah",
            subBn: "মসজিদুল হারাম থেকে আনুমানিক ৫০০ মিটার",
            subEn: "Approx 500m from Masjid al-Haram",
            status: "included",
          },
        },
        {
          featureBn: "পবিত্র মদিনা মুনাওয়ারা হোটেল",
          featureEn: "Madinah Munawwarah Hotel",
          economy: {
            textBn: "মারকাজিয়া সেন্ট্রাল জোন",
            textEn: "Markazia Central Zone",
            subBn: "মসজিদে নববী থেকে মাত্র ১০০ মিটার (৩ স্টার স্ট্যান্ডার্ড)",
            subEn: "Just 100m from Masjid an-Nabawi (3 Star Standard)",
            status: "included",
          },
          standard: {
            textBn: "মারকাজিয়া সেন্ট্রাল জোন",
            textEn: "Markazia Central Zone",
            subBn: "মসজিদে নববী থেকে মাত্র ১০০ মিটার (৩ স্টার স্ট্যান্ডার্ড)",
            subEn: "Just 100m from Masjid an-Nabawi (3 Star Standard)",
            status: "included",
          },
        },
        {
          featureBn: "পবিত্র মিনা ও আরাফাত তাঁবু",
          featureEn: "Mina & Arafat Camps",
          economy: {
            textBn: "শীতাতপ নিয়ন্ত্রিত এসি টেন্ট (মোজাম্মা)",
            textEn: "Air-conditioned AC Tents",
            subBn: "ম্যাট্রেস, বালিশ ও বেডিং সুবিধা সহ",
            subEn: "With mattress, pillow & bedding",
            status: "included",
          },
          standard: {
            textBn: "শীতাতপ নিয়ন্ত্রিত এসি টেন্ট (মোজাম্মা)",
            textEn: "Air-conditioned AC Tents",
            subBn: "ম্যাট্রেস, বালিশ ও বেডিং সুবিধা সহ",
            subEn: "With mattress, pillow & bedding",
            status: "included",
          },
        },
        {
          featureBn: "দৈনিক খাবার ও ক্যাটারিং ব্যবস্থা",
          featureEn: "Daily Meals & Catering",
          economy: {
            textBn: "৩ বেলা দেশীয় স্বাদের উন্নত খাবার",
            textEn: "3 Fresh Meals daily (Bangladeshi cuisine)",
            subBn: "অভিজ্ঞ বাঙালি বাবুর্চি দ্বারা প্রস্তুত তাজা খাবার",
            subEn: "Prepared freshly by experienced Bangladeshi chefs",
            status: "included",
          },
          standard: {
            textBn: "৩ বেলা দেশীয় স্বাদের উন্নত খাবার",
            textEn: "3 Fresh Meals daily (Bangladeshi cuisine)",
            subBn: "অভিজ্ঞ বাঙালি বাবুর্চি দ্বারা প্রস্তুত তাজা খাবার",
            subEn: "Prepared freshly by experienced Bangladeshi chefs",
            status: "included",
          },
        },
      ],
    },
    {
      id: "ziyarah",
      titleBn: "ঐতিহাসিক জিয়ারাহ ও বিশেষ স্থানসমূহ",
      titleEn: "Historical Ziyarah Tours",
      icon: Compass,
      items: [
        {
          featureBn: "পবিত্র মক্কার ঐতিহাসিক স্থান জিয়ারাহ",
          featureEn: "Holy Makkah Ziyarah",
          economy: {
            textBn: "সম্পূর্ণ মক্কা জিয়ারাহ অন্তর্ভুক্ত",
            textEn: "Full Makkah Ziyarah Included",
            subBn:
              "জাবালে নূর (হেরা গুহা), সাওর পর্বত, মিনা, মুজদালিফা ও আরাফাত",
            subEn:
              "Jabal al-Nour (Hira), Mount Thawr, Mina, Muzdalifah & Arafat",
            status: "included",
          },
          standard: {
            textBn: "সম্পূর্ণ মক্কা জিয়ারাহ অন্তর্ভুক্ত",
            textEn: "Full Makkah Ziyarah Included",
            subBn:
              "জাবালে নূর (হেরা গুহা), সাওর পর্বত, মিনা, মুজদালিফা ও আরাফাত",
            subEn:
              "Jabal al-Nour (Hira), Mount Thawr, Mina, Muzdalifah & Arafat",
            status: "included",
          },
        },
        {
          featureBn: "পবিত্র মদিনার ঐতিহাসিক স্থান জিয়ারাহ",
          featureEn: "Holy Madinah Ziyarah",
          economy: {
            textBn: "সম্পূর্ণ মদিনা জিয়ারাহ অন্তর্ভুক্ত",
            textEn: "Full Madinah Ziyarah Included",
            subBn:
              "মসজিদে কুবা, ওহুদ প্রান্তর ও শহীদদের কবর, মসজিদে কিবলাতাইন ও সাত মসজিদ",
            subEn:
              "Masjid Quba, Mount Uhud martyrs, Masjid Qiblatain & Khandaq",
            status: "included",
          },
          standard: {
            textBn: "সম্পূর্ণ মদিনা জিয়ারাহ অন্তর্ভুক্ত",
            textEn: "Full Madinah Ziyarah Included",
            subBn:
              "মসজিদে কুবা, ওহুদ প্রান্তর ও শহীদদের কবর, মসজিদে কিবলাতাইন ও সাত মসজিদ",
            subEn:
              "Masjid Quba, Mount Uhud martyrs, Masjid Qiblatain & Khandaq",
            status: "included",
          },
        },
        {
          featureBn: "ঐতিহাসিক তায়েফ, জেদ্দা ও বদর বিশেষ জিয়ারাহ",
          featureEn: "Historic Taif, Jeddah & Badr Special Ziyarah",
          isKeyDifference: true,
          economy: {
            textBn: "অন্তর্ভুক্ত নয়",
            textEn: "Not Included",
            subBn: "শুধুমাত্র মক্কা ও মদিনা জিয়ারাহ প্রযোজ্য",
            subEn: "Makkah & Madinah Ziyarah only",
            status: "excluded",
          },
          standard: {
            textBn: "বিশেষ তায়েফ, জেদ্দা ও বদর জিয়ারাহ অন্তর্ভুক্ত",
            textEn: "Taif, Jeddah & Badr Ziyarah Included",
            subBn:
              "রাসূলুল্লাহ (সাঃ)-এর স্মৃতিবিজড়িত তায়েফ উপত্যকা, জেদ্দার ফ্লোটিং মসজিদ ও ঐতিহাসিক বদর প্রান্তর দর্শন",
            subEn:
              "Historic Taif Valley, Jeddah Floating Mosque & historic Badr Battleground tour",
            status: "special",
          },
        },
      ],
    },
    {
      id: "gifts",
      titleBn: "উপহার সামগ্রী ও মোয়াল্লেম সেবা",
      titleEn: "Gift Kits & Moallem Guiding",
      icon: Gift,
      items: [
        {
          featureBn: "ইহরাম ও ট্রাভেল গিফট কিট",
          featureEn: "Ihram & Travel Gift Kit",
          isKeyDifference: true,
          economy: {
            textBn: "স্ট্যান্ডার্ড ইহরাম ও গিফট সেট",
            textEn: "Standard Ihram & Gift Set",
            subBn: "১ সেট সুতি ইহরাম কাপড়, বেল্ট, ব্যাগ ও হজ্ব গাইড বই",
            subEn: "1 Ihram set, belt, bag & Hajj guide booklet",
            status: "included",
          },
          standard: {
            textBn: "এক্সক্লুসিভ লাক্সারি গিফট কিট",
            textEn: "Exclusive Luxury Gift Kit",
            subBn:
              "প্রিমিয়াম ইহরাম সেট, ব্র্যান্ডেড ট্রলিব্যাগ, হ্যান্ডব্যাগ, জায়নামাজ ও হজ্ব কিট বক্স",
            subEn:
              "Premium Ihram set, branded trolley bag, handbag, prayer mat & luxury Hajj kit box",
            status: "special",
          },
        },
        {
          featureBn: "প্রশিক্ষণ ও সার্বক্ষণিক মোয়াল্লেম সহায়তা",
          featureEn: "Hajj Training & Dedicated Guiding",
          economy: {
            textBn: "হজ্ব প্রশিক্ষণ কর্মশালা ও অভিজ্ঞ গাইড",
            textEn: "Hajj Workshop & Experienced Guide",
            subBn: "যাত্রা শুরুর পূর্বে ঢাকা অফিসে ব্যবহারিক প্রশিক্ষণ",
            subEn:
              "Hands-on practical training at Dhaka office prior to departure",
            status: "included",
          },
          standard: {
            textBn:
              "হজ্ব প্রশিক্ষণ কর্মশালা ও সার্বক্ষণিক ভিআইপি মোয়াল্লেম গাইড",
            textEn: "Hajj Workshop & 24/7 VIP Moallem Guide",
            subBn:
              "যাত্রা শুরুর পূর্ব থেকে সৌদি আরবে সম্পূর্ণ অবস্থানকালীন সার্বক্ষণিক সহায়তা",
            subEn:
              "Dedicated round-the-clock scholar & guide throughout the journey",
            status: "special",
          },
        },
        {
          featureBn: "৫ লিটার জমজম পানির বোতল",
          featureEn: "5 Litres Zamzam Water",
          economy: {
            textBn: "সৌদি বিমানবন্দরে সরকার কর্তৃক সরবরাহকৃত",
            textEn: "Provided at KSA Airport per Govt rules",
            status: "included",
          },
          standard: {
            textBn: "সৌদি বিমানবন্দরে সরকার কর্তৃক সরবরাহকৃত",
            textEn: "Provided at KSA Airport per Govt rules",
            status: "included",
          },
        },
      ],
    },
  ];

  const filteredCategories =
    activeCategory === "all"
      ? comparisonCategories
      : comparisonCategories.filter((c) => c.id === activeCategory);

  return (
    <div className="space-y-8 font-bengali">
      {/* Comparison Section Header */}
      <div className="bg-gradient-to-br from-[#052917] via-[#0D472B] to-[#08351F] text-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F3E0A0] text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-xs">
              <Award className="w-4 h-4 text-[#F3E0A0]" />
              <span>
                {isBn ? "প্যাকেজ নির্বাচন গাইড" : "Package Selection Guide"}
              </span>
            </div>
            <span className="text-xs text-emerald-200 font-semibold bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
              {isBn
                ? "২০২৭ সালের সরকারি অনুমোদন সাপেক্ষে"
                : "Subject to Govt Approval 2027"}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {isBn
                ? "ইকোনমি বনাম স্ট্যান্ডার্ড হজ্ব প্যাকেজ তুলনা"
                : "Economy vs Standard Hajj Package Comparison"}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 mt-2 max-w-3xl leading-relaxed">
              {isBn
                ? "আপনার বাজেট, সময় ও ভ্রমণের চাহিদামাফিক সঠিক প্যাকেজটি সহজে বেছে নিন। নিচে প্রতিটি সুবিধার পুঙ্খানুপুঙ্খ বিবরণ তুলে ধরা হলো:"
                : "Easily select the right package tailored to your budget and preferences. Detailed feature breakdown below:"}
            </p>
          </div>

          {/* Quick Snapshot Cards (2 Cards Comparison Summary) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            {/* Economy Snapshot */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {isBn ? "ইকোনমি হজ্ব প্যাকেজ" : "Economy Hajj Package"}
                  </h3>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-emerald-200 font-bold">
                  {isBn ? "শুরুর মূল্য:" : "Starting at:"}
                </span>
                <span className="text-2xl font-black text-[#F3E0A0]">
                  ৳৬,৩০,০০০/-
                </span>
                <span className="text-[11px] text-emerald-200">
                  {isBn ? "/ জন" : "/ person"}
                </span>
              </div>

              <ul className="text-xs text-emerald-100 space-y-1.5 pt-1 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isBn
                      ? "ডিরেক্ট ফ্লাইট ও কোরবানি অন্তর্ভুক্ত"
                      : "Direct Flights & Qurbani Included"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isBn
                      ? "মক্কা ৫০০মিঃ ও মদিনা ১০০মিঃ হোটেল"
                      : "Makkah 500m & Madinah 100m Hotel"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isBn
                      ? "মক্কা ও মদিনার ঐতিহাসিক স্থান জিয়ারাহ"
                      : "Makkah & Madinah Holy Ziyarah"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Standard Snapshot */}
            <div className="bg-gradient-to-br from-[#8B0000]/60 to-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-[#D4AF37]/80 space-y-3 relative shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse"></span>
                  <h3 className="text-base sm:text-lg font-black text-[#FAF8F5]">
                    {isBn
                      ? "স্ট্যান্ডার্ড হজ্ব প্যাকেজ"
                      : "Standard Hajj Package"}
                  </h3>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-amber-200 font-bold">
                  {isBn ? "শুরুর মূল্য:" : "Starting at:"}
                </span>
                <span className="text-2xl font-black text-[#F3E0A0]">
                  ৳৭,৫০,০০০/-
                </span>
                <span className="text-[11px] text-amber-200">
                  {isBn ? "/ জন" : "/ person"}
                </span>
              </div>

              <ul className="text-xs text-amber-100 space-y-1.5 pt-1 border-t border-white/10">
                <li className="flex items-center gap-2 font-bold text-[#F3E0A0]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>
                    {isBn
                      ? "★ মক্কা-মদিনা হারামাইন দ্রুতগতির বুলেট ট্রেন অন্তর্ভুক্ত"
                      : "★ Makkah-Madinah Haramain Bullet Train Included"}
                  </span>
                </li>
                <li className="flex items-center gap-2 font-bold text-[#F3E0A0]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>
                    {isBn
                      ? "★ তায়েফ, জেদ্দা ও বদর বিশেষ ঐতিহাসিক জিয়ারাহ"
                      : "★ Taif, Jeddah & Badr Special Ziyarah Included"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isBn
                      ? "এক্সক্লুসিভ লাক্সারি কিট ও ট্রলিব্যাগ সেট"
                      : "Exclusive Luxury Kit & Trolley Bag Set"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills for Comparison */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-bold text-slate-600 shrink-0 hidden sm:inline">
          {isBn ? "বিষয় ভিত্তিক দেখুন:" : "Filter View:"}
        </span>

        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === "all"
              ? "bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {isBn ? "সকল সুবিধাসমূহ (All)" : "All Features"}
        </button>

        <button
          onClick={() => setActiveCategory("transport")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            activeCategory === "transport"
              ? "bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>{isBn ? "ফ্লাইট ও ট্রেন" : "Flights & Train"}</span>
        </button>

        <button
          onClick={() => setActiveCategory("hotels")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            activeCategory === "hotels"
              ? "bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>{isBn ? "হোটেল ও খাবার" : "Hotels & Food"}</span>
        </button>

        <button
          onClick={() => setActiveCategory("ziyarah")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            activeCategory === "ziyarah"
              ? "bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{isBn ? "জিয়ারাহ ও ভ্রমণ" : "Ziyarah Tours"}</span>
        </button>

        <button
          onClick={() => setActiveCategory("gifts")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            activeCategory === "gifts"
              ? "bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>{isBn ? "উপহার ও মোয়াল্লেম" : "Gifts & Guiding"}</span>
        </button>
      </div>

      {/* Main High-Contrast Comparison Table Container */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-lg overflow-hidden">
        {/* Table Header Row */}
        <div className="grid grid-cols-12 bg-slate-900 text-white border-b-2 border-[#D4AF37]/50 sticky top-0 z-20">
          <div className="col-span-5 sm:col-span-4 p-4 sm:p-5 flex items-center">
            <span className="font-extrabold text-xs sm:text-sm text-slate-200 uppercase tracking-wider">
              {isBn ? "সেবা ও সুবিধাসমূহ" : "Features & Services"}
            </span>
          </div>

          {/* Economy Column Header */}
          <div className="col-span-3 sm:col-span-4 p-3 sm:p-5 bg-[#052917] border-l border-white/10 flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-black text-xs sm:text-base text-white truncate">
                {isBn ? "ইকোনমি প্যাকেজ" : "Economy Package"}
              </h3>
            </div>
            <p className="text-emerald-300 font-extrabold text-xs sm:text-sm mt-0.5">
              ৳৬,৩০,০০০/-
            </p>
          </div>

          {/* Standard Column Header */}
          <div className="col-span-4 sm:col-span-4 p-3 sm:p-5 bg-gradient-to-r from-[#4A0000] to-[#7A0000] border-l-2 border-[#D4AF37] flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F3E0A0]" />
              <h3 className="font-black text-xs sm:text-base text-[#FAF8F5] truncate">
                {isBn ? "স্ট্যান্ডার্ড প্যাকেজ" : "Standard Package"}
              </h3>
            </div>
            <p className="text-[#F3E0A0] font-black text-xs sm:text-sm mt-0.5 flex items-center gap-1">
              <span>৳৭,৫০,০০০/-</span>
              <span className="text-[10px] bg-[#D4AF37] text-emerald-950 font-bold px-1.5 py-0.2 rounded-full hidden sm:inline">
                {isBn ? "ট্রেন সহ" : "With Train"}
              </span>
            </p>
          </div>
        </div>

        {/* Comparison Categories and Feature Rows */}
        <div className="divide-y divide-slate-200">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white">
                {/* Category Section Divider Header */}
                <div className="bg-slate-100/90 px-4 sm:px-5 py-2.5 flex items-center gap-2 border-y border-slate-200">
                  <Icon className="w-4 h-4 text-[#0D472B]" />
                  <h4 className="text-xs sm:text-sm font-black text-[#0D472B] tracking-wide">
                    {isBn ? category.titleBn : category.titleEn}
                  </h4>
                </div>

                {/* Rows under this category */}
                <div className="divide-y divide-slate-100">
                  {category.items.map((item, idx) => {
                    const isKey = item.isKeyDifference;
                    return (
                      <div
                        key={idx}
                        className={`grid grid-cols-12 items-stretch hover:bg-slate-50/70 transition-colors ${
                          isKey ? "bg-amber-50/40" : ""
                        }`}
                      >
                        {/* Feature Name Column */}
                        <div className="col-span-5 sm:col-span-4 p-3.5 sm:p-4 flex flex-col justify-center border-r border-slate-100">
                          <div className="flex items-start gap-1.5">
                            {isKey && (
                              <span className="mt-0.5 p-1 rounded-md bg-amber-200 text-amber-900">
                                <Sparkles className="w-3 h-3 text-[#8B0000]" />
                              </span>
                            )}
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                {isBn ? item.featureBn : item.featureEn}
                              </span>
                              {isKey && (
                                <span className="block text-[10px] font-bold text-[#8B0000] mt-0.5">
                                  {isBn
                                    ? "★ মূল পার্থক্য"
                                    : "★ Key Distinction"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Economy Package Value Column */}
                        <div className="col-span-3 sm:col-span-4 p-3 sm:p-4 bg-emerald-50/20 border-r border-slate-200 flex flex-col justify-center">
                          {item.economy.status === "excluded" ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                <span>
                                  {isBn
                                    ? item.economy.textBn
                                    : item.economy.textEn}
                                </span>
                              </span>
                              {item.economy.subBn && (
                                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                                  {isBn
                                    ? item.economy.subBn
                                    : item.economy.subEn}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span
                                  className={`text-xs sm:text-sm font-bold leading-snug ${
                                    item.economy.highlight === "emerald"
                                      ? "text-[#0D472B] font-black text-sm sm:text-base"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {isBn
                                    ? item.economy.textBn
                                    : item.economy.textEn}
                                </span>
                              </div>
                              {item.economy.subBn && (
                                <p className="text-[11px] text-slate-600 font-medium leading-tight pl-5.5">
                                  {isBn
                                    ? item.economy.subBn
                                    : item.economy.subEn}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Standard Package Value Column */}
                        <div
                          className={`col-span-4 sm:col-span-4 p-3 sm:p-4 flex flex-col justify-center ${
                            item.standard.status === "special"
                              ? "bg-amber-50/70 border-l-2 border-[#D4AF37]"
                              : "bg-amber-50/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              {item.standard.status === "special" ? (
                                <Sparkles className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              )}
                              <span
                                className={`text-xs sm:text-sm font-bold leading-snug ${
                                  item.standard.status === "special"
                                    ? "text-[#8B0000] font-black"
                                    : item.standard.highlight === "burgundy"
                                      ? "text-[#8B0000] font-black text-sm sm:text-base"
                                      : "text-slate-900"
                                }`}
                              >
                                {isBn
                                  ? item.standard.textBn
                                  : item.standard.textEn}
                              </span>
                            </div>
                            {item.standard.subBn && (
                              <p
                                className={`text-[11px] font-medium leading-tight pl-5.5 ${
                                  item.standard.status === "special"
                                    ? "text-[#8B0000]/90 font-bold"
                                    : "text-slate-600"
                                }`}
                              >
                                {isBn
                                  ? item.standard.subBn
                                  : item.standard.subEn}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row in the Comparison Table */}
        <div className="grid grid-cols-12 bg-slate-100 p-4 sm:p-6 border-t-2 border-slate-300 gap-2 sm:gap-4 items-center">
          <div className="col-span-5 sm:col-span-4 text-xs font-bold text-slate-700">
            {isBn
              ? "আপনার পছন্দের প্যাকেজে আজই নিবন্ধন করুন:"
              : "Register for your preferred package:"}
          </div>

          <div className="col-span-3 sm:col-span-4">
            <button
              onClick={() =>
                onOpenBookingModal(
                  "Hajj",
                  isBn
                    ? "২০২৭ সালের পবিত্র হজ্ব প্যাকেজ (ইকোনমি - ৳৬,৩০,০০০)"
                    : "Hajj 2027 Economy Package",
                )
              }
              className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all text-center flex items-center justify-center gap-1 active:scale-95"
            >
              <span>{isBn ? "ইকোনমি বুকিং" : "Book Economy"}</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>
          </div>

          <div className="col-span-4 sm:col-span-4">
            <button
              onClick={() =>
                onOpenBookingModal(
                  "Hajj",
                  isBn
                    ? "২০২৭ সালের পবিত্র হজ্ব প্যাকেজ (স্ট্যান্ডার্ড - ৳৭,৫০,০০০)"
                    : "Hajj 2027 Standard Package",
                )
              }
              className="w-full bg-[#8B0000] hover:bg-[#6A0000] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all text-center flex items-center justify-center gap-1 active:scale-95 border border-red-900/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F3E0A0] hidden sm:inline" />
              <span>{isBn ? "স্ট্যান্ডার্ড বুকিং" : "Book Standard"}</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
