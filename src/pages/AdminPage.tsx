import { compressImageUrl } from "../utils/imageCompressor";
import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Moon,
  Sparkles,
  BookOpen,
  Compass,
  Image as ImageIcon,
  Users,
  Inbox,
  Settings,
  Database,
  Save,
  X,
  Phone,
  Mail,
  Calendar,
  Eye,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileText,
  Award,
  Globe,
} from "lucide-react";
import {
  Language,
  UmrahPackage,
  HajjPackage,
  TourPackage,
  BlogPost,
  GalleryItem,
  Review,
  BookingInquiry,
  AgencyInfo,
  HomePageConfig,
} from "../types";
import {
  saveUmrahPackage,
  deleteUmrahPackage,
  saveHajjPackage,
  deleteHajjPackage,
  saveBlogPost,
  deleteBlogPost,
  saveTourPackage,
  deleteTourPackage,
  saveGalleryItem,
  deleteGalleryItem,
  saveReview,
  deleteReview,
  updateInquiryStatus,
  deleteInquiry,
  saveSiteSettings,
  seedAllDefaultDataToFirestore,
  SiteSettingsData,
} from "../services/firestoreService";
import {
  MultiImageManager,
  ItineraryBuilder,
  ListManager,
  DEFAULT_UMRAH_ITINERARY,
  DEFAULT_HAJJ_ITINERARY,
  DEFAULT_TOUR_ITINERARY,
  STOCK_PHOTO_PRESETS,
} from "../components/AdminMediaAndItineraryEditor";
import { AdminHomePageEditor } from "../components/AdminHomePageEditor";

