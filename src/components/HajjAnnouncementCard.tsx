import React, { useState } from "react";
import {
  Calendar,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Clock,
  AlertCircle,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { Language, HomePageConfig } from "../types";
import { getDynamicHajjInfo } from "../utils/hajjUtils";

interface HajjAnnouncementCardProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
  compact?: boolean;
  config?: HomePageConfig;
}

export const HajjAnnouncementCard: React.FC<HajjAnnouncementCardProps> = ({
  lang,
  onOpenBookingModal,
  config,
}) => {
  const isBn = lang === "bn";
  const hajjInfo = getDynamicHajjInfo();
  const [activeTab, setActiveTab] = useState<"hajj2027" | "hajj2028">(
    "hajj2027",
  );

  const { hajj2027, hajj2028, primaryYearBn, secondaryYearBn } = hajjInfo;

  // Dynamic values with fallbacks
  const badgeText = isBn
    ? config?.hajjCardBadgeBn || "বিশেষ ঘোষণা"
    : config?.hajjCardBadgeEn || "Announcement";
  const cycleText = isBn
    ? config?.hajjCardCycleBn || `হজ্ব চক্র ${primaryYearBn}-${secondaryYearBn}`
    : config?.hajjCardCycleEn ||
      `Cycle ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear}`;
  const portalUrl = config?.hajjCardPortalUrl || "https://hajj.gov.bd";
  const portalText = isBn
    ? config?.hajjCardPortalTextBn || "হজ পোর্টাল"
    : config?.hajjCardPortalTextEn || "Hajj Portal";

  // Tab 1 (2027)
  const tab1Year = isBn
    ? config?.hajjTab1YearBn || primaryYearBn
    : config?.hajjTab1YearEn || String(hajjInfo.primaryYear);
  const tab1Title = isBn
    ? config?.hajjTab1TitleBn ||
      `${primaryYearBn} সালের পবিত্র হজ্ব প্রাক-নিবন্ধন`
    : config?.hajjTab1TitleEn || `Holy Hajj ${hajjInfo.primaryYear} Pre-Reg`;
  const tab1Subtitle = isBn
    ? config?.hajjTab1SubtitleBn || "প্রাথমিক প্রাক-নিবন্ধন কার্যক্রম চলছে"
    : config?.hajjTab1SubtitleEn || "Primary registration is open";
  const tab1GovtFee = isBn
    ? config?.hajjTab1GovtFeeBn || "৩০,০০০ টাকা"
    : config?.hajjTab1GovtFeeEn || "30,000 BDT";
  const tab1StartDate = isBn
    ? config?.hajjTab1StartDateBn || hajj2027.startDateBn
    : config?.hajjTab1StartDateEn || hajj2027.startDateEn;
  const tab1EndDate = isBn
    ? config?.hajjTab1EndDateBn || hajj2027.endDateBn
    : config?.hajjTab1EndDateEn || hajj2027.endDateEn;
  const tab1HajjDate = isBn
    ? config?.hajjTab1HajjDateBn || hajj2027.hajjDateBn
    : config?.hajjTab1HajjDateEn || hajj2027.hajjDateEn;
  const tab1Conditions = isBn
    ? config?.hajjTab1ConditionsBn && config.hajjTab1ConditionsBn.length > 0
      ? config.hajjTab1ConditionsBn
      : [
          "সর্বনিম্ন বয়স: হজে গমনেচ্ছু ব্যক্তির বয়স কমপক্ষে ১৫ বছর হতে হবে।",
          `পাসপোর্ট মেয়াদ: অন্তত ৩১ ডিসেম্বর ${primaryYearBn} পর্যন্ত মেয়াদসহ বৈধ পাসপোর্ট থাকতে হবে।`,
          "প্রাক-নিবন্ধন ফি: সরকারিভাবে নির্ধারিত প্রাক-নিবন্ধন ফি ৩০,০০০ টাকা।",
        ]
    : config?.hajjTab1ConditionsEn && config.hajjTab1ConditionsEn.length > 0
      ? config.hajjTab1ConditionsEn
      : [
          "Min Age: Age must be at least 15 years.",
          `Passport Validity: Valid passport required until at least 31 Dec ${hajjInfo.primaryYear}.`,
          "Pre-reg Fee: Government prescribed pre-registration fee 30,000 BDT.",
        ];

  // Tab 2 (2028)
  const tab2Year = isBn
    ? config?.hajjTab2YearBn || secondaryYearBn
    : config?.hajjTab2YearEn || String(hajjInfo.secondaryYear);
  const tab2Title = isBn
    ? config?.hajjTab2TitleBn ||
      `${secondaryYearBn} সালের হজ প্রাক-নিবন্ধন নির্দেশিকা`
    : config?.hajjTab2TitleEn || `Hajj ${hajjInfo.secondaryYear} Notice`;
  const tab2Subtitle = isBn
    ? config?.hajjTab2SubtitleBn ||
      `বর্তমানে যৌথভাবে ${primaryYearBn}-${secondaryYearBn} সালের হজের প্রাক-নিবন্ধন চলছে। প্রাক-নিবন্ধন সাধারণত ২ বছর কার্যকর থাকে।`
    : config?.hajjTab2SubtitleEn ||
      `Joint pre-registration for ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear} is ongoing.`;
  const tab2RegFee = isBn
    ? config?.hajjTab2RegFeeBn || hajj2028.regFeeBn
    : config?.hajjTab2RegFeeEn || hajj2028.regFeeEn;
  const tab2Validity = isBn
    ? config?.hajjTab2ValidityBn || "২ বছর কার্যকর"
    : config?.hajjTab2ValidityEn || "Valid 2 yrs";
  const tab2Note = isBn
    ? config?.hajjTab2NoteBn ||
      `${primaryYearBn} সালের হজ সম্পন্ন হওয়ার পর ${secondaryYearBn} সালের মূল হজ প্যাকেজ ঘোষণা করা হবে।`
    : config?.hajjTab2NoteEn ||
      `Main package will be announced after Hajj ${hajjInfo.primaryYear}.`;

  const ctaBtnText = isBn
    ? config?.hajjCardCtaBtnBn ||
      `এখনই ${activeTab === "hajj2027" ? tab1Year : tab2Year} হজের রেজিস্ট্রেশন করুন`
    : config?.hajjCardCtaBtnEn || "Register for Hajj Now";

  return (
    <div className="bg-[#022212]/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/70 shadow-xl relative space-y-3 text-white font-bengali overflow-hidden">
      {/* Background Subtle Light */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header: Badge & Portal Link */}
      <div className="flex items-center justify-between gap-2 relative z-10 border-b border-emerald-800/60 pb-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
            <Sparkles className="w-3 h-3 text-emerald-950" />
            <span>{badgeText}</span>
          </span>
          <span className="text-emerald-300 text-[10px] font-medium hidden sm:inline">
            • {cycleText}
          </span>
        </div>

        <a
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-[#F3E0A0] hover:text-white flex items-center gap-1 transition-colors bg-emerald-950/80 px-2 py-0.5 rounded-md border border-[#D4AF37]/30 shrink-0"
        >
          <span>{portalText}</span>
          <ExternalLink className="w-2.5 h-2.5 text-[#D4AF37]" />
        </a>
      </div>

      {/* Compact Tabs */}
      <div className="flex items-center gap-1.5 bg-emerald-950/90 p-1 rounded-xl border border-emerald-800/80 relative z-10 text-xs">
        <button
          onClick={() => setActiveTab("hajj2027")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
            activeTab === "hajj2027"
              ? "bg-[#D4AF37] text-emerald-950 font-black shadow-xs"
              : "text-emerald-200 hover:text-white"
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? `${tab1Year} হজের নিবন্ধন` : `Hajj ${tab1Year}`}</span>
        </button>

        <button
          onClick={() => setActiveTab("hajj2028")}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
            activeTab === "hajj2028"
              ? "bg-[#D4AF37] text-emerald-950 font-black shadow-xs"
              : "text-emerald-200 hover:text-white"
          }`}
        >
          <span>📜</span>
          <span>{isBn ? `${tab2Year} হজের তথ্য` : `Hajj ${tab2Year}`}</span>
        </button>
      </div>

      {/* TAB 1: HAJJ CONTENT */}
      {activeTab === "hajj2027" && (
        <div className="space-y-2.5 relative z-10 animate-fade-in text-xs">
          {/* Main Title & Fee Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-emerald-900/90 to-emerald-950/90 p-2.5 rounded-xl border border-[#D4AF37]/40">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                {tab1Title}
              </h3>
              <p className="text-[10px] text-emerald-200/90 mt-0.5">
                {tab1Subtitle}
              </p>
            </div>
            <div className="bg-emerald-950 px-2.5 py-1 rounded-lg border border-[#D4AF37]/50 text-right shrink-0">
              <span className="text-[10px] text-emerald-300 block leading-none">
                {isBn ? "সরকারি ফি:" : "Govt Fee:"}
              </span>
              <span className="text-[#D4AF37] text-sm font-black tracking-wide">
                {tab1GovtFee}
              </span>
            </div>
          </div>

          {/* Time Schedule Compact 3 Pill Grid */}
          <div className="grid grid-cols-3 gap-1.5 text-xs sm:text-sm">
            <div className="bg-emerald-950/80 p-2 sm:p-2.5 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-emerald-300 block font-semibold text-xs sm:text-[13px]">
                {isBn ? "শুরু" : "Start"}
              </span>
              <span className="text-white font-bold text-xs sm:text-sm block mt-0.5">
                {tab1StartDate}
              </span>
            </div>

            <div className="bg-emerald-950/80 p-2 sm:p-2.5 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-amber-400 block font-semibold text-xs sm:text-[13px]">
                {isBn ? "শেষ তারিখ" : "Deadline"}
              </span>
              <span className="text-amber-200 font-bold text-xs sm:text-sm block mt-0.5">
                {tab1EndDate}
              </span>
            </div>

            <div className="bg-emerald-950/80 p-2 sm:p-2.5 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-emerald-300 block font-semibold text-xs sm:text-[13px]">
                {isBn ? "সম্ভাব্য হজ" : "Hajj Date"}
              </span>
              <span className="text-[#F3E0A0] font-bold text-xs sm:text-sm block mt-0.5">
                {tab1HajjDate}
              </span>
            </div>
          </div>

          {/* Essential Conditions & Requirements */}
          <div className="bg-emerald-950/60 p-2.5 sm:p-3 rounded-xl border border-emerald-800/60 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-extrabold text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {isBn
                  ? "জরুরি কিছু শর্ত ও প্রয়োজনীয় তথ্য:"
                  : "Essential Requirements & Information:"}
              </span>
            </div>
            <ul className="space-y-1.5 text-emerald-100 text-xs sm:text-[13px] leading-relaxed pl-1">
              {tab1Conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: HAJJ CONTENT */}
      {activeTab === "hajj2028" && (
        <div className="space-y-2.5 relative z-10 animate-fade-in text-xs sm:text-sm">
          <div className="bg-emerald-900/60 p-2.5 sm:p-3 rounded-xl border border-emerald-800 space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white">
              {tab2Title}
            </h3>
            <p className="text-xs sm:text-[13px] text-emerald-200/90 leading-snug">
              {tab2Subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-xs sm:text-sm">
            <div className="bg-emerald-950/80 p-2 sm:p-2.5 rounded-lg border border-emerald-800/80">
              <span className="text-emerald-300 font-bold block text-xs sm:text-[13px]">
                {isBn ? "প্রাক-নিবন্ধন ফি:" : "Fee:"}
              </span>
              <span className="text-[#F3E0A0] font-bold text-xs sm:text-sm block mt-0.5">
                {tab2RegFee}
              </span>
            </div>
            <div className="bg-emerald-950/80 p-2 sm:p-2.5 rounded-lg border border-emerald-800/80">
              <span className="text-emerald-300 font-bold block text-xs sm:text-[13px]">
                {isBn ? "মেয়াদ:" : "Validity:"}
              </span>
              <span className="text-white font-bold text-xs sm:text-sm block mt-0.5">
                {tab2Validity}
              </span>
            </div>
          </div>

          <p className="text-xs text-emerald-200/90 italic leading-snug">
            📌 {tab2Note}
          </p>
        </div>
      )}

      {/* CTA Button */}
      <div className="pt-0.5 relative z-10">
        <button
          onClick={() =>
            onOpenBookingModal(
              `Hajj ${activeTab === "hajj2027" ? tab1Year : tab2Year}`,
              isBn
                ? `${activeTab === "hajj2027" ? tab1Year : tab2Year} সালের পবিত্র হজ্ব বুকিং / রেজিস্ট্রেশন`
                : `Holy Hajj ${activeTab === "hajj2027" ? tab1Year : tab2Year} Booking`,
            )
          }
          className="w-full bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 transform active:scale-95 transition-all group"
        >
          <span>🕋 {ctaBtnText}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-950" />
        </button>
      </div>
    </div>
  );
};
