import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, 
  Sparkles, Clock, Users, Building, Utensils, Bus, ShieldCheck, Tag, Phone, MessageCircle
} from 'lucide-react';
import { Language } from '../types';
import { StandardPackageItem } from '../utils/packageAdapter';

interface PackageDetailViewProps {
  lang: Language;
  pkg: StandardPackageItem;
  onBack: () => void;
  onBookNow: (serviceType: string, packageTitle: string) => void;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({
  lang,
  pkg,
  onBack,
  onBookNow,
}) => {
  // Auto scroll to top when detail view mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pkg]);

  const isBn = lang === 'bn';
  const title = isBn ? pkg.titleBn : pkg.titleEn;
  const duration = isBn ? pkg.durationBn : pkg.durationEn;
  const location = isBn ? pkg.locationBn : pkg.locationEn;
  const badge = isBn ? pkg.badgeBn : pkg.badgeEn;
  const suitableFor = isBn ? pkg.suitableForBn : pkg.suitableForEn;
  const groupSize = isBn ? pkg.groupSizeBn : pkg.groupSizeEn;

  // Active Image State for Gallery
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const currentImage = pkg.galleryImages[activeImageIndex] || pkg.image;

  // Accordion Expand/Collapse States
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    itinerary: true,
    inclusions: true,
    exclusions: false,
    cancellation: false,
    policies: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBooking = () => {
    onBookNow(pkg.serviceType, title);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-bengali animate-fadeIn">
      
      {/* Top Breadcrumb & Back Navigation Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-[#0D472B] hover:bg-[#053B21] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95 border border-[#D4AF37]"
        >
          <ArrowLeft className="w-4 h-4 text-[#F3E0A0]" />
          <span>{isBn ? '← পূর্ববর্তী তালিকায় ফিরে যান' : '← Back to Package List'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>{isBn ? 'হোম' : 'Home'}</span>
          <span>/</span>
          <span>{pkg.serviceType}</span>
          <span>/</span>
          <span className="text-[#0D472B] truncate max-w-[180px] sm:max-w-xs">{title}</span>
        </div>
      </div>

      {/* Package Header Banner Card */}
      <div className="bg-gradient-to-r from-[#052917] via-[#0D472B] to-[#052917] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-lg space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#F3E0A0] font-bold">
          <span className="bg-[#D4AF37] text-emerald-950 px-3 py-1 rounded-full flex items-center gap-1 font-black shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            {badge || (isBn ? 'প্যাকেজ বিস্তারিত' : 'Package Details')}
          </span>
          <span className="flex items-center gap-1 text-slate-100 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-[#F3E0A0]" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-slate-100 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <Calendar className="w-3.5 h-3.5 text-[#F3E0A0]" />
            {duration}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-white font-sans leading-tight pt-1">
          {title}
        </h1>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Image Gallery, Day-wise Itinerary, Inclusions/Exclusions, Policies */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Gallery Container */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={currentImage}
                alt={title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
                📷 {activeImageIndex + 1} / {pkg.galleryImages.length}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {pkg.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
                {pkg.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#8B0000] ring-2 ring-red-200 scale-105 shadow-md'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-red-50 rounded-xl">
                <Clock className="w-6 h-6 text-[#8B0000]" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'মোট সময়সীমা' : 'Duration'}</span>
                <span className="text-sm font-black text-slate-800">{duration}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Users className="w-6 h-6 text-[#0D472B]" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'উপযোগীতা' : 'Suitable For'}</span>
                <span className="text-sm font-black text-slate-800">{suitableFor}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Building className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'গ্রুপ সাইজ' : 'Group Size'}</span>
                <span className="text-sm font-black text-slate-800">{groupSize}</span>
              </div>
            </div>
          </div>

          {/* ACCORDION 1: Day-Wise Itinerary */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion('itinerary')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-[#0D472B] hover:bg-emerald-50/50 transition-all border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#8B0000]" />
                <span className="text-lg sm:text-xl font-black font-sans">
                  {isBn ? 'দিনের বিস্তারিত কর্মপরিকল্পনা (Day wise itinerary)' : 'Day Wise Itinerary'}
                </span>
              </div>
              {openAccordions.itinerary ? (
                <ChevronUp className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {openAccordions.itinerary && (
              <div className="p-5 sm:p-6 space-y-4 bg-white">
                {pkg.itinerary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2 relative sm:pl-14 pl-12"
                  >
                    <span className="absolute left-3 top-4 w-8 h-8 rounded-full bg-[#0D472B] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-sm">
                      {item.dayNumber}
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                      <h4 className="font-bold text-[#0D472B] text-sm sm:text-base">
                        {isBn ? item.titleBn : item.titleEn}
                      </h4>
                      {(item.mealsBn || item.mealsEn) && (
                        <span className="text-xs bg-emerald-100 text-emerald-950 px-3 py-1 rounded-full font-extrabold border border-emerald-200">
                          🍴 {isBn ? item.mealsBn : item.mealsEn}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                      {isBn ? item.descBn : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACCORDION 2: Package Inclusions */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion('inclusions')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-[#0D472B] hover:bg-emerald-50/50 transition-all border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span className="text-lg sm:text-xl font-black font-sans">
                  {isBn ? 'প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ (Inclusions)' : 'Package Inclusions'}
                </span>
              </div>
              {openAccordions.inclusions ? (
                <ChevronUp className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {openAccordions.inclusions && (
              <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                {(isBn ? pkg.inclusionsBn : pkg.inclusionsEn).map((inc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACCORDION 3: Package Exclusions */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion('exclusions')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-[#8B0000] hover:bg-red-50/50 transition-all border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#8B0000]" />
                <span className="text-lg sm:text-xl font-black font-sans">
                  {isBn ? 'যা যা অন্তর্ভুক্ত নয় (Exclusions)' : 'Exclusions'}
                </span>
              </div>
              {openAccordions.exclusions ? (
                <ChevronUp className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {openAccordions.exclusions && (
              <div className="p-5 sm:p-6 space-y-2.5 bg-white">
                {(isBn ? pkg.exclusionsBn : pkg.exclusionsEn).map((exc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 font-medium"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACCORDION 4: Cancellation Policy */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion('cancellation')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-all border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
                <span className="text-lg sm:text-xl font-black font-sans">
                  {isBn ? 'বাতিল ও রিফান্ড নীতি (Cancellation Policy)' : 'Cancellation Policy'}
                </span>
              </div>
              {openAccordions.cancellation ? (
                <ChevronUp className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {openAccordions.cancellation && (
              <div className="p-5 sm:p-6 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>{isBn ? pkg.cancellationBn : pkg.cancellationEn}</p>
              </div>
            )}
          </div>

          {/* ACCORDION 5: General Policies & Terms */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleAccordion('policies')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-all border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-[#0D472B]" />
                <span className="text-lg sm:text-xl font-black font-sans">
                  {isBn ? 'সাধারণ নিয়মাবলী ও শর্তসমূহ (General Terms)' : 'General Terms & Policies'}
                </span>
              </div>
              {openAccordions.policies ? (
                <ChevronUp className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {openAccordions.policies && (
              <div className="p-5 sm:p-6 bg-white text-xs sm:text-sm text-slate-700 space-y-2.5">
                {(isBn ? pkg.policiesBn : pkg.policiesEn).map((pol, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#0D472B] font-bold">•</span>
                    <span>{pol}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? '← প্যাকেজ তালিকায় ফিরে যান' : '← Back to Package List'}</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Pricing & Offer Booking Box (Akij Air Style) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 bg-white rounded-3xl p-6 border-2 border-red-200 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#8B0000] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#8B0000]" />
                <span>{isBn ? 'বিশেষ অফার বুকিং' : 'Special Offer Booking'}</span>
              </div>
              <span className="bg-red-100 text-[#8B0000] font-black text-[11px] px-3 py-0.5 rounded-full border border-red-200">
                {isBn ? 'সীমিত আসন' : 'Limited Seats'}
              </span>
            </div>

            {/* Price Display */}
            {pkg.priceBDT > 0 && (
              <div className="space-y-1 bg-red-50/60 p-5 rounded-2xl border border-red-100 text-center">
                <span className="text-xs text-slate-500 font-bold block">
                  {isBn ? 'সর্বমোট প্যাকেজ মূল্য (প্রতি জন)' : 'Price Per Person'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#8B0000] block font-sans">
                  ৳{pkg.priceBDT.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isBn ? 'ট্যাক্স ও সকল সেবা ফি অন্তর্ভুক্ত' : 'Includes all taxes & fees'}
                </span>
              </div>
            )}

            {/* Hotel & Summary Box */}
            {pkg.hotelsBn && pkg.hotelsBn.length > 0 && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <span className="font-black text-slate-800 block text-sm">
                  {isBn ? 'প্যাকেজের হোটেলসমূহ:' : 'Package Hotels:'}
                </span>

                {pkg.hotelsBn.map((hotel, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Building className="w-4 h-4 text-[#0D472B] shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{isBn ? hotel : (pkg.hotelsEn ? pkg.hotelsEn[idx] : hotel)}</span>
                  </div>
                ))}

                <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Utensils className="w-4 h-4 text-[#0D472B] shrink-0" />
                  <span className="font-medium text-slate-800">{isBn ? 'সুস্বাদু ৩ বেলা দেশীয় খাবার' : 'Full Catering Meal Support'}</span>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Bus className="w-4 h-4 text-[#0D472B] shrink-0" />
                  <span className="font-medium text-slate-800">{isBn ? 'এসি লাক্সারি বাস ও জিয়ারাহ্' : 'AC Bus Transport & Ziyarah'}</span>
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            {pkg.priceBDT > 0 && (
              <button
                onClick={handleBooking}
                className="w-full bg-[#8B0000] hover:bg-[#6A0000] text-white py-4 px-6 rounded-2xl font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl active:scale-95 border border-red-900 flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'এখনই বুক করুন (Select Offer)' : 'Select Offer / Book Now'}</span>
              </button>
            )}

            {/* Instant Contact Channels */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <span className="text-xs text-slate-500 font-bold block text-center">
                {isBn ? 'সরাসরি পরামর্শের জন্য কল করুন:' : 'Direct Helpline Contact:'}
              </span>

              <a
                href="https://wa.me/8801627737741"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? 'হোয়াটসঅ্যাপে মেসেজ পাঠান' : 'WhatsApp Inquiry'}</span>
              </a>

              <a
                href="tel:01627737741"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-sans font-bold"
              >
                <Phone className="w-4 h-4 text-[#0D472B]" />
                <span>01627737741</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