interface AdminPageProps {
  lang: Language;
  agencyInfo: AgencyInfo;
  umrahPackages: UmrahPackage[];
  hajjPackages: HajjPackage[];
  tourPackages: TourPackage[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
  reviews: Review[];
  inquiries: BookingInquiry[];
  siteSettings: SiteSettingsData | null;
  homePageConfig?: HomePageConfig | null;
  onRefreshData?: () => void;
  onDeleteUmrah?: (id: string) => Promise<void> | void;
  onDeleteHajj?: (id: string) => Promise<void> | void;
  onDeleteTour?: (id: string) => Promise<void> | void;
  onDeleteBlog?: (id: string) => Promise<void> | void;
  onDeleteGallery?: (id: string) => Promise<void> | void;
  onDeleteReview?: (id: string) => Promise<void> | void;
  onDeleteInquiry?: (id: string) => Promise<void> | void;
  onSaveUmrah?: (pkg: UmrahPackage) => Promise<string | void>;
  onSaveHajj?: (pkg: HajjPackage) => Promise<string | void>;
  onSaveTour?: (pkg: TourPackage) => Promise<string | void>;
  onSaveBlog?: (post: BlogPost) => Promise<string | void>;
  onSaveGallery?: (item: GalleryItem) => Promise<string | void>;
  onSaveReview?: (rev: Review) => Promise<string | void>;
  onSaveHomePageConfig?: (config: HomePageConfig) => Promise<void> | void;
}

type AdminTab =
  | "homepage"
  | "umrah"
  | "hajj"
  | "blog"
  | "tours"
  | "gallery"
  | "reviews"
  | "inquiries"
  | "settings";

export const AdminPage: React.FC<AdminPageProps> = ({
  lang,
  agencyInfo,
  umrahPackages,
  hajjPackages,
  tourPackages,
  blogPosts,
  galleryItems,
  reviews,
  inquiries,
  siteSettings,
  homePageConfig,
  onDeleteUmrah,
  onDeleteHajj,
  onDeleteTour,
  onDeleteBlog,
  onDeleteGallery,
  onDeleteReview,
  onDeleteInquiry,
  onSaveUmrah,
  onSaveHajj,
  onSaveTour,
  onSaveBlog,
  onSaveGallery,
  onSaveReview,
  onSaveHomePageConfig,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("wh_admin_auth") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("umrah");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Modals for editing / creating
  const [editingUmrah, setEditingUmrah] =
    useState<Partial<UmrahPackage> | null>(null);
  const [editingHajj, setEditingHajj] = useState<Partial<HajjPackage> | null>(
    null,
  );
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(
    null,
  );
  const [editingTour, setEditingTour] = useState<Partial<TourPackage> | null>(
    null,
  );
  const [editingGallery, setEditingGallery] =
    useState<Partial<GalleryItem> | null>(null);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(
    null,
  );

  // Deletion Confirmation Target State
  interface DeleteTarget {
    type:
      | "umrah"
      | "hajj"
      | "blog"
      | "tour"
      | "gallery"
      | "review"
      | "inquiry"
      | "seed";
    id: string;
    title: string;
    categoryOrPrice?: string;
  }
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettingsData>({
    hadithBn:
      siteSettings?.hadithBn ||
      'রাসূলুল্লাহ (সা.) বলেছেন: "এক উমরাহ্ থেকে অপর উমরাহ্ মধ্যবর্তী সকল গুনাহের কাফফারা।" (বুখারী ও মুসলিম)',
    hadithEn:
      siteSettings?.hadithEn ||
      'The Prophet (pbuh) said: "One Umrah to the next is an expiation for the sins committed between them."',
    noticeBn:
      siteSettings?.noticeBn ||
      "পবিত্র হজ্ব ২০২৭ এর প্রাক-নিবন্ধন চলছে মাত্র ৩০,০০০ টাকায়। আজই যোগাযোগ করুন।",
    noticeEn:
      siteSettings?.noticeEn ||
      "Holy Hajj 2027 pre-registration is ongoing with only 30,000 BDT. Contact us today.",
    hotline: siteSettings?.hotline || agencyInfo.hotline,
    whatsappNumber: siteSettings?.whatsappNumber || agencyInfo.whatsappNumber,
  });

  useEffect(() => {
    if (siteSettings) {
      setSettingsForm((prev) => ({
        ...prev,
        ...siteSettings,
      }));
    }
  }, [siteSettings]);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret secure admin passcode
    const SECRET_ADMIN_PASSCODE = "Im Admin For World Heritage";
    if (passcode.trim() === SECRET_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("wh_admin_auth", "true");
      setAuthError("");
      setPasscode("");
      showToast("success", "এডমিন প্যানেলে সফলভাবে লগইন হয়েছে!");
    } else {
      setAuthError(
        "অননুমোদিত প্রবেশাধিকার! সঠিক গোপন সিকিউরিটি পাসকোড প্রদান করুন।",
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("wh_admin_auth");
    localStorage.removeItem("wh_admin_auth");
    setPasscode("");
    showToast("success", "লগআউট সম্পন্ন হয়েছে।");
  };

  // Seed Data to Firestore Trigger
  const handleSeedData = () => {
    setDeleteTarget({
      type: "seed",
      id: "seed-data-action",
      title: "ডিফল্ট প্যাকেজ ও পোস্ট ডাটা ক্লাউড ফায়ারবেসে সিংক ও আপলোড",
      categoryOrPrice: "সকল প্যাকেজ, ব্লগ এবং সেটিংস",
    });
  };

  // --- EXECUTE CONFIRMED DELETION ---
  const handleExecuteDelete = async () => {
    if (!deleteTarget) return;
    setIsProcessing(true);
    try {
      const { type, id, title } = deleteTarget;
      if (type === "umrah") {
        if (onDeleteUmrah) {
          await onDeleteUmrah(id);
        } else {
          await deleteUmrahPackage(id);
        }
        showToast(
          "success",
          `"${title}" উমরাহ্ প্যাকেজ সফলভাবে মুছে ফেলা হয়েছে!`,
        );
      } else if (type === "hajj") {
        if (onDeleteHajj) {
          await onDeleteHajj(id);
        } else {
          await deleteHajjPackage(id);
        }
        showToast(
          "success",
          `"${title}" হজ্ব প্যাকেজ সফলভাবে মুছে ফেলা হয়েছে!`,
        );
      } else if (type === "blog") {
        if (onDeleteBlog) {
          await onDeleteBlog(id);
        } else {
          await deleteBlogPost(id);
        }
        showToast("success", `"${title}" ব্লগ পোস্ট সফলভাবে মুছে ফেলা হয়েছে!`);
      } else if (type === "tour") {
        if (onDeleteTour) {
          await onDeleteTour(id);
        } else {
          await deleteTourPackage(id);
        }
        showToast(
          "success",
          `"${title}" ট্যুর প্যাকেজ সফলভাবে মুছে ফেলা হয়েছে!`,
        );
      } else if (type === "gallery") {
        if (onDeleteGallery) {
          await onDeleteGallery(id);
        } else {
          await deleteGalleryItem(id);
        }
        showToast("success", "গ্যালারি ছবি সফলভাবে মুছে ফেলা হয়েছে!");
      } else if (type === "review") {
        if (onDeleteReview) {
          await onDeleteReview(id);
        } else {
          await deleteReview(id);
        }
        showToast("success", "রিভিউ সফলভাবে মুছে ফেলা হয়েছে!");
      } else if (type === "inquiry") {
        if (onDeleteInquiry) {
          await onDeleteInquiry(id);
        } else {
          await deleteInquiry(id);
        }
        showToast("success", "ইনকোয়ারি সফলভাবে মুছে ফেলা হয়েছে!");
      } else if (type === "seed") {
        const res = await seedAllDefaultDataToFirestore();
        if (res.success) {
          showToast("success", res.message);
        } else {
          showToast("error", res.message);
        }
      }
    } catch (err: any) {
      showToast(
        "error",
        "ডিলিট করতে সমস্যা হয়েছে: " + (err.message || "Error"),
      );
    } finally {
      setIsProcessing(false);
      setDeleteTarget(null);
    }
  };

  // --- CRUD HANDLERS ---
  const handleSaveUmrah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUmrah?.titleBn || !editingUmrah?.priceBDT) {
      showToast(
        "error",
        "অনুগ্রহ করে প্যাকেজের নাম ও মূল্য সঠিকভাবে পূরণ করুন",
      );
      return;
    }
    setIsProcessing(true);
    try {
      const allImgs = Array.from(
        new Set(
          [editingUmrah.image, ...(editingUmrah.galleryImages || [])].filter(
            Boolean,
          ) as string[],
        ),
      );

      const pkgData: UmrahPackage = {
        id: editingUmrah.id || "",
        titleBn: editingUmrah.titleBn || "",
        titleEn: editingUmrah.titleEn || editingUmrah.titleBn,
        badgeBn: editingUmrah.badgeBn || "",
        badgeEn: editingUmrah.badgeEn || "",
        durationBn: editingUmrah.durationBn || "১৫ দিন",
        durationEn: editingUmrah.durationEn || "15 Days",
        makkahHotelBn: editingUmrah.makkahHotelBn || "৩ স্টার হোটেল",
        makkahHotelEn: editingUmrah.makkahHotelEn || "3 Star Hotel",
        makkahDistanceBn: editingUmrah.makkahDistanceBn || "৩০০ মিটার",
        makkahDistanceEn: editingUmrah.makkahDistanceEn || "300m",
        makkahStayDaysBn: editingUmrah.makkahStayDaysBn || "৮ দিন",
        madinahHotelBn: editingUmrah.madinahHotelBn || "৩ স্টার হোটেল",
        madinahHotelEn: editingUmrah.madinahHotelEn || "3 Star Hotel",
        madinahDistanceBn: editingUmrah.madinahDistanceBn || "২০০ মিটার",
        madinahDistanceEn: editingUmrah.madinahDistanceEn || "200m",
        madinahStayDaysBn: editingUmrah.madinahStayDaysBn || "৭ দিন",
        foodBn: editingUmrah.foodBn || "৩ বেলা সুস্বাদু দেশি খাবার",
        foodEn: editingUmrah.foodEn || "3 Meals daily",
        transportBn: editingUmrah.transportBn || "এসি বাস পরিবহন ও জিয়ারাহ্",
        transportEn: editingUmrah.transportEn || "AC Bus & Ziyarah Included",
        ziyaraBn:
          editingUmrah.ziyaraBn || "মক্কা ও মদিনার ঐতিহাসিক স্থান পরিদর্শন",
        ziyaraEn: editingUmrah.ziyaraEn || "Historical Ziyarah included",
        visaAndTicketBn:
          editingUmrah.visaAndTicketBn || "উমরাহ্ ভিসা ও রিটার্ন এয়ার টিকিটসহ",
        visaAndTicketEn:
          editingUmrah.visaAndTicketEn || "Visa & Return Air Ticket included",
        priceBDT: Number(editingUmrah.priceBDT),
        featured: editingUmrah.featured ?? false,
        image:
          editingUmrah.image ||
          allImgs[0] ||
          "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
        galleryImages:
          allImgs.length > 0
            ? allImgs
            : [
                editingUmrah.image ||
                  "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
              ],
        descriptionBn:
          editingUmrah.descriptionBn ||
          "ওয়ার্ল্ড হেরিটেজ ট্রাভেলস এর বিশ্বস্ত ব্যবস্থাপনায় পবিত্র উমরাহ্ পালনের সুবর্ণ সুযোগ। অভিজ্ঞ মোয়াল্লেমের সার্বক্ষণিক দিকনির্দেশনায় সুন্দর ও সুশৃঙ্খল সফর।",
        descriptionEn:
          editingUmrah.descriptionEn ||
          "Perform sacred Umrah pilgrimage with trusted World Heritage Travels services and experienced guidance.",
        itinerary:
          editingUmrah.itinerary && editingUmrah.itinerary.length > 0
            ? editingUmrah.itinerary
            : DEFAULT_UMRAH_ITINERARY,
        inclusionsBn:
          editingUmrah.inclusionsBn && editingUmrah.inclusionsBn.length > 0
            ? editingUmrah.inclusionsBn
            : [
                "উমরাহ্ ভিসা ও ইন্স্যুরেন্স",
                "রিটার্ন ডিরেক্ট ফ্লাইট টিকিট",
                "৩ বেলা উন্নত মানের দেশি খাবার",
                "অভিজ্ঞ মোয়াল্লেম ও আলেম গাইড",
                "মক্কা ও মদিনা ঐতিহাসিক জিয়ারাহ্",
                "৫ লিটার জমজম পানি",
              ],
        inclusionsEn: editingUmrah.inclusionsEn || [
          "Umrah Visa & Insurance",
          "Return Direct Flight",
          "Daily 3 Quality Meals",
          "Moallem & Scholar Guide",
          "Historical Ziyarah Tour",
          "5L Zamzam Water",
        ],
        exclusionsBn:
          editingUmrah.exclusionsBn && editingUmrah.exclusionsBn.length > 0
            ? editingUmrah.exclusionsBn
            : [
                "ব্যক্তিগত কেনাকাটা ও অন্যান্য খরচ",
                "অতিরিক্ত লাগেজ চার্জ",
                "রুম সার্ভিস ফি",
              ],
        guidelinesBn:
          editingUmrah.guidelinesBn && editingUmrah.guidelinesBn.length > 0
            ? editingUmrah.guidelinesBn
            : [
                "পাসপোর্টের মেয়াদ ন্যূনতম ৬ মাস থাকতে হবে",
                "যাত্রার ১৫ দিন পূর্বে বুকিং নিশ্চিত করতে হবে",
                "সৌদি সরকারের সকল স্বাস্থ্য ও ভিসা বিধিমালা প্রযোজ্য",
              ],
      };

      if (onSaveUmrah) {
        await onSaveUmrah(pkgData);
      } else {
        await saveUmrahPackage(pkgData);
      }

      setEditingUmrah(null);
      showToast("success", "উমরাহ্ প্যাকেজ সফলভাবে সেভ হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Hajj Save
  const handleSaveHajj = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHajj?.titleBn || !editingHajj?.totalPriceBDT) {
      showToast(
        "error",
        "অনুগ্রহ করে প্যাকেজের নাম ও মূল্য সঠিকভাবে পূরণ করুন",
      );
      return;
    }
    setIsProcessing(true);
    try {
      const allImgs = Array.from(
        new Set(
          [editingHajj.image, ...(editingHajj.galleryImages || [])].filter(
            Boolean,
          ) as string[],
        ),
      );

      const pkgData: HajjPackage = {
        id: editingHajj.id || "",
        titleBn: editingHajj.titleBn || "",
        titleEn: editingHajj.titleEn || editingHajj.titleBn,
        packageCategoryBn: editingHajj.packageCategoryBn || "স্ট্যান্ডার্ড",
        packageCategoryEn: editingHajj.packageCategoryEn || "Standard",
        badgeBn: editingHajj.badgeBn || "",
        badgeEn: editingHajj.badgeEn || "",
        year: Number(editingHajj.year) || 2027,
        durationBn: editingHajj.durationBn || "৪০-৪২ দিন",
        durationEn: editingHajj.durationEn || "40-42 Days",
        regFeeBDT: Number(editingHajj.regFeeBDT) || 30000,
        totalPriceBDT: Number(editingHajj.totalPriceBDT),
        flightTypeBn:
          editingHajj.flightTypeBn || "সরাসরি সাউদিয়া / বিমান বাংলাদেশ",
        flightTypeEn: editingHajj.flightTypeEn || "Direct Flight",
        qurbaniBn: editingHajj.qurbaniBn || "প্যাকেজের অন্তর্ভুক্ত",
        qurbaniEn: editingHajj.qurbaniEn || "Included in Package",
        makkahHotelBn: editingHajj.makkahHotelBn || "৪ স্টার হোটেল",
        makkahHotelEn: editingHajj.makkahHotelEn || "4 Star Hotel",
        makkahDistanceBn: editingHajj.makkahDistanceBn || "২০০ মিটার",
        makkahStayDaysBn: editingHajj.makkahStayDaysBn || "২৪ দিন",
        madinahHotelBn: editingHajj.madinahHotelBn || "৪ স্টার হোটেল",
        madinahHotelEn: editingHajj.madinahHotelEn || "4 Star Hotel",
        madinahDistanceBn: editingHajj.madinahDistanceBn || "১০০ মিটার",
        madinahStayDaysBn: editingHajj.madinahStayDaysBn || "১০ দিন",
        minaArafatBn:
          editingHajj.minaArafatBn ||
          "মিনা-আরাফাত ভিআইপি এসি তাঁবু সেবা ও মোয়াল্লেম দিকনির্দেশনা",
        minaArafatEn:
          editingHajj.minaArafatEn || "VIP AC Tents at Mina & Arafat",
        foodBn: editingHajj.foodBn || "৩ বেলা বুফে দেশি খাবার",
        foodEn: editingHajj.foodEn || "Buffet Meals",
        transportBn:
          editingHajj.transportBn || "ভিআইপি এসি বাস ও হারামাইন বুলেট ট্রেন",
        transportEn: editingHajj.transportEn || "VIP AC Bus & Haramain Train",
        bulletTrainBn:
          editingHajj.bulletTrainBn ||
          "হারামাইন হাই-স্পিড বুলেট ট্রেনে মক্কা-মদিনা যাতায়াত",
        bulletTrainEn:
          editingHajj.bulletTrainEn || "Haramain High-Speed Train included",
        ziyarahBn:
          editingHajj.ziyarahBn ||
          "মক্কা, মদিনা, তায়েফ, জেদ্দা ও বদর বিশেষ জিয়ারাহ্",
        ziyarahEn:
          editingHajj.ziyarahEn ||
          "Special Ziyarah to Makkah, Madinah, Taif, Jeddah & Badr",
        moallemBn: editingHajj.moallemBn || "অভিজ্ঞ মুয়াল্লিম ও আলেম টিম",
        moallemEn: editingHajj.moallemEn || "Experienced Moallem Guide",
        giftItemsBn:
          editingHajj.giftItemsBn ||
          "ইহরামের কাপড়, ট্রলি ব্যাগ, পিঠের ব্যাগ, জুতার ব্যাগ, পাসপোর্ট ব্যাগ ও হজ্ব গাইড বই",
        giftItemsEn:
          editingHajj.giftItemsEn ||
          "Ihram, Trolley bag, Backpack, Passport pouch & Guide book",
        registrationStatusBn:
          editingHajj.registrationStatusBn || "প্রাক-নিবন্ধন চলছে",
        registrationStatusEn:
          editingHajj.registrationStatusEn || "Registration Open",
        facilitiesBn:
          editingHajj.facilitiesBn && editingHajj.facilitiesBn.length > 0
            ? editingHajj.facilitiesBn
            : [
                "সরকারি প্রাক-নিবন্ধন",
                "মিনা-আরাফাত ক্যাম্প সেবা",
                "৩ বেলা দেশি খাবার",
                "অভিজ্ঞ গাইড",
              ],
        facilitiesEn: editingHajj.facilitiesEn || [
          "Govt. Pre-registration",
          "Mina-Arafat Camp",
          "Daily Meals",
          "Experienced Guide",
        ],
        inclusionsBn:
          editingHajj.inclusionsBn && editingHajj.inclusionsBn.length > 0
            ? editingHajj.inclusionsBn
            : [
                "হজ্ব ভিসা ও ড্রাফট ফি",
                "ডিরেক্ট হজ্ব ফ্লাইট রিটার্ন টিকিট",
                "মিনা ও আরাফাত মোয়াল্লেম সেবা ও ভিআইপি তাঁবু",
                "৩ বেলা সুস্বাদু দেশি খাবার",
                "হারামাইন বুলেট ট্রেন ও এসি পরিবহন",
                "মক্কা ও মদিনা ঐতিহাসিক জিয়ারাহ্",
                "অভিজ্ঞ আলেম ও চিকিৎসকের তত্ত্বাবধান",
                "হজ্ব উপহার সামগ্রী",
              ],
        exclusionsBn:
          editingHajj.exclusionsBn && editingHajj.exclusionsBn.length > 0
            ? editingHajj.exclusionsBn
            : ["ব্যক্তিগত কেনাকাটা", "অতিরিক্ত লাগেজ চার্জ"],
        guidelinesBn:
          editingHajj.guidelinesBn && editingHajj.guidelinesBn.length > 0
            ? editingHajj.guidelinesBn
            : [
                "জাতীয় পরিচয়পত্র বা পাসপোর্টের ফটোকপিসহ প্রাক-নিবন্ধন করতে হবে",
                "সৌদি হজ্ব মন্ত্রণালয়ের নির্ধারিত সময়সীমার মধ্যে সকল প্রক্রিয়া সম্পন্ন হবে",
              ],
        image:
          editingHajj.image ||
          allImgs[0] ||
          "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
        galleryImages:
          allImgs.length > 0
            ? allImgs
            : [
                editingHajj.image ||
                  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
              ],
        descriptionBn:
          editingHajj.descriptionBn ||
          "পবিত্র হজ্ব পালনে হাজী সাহেবানদের সর্বোচ্চ সেবা ও আরামদায়ক অভিজ্ঞতায় বিশ্বস্ত প্রতিষ্ঠান ওয়ার্ল্ড হেরিটেজ ট্রাভেলস। অভিজ্ঞ ওলামায়ে কেরামের সার্বক্ষণিক তত্ত্বাবধান।",
        itinerary:
          editingHajj.itinerary && editingHajj.itinerary.length > 0
            ? editingHajj.itinerary
            : DEFAULT_HAJJ_ITINERARY,
      };

      if (onSaveHajj) {
        await onSaveHajj(pkgData);
      } else {
        await saveHajjPackage(pkgData);
      }

      setEditingHajj(null);
      showToast("success", "হজ্ব প্যাকেজ সফলভাবে সেভ হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Blog Save
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.titleBn || !editingBlog?.contentBn) {
      showToast("error", "অনুগ্রহ করে ব্লগের শিরোনাম ও মূল বক্তব্য লিখুন");
      return;
    }
    setIsProcessing(true);
    try {
      const allImgs = Array.from(
        new Set(
          [editingBlog.image, ...(editingBlog.galleryImages || [])].filter(
            Boolean,
          ) as string[],
        ),
      );

      const postData: BlogPost = {
        id: editingBlog.id || "",
        titleBn: editingBlog.titleBn || "",
        titleEn: editingBlog.titleEn || editingBlog.titleBn,
        categoryBn: editingBlog.categoryBn || "উমরাহ্ গাইড",
        categoryEn: editingBlog.categoryEn || "Umrah Guide",
        categoryKey: editingBlog.categoryKey || "umrah-guide",
        date: editingBlog.date || new Date().toISOString().split("T")[0],
        authorBn: editingBlog.authorBn || "মুফতী মাওলানা কাফেল প্রধান",
        authorEn: editingBlog.authorEn || "World Heritage Guide",
        summaryBn:
          editingBlog.summaryBn || editingBlog.contentBn.slice(0, 120) + "...",
        summaryEn:
          editingBlog.summaryEn || "Travel guideline and Islamic advice...",
        contentBn: editingBlog.contentBn || "",
        contentEn: editingBlog.contentEn || editingBlog.contentBn,
        image:
          editingBlog.image ||
          allImgs[0] ||
          "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
        galleryImages: allImgs,
      };

      if (onSaveBlog) {
        await onSaveBlog(postData);
      } else {
        await saveBlogPost(postData);
      }

      setEditingBlog(null);
      showToast("success", "ব্লগ পোস্ট সফলভাবে প্রকাশিত হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Tour Package Save & Delete
  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour?.titleBn || !editingTour?.priceBDT) {
      showToast("error", "অনুগ্রহ করে ট্যুরের নাম ও মূল্য দিন");
      return;
    }
    setIsProcessing(true);
    try {
      const allImgs = Array.from(
        new Set(
          [editingTour.image, ...(editingTour.galleryImages || [])].filter(
            Boolean,
          ) as string[],
        ),
      );

      const tourData: TourPackage = {
        id: editingTour.id || "",
        titleBn: editingTour.titleBn || "",
        titleEn: editingTour.titleEn || editingTour.titleBn,
        category: editingTour.category || "international",
        countryBn: editingTour.countryBn || "সংযুক্ত আরব আমিরাত",
        countryEn: editingTour.countryEn || "UAE",
        durationBn: editingTour.durationBn || "৫ দিন ৪ রাত",
        durationEn: editingTour.durationEn || "5D 4N",
        priceBDT: Number(editingTour.priceBDT) || 0,
        visaRequired: editingTour.visaRequired ?? true,
        image:
          editingTour.image ||
          allImgs[0] ||
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
        galleryImages:
          allImgs.length > 0
            ? allImgs
            : [
                editingTour.image ||
                  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
              ],
        descriptionBn:
          editingTour.descriptionBn ||
          "আকর্ষণীয় আন্তর্জাতিক ও অভ্যন্তরীণ ট্যুর প্যাকেজ। আকর্ষণীয় সাইটসিয়িং, লাক্সারি হোটেল ও উন্নত সুবিধা।",
        descriptionEn:
          editingTour.descriptionEn ||
          "Exciting travel package with hotel stay, sightseeing, and premium comfort.",
        highlightsBn:
          editingTour.highlightsBn && editingTour.highlightsBn.length > 0
            ? editingTour.highlightsBn
            : [
                "লাক্সারি হোটেল চেক-ইন",
                "সাইটসিয়িং ট্যুর",
                "রিটার্ন এয়ার টিকিট",
              ],
        highlightsEn: editingTour.highlightsEn || [
          "Luxury Hotel Stay",
          "Guided Sightseeing",
          "Return Flights",
        ],
        itinerary:
          editingTour.itinerary && editingTour.itinerary.length > 0
            ? editingTour.itinerary
            : DEFAULT_TOUR_ITINERARY,
        inclusionsBn:
          editingTour.inclusionsBn && editingTour.inclusionsBn.length > 0
            ? editingTour.inclusionsBn
            : [
                "রিটার্ন এয়ার টিকিট",
                "৩/৪ তারকা হোটেল স্টে",
                "প্রতিদিনের প্রাতরাশ",
                "এয়ারপোর্ট পিক অ্যান্ড ড্রপ",
                "সাইটসিয়িং ট্যুর",
              ],
        exclusionsBn:
          editingTour.exclusionsBn && editingTour.exclusionsBn.length > 0
            ? editingTour.exclusionsBn
            : ["ব্যক্তিগত খরচ", "ভিসা ফি (প্রযোজ্য ক্ষেত্রে)"],
      };

      if (onSaveTour) {
        await onSaveTour(tourData);
      } else {
        await saveTourPackage(tourData);
      }

      setEditingTour(null);
      showToast("success", "ট্যুর প্যাকেজ সফলভাবে সেভ হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gallery Save
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.titleBn || !editingGallery?.imageUrl) {
      showToast("error", "অনুগ্রহ করে ছবির শিরোনাম ও ইমেজ লিঙ্ক দিন");
      return;
    }
    setIsProcessing(true);
    try {
      // Compress and backup image
      let finalImageUrl = editingGallery.imageUrl;
      if (finalImageUrl && !finalImageUrl.startsWith("data:image")) {
        try {
          finalImageUrl = await compressImageUrl(finalImageUrl, 800, 0.7);
        } catch (imgErr) {
          console.warn("Could not compress gallery image", imgErr);
        }
      }

      const galleryData: GalleryItem = {
        id: editingGallery.id || "",
        titleBn: editingGallery.titleBn || "",
        titleEn: editingGallery.titleEn || editingGallery.titleBn,
        category: editingGallery.category || "umrah",
        imageUrl: finalImageUrl || "",
        captionBn: editingGallery.captionBn || "",
        captionEn: editingGallery.captionEn || "",
      };

      if (onSaveGallery) {
        await onSaveGallery(galleryData);
      } else {
        await saveGalleryItem(galleryData);
      }

      setEditingGallery(null);
      showToast("success", "গ্যালারি ছবি সফলভাবে যুক্ত হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Review Save
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.nameBn || !editingReview?.commentBn) {
      showToast("error", "অনুগ্রহ করে হাজীর নাম ও মতামত লিখুন");
      return;
    }
    setIsProcessing(true);
    try {
      const revData: Review = {
        id: editingReview.id || "",
        nameBn: editingReview.nameBn || "",
        nameEn: editingReview.nameEn || editingReview.nameBn,
        locationBn: editingReview.locationBn || "ঢাকা, বাংলাদেশ",
        locationEn: editingReview.locationEn || "Dhaka, Bangladesh",
        serviceBn: editingReview.serviceBn || "পবিত্র উমরাহ্ প্যাকেজ",
        serviceEn: editingReview.serviceEn || "Umrah Package",
        rating: Number(editingReview.rating) || 5,
        commentBn: editingReview.commentBn || "",
        commentEn: editingReview.commentEn || editingReview.commentBn,
        date: editingReview.date || "২০২৬",
        verified: editingReview.verified ?? true,
      };

      if (onSaveReview) {
        await onSaveReview(revData);
      } else {
        await saveReview(revData);
      }

      setEditingReview(null);
      showToast("success", "রিভিউ সফলভাবে সেভ হয়েছে!");
    } catch (err: any) {
      showToast("error", "সেভ করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Save Global Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await saveSiteSettings(settingsForm);
      showToast(
        "success",
        "ওয়েবসাইট সেটিংস ও মারকুই টেক্সট সফলভাবে আপডেট হয়েছে!",
      );
    } catch (err: any) {
      showToast("error", "আপডেট করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Inquiry Status Change
  const handleUpdateInquiryStatus = async (
    id: string,
    status: BookingInquiry["status"],
  ) => {
    try {
      await updateInquiryStatus(id, status);
      showToast("success", "ইনকোয়ারি স্ট্যাটাস আপডেট হয়েছে!");
    } catch (err: any) {
      showToast("error", "স্ট্যাটাস আপডেট ব্যর্থ: " + err.message);
    }
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#052917] to-[#0D472B] text-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-lg border border-[#D4AF37]/50">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-emerald-950 mb-1">
            এডমিন কন্ট্রোল প্যানেল
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            ওয়ার্ল্ড হেরিটেজ ট্যুরস অ্যান্ড ট্রাভেলস ম্যানেজমেন্ট
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                গোপন সিকিউরিটি পাসকোড (Security Passcode)
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="গোপন পাসকোড প্রবেশ করান..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D472B] focus:border-transparent outline-none font-semibold text-sm"
                required
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0D472B] to-[#052917] text-[#F3E0A0] py-3.5 rounded-xl font-black text-sm shadow-xl hover:shadow-emerald-900/30 border border-[#D4AF37] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              লগইন করুন (Enter Admin Dashboard)
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              নিরাপত্তা রক্ষার্থে এই প্যানেল শুধুমাত্র অনুমোদিত এজেন্সির
              কর্মকর্তাদের জন্য সংরক্ষিত।
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- AUTHENTICATED DASHBOARD ----------------
  return (
    <div className="min-h-screen bg-gray-50/80 pb-20 pt-4 px-3 sm:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2 text-sm font-bold animate-bounce ${
            toastMessage.type === "success"
              ? "bg-emerald-900 text-[#F3E0A0] border-[#D4AF37]"
              : "bg-red-800 text-white border-red-400"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#052917] via-[#0D472B] to-[#052917] text-white p-4 sm:p-6 rounded-3xl border border-[#D4AF37]/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B38712] text-emerald-950 flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  এডমিন সিএমএস ড্যাশবোর্ড (Live CMS)
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-400/30">
                  ক্লাউড ফায়ারবেস সক্রিয়
                </span>
              </div>
              <p className="text-xs text-[#D4AF37] font-medium">
                কোড এডিট ছাড়া সাইটের সকল প্যাকেজ, পোস্ট ও কনটেন্ট নিয়ন্ত্রণ করুন
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Seed / Sync Button */}
            <button
              onClick={handleSeedData}
              disabled={isProcessing}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs font-bold py-2.5 px-3.5 rounded-xl border border-emerald-700/50 shadow-sm transition-all cursor-pointer"
              title="ডিফল্ট ডাটাবেজ সিংক করুন"
            >
              <Database className="w-4 h-4 text-[#D4AF37]" />
              <span>{isProcessing ? "সিংক হচ্ছে..." : "ডাটাবেজ সিংক/সিড"}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Unlock className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div
            onClick={() => setActiveTab("homepage")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "homepage" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black text-[#D4AF37]">CMS</div>
            <div className="text-[11px] font-bold">হোম পেজ এডিটর</div>
          </div>

          <div
            onClick={() => setActiveTab("umrah")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "umrah" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Moon className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{umrahPackages.length}</div>
            <div className="text-[11px] font-bold">উমরাহ্ প্যাকেজ</div>
          </div>

          <div
            onClick={() => setActiveTab("hajj")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "hajj" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{hajjPackages.length}</div>
            <div className="text-[11px] font-bold">হজ্ব প্যাকেজ</div>
          </div>

          <div
            onClick={() => setActiveTab("blog")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "blog" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <BookOpen className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{blogPosts.length}</div>
            <div className="text-[11px] font-bold">ব্লগ ও গাইড</div>
          </div>

          <div
            onClick={() => setActiveTab("gallery")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "gallery" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <ImageIcon className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{galleryItems.length}</div>
            <div className="text-[11px] font-bold">গ্যালারি ছবি</div>
          </div>

          <div
            onClick={() => setActiveTab("reviews")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "reviews" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{reviews.length}</div>
            <div className="text-[11px] font-bold">কাস্টমার রিভিউ</div>
          </div>

          <div
            onClick={() => setActiveTab("inquiries")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "inquiries" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Inbox className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black text-amber-500">
              {inquiries.length}
            </div>
            <div className="text-[11px] font-bold">ইনকোয়ারি বুকিং</div>
          </div>

          <div
            onClick={() => setActiveTab("settings")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === "settings" ? "bg-[#0D472B] text-white border-[#D4AF37] shadow-md" : "bg-white text-gray-800 border-gray-200 hover:border-emerald-300"}`}
          >
            <Settings className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">⚙️</div>
            <div className="text-[11px] font-bold">সাইট সেটিংস</div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-gray-200 scrollbar-none">
          {[
            { id: "homepage", label: "হোম পেজ CMS এডিটর", icon: Sparkles },
            {
              id: "umrah",
              label: "উমরাহ্ প্যাকেজ",
              icon: Moon,
              count: umrahPackages.length,
            },
            {
              id: "hajj",
              label: "হজ্ব প্যাকেজ ২০২৭",
              icon: Sparkles,
              count: hajjPackages.length,
            },
            {
              id: "blog",
              label: "ভ্রমণ ব্লগ ও গাইড",
              icon: BookOpen,
              count: blogPosts.length,
            },
            {
              id: "tours",
              label: "ট্যুর ও ভিসা অফার",
              icon: Compass,
              count: tourPackages.length,
            },
            {
              id: "gallery",
              label: "ফটো গ্যালারি",
              icon: ImageIcon,
              count: galleryItems.length,
            },
            {
              id: "reviews",
              label: "হাজী রিভিউ",
              icon: Users,
              count: reviews.length,
            },
            {
              id: "inquiries",
              label: "কাস্টমার ইনকোয়ারি",
              icon: Inbox,
              count: inquiries.filter((i) => i.status === "new").length,
              badge: "নতুন",
            },
            { id: "settings", label: "সাইট নোটিশ ও সেটিংস", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0D472B] text-[#F3E0A0] shadow-md border border-[#D4AF37]"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${isActive ? "bg-[#D4AF37] text-emerald-950" : "bg-gray-200 text-gray-700"}`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ---------------- TAB 0: HOMEPAGE CMS EDITOR ---------------- */}
        {activeTab === "homepage" && (
          <AdminHomePageEditor
            lang={lang}
            config={homePageConfig || null}
            onConfigSaved={(newCfg) => {
              if (onSaveHomePageConfig) {
                onSaveHomePageConfig(newCfg);
              }
            }}
            onShowToast={showToast}
          />
        )}

        {/* ---------------- TAB 1: UMRAH PACKAGES ---------------- */}
        {activeTab === "umrah" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  উমরাহ্ প্যাকেজসমূহ ({umrahPackages.length}টি লাইভ প্যাকেজ)
                </h2>
                <p className="text-xs text-gray-500">
                  প্যাকেজের মূল্য, হোটেল এবং বিবরণ পরিবর্তন করুন বা নতুন প্যাকেজ
                  যোগ করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingUmrah({
                    titleBn: "১৫ দিনের এক্সক্লুসিভ উমরাহ্ প্যাকেজ",
                    titleEn: "15 Days Exclusive Umrah Package",
                    badgeBn: "পপুলার অফার",
                    durationBn: "১৫ দিন",
                    durationEn: "15 Days",
                    makkahHotelBn: "৩ স্টার হোটেল (৩০০ মিটার)",
                    madinahHotelBn: "৩ স্টার হোটেল (২০০ মিটার)",
                    makkahDistanceBn: "৩০০ মিটার",
                    madinahDistanceBn: "২০০ মিটার",
                    makkahStayDaysBn: "৮ দিন",
                    madinahStayDaysBn: "৭ দিন",
                    priceBDT: 135000,
                    image: STOCK_PHOTO_PRESETS.umrah[0],
                    galleryImages: [...STOCK_PHOTO_PRESETS.umrah],
                    foodBn: "৩ বেলা সুস্বাদু দেশি খাবার",
                    transportBn: "এসি বাস পরিবহন ও জিয়ারাহ্",
                    ziyaraBn: "মক্কা ও মদিনার ঐতিহাসিক স্থান পরিদর্শন",
                    visaAndTicketBn: "উমরাহ্ ভিসা ও রিটার্ন টিকিটসহ",
                    descriptionBn:
                      "ওয়ার্ল্ড হেরিটেজ ট্রাভেলস এর বিশ্বস্ত ব্যবস্থাপনায় পবিত্র উমরাহ্ পালনের সুবর্ণ সুযোগ। অভিজ্ঞ মোয়াল্লেমের সার্বক্ষণিক দিকনির্দেশনায় সুন্দর ও সুশৃঙ্খল সফর।",
                    itinerary: [...DEFAULT_UMRAH_ITINERARY],
                    inclusionsBn: [
                      "উমরাহ্ ভিসা ও ইন্স্যুরেন্স",
                      "রিটার্ন ডিরেক্ট ফ্লাইট টিকিট",
                      "৩ বেলা উন্নত মানের দেশি খাবার",
                      "অভিজ্ঞ মোয়াল্লেম ও আলেম গাইড",
                      "মক্কা ও মদিনা ঐতিহাসিক জিয়ারাহ্",
                      "৫ লিটার জমজম পানি",
                    ],
                    exclusionsBn: [
                      "ব্যক্তিগত কেনাকাটা ও অন্যান্য খরচ",
                      "অতিরিক্ত লাগেজ চার্জ",
                      "রুম সার্ভিস ফি",
                    ],
                    guidelinesBn: [
                      "পাসপোর্টের মেয়াদ ন্যূনতম ৬ মাস থাকতে হবে",
                      "যাত্রার ১৫ দিন পূর্বে বুকিং নিশ্চিত করতে হবে",
                      "সৌদি সরকারের সকল স্বাস্থ্য ও ভিসা বিধিমালা প্রযোজ্য",
                    ],
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন উমরাহ্ প্যাকেজ তৈরি করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {umrahPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-emerald-950">
                      <img
                        src={pkg.image}
                        alt={pkg.titleBn}
                        className="w-full h-full object-cover"
                      />
                      {pkg.badgeBn && (
                        <span className="absolute top-2 left-2 bg-[#D4AF37] text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow">
                          {pkg.badgeBn}
                        </span>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs font-black px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        {pkg.durationBn}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-extrabold text-sm text-emerald-950 line-clamp-1">
                        {pkg.titleBn}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          🕋 মক্কা:{" "}
                          <span className="font-semibold text-gray-800">
                            {pkg.makkahHotelBn}
                          </span>
                        </div>
                        <div>
                          🕌 মদিনা:{" "}
                          <span className="font-semibold text-gray-800">
                            {pkg.madinahHotelBn}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-bold">
                          প্যাকেজ মূল্য:
                        </span>
                        <span className="text-base font-black text-emerald-700">
                          ৳{pkg.priceBDT.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => setEditingUmrah(pkg)}
                      className="flex-1 flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট করুন</span>
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "umrah",
                          id: pkg.id,
                          title: pkg.titleBn,
                          categoryOrPrice: `প্যাকেজ মূল্য: ৳${pkg.priceBDT.toLocaleString()} • মেয়াদ: ${pkg.durationBn}`,
                        })
                      }
                      className="flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs transition-colors cursor-pointer"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: HAJJ PACKAGES ---------------- */}
        {activeTab === "hajj" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  পবিত্র হজ্ব প্যাকেজসমূহ ({hajjPackages.length}টি প্যাকেজ)
                </h2>
                <p className="text-xs text-gray-500">
                  হজ্ব ২০২৭ এর প্রাক-নিবন্ধন ফি, পূর্ণাঙ্গ খরচ ও সুযোগ-সুবিধা
                  আপডেট করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingHajj({
                    titleBn: "পবিত্র হজ্ব ২০২৭ ভিআইপি প্যাকেজ",
                    titleEn: "Holy Hajj 2027 VIP Package",
                    year: 2027,
                    durationBn: "৪০-৪২ দিন",
                    durationEn: "40-42 Days",
                    regFeeBDT: 30000,
                    totalPriceBDT: 650000,
                    packageCategoryBn: "ভিআইপি লাক্সারি",
                    packageCategoryEn: "VIP Luxury",
                    badgeBn: "নিবন্ধন চলছে",
                    makkahHotelBn: "৫ স্টার হোটেল (১০০ মিটার)",
                    madinahHotelBn: "৫ স্টার হোটেল (৫০ মিটার)",
                    makkahDistanceBn: "১০০ মিটার",
                    madinahDistanceBn: "৫০ মিটার",
                    makkahStayDaysBn: "২৪ দিন",
                    madinahStayDaysBn: "১০ দিন",
                    foodBn: "৩ বেলা বুফে দেশি খাবার",
                    transportBn: "ভিআইপি এসি বাস ও হারামাইন ট্রেন",
                    registrationStatusBn: "সরকারি প্রাক-নিবন্ধন চলছে",
                    image: STOCK_PHOTO_PRESETS.hajj[0],
                    galleryImages: [...STOCK_PHOTO_PRESETS.hajj],
                    descriptionBn:
                      "পবিত্র হজ্ব পালনে হাজী সাহেবানদের সর্বোচ্চ সেবা ও আরামদায়ক অভিজ্ঞতায় বিশ্বস্ত প্রতিষ্ঠান ওয়ার্ল্ড হেরিটেজ ট্রাভেলস। অভিজ্ঞ ওলামায়ে কেরামের সার্বক্ষণিক তত্ত্বাবধান ও মোয়াল্লেম সহায়তা।",
                    itinerary: [...DEFAULT_HAJJ_ITINERARY],
                    facilitiesBn: [
                      "সরকারি প্রাক-নিবন্ধন",
                      "মিনা আরাফাত ভিআইপি তাঁবু",
                      "৩ বেলা বুফে খাবার",
                      "অভিজ্ঞ মুয়াল্লিম গাইড",
                    ],
                    inclusionsBn: [
                      "হজ্ব ভিসা ও ড্রাফট ফি",
                      "ডিরেক্ট হজ্ব ফ্লাইট রিটার্ন টিকিট",
                      "মিনা ও আরাফাত মোয়াল্লেম সেবা ও ভিআইপি তাঁবু",
                      "৩ বেলা সুস্বাদু দেশি খাবার",
                      "হারামাইন বুলেট ট্রেন ও এসি পরিবহন",
                      "মক্কা ও মদিনা ঐতিহাসিক জিয়ারাহ্",
                      "অভিজ্ঞ আলেম ও চিকিৎসকের তত্ত্বাবধান",
                      "হজ্ব উপহার সামগ্রী",
                    ],
                    exclusionsBn: [
                      "ব্যক্তিগত কেনাকাটা",
                      "অতিরিক্ত লাগেজ চার্জ",
                    ],
                    guidelinesBn: [
                      "জাতীয় পরিচয়পত্র বা পাসপোর্টের ফটোকপিসহ প্রাক-নিবন্ধন করতে হবে",
                      "সৌদি হজ্ব মন্ত্রণালয়ের নির্ধারিত সময়সীমার মধ্যে সকল প্রক্রিয়া সম্পন্ন হবে",
                    ],
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন হজ্ব প্যাকেজ তৈরি করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hajjPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-emerald-950">
                      <img
                        src={pkg.image}
                        alt={pkg.titleBn}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-900 text-emerald-100 text-[10px] font-black px-2 py-0.5 rounded-md border border-[#D4AF37]">
                        হজ্ব {pkg.year}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-extrabold text-sm text-emerald-950 line-clamp-1">
                        {pkg.titleBn}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          প্রাক-নিবন্ধন ফি:{" "}
                          <span className="font-bold text-emerald-800">
                            ৳{pkg.regFeeBDT.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          মোট প্যাকেজ:{" "}
                          <span className="font-bold text-gray-800">
                            ৳{pkg.totalPriceBDT.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          হোটেল:{" "}
                          <span className="font-semibold text-gray-700">
                            {pkg.makkahHotelBn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => setEditingHajj(pkg)}
                      className="flex-1 flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট করুন</span>
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "hajj",
                          id: pkg.id,
                          title: pkg.titleBn,
                          categoryOrPrice: `হজ্ব সাল: ${pkg.year} • মোট প্যাকেজ: ৳${pkg.totalPriceBDT.toLocaleString()}`,
                        })
                      }
                      className="flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs transition-colors cursor-pointer"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: BLOG POSTS ---------------- */}
        {activeTab === "blog" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  ভ্রমণ ব্লগ ও ইসলামিক নির্দেশিকা ({blogPosts.length}টি পোস্ট)
                </h2>
                <p className="text-xs text-gray-500">
                  নতুন ইসলামিক নির্দেশিকা পোস্ট করুন বা বিদ্যমান আর্টিকেল এডিট
                  করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingBlog({
                    titleBn: "",
                    titleEn: "",
                    categoryBn: "উমরাহ্ নির্দেশিকা",
                    categoryKey: "umrah-guide",
                    authorBn: "মাওলানা কাফেল প্রধান",
                    date: new Date().toISOString().split("T")[0],
                    summaryBn: "",
                    contentBn: "",
                    image:
                      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ব্লগ পোস্ট লিখুন</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={post.image}
                      alt={post.titleBn}
                      className="w-16 h-14 object-cover rounded-xl border"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {post.categoryBn}
                      </span>
                      <h3 className="font-extrabold text-sm text-gray-900 mt-1 line-clamp-1">
                        {post.titleBn}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {post.summaryBn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setEditingBlog(post)}
                      className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "blog",
                          id: post.id,
                          title: post.titleBn,
                          categoryOrPrice: `ক্যাটাগরি: ${post.categoryBn} • লেখক: ${post.authorBn}`,
                        })
                      }
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs cursor-pointer"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: TOUR & VISA OFFERS ---------------- */}
        {activeTab === "tours" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  ট্যুর ও ভিসা প্রসেসিং প্যাকেজ ({tourPackages.length}টি)
                </h2>
                <p className="text-xs text-gray-500">
                  আন্তর্জাতিক ও অভ্যন্তরীণ ট্যুর এবং ভিসা প্যাকেজ পরিচালনা করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingTour({
                    titleBn: "দুবাই ও আবুধাবি সিটি ট্যুর",
                    titleEn: "Dubai & Abu Dhabi City Tour",
                    category: "international",
                    countryBn: "সংযুক্ত আরব আমিরাত",
                    countryEn: "UAE",
                    durationBn: "৫ দিন ৪ রাত",
                    durationEn: "5D 4N",
                    priceBDT: 85000,
                    visaRequired: true,
                    image: STOCK_PHOTO_PRESETS.tour[0],
                    galleryImages: [...STOCK_PHOTO_PRESETS.tour],
                    descriptionBn:
                      "দুবাই এবং আবুধাবির চোখ ধাঁধানো স্থাপত্য, বুর্জ খলিফা, ডেজার্ট সাফারি ও আধুনিক সংস্কৃতির মনোমুগ্ধকর অভিজ্ঞতা। সেরা হোটেল স্টে ও অভিজ্ঞ গাইডসহ লাক্সারি ট্যুর।",
                    descriptionEn:
                      "Explore the modern wonders of Dubai and Abu Dhabi with luxury stays, desert safari and Burj Khalifa visits.",
                    highlightsBn: [
                      "বুর্জ খলিফা ১২৪ তলা দর্শন",
                      "ডেজার্ট সাফারি ও বারবিকিউ ডিনার",
                      "দুবাই মেরিনা ক্রুজ",
                      "রিটার্ন এয়ার টিকিট ও লাক্সারি হোটেল",
                    ],
                    inclusionsBn: [
                      "রিটার্ন এয়ার টিকিট",
                      "৪ তারকা হোটেল রুম (টুইন/ডাবল শেয়ারিং)",
                      "প্রতিদিনের বুফে প্রাতরাশ",
                      "এসি গাড়িতে এয়ারপোর্ট পিক ও ড্রপ",
                      "সাইটসিয়িং ও এন্ট্রি টিকিট",
                    ],
                    exclusionsBn: [
                      "ব্যক্তিগত কেনাকাটা ও খাবার খরচ",
                      "ভিসা ফি ও ট্যাক্স",
                    ],
                    itinerary: [...DEFAULT_TOUR_ITINERARY],
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ট্যুর প্যাকেজ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tourPackages.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={tour.image}
                      alt={tour.titleBn}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3.5">
                      <h4 className="font-extrabold text-sm text-emerald-950">
                        {tour.titleBn}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {tour.countryBn} • {tour.durationBn}
                      </p>
                      <div className="text-sm font-black text-emerald-800 mt-2">
                        ৳{tour.priceBDT.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => setEditingTour(tour)}
                      className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 py-1 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "tour",
                          id: tour.id,
                          title: tour.titleBn,
                          categoryOrPrice: `${tour.countryBn} • মূল্য: ৳${tour.priceBDT.toLocaleString()} (${tour.durationBn})`,
                        })
                      }
                      className="p-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs cursor-pointer"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: GALLERY ITEMS ---------------- */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  ফটো গ্যালারি ({galleryItems.length}টি ছবি)
                </h2>
                <p className="text-xs text-gray-500">
                  হজ্ব, উমরাহ্ কাফেলা ও অফিস ইভেন্টের ছবি যুক্ত করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingGallery({
                    titleBn: "পবিত্র হারামাইন শরীফাইন উমরাহ্ কাফেলা",
                    category: "umrah",
                    imageUrl:
                      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
                    captionBn: "হাজীদের স্মৃতিময় মুহূর্ত",
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ছবি যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.titleBn}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {item.titleBn}
                    </p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: "gallery",
                        id: item.id,
                        title: item.titleBn || "গ্যালারি ছবি",
                        categoryOrPrice: `ক্যাটাগরি: ${item.category}`,
                      })
                    }
                    className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 shadow transition-opacity cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 6: CUSTOMER REVIEWS ---------------- */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  কাস্টমার রিভিউ ({reviews.length}টি রিভিউ)
                </h2>
                <p className="text-xs text-gray-500">
                  সফল হাজীদের প্রশংসাপত্র ও রিভিউ নিয়ন্ত্রণ করুন
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingReview({
                    nameBn: "হাজী মোঃ রফিকুল ইসলাম",
                    nameEn: "Haji Md. Rafiqul Islam",
                    locationBn: "ধানমন্ডি, ঢাকা",
                    serviceBn: "ভিআইপি উমরাহ্ প্যাকেজ",
                    rating: 5,
                    commentBn:
                      "আলহামদুলিল্লাহ, ওয়ার্ল্ড হেরিটেজ ট্রাভেলস এর তত্ত্বাবধানে উমরাহ্ অত্যন্ত সুন্দর ও সুশৃঙ্খলভাবে সম্পন্ন হয়েছে।",
                    verified: true,
                    date: "২০২৬",
                  })
                }
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন রিভিউ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-emerald-950">
                        {rev.nameBn}
                      </h4>
                      <div className="text-amber-500 text-xs font-black">
                        {"★".repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {rev.serviceBn} • {rev.locationBn}
                    </p>
                    <p className="text-xs text-gray-700 italic mt-2">
                      "{rev.commentBn}"
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => setEditingReview(rev)}
                      className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 cursor-pointer"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "review",
                          id: rev.id,
                          title: `${rev.nameBn} - এর রিভিউ`,
                          categoryOrPrice: `রেটিং: ${rev.rating}★ • ${rev.serviceBn}`,
                        })
                      }
                      className="text-xs text-red-600 bg-red-50 p-1 rounded-md border border-red-200 cursor-pointer"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 7: INQUIRIES & BOOKING LEADS ---------------- */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <h2 className="text-lg font-black text-emerald-950">
                কাস্টমার ইনকোয়ারি ও বুকিং অনুরোধ ({inquiries.length}টি মোট)
              </h2>
              <p className="text-xs text-gray-500">
                সাইটের বুকিং ফর্ম ও যোগাযোগ পেজ থেকে গ্রাহকদের পাঠানো তথ্যের
                তালিকা
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                এখনো কোনো নতুন ইনকোয়ারি আসেনি।
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="py-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900">
                          {inq.customerName}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            inq.status === "new"
                              ? "bg-red-100 text-red-700"
                              : inq.status === "contacted"
                                ? "bg-amber-100 text-amber-800"
                                : inq.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {inq.status === "new"
                            ? "নতুন রিকোয়েস্ট"
                            : inq.status === "contacted"
                              ? "যোগাযোগ করা হয়েছে"
                              : inq.status === "confirmed"
                                ? "কনফার্ম"
                                : "বাতিল"}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div>
                        📞 ফোন:{" "}
                        <a
                          href={`tel:${inq.phone}`}
                          className="font-bold text-emerald-800 hover:underline"
                        >
                          {inq.phone}
                        </a>
                      </div>
                      <div>
                        🏷️ সার্ভিস:{" "}
                        <span className="font-bold text-gray-800">
                          {inq.serviceType}{" "}
                          {inq.packageTitle ? `(${inq.packageTitle})` : ""}
                        </span>
                      </div>
                      <div>
                        👥 যাত্রী সংখ্যা:{" "}
                        <span className="font-bold text-gray-800">
                          {inq.travelersCount} জন
                        </span>
                      </div>
                    </div>

                    {inq.message && (
                      <p className="text-xs text-gray-700 bg-white p-2 rounded border border-gray-100">
                        💬 <span className="italic">{inq.message}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold bg-[#25D366] text-white px-2.5 py-1 rounded-lg hover:opacity-90 shadow-sm"
                        >
                          হোয়াটসঅ্যাপে মেসেজ
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          className="text-[11px] font-bold bg-emerald-800 text-white px-2.5 py-1 rounded-lg hover:opacity-90 shadow-sm"
                        >
                          কল করুন
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(
                              inq.id,
                              e.target.value as any,
                            )
                          }
                          className="text-xs font-semibold bg-white border border-gray-300 rounded-lg px-2 py-1 outline-none"
                        >
                          <option value="new">নতুন (New)</option>
                          <option value="contacted">
                            যোগাযোগ সম্পন্ন (Contacted)
                          </option>
                          <option value="confirmed">
                            বুকিং কনফার্ম (Confirmed)
                          </option>
                          <option value="cancelled">বাতিল (Cancelled)</option>
                        </select>

                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "inquiry",
                              id: inq.id,
                              title: `${inq.customerName} (${inq.phone}) এর ইনকোয়ারি`,
                              categoryOrPrice: `সার্ভিস: ${inq.serviceType} • যাত্রী: ${inq.travelersCount} জন`,
                            })
                          }
                          className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- TAB 8: SITE SETTINGS & MARQUEE ---------------- */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <h2 className="text-lg font-black text-emerald-950">
                ওয়েবসাইট গ্লোবাল সেটিংস ও মারকুই টেক্সট
              </h2>
              <p className="text-xs text-gray-500">
                স্ক্রলিং হাদিস, ব্রেকিং নোটিশ এবং যোগাযোগের হটলাইন তথ্য পরিবর্তন
                করুন
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-xs font-extrabold text-gray-800 mb-1">
                  মারকুই স্ক্রলিং হাদিস / আয়াত (বাংলা)
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.hadithBn}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      hadithBn: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0D472B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-800 mb-1">
                  হজ্ব ও উমরাহ্ ব্রেকিং নোটিশ বার (বাংলা)
                </label>
                <input
                  type="text"
                  value={settingsForm.noticeBn}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      noticeBn: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0D472B] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-800 mb-1">
                    প্রধান হটলাইন নম্বর
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hotline}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        hotline: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0D472B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-800 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোডসহ)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0D472B] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex items-center justify-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-3 px-6 rounded-xl font-black text-sm shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isProcessing ? "সংরক্ষণ হচ্ছে..." : "সেটিংস সেভ করুন"}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ---------------- MODAL: UMRAH EDIT / CREATE ---------------- */}
      {/* ---------------- MODAL: UMRAH EDIT / CREATE ---------------- */}
      {editingUmrah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center border border-[#D4AF37]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                    {editingUmrah.id
                      ? "উমরাহ্ প্যাকেজ এডিট করুন"
                      : "নতুন উমরাহ্ প্যাকেজ যোগ করুন"}
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    ফটো গ্যালারি, ভ্রমণসূচি, হোটেল ও সকল তথ্যাদি আপডেট করুন
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingUmrah(null)}
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form
              onSubmit={handleSaveUmrah}
              className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1"
            >
              {/* SECTION 1: BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ১. প্যাকেজের প্রাথমিক তথ্য ও মূল্য
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      প্যাকেজের নাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingUmrah.titleBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          titleBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: ১৫ দিনের এক্সক্লুসিভ উমরাহ্ প্যাকেজ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      প্যাকেজ মূল্য (BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingUmrah.priceBDT || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          priceBDT: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: 135000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      স্থায়িত্ব (Duration বাংলা)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.durationBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          durationBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-medium"
                      placeholder="১৫ দিন"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ব্যাজ / অফার ট্যাগ
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.badgeBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          badgeBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="যেমন: জনপ্রিয় অফার / রমজান স্পেশাল"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={editingUmrah.featured ?? false}
                        onChange={(e) =>
                          setEditingUmrah({
                            ...editingUmrah,
                            featured: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-emerald-700 rounded"
                      />
                      <span>হোমপেজে ফিচার্ড প্যাকেজ হিসেবে দেখান</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    প্যাকেজ সারসংক্ষেপ ও বিস্তারিত বর্ণনা (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingUmrah.descriptionBn || ""}
                    onChange={(e) =>
                      setEditingUmrah({
                        ...editingUmrah,
                        descriptionBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                    placeholder="প্যাকেজের আকর্ষণীয় সংক্ষিপ্ত বিবরণ..."
                  />
                </div>
              </div>

              {/* SECTION 2: HOTELS & DISTANCES */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ২. মক্কা ও মদিনা হোটেল, অবস্থান ও থাকার মেয়াদ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কা হোটেল
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.makkahHotelBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          makkahHotelBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৩/৪ স্টার হোটেল"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কার দূরত্ব (হারাম শরীফ)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.makkahDistanceBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          makkahDistanceBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৩০০ মিটার"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কায় অবস্থান (দিন)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.makkahStayDaysBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          makkahStayDaysBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৮ দিন"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনা হোটেল
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.madinahHotelBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          madinahHotelBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৩/৪ স্টার হোটেল"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনার দূরত্ব (মসজিদে নববী)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.madinahDistanceBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          madinahDistanceBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="২০০ মিটার"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনায় অবস্থান (দিন)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.madinahStayDaysBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          madinahStayDaysBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৭ দিন"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      খাবার ব্যবস্থা (Food)
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.foodBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          foodBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৩ বেলা সুস্বাদু দেশি খাবার"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      পরিবহন ও জিয়ারাহ্
                    </label>
                    <input
                      type="text"
                      value={editingUmrah.transportBn || ""}
                      onChange={(e) =>
                        setEditingUmrah({
                          ...editingUmrah,
                          transportBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="এসি বাস পরিবহন ও ঐতিহাসিক জিয়ারাহ্"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: MULTI-IMAGE GALLERY MANAGER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৩. মাল্টিপল ফটো গ্যালারি ও ফটো নির্বাচন
                </h4>
                <MultiImageManager
                  mainImage={editingUmrah.image || ""}
                  galleryImages={editingUmrah.galleryImages || []}
                  onChangeMainImage={(url) =>
                    setEditingUmrah({ ...editingUmrah, image: url })
                  }
                  onChangeGallery={(urls) =>
                    setEditingUmrah({ ...editingUmrah, galleryImages: urls })
                  }
                  serviceType="umrah"
                />
              </div>

              {/* SECTION 4: DAY-BY-DAY ITINERARY BUILDER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৪. কোথায় কি, কিভাবে ও কত দিন (দিনভিত্তিক বিস্তারিত ভ্রমণসূচি)
                </h4>
                <ItineraryBuilder
                  itinerary={editingUmrah.itinerary || []}
                  onChangeItinerary={(itinerary) =>
                    setEditingUmrah({ ...editingUmrah, itinerary })
                  }
                  packageType="umrah"
                />
              </div>

              {/* SECTION 5: INCLUSIONS & EXCLUSIONS */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৫. সুবিধাসমূহ, বহির্ভূত বিষয় ও নির্দেশনাবলী
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ListManager
                    label="প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ (Inclusions)"
                    items={editingUmrah.inclusionsBn || []}
                    onChange={(inclusionsBn) =>
                      setEditingUmrah({ ...editingUmrah, inclusionsBn })
                    }
                    suggestions={[
                      "উমরাহ্ ভিসা ও ইন্স্যুরেন্স",
                      "রিটার্ন এয়ার টিকিট",
                      "৩ বেলা দেশি খাবার",
                      "অভিজ্ঞ মোয়াল্লেম গাইড",
                      "মক্কা ও মদিনা জিয়ারাহ্",
                      "৫ লিটার জমজম পানি",
                    ]}
                    themeColor="emerald"
                  />
                  <ListManager
                    label="প্যাকেজ বহির্ভূত খরচ (Exclusions)"
                    items={editingUmrah.exclusionsBn || []}
                    onChange={(exclusionsBn) =>
                      setEditingUmrah({ ...editingUmrah, exclusionsBn })
                    }
                    suggestions={[
                      "ব্যক্তিগত কেনাকাটা",
                      "অতিরিক্ত লাগেজ ফি",
                      "হোটেল রুম সার্ভিস",
                      "টিপস",
                    ]}
                    themeColor="rose"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <div>
                  {editingUmrah.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = editingUmrah.id!;
                        const title = editingUmrah.titleBn || "উমরাহ্ প্যাকেজ";
                        const details = `মূল্য: ৳${Number(editingUmrah.priceBDT || 0).toLocaleString()} • মেয়াদ: ${editingUmrah.durationBn || ""}`;
                        setEditingUmrah(null);
                        setDeleteTarget({
                          type: "umrah",
                          id,
                          title,
                          categoryOrPrice: details,
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>প্যাকেজটি ডিলিট করুন</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingUmrah(null)}
                    className="px-5 py-2.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-7 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs sm:text-sm rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800 cursor-pointer"
                  >
                    {isProcessing
                      ? "সেভ হচ্ছে..."
                      : "উমরাহ্ প্যাকেজ সফলভাবে সেভ করুন"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: HAJJ EDIT / CREATE ---------------- */}
      {editingHajj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center border border-[#D4AF37]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                    {editingHajj.id
                      ? "হজ্ব প্যাকেজ এডিট করুন"
                      : "নতুন হজ্ব প্যাকেজ যোগ করুন"}
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    হজ্ব ভ্রমণসূচি, মিনা-আরাফাত ক্যাম্প, হারামাইন ট্রেন ও ফটো
                    গ্যালারি
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingHajj(null)}
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form
              onSubmit={handleSaveHajj}
              className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1"
            >
              {/* SECTION 1: BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ১. হজ্ব প্যাকেজের প্রাথমিক তথ্য ও ফিস
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      হজ্ব প্যাকেজের নাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingHajj.titleBn || ""}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          titleBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: পবিত্র হজ্ব ২০২৭ ভিআইপি প্যাকেজ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মোট প্যাকেজ মূল্য (BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingHajj.totalPriceBDT || ""}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          totalPriceBDT: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: 650000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      প্রাক-নিবন্ধন ফি (BDT)
                    </label>
                    <input
                      type="number"
                      value={editingHajj.regFeeBDT || 30000}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          regFeeBDT: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      হজ্ব বছর (Year)
                    </label>
                    <input
                      type="number"
                      value={editingHajj.year || 2027}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          year: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      স্থায়িত্ব (Duration)
                    </label>
                    <input
                      type="text"
                      value={editingHajj.durationBn || "৪০-৪২ দিন"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          durationBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      প্যাকেজ ক্যাটাগরি
                    </label>
                    <input
                      type="text"
                      value={editingHajj.packageCategoryBn || "ভিআইপি লাক্সারি"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          packageCategoryBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                      placeholder="ভিআইপি লাক্সারি / স্ট্যান্ডার্ড"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      নিবন্ধন স্ট্যাটাস
                    </label>
                    <input
                      type="text"
                      value={
                        editingHajj.registrationStatusBn ||
                        "সরকারি প্রাক-নিবন্ধন চলছে"
                      }
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          registrationStatusBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="সরকারি প্রাক-নিবন্ধন চলছে"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    হজ্ব প্যাকেজের আকর্ষণীয় বর্ণনা (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingHajj.descriptionBn || ""}
                    onChange={(e) =>
                      setEditingHajj({
                        ...editingHajj,
                        descriptionBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                    placeholder="হজ্ব প্যাকেজের সার্বিক বিবরণ..."
                  />
                </div>
              </div>

              {/* SECTION 2: HOTELS, MINA & BULLET TRAIN */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ২. হোটেল, মিনা-আরাফাত তাঁবু ও পরিবহন
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কা হোটেল
                    </label>
                    <input
                      type="text"
                      value={editingHajj.makkahHotelBn || ""}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          makkahHotelBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৪/৫ স্টার হোটেল"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কার দূরত্ব
                    </label>
                    <input
                      type="text"
                      value={editingHajj.makkahDistanceBn || "২০০ মিটার"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          makkahDistanceBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মক্কায় অবস্থান (দিন)
                    </label>
                    <input
                      type="text"
                      value={editingHajj.makkahStayDaysBn || "২৪ দিন"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          makkahStayDaysBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনা হোটেল
                    </label>
                    <input
                      type="text"
                      value={editingHajj.madinahHotelBn || ""}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          madinahHotelBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                      placeholder="৪/৫ স্টার হোটেল"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনার দূরত্ব
                    </label>
                    <input
                      type="text"
                      value={editingHajj.madinahDistanceBn || "১০০ মিটার"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          madinahDistanceBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মদিনায় অবস্থান (দিন)
                    </label>
                    <input
                      type="text"
                      value={editingHajj.madinahStayDaysBn || "১০ দিন"}
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          madinahStayDaysBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মিনা-আরাফাত ভিআইপি তাঁবু সেবা
                    </label>
                    <input
                      type="text"
                      value={
                        editingHajj.minaArafatBn ||
                        "মিনা-আরাফাত ভিআইপি এসি তাঁবু সেবা ও সার্বক্ষণিক খাবার"
                      }
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          minaArafatBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      হারামাইন বুলেট ট্রেন ও এসি পরিবহন
                    </label>
                    <input
                      type="text"
                      value={
                        editingHajj.bulletTrainBn ||
                        "হারামাইন হাই-স্পিড বুলেট ট্রেনে মক্কা-মদিনা যাতায়াত"
                      }
                      onChange={(e) =>
                        setEditingHajj({
                          ...editingHajj,
                          bulletTrainBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    হজ্ব উপহার সামগ্রী (Gifts Included)
                  </label>
                  <input
                    type="text"
                    value={
                      editingHajj.giftItemsBn ||
                      "ইহরামের কাপড়, ট্রলি ব্যাগ, পিঠের ব্যাগ, জুতার ব্যাগ, পাসপোর্ট ব্যাগ ও হজ্ব গাইড বই"
                    }
                    onChange={(e) =>
                      setEditingHajj({
                        ...editingHajj,
                        giftItemsBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* SECTION 3: MULTI-IMAGE GALLERY MANAGER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৩. হজ্ব ফটো গ্যালারি ও কভার ছবি
                </h4>
                <MultiImageManager
                  mainImage={editingHajj.image || ""}
                  galleryImages={editingHajj.galleryImages || []}
                  onChangeMainImage={(url) =>
                    setEditingHajj({ ...editingHajj, image: url })
                  }
                  onChangeGallery={(urls) =>
                    setEditingHajj({ ...editingHajj, galleryImages: urls })
                  }
                  serviceType="hajj"
                />
              </div>

              {/* SECTION 4: DAY-BY-DAY HAJJ ITINERARY BUILDER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৪. হজ্বের দিনভিত্তিক বিস্তারিত কর্মসূচি (মিনা, আরাফাত,
                  মুজদালিফা ও মদিনা)
                </h4>
                <ItineraryBuilder
                  itinerary={editingHajj.itinerary || []}
                  onChangeItinerary={(itinerary) =>
                    setEditingHajj({ ...editingHajj, itinerary })
                  }
                  packageType="hajj"
                />
              </div>

              {/* SECTION 5: INCLUSIONS & EXCLUSIONS */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৫. হজ্ব প্যাকেজের সুবিধাসমূহ ও শর্তাবলী
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ListManager
                    label="হজ্ব প্যাকেজের সুবিধাসমূহ (Inclusions)"
                    items={editingHajj.inclusionsBn || []}
                    onChange={(inclusionsBn) =>
                      setEditingHajj({ ...editingHajj, inclusionsBn })
                    }
                    suggestions={[
                      "হজ্ব ভিসা ও ড্রাফট ফি",
                      "ডিরেক্ট ফ্লাইট টিকিট",
                      "মিনা ও আরাফাত ক্যাম্প সেবা",
                      "৩ বেলা বুফে খাবার",
                      "হারামাইন বুলেট ট্রেন",
                      "অভিজ্ঞ মোয়াল্লেম ও আলেম গাইড",
                      "হজ্ব উপহার সামগ্রী",
                    ]}
                    themeColor="emerald"
                  />
                  <ListManager
                    label="হজ্ব প্যাকেজ বহির্ভূত বিষয় (Exclusions)"
                    items={editingHajj.exclusionsBn || []}
                    onChange={(exclusionsBn) =>
                      setEditingHajj({ ...editingHajj, exclusionsBn })
                    }
                    suggestions={["ব্যক্তিগত কেনাকাটা", "অতিরিক্ত লাগেজ চার্জ"]}
                    themeColor="rose"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <div>
                  {editingHajj.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = editingHajj.id!;
                        const title = editingHajj.titleBn || "হজ্ব প্যাকেজ";
                        const details = `হজ্ব সাল: ${editingHajj.year || 2027} • মোট প্যাকেজ: ৳${Number(editingHajj.totalPriceBDT || 0).toLocaleString()}`;
                        setEditingHajj(null);
                        setDeleteTarget({
                          type: "hajj",
                          id,
                          title,
                          categoryOrPrice: details,
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>প্যাকেজটি ডিলিট করুন</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingHajj(null)}
                    className="px-5 py-2.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-7 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs sm:text-sm rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800 cursor-pointer"
                  >
                    {isProcessing
                      ? "সেভ হচ্ছে..."
                      : "হজ্ব প্যাকেজ সফলভাবে সেভ করুন"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: TOUR EDIT / CREATE ---------------- */}
      {editingTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center border border-[#D4AF37]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                    {editingTour.id
                      ? "ট্যুর প্যাকেজ এডিট করুন"
                      : "নতুন ট্যুর ও ভিসা প্যাকেজ যোগ করুন"}
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    আন্তর্জাতিক ও অভ্যন্তরীণ ট্যুর, সাইটসিয়িং ও হোটেল প্যাকেজ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingTour(null)}
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form
              onSubmit={handleSaveTour}
              className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1"
            >
              {/* SECTION 1: BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ১. ট্যুরের সাধারণ তথ্য ও মূল্য
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ট্যুর শিরোনাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTour.titleBn || ""}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          titleBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: দুবাই ও আবুধাবি সিটি ট্যুর"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      প্যাকেজ মূল্য (BDT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingTour.priceBDT || ""}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          priceBDT: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                      placeholder="যেমন: 85000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      দেশ / গন্তব্য (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTour.countryBn || ""}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          countryBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-medium"
                      placeholder="যেমন: সংযুক্ত আরব আমিরাত / থাইল্যান্ড"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      স্থায়িত্ব (Duration)
                    </label>
                    <input
                      type="text"
                      value={editingTour.durationBn || ""}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          durationBn: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-medium"
                      placeholder="৫ দিন ৪ রাত"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={editingTour.category || "international"}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full p-2.5 border rounded-xl text-xs font-medium"
                    >
                      <option value="international">
                        আন্তর্জাতিক ট্যুর (International)
                      </option>
                      <option value="domestic">
                        অভ্যন্তরীণ ভ্রমণ (Domestic)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ট্যুরের বিস্তারিত বর্ণনা (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingTour.descriptionBn || ""}
                    onChange={(e) =>
                      setEditingTour({
                        ...editingTour,
                        descriptionBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                    placeholder="ট্যুরের অভিজ্ঞতা ও আকর্ষণসমূহ..."
                  />
                </div>
              </div>

              {/* SECTION 2: MULTI-IMAGE GALLERY MANAGER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ২. ট্যুর ফটো গ্যালারি ও কভার ছবি
                </h4>
                <MultiImageManager
                  mainImage={editingTour.image || ""}
                  galleryImages={editingTour.galleryImages || []}
                  onChangeMainImage={(url) =>
                    setEditingTour({ ...editingTour, image: url })
                  }
                  onChangeGallery={(urls) =>
                    setEditingTour({ ...editingTour, galleryImages: urls })
                  }
                  serviceType="tour"
                />
              </div>

              {/* SECTION 3: DAY-BY-DAY ITINERARY BUILDER */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৩. দিনভিত্তিক আকর্ষণীয় সাইটসিয়িং ও ভ্রমণসূচি
                </h4>
                <ItineraryBuilder
                  itinerary={editingTour.itinerary || []}
                  onChangeItinerary={(itinerary) =>
                    setEditingTour({ ...editingTour, itinerary })
                  }
                  packageType="tour"
                />
              </div>

              {/* SECTION 4: HIGHLIGHTS & INCLUSIONS */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  ৪. প্রধান আকর্ষণ, ইনক্লুশন ও এক্সক্লুশন
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <ListManager
                    label="প্রধান আকর্ষণ (Highlights)"
                    items={editingTour.highlightsBn || []}
                    onChange={(highlightsBn) =>
                      setEditingTour({ ...editingTour, highlightsBn })
                    }
                    suggestions={[
                      "বুর্জ খলিফা দর্শন",
                      "ডেজার্ট সাফারি",
                      "মেরিনা ক্রুজ",
                      "লাক্সারি হোটেল স্টে",
                      "রিটার্ন এয়ার টিকিট",
                    ]}
                    themeColor="amber"
                  />
                  <ListManager
                    label="অন্তর্ভুক্ত সুবিধাসমূহ (Inclusions)"
                    items={editingTour.inclusionsBn || []}
                    onChange={(inclusionsBn) =>
                      setEditingTour({ ...editingTour, inclusionsBn })
                    }
                    suggestions={[
                      "রিটার্ন এয়ার টিকিট",
                      "৩/৪ তারকা হোটেল রুম",
                      "প্রতিদিনের বুফে প্রাতরাশ",
                      "এয়ারপোর্ট পিক অ্যান্ড ড্রপ",
                      "সাইটসিয়িং",
                    ]}
                    themeColor="emerald"
                  />
                  <ListManager
                    label="বহির্ভূত খরচ (Exclusions)"
                    items={editingTour.exclusionsBn || []}
                    onChange={(exclusionsBn) =>
                      setEditingTour({ ...editingTour, exclusionsBn })
                    }
                    suggestions={[
                      "ব্যক্তিগত কেনাকাটা",
                      "লাঞ্চ ও ডিনার (যেখানে উল্লেখ নেই)",
                      "ভিসা ফি",
                    ]}
                    themeColor="rose"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <div>
                  {editingTour.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = editingTour.id!;
                        const title = editingTour.titleBn || "ট্যুর প্যাকেজ";
                        const details = `${editingTour.countryBn || ""} • মূল্য: ৳${Number(editingTour.priceBDT || 0).toLocaleString()}`;
                        setEditingTour(null);
                        setDeleteTarget({
                          type: "tour",
                          id,
                          title,
                          categoryOrPrice: details,
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>প্যাকেজটি ডিলিট করুন</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTour(null)}
                    className="px-5 py-2.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-7 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs sm:text-sm rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800 cursor-pointer"
                  >
                    {isProcessing ? "সেভ হচ্ছে..." : "ট্যুর প্যাকেজ সেভ করুন"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: BLOG EDIT / CREATE ---------------- */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0D472B] text-[#F3E0A0] flex items-center justify-center border border-[#D4AF37]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                    {editingBlog.id
                      ? "ব্লগ পোস্ট এডিট করুন"
                      : "নতুন ব্লগ বা গাইড পোস্ট লিখুন"}
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    হজ্ব ও উমরাহ্ গাইড, ভিসা পরামর্শ ও ইসলামী দিকনির্দেশনা
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form
              onSubmit={handleSaveBlog}
              className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  পোস্টের শিরোনাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.titleBn || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, titleBn: e.target.value })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                  placeholder="যেমন: উমরাহ্ পালনের সঠিক ও সহজ নিয়মাবলী"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={editingBlog.categoryBn || "উমরাহ্ নির্দেশিকা"}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        categoryBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs"
                  >
                    <option value="উমরাহ্ নির্দেশিকা">উমরাহ্ নির্দেশিকা</option>
                    <option value="হজ্ব নির্দেশিকা">হজ্ব নির্দেশিকা</option>
                    <option value="ভ্রমণ পরামর্শ ও টিপস">
                      ভ্রমণ পরামর্শ ও টিপস
                    </option>
                    <option value="ভিসা ও টিকিট সংক্রান্ত">
                      ভিসা ও টিকিট সংক্রান্ত
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    লেখকের নাম
                  </label>
                  <input
                    type="text"
                    value={editingBlog.authorBn || ""}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        authorBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="মুফতী মাওলানা কাফেল প্রধান"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  সংক্ষিপ্ত বিবরণ (Summary)
                </label>
                <input
                  type="text"
                  value={editingBlog.summaryBn || ""}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      summaryBn: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs"
                  placeholder="এক নজরে আর্টিকেলের সারসংক্ষেপ..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  মূল কনটেন্ট / বিস্তারিত আর্টিকেল *
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingBlog.contentBn || ""}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      contentBn: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                  placeholder="এখানে আপনার বিস্তারিত পোস্ট লিখুন..."
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#0D472B] uppercase tracking-wider border-b pb-1">
                  পোস্টের কাভার ছবি ও ফটো গ্যালারি
                </h4>
                <MultiImageManager
                  mainImage={editingBlog.image || ""}
                  galleryImages={editingBlog.galleryImages || []}
                  onChangeMainImage={(url) =>
                    setEditingBlog({ ...editingBlog, image: url })
                  }
                  onChangeGallery={(urls) =>
                    setEditingBlog({ ...editingBlog, galleryImages: urls })
                  }
                  serviceType="blog"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <div>
                  {editingBlog.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = editingBlog.id!;
                        const title = editingBlog.titleBn || "ব্লগ পোস্ট";
                        const details = `ক্যাটাগরি: ${editingBlog.categoryBn || ""}`;
                        setEditingBlog(null);
                        setDeleteTarget({
                          type: "blog",
                          id,
                          title,
                          categoryOrPrice: details,
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>পোস্টটি ডিলিট করুন</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-5 py-2.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-7 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs sm:text-sm rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800 cursor-pointer"
                  >
                    {isProcessing ? "পাবলিশ হচ্ছে..." : "পোস্ট পাবলিশ করুন"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: GALLERY EDIT / CREATE ---------------- */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <h3 className="font-black text-sm text-[#F3E0A0]">
                গ্যালারিতে নতুন ছবি যোগ করুন
              </h3>
              <button
                onClick={() => setEditingGallery(null)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ছবির শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={editingGallery.titleBn || ""}
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      titleBn: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={editingGallery.category || "umrah"}
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs"
                >
                  <option value="umrah">উমরাহ্ কাফেলা</option>
                  <option value="hajj">পবিত্র হজ্ব</option>
                  <option value="office">পান্থপথ অফিস</option>
                  <option value="group">গ্রুপ ফটো</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ছবির ওয়েব লিঙ্ক (Image URL) *
                </label>
                <input
                  type="text"
                  required
                  value={editingGallery.imageUrl || ""}
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-[#0D472B] text-[#F3E0A0] font-black text-xs rounded-xl border border-[#D4AF37] shadow-md"
                >
                  {isProcessing ? "সেভ হচ্ছে..." : "ছবি সেভ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: REVIEW EDIT / CREATE ---------------- */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <h3 className="font-black text-sm text-[#F3E0A0]">
                কাস্টমার রিভিউ যোগ/এডিট করুন
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  হাজীর নাম *
                </label>
                <input
                  type="text"
                  required
                  value={editingReview.nameBn || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      nameBn: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ঠিকানা / এলাকা
                  </label>
                  <input
                    type="text"
                    value={editingReview.locationBn || ""}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        locationBn: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="পান্থপথ, ঢাকা"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    রেটিং (১-৫ স্টার)
                  </label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) =>
                      setEditingReview({
                        ...editingReview,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 border rounded-xl text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ স্টার)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ স্টার)</option>
                    <option value={3}>⭐⭐⭐ (৩ স্টার)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  মতামত / রিভিউ বক্তব্য *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingReview.commentBn || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      commentBn: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t">
                <div>
                  {editingReview.id && (
                    <button
                      type="button"
                      onClick={() => {
                        const id = editingReview.id!;
                        const title = `${editingReview.nameBn || "রিভিউ"} - এর মতামত`;
                        const details = `রেটিং: ${editingReview.rating || 5}★ • ${editingReview.serviceBn || ""}`;
                        setEditingReview(null);
                        setDeleteTarget({
                          type: "review",
                          id,
                          title,
                          categoryOrPrice: details,
                        });
                      }}
                      className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ডিলিট</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-5 py-2 bg-[#0D472B] text-[#F3E0A0] font-black text-xs rounded-xl border border-[#D4AF37] shadow-md"
                  >
                    {isProcessing ? "সেভ হচ্ছে..." : "রিভিউ সেভ করুন"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: SAFE DELETE CONFIRMATION ---------------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-red-500 overflow-hidden transform transition-all">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-red-700 to-red-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <AlertTriangle className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    {deleteTarget.type === "seed"
                      ? "ডাটাবেজ সিংক নিশ্চিতকরণ"
                      : "স্থায়ীভাবে ডিলিট নিশ্চিতকরণ"}
                  </h3>
                  <p className="text-xs text-red-100">
                    {deleteTarget.type === "seed"
                      ? "ক্লাউড ফায়ারবেসে ডিফল্ট ডাটা যুক্ত করার পূর্বে নিশ্চিত করুন"
                      : "ভুলবশত ডিলিট হওয়া রোধে কনফার্মেশন বাটন যুক্ত করা হয়েছে"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => !isProcessing && setDeleteTarget(null)}
                disabled={isProcessing}
                className="p-1.5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-colors"
                title="বাতিল করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">সতর্কবার্তা ও নির্দেশিকা:</p>
                  <p className="text-amber-800 mt-0.5">
                    {deleteTarget.type === "seed"
                      ? "এটি ক্লাউড ফায়ারবেসে সমস্ত প্রাথমিক ডিফল্ট প্যাকেজ ও তথ্য আপলোড করবে।"
                      : 'আপনি কি নিশ্চিত যে নিচের আইটেমটি স্থায়ীভাবে ডিলিট করতে চান? নিচের "হ্যাঁ, নিশ্চিতভাবে মুছে ফেলুন" বাটনে ক্লিক করলেই ডাটাবেজ ও ওয়েবসাইট থেকে এটি মুছে যাবে।'}
                  </p>
                </div>
              </div>

              {/* Item Preview Card */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {deleteTarget.type === "umrah"
                      ? "উমরাহ্ প্যাকেজ"
                      : deleteTarget.type === "hajj"
                        ? "হজ্ব প্যাকেজ"
                        : deleteTarget.type === "blog"
                          ? "ব্লগ পোস্ট"
                          : deleteTarget.type === "tour"
                            ? "ট্যুর প্যাকেজ"
                            : deleteTarget.type === "gallery"
                              ? "গ্যালারি ফটো"
                              : deleteTarget.type === "review"
                                ? "কাস্টমার রিভিউ"
                                : deleteTarget.type === "inquiry"
                                  ? "কাস্টমার ইনকোয়ারি"
                                  : "ডাটাবেজ সিংক"}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    ID: {deleteTarget.id}
                  </span>
                </div>

                <h4 className="font-black text-sm sm:text-base text-gray-900 pt-1">
                  {deleteTarget.title}
                </h4>

                {deleteTarget.categoryOrPrice && (
                  <p className="text-xs font-semibold text-emerald-800">
                    {deleteTarget.categoryOrPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Footer Controls */}
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isProcessing}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                না, বাতিল করুন
              </button>

              <button
                type="button"
                onClick={handleExecuteDelete}
                disabled={isProcessing}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg transition-all cursor-pointer ${
                  deleteTarget.type === "seed"
                    ? "bg-emerald-800 hover:bg-emerald-900 border border-[#D4AF37]"
                    : "bg-red-600 hover:bg-red-700 border border-red-700"
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>প্রক্রিয়াধীন...</span>
                  </>
                ) : deleteTarget.type === "seed" ? (
                  <>
                    <Database className="w-4 h-4" />
                    <span>হ্যাঁ, ডাটাবেজ সিংক করুন</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>হ্যাঁ, নিশ্চিতভাবে মুছে ফেলুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
