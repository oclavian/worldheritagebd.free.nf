import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.png';
import { Language } from '../types';

interface IslamicPreloaderProps {
  lang: Language;
  onFinished?: () => void;
}

export const IslamicPreloader: React.FC<IslamicPreloaderProps> = ({ lang, onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const totalDuration = 5000; // 5 seconds duration
    const intervalTime = 50; // Update state every 50ms
    const totalSteps = totalDuration / intervalTime; // 100 steps
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onFinished) onFinished();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="islamic-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-gradient-to-b from-[#041E12] via-[#09331E] to-[#02120A] text-white font-bengali overflow-hidden select-none"
        >
          {/* Subtle Islamic Geometric Pattern Background Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15L30 0zm0 30l15 15-15 15-15-15 15-15z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}
          />

          {/* Glowing Orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Central Card Wrapper */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto">
            
            {/* Arabic Bismillah Calligraphy Header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <span className="text-xl sm:text-2xl font-serif text-[#D4AF37] tracking-widest drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </motion.div>

            {/* Logo Container with Islamic Dome/Arch & Rotating Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative mb-6"
            >
              {/* Outer Rotating Golden Geometric Star Aura */}
              <div className="absolute -inset-4 rounded-full border border-[#D4AF37]/30 border-dashed animate-[spin_12s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border border-emerald-400/20 pointer-events-none" />

              {/* Glowing Ambient Halo */}
              <div className="absolute inset-0 bg-[#D4AF37]/25 rounded-full blur-xl animate-pulse" />

              {/* Main Logo Image Frame */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-b from-[#D4AF37] via-emerald-700 to-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#031A0F] p-2 flex items-center justify-center overflow-hidden border border-[#D4AF37]/40">
                  <img
                    src={logoImg}
                    alt="World Heritage Tours & Travels"
                    className="w-full h-full object-contain filter drop-shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.tried) {
                        target.dataset.tried = '1';
                        target.src = 'https://lh3.googleusercontent.com/d/1QKxKfanyW63oOZTZcJTozTiVwmusHwFC';
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-1 mb-7"
            >
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide font-bengali drop-shadow-md">
                {lang === 'bn' ? 'ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস' : 'WORLD HERITAGE TOURS & TRAVELS'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#D4AF37] font-bengali tracking-wide opacity-90">
                {lang === 'bn' 
                  ? 'বিশ্বস্ত ও নির্ভরযোগ্য হজ্জ, ওমরাহ্ এবং ভ্রমন সেবা' 
                  : 'Trusted & Reliable Hajj, Umrah & Travel Services'}
              </p>
            </motion.div>

            {/* Custom Islamic Gold Progress Bar */}
            <div className="w-64 sm:w-72 space-y-2">
              <div className="relative h-2.5 w-full bg-[#02180D] rounded-full p-0.5 border border-[#D4AF37]/40 overflow-hidden shadow-inner">
                {/* Glowing Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 via-[#D4AF37] to-amber-300 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
                </motion.div>
              </div>

              {/* Progress Percentage & Status Indicator */}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-200/90 px-1">
                <span className="font-bengali text-[11px] text-[#D4AF37]">
                  {progress < 100 
                    ? (lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...') 
                    : (lang === 'bn' ? 'স্বাগতম!' : 'Welcome!')}
                </span>
                <span className="text-[#D4AF37] text-xs">{progress}%</span>
              </div>
            </div>

            {/* Footer Islamic Crescent Icon & Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-2 text-[11px] text-emerald-300/70 font-bengali"
            >
              <svg className="w-3.5 h-3.5 fill-[#D4AF37]" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm-1.8 15.6a6.5 6.5 0 1 1 5.3-10.4 7.5 7.5 0 0 0-5.3 10.4z" />
              </svg>
              <span>
                {lang === 'bn' ? 'সুন্নাহ মোতাবেক নিরাপদ সফরের প্রতিশ্রুতি' : 'Committed to Safe Pilgrimage according to Sunnah'}
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
