import React from 'react';
import { MapPin, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { StandardPackageItem } from '../utils/packageAdapter';

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

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
      {/* Hero Image Container with Gradient & Overlaid Title */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={pkg.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Top Left Pill: Duration */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 border border-white/20 shadow-md z-10">
          <Calendar className="w-3.5 h-3.5 text-[#F3E0A0]" />
          <span>{duration}</span>
        </div>

        {/* Top Right Badge (if exists) */}
        {badge && (
          <div className="absolute top-3 right-3 bg-[#D4AF37] text-emerald-950 font-black text-[11px] px-3 py-1 rounded-full shadow-md border border-white/40 z-10 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-950" />
            <span>{badge}</span>
          </div>
        )}

        {/* Bottom Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-end z-10">
          <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-md line-clamp-2">
            {title}
          </h3>

          {pkg.priceBDT > 0 && (
            <p className="text-xs sm:text-sm font-bold text-[#F3E0A0] mt-1 flex items-center gap-1">
              <span>{isBn ? 'শুরু (প্রতি জন)' : 'Starts From (per person)'}</span>
              <span className="text-white font-extrabold text-sm sm:text-base">
                ৳{pkg.priceBDT.toLocaleString()}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Bottom White Container: Location & Action Button */}
      <div className="p-4 sm:p-5 space-y-4 bg-white flex flex-col justify-between flex-grow">
        {/* Location Pin Details */}
        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-semibold min-h-[36px]">
          <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
          <span className="line-clamp-2 text-slate-800 leading-snug">
            {location}
          </span>
        </div>

        {/* View Details Action Button */}
        <button
          onClick={() => onViewDetails(pkg)}
          className="w-full bg-[#8B0000] hover:bg-[#6A0000] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn active:scale-98 border border-red-900/40"
        >
          <span>{isBn ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
          <ChevronRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
