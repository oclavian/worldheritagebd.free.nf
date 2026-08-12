import React, { useState, useEffect } from 'react';
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
import { IslamicPreloader } from './components/IslamicPreloader';

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
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.nameBn = initialAgencyInfo.nameBn;
        return parsed;
      }
      return initialAgencyInfo;
    } catch {
      return initialAgencyInfo;
    }
  });

  // Ensure nameBn is always updated from initialAgencyInfo
  useEffect(() => {
    if (agencyInfo.nameBn !== initialAgencyInfo.nameBn) {
      const updated = { ...agencyInfo, nameBn: initialAgencyInfo.nameBn };
      setAgencyInfo(updated);
      try {
        localStorage.setItem('wh_agency_info', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }, [agencyInfo]);

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
            blogPosts={blogPosts}
            agencyInfo={agencyInfo}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
    }
  };

  return (
    <div className={`bg-[#FAF8F5] text-[#1A2E26] flex flex-col min-h-screen w-full max-w-full overflow-x-hidden ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
      
      {/* Custom Islamic Preloader */}
      <IslamicPreloader lang={lang} />

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

    </div>
  );
}
