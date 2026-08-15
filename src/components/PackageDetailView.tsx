import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, 
  Sparkles, Clock, Users, Building, Utensils, Bus, ShieldCheck, Tag, Phone, MessageCircle,
  ChevronLeft, ChevronRight, Image as ImageIcon, Filter, Play, Pause
} from 'lucide-react';
import { Language } from '../types';
import { StandardPackageItem } from '../utils/packageAdapter';
import { toBengaliDigits } from '../utils/formatters';
import { 
  ALL_HAJJ_DRIVE_PHOTOS, 
  MAKKAH_DRIVE_IMAGES, 
  MADINAH_DRIVE_IMAGES, 
  MINA_DRIVE_IMAGES, 
  ARAFAT_DRIVE_IMAGES, 
  MUZDALIFAH_DRIVE_IMAGES,
  DrivePhotoItem 
} from '../data/hajjDriveImages';

interface PackageDetailViewProps {
  lang: Language;
  pkg: StandardPackageItem;
  onBack: () => void;
  onBookNow: (serviceType: string, packageTitle: string) => void;
}

function getHolySiteCaption(imgUrl: string, index: number, isBn: boolean, serviceType: string): string {
  // Check if it matches any known Drive photo
  const matchedDriveItem = ALL_HAJJ_DRIVE_PHOTOS.find(item => imgUrl.includes(item.driveId));
  if (matchedDriveItem) {
    return isBn ? matchedDriveItem.titleBn : matchedDriveItem.titleEn;
  }

  const lower = imgUrl.toLowerCase();
  if (lower.includes('kaaba') || lower.includes('haram') || lower.includes('makkah')) {
    return isBn ? 'পবিত্র মক্কা মুকাররমা (কাবা শরীফ)' : 'Holy Makkah (The Holy Kaaba)';
  }
  if (lower.includes('nabawi') || lower.includes('medina') || lower.includes('madinah')) {
    return isBn ? 'পবিত্র মদিনা মুনাওয়ারা (মসজিদে নববী)' : 'Holy Madinah (Al-Masjid an-Nabawi)';
  }
  if (lower.includes('mina')) {
    return isBn ? 'পবিত্র মিনা প্রান্তর (তাঁবুর শহর)' : 'Holy Mina (Tent City)';
  }
  if (lower.includes('arafat')) {
    return isBn ? 'পবিত্র আরাফাত ময়দান (জাবালে রহমত)' : 'Holy Mount Arafat (Jabal al-Rahmah)';
  }
  if (lower.includes('muzdalifah')) {
    return isBn ? 'পবিত্র মুজদালিফা প্রান্তর' : 'Holy Muzdalifah Plain';
  }
  if (lower.includes('taif') || lower.includes('hada')) {
    return isBn ? 'ঐতিহাসিক তায়েফ উপত্যকা' : 'Historic Taif Mountain Valley';
  }
  if (lower.includes('jeddah') || lower.includes('floating') || lower.includes('rahmah')) {
    return isBn ? 'জেদ্দার বিখ্যাত আল-রহমাহ ফ্লোটিং মসজিদ' : 'Jeddah Al-Rahmah Floating Mosque';
  }
  
  if (serviceType === 'Hajj') {
    const hajjSitesBn = [
      'পবিত্র মক্কা মুকাররমা (কাবা শরীফ)',
      'পবিত্র মদিনা মুনাওয়ারা (মসজিদে নববী)',
      'পবিত্র মিনা প্রান্তর (তাঁবুর শহর)',
      'পবিত্র আরাফাত ময়দান (জাবালে রহমত)',
      'পবিত্র মুজদালিফা প্রান্তর'
    ];
    const hajjSitesEn = [
      'Holy Makkah (The Kaaba)',
      'Holy Madinah (Prophet\'s Mosque)',
      'Holy Mina (Tent City)',
      'Holy Mount Arafat (Jabal al-Rahmah)',
      'Holy Muzdalifah Plain'
    ];
    return isBn ? hajjSitesBn[index % hajjSitesBn.length] : hajjSitesEn[index % hajjSitesEn.length];
  }
  return isBn ? `গ্যালারি ছবি ${toBengaliDigits(index + 1)}` : `Gallery Image ${index + 1}`;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({
  lang,
  pkg,
  onBack,
  onBookNow,
}) => {
  // Auto scroll to top ONLY when package changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pkg.id, pkg.serviceType]);

  const isBn = lang === 'bn';
  const isHajj = pkg.serviceType === 'Hajj';
  const title = isBn ? pkg.titleBn : pkg.titleEn;
  const duration = isBn ? pkg.durationBn : pkg.durationEn;
  const location = isBn ? pkg.locationBn : pkg.locationEn;
  const badge = isBn ? pkg.badgeBn : pkg.badgeEn;
  const suitableFor = isBn ? pkg.suitableForBn : pkg.suitableForEn;
  const groupSize = isBn ? pkg.groupSizeBn : pkg.groupSizeEn;

  // Selected Category filter for Hajj gallery
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'makkah' | 'madinah' | 'mina' | 'arafat' | 'muzdalifah'>('all');

  // Filtered gallery images
  const currentGalleryImages = useMemo(() => {
    if (!isHajj) {
      return pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : [pkg.image];
    }

    if (selectedCategory === 'all') {
      return ALL_HAJJ_DRIVE_PHOTOS.map(p => p.url);
    } else if (selectedCategory === 'makkah') {
      return MAKKAH_DRIVE_IMAGES.map(p => p.url);
    } else if (selectedCategory === 'madinah') {
      return MADINAH_DRIVE_IMAGES.map(p => p.url);
    } else if (selectedCategory === 'mina') {
      return MINA_DRIVE_IMAGES.map(p => p.url);
    } else if (selectedCategory === 'arafat') {
      return ARAFAT_DRIVE_IMAGES.map(p => p.url);
    } else if (selectedCategory === 'muzdalifah') {
      return MUZDALIFAH_DRIVE_IMAGES.map(p => p.url);
    }
    return pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : [pkg.image];
  }, [isHajj, selectedCategory, pkg.galleryImages, pkg.image]);

  // Active Image State for Gallery
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Reset active image index when category changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedCategory]);

  // Auto sliding interval (every 3.5 seconds)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || currentGalleryImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % currentGalleryImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, currentGalleryImages.length]);

  // Auto scroll active thumbnail horizontally inside its container only (NEVER scrolls window)
  useEffect(() => {
    if (thumbnailsRef.current && currentGalleryImages.length > 1) {
      const container = thumbnailsRef.current;
      const activeThumb = container.children[activeImageIndex] as HTMLElement;
      if (activeThumb) {
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const containerWidth = container.offsetWidth;
        const targetScrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeImageIndex, currentGalleryImages.length]);

  const currentImage = currentGalleryImages[activeImageIndex] || currentGalleryImages[0] || pkg.image;
  const currentCaption = getHolySiteCaption(currentImage, activeImageIndex, isBn, pkg.serviceType);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : currentGalleryImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < currentGalleryImages.length - 1 ? prev + 1 : 0));
  };

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
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            
            {/* Category Filter Pills (Specifically for Hajj) */}
            {isHajj && (
              <div className="space-y-2 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#0D472B]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isBn ? 'পবিত্র স্থানসমূহ অনুযায়ী ছবি নির্বাচন করুন:' : 'Filter Photos by Holy Site:'}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {isBn ? `মোট ${toBengaliDigits(currentGalleryImages.length)}টি ছবি` : `${currentGalleryImages.length} Photos`}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'all'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{isBn ? `সবগুলো (${toBengaliDigits(38)})` : 'All (38)'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('makkah')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'makkah'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>🕋</span>
                    <span>{isBn ? `মক্কা (${toBengaliDigits(10)})` : 'Makkah (10)'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('madinah')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'madinah'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>🕌</span>
                    <span>{isBn ? `মদিনা (${toBengaliDigits(6)})` : 'Madinah (6)'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('mina')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'mina'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>⛺</span>
                    <span>{isBn ? `মিনা (${toBengaliDigits(9)})` : 'Mina (9)'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('arafat')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'arafat'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>🌄</span>
                    <span>{isBn ? `আরাফাত (${toBengaliDigits(10)})` : 'Arafat (10)'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('muzdalifah')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      selectedCategory === 'muzdalifah'
                        ? 'bg-[#0D472B] text-white shadow-sm ring-1 ring-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>🌌</span>
                    <span>{isBn ? `মুজদালিফা (${toBengaliDigits(3)})` : 'Muzdalifah (3)'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Active Display Stage with Auto Slide */}
            <div 
              className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 shadow-md group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                key={currentImage}
                src={currentImage}
                alt={currentCaption}
                className="w-full h-full object-cover transition-all duration-500 animate-fadeIn scale-[1.01]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  // If it was a lh3 googleusercontent URL, retry with thumbnail URL
                  if (target.src.includes('lh3.googleusercontent.com/d/')) {
                    const fileId = target.src.split('lh3.googleusercontent.com/d/')[1]?.split('?')[0];
                    if (fileId) {
                      target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                      return;
                    }
                  }
                  if (!target.src.includes('1591604466107')) {
                    target.src = 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
              />

              {/* Holy Site Caption Badge */}
              <div className="absolute top-3 left-3 bg-[#052917]/90 backdrop-blur-md text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-bold border border-[#D4AF37]/50 shadow-lg flex items-center gap-2 z-10">
                <MapPin className="w-4 h-4 text-[#F3E0A0] shrink-0" />
                <span className="font-extrabold tracking-wide text-[#FAF8F5]">{currentCaption}</span>
              </div>

              {/* Auto Sliding Play/Pause Toggle & Badge */}
              {currentGalleryImages.length > 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={() => setIsAutoPlaying(prev => !prev)}
                    className="bg-black/75 hover:bg-[#0D472B] backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-xl font-bold border border-white/20 shadow-md flex items-center gap-1.5 transition-all"
                    title={isAutoPlaying ? (isBn ? 'অটো-স্লাইড বন্ধ করুন' : 'Pause Auto-slide') : (isBn ? 'অটো-স্লাইড চালু করুন' : 'Start Auto-slide')}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#F3E0A0]" />
                        <span className="text-[11px] font-semibold hidden sm:inline">{isBn ? 'অটো পরিবর্তন চালু' : 'Auto Sliding'}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                        <span className="text-[11px] font-semibold hidden sm:inline">{isBn ? 'প্লে করুন' : 'Play'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Prev / Next Buttons */}
              {currentGalleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous Image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#0D472B] text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next Image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#0D472B] text-white p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-bold border border-white/20 flex items-center gap-1.5 z-10">
                <ImageIcon className="w-3.5 h-3.5 text-[#F3E0A0]" />
                <span>{isBn ? `${toBengaliDigits(activeImageIndex + 1)} / ${toBengaliDigits(currentGalleryImages.length)}` : `${activeImageIndex + 1} / ${currentGalleryImages.length}`}</span>
              </span>

              {/* Animated Auto-slide Progress Bar at bottom */}
              {isAutoPlaying && !isHovered && currentGalleryImages.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-10">
                  <div 
                    key={activeImageIndex}
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 origin-left"
                    style={{
                      animation: 'progressFill 3.5s linear forwards'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Strip with Holy Location Names */}
            {currentGalleryImages.length > 1 && (
              <div className="space-y-1.5">
                <div 
                  ref={thumbnailsRef}
                  className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scroll-smooth"
                >
                  {currentGalleryImages.map((imgUrl, idx) => {
                    const caption = getHolySiteCaption(imgUrl, idx, isBn, pkg.serviceType);
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 text-left flex flex-col justify-end p-1 group/thumb ${
                          isActive
                            ? 'border-[#0D472B] ring-2 ring-emerald-300 scale-105 shadow-md'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={caption}
                          className="absolute inset-0 w-full h-full object-cover"
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
                              target.src = 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <span className="relative text-[9px] font-bold text-white line-clamp-1 leading-tight drop-shadow-sm">
                          {caption}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2.5 transition-all hover:border-[#0D472B]/30 hover:bg-[#FAF6EF]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-[#0D472B] text-[#F3E0A0] font-black text-xs sm:text-sm whitespace-nowrap shadow-sm tracking-wide shrink-0">
                          {isBn ? `দিন ${toBengaliDigits(item.dayNumber)}` : `Day ${item.dayNumber}`}
                        </span>
                        <h4 className="font-bold text-[#0D472B] text-sm sm:text-base">
                          {isBn ? item.titleBn : item.titleEn}
                        </h4>
                      </div>
                      {(item.mealsBn || item.mealsEn) && (
                        <span className="text-xs bg-emerald-100/90 text-emerald-950 px-3 py-1 rounded-full font-extrabold border border-emerald-200/80 shrink-0">
                          🍴 {isBn ? item.mealsBn : item.mealsEn}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
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
                <span>{isBn ? 'এখনই বুক করতে যোগাযোগ করুন (Select Offer)' : 'Contact to Book Now (Select Offer)'}</span>
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
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 font-sans"
              >
                <Phone className="w-4 h-4 text-[#0D472B]" />
                <span>{isBn ? toBengaliDigits('01627737741') : '01627737741'}</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
