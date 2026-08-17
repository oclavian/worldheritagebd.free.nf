import React from "react";
import {
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Language } from "../types";
import { getDynamicHajjInfo } from "../utils/hajjUtils";

interface HajjDualAnnouncementGridProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const HajjDualAnnouncementGrid: React.FC<
  HajjDualAnnouncementGridProps
> = ({ lang, onOpenBookingModal }) => {
  const isBn = lang === "bn";
  const hajjInfo = getDynamicHajjInfo();
  const { hajj2027, hajj2028, primaryYearBn, secondaryYearBn } = hajjInfo;

  return (
    <div className="w-full space-y-4 font-bengali">
      {/* Top Main Announcement Header Bar */}
      <div className="bg-[#052917] p-3.5 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-emerald-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            <span>{isBn ? "বিশেষ ঘোষণা" : "Special Notice"}</span>
          </span>
          <span className="text-sm font-extrabold text-[#F3E0A0] hidden sm:inline">
            •{" "}
            {isBn
              ? `পবিত্র হজ্ব চক্র ${primaryYearBn}-${secondaryYearBn} সরকারি প্রাক-নিবন্ধন কার্যক্রম`
              : `Official Hajj Cycle ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear} Pre-Registration`}
          </span>
        </div>

        <a
          href="https://hajj.gov.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#F3E0A0] hover:text-white flex items-center gap-1.5 transition-colors bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 shadow-xs shrink-0"
        >
          <span>
            {isBn
              ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার হজ পোর্টাল"
              : "Govt Hajj Portal"}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
        </a>
      </div>

      {/* 2 Separate Side-by-Side Cards (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* CARD 1 (LEFT): 2027 HAJJ PRE-REGISTRATION */}
        <div className="bg-gradient-to-b from-[#032313] via-[#052d1a] to-[#021f11] text-white p-5 sm:p-6 rounded-3xl border-2 border-[#D4AF37]/70 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          {/* Top subtle glow */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header: Title & Fee */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-emerald-800/80 pb-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E0A0] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5">
                  <span>🕋</span>
                  <span>
                    {isBn ? "চলমান প্রাক-নিবন্ধন" : "Active Pre-Registration"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {isBn
                    ? `${primaryYearBn} সালের পবিত্র হজ্ব প্রাক-নিবন্ধন`
                    : `Holy Hajj ${hajjInfo.primaryYear} Pre-Registration`}
                </h3>
                <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
                  {isBn
                    ? "প্রাথমিক প্রাক-নিবন্ধন কার্যক্রম ও সিরিয়াল গ্রহণ চলছে"
                    : "Primary pre-registration and serial allocation open"}
                </p>
              </div>

              <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-[#D4AF37]/60 text-right shrink-0 shadow-sm">
                <span className="text-[10px] text-emerald-300 block font-semibold leading-none">
                  {isBn ? "সরকারি ফি:" : "Govt Fee:"}
                </span>
                <span className="text-[#D4AF37] text-base font-black tracking-wide">
                  {isBn ? "৩০,০০০ টাকা" : "30,000 BDT"}
                </span>
              </div>
            </div>

            {/* 3-Box Key Schedule */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-emerald-300 block font-semibold text-[11px]">
                  {isBn ? "শুরু" : "Start"}
                </span>
                <span className="text-white font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? hajj2027.startDateBn : hajj2027.startDateEn}
                </span>
              </div>

              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-amber-400 block font-semibold text-[11px]">
                  {isBn ? "শেষ তারিখ" : "Deadline"}
                </span>
                <span className="text-amber-200 font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? hajj2027.endDateBn : hajj2027.endDateEn}
                </span>
              </div>

              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-emerald-300 block font-semibold text-[11px]">
                  {isBn ? "সম্ভাব্য হজ" : "Hajj Date"}
                </span>
                <span className="text-[#F3E0A0] font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? hajj2027.hajjDateBn : hajj2027.hajjDateEn}
                </span>
              </div>
            </div>

            {/* Requirements & Guidelines */}
            <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-emerald-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-[#D4AF37] font-black text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {isBn
                    ? "জরুরি কিছু শর্ত ও প্রয়োজনীয় তথ্য:"
                    : "Essential Requirements:"}
                </span>
              </div>
              <ul className="space-y-2 text-emerald-100 text-xs sm:text-[13px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "সর্বনিম্ন বয়স: " : "Min Age: "}
                    </strong>
                    {isBn
                      ? "হজে গমনেচ্ছু ব্যক্তির বয়স কমপক্ষে ১৫ বছর হতে হবে।"
                      : "Applicant must be at least 15 years old."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "পাসপোর্ট মেয়াদ: " : "Passport: "}
                    </strong>
                    {isBn
                      ? `অন্তত ৩১ ডিসেম্বর ${primaryYearBn} পর্যন্ত মেয়াদসহ বৈধ পাসপোর্ট থাকতে হবে।`
                      : `Valid passport required till at least 31 Dec ${hajjInfo.primaryYear}.`}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "প্রাক-নিবন্ধন ফি: " : "Fee: "}
                    </strong>
                    {isBn
                      ? "সরকারিভাবে নির্ধারিত প্রাক-নিবন্ধন ফি ৩০,০০০ টাকা (অফেরতযোগ্য)।"
                      : "Govt pre-registration fee 30,000 BDT."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Action Button */}
          <div className="pt-5 relative z-10">
            <button
              onClick={() =>
                onOpenBookingModal(
                  `Hajj ${hajjInfo.primaryYear}`,
                  isBn
                    ? `${primaryYearBn} সালের পবিত্র হজ্ব প্রাক-নিবন্ধন`
                    : `Holy Hajj ${hajjInfo.primaryYear} Registration`,
                )
              }
              className="w-full bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all group/btn border border-white/30"
            >
              <span>
                🕋{" "}
                {isBn
                  ? `এখনই ${primaryYearBn} হজের রেজিস্ট্রেশন করুন`
                  : `Register for Hajj ${hajjInfo.primaryYear}`}
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-950 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 2 (RIGHT): 2028 HAJJ INFO & ADVANCE PRE-REGISTRATION */}
        <div className="bg-gradient-to-b from-[#032313] via-[#052d1a] to-[#021f11] text-white p-5 sm:p-6 rounded-3xl border-2 border-emerald-600/60 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          {/* Top subtle glow */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Header: Title & Validity */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-emerald-800/80 pb-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-700/40 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1.5">
                  <span>📜</span>
                  <span>
                    {isBn ? "অগ্রিম নিবন্ধন ও তথ্য" : "Advance Info & Notice"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {isBn
                    ? `${secondaryYearBn} সালের হজ প্রাক-নিবন্ধন নির্দেশিকা`
                    : `Hajj ${hajjInfo.secondaryYear} Information & Guidance`}
                </h3>
                <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
                  {isBn
                    ? "ভবিষ্যৎ হজ্ব পরিকল্পনার জন্য অগ্রিম তথ্য ও প্রাক-নিবন্ধন"
                    : "Advance planning and information for upcoming Hajj"}
                </p>
              </div>

              <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-600/50 text-right shrink-0 shadow-sm">
                <span className="text-[10px] text-emerald-300 block font-semibold leading-none">
                  {isBn ? "মেয়াদকাল:" : "Validity:"}
                </span>
                <span className="text-emerald-300 text-sm sm:text-base font-black tracking-wide">
                  {isBn ? "২ বছর কার্যকর" : "Valid 2 Years"}
                </span>
              </div>
            </div>

            {/* 3-Box Key Guidance */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-emerald-300 block font-semibold text-[11px]">
                  {isBn ? "প্রাক-নিবন্ধন ফি" : "Fee"}
                </span>
                <span className="text-[#F3E0A0] font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? hajj2028.regFeeBn : hajj2028.regFeeEn}
                </span>
              </div>

              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-emerald-300 block font-semibold text-[11px]">
                  {isBn ? "সিরিয়াল সুবিধা" : "Priority"}
                </span>
                <span className="text-white font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? "অগ্রিম সিরিয়াল" : "Early Serial"}
                </span>
              </div>

              <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 text-center flex flex-col justify-center">
                <span className="text-emerald-300 block font-semibold text-[11px]">
                  {isBn ? "প্যাকেজ ঘোষণা" : "Package"}
                </span>
                <span className="text-emerald-200 font-black text-xs sm:text-sm mt-0.5">
                  {isBn ? "হজ ২০২৭ এর পর" : "After 2027"}
                </span>
              </div>
            </div>

            {/* Guidance & Future Notice */}
            <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-emerald-800/80 space-y-2.5">
              <div className="flex items-center gap-2 text-[#D4AF37] font-black text-xs sm:text-sm">
                <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {isBn
                    ? "অগ্রিম প্রাক-নিবন্ধনের নিয়মাবলী:"
                    : "Advance Pre-Registration Rules:"}
                </span>
              </div>
              <ul className="space-y-2 text-emerald-100 text-xs sm:text-[13px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "যৌথ প্রাক-নিবন্ধন: " : "Joint System: "}
                    </strong>
                    {isBn
                      ? `বর্তমানে যৌথভাবে ${primaryYearBn}-${secondaryYearBn} সালের হজের প্রাক-নিবন্ধন চলছে।`
                      : `Joint pre-registration for ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear} is currently open.`}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "মেয়াদকাল: " : "Validity: "}
                    </strong>
                    {isBn
                      ? "সরকারি নিয়মানুযায়ী একবার প্রাক-নিবন্ধন সম্পন্ন করলে তা ২ বছর কার্যকর থাকে।"
                      : "Pre-registration remains valid for 2 consecutive years."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">
                    •
                  </span>
                  <span>
                    <strong className="text-white font-bold">
                      {isBn ? "প্যাকেজ প্রকাশ: " : "Package Notice: "}
                    </strong>
                    {isBn
                      ? `${primaryYearBn} সালের হজ সম্পন্ন হওয়ার পর ${secondaryYearBn} সালের মূল হজ প্যাকেজ ঘোষণা করা হবে।`
                      : `Full package details will be announced after Hajj ${hajjInfo.primaryYear}.`}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Action Button */}
          <div className="pt-5 relative z-10">
            <button
              onClick={() =>
                onOpenBookingModal(
                  `Hajj ${hajjInfo.secondaryYear}`,
                  isBn
                    ? `${secondaryYearBn} সালের হজ অগ্রিম নিবন্ধন / তথ্য অনুসন্ধান`
                    : `Hajj ${hajjInfo.secondaryYear} Advance Pre-Registration Inquiry`,
                )
              }
              className="w-full bg-emerald-900/90 hover:bg-emerald-800 text-white font-black px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all group/btn border border-[#D4AF37]/50"
            >
              <span>
                📜{" "}
                {isBn
                  ? `${secondaryYearBn} হজের অগ্রিম নিবন্ধন ও পরামর্শ নিন`
                  : `Advance Inquiry for Hajj ${hajjInfo.secondaryYear}`}
              </span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
