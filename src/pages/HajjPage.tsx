import React, { useState } from 'react';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { Language, HajjPackage } from '../types';
import { getTranslation } from '../data/translations';
import { PackageCard } from '../components/PackageCard';
import { PackageDetailView } from '../components/PackageDetailView';
import { adaptHajjPackage, StandardPackageItem } from '../utils/packageAdapter';
import { HajjAnnouncementCard } from '../components/HajjAnnouncementCard';

interface HajjPageProps {
  lang: Language;
  hajjPackage: HajjPackage;
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const HajjPage: React.FC<HajjPageProps> = ({
  lang,
  hajjPackage,
  onOpenBookingModal,
}) => {
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<StandardPackageItem | null>(null);
  const adaptedHajj = adaptHajjPackage(hajjPackage);

  // If a package detail is selected, render full page view
  if (selectedDetailPackage) {
    return (
      <PackageDetailView
        lang={lang}
        pkg={selectedDetailPackage}
        onBack={() => setSelectedDetailPackage(null)}
        onBookNow={(service, packageTitle) => onOpenBookingModal(service, packageTitle)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      
      {/* Hero Banner with Announcement */}
      <div className="max-w-3xl mx-auto">
        <HajjAnnouncementCard
          lang={lang}
          onOpenBookingModal={onOpenBookingModal}
        />
      </div>

      {/* Featured Hajj Post / Package Card (Akij Air Style) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-black text-[#0D472B]">
            {lang === 'bn' ? 'পবিত্র হজ্ব প্যাকেজসমূহ' : 'Holy Hajj Packages'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'bn' ? 'আমাদের ২০২৭ হজ্ব কাফেলার পোস্ট ও সম্পূর্ণ তথ্য দেখুন' : 'View full details & itineraries for our Hajj 2027 delegation'}
          </p>
        </div>

        <div className="max-w-md">
          <PackageCard
            lang={lang}
            pkg={adaptedHajj}
            onViewDetails={(item) => setSelectedDetailPackage(item)}
          />
        </div>
      </div>

      {/* Detailed Package Specifications Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E6DEC8] shadow-sm space-y-8">
        <div className="border-b border-[#E6DEC8] pb-4">
          <h2 className="text-2xl font-extrabold text-[#0D472B]">
            {lang === 'bn' ? 'প্যাকেজের বিস্তারিত বিবরণ ও সুবিধা' : 'Package Details & Facilities'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'bn' ? 'আমাদের ২০২৭ হজ্ব কাফেলায় অন্তর্ভুক্ত সেবাসমূহ' : 'Services included in our 2027 Hajj pilgrimage delegation'}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {lang === 'bn' ? 'প্যাকেজ মেয়াদ' : 'Package Duration'}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.durationBn : hajjPackage.durationEn}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {getTranslation(lang, 'makkahHotel')}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.makkahHotelBn : hajjPackage.makkahHotelEn}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {getTranslation(lang, 'madinahHotel')}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.madinahHotelBn : hajjPackage.madinahHotelEn}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {getTranslation(lang, 'food')}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.foodBn : hajjPackage.foodEn}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {getTranslation(lang, 'transport')}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.transportBn : hajjPackage.transportEn}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
              {lang === 'bn' ? 'গাইড ও মোয়াল্লেম' : 'Guide & Moallem'}
            </span>
            <p className="text-sm font-bold text-[#0D472B]">
              {lang === 'bn' ? hajjPackage.moallemBn : hajjPackage.moallemEn}
            </p>
          </div>

        </div>

        {/* Full Facilities List */}
        <div className="pt-4 space-y-4">
          <h3 className="text-lg font-bold text-[#0D472B]">
            {lang === 'bn' ? 'আমাদের বিশেষ সুবিধাসমূহ:' : 'Our Key Facilities:'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(lang === 'bn' ? hajjPackage.facilitiesBn : hajjPackage.facilitiesEn).map((fac, i) => (
              <div key={i} className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 flex items-start gap-3 text-xs sm:text-sm text-emerald-950 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#0D472B] shrink-0 mt-0.5" />
                <span>{fac}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Registration Documents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DEC8] space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <FileText className="w-6 h-6 text-[#0D472B]" />
          <h3 className="text-xl font-bold text-[#0D472B]">
            {lang === 'bn' ? 'হজ্ব নিবন্ধনের জন্য প্রয়োজনীয় কাগজপত্র' : 'Required Documents for Hajj Registration'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-800">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block">
              {lang === 'bn' ? '০১. পাসপোর্ট ও ছবি' : '01. Passport & Photos'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'কমপক্ষে হজ্ব্বের পর পর্যন্ত মেয়াদী আসল পাসপোর্ট এবং পাসপোর্ট সাইজের সাদা ব্যাকগ্রাউন্ড ছবি।'
                : 'Original passport with validity and white background photos.'
              }
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block">
              {lang === 'bn' ? '০২. জাতীয় পরিচয়পত্র (NID)' : '02. National ID (NID)'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'জাতীয় পরিচয়পত্র বা স্মার্ট কার্ডের স্পষ্ট ফটোকপি (১৮ বছরের কম হলে জন্ম সনদ)।'
                : 'Clear copy of Smart NID card or Birth Certificate for minors.'
              }
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <span className="font-bold text-[#0D472B] block">
              {lang === 'bn' ? '০৩. মেডিকেল ও ফি' : '03. Medical & Fees'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'প্রাক-নিবন্ধন ফি মাত্র ৩০,০০০ টাকা এবং স্বাস্থ্য পরীক্ষা সনদপত্র।'
                : 'Pre-registration fee of BDT 30,000 and medical clearance certificate.'
              }
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onOpenBookingModal('Hajj', lang === 'bn' ? '২০২৭ সালের হজ্ব প্রাক-নিবন্ধন' : 'Hajj 2027 Pre-Registration')}
            className="bg-[#0D472B] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#053B21] transition-all border border-[#D4AF37]"
          >
            {getTranslation(lang, 'registerNowCTA')}
          </button>
        </div>
      </div>

    </div>
  );
};
