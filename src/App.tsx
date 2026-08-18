import React, { useState, useEffect, useCallback } from "react";
import {
  Language,
  PageId,
  UmrahPackage,
  HajjPackage,
  TourPackage,
  Review,
  BlogPost,
  GalleryItem,
  BookingInquiry,
  AgencyInfo,
  HomePageConfig,
} from "./types";
import {
  initialAgencyInfo,
  initialUmrahPackages,
  initialHajjPackage,
  initialHajjPackages,
  initialTourPackages,
  initialReviews,
  initialBlogPosts,
  initialGalleryItems,
} from "./data/initialData";
import { initialHomePageConfig } from "./data/initialHomePageData";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { FloatingActions } from "./components/FloatingActions";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { BookingModal } from "./components/BookingModal";
import { LightboxModal } from "./components/LightboxModal";
import { IslamicPreloader } from "./components/IslamicPreloader";
import { SecurityGuard } from "./components/SecurityGuard";

// Pages
import { HomePage } from "./pages/HomePage";
import { UmrahPage } from "./pages/UmrahPage";
import { HajjPage } from "./pages/HajjPage";
import { AirTicketsPage } from "./pages/AirTicketsPage";
import { ToursVisasPage } from "./pages/ToursVisasPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { useSeoMetadata } from "./utils/useSeoMetadata";
import {
  subscribeUmrahPackages,
  subscribeHajjPackages,
  subscribeTourPackages,
  subscribeBlogPosts,
  subscribeGalleryItems,
  subscribeReviews,
  subscribeInquiries,
  subscribeSiteSettings,
  subscribeHomePageConfig,
  saveHomePageConfig,
  createBookingInquiry,
  deleteUmrahPackage,
  deleteHajjPackage,
  deleteTourPackage,
  deleteBlogPost,
  deleteGalleryItem,
  deleteReview,
  deleteInquiry,
  saveUmrahPackage,
  saveHajjPackage,
  saveTourPackage,
  saveBlogPost,
  saveGalleryItem,
  saveReview,
  markDocAsDeleted,
  isDocDeleted,
  SiteSettingsData,
} from "./services/firestoreService";

