import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  Star,
  ArrowRight,
  Phone,
  Building2,
  MapPin,
  HeartHandshake,
  Headphones,
  Plane,
} from "lucide-react";
import {
  Language,
  PageId,
  UmrahPackage,
  HajjPackage,
  BlogPost,
  AgencyInfo,
  HomePageConfig,
  TourPackage,
} from "../types";
import { getTranslation } from "../data/translations";
import { PackageCard } from "../components/PackageCard";
import { PackageDetailView } from "../components/PackageDetailView";
import {
  adaptUmrahPackage,
  adaptHajjPackage,
  adaptTourPackage,
  StandardPackageItem,
} from "../utils/packageAdapter";
import { toBengaliDigits } from "../utils/formatters";
import { HajjAnnouncementCard } from "../components/HajjAnnouncementCard";
import { HajjHadithMarquee } from "../components/HajjHadithMarquee";
import { initialHomePageConfig } from "../data/initialHomePageData";

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  umrahPackages: UmrahPackage[];
  hajjPackage?: HajjPackage;
  hajjPackages?: HajjPackage[];
  tourPackages?: TourPackage[];
  blogPosts: BlogPost[];
  agencyInfo: AgencyInfo;
  onOpenBookingModal: (service?: string, packageTitle?: string) => void;
  homePageConfig?: HomePageConfig | null;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  umrahPackages,
  hajjPackage,
  hajjPackages,
  tourPackages,
  blogPosts,
  agencyInfo,
  onOpenBookingModal,
  homePageConfig,
}) => {
  const config = homePageConfig || initialHomePageConfig;
  const isBn = lang === "bn";

  const [packageCategory, setPackageCategory] = useState<
    "all" | "umrah" | "hajj"
  >("all");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [selectedDetailPackage, setSelectedDetailPackage] =
    useState<StandardPackageItem | null>(null);

  // Background Slider Logic
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    let images: string[] = [];
    if (umrahPackages && umrahPackages.length > 0) {
      umrahPackages.forEach((pkg) => {
        if (pkg.image) images.push(pkg.image);
        if (pkg.galleryImages) images.push(...pkg.galleryImages);
      });
    }
    if (hajjPackages && hajjPackages.length > 0) {
      hajjPackages.forEach((pkg) => {
        if (pkg.image) images.push(pkg.image);
        if (pkg.galleryImages) images.push(...pkg.galleryImages);
      });
    }
    if (hajjPackage) {
      if (hajjPackage.image) images.push(hajjPackage.image);
      if (hajjPackage.galleryImages) images.push(...hajjPackage.galleryImages);
    }
    if (tourPackages && tourPackages.length > 0) {
      tourPackages.forEach((pkg) => {
        if (pkg.image) images.push(pkg.image);
        if (pkg.galleryImages) images.push(...pkg.galleryImages);
      });
    }
    if (blogPosts && blogPosts.length > 0) {
      blogPosts.forEach((post) => {
        if (post.image) images.push(post.image);
        if (post.galleryImages) images.push(...post.galleryImages);
      });
    }

    const uniqueImages = Array.from(new Set(images)).filter(
      (img) => img && img.trim() !== "",
    );
    if (uniqueImages.length > 0) {
      setBgImages(uniqueImages);
    } else {
      setBgImages([
        config.heroBgImage || initialHomePageConfig.heroBgImage || "",
      ]);
    }
  }, [
    umrahPackages,
    hajjPackages,
    hajjPackage,
    tourPackages,
    blogPosts,
    config.heroBgImage,
  ]);

  useEffect(() => {
    if (bgImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  // Live Typewriter Effect for Top Tagline
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const messages = isBn
    ? config.typewriterMessagesBn && config.typewriterMessagesBn.length > 0
      ? config.typewriterMessagesBn
      : initialHomePageConfig.typewriterMessagesBn
    : config.typewriterMessagesEn && config.typewriterMessagesEn.length > 0
      ? config.typewriterMessagesEn
      : initialHomePageConfig.typewriterMessagesEn;

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const currentFullText = messages[loopIndex % messages.length];

    const typingTimer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          setTypewriterText(
            currentFullText.substring(0, typewriterText.length + 1),
          );
          if (typewriterText.length + 1 >= currentFullText.length) {
            // Pause when full text is typed
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          // Deleting backward
          setTypewriterText(
            currentFullText.substring(0, typewriterText.length - 1),
          );
          if (typewriterText.length <= 1) {
            setIsDeleting(false);
            setLoopIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? 30 : 65,
    );

    return () => clearTimeout(typingTimer);
  }, [typewriterText, isDeleting, loopIndex, lang, messages]);

  // Helper for Accreditation Icons
  const renderAccreditationIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-8 h-8 text-[#D4AF37] mx-auto" />;
      case "Building2":
        return <Building2 className="w-8 h-8 text-[#0D472B] mx-auto" />;
      case "Plane":
        return <Plane className="w-8 h-8 text-rose-700 mx-auto" />;
      case "ShieldCheck":
      default:
        return <ShieldCheck className="w-8 h-8 text-[#0D472B] mx-auto" />;
    }
  };

  // If a package detail is selected, render full page view
  if (selectedDetailPackage) {
    return (
      <PackageDetailView
        lang={lang}
        pkg={selectedDetailPackage}
        onBack={() => setSelectedDetailPackage(null)}
        onBookNow={(service, packageTitle) =>
          onOpenBookingModal(service, packageTitle)
        }
      />
    );
  }

  return (
    <div className="space-y-12 font-bengali pb-12">
      {/* 1. LUXURY HERO SECTION WITH INTERACTIVE SEARCH & STATS */}
      {config.showHeroSection !== false && (
        <section className="relative bg-[#03180D] text-white pt-3 sm:pt-4 lg:pt-5 pb-28 sm:pb-36 lg:pb-44 overflow-hidden border-b-4 border-[#D4AF37]">
          {/* Sliding Package Images Background */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="popLayout">
              {bgImages.length > 0 && (
                <motion.div
                  key={currentBgIndex}
                  initial={{ opacity: 0, x: -60, scale: 1.05 }}
                  animate={{ opacity: 0.75, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 60, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${bgImages[currentBgIndex]}')`,
                  }}
                />
              )}
            </AnimatePresence>
            {/* Subtle gradient to ensure white text stays readable without tinting the photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#03180D] pointer-events-none" />
          </div>

          {/* Golden Radial Glow and Halftone Pattern Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 halftone-dots opacity-20 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
              {/* Left Content Column (7 cols) - Balanced Vertical Flow & Spacing */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-5.5 text-center lg:text-left flex flex-col justify-between">
                {/* Top Announcement Tagline Pill with LIVE TYPEWRITER EFFECT */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/25 via-emerald-900/40 to-[#D4AF37]/20 border border-[#D4AF37]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#F3E0A0] shadow-[0_0_15px_rgba(212,175,55,0.2)] min-h-[32px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
                    <span className="font-medium tracking-wide">
                      {typewriterText}
                      <span className="inline-block w-1.5 h-3.5 bg-[#D4AF37] ml-1 rounded-sm animate-ping align-middle" />
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-white tracking-tight leading-[1.25] font-sans">
                  {isBn ? (
                    config.heroTitleBn ? (
                      <span>{config.heroTitleBn}</span>
                    ) : (
                      <>
                        পবিত্র{" "}
                        <span className="text-[#D4AF37]">উমরাহ্, হজ্ব</span> ও
                        ফ্লাইট টিকিটে সর্বোচ্চ বিশ্বস্ততা
                      </>
                    )
                  ) : config.heroTitleEn ? (
                    <span>{config.heroTitleEn}</span>
                  ) : (
                    <>
                      Your Trusted Partner for{" "}
                      <span className="text-[#D4AF37]">Holy Umrah, Hajj</span> &
                      Flights
                    </>
                  )}
                </h1>

                {/* Sub-headline description */}
                <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                  {isBn
                    ? config.heroSubtitleBn ||
                      "ঢাকা পান্থপথ প্রধান কার্যালয় থেকে সরাসরি বাংলাদেশ সরকার ও সৌদি ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে পরিচালিত।"
                    : config.heroSubtitleEn ||
                      "Operating directly from Panthapath main office with 100% Shariah compliance and government licensing."}
                </p>

                {/* Quick Stat Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
                  {(config.stats && config.stats.length > 0
                    ? config.stats
                    : initialHomePageConfig.stats
                  ).map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-white/10 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-white/15 shadow-sm hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <span className="text-lg sm:text-2xl font-black text-[#D4AF37] block font-sans">
                        {isBn ? stat.valueBn : stat.valueEn}
                      </span>
                      <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                        {isBn ? stat.labelBn : stat.labelEn}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Trust Assurance Features Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-0.5 text-xs text-emerald-100 font-medium">
                  {(config.trustBadges && config.trustBadges.length > 0
                    ? config.trustBadges
                    : initialHomePageConfig.trustBadges
                  ).map((badge) => (
                    <span
                      key={badge.id}
                      className="flex items-center justify-center gap-2 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-2 rounded-full shadow-xs text-center"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{isBn ? badge.textBn : badge.textEn}</span>
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-4 sm:gap-6 lg:gap-8 pt-1">
                  <motion.button
                    onClick={() => onNavigate("umrah")}
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial justify-center bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38712] text-emerald-950 px-6 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm shadow-[0_6px_20px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.6)] transition-shadow flex items-center gap-2.5 cursor-pointer border border-[#FFF0A0]"
                  >
                    <span className="text-base">🕋</span>
                    <span>
                      {isBn
                        ? config.heroBtnUmrahBn || "উমরাহ্ প্যাকেজসমূহ"
                        : config.heroBtnUmrahEn || "Umrah Packages"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-950 font-bold ml-0.5" />
                  </motion.button>

                  <motion.button
                    onClick={() => onNavigate("hajj")}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.55,
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial justify-center bg-emerald-900/60 hover:bg-emerald-800/80 text-white border-2 border-[#D4AF37] px-6 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.35)] transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="text-base">🕌</span>
                    <span>
                      {isBn
                        ? config.heroBtnHajjBn || "পবিত্র হজ্ব ২০২৭"
                        : config.heroBtnHajjEn || "Holy Hajj 2027"}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping ml-1" />
                  </motion.button>
                </div>

                {/* Quran & Hadith Scrolling Marquee Ticker */}
                {config.showHadithMarquee !== false && (
                  <div className="pt-1">
                    <HajjHadithMarquee lang={lang} />
                  </div>
                )}
              </div>

              {/* Right Column - Dynamic Hajj Announcement Card (5 cols) */}
              {config.showHajjAnnouncementCard !== false && (
                <div className="lg:col-span-5">
                  <HajjAnnouncementCard
                    lang={lang}
                    onOpenBookingModal={onOpenBookingModal}
                    config={config}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Multi-Layered Natural Surging Ocean & Aqua Water Wave Bottom Divider */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none h-28 sm:h-36 lg:h-44">
            {/* Floating Crystal Water Droplets & Bubbles */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <style>{`
                @keyframes waterBubbleRise1 {
                  0% { transform: translate(10vw, 100%) scale(0.6); opacity: 0; }
                  40% { opacity: 0.9; }
                  100% { transform: translate(14vw, -30px) scale(1.3); opacity: 0; }
                }
                @keyframes waterBubbleRise2 {
                  0% { transform: translate(30vw, 100%) scale(0.8); opacity: 0; }
                  50% { opacity: 0.95; }
                  100% { transform: translate(27vw, -35px) scale(1.4); opacity: 0; }
                }
                @keyframes waterBubbleRise3 {
                  0% { transform: translate(55vw, 100%) scale(0.5); opacity: 0; }
                  45% { opacity: 0.85; }
                  100% { transform: translate(58vw, -25px) scale(1.2); opacity: 0; }
                }
                @keyframes waterBubbleRise4 {
                  0% { transform: translate(75vw, 100%) scale(0.7); opacity: 0; }
                  50% { opacity: 0.9; }
                  100% { transform: translate(72vw, -40px) scale(1.45); opacity: 0; }
                }
                @keyframes waterBubbleRise5 {
                  0% { transform: translate(90vw, 100%) scale(0.6); opacity: 0; }
                  40% { opacity: 0.8; }
                  100% { transform: translate(93vw, -30px) scale(1.25); opacity: 0; }
                }

                @keyframes waveSurgeDeep {
                  0% { transform: translate3d(0, 0, 0) scaleY(1); }
                  25% { transform: translate3d(-12.5%, -8px, 0) scaleY(1.2); }
                  50% { transform: translate3d(-25%, 6px, 0) scaleY(0.88); }
                  75% { transform: translate3d(-37.5%, -10px, 0) scaleY(1.25); }
                  100% { transform: translate3d(-50%, 0, 0) scaleY(1); }
                }

                @keyframes waveSurgeMid {
                  0% { transform: translate3d(-50%, 0, 0) scaleY(1.15); }
                  30% { transform: translate3d(-35%, 8px, 0) scaleY(0.85); }
                  70% { transform: translate3d(-15%, -12px, 0) scaleY(1.3); }
                  100% { transform: translate3d(0, 0, 0) scaleY(1.15); }
                }

                @keyframes waveSurgeRipple {
                  0% { transform: translate3d(0, 0, 0) scaleY(0.9); }
                  40% { transform: translate3d(-20%, -14px, 0) scaleY(1.35); }
                  80% { transform: translate3d(-40%, 7px, 0) scaleY(0.85); }
                  100% { transform: translate3d(-50%, 0, 0) scaleY(0.9); }
                }

                @keyframes waveSurgeSwell {
                  0% { transform: translate3d(-50%, 0, 0) scaleY(1); }
                  50% { transform: translate3d(-25%, -10px, 0) scaleY(1.25); }
                  100% { transform: translate3d(0, 0, 0) scaleY(1); }
                }

                @keyframes waveSurgeFront {
                  0% { transform: translate3d(0, 0, 0) scaleY(1); }
                  35% { transform: translate3d(-17.5%, -9px, 0) scaleY(1.22); }
                  70% { transform: translate3d(-35%, 6px, 0) scaleY(0.9); }
                  100% { transform: translate3d(-50%, 0, 0) scaleY(1); }
                }

                .water-bubble-1 { animation: waterBubbleRise1 5.5s ease-in-out infinite; }
                .water-bubble-2 { animation: waterBubbleRise2 7.5s ease-in-out infinite 1.2s; }
                .water-bubble-3 { animation: waterBubbleRise3 6.0s ease-in-out infinite 0.6s; }
                .water-bubble-4 { animation: waterBubbleRise4 8.2s ease-in-out infinite 2.0s; }
                .water-bubble-5 { animation: waterBubbleRise5 6.8s ease-in-out infinite 3.1s; }

                .water-wave-layer-1 { animation: waveSurgeDeep 20s ease-in-out infinite; }
                .water-wave-layer-2 { animation: waveSurgeMid 15s ease-in-out infinite; }
                .water-wave-layer-3 { animation: waveSurgeRipple 12s ease-in-out infinite; }
                .water-wave-layer-4 { animation: waveSurgeSwell 9s ease-in-out infinite; }
                .water-wave-layer-5 { animation: waveSurgeFront 8s ease-in-out infinite; }
                .water-wave-layer-crest { animation: waveSurgeFront 8s ease-in-out infinite; }
              `}</style>

              <div className="water-bubble-1 absolute bottom-0 w-2.5 h-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_8px_#38bdf8] border border-white/60" />
              <div className="water-bubble-2 absolute bottom-0 w-3.5 h-3.5 rounded-full bg-sky-200/70 shadow-[0_0_10px_#7dd3fc] border border-cyan-100" />
              <div className="water-bubble-3 absolute bottom-0 w-2 h-2 rounded-full bg-blue-300/75 shadow-[0_0_6px_#60a5fa]" />
              <div className="water-bubble-4 absolute bottom-0 w-4 h-4 rounded-full bg-cyan-200/60 shadow-[0_0_12px_#38bdf8] border border-white/80" />
              <div className="water-bubble-5 absolute bottom-0 w-2.5 h-2.5 rounded-full bg-sky-300/80 shadow-[0_0_8px_#0ea5e9]" />
            </div>

            {/* SVG Wave Canvas with 5 Layers */}
            <div className="relative w-full h-full">
              <svg
                className="absolute bottom-0 left-0 w-[200%] h-full block"
                viewBox="0 0 2880 150"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="deepOceanGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.65" />
                    <stop offset="60%" stopColor="#0369a1" stopOpacity="0.85" />
                    <stop
                      offset="100%"
                      stopColor="#075985"
                      stopOpacity="0.95"
                    />
                  </linearGradient>

                  <linearGradient
                    id="midAquaGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7" />
                    <stop
                      offset="100%"
                      stopColor="#0369a1"
                      stopOpacity="0.85"
                    />
                  </linearGradient>

                  <linearGradient
                    id="softSkyGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.5" />
                    <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient
                    id="translucentWaveGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.6" />
                    <stop
                      offset="100%"
                      stopColor="#38bdf8"
                      stopOpacity="0.75"
                    />
                  </linearGradient>

                  <linearGradient
                    id="frontWaterGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#dbeafe" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#FAF8F5" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient
                    id="waterCrestGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                    <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                <path
                  className="water-wave-layer-1"
                  fill="url(#deepOceanGrad)"
                  d="M 0,60 C 260,110 520,10 780,65 C 1040,115 1240,20 1440,60 C 1700,110 1960,10 2220,65 C 2480,115 2680,20 2880,60 L 2880,150 L 0,150 Z"
                />

                <path
                  className="water-wave-layer-2"
                  fill="url(#midAquaGrad)"
                  d="M 0,45 C 300,105 600,-5 900,55 C 1150,110 1320,15 1440,45 C 1740,105 2040,-5 2340,55 C 2590,110 2760,15 2880,45 L 2880,150 L 0,150 Z"
                />

                <path
                  className="water-wave-layer-3"
                  fill="url(#softSkyGrad)"
                  d="M 0,52 C 240,8 480,95 720,40 C 980,-2 1220,90 1440,52 C 1680,8 1920,95 2160,40 C 2420,-2 2660,90 2880,52 L 2880,150 L 0,150 Z"
                />

                <path
                  className="water-wave-layer-4"
                  fill="url(#translucentWaveGrad)"
                  d="M 0,35 C 320,90 640,-10 960,48 C 1200,98 1350,10 1440,35 C 1760,90 2080,-10 2400,48 C 2640,98 2790,10 2880,35 L 2880,150 L 0,150 Z"
                />

                <path
                  className="water-wave-layer-5"
                  fill="url(#frontWaterGrad)"
                  d="M 0,42 C 280,0 560,92 860,32 C 1120,-8 1320,78 1440,42 C 1720,0 2000,92 2300,32 C 2560,-8 2760,78 2880,42 L 2880,150 L 0,150 Z"
                />

                <path
                  className="water-wave-layer-crest"
                  fill="none"
                  stroke="url(#waterCrestGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M 0,42 C 280,0 560,92 860,32 C 1120,-8 1320,78 1440,42 C 1720,0 2000,92 2300,32 C 2560,-8 2760,78 2880,42"
                />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* 2. IMPORTANT AGENCY INFORMATION (একটু জেনে নিন...) */}
      {config.showImportantInfoSection !== false && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-2">
          <div className="text-center mb-5">
            <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
              {isBn
                ? config.importantTaglineBn || "Important Guidance"
                : config.importantTaglineEn || "Important Guidance"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
              {isBn
                ? config.importantTitleBn || "একটু জেনে নিন..."
                : config.importantTitleEn || "Key Information for Pilgrims"}
            </h2>
          </div>

          <div className="relative bg-gradient-to-br from-rose-50/80 via-[#FAF4EC] to-emerald-50/80 p-6 sm:p-10 rounded-3xl border border-rose-200/80 shadow-md overflow-hidden text-slate-800 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-medium">
              {isBn
                ? config.importantDescBn ||
                  "যাঁরা পবিত্র উমরাহ্ ও হজ্ব পালন করতে চান, আমরা সরাসরি বাংলাদেশ সরকার ও সৌদি আরব ধর্ম মন্ত্রণালয়ের নিয়ম মেনে স্বচ্ছতার সাথে সেবা প্রদান করি। বিশেষত ঢাকা, কুমিল্লা, সিলেট ও চট্টগ্রামসহ সারা দেশের সম্মানিত হাজীদের এয়ার টিকিট, ভিসা প্রসেসিং এবং হারামের নিকটবর্তী থ্রি-স্টার / ফাইভ-স্টার হোটেল সুবিধা নিশ্চিত করা হয়।"
                : config.importantDescEn ||
                  "For pilgrims intending to perform Holy Umrah or Hajj, we strictly adhere to the guidelines of the Ministry of Religious Affairs Bangladesh and Saudi Arabia. We ensure seamless air tickets, visa processing, and guaranteed 3-star/5-star hotels near Haram."}
            </p>

            <div className="bg-white/90 p-4.5 rounded-2xl border border-rose-200/60 space-y-2 text-xs font-semibold text-slate-800 shadow-2xs">
              <p className="font-bold text-[#0D472B] text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {isBn
                    ? config.importantBoxTitleBn ||
                      "গুরত্বপূর্ণ যে বিষয়গুলো খেয়াল রাখবেন:"
                    : config.importantBoxTitleEn || "Key Prerequisites:"}
                </span>
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-1">
                {(isBn
                  ? config.importantBoxPointsBn &&
                    config.importantBoxPointsBn.length > 0
                    ? config.importantBoxPointsBn
                    : initialHomePageConfig.importantBoxPointsBn
                  : config.importantBoxPointsEn &&
                      config.importantBoxPointsEn.length > 0
                    ? config.importantBoxPointsEn
                    : initialHomePageConfig.importantBoxPointsEn
                ).map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 opacity-70">
                <div className="w-4 h-4 rotate-45 border-2 border-rose-400 bg-rose-200/50" />
                <div className="w-4 h-4 rotate-45 border-2 border-[#D4AF37] bg-amber-200/50 -ml-1.5" />
                <div className="w-4 h-4 rotate-45 border-2 border-emerald-500 bg-emerald-200/50 -ml-1.5" />
              </div>

              <button
                onClick={() =>
                  onOpenBookingModal(
                    isBn ? "হজ্ব ও উমরাহ্ সেবা" : "Hajj & Umrah Service",
                    isBn
                      ? "পবিত্র উমরাহ্ ও হজ্ব সরাসরি পরামর্শ ও বুকিং তথ্য"
                      : "Holy Umrah & Hajj Direct Booking & Guidance",
                  )
                }
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold px-7 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                <span>
                  {isBn
                    ? config.importantBtnTextBn ||
                      "বিস্তারিত জানতে যোগাযোগ করুন"
                    : config.importantBtnTextEn || "Contact for More Details"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="hidden sm:block w-10" />
            </div>
          </div>
        </section>
      )}

      {/* 3. MAJOR SERVICES (৪ টি প্রধান সার্ভিস) */}
      {config.showServicesSection !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-extrabold text-[#B38712] uppercase tracking-wider block font-sans">
              {isBn
                ? config.servicesTaglineBn || "Our Core Services"
                : config.servicesTaglineEn || "Our Core Services"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
              {isBn
                ? config.servicesTitleBn || "আমাদের প্রধান সেবাসমূহ"
                : config.servicesTitleEn || "Our Major Services"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(config.servicesList && config.servicesList.length > 0
              ? config.servicesList
              : initialHomePageConfig.servicesList
            ).map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl border border-emerald-200 shadow-2xs group-hover:bg-[#0D472B] group-hover:text-white transition-colors">
                    {srv.emoji || "🕋"}
                  </div>
                  <h3 className="text-lg font-bold text-[#0D472B]">
                    {isBn ? srv.titleBn : srv.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isBn ? srv.descBn : srv.descEn}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate(srv.pageId || "umrah")}
                  className="mt-6 w-full bg-[#FAF8F5] group-hover:bg-[#0D472B] text-[#0D472B] group-hover:text-white py-2.5 rounded-full text-xs font-bold transition-all border border-emerald-200 flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>
                    {isBn
                      ? srv.btnTextBn || "বিস্তারিত দেখুন"
                      : srv.btnTextEn || "View Details"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. FEATURED UMRAH & HAJJ PACKAGES SHOWCASE */}
      {config.showFeaturedPackagesSection !== false && (
        <section className="bg-emerald-950/5 py-12 border-y border-emerald-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
                  {isBn
                    ? config.featuredTaglineBn || "Featured Packages"
                    : config.featuredTaglineEn || "Featured Packages"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0D472B]">
                  {isBn
                    ? config.featuredTitleBn ||
                      "আমাদের বিশেষ আকর্ষণীয় প্যাকেজসমূহ"
                    : config.featuredTitleEn ||
                      "Featured Umrah & Hajj Packages"}
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-slate-200 shadow-2xs text-xs font-bold">
                <button
                  onClick={() => setPackageCategory("all")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    packageCategory === "all"
                      ? "bg-[#0D472B] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isBn
                    ? config.featuredFilterAllBn || "সব"
                    : config.featuredFilterAllEn || "All"}
                </button>
                <button
                  onClick={() => setPackageCategory("umrah")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    packageCategory === "umrah"
                      ? "bg-[#0D472B] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isBn
                    ? config.featuredFilterUmrahBn || "উমরাহ্"
                    : config.featuredFilterUmrahEn || "Umrah"}
                </button>
                <button
                  onClick={() => setPackageCategory("hajj")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    packageCategory === "hajj"
                      ? "bg-[#0D472B] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isBn
                    ? config.featuredFilterHajjBn || "হজ্ব"
                    : config.featuredFilterHajjEn || "Hajj"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageCategory === "hajj" ? (
                (hajjPackages && hajjPackages.length > 0
                  ? hajjPackages
                  : hajjPackage
                    ? [hajjPackage]
                    : []
                ).map((pkg) => {
                  const adapted = adaptHajjPackage(pkg);
                  return (
                    <PackageCard
                      key={pkg.id}
                      lang={lang}
                      pkg={adapted}
                      onViewDetails={(item) => setSelectedDetailPackage(item)}
                    />
                  );
                })
              ) : packageCategory === "umrah" ? (
                umrahPackages.slice(0, 3).map((pkg) => {
                  const adapted = adaptUmrahPackage(pkg);
                  return (
                    <PackageCard
                      key={pkg.id}
                      lang={lang}
                      pkg={adapted}
                      onViewDetails={(item) => setSelectedDetailPackage(item)}
                    />
                  );
                })
              ) : (
                <>
                  {umrahPackages.slice(0, 2).map((pkg) => {
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
                  {(hajjPackages && hajjPackages.length > 0
                    ? hajjPackages.slice(0, 1)
                    : hajjPackage
                      ? [hajjPackage]
                      : []
                  ).map((pkg) => {
                    const adapted = adaptHajjPackage(pkg);
                    return (
                      <PackageCard
                        key={pkg.id}
                        lang={lang}
                        pkg={adapted}
                        onViewDetails={(item) => setSelectedDetailPackage(item)}
                      />
                    );
                  })}
                </>
              )}
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => onNavigate("umrah")}
                className="inline-flex items-center gap-2 bg-white text-[#0D472B] border-2 border-[#0D472B] hover:bg-[#0D472B] hover:text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <span>
                  {isBn
                    ? config.featuredExploreBtnBn || "সকল প্যাকেজ একসাথে দেখুন"
                    : config.featuredExploreBtnEn ||
                      "Explore All Travel Packages"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. ACCORDION FAQ & GUIDES ("আরও দেখুন") */}
      {config.showAccordionSection !== false && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-slate-100 via-emerald-50/80 to-slate-100 px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-black text-[#0D472B]">
                {isBn
                  ? config.accordionTitleBn ||
                    "আরও দেখুন & প্রয়োজনীয় নির্দেশিকা"
                  : config.accordionTitleEn ||
                    "Explore More Guides & Instructions"}
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {(config.accordionItems && config.accordionItems.length > 0
                ? config.accordionItems
                : initialHomePageConfig.accordionItems
              ).map((item, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div key={item.id || idx} className="transition-colors">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <span className="text-sm font-bold text-slate-800">
                        {isBn ? item.titleBn : item.titleEn}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-90 text-[#0D472B]" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-emerald-50/30 border-t border-emerald-100/50">
                        {isBn ? item.contentBn : item.contentEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. OUR DISTINCTIVE FEATURES (আমাদের বৈশিষ্ঠ্য) */}
      {config.showFeaturesSection !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#0D472B] via-[#083620] to-[#03180D] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-sans">
                {isBn
                  ? config.featuresTitleBn || "আমাদের বিশেষ বৈশিষ্ট্যসমূহ"
                  : config.featuresTitleEn || "Our Distinctive Features"}
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(isBn
                ? config.featuresListBn && config.featuresListBn.length > 0
                  ? config.featuresListBn
                  : initialHomePageConfig.featuresListBn
                : config.featuresListEn && config.featuresListEn.length > 0
                  ? config.featuresListEn
                  : initialHomePageConfig.featuresListEn
              ).map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md p-4.5 rounded-2xl border border-white/15 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-bold leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. GOVERNMENT ACCREDITATIONS & LICENSES */}
      {config.showAccreditationsSection !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#B38712] uppercase tracking-wider block font-sans">
                {isBn
                  ? config.accreditationsTaglineBn ||
                    "Govt. Approved & Licensed Agency"
                  : config.accreditationsTaglineEn ||
                    "Govt. Approved & Licensed Agency"}
              </span>
              <h3 className="text-xl font-black text-[#0D472B]">
                {isBn
                  ? config.accreditationsTitleBn ||
                    "আমাদের সরকারি স্বীকৃতি ও আইএটিএ সদস্যপদ"
                  : config.accreditationsTitleEn ||
                    "Our Government Approvals & Licenses"}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {(config.accreditationsList &&
              config.accreditationsList.length > 0
                ? config.accreditationsList
                : initialHomePageConfig.accreditationsList
              ).map((acc) => (
                <div
                  key={acc.id}
                  className="p-4.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1"
                >
                  {renderAccreditationIcon(acc.iconName)}
                  <p className="text-xs font-bold text-[#0D472B]">
                    {isBn ? acc.titleBn : acc.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-600 font-sans font-semibold">
                    {isBn ? acc.subBn : acc.subEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. DIRECT CONTACT BANNER */}
      {config.showContactBannerSection !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#052917] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black font-sans">
                {isBn
                  ? config.contactBannerTitleBn ||
                    "যেকোনো জিজ্ঞাসায় সরাসরি আমাদের হটলাইনে যোগাযোগ করুন"
                  : config.contactBannerTitleEn ||
                    "Call Us Directly for Any Flight or Package Query"}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                {isBn
                  ? config.contactBannerSubtitleBn ||
                    "প্রধান অফিস: পশ্চিম পান্থপথ জামে-মসজিদের বিপরীত পাশে, ঢাকা-১২১৫"
                  : config.contactBannerSubtitleEn ||
                    "Panthapath Main Office, Dhaka-1215"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${config.contactBannerHotline || agencyInfo.hotline}`}
                className="bg-[#D4AF37] text-emerald-950 px-7 py-3.5 rounded-full font-extrabold text-base sm:text-lg shadow-md hover:bg-[#C59B27] transition-all flex items-center gap-2.5"
              >
                <Phone className="w-5 h-5 text-emerald-950 shrink-0" />
                <span>
                  {isBn
                    ? toBengaliDigits(
                        config.contactBannerHotline || agencyInfo.hotline,
                      )
                    : config.contactBannerHotline || agencyInfo.hotline}
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-900 font-bengali">
                  (
                  {isBn
                    ? config.contactBannerHotlineLabelBn || "হোয়াটসঅ্যাপ & ইমো"
                    : config.contactBannerHotlineLabelEn || "WhatsApp & Imo"}
                  )
                </span>
              </a>

              <button
                onClick={() => onNavigate("contact")}
                className="bg-emerald-900 border border-emerald-700 text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-emerald-800 transition-all cursor-pointer"
              >
                {isBn
                  ? config.contactBannerCtaBtnBn ||
                    getTranslation(lang, "contactCTA")
                  : config.contactBannerCtaBtnEn || "Contact Us"}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
