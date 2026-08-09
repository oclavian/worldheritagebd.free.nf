import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles, Building, MapPin, Bus, Utensils, ShieldCheck } from 'lucide-react';
import { Language, UmrahPackage } from '../types';
import { getTranslation } from '../data/translations';

interface UmrahPageProps {
  lang: Language;
  packages: UmrahPackage[];
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const UmrahPage: React.FC<UmrahPageProps> = ({
  lang,
  packages,
  onOpenBookingModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'economy' | 'deluxe' | 'ramadan'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'economy') return pkg.id.includes('economy');
    if (filter === 'deluxe') return pkg.id.includes('deluxe');
    if (filter === 'ramadan') return pkg.id.includes('ramadan');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      
      {/* Banner / Introduction Header */}
      <div className="bg-[#052917] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'bn' ? 'শরীয়তসম্মত পবিত্র উমরাহ্ সফর' : 'Shariah Compliant Holy Umrah Pilgrimage'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-sans">
            {getTranslation(lang, 'navUmrah')}
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {lang === 'bn' 
              ? 'ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস এর তত্ত্বাবধানে সাশ্রয়ী মূল্যে এবং সর্বোত্তম সেবায় উমরাহ্ পালন করুন। আমাদের প্রতিটি প্যাকেজে অভিজ্ঞ মোয়াল্লেম, হারামের কাছে মানসম্মত হোটেল ও রুচিসম্মত বাংলা খাবারের সুব্যবস্থা রাখা হয়েছে।'
              : 'Perform your holy Umrah under expert guidance at affordable pricing. Every package includes experienced Moallem support, close-to-Haram hotels, and quality Bengali catering.'
            }
          </p>
        </div>
      </div>

      {/* Package Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6DEC8] pb-4">
        {[
          { id: 'all', labelBn: 'সকল প্যাকেজ', labelEn: 'All Packages' },
          { id: 'economy', labelBn: 'ইকোনমি উমরাহ্', labelEn: 'Economy Umrah' },
          { id: 'deluxe', labelBn: 'ডিলাক্স ৪-স্টার', labelEn: 'Deluxe 4-Star' },
          { id: 'ramadan', labelBn: 'রমজান উমরাহ্', labelEn: 'Ramadan Special' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === tab.id
                ? 'bg-[#0D472B] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {lang === 'bn' ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Package List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl overflow-hidden border-2 border-[#E6DEC8] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative aspect-16/9 bg-slate-100">
                <img
                  src={pkg.image}
                  alt={lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {pkg.badgeBn && (
                  <span className="absolute top-3 right-3 bg-[#D4AF37] text-emerald-950 font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {lang === 'bn' ? pkg.badgeBn : pkg.badgeEn}
                  </span>
                )}
              </div>

              {/* Package Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
                    {lang === 'bn' ? pkg.durationBn : pkg.durationEn}
                  </span>
                  <h3 className="text-lg font-bold text-[#0D472B]">
                    {lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                  </h3>
                </div>

                {/* Details Breakdown */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs text-slate-800">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-[#0D472B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">{getTranslation(lang, 'makkahHotel')}:</strong>
                      <span>{lang === 'bn' ? pkg.makkahHotelBn : pkg.makkahHotelEn} ({lang === 'bn' ? pkg.makkahDistanceBn : pkg.makkahDistanceEn})</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-[#0D472B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">{getTranslation(lang, 'madinahHotel')}:</strong>
                      <span>{lang === 'bn' ? pkg.madinahHotelBn : pkg.madinahHotelEn} ({lang === 'bn' ? pkg.madinahDistanceBn : pkg.madinahDistanceEn})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span><strong>{getTranslation(lang, 'food')}:</strong> {lang === 'bn' ? pkg.foodBn : pkg.foodEn}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span><strong>{getTranslation(lang, 'transport')}:</strong> {lang === 'bn' ? pkg.transportBn : pkg.transportEn}</span>
                  </div>
                </div>

                {/* Inclusions Checklist */}
                <div className="space-y-1.5 text-xs text-slate-700">
                  <span className="font-bold text-[#0D472B] block">
                    {lang === 'bn' ? 'প্যাকেজ সুবিধাসমূহ:' : 'Package Inclusions:'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(lang === 'bn' ? pkg.inclusionsBn : pkg.inclusionsEn).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D472B] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Price & Action */}
            <div className="p-6 pt-0 border-t border-slate-100 mt-2 space-y-3">
              <div className="flex items-baseline justify-between pt-3">
                <span className="text-xs text-slate-500 font-semibold">{getTranslation(lang, 'perPerson')}</span>
                <span className="text-2xl font-extrabold text-[#0D472B]">
                  ৳{pkg.priceBDT.toLocaleString()} {getTranslation(lang, 'priceBDTLabel')}
                </span>
              </div>

              <button
                onClick={() => onOpenBookingModal('Umrah', lang === 'bn' ? pkg.titleBn : pkg.titleEn)}
                className="w-full bg-gradient-to-r from-[#0D472B] to-[#053B21] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all border border-[#D4AF37] flex items-center justify-center gap-2"
              >
                <span>{getTranslation(lang, 'bookPackage')}</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Steps Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DEC8] space-y-6">
        <h3 className="text-xl font-bold text-[#0D472B] font-sans text-center">
          {lang === 'bn' ? 'উমরাহ্ প্যাকেজ বুকিংয়ের নিয়মাবলী' : 'Umrah Package Booking Procedure'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">১</span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'প্যাকেজ নির্বাচন' : 'Select Package'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'আপনার বাজেট ও সুবিধামত পছন্দসই প্যাকেজ বাছুন।' : 'Choose your desired package within budget.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">২</span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'পাসপোর্ট জমা' : 'Submit Passport'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'ন্যূনতম ৬ মাস মেয়াদী পাসপোর্ট ও এনআইডি প্রদান করুন।' : 'Provide passport with min 6-month validity.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">৩</span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'ভিসা ও টিকেট ইস্যু' : 'Visa & Flight Approval'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'সৌদি উমরাহ্ ভিসা ও বায়োমেট্রিক সম্পন্ন করা।' : 'Process Saudi e-visa & biometric approval.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">৪</span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'পবিত্র যাত্রার সূচনা' : 'Embark Journey'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'আমাদের মোয়াল্লেমের দিকনির্দেশনায় নিরাপদ যাত্রা।' : 'Depart safely with our Moallem guidance.'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