export default function App() {
  // 1. Language State (Default: Bangla 'bn')
  const [lang, setLang] = useState<Language>(() => {
    try {
      return (localStorage.getItem("wh_lang") as Language) || "bn";
    } catch {
      return "bn";
    }
  });

  // 2. Active Page State
  const [activePage, setActivePage] = useState<PageId>("home");

  // Dynamic SEO Metadata hook for page titles and meta description updates
  useSeoMetadata(activePage, lang);

  // 3. Persistent Data States
  const [agencyInfo, setAgencyInfo] = useState<AgencyInfo>(() => {
    try {
      const saved = localStorage.getItem("wh_agency_info");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.nameBn = initialAgencyInfo.nameBn;
        parsed.facebookUrl = initialAgencyInfo.facebookUrl;
        return parsed;
      }
      return initialAgencyInfo;
    } catch {
      return initialAgencyInfo;
    }
  });

  // Ensure nameBn and facebookUrl are always updated from initialAgencyInfo
  useEffect(() => {
    if (
      agencyInfo.nameBn !== initialAgencyInfo.nameBn ||
      agencyInfo.facebookUrl !== initialAgencyInfo.facebookUrl
    ) {
      const updated = {
        ...agencyInfo,
        nameBn: initialAgencyInfo.nameBn,
        facebookUrl: initialAgencyInfo.facebookUrl,
      };
      setAgencyInfo(updated);
      try {
        localStorage.setItem("wh_agency_info", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }, [agencyInfo]);

  const [umrahPackages, setUmrahPackages] = useState<UmrahPackage[]>(() => {
    try {
      const saved = localStorage.getItem("wh_umrah_packages");
      const list: UmrahPackage[] = saved
        ? JSON.parse(saved)
        : initialUmrahPackages;
      return list.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialUmrahPackages.filter((p) => !isDocDeleted(p.id));
    }
  });

  const [hajjPackages, setHajjPackages] = useState<HajjPackage[]>(() => {
    try {
      const saved = localStorage.getItem("wh_hajj_packages_2027_v8");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 1) {
          return parsed
            .filter((p: HajjPackage) => !isDocDeleted(p.id))
            .map((p: HajjPackage) => ({
              ...p,
              durationBn: p.durationBn || "৩০ থেকে ৩৫ দিন",
              durationEn: p.durationEn || "30 to 35 Days",
            }));
        }
      }
      return initialHajjPackages.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialHajjPackages.filter((p) => !isDocDeleted(p.id));
    }
  });

  const hajjPackage = hajjPackages[0] || initialHajjPackage;

  const [tourPackages, setTourPackages] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem("wh_tour_packages");
      const list: TourPackage[] = saved
        ? JSON.parse(saved)
        : initialTourPackages;
      return list.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialTourPackages.filter((p) => !isDocDeleted(p.id));
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem("wh_reviews");
      const list: Review[] = saved ? JSON.parse(saved) : initialReviews;
      return list.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialReviews.filter((p) => !isDocDeleted(p.id));
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem("wh_blog_posts");
      const list: BlogPost[] = saved ? JSON.parse(saved) : initialBlogPosts;
      return list.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialBlogPosts.filter((p) => !isDocDeleted(p.id));
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem("wh_gallery_v4");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasBroken = JSON.stringify(parsed).includes("wikimedia.org");
          if (!hasBroken)
            return parsed.filter((p: GalleryItem) => !isDocDeleted(p.id));
        }
      }
      return initialGalleryItems.filter((p) => !isDocDeleted(p.id));
    } catch {
      return initialGalleryItems.filter((p) => !isDocDeleted(p.id));
    }
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem("wh_inquiries");
      const list: BookingInquiry[] = saved ? JSON.parse(saved) : [];
      return list.filter((p) => !isDocDeleted(p.id));
    } catch {
      return [];
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(
    null,
  );

  const [homePageConfig, setHomePageConfig] = useState<HomePageConfig>(() => {
    try {
      const saved = localStorage.getItem("wh_homepage_config");
      if (saved) {
        return JSON.parse(saved);
      }
      return initialHomePageConfig;
    } catch {
      return initialHomePageConfig;
    }
  });

  // Firestore Realtime Subscriptions
  useEffect(() => {
    const unsubUmrah = subscribeUmrahPackages((pkgs) => {
      if (Array.isArray(pkgs)) setUmrahPackages(pkgs);
    });

    const unsubHajj = subscribeHajjPackages((pkgs) => {
      if (Array.isArray(pkgs)) setHajjPackages(pkgs);
    });

    const unsubTours = subscribeTourPackages((pkgs) => {
      if (Array.isArray(pkgs)) setTourPackages(pkgs);
    });

    const unsubBlogs = subscribeBlogPosts((posts) => {
      if (Array.isArray(posts)) setBlogPosts(posts);
    });

    const unsubGallery = subscribeGalleryItems((items) => {
      if (Array.isArray(items)) setGalleryItems(items);
    });

    const unsubReviews = subscribeReviews((revs) => {
      if (Array.isArray(revs)) setReviews(revs);
    });

    const unsubInquiries = subscribeInquiries((inqs) => {
      if (Array.isArray(inqs)) setInquiries(inqs);
    });

    const unsubSettings = subscribeSiteSettings((settings) => {
      if (settings) setSiteSettings(settings);
    });

    const unsubHomeConfig = subscribeHomePageConfig((cfg) => {
      if (cfg) setHomePageConfig(cfg);
    });

    return () => {
      unsubUmrah();
      unsubHajj();
      unsubTours();
      unsubBlogs();
      unsubGallery();
      unsubReviews();
      unsubInquiries();
      unsubSettings();
      unsubHomeConfig();
    };
  }, []);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState("Umrah");
  const [prefilledPackageTitle, setPrefilledPackageTitle] = useState("");
  const [activeLightboxItem, setActiveLightboxItem] =
    useState<GalleryItem | null>(null);

  // Sync states to localStorage
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem("wh_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("wh_agency_info", JSON.stringify(agencyInfo));
  }, [agencyInfo]);

  useEffect(() => {
    localStorage.setItem("wh_umrah_packages", JSON.stringify(umrahPackages));
  }, [umrahPackages]);

  useEffect(() => {
    localStorage.setItem(
      "wh_hajj_packages_2027_v8",
      JSON.stringify(hajjPackages),
    );
  }, [hajjPackages]);

  useEffect(() => {
    localStorage.setItem("wh_tour_packages", JSON.stringify(tourPackages));
  }, [tourPackages]);

  useEffect(() => {
    localStorage.setItem("wh_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem("wh_gallery_v4", JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem("wh_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("wh_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("wh_homepage_config", JSON.stringify(homePageConfig));
  }, [homePageConfig]);

  // Handlers
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
  };

  const handleOpenBookingModal = (
    service: string = "Umrah",
    packageTitle: string = "",
  ) => {
    setPrefilledService(service);
    setPrefilledPackageTitle(packageTitle);
    setBookingModalOpen(true);
  };

  const handleSaveInquiry = async (
    inquiryData: Omit<BookingInquiry, "id" | "createdAt" | "status">,
  ) => {
    try {
      await createBookingInquiry(inquiryData);
    } catch (e) {
      console.warn("Could not save inquiry to firestore, saving locally:", e);
      const newInquiry: BookingInquiry = {
        ...inquiryData,
        id: `inq-${Date.now()}`,
        createdAt: new Date().toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        status: "new",
      };
      setInquiries([newInquiry, ...inquiries]);
    }
  };

  const handleAddReview = (
    newRevData: Omit<Review, "id" | "date" | "verified">,
  ) => {
    const newRev: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      verified: true,
    };
    setReviews([newRev, ...reviews]);
  };

  // --- IMMEDIATE ACTION & DELETION HANDLERS FOR ADMIN ---
  const handleDeleteUmrah = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setUmrahPackages((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_umrah_packages", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteUmrahPackage(id);
  }, []);

  const handleDeleteHajj = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setHajjPackages((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(
          "wh_hajj_packages_2027_v8",
          JSON.stringify(updated),
        );
      } catch (e) {}
      return updated;
    });
    await deleteHajjPackage(id);
  }, []);

  const handleDeleteTour = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setTourPackages((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_tour_packages", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteTourPackage(id);
  }, []);

  const handleDeleteBlog = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setBlogPosts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_blog_posts", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteBlogPost(id);
  }, []);

  const handleDeleteGallery = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setGalleryItems((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_gallery_v4", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteGalleryItem(id);
  }, []);

  const handleDeleteReview = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setReviews((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_reviews", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteReview(id);
  }, []);

  const handleDeleteInquiry = useCallback(async (id: string) => {
    markDocAsDeleted(id);
    setInquiries((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("wh_inquiries", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    await deleteInquiry(id);
  }, []);

  const handleSaveUmrah = useCallback(async (pkg: UmrahPackage) => {
    const savedId = await saveUmrahPackage(pkg);
    const finalPkg = { ...pkg, id: savedId };
    setUmrahPackages((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalPkg : p))
        : [finalPkg, ...prev];
      try {
        localStorage.setItem("wh_umrah_packages", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveHajj = useCallback(async (pkg: HajjPackage) => {
    const savedId = await saveHajjPackage(pkg);
    const finalPkg = { ...pkg, id: savedId };
    setHajjPackages((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalPkg : p))
        : [finalPkg, ...prev];
      try {
        localStorage.setItem(
          "wh_hajj_packages_2027_v8",
          JSON.stringify(updated),
        );
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveTour = useCallback(async (pkg: TourPackage) => {
    const savedId = await saveTourPackage(pkg);
    const finalPkg = { ...pkg, id: savedId };
    setTourPackages((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalPkg : p))
        : [finalPkg, ...prev];
      try {
        localStorage.setItem("wh_tour_packages", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveBlog = useCallback(async (post: BlogPost) => {
    const savedId = await saveBlogPost(post);
    const finalPost = { ...post, id: savedId };
    setBlogPosts((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalPost : p))
        : [finalPost, ...prev];
      try {
        localStorage.setItem("wh_blog_posts", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveGallery = useCallback(async (item: GalleryItem) => {
    const savedId = await saveGalleryItem(item);
    const finalItem = { ...item, id: savedId };
    setGalleryItems((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalItem : p))
        : [finalItem, ...prev];
      try {
        localStorage.setItem("wh_gallery_v4", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveReview = useCallback(async (rev: Review) => {
    const savedId = await saveReview(rev);
    const finalRev = { ...rev, id: savedId };
    setReviews((prev) => {
      const exists = prev.some((p) => p.id === savedId);
      const updated = exists
        ? prev.map((p) => (p.id === savedId ? finalRev : p))
        : [finalRev, ...prev];
      try {
        localStorage.setItem("wh_reviews", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return savedId;
  }, []);

  const handleSaveHomePageConfig = useCallback(
    async (config: HomePageConfig) => {
      setHomePageConfig(config);
      try {
        localStorage.setItem("wh_homepage_config", JSON.stringify(config));
      } catch (e) {}
      try {
        await saveHomePageConfig(config);
      } catch (e) {
        console.warn("Could not save homepage config to firestore:", e);
      }
    },
    [],
  );

  // Render Page Content
  const renderActivePageContent = () => {
    switch (activePage) {
      case "home":
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            umrahPackages={umrahPackages}
            hajjPackage={hajjPackage}
            hajjPackages={hajjPackages}
            tourPackages={tourPackages}
            blogPosts={blogPosts}
            agencyInfo={agencyInfo}
            onOpenBookingModal={handleOpenBookingModal}
            homePageConfig={homePageConfig}
          />
        );
      case "umrah":
        return (
          <UmrahPage
            lang={lang}
            packages={umrahPackages}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case "hajj":
        return (
          <HajjPage
            lang={lang}
            hajjPackages={hajjPackages}
            hajjPackage={hajjPackage}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case "air-tickets":
        return (
          <AirTicketsPage
            lang={lang}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case "tours-visas":
        return (
          <ToursVisasPage
            lang={lang}
            tourPackages={tourPackages}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );
      case "gallery":
        return (
          <GalleryPage
            lang={lang}
            items={galleryItems}
            onOpenLightbox={(item) => setActiveLightboxItem(item)}
          />
        );
      case "reviews":
        return (
          <ReviewsPage
            lang={lang}
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        );
      case "blog":
        return <BlogPage lang={lang} posts={blogPosts} />;
      case "contact":
        return <ContactPage lang={lang} agencyInfo={agencyInfo} />;
      case "admin":
        return (
          <AdminPage
            lang={lang}
            agencyInfo={agencyInfo}
            umrahPackages={umrahPackages}
            hajjPackages={hajjPackages}
            tourPackages={tourPackages}
            blogPosts={blogPosts}
            galleryItems={galleryItems}
            reviews={reviews}
            inquiries={inquiries}
            siteSettings={siteSettings}
            homePageConfig={homePageConfig}
            onDeleteUmrah={handleDeleteUmrah}
            onDeleteHajj={handleDeleteHajj}
            onDeleteTour={handleDeleteTour}
            onDeleteBlog={handleDeleteBlog}
            onDeleteGallery={handleDeleteGallery}
            onDeleteReview={handleDeleteReview}
            onDeleteInquiry={handleDeleteInquiry}
            onSaveUmrah={handleSaveUmrah}
            onSaveHajj={handleSaveHajj}
            onSaveTour={handleSaveTour}
            onSaveBlog={handleSaveBlog}
            onSaveGallery={handleSaveGallery}
            onSaveReview={handleSaveReview}
            onSaveHomePageConfig={handleSaveHomePageConfig}
          />
        );
      default:
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            umrahPackages={umrahPackages}
            hajjPackage={hajjPackage}
            hajjPackages={hajjPackages}
            blogPosts={blogPosts}
            agencyInfo={agencyInfo}
            onOpenBookingModal={handleOpenBookingModal}
            homePageConfig={homePageConfig}
          />
        );
    }
  };

  return (
    <div
      className={`bg-[#FAF8F5] text-[#1A2E26] flex flex-col min-h-screen w-full max-w-full overflow-x-hidden pb-16 lg:pb-0 ${lang === "bn" ? "font-bengali" : "font-english"}`}
    >
      {/* Security & Content Protection Guard */}
      <SecurityGuard lang={lang} />

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
        agencyInfo={agencyInfo}
        onNavigate={handleNavigate}
        siteSettings={siteSettings}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
        agencyInfo={agencyInfo}
        onOpenBookingModal={() =>
          handleOpenBookingModal("General", "Quick Booking")
        }
        lang={lang}
      />
    </div>
  );
}
