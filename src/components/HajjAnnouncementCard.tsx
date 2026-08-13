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
}) => {
  const isBn = lang === 'bn';
  const hajjInfo = getDynamicHajjInfo();
  const [activeTab, setActiveTab] = useState<'hajj2027' | 'hajj2028'>('hajj2027');

  const { hajj2027, hajj2028, primaryYearBn, secondaryYearBn } = hajjInfo;

  return (
    <div className="bg-[#022212]/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/70 shadow-xl relative space-y-3 text-white font-bengali overflow-hidden">
      
      {/* Background Subtle Light */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header: Badge & Portal Link */}
      <div className="flex items-center justify-between gap-2 relative z-10 border-b border-emerald-800/60 pb-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
            <Sparkles className="w-3 h-3 text-emerald-950" />
            <span>{isBn ? 'বিশেষ ঘোষণা' : 'Announcement'}</span>
          </span>
          <span className="text-emerald-300 text-[10px] font-medium hidden sm:inline">
            • {isBn ? `হজ্ব চক্র ${primaryYearBn}-${secondaryYearBn}` : `Cycle ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear}`}
          </span>
        </div>

        <a
          href="https://hajj.gov.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-[#F3E0A0] hover:text-white flex items-center gap-1 transition-colors bg-emerald-950/80 px-2 py-0.5 rounded-md border border-[#D4AF37]/30 shrink-0"
        >
          <span>{isBn ? 'হজ পোর্টাল' : 'Hajj Portal'}</span>
          <ExternalLink className="w-2.5 h-2.5 text-[#D4AF37]" />
        </a>
      </div>

      {/* Compact Tabs */}
      <div className="flex items-center gap-1.5 bg-emerald-950/90 p-1 rounded-xl border border-emerald-800/80 relative z-10 text-xs">
        <button
          onClick={() => setActiveTab('hajj2027')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'hajj2027'
              ? 'bg-[#D4AF37] text-emerald-950 font-black shadow-xs'
              : 'text-emerald-200 hover:text-white'
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? `${primaryYearBn} হজের নিবন্ধন` : `Hajj ${hajjInfo.primaryYear}`}</span>
        </button>

        <button
          onClick={() => setActiveTab('hajj2028')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'hajj2028'
              ? 'bg-[#D4AF37] text-emerald-950 font-black shadow-xs'
              : 'text-emerald-200 hover:text-white'
          }`}
        >
          <span>📜</span>
          <span>{isBn ? `${secondaryYearBn} হজের তথ্য` : `Hajj ${hajjInfo.secondaryYear}`}</span>
        </button>
      </div>

      {/* TAB 1: 2027 HAJJ CONTENT */}
      {activeTab === 'hajj2027' && (
        <div className="space-y-2.5 relative z-10 animate-fade-in text-xs">
          
          {/* Main Title & Fee Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-emerald-900/90 to-emerald-950/90 p-2.5 rounded-xl border border-[#D4AF37]/40">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                {isBn ? `${primaryYearBn} সালের পবিত্র হজ্ব প্রাক-নিবন্ধন` : `Holy Hajj ${hajjInfo.primaryYear} Pre-Reg`}
              </h3>
              <p className="text-[10px] text-emerald-200/90 mt-0.5">
                {isBn ? 'প্রাথমিক প্রাক-নিবন্ধন কার্যক্রম চলছে' : 'Primary registration is open'}
              </p>
            </div>
            <div className="bg-emerald-950 px-2.5 py-1 rounded-lg border border-[#D4AF37]/50 text-right shrink-0">
              <span className="text-[10px] text-emerald-300 block leading-none">{isBn ? 'সরকারি ফি:' : 'Govt Fee:'}</span>
              <span className="text-[#D4AF37] text-sm font-black tracking-wide">
                {isBn ? '৩০,০০০ টাকা' : '30,000 BDT'}
              </span>
            </div>
          </div>

          {/* Time Schedule Compact 3 Pill Grid */}
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-emerald-300 block font-semibold">{isBn ? 'শুরু' : 'Start'}</span>
              <span className="text-white font-bold">{hajj2027.startDateBn}</span>
            </div>

            <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-amber-400 block font-semibold">{isBn ? 'শেষ তারিখ' : 'Deadline'}</span>
              <span className="text-amber-200 font-bold">{hajj2027.endDateBn}</span>
            </div>

            <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80 text-center">
              <span className="text-emerald-300 block font-semibold">{isBn ? 'সম্ভাব্য হজ' : 'Hajj Date'}</span>
              <span className="text-[#F3E0A0] font-bold">{hajj2027.hajjDateBn}</span>
            </div>
          </div>

          {/* Essential Conditions & Requirements - Full Text Line by Line */}
          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/60 text-[11px] space-y-1.5">
            <div className="flex items-center gap-1 text-[#D4AF37] font-bold text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? 'জরুরি কিছু শর্ত ও প্রয়োজনীয় তথ্য:' : 'Essential Requirements & Information:'}</span>
            </div>
            <ul className="space-y-1 text-emerald-100 text-[11px] leading-relaxed pl-1">
              <li className="flex items-start gap-1.5">
                <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">•</span>
                <span>
                  <strong className="text-white">{isBn ? 'সর্বনিম্ন বয়স: ' : 'Min Age: '}</strong>
                  {isBn ? 'হজে গমনেচ্ছু ব্যক্তির বয়স কমপক্ষে ১৫ বছর হতে হবে।' : 'Age must be at least 15 years.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">•</span>
                <span>
                  <strong className="text-white">{isBn ? 'পাসপোর্ট মেয়াদ: ' : 'Passport Validity: '}</strong>
                  {isBn ? `অন্তত ৩১ ডিসেম্বর ${primaryYearBn} পর্যন্ত মেয়াদসহ বৈধ পাসপোর্ট থাকতে হবে।` : `Valid passport required until at least 31 Dec ${hajjInfo.primaryYear}.`}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#D4AF37] font-bold shrink-0 mt-0.5">•</span>
                <span>
                  <strong className="text-white">{isBn ? 'প্রাক-নিবন্ধন ফি: ' : 'Pre-reg Fee: '}</strong>
                  {isBn ? 'সরকারিভাবে নির্ধারিত প্রাক-নিবন্ধন ফি ৩০,০০০ টাকা।' : 'Government prescribed pre-registration fee 30,000 BDT.'}
                </span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* TAB 2: 2028 HAJJ CONTENT */}
      {activeTab === 'hajj2028' && (
        <div className="space-y-2.5 relative z-10 animate-fade-in text-xs">
          
          <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-800 space-y-1">
            <h3 className="text-sm font-black text-white">
              {isBn ? `${secondaryYearBn} সালের হজ প্রাক-নিবন্ধন নির্দেশিকা` : `Hajj ${hajjInfo.secondaryYear} Notice`}
            </h3>
            <p className="text-[10px] text-emerald-200/90 leading-snug">
              {isBn ? `বর্তমানে যৌথভাবে ${primaryYearBn}-${secondaryYearBn} সালের হজের প্রাক-নিবন্ধন চলছে। প্রাক-নিবন্ধন সাধারণত ২ বছর কার্যকর থাকে।` : `Joint pre-registration for ${hajjInfo.primaryYear}-${hajjInfo.secondaryYear} is ongoing.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80">
              <span className="text-emerald-300 font-bold block">{isBn ? 'প্রাক-নিবন্ধন ফি:' : 'Fee:'}</span>
              <span className="text-[#F3E0A0] font-bold">{hajj2028.regFeeBn}</span>
            </div>
            <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80">
              <span className="text-emerald-300 font-bold block">{isBn ? 'মেয়াদ:' : 'Validity:'}</span>
              <span className="text-white font-bold">{isBn ? '২ বছর কার্যকর' : 'Valid 2 yrs'}</span>
            </div>
          </div>

          <p className="text-[10px] text-emerald-200/80 italic leading-tight">
            📌 {isBn ? `${primaryYearBn} সালের হজ সম্পন্ন হওয়ার পর ${secondaryYearBn} সালের মূল হজ প্যাকেজ ঘোষণা করা হবে।` : `Main package will be announced after Hajj ${hajjInfo.primaryYear}.`}
          </p>

        </div>
      )}

      {/* CTA Button */}
      <div className="pt-0.5 relative z-10">
        <button
          onClick={() =>
            onOpenBookingModal(
              `Hajj ${activeTab === 'hajj2027' ? hajjInfo.primaryYear : hajjInfo.secondaryYear}`,
              isBn
                ? `${activeTab === 'hajj2027' ? primaryYearBn : secondaryYearBn} সালের পবিত্র হজ্ব বুকিং / রেজিস্ট্রেশন`
                : `Holy Hajj ${activeTab === 'hajj2027' ? hajjInfo.primaryYear : hajjInfo.secondaryYear} Booking`
            )
          }
          className="w-full bg-[#D4AF37] hover:bg-[#C59B27] text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5 transform active:scale-95 transition-all group"
        >
          <span>🕋 {isBn ? `এখনই ${activeTab === 'hajj2027' ? primaryYearBn : secondaryYearBn} হজের রেজিস্ট্রেশন করুন` : 'Register Now'}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-950" />
        </button>
      </div>

    </div>
  );
};

