import React, { useState } from 'react';
import { Calendar, ShieldCheck, ExternalLink, ChevronRight, Sparkles, Clock, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getDynamicHajjInfo } from '../utils/hajjUtils';

interface HajjAnnouncementCardProps {
  lang: Language;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
  compact?: boolean;
}

export const HajjAnnouncementCard: React.FC<HajjAnnouncementCardProps> = ({
  lang,
  onOpenBookingModal,
  compact = false,
}) => {
  const isBn = lang === 'bn';
  const hajjInfo = getDynamicHajjInfo();
  const [activeTab, setActiveTab] = useState<'hajj2027' | 'hajj2028'>('hajj2027');

  const { hajj2027, hajj2028, primaryYearBn, secondaryYearBn } = hajjInfo;

  return (
    <div className="bg-[#022212]/95 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border-2 border-[#D4AF37]/70 shadow-2xl relative space-y-4 text-white font-bengali overflow-hidden">
      
      {/* Background Subtle Pattern & Ambient Light */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Badge & Dynamic Auto-Update Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 relative z-10 border-b border-emerald-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-emerald-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            <span>{isBn ? 'বিশেষ ঘোষণা' : 'Special Announcement'}</span>
          </span>
          <span className="bg-emerald-900/80 text-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-700/60 hidden sm:inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            <span>{isBn ? `হজ্ব চক্র ${primaryYearBn}-${secondaryYearBn}` : `Hajj Cycle ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear}`}</span>
          </span>
        </div>

        {/* Portal Direct Link */}
        <a
          href="https://hajj.gov.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold text-[#F3E0A0] hover:text-white flex items-center gap-1 transition-colors bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-[#D4AF37]/40 shrink-0"
        >
          <span>{isBn ? 'বাংলাদেশ হজ পোর্টাল' : 'Bangladesh Hajj Portal'}</span>
          <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
        </a>
      </div>

      {/* Year Switcher Tabs */}
      <div className="flex items-center gap-2 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/80 relative z-10">
        <button
          onClick={() => setActiveTab('hajj2027')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hajj2027'
              ? 'bg-[#D4AF37] text-emerald-950 shadow-md font-black'
              : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? `${primaryYearBn} হজের প্রাক-নিবন্ধন` : `Hajj ${hajjInfo.primaryYear}`}</span>
        </button>

        <button
          onClick={() => setActiveTab('hajj2028')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hajj2028'
              ? 'bg-[#D4AF37] text-emerald-950 shadow-md font-black'
              : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
          }`}
        >
          <span>📜</span>
          <span>{isBn ? `${secondaryYearBn} হজের তথ্য` : `Hajj ${hajjInfo.secondaryYear}`}</span>
        </button>
      </div>

      {/* TAB 1: 2027 HAJJ REGISTRATION CONTENT */}
      {activeTab === 'hajj2027' && (
        <div className="space-y-3.5 relative z-10 animate-fade-in">
          
          {/* Main Title & Fee Banner */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug font-sans tracking-tight">
              {isBn ? hajj2027.titleBn : hajj2027.titleEn}
            </h2>
            <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
              {isBn ? hajj2027.bookingStatusBn : hajj2027.bookingStatusEn}
            </p>
          </div>

          {/* Registration Fee Highlight Box */}
          <div className="bg-gradient-to-r from-emerald-900/90 via-emerald-900/60 to-emerald-950/90 border border-[#D4AF37]/50 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F3E0A0]">
                  {isBn ? 'সরকারি প্রাক-নিবন্ধন ফি:' : 'Govt. Pre-Registration Fee:'}
                </p>
                <p className="text-[11px] text-emerald-200">
                  {isBn ? 'সিরিয়াল ও সিট বুকিংয়ের নিয়ম অনুযায়ী' : 'According to official serial regulations'}
                </p>
              </div>
            </div>
            <div className="bg-emerald-950 px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 text-center sm:text-right">
              <span className="text-[#D4AF37] text-base sm:text-lg font-black tracking-wide">
                {isBn ? '৩০,০০০ টাকা' : '30,000 BDT'}
              </span>
              <span className="text-[10px] text-emerald-300 block">{isBn ? 'জনপ্রতি' : 'per person'}</span>
            </div>
          </div>

          {/* Time Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/80 space-y-0.5">
              <div className="flex items-center gap-1 text-[#D4AF37] font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isBn ? 'শুরুর তারিখ' : 'Start Date'}</span>
              </div>
              <p className="text-white font-bold text-xs">{hajj2027.startDateBn}</p>
            </div>

            <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/80 space-y-0.5">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{isBn ? 'নিবন্ধনের শেষ তারিখ' : 'Deadline'}</span>
              </div>
              <p className="text-amber-200 font-bold text-xs">{hajj2027.endDateBn}</p>
            </div>

            <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/80 space-y-0.5">
              <div className="flex items-center gap-1 text-emerald-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isBn ? 'সম্ভাব্য হজ তারিখ' : 'Expected Hajj'}</span>
              </div>
              <p className="text-[#F3E0A0] font-bold text-xs">{hajj2027.hajjDateBn}</p>
            </div>
          </div>

          {/* Essential Conditions & Requirements */}
          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{isBn ? 'জরুরি কিছু শর্ত ও প্রয়োজনীয় তথ্য:' : 'Essential Requirements:'}</span>
            </div>
            <ul className="space-y-1 text-emerald-100 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>{isBn ? 'সর্বনিম্ন বয়স:' : 'Min Age:'}</strong> {isBn ? 'হজে গমনেচ্ছু ব্যক্তির বয়স কমপক্ষে ১৫ বছর হতে হবে।' : 'Age must be at least 15 years.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>{isBn ? 'পাসপোর্ট মেয়াদ:' : 'Passport:'}</strong> {isBn ? `অন্তত ৩১ ডিসেম্বর ${primaryYearBn} পর্যন্ত মেয়াদসহ বৈধ পাসপোর্ট থাকতে হবে।` : `Valid passport until 31 Dec ${hajjInfo.primaryYear}.`}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>{isBn ? 'প্রাক-নিবন্ধন ফি:' : 'Pre-reg Fee:'}</strong> {isBn ? 'সরকারিভাবে নির্ধারিত প্রাক-নিবন্ধন ফি ৩০,০০০ টাকা।' : 'Government mandated pre-registration fee 30,000 BDT.'}
                </span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* TAB 2: 2028 HAJJ INFORMATION & JOINT REGISTRATION CONTENT */}
      {activeTab === 'hajj2028' && (
        <div className="space-y-3.5 relative z-10 animate-fade-in">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug font-sans tracking-tight">
              {isBn ? hajj2028.titleBn : hajj2028.titleEn}
            </h2>
            <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
              {isBn ? hajj2028.jointInfoBn : hajj2028.jointInfoBn}
            </p>
          </div>

          {/* Quick Overview Info Box */}
          <div className="bg-emerald-950/90 border border-[#D4AF37]/50 p-3.5 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{isBn ? 'গুরুত্বপূর্ণ তথ্য একনজরে (যৌথ প্রাক-নিবন্ধন):' : 'Key Overview (Joint Pre-Registration):'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800">
                <span className="text-emerald-300 font-bold block">{isBn ? 'প্রাক-নিবন্ধন ফি:' : 'Pre-Reg Fee:'}</span>
                <span className="text-[#F3E0A0] font-bold">{hajj2028.regFeeBn}</span>
              </div>

              <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800">
                <span className="text-emerald-300 font-bold block">{isBn ? 'নিবন্ধনের মেয়াদ:' : 'Registration Validity:'}</span>
                <span className="text-white font-bold">{isBn ? 'সাধারণত ২ বছর কার্যকর থাকে' : 'Valid for 2 years'}</span>
              </div>

              <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800">
                <span className="text-emerald-300 font-bold block">{isBn ? 'নিবন্ধন শুরু:' : 'Registration Start:'}</span>
                <span className="text-white font-bold">{hajj2028.startDateBn}</span>
              </div>

              <div className="bg-emerald-900/60 p-2 rounded-xl border border-emerald-800">
                <span className="text-emerald-300 font-bold block">{isBn ? 'প্রাথমিক শেষ সময়:' : 'Initial Deadline:'}</span>
                <span className="text-amber-300 font-bold">{hajj2028.endDateBn}</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-200/90 leading-snug pt-1 border-t border-emerald-800/60 italic">
              📌 {isBn ? hajj2028.finalNoticeBn : hajj2028.finalNoticeBn}
            </p>
          </div>
        </div>
      )}

      {/* CTA Registration Button */}
      <div className="pt-1 relative z-10">
        <button
          onClick={() =>
            onOpenBookingModal(
              `Hajj ${activeTab === 'hajj2027' ? hajjInfo.primaryYear : hajjInfo.secondaryYear}`,
              isBn
                ? `${activeTab === 'hajj2027' ? primaryYearBn : secondaryYearBn} সালের পবিত্র হজ্ব বুকিং / রেজিস্ট্রেশন`
                : `Holy Hajj ${activeTab === 'hajj2027' ? hajjInfo.primaryYear : hajjInfo.secondaryYear} Booking`
            )
          }
          className="w-full bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all group"
        >
          <span>🕋 {isBn ? `এখনই ${activeTab === 'hajj2027' ? primaryYearBn : secondaryYearBn} হজের রেজিস্ট্রেশন করতে যোগাযোগ করুন` : 'Contact to Register Now'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-950" />
        </button>
      </div>

    </div>
  );
};
