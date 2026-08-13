import React, { useState } from 'react';
import { Sparkles, MapPin, User, ShieldCheck, Award } from 'lucide-react';
import { Language } from '../types';
import { teamMembers } from '../data/teamData';

interface TeamAlbumProps {
  lang: Language;
}

export const TeamAlbum: React.FC<TeamAlbumProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'management' | 'shariah' | 'moallem'>('all');

  const isBn = lang === 'bn';

  const filteredMembers = teamMembers.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="space-y-5 font-bengali">
      
      {/* Header Section */}
      <div className="border-b border-[#E6DEC8] pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-[#0D472B] px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#D4AF37]/50 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBn ? 'সম্মানিত টিম ও মোয়াল্লেমবৃন্দ' : 'Management & Moallem Team'}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0D472B]">
            {isBn ? 'পরিচালনা পর্ষদ ও মোয়াল্লেমদের অ্যালবাম' : 'Leadership & Moallem Album'}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {isBn
              ? 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস-এর সম্মানিত টিম মেম্বার ও সুন্নতি কাফেলার মোয়াল্লেমবৃন্দ।'
              : 'Our management team, Shariah advisors, and dedicated Umrah & Hajj Moallems.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#0D472B] text-white shadow-sm border border-[#D4AF37]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isBn ? 'সবাই' : 'All'}
          </button>

          <button
            onClick={() => setSelectedCategory('management')}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'management'
                ? 'bg-[#0D472B] text-white shadow-sm border border-[#D4AF37]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isBn ? 'পরিচালনা পর্ষদ' : 'Management'}
          </button>

          <button
            onClick={() => setSelectedCategory('shariah')}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'shariah'
                ? 'bg-[#0D472B] text-white shadow-sm border border-[#D4AF37]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isBn ? 'শরিয়াহ্ উপদেষ্টা' : 'Shariah'}
          </button>

          <button
            onClick={() => setSelectedCategory('moallem')}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'moallem'
                ? 'bg-[#0D472B] text-white shadow-sm border border-[#D4AF37]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isBn ? 'মোয়াল্লেমবৃন্দ' : 'Moallems'}
          </button>
        </div>
      </div>

      {/* Compact Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`bg-white border rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative group ${
              member.isPlaceholder
                ? 'border-dashed border-amber-300 bg-amber-50/10'
                : 'border-slate-200 hover:border-[#0D472B]'
            }`}
          >
            {/* Compact Frame Photo */}
            <div className="relative mb-3 mt-1">
              <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-emerald-50/60 border-2 border-[#D4AF37]/70 shadow-sm relative shrink-0 flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={isBn ? member.nameBn : member.nameEn}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        const fallback = e.currentTarget.parentElement.querySelector('.fallback-avatar');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}

                {/* Fallback avatar icon when image is missing or failed */}
                <div
                  className="fallback-avatar flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-emerald-50 to-emerald-100/80 text-[#0D472B] p-2"
                  style={{ display: member.image ? 'none' : 'flex' }}
                >
                  <div className="w-11 h-11 rounded-full bg-white border border-[#D4AF37]/60 flex items-center justify-center shadow-xs mb-1">
                    <User className="w-6 h-6 text-[#0D472B]" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-900 text-center leading-tight line-clamp-1">
                    {isBn ? member.nameBn : member.nameEn}
                  </span>
                </div>
              </div>

              {/* Location Tag */}
              {member.locationBn && (
                <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-max max-w-[95%] bg-[#0D472B] text-[#D4AF37] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#D4AF37] flex items-center justify-center gap-1 shadow-md z-10">
                  <MapPin className="w-2.5 h-2.5 shrink-0 text-[#D4AF37]" />
                  <span className="truncate">{isBn ? member.locationBn : member.locationEn}</span>
                </div>
              )}
            </div>

            {/* Information */}
            <div className="space-y-1 w-full mt-1">
              {/* Name */}
              <h3 className="text-sm font-bold text-slate-800 leading-snug">
                {isBn ? member.nameBn : member.nameEn}
              </h3>

              {/* Role Badge */}
              <div className="inline-block bg-emerald-50 text-[#0D472B] px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200">
                {isBn ? member.roleBn : member.roleEn}
              </div>

              {/* Details List (e.g. Mufti's info) */}
              {member.detailsBn && member.detailsBn.length > 0 && (
                <div className="bg-slate-50 p-2 rounded-lg text-[11px] text-slate-700 space-y-0.5 text-left border border-slate-100 mt-1.5">
                  {member.detailsBn.map((detail, idx) => (
                    <p key={idx} className="flex items-start gap-1 leading-tight">
                      <span className="text-[#0D472B] font-bold shrink-0">•</span>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Agency Name */}
              <p className="text-[10px] font-semibold text-slate-600 pt-0.5">
                {isBn ? member.companyBn : member.companyEn}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

