import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Compass, 
  Moon, 
  Phone, 
  Menu, 
  X, 
  Plane, 
  Image as ImageIcon, 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { Language, PageId, AgencyInfo } from '../types';
import { getTranslation } from '../data/translations';

interface MobileBottomNavProps {
  lang: Language;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  agencyInfo: AgencyInfo;
  onOpenBookingModal: (service?: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  activePage,
  onNavigate,
  agencyInfo,
  onOpenBookingModal,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleItemClick = (pageId: PageId) => {
    onNavigate(pageId);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${agencyInfo.whatsappNumber}?text=${encodeURIComponent(
    lang === 'bn' 
      ? 'আসসালামু আলাইকুম, ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস এর সেবা সম্পর্কে জানতে চাই।'
      : 'Assalamu Alaikum, I would like to inquire about World Heritage Tours & Travels packages.'
  )}`;

  // All menu sections for the expanded bottom drawer
  const allSections: { id: PageId; labelBn: string; labelEn: string; icon: any; badge?: string; descBn: string; descEn: string }[] = [
    { 
      id: 'home', 
      labelBn: 'হোম পেজ', 
      labelEn: 'Home', 
      icon: Home, 
      descBn: 'প্রধান পৃষ্ঠা ও সংক্ষিপ্ত বিবরণ', 
      descEn: 'Main overview & hero' 
    },
    { 
      id: 'umrah', 
      labelBn: 'উমরাহ্ প্যাকেজসমূহ', 
      labelEn: 'Umrah Packages', 
      icon: Moon, 
      badge: 'জনপ্রিয়',
      descBn: 'সাশ্রয়ী ও ভিআইপি উমরাহ্ অফার', 
      descEn: 'Budget & VIP luxury Umrah' 
    },
    { 
      id: 'hajj', 
      labelBn: 'পবিত্র হজ্ব ২০২৭', 
      labelEn: 'Holy Hajj 2027', 
      icon: Sparkles, 
      badge: 'নিবন্ধন চলছে',
      descBn: 'সরকারি প্রাক-নিবন্ধন মাত্র ৩০,০০০৳', 
      descEn: 'Govt. pre-registration' 
    },
    { 
      id: 'air-tickets', 
      labelBn: 'এয়ার টিকিট বুকিং', 
      labelEn: 'Air Tickets', 
      icon: Plane, 
      descBn: 'অভ্যন্তরীণ ও আন্তর্জাতিক ফ্লাইট', 
      descEn: 'Domestic & International flights' 
    },
    { 
      id: 'tours-visas', 
      labelBn: 'ট্যুর ও ভিসা প্রসেসিং', 
      labelEn: 'Tours & Visas', 
      icon: Compass, 
      descBn: 'সৌদি, দুবাই, থাইল্যান্ড ভিসা', 
      descEn: 'Saudi, Dubai, worldwide visas' 
    },
    { 
      id: 'gallery', 
      labelBn: 'ফটো গ্যালারি', 
      labelEn: 'Photo Gallery', 
      icon: ImageIcon, 
      descBn: 'হজ্ব ও উমরাহ্ কাফেলার স্মৃতি', 
      descEn: 'Pilgrim memories & album' 
    },
    { 
      id: 'blog', 
      labelBn: 'ভ্রমণ নির্দেশিকা ও ব্লগ', 
      labelEn: 'Travel Blog', 
      icon: BookOpen, 
      descBn: 'উমরাহ্ ও হজ্ব্বের নিয়মাবলী', 
      descEn: 'Guides & Islamic tips' 
    },
    { 
      id: 'reviews', 
      labelBn: 'গ্রাহক রিভিউ', 
      labelEn: 'Client Reviews', 
      icon: Users, 
      descBn: 'হাজীদের মতামত ও অভিজ্ঞতা', 
      descEn: 'Pilgrim experiences' 
    },
    { 
      id: 'contact', 
      labelBn: 'অফিস ঠিকানা ও যোগাযোগ', 
      labelEn: 'Office & Contact', 
      icon: MapPin, 
      descBn: 'পান্থপথ অফিস, ফোন ও ম্যাপ', 
      descEn: 'Panthapath office & map' 
    },
  ];

  return (
    <>
      {/* 1. Fixed Bottom Navigation Bar (Visible on Mobile & Tablet: < lg) */}
      <nav 
        aria-label="Mobile Navigation" 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#052917]/95 backdrop-blur-xl border-t border-[#D4AF37]/50 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-1 py-1 pb-safe"
      >
        <div className="max-w-lg mx-auto grid grid-cols-6 items-center gap-0.5">
          
          {/* 1. হোম (Home) */}
          <button
            onClick={() => handleItemClick('home')}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
              activePage === 'home'
                ? 'bg-[#D4AF37]/25 text-[#F3E0A0] font-black shadow-inner border border-[#D4AF37]/50'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            <div className={`p-0.5 rounded-lg transition-transform ${activePage === 'home' ? 'scale-110 text-[#D4AF37]' : ''}`}>
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </span>
          </button>

          {/* 2. উমরাহ্ (Umrah Packages Dedicated Page) */}
          <button
            onClick={() => handleItemClick('umrah')}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
              activePage === 'umrah'
                ? 'bg-[#D4AF37]/25 text-[#F3E0A0] font-black shadow-inner border border-[#D4AF37]/50'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            <div className={`p-0.5 rounded-lg transition-transform ${activePage === 'umrah' ? 'scale-110 text-[#D4AF37]' : ''}`}>
              <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'উমরাহ্' : 'Umrah'}
            </span>
          </button>

          {/* 3. পবিত্র হজ্ব (Holy Hajj Dedicated Page) */}
          <button
            onClick={() => handleItemClick('hajj')}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
              activePage === 'hajj'
                ? 'bg-[#D4AF37]/25 text-[#F3E0A0] font-black shadow-inner border border-[#D4AF37]/50'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            <div className={`p-0.5 rounded-lg transition-transform ${activePage === 'hajj' ? 'scale-110 text-[#D4AF37]' : ''}`}>
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'হজ্ব' : 'Hajj'}
            </span>
          </button>

          {/* 4. প্যাকেজ ও ট্যুর (Packages / Tours) */}
          <button
            onClick={() => handleItemClick('tours-visas')}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer relative ${
              activePage === 'tours-visas'
                ? 'bg-[#D4AF37]/25 text-[#F3E0A0] font-black shadow-inner border border-[#D4AF37]/50'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            <div className={`p-0.5 rounded-lg transition-transform ${activePage === 'tours-visas' ? 'scale-110 text-[#D4AF37]' : ''}`}>
              <Compass className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'প্যাকেজ' : 'Packages'}
            </span>
          </button>

          {/* 5. কল / হেল্পলাইন (Direct Phone Call) */}
          <a
            href={`tel:${agencyInfo.hotline}`}
            className="flex flex-col items-center justify-center py-1 px-0.5 rounded-xl text-emerald-100/80 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Call Helpline"
          >
            <div className="p-0.5 rounded-lg text-emerald-300">
              <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'কল' : 'Call'}
            </span>
          </a>

          {/* 6. মেনু / অফিস (Full Drawer Trigger) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer ${
              drawerOpen || activePage === 'contact'
                ? 'bg-[#D4AF37]/25 text-[#F3E0A0] font-black border border-[#D4AF37]/50 shadow-inner'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            <div className={`p-0.5 rounded-lg transition-transform ${drawerOpen ? 'scale-110 text-[#D4AF37]' : ''}`}>
              <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {lang === 'bn' ? 'মেনু' : 'Menu'}
            </span>
          </button>

        </div>
      </nav>

      {/* 2. Expanded Bottom Sheet / Drawer for All Menu Sections */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Bottom Sheet Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-h-[85vh] bg-[#02180D] border-t-2 border-[#D4AF37] rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
            >
              {/* Sheet Drag Handle & Header */}
              <div className="p-4 bg-gradient-to-r from-[#052917] via-[#083820] to-[#052917] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B38712] flex items-center justify-center text-emerald-950 font-black shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">
                      {lang === 'bn' ? 'সকল সেবা ও সেকশনসমূহ' : 'All Services & Sections'}
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-medium">
                      {lang === 'bn' ? 'ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস' : 'World Heritage Tours & Travels'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sheet Body - All Sections Grid & List */}
              <div className="p-4 overflow-y-auto space-y-3 flex-1 divide-y divide-emerald-900/50">
                
                {/* 2-Column Grid of Main Pages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
                  {allSections.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#D4AF37] text-emerald-950 border-[#FFF0A0] shadow-lg font-bold'
                            : 'bg-white/5 hover:bg-white/10 text-white border-emerald-800/40'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive 
                            ? 'bg-emerald-950 text-[#D4AF37]' 
                            : 'bg-emerald-950/80 text-[#D4AF37] border border-[#D4AF37]/30'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm font-extrabold truncate ${isActive ? 'text-emerald-950' : 'text-white'}`}>
                              {lang === 'bn' ? item.labelBn : item.labelEn}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-emerald-900 font-medium' : 'text-emerald-200/70'}`}>
                            {lang === 'bn' ? item.descBn : item.descEn}
                          </p>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-950' : 'text-[#D4AF37]'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Quick Contact & Action Buttons */}
                <div className="pt-3 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Direct Call */}
                    <a
                      href={`tel:${agencyInfo.hotline}`}
                      className="flex items-center justify-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-white py-2.5 px-3 rounded-xl font-bold text-xs border border-[#D4AF37]/60 shadow-md transition-all active:scale-95"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>{lang === 'bn' ? 'সরাসরি কল' : 'Call Now'}</span>
                    </a>

                    {/* Direct WhatsApp */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
                    </a>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenBookingModal();
                    }}
                    className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38712] text-emerald-950 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg border border-[#FFF0A0] cursor-pointer active:scale-95 transition-transform"
                  >
                    <span>{lang === 'bn' ? 'অনলাইন হজ্ব ও উমরাহ্ বুকিং করুন' : 'Book Hajj & Umrah Online'}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-950" />
                  </button>

                  {/* Office Info card */}
                  <div className="bg-black/40 p-3 rounded-xl border border-emerald-800/50 text-xs text-emerald-100 space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-tight text-emerald-200 font-medium">
                        {lang === 'bn' ? agencyInfo.addressBn : agencyInfo.addressEn}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
