import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Language, UmrahPackage } from '../types';
import { getTranslation } from '../data/translations';
import { PackageCard } from '../components/PackageCard';
import { PackageDetailView } from '../components/PackageDetailView';
import { adaptUmrahPackage, StandardPackageItem } from '../utils/packageAdapter';

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
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<StandardPackageItem | null>(null);

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'economy') return pkg.id.includes('economy');
    if (filter === 'deluxe') return pkg.id.includes('deluxe');
    if (filter === 'ramadan') return pkg.id.includes('ramadan');
    return true;
  });

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
              ? 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস এর তত্ত্বাবধানে সাশ্রয়ী মূল্যে এবং সর্বোত্তম সেবায় উমরাহ্ পালন করুন। আমাদের প্রতিটি প্যাকেজে অভিজ্ঞ মোয়াল্লেম, হারামের কাছে মানসম্মত হোটেল ও রুচিসম্মত বাংলা খাবারের সুব্যবস্থা রাখা হয়েছে।'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => {
          const adapted = adaptUmrahPackage(pkg);
          return (
            <PackageCard
              key={pkg.id}
              lang={lang}
              pkg={adapted}
              onViewDetails={(item) => setSelectedDetailPackage(item)}
            />
          );
        })}
      </div>

      {/* Booking Steps Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DEC8] space-y-6">
        <h3 className="text-xl font-bold text-[#0D472B] font-sans text-center">
          {lang === 'bn' ? 'উমরাহ্ প্যাকেজ বুকিংয়ের নিয়মাবলী' : 'Umrah Package Booking Procedure'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">
              {lang === 'bn' ? '১' : '1'}
            </span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'প্যাকেজ নির্বাচন' : 'Select Package'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'আপনার বাজেট ও সুবিধামত পছন্দসই প্যাকেজ বাছুন।' : 'Choose your desired package within budget.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">
              {lang === 'bn' ? '২' : '2'}
            </span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'পাসপোর্ট জমা' : 'Submit Passport'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'ন্যূনতম ৬ মাস মেয়াদী পাসপোর্ট ও এনআইডি প্রদান করুন।' : 'Provide passport with min 6-month validity.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">
              {lang === 'bn' ? '৩' : '3'}
            </span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'ভিসা ও টিকেট ইস্যু' : 'Visa & Flight Approval'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'সৌদি উমরাহ্ ভিসা ও বায়োমেট্রিক সম্পন্ন করা।' : 'Process Saudi e-visa & biometric approval.'}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#0D472B] text-white font-bold inline-flex items-center justify-center text-sm">
              {lang === 'bn' ? '৪' : '4'}
            </span>
            <h4 className="font-bold text-[#0D472B] text-sm">{lang === 'bn' ? 'পবিত্র যাত্রার সূচনা' : 'Embark Journey'}</h4>
            <p className="text-xs text-slate-600">{lang === 'bn' ? 'আমাদের মোয়াল্লেমের দিকনির্দেশনায় নিরাপদ যাত্রা।' : 'Depart safely with our Moallem guidance.'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
