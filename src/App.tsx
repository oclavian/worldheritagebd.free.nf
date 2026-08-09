import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Code2, CheckCircle2, ExternalLink, Facebook, Sparkles } from 'lucide-react';
import { Language, PageId, UmrahPackage, HajjPackage, TourPackage, Review, BlogPost, GalleryItem, BookingInquiry, AgencyInfo } from './types';
import { 
  initialAgencyInfo, 
  initialUmrahPackages, 
  initialHajjPackage, 
  initialTourPackages, 
  initialReviews, 
  initialBlogPosts, 
  initialGalleryItems 
} from './data/initialData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { LightboxModal } from './components/LightboxModal';

// Pages
import { HomePage } from './pages/HomePage';
import { UmrahPage } from './pages/UmrahPage';
import { HajjPage } from './pages/HajjPage';
import { AirTicketsPage } from './pages/AirTicketsPage';
import { ToursVisasPage } from './pages/ToursVisasPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { useSeoMetadata } from './utils/useSeoMetadata';

export default function App() {
  // 1. Language State (Default: Bangla 'bn')
  const [lang, setLang] = useState<Language>(() => {
    try {
      return (localStorage.getItem('wh_lang') as Language) || 'bn';
    } catch {
      return 'bn';
    }
  });

  // 2. Active Page State
  const [activePage, setActivePage] = useState<PageId>('home');

  // Dynamic SEO Metadata hook for page titles and meta description updates
  useSeoMetadata(activePage, lang);

  // 3. Persistent Data States
  const [agencyInfo, setAgencyInfo] = useState<AgencyInfo>(() => {
    try {
      const saved = localStorage.getItem('wh_agency_info');
      return saved ? JSON.parse(saved) : initialAgencyInfo;
    } catch {
      return initialAgencyInfo;
    }
  });

  const [umrahPackages, setUmrahPackages] = useState<UmrahPackage[]>(() => {
    try {
      const saved = localStorage.getItem('wh_umrah_packages');
      return saved ? JSON.parse(saved) : initialUmrahPackages;
    } catch {
      return initialUmrahPackages;
    }
  });

  const [hajjPackage, setHajjPackage] = useState<HajjPackage>(() => {
    try {
      const saved = localStorage.getItem('wh_hajj_package');
      return saved ? JSON.parse(saved) : initialHajjPackage;
    } catch {
      return initialHajjPackage;
    }
  });

  const [tourPackages, setTourPackages] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem('wh_tour_packages');
      return saved ? JSON.parse(saved) : initialTourPackages;
    } catch {
      return initialTourPackages;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('wh_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('wh_blog_posts');
      return saved ? JSON.parse(saved) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('wh_gallery');
      return saved ? JSON.parse(saved) : initialGalleryItems;
    } catch {
      return initialGalleryItems;
    }
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('wh_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('Umrah');
  const [prefilledPackageTitle, setPrefilledPackageTitle] = useState('');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  // Secret Developer Modal (64725 key sequence trigger)
  const [devModalOpen, setDevModalOpen] = useState(false);

  useEffect(() => {
    let keyBuffer: string[] = [];
    const SECRET_CODE = '64725';

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        keyBuffer.push(e.key);
        if (keyBuffer.length > 5) {
          keyBuffer.shift();
        }
        if (keyBuffer.join('') === SECRET_CODE) {
          setDevModalOpen(true);
          keyBuffer = [];
        }
      } else if (e.key === 'Escape') {
        setDevModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync states to localStorage
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('wh_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('wh_agency_info', JSON.stringify(agencyInfo));
  }, [agencyInfo]);

  useEffect(() => {
    localStorage.setItem('wh_umrah_packages', JSON.stringify(umrahPackages));
  }, [umrahPackages]);

  useEffect(() => {
    localStorage.setItem('wh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('wh_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handlers
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
  };

  const handleOpenBookingModal = (service: string = 'Umrah', packageTitle: string = '') => {
    setPrefilledService(service);
    setPrefilledPackageTitle(packageTitle);
    setBookingModalOpen(true);
  };

  const handleSaveInquiry = (inquiryData: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'new',
    };
    setInquiries([newInquiry, ...inquiries]);
  };

  const handleUpdateInquiryStatus = (id: string, status: BookingInquiry['status']) => {
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  const handleAddUmrahPackage = (newPkg: UmrahPackage) => {
    setUmrahPackages([newPkg, ...umrahPackages]);
  };

  const handleDeleteUmrahPackage = (id: string) => {
    setUmrahPackages(umrahPackages.filter((p) => p.id !== id));
  };

  const handleAddReview = (newRevData: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newRev: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
    };
    setReviews([newRev, ...reviews]);
  };

  // Render Page Content
  const renderActivePageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            umrahPackages={umrahPackages}
            hajjPackage={hajjPackage}
            reviews={reviews}
            blogPosts={blogPosts}
            agencyInfo={agencyInfo}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'umrah':
        return (
          <UmrahPage
            lang={lang}
            packages={umrahPackages}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'hajj':
        return (
          <HajjPage
            lang={lang}
            hajjPackage={hajjPackage}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'air-tickets':
        return (
          <AirTicketsPage
            lang={lang}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'tours-visas':
        return (
          <ToursVisasPage
            lang={lang}
            tourPackages={tourPackages}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case 'gallery':
        return (
          <GalleryPage
            lang={lang}
            items={galleryItems}
            onOpenLightbox={(item) => setActiveLightboxItem(item)}
          />
        );
      case 'reviews':
        return (
          <ReviewsPage
            lang={lang}
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        );
      case 'blog':
        return (
          <BlogPage
            lang={lang}
            posts={blogPosts}
          />
        );
      case 'contact':
        return (
          <ContactPage
            lang={lang}
            agencyInfo={agencyInfo}
            onSaveInquiry={handleSaveInquiry}
          />
        );
      default:
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            umrahPackages={umrahPackages}
            hajjPackage={hajjPackage}
            reviews={reviews}
            blogPosts={blogPosts}
            agencyInfo={agencyInfo}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
    }
  };

  return (
    <div className="min-[#FAF8F5] text-[#1A2E26] flex flex-col min-h-screen font-bengali">
      
      {/* Top Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activePage={activePage}
        onNavigate={handleNavigate}
        agencyInfo={agencyInfo}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Main Container with 3D Book Page Turning Animation */}
      <main className="flex-grow w-full">
        <PageTransition currentPage={activePage}>
          {renderActivePageContent()}
        </PageTransition>
      </main>

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions lang={lang} agencyInfo={agencyInfo} />

      {/* Global Booking / Inquiry Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        lang={lang}
        prefilledService={prefilledService}
        prefilledPackageTitle={prefilledPackageTitle}
        onSaveInquiry={handleSaveInquiry}
      />

      {/* Global Gallery Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        activePage={activePage}
        onNavigate={handleNavigate}
        agencyInfo={agencyInfo}
      />

      {/* Secret Developer Modal (Triggered by keyboard code 64725) */}
      <AnimatePresence>
        {devModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden bg-gradient-to-b from-[#0B1E17] via-[#122A21] to-[#07140F] border border-emerald-500/40 rounded-3xl shadow-[0_0_80px_rgba(16,185,129,0.35)] text-white p-6 sm:p-8"
            >
              {/* Glowing Background Orbs */}
              <div className="absolute -top-20 -left-20 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setDevModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-emerald-300/70 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 rounded-full transition-colors border border-emerald-500/30"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Secret Code Header Badge */}
              <div className="flex items-center justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-inner">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-english tracking-widest uppercase">Hey Bro You ar The Lucky Person </span>
                </span>
              </div>

              {/* Developer Avatar & Info */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  {/* Animated outer ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-600 rounded-full blur opacity-80 animate-pulse" />
                  
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-emerald-400/90 shadow-2xl bg-emerald-950 flex items-center justify-center">
                    <img
                      src="/developer.jpg"
                      alt="Miraj Ahmed"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.tried) {
                          target.dataset.tried = '1';
                          target.src = 'https://scontent.fdac19-1.fna.fbcdn.net/v/t39.30808-6/739243171_122135743341016051_2765896838342755799_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x1535&ctp=s1536x1535&_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEZVnDr5wMXMWVQtDfLJJLVgy_TRfzy_xCDL9NF_PL_EDA7Pwcgd9N1qK8y1vstbL_OPAG4h2EstgFrbSch5USr&_nc_ohc=-X_EN8anBloQ7kNvwEpUiQZ&_nc_oc=AdpNqh2SKhUoXaTTzwLnUilzVIO4K7R_59n3K6qworjsFJvLTadxcHK0zF3KMbUJXGo&_nc_zt=23&_nc_ht=scontent.fdac19-1.fna&_nc_gid=aBx0PU-9Uzdhke5h2zvTsA&_nc_ss=7b2a8&oh=00_AQF_JwMKPFKI3AfXr4L777aNYtLYg4DRMxF0VbYHw9CxwQ&oe=6A7EA306?w=300&auto=format&fit=crop&q=80';
                        }
                      }}
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 p-1.5 bg-emerald-500 text-white rounded-full border-2 border-[#0B1E17] shadow-lg">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-english text-white flex items-center justify-center gap-2">
                  Miraj Ahmed
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                </h3>
                
                <p className="text-emerald-300/90 text-sm font-semibold mt-1 font-english">
                  Lead Web Application Developer
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs font-medium">
                  <span className="px-3 py-1 rounded-lg bg-emerald-900/50 text-emerald-200 border border-emerald-500/30">
                    Full-Stack Engineer
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-900/50 text-emerald-200 border border-emerald-500/30">
                    UI/UX Designer
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-900/50 text-emerald-200 border border-emerald-500/30">
                    React & Node.js
                  </span>
                </div>

                <div className="mt-6 pt-5 border-t border-emerald-500/25">
                  <p className="text-xs text-emerald-200/80 mb-4 font-bengali">
                    ওয়েবসাইট ডেভলপমেন্ট ও কারিগরি সহায়তার জন্য যোগাযোগ করুন
                  </p>

                  <a
                    href="https://www.facebook.com/mirajmun.fb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-[#1877F2] to-[#0052CC] hover:from-[#166FE5] hover:to-[#0047B3] transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Facebook className="w-5 h-5 fill-current" />
                    <span className="font-english font-bold text-base">Miraj Ahmed on Facebook</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </a>
                </div>

                <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400/60 font-mono tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>PROTECTED DEVELOPER CORE • ACCESS CODE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
