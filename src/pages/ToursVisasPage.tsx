import React, { useState } from 'react';
import { Compass, CheckCircle2, ChevronRight, Globe2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Language, TourPackage } from '../types';
import { getTranslation } from '../data/translations';

interface ToursVisasPageProps {
  lang: Language;
  tourPackages: TourPackage[];
  onOpenBookingModal: (service: string, packageTitle: string) => void;
}

export const ToursVisasPage: React.FC<ToursVisasPageProps> = ({
  lang,
  tourPackages,
  onOpenBookingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const destinations = [
    { key: 'Saudi Arabia', nameBn: 'সৌদি আরব', nameEn: 'Saudi Arabia', flag: '🇸🇦' },
    { key: 'UAE (Dubai)', nameBn: 'ইউএই (দুবাই)', nameEn: 'UAE (Dubai)', flag: '🇦🇪' },
    { key: 'Malaysia & Thailand', nameBn: 'মালয়েশিয়া ও থাইল্যান্ড', nameEn: 'Malaysia & Thailand', flag: '🇲🇾' },
    { key: 'Bangladesh', nameBn: 'বাংলাদেশ (দেশীয়)', nameEn: 'Bangladesh', flag: '🇧🇩' },
    { key: 'Turkey', nameBn: 'তুরস্ক', nameEn: 'Turkey', flag: '🇹🇷' },
    { key: 'Singapore', nameBn: 'সিঙ্গাপুর', nameEn: 'Singapore', flag: '🇸🇬' },
    { key: 'Maldives', nameBn: 'মালদ্বীপ', nameEn: 'Maldives', flag: '🇲🇻' },
    { key: 'India', nameBn: 'ভারত', nameEn: 'India', flag: '🇮🇳' },
  ];

  const filteredTours = tourPackages.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.countryEn.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-bengali">
      
      {/* Hero Banner */}
      <div className="bg-[#052917] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0]">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{getTranslation(lang, 'navToursVisas')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans leading-tight">
            {getTranslation(lang, 'toursHeading')}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            {getTranslation(lang, 'toursSubheading')}
          </p>
        </div>
      </div>

      {/* Destination Filter Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          {lang === 'bn' ? 'গন্তব্য অনুযায়ী ট্যুর বাছুন:' : 'Browse by Destination:'}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0D472B] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {getTranslation(lang, 'filterAll')}
          </button>
          {destinations.map((dest) => (
            <button
              key={dest.key}
              onClick={() => setSelectedCategory(dest.key)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                selectedCategory === dest.key
                  ? 'bg-[#0D472B] text-white shadow-md border border-[#D4AF37]'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <span>{dest.flag}</span>
              <span>{lang === 'bn' ? dest.nameBn : dest.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tour Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredTours.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl overflow-hidden border-2 border-[#E6DEC8] shadow-sm hover:shadow-lg transition-all grid grid-cols-1 sm:grid-cols-12"
          >
            <div className="sm:col-span-5 relative aspect-4/3 sm:aspect-auto bg-slate-100">
              <img
                src={pkg.image}
                alt={lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#0D472B] text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-[#D4AF37]">
                {lang === 'bn' ? pkg.countryBn : pkg.countryEn}
              </span>
            </div>

            <div className="sm:col-span-7 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block">
                  {lang === 'bn' ? pkg.durationBn : pkg.durationEn}
                </span>
                <h3 className="text-base font-bold text-[#0D472B]">
                  {lang === 'bn' ? pkg.titleBn : pkg.titleEn}
                </h3>

                <div className="space-y-1 pt-1">
                  {(lang === 'bn' ? pkg.highlightsBn : pkg.highlightsEn).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D472B] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">{getTranslation(lang, 'perPerson')}</span>
                  <span className="text-lg font-extrabold text-[#0D472B]">
                    ৳{pkg.priceBDT.toLocaleString()} {getTranslation(lang, 'priceBDTLabel')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBookingModal('Tour & Visa', lang === 'bn' ? pkg.titleBn : pkg.titleEn)}
                  className="w-full bg-[#0D472B] hover:bg-[#053B21] text-white py-2 rounded-xl text-xs font-bold transition-all border border-[#D4AF37] flex items-center justify-center gap-1"
                >
                  <span>{getTranslation(lang, 'bookPackage')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visa Services & Custom Tour Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DEC8] grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="inline-block bg-emerald-50 text-[#0D472B] px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
            {lang === 'bn' ? 'ভিসা সহায়তা' : 'Visa Support'}
          </div>
          <h3 className="text-xl font-bold text-[#0D472B]">
            {lang === 'bn' ? 'ভিসা প্রসেসিং সেবা' : 'Visa Processing Services'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'আমরা সৌদি উমরাহ্ ও ভিজিট ভিসা, সংযুক্ত আরব আমিরাত (দুবাই ই-ভিসা), থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর এবং বিভিন্ন দেশের সঠিক ভিসা গাইডলাইন ও প্রসেসিং সম্পূর্ণ আমানতের সাথে প্রদান করি।'
              : 'We assist with Saudi Umrah & Visit visas, Dubai E-visas, Thailand, Malaysia, Singapore, and international tourist visas.'
            }
          </p>
        </div>

        <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#0D472B]">
            {lang === 'bn' ? 'কাস্টম বা গ্রুপ ট্যুর প্রয়োজন?' : 'Need Custom / Family Tour?'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'আপনার সুবিধাজনক তারিখ ও পছন্দ অনুযায়ী কাস্টমাইজড পরিবার বা কর্পোরেট গ্রুপ ট্যুর প্যাকেজ তৈরি করে নিন।'
              : 'Contact us for tailored family, honeymoon, or corporate group tour arrangements.'
            }
          </p>
          <button
            onClick={() => onOpenBookingModal('Tour & Visa', 'কাস্টম ট্যুর পরামর্শ')}
            className="bg-[#0D472B] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-[#053B21] transition-all border border-[#D4AF37]"
          >
            {lang === 'bn' ? 'কাস্টম ট্যুর ইনকোয়ারি' : 'Request Custom Itinerary'}
          </button>
        </div>
      </div>

    </div>
  );
};
