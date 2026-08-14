import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { StandardPackageItem } from '../utils/packageAdapter';
import { Logo } from './Logo';

interface PackageCardProps {
  lang: Language;
  pkg: StandardPackageItem;
  onViewDetails: (pkg: StandardPackageItem) => void;
  onBookNow?: (pkg: StandardPackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  lang,
  pkg,
  onViewDetails,
}) => {
  const isBn = lang === 'bn';
  const title = isBn ? pkg.titleBn : pkg.titleEn;
  const duration = isBn ? pkg.durationBn : pkg.durationEn;
  const location = isBn ? pkg.locationBn : pkg.locationEn;
  const badge = isBn ? pkg.badgeBn : pkg.badgeEn;

  const images = pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : [pkg.image];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-slide images every 4 seconds
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const activeSrc = images[currentImageIndex] || pkg.image;

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hero Image Container with Gradient & Overlaid Agency Branding */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          key={activeSrc}
          src={activeSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 animate-fadeIn"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lh3.googleusercontent.com/d/')) {
              const fileId = target.src.split('lh3.googleusercontent.com/d/')[1]?.split('?')[0];
              if (fileId) {
                target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                return;
              }
            }
            if (!target.src.includes('1591604466107')) {
              target.src = 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80';
            }
          }}
        />

        {/* Top Left Pill: Duration */}
        <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 border border-white/25 shadow-md z-10">
          <Calendar className="w-3.5 h-3.5 text-[#F3E0A0]" />
          <span>{duration}</span>
        </div>

        {/* Top Right Badge (Lowered down slightly into the sky area as requested) */}
        <div className="absolute top-7 sm:top-8 right-3.5 sm:right-4 z-10 flex flex-col items-end gap-1">
          {badge && (
            <div className="bg-[#D4AF37] text-emerald-950 font-black text-[11px] px-3 py-1 rounded-full shadow-lg border border-white/40 flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-emerald-950" />
              <span>{badge}</span>
              {images.length > 1 && (
                <span className="bg-emerald-950/20 text-emerald-950 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ml-0.5">
                  {currentImageIndex + 1}/{images.length}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Dark Gradient Overlay with Agency Name & Logo (Replaces previous title/price position) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3.5 sm:p-4 flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-full bg-[#052917] p-0.5 border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg ring-1 ring-black/40">
            <Logo className="w-full h-full" />
          </div>
          <div className="min-w-0">
            <h4 className="text-white text-xs sm:text-sm font-black tracking-wide truncate drop-shadow-sm">
              {isBn ? 'ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস' : 'World Heritage Tours & Travels'}
            </h4>
            <p className="text-[10.5px] text-[#F3E0A0] font-semibold truncate tracking-normal">
              {isBn ? 'গভঃ অনুমোদিত হজ্ব ও উমরাহ্ ট্রাভেল এজেন্সি' : 'Govt Approved Hajj & Umrah Agency'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom White Container: Package Title, Starting Price, Location & Action Button */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-white flex flex-col justify-between flex-grow">
        <div className="space-y-2.5">
          {/* Package Title (Moved down here as requested) */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Starting Price (Moved down here as requested) */}
          {pkg.priceBDT > 0 && (
            <div className="flex items-baseline justify-between gap-2 bg-amber-50/70 border border-amber-200/80 px-3 py-1.5 rounded-xl">
              <span className="text-xs text-amber-900 font-bold">
                {isBn ? 'শুরু (প্রতি জন)' : 'Starts From (per person)'}
              </span>
              <span className="text-base sm:text-lg font-black text-[#8B0000]">
                ৳{pkg.priceBDT.toLocaleString()}
              </span>
            </div>
          )}

          {/* Location Pin Details */}
          <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-semibold pt-0.5">
            <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
            <span className="line-clamp-2 text-slate-700 leading-relaxed">
              {location}
            </span>
          </div>
        </div>

        {/* View Details Action Button */}
        <button
          onClick={() => onViewDetails(pkg)}
          className="w-full bg-[#8B0000] hover:bg-[#6A0000] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn active:scale-98 border border-red-900/40 mt-1"
        >
          <span>{isBn ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
          <ChevronRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
