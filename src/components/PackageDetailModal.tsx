import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, 
  Sparkles, Clock, Users, Building, Utensils, Bus, ShieldCheck, Tag
} from 'lucide-react';
import { Language } from '../types';
import { StandardPackageItem } from '../utils/packageAdapter';
import { toBengaliDigits } from '../utils/formatters';

interface PackageDetailModalProps {
  lang: Language;
  pkg: StandardPackageItem | null;
  onClose: () => void;
  onBookNow: (serviceType: string, packageTitle: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  lang,
  pkg,
  onClose,
  onBookNow,
}) => {
  if (!pkg) return null;

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
    const serviceName = pkg.serviceType;
    onClose();
    onBookNow(serviceName, title);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-bengali animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col border border-emerald-900/20 my-auto">
        
        {/* Modal Top Sticky Header */}
        <div className="bg-[#052917] text-white p-4 sm:p-6 border-b border-[#D4AF37]/30 flex items-start justify-between gap-4 sticky top-0 z-20 shadow-md">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#F3E0A0] font-bold">
              <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                {badge || (isBn ? 'প্যাকেজ বিস্তারিত' : 'Package Details')}
              </span>
              <span className="flex items-center gap-1 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {duration}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-white font-sans leading-snug">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shrink-0 focus:outline-none"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F8F9FA] flex-grow">
          
          {/* LEFT COLUMN: Gallery, Itinerary Accordions & Policies */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gallery Image Box */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900 shadow-md">
                <img
                  src={currentImage}
                  alt={title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold border border-white/20">
                  {activeImageIndex + 1} / {pkg.galleryImages.length}
                </span>
              </div>

              {/* Thumbnails Strip */}
              {pkg.galleryImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
                  {pkg.galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#8B0000] ring-2 ring-red-200 scale-105'
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

            {/* ACCORDION 1: Day Wise Itinerary */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('itinerary')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-[#0D472B] hover:bg-emerald-50/50 transition-all border-b border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-[#8B0000]" />
                  <span className="text-base sm:text-lg font-black font-sans">
                    {isBn ? 'দিনের বিস্তারিত কর্মপরিকল্পনা (Day wise itinerary)' : 'Day wise itinerary'}
                  </span>
                </div>
                {openAccordions.itinerary ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {openAccordions.itinerary && (
                <div className="p-4 sm:p-6 space-y-4 bg-white">
                  {pkg.itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/80 bg-[#FAF8F5] hover:border-[#0D472B]/30 hover:bg-[#FAF6EF] space-y-2.5 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-3 py-0.5 rounded-full font-black text-xs whitespace-nowrap shadow-sm tracking-wide shrink-0 bg-[#0D472B] text-[#F3E0A0]">
                            {item.dayNumber}
                          </span>
                          <h4 className="font-bold text-[#0D472B] text-sm sm:text-base">
                            {isBn ? item.titleBn : item.titleEn}
                          </h4>
                        </div>
                        {(item.mealsBn || item.mealsEn) && (
                          <span className="text-[11px] bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md font-bold shrink-0">
                            🍴 {isBn ? item.mealsBn : item.mealsEn}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                        {isBn ? item.descBn : item.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACCORDION 2: Inclusions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('inclusions')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-[#0D472B] hover:bg-emerald-50/50 transition-all border-b border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-base sm:text-lg font-black font-sans">
                    {isBn ? 'প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ (Inclusions)' : 'Package Inclusions'}
                  </span>
                </div>
                {openAccordions.inclusions ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {openAccordions.inclusions && (
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
                  {(isBn ? pkg.inclusionsBn : pkg.inclusionsEn).map((inc, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACCORDION 3: Exclusions */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('exclusions')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-[#8B0000] hover:bg-red-50/50 transition-all border-b border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#8B0000]" />
                  <span className="text-base sm:text-lg font-black font-sans">
                    {isBn ? 'যা যা অন্তর্ভুক্ত নয় (Exclusions)' : 'Exclusions'}
                  </span>
                </div>
                {openAccordions.exclusions ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {openAccordions.exclusions && (
                <div className="p-4 sm:p-6 space-y-2 bg-white">
                  {(isBn ? pkg.exclusionsBn : pkg.exclusionsEn).map((exc, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 flex items-start gap-2 text-xs sm:text-sm text-rose-950 font-medium"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACCORDION 4: Cancellation Policy */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('cancellation')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-all border-b border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span className="text-base sm:text-lg font-black font-sans">
                    {isBn ? 'বাতিল ও রিফান্ড নীতি (Cancellation Policy)' : 'Cancellation Policy'}
                  </span>
                </div>
                {openAccordions.cancellation ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {openAccordions.cancellation && (
                <div className="p-4 sm:p-6 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                  <p>{isBn ? pkg.cancellationBn : pkg.cancellationEn}</p>
                </div>
              )}
            </div>

            {/* ACCORDION 5: General Policies */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion('policies')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-all border-b border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-5 h-5 text-[#0D472B]" />
                  <span className="text-base sm:text-lg font-black font-sans">
                    {isBn ? 'সাধারণ নিয়মাবলী ও শর্তসমূহ (General Policies)' : 'General Policies & Terms'}
                  </span>
                </div>
                {openAccordions.policies ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {openAccordions.policies && (
                <div className="p-4 sm:p-6 bg-white text-xs sm:text-sm text-slate-600 space-y-2">
                  {(isBn ? pkg.policiesBn : pkg.policiesEn).map((pol, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#0D472B] font-bold">•</span>
                      <span>{pol}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Key Stats Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#8B0000] shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'মোট সময়সীমা' : 'Duration'}</span>
                  <span className="text-sm font-extrabold text-slate-800">{duration}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <Users className="w-8 h-8 text-[#0D472B] shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'উপযোগীতা' : 'Suitable For'}</span>
                  <span className="text-sm font-extrabold text-slate-800">{suitableFor}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                <Building className="w-8 h-8 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'গ্রুপ সাইজ' : 'Group Size'}</span>
                  <span className="text-sm font-extrabold text-slate-800">{groupSize}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Pricing & Direct Booking Card (Akij Air Style) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 bg-white rounded-3xl p-5 sm:p-6 border-2 border-red-200 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#8B0000] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#8B0000]" />
                  <span>{isBn ? 'বিশেষ প্যাকেজ অফার' : 'Special Offers'}</span>
                </div>
                <span className="bg-red-100 text-[#8B0000] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                  {isBn ? 'সীমিত আসন' : 'Limited Seats'}
                </span>
              </div>

              {/* Price Display */}
              {pkg.priceBDT > 0 && (
                <div className="space-y-1 bg-red-50/50 p-4 rounded-2xl border border-red-100 text-center">
                  <span className="text-xs text-slate-500 font-bold block">
                    {isBn ? 'সর্বমোট প্যাকেজ মূল্য (প্রতি জন)' : 'Price Per Person'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#8B0000] block font-sans">
                    ৳{pkg.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {isBn ? 'ট্যাক্স ও সকল চার্জ অন্তর্ভুক্ত' : 'Price includes VAT & Tax'}
                  </span>
                </div>
              )}

              {/* Hotel & Essential Summary */}
              {pkg.hotelsBn && pkg.hotelsBn.length > 0 && (
                <div className="space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-800 block">
                    {isBn ? 'প্যাকেজ হাইলাইটস:' : 'Package Highlights:'}
                  </span>

                  {pkg.hotelsBn.map((hotel, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Building className="w-4 h-4 text-[#0D472B] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{isBn ? hotel : (pkg.hotelsEn ? pkg.hotelsEn[idx] : hotel)}</span>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Utensils className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span>{isBn ? 'স্বাদযুক্ত খাবারের ব্যবস্থা' : 'Full Catering Meal Support'}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Bus className="w-4 h-4 text-[#0D472B] shrink-0" />
                    <span>{isBn ? 'এসি ট্রান্সপোর্ট ও জিয়ারাহ্' : 'AC Transport & Ziyarah'}</span>
                  </div>
                </div>
              )}

              {/* Select Offer CTA Button */}
              <button
                onClick={handleBooking}
                className="w-full bg-[#8B0000] hover:bg-[#6A0000] text-white py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl active:scale-95 border border-red-900 flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'এখনই বুক করতে যোগাযোগ করুন (Select Offer)' : 'Contact to Book Now (Select Offer)'}</span>
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-slate-500 block">
                  {isBn ? '📞 সরাসরি কল বা হোয়াটসঅ্যাপে কথা বলতে হটসাপ আইকনে চাপুন' : '📞 Fast response via Whatsapp or Hotline call'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
