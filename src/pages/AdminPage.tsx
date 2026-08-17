import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
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
  FileText
} from 'lucide-react';
import { 
  Language, 
  UmrahPackage, 
  HajjPackage, 
  TourPackage, 
  BlogPost, 
  GalleryItem, 
  Review, 
  BookingInquiry, 
  AgencyInfo 
} from '../types';
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
  SiteSettingsData
} from '../services/firestoreService';

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
  onRefreshData?: () => void;
}

type AdminTab = 'umrah' | 'hajj' | 'blog' | 'tours' | 'gallery' | 'reviews' | 'inquiries' | 'settings';

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
}) => {
  // Authentication State (Passcode default: admin786 / worldheritage)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wh_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('umrah');
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Modals for editing / creating
  const [editingUmrah, setEditingUmrah] = useState<Partial<UmrahPackage> | null>(null);
  const [editingHajj, setEditingHajj] = useState<Partial<HajjPackage> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingTour, setEditingTour] = useState<Partial<TourPackage> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettingsData>({
    hadithBn: siteSettings?.hadithBn || 'রাসূলুল্লাহ (সা.) বলেছেন: "এক উমরাহ্ থেকে অপর উমরাহ্ মধ্যবর্তী সকল গুনাহের কাফফারা।" (বুখারী ও মুসলিম)',
    hadithEn: siteSettings?.hadithEn || 'The Prophet (pbuh) said: "One Umrah to the next is an expiation for the sins committed between them."',
    noticeBn: siteSettings?.noticeBn || 'পবিত্র হজ্ব ২০২৭ এর প্রাক-নিবন্ধন চলছে মাত্র ৩০,০০০ টাকায়। আজই যোগাযোগ করুন।',
    noticeEn: siteSettings?.noticeEn || 'Holy Hajj 2027 pre-registration is ongoing with only 30,000 BDT. Contact us today.',
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

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcodes: 'admin786', '123456', or 'worldheritage'
    if (passcode === 'admin786' || passcode === 'worldheritage' || passcode === '123456') {
      setIsAuthenticated(true);
      localStorage.setItem('wh_admin_auth', 'true');
      setAuthError('');
      showToast('success', 'এডমিন প্যানেলে সফলভাবে লগইন হয়েছে!');
    } else {
      setAuthError('ভুল পাসকোড! অনুগ্রহ করে সঠিক এডমিন পাসকোড লিখুন (যেমন: admin786)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wh_admin_auth');
    showToast('success', 'লগআউট সম্পন্ন হয়েছে।');
  };

  // Seed Data to Firestore
  const handleSeedData = async () => {
    if (!window.confirm('আপনি কি ডিফল্ট প্যাকেজ ও পোস্ট ডাটা ক্লাউড ফায়ারবেস ডাটাবেজে আপলোড/সিংক করতে চান?')) return;
    setIsProcessing(true);
    const res = await seedAllDefaultDataToFirestore();
    setIsProcessing(false);
    if (res.success) {
      showToast('success', res.message);
    } else {
      showToast('error', res.message);
    }
  };

  // --- CRUD HANDLERS ---
  const handleSaveUmrah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUmrah?.titleBn || !editingUmrah?.priceBDT) {
      alert('অনুগ্রহ করে প্যাকেজের নাম ও মূল্য সঠিকভাবে পূরণ করুন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveUmrahPackage({
        id: editingUmrah.id || '',
        titleBn: editingUmrah.titleBn || '',
        titleEn: editingUmrah.titleEn || editingUmrah.titleBn,
        badgeBn: editingUmrah.badgeBn || '',
        badgeEn: editingUmrah.badgeEn || '',
        durationBn: editingUmrah.durationBn || '১৫ দিন',
        durationEn: editingUmrah.durationEn || '15 Days',
        makkahHotelBn: editingUmrah.makkahHotelBn || '৩ স্টার হোটেল',
        makkahHotelEn: editingUmrah.makkahHotelEn || '3 Star Hotel',
        makkahDistanceBn: editingUmrah.makkahDistanceBn || '৩০০ মিটার',
        makkahDistanceEn: editingUmrah.makkahDistanceEn || '300m',
        madinahHotelBn: editingUmrah.madinahHotelBn || '৩ স্টার হোটেল',
        madinahHotelEn: editingUmrah.madinahHotelEn || '3 Star Hotel',
        madinahDistanceBn: editingUmrah.madinahDistanceBn || '২০০ মিটার',
        madinahDistanceEn: editingUmrah.madinahDistanceEn || '200m',
        foodBn: editingUmrah.foodBn || '৩ বেলা সুস্বাদু দেশি খাবার',
        foodEn: editingUmrah.foodEn || '3 Meals daily',
        transportBn: editingUmrah.transportBn || 'এসি বাস পরিবহন',
        transportEn: editingUmrah.transportEn || 'AC Bus Service',
        ziyaraBn: editingUmrah.ziyaraBn || 'মক্কা ও মদিনার ঐতিহাসিক স্থান পরিদর্শন',
        ziyaraEn: editingUmrah.ziyaraEn || 'Historical Ziyarah included',
        visaAndTicketBn: editingUmrah.visaAndTicketBn || 'উমরাহ্ ভিসা ও রিটার্ন এয়ার টিকিটসহ',
        visaAndTicketEn: editingUmrah.visaAndTicketEn || 'Visa & Return Air Ticket included',
        priceBDT: Number(editingUmrah.priceBDT),
        featured: editingUmrah.featured ?? false,
        image: editingUmrah.image || 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
        inclusionsBn: editingUmrah.inclusionsBn || ['উমরাহ্ ভিসা', 'রিটার্ন এয়ার টিকিট', '৩ বেলা দেশি খাবার', 'গাইড সেবা'],
        inclusionsEn: editingUmrah.inclusionsEn || ['Umrah Visa', 'Return Flight', 'Daily Meals', 'Guide Service'],
      });
      setEditingUmrah(null);
      showToast('success', 'উমরাহ্ প্যাকেজ সফলভাবে সেভ হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteUmrah = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই উমরাহ্ প্যাকেজটি মুছে ফেলতে চান?')) return;
    try {
      await deleteUmrahPackage(id);
      showToast('success', 'উমরাহ্ প্যাকেজ মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Hajj Save
  const handleSaveHajj = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHajj?.titleBn || !editingHajj?.totalPriceBDT) {
      alert('অনুগ্রহ করে প্যাকেজের নাম ও মূল্য সঠিকভাবে পূরণ করুন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveHajjPackage({
        id: editingHajj.id || '',
        titleBn: editingHajj.titleBn || '',
        titleEn: editingHajj.titleEn || editingHajj.titleBn,
        packageCategoryBn: editingHajj.packageCategoryBn || 'স্ট্যান্ডার্ড',
        packageCategoryEn: editingHajj.packageCategoryEn || 'Standard',
        badgeBn: editingHajj.badgeBn || '',
        badgeEn: editingHajj.badgeEn || '',
        year: Number(editingHajj.year) || 2027,
        durationBn: editingHajj.durationBn || '৪০-৪২ দিন',
        durationEn: editingHajj.durationEn || '40-42 Days',
        regFeeBDT: Number(editingHajj.regFeeBDT) || 30000,
        totalPriceBDT: Number(editingHajj.totalPriceBDT),
        flightTypeBn: editingHajj.flightTypeBn || 'সরাসরি সাউদিয়া / বিমান বাংলাদেশ',
        flightTypeEn: editingHajj.flightTypeEn || 'Direct Flight',
        qurbaniBn: editingHajj.qurbaniBn || 'প্যাকেজের অন্তর্ভুক্ত',
        qurbaniEn: editingHajj.qurbaniEn || 'Included in Package',
        makkahHotelBn: editingHajj.makkahHotelBn || '৪ স্টার হোটেল',
        makkahHotelEn: editingHajj.makkahHotelEn || '4 Star Hotel',
        madinahHotelBn: editingHajj.madinahHotelBn || '৪ স্টার হোটেল',
        madinahHotelEn: editingHajj.madinahHotelEn || '4 Star Hotel',
        foodBn: editingHajj.foodBn || '৩ বেলা বুফে দেশি খাবার',
        foodEn: editingHajj.foodEn || 'Buffet Meals',
        transportBn: editingHajj.transportBn || 'ভিআইপি এসি বাস ও হারামাইন বুলেট ট্রেন',
        transportEn: editingHajj.transportEn || 'VIP AC Bus & Haramain Train',
        moallemBn: editingHajj.moallemBn || 'অভিজ্ঞ মুয়াল্লিম ও আলেম টিম',
        moallemEn: editingHajj.moallemEn || 'Experienced Moallem Guide',
        registrationStatusBn: editingHajj.registrationStatusBn || 'প্রাক-নিবন্ধন চলছে',
        registrationStatusEn: editingHajj.registrationStatusEn || 'Registration Open',
        facilitiesBn: editingHajj.facilitiesBn || ['সরকারি প্রাক-নিবন্ধন', 'মিনা-আরাফাত ক্যাম্প সেবা', '৩ বেলা দেশি খাবার', 'অভিজ্ঞ গাইড'],
        facilitiesEn: editingHajj.facilitiesEn || ['Govt. Pre-registration', 'Mina-Arafat Camp', 'Daily Meals', 'Experienced Guide'],
        image: editingHajj.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80',
      });
      setEditingHajj(null);
      showToast('success', 'হজ্ব প্যাকেজ সফলভাবে সেভ হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteHajj = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই হজ্ব প্যাকেজটি মুছে ফেলতে চান?')) return;
    try {
      await deleteHajjPackage(id);
      showToast('success', 'হজ্ব প্যাকেজ মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Blog Save
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.titleBn || !editingBlog?.contentBn) {
      alert('অনুগ্রহ করে ব্লগের শিরোনাম ও মূল বক্তব্য লিখুন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveBlogPost({
        id: editingBlog.id || '',
        titleBn: editingBlog.titleBn || '',
        titleEn: editingBlog.titleEn || editingBlog.titleBn,
        categoryBn: editingBlog.categoryBn || 'উমরাহ্ গাইড',
        categoryEn: editingBlog.categoryEn || 'Umrah Guide',
        categoryKey: editingBlog.categoryKey || 'umrah-guide',
        date: editingBlog.date || new Date().toISOString().split('T')[0],
        authorBn: editingBlog.authorBn || 'মুফতী মাওলানা কাফেল প্রধান',
        authorEn: editingBlog.authorEn || 'World Heritage Guide',
        summaryBn: editingBlog.summaryBn || editingBlog.contentBn.slice(0, 120) + '...',
        summaryEn: editingBlog.summaryEn || 'Travel guideline and Islamic advice...',
        contentBn: editingBlog.contentBn || '',
        contentEn: editingBlog.contentEn || editingBlog.contentBn,
        image: editingBlog.image || 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
      });
      setEditingBlog(null);
      showToast('success', 'ব্লগ পোস্ট সফলভাবে প্রকাশিত হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই ব্লগ পোস্টটি মুছে ফেলতে চান?')) return;
    try {
      await deleteBlogPost(id);
      showToast('success', 'ব্লগ পোস্ট মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Tour Package Save & Delete
  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour?.titleBn || !editingTour?.priceBDT) {
      alert('অনুগ্রহ করে ট্যুরের নাম ও মূল্য দিন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveTourPackage({
        id: editingTour.id || '',
        titleBn: editingTour.titleBn || '',
        titleEn: editingTour.titleEn || editingTour.titleBn,
        category: editingTour.category || 'international',
        countryBn: editingTour.countryBn || 'সংযুক্ত আরব আমিরাত',
        countryEn: editingTour.countryEn || 'UAE',
        durationBn: editingTour.durationBn || '৫ দিন ৪ রাত',
        durationEn: editingTour.durationEn || '5D 4N',
        priceBDT: Number(editingTour.priceBDT) || 0,
        visaRequired: editingTour.visaRequired ?? true,
        image: editingTour.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
        highlightsBn: editingTour.highlightsBn || ['সাইটসিয়িং', 'রিটার্ন এয়ার টিকিট'],
        highlightsEn: editingTour.highlightsEn || ['Sightseeing', 'Return Air Ticket'],
      });
      setEditingTour(null);
      showToast('success', 'ট্যুর প্যাকেজ সফলভাবে সেভ হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই ট্যুর প্যাকেজটি মুছে ফেলতে চান?')) return;
    try {
      await deleteTourPackage(id);
      showToast('success', 'ট্যুর প্যাকেজ মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Gallery Save
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.titleBn || !editingGallery?.imageUrl) {
      alert('অনুগ্রহ করে ছবির শিরোনাম ও ইমেজ লিঙ্ক দিন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveGalleryItem({
        id: editingGallery.id || '',
        titleBn: editingGallery.titleBn || '',
        titleEn: editingGallery.titleEn || editingGallery.titleBn,
        category: editingGallery.category || 'umrah',
        imageUrl: editingGallery.imageUrl || '',
        captionBn: editingGallery.captionBn || '',
        captionEn: editingGallery.captionEn || '',
      });
      setEditingGallery(null);
      showToast('success', 'গ্যালারি ছবি সফলভাবে যুক্ত হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই ছবিটি মুছে ফেলতে চান?')) return;
    try {
      await deleteGalleryItem(id);
      showToast('success', 'ছবি মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Review Save
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.nameBn || !editingReview?.commentBn) {
      alert('অনুগ্রহ করে হাজীর নাম ও মতামত লিখুন');
      return;
    }
    setIsProcessing(true);
    try {
      await saveReview({
        id: editingReview.id || '',
        nameBn: editingReview.nameBn || '',
        nameEn: editingReview.nameEn || editingReview.nameBn,
        locationBn: editingReview.locationBn || 'ঢাকা, বাংলাদেশ',
        locationEn: editingReview.locationEn || 'Dhaka, Bangladesh',
        serviceBn: editingReview.serviceBn || 'পবিত্র উমরাহ্ প্যাকেজ',
        serviceEn: editingReview.serviceEn || 'Umrah Package',
        rating: Number(editingReview.rating) || 5,
        commentBn: editingReview.commentBn || '',
        commentEn: editingReview.commentEn || editingReview.commentBn,
        date: editingReview.date || '২০২৬',
        verified: editingReview.verified ?? true,
      });
      setEditingReview(null);
      showToast('success', 'রিভিউ সফলভাবে সেভ হয়েছে!');
    } catch (err: any) {
      showToast('error', 'সেভ করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই রিভিউটি মুছে ফেলতে চান?')) return;
    try {
      await deleteReview(id);
      showToast('success', 'রিভিউ মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  // Save Global Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await saveSiteSettings(settingsForm);
      showToast('success', 'ওয়েবসাইট সেটিংস ও মারকুই টেক্সট সফলভাবে আপডেট হয়েছে!');
    } catch (err: any) {
      showToast('error', 'আপডেট করতে সমস্যা হয়েছে: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Inquiry Status Change
  const handleInquiryStatus = async (id: string, status: BookingInquiry['status']) => {
    try {
      await updateInquiryStatus(id, status);
      showToast('success', 'ইনকোয়ারি স্ট্যাটাস আপডেট হয়েছে!');
    } catch (err: any) {
      showToast('error', 'স্ট্যাটাস আপডেট ব্যর্থ: ' + err.message);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত এই ইনকোয়ারিটি মুছে ফেলতে চান?')) return;
    try {
      await deleteInquiry(id);
      showToast('success', 'ইনকোয়ারি মুছে ফেলা হয়েছে');
    } catch (err: any) {
      showToast('error', 'মুছতে সমস্যা হয়েছে: ' + err.message);
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
                গোপন এডমিন পাসকোড (Admin Passcode)
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="পাসকোড লিখুন (যেমন: admin786)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0D472B] focus:border-transparent outline-none font-semibold text-sm"
                required
                autoFocus
              />
              <p className="text-[11px] text-gray-600 mt-1 font-medium">
                💡 ডিফল্ট পাসকোড: <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-800 font-bold">admin786</code> অথবা <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-800 font-bold">worldheritage</code>
              </p>
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
              নিরাপত্তা রক্ষার্থে এই প্যানেল শুধুমাত্র অনুমোদিত এজেন্সির কর্মকর্তাদের জন্য সংরক্ষিত।
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
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2 text-sm font-bold animate-bounce ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-900 text-[#F3E0A0] border-[#D4AF37]' 
            : 'bg-red-800 text-white border-red-400'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
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
              <span>{isProcessing ? 'সিংক হচ্ছে...' : 'ডাটাবেজ সিংক/সিড'}</span>
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
            onClick={() => setActiveTab('umrah')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'umrah' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <Moon className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{umrahPackages.length}</div>
            <div className="text-[11px] font-bold">উমরাহ্ প্যাকেজ</div>
          </div>

          <div 
            onClick={() => setActiveTab('hajj')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'hajj' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{hajjPackages.length}</div>
            <div className="text-[11px] font-bold">হজ্ব প্যাকেজ</div>
          </div>

          <div 
            onClick={() => setActiveTab('blog')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'blog' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <BookOpen className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{blogPosts.length}</div>
            <div className="text-[11px] font-bold">ব্লগ ও গাইড</div>
          </div>

          <div 
            onClick={() => setActiveTab('gallery')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'gallery' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <ImageIcon className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{galleryItems.length}</div>
            <div className="text-[11px] font-bold">গ্যালারি ছবি</div>
          </div>

          <div 
            onClick={() => setActiveTab('reviews')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'reviews' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">{reviews.length}</div>
            <div className="text-[11px] font-bold">কাস্টমার রিভিউ</div>
          </div>

          <div 
            onClick={() => setActiveTab('inquiries')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'inquiries' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <Inbox className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black text-amber-500">{inquiries.length}</div>
            <div className="text-[11px] font-bold">ইনকোয়ারি বুকিং</div>
          </div>

          <div 
            onClick={() => setActiveTab('settings')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center ${activeTab === 'settings' ? 'bg-[#0D472B] text-white border-[#D4AF37] shadow-md' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300'}`}
          >
            <Settings className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
            <div className="text-lg font-black">⚙️</div>
            <div className="text-[11px] font-bold">সাইট সেটিংস</div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-gray-200 scrollbar-none">
          {[
            { id: 'umrah', label: 'উমরাহ্ প্যাকেজ', icon: Moon, count: umrahPackages.length },
            { id: 'hajj', label: 'হজ্ব প্যাকেজ ২০২৭', icon: Sparkles, count: hajjPackages.length },
            { id: 'blog', label: 'ভ্রমণ ব্লগ ও গাইড', icon: BookOpen, count: blogPosts.length },
            { id: 'tours', label: 'ট্যুর ও ভিসা অফার', icon: Compass, count: tourPackages.length },
            { id: 'gallery', label: 'ফটো গ্যালারি', icon: ImageIcon, count: galleryItems.length },
            { id: 'reviews', label: 'হাজী রিভিউ', icon: Users, count: reviews.length },
            { id: 'inquiries', label: 'কাস্টমার ইনকোয়ারি', icon: Inbox, count: inquiries.filter(i => i.status === 'new').length, badge: 'নতুন' },
            { id: 'settings', label: 'সাইট নোটিশ ও সেটিংস', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#0D472B] text-[#F3E0A0] shadow-md border border-[#D4AF37]' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${isActive ? 'bg-[#D4AF37] text-emerald-950' : 'bg-gray-200 text-gray-700'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ---------------- TAB 1: UMRAH PACKAGES ---------------- */}
        {activeTab === 'umrah' && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  উমরাহ্ প্যাকেজসমূহ ({umrahPackages.length}টি লাইভ প্যাকেজ)
                </h2>
                <p className="text-xs text-gray-500">
                  প্যাকেজের মূল্য, হোটেল এবং বিবরণ পরিবর্তন করুন বা নতুন প্যাকেজ যোগ করুন
                </p>
              </div>
              <button
                onClick={() => setEditingUmrah({
                  titleBn: '',
                  titleEn: '',
                  badgeBn: 'পপুলার অফার',
                  durationBn: '১৫ দিন',
                  durationEn: '15 Days',
                  makkahHotelBn: '৩ স্টার হোটেল (৩০০ মিটার)',
                  madinahHotelBn: '৩ স্টার হোটেল (২০০ মিটার)',
                  priceBDT: 135000,
                  image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
                  foodBn: '৩ বেলা দেশি সুস্বাদু খাবার',
                  transportBn: 'এসি বাস পরিবহন',
                  ziyaraBn: 'মক্কা ও মদিনার ঐতিহাসিক স্থান পরিদর্শন',
                  visaAndTicketBn: 'উমরাহ্ ভিসা ও রিটার্ন টিকিটসহ',
                  inclusionsBn: ['উমরাহ্ ভিসা', 'রিটার্ন এয়ার টিকিট', '৩ বেলা দেশি খাবার', 'গাইড সেবা'],
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন উমরাহ্ প্যাকেজ তৈরি করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {umrahPackages.map((pkg) => (
                <div key={pkg.id} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-emerald-950">
                      <img src={pkg.image} alt={pkg.titleBn} className="w-full h-full object-cover" />
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
                        <div>🕋 মক্কা: <span className="font-semibold text-gray-800">{pkg.makkahHotelBn}</span></div>
                        <div>🕌 মদিনা: <span className="font-semibold text-gray-800">{pkg.madinahHotelBn}</span></div>
                      </div>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-bold">প্যাকেজ মূল্য:</span>
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
                      onClick={() => handleDeleteUmrah(pkg.id)}
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
        {activeTab === 'hajj' && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  পবিত্র হজ্ব প্যাকেজসমূহ ({hajjPackages.length}টি প্যাকেজ)
                </h2>
                <p className="text-xs text-gray-500">
                  হজ্ব ২০২৭ এর প্রাক-নিবন্ধন ফি, পূর্ণাঙ্গ খরচ ও সুযোগ-সুবিধা আপডেট করুন
                </p>
              </div>
              <button
                onClick={() => setEditingHajj({
                  titleBn: 'পবিত্র হজ্ব ২০২৭ ভিআইপি প্যাকেজ',
                  titleEn: 'Holy Hajj 2027 VIP Package',
                  year: 2027,
                  durationBn: '৪০-৪২ দিন',
                  regFeeBDT: 30000,
                  totalPriceBDT: 650000,
                  packageCategoryBn: 'ভিআইপি লাক্সারি',
                  badgeBn: 'নিবন্ধন চলছে',
                  makkahHotelBn: '৫ স্টার হোটেল (১০০ মিটার)',
                  madinahHotelBn: '৫ স্টার হোটেল (৫০ মিটার)',
                  foodBn: '৩ বেলা বুফে দেশি খাবার',
                  transportBn: 'ভিআইপি এসি বাস ও হারামাইন ট্রেন',
                  registrationStatusBn: 'সরকারি প্রাক-নিবন্ধন চলছে',
                  image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80',
                  facilitiesBn: ['সরকারি প্রাক-নিবন্ধন', 'মিনা আরাফাত ভিআইপি তাঁবু', '৩ বেলা বুফে খাবার', 'অভিজ্ঞ মুয়াল্লিম গাইড'],
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন হজ্ব প্যাকেজ তৈরি করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hajjPackages.map((pkg) => (
                <div key={pkg.id} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-emerald-950">
                      <img src={pkg.image} alt={pkg.titleBn} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-emerald-900 text-emerald-100 text-[10px] font-black px-2 py-0.5 rounded-md border border-[#D4AF37]">
                        হজ্ব {pkg.year}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-extrabold text-sm text-emerald-950 line-clamp-1">
                        {pkg.titleBn}
                      </h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>প্রাক-নিবন্ধন ফি: <span className="font-bold text-emerald-800">৳{pkg.regFeeBDT.toLocaleString()}</span></div>
                        <div>মোট প্যাকেজ: <span className="font-bold text-gray-800">৳{pkg.totalPriceBDT.toLocaleString()}</span></div>
                        <div>হোটেল: <span className="font-semibold text-gray-700">{pkg.makkahHotelBn}</span></div>
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
                      onClick={() => handleDeleteHajj(pkg.id)}
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
        {activeTab === 'blog' && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-black text-emerald-950">
                  ভ্রমণ ব্লগ ও ইসলামিক নির্দেশিকা ({blogPosts.length}টি পোস্ট)
                </h2>
                <p className="text-xs text-gray-500">
                  নতুন ইসলামিক নির্দেশিকা পোস্ট করুন বা বিদ্যমান আর্টিকেল এডিট করুন
                </p>
              </div>
              <button
                onClick={() => setEditingBlog({
                  titleBn: '',
                  titleEn: '',
                  categoryBn: 'উমরাহ্ নির্দেশিকা',
                  categoryKey: 'umrah-guide',
                  authorBn: 'মাওলানা কাফেল প্রধান',
                  date: new Date().toISOString().split('T')[0],
                  summaryBn: '',
                  contentBn: '',
                  image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ব্লগ পোস্ট লিখুন</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {blogPosts.map((post) => (
                <div key={post.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={post.image} alt={post.titleBn} className="w-16 h-14 object-cover rounded-xl border" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {post.categoryBn}
                      </span>
                      <h3 className="font-extrabold text-sm text-gray-900 mt-1 line-clamp-1">
                        {post.titleBn}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{post.summaryBn}</p>
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
                      onClick={() => handleDeleteBlog(post.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs cursor-pointer"
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
        {activeTab === 'tours' && (
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
                onClick={() => setEditingTour({
                  titleBn: 'দুবাই ও আবুধাবি সিটি ট্যুর',
                  titleEn: 'Dubai & Abu Dhabi City Tour',
                  category: 'international',
                  countryBn: 'সংযুক্ত আরব আমিরাত',
                  countryEn: 'UAE',
                  durationBn: '৫ দিন ৪ রাত',
                  durationEn: '5D 4N',
                  priceBDT: 85000,
                  visaRequired: true,
                  image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
                  highlightsBn: ['বুর্জ খলিফা দর্শন', 'ডেজার্ট সাফারি', 'রিটার্ন এয়ার টিকিট'],
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ট্যুর প্যাকেজ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tourPackages.map((tour) => (
                <div key={tour.id} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={tour.image} alt={tour.titleBn} className="w-full h-36 object-cover" />
                    <div className="p-3.5">
                      <h4 className="font-extrabold text-sm text-emerald-950">{tour.titleBn}</h4>
                      <p className="text-xs text-gray-600 mt-1">{tour.countryBn} • {tour.durationBn}</p>
                      <div className="text-sm font-black text-emerald-800 mt-2">৳{tour.priceBDT.toLocaleString()}</div>
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
                      onClick={() => handleDeleteTour(tour.id)}
                      className="p-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs cursor-pointer"
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
        {activeTab === 'gallery' && (
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
                onClick={() => setEditingGallery({
                  titleBn: 'পবিত্র হারামাইন শরীফাইন উমরাহ্ কাফেলা',
                  category: 'umrah',
                  imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
                  captionBn: 'হাজীদের স্মৃতিময় মুহূর্ত',
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ছবি যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img src={item.imageUrl} alt={item.titleBn} className="w-full h-32 object-cover" />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-bold text-gray-800 truncate">{item.titleBn}</p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteGallery(item.id)}
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
        {activeTab === 'reviews' && (
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
                onClick={() => setEditingReview({
                  nameBn: 'হাজী মোঃ রফিকুল ইসলাম',
                  nameEn: 'Haji Md. Rafiqul Islam',
                  locationBn: 'ধানমন্ডি, ঢাকা',
                  serviceBn: 'ভিআইপি উমরাহ্ প্যাকেজ',
                  rating: 5,
                  commentBn: 'আলহামদুলিল্লাহ, ওয়ার্ল্ড হেরিটেজ ট্রাভেলস এর তত্ত্বাবধানে উমরাহ্ অত্যন্ত সুন্দর ও সুশৃঙ্খলভাবে সম্পন্ন হয়েছে।',
                  verified: true,
                  date: '২০২৬',
                })}
                className="flex items-center gap-2 bg-[#0D472B] hover:bg-emerald-800 text-[#F3E0A0] py-2.5 px-4 rounded-xl text-xs font-black shadow-md border border-[#D4AF37] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন রিভিউ যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-emerald-950">{rev.nameBn}</h4>
                      <div className="text-amber-500 text-xs font-black">{'★'.repeat(rev.rating)}</div>
                    </div>
                    <p className="text-xs text-gray-500">{rev.serviceBn} • {rev.locationBn}</p>
                    <p className="text-xs text-gray-700 italic mt-2">"{rev.commentBn}"</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => setEditingReview(rev)}
                      className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 cursor-pointer"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-xs text-red-600 bg-red-50 p-1 rounded-md border border-red-200 cursor-pointer"
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
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <h2 className="text-lg font-black text-emerald-950">
                কাস্টমার ইনকোয়ারি ও বুকিং অনুরোধ ({inquiries.length}টি মোট)
              </h2>
              <p className="text-xs text-gray-500">
                সাইটের বুকিং ফর্ম ও যোগাযোগ পেজ থেকে গ্রাহকদের পাঠানো তথ্যের তালিকা
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
                        <span className="font-extrabold text-sm text-gray-900">{inq.customerName}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          inq.status === 'new' ? 'bg-red-100 text-red-700' :
                          inq.status === 'contacted' ? 'bg-amber-100 text-amber-800' :
                          inq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {inq.status === 'new' ? 'নতুন রিকোয়েস্ট' : inq.status === 'contacted' ? 'যোগাযোগ করা হয়েছে' : inq.status === 'confirmed' ? 'কনফার্ম' : 'বাতিল'}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <div>
                        📞 ফোন: <a href={`tel:${inq.phone}`} className="font-bold text-emerald-800 hover:underline">{inq.phone}</a>
                      </div>
                      <div>
                        🏷️ সার্ভিস: <span className="font-bold text-gray-800">{inq.serviceType} {inq.packageTitle ? `(${inq.packageTitle})` : ''}</span>
                      </div>
                      <div>
                        👥 যাত্রী সংখ্যা: <span className="font-bold text-gray-800">{inq.travelersCount} জন</span>
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
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
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
                          onChange={(e) => handleInquiryStatus(inq.id, e.target.value as any)}
                          className="text-xs font-semibold bg-white border border-gray-300 rounded-lg px-2 py-1 outline-none"
                        >
                          <option value="new">নতুন (New)</option>
                          <option value="contacted">যোগাযোগ সম্পন্ন (Contacted)</option>
                          <option value="confirmed">বুকিং কনফার্ম (Confirmed)</option>
                          <option value="cancelled">বাতিল (Cancelled)</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
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
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <h2 className="text-lg font-black text-emerald-950">
                ওয়েবসাইট গ্লোবাল সেটিংস ও মারকুই টেক্সট
              </h2>
              <p className="text-xs text-gray-500">
                স্ক্রলিং হাদিস, ব্রেকিং নোটিশ এবং যোগাযোগের হটলাইন তথ্য পরিবর্তন করুন
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
                  onChange={(e) => setSettingsForm({ ...settingsForm, hadithBn: e.target.value })}
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
                  onChange={(e) => setSettingsForm({ ...settingsForm, noticeBn: e.target.value })}
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
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
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
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
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
                <span>{isProcessing ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ---------------- MODAL: UMRAH EDIT / CREATE ---------------- */}
      {editingUmrah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                {editingUmrah.id ? 'উমরাহ্ প্যাকেজ এডিট করুন' : 'নতুন উমরাহ্ প্যাকেজ যোগ করুন'}
              </h3>
              <button onClick={() => setEditingUmrah(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveUmrah} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">প্যাকেজের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={editingUmrah.titleBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, titleBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                    placeholder="যেমন: ১৫ দিনের স্পেশাল উমরাহ্ প্যাকেজ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">প্যাকেজ মূল্য (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={editingUmrah.priceBDT || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, priceBDT: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                    placeholder="যেমন: 135000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">স্থায়িত্ব (Duration)</label>
                  <input
                    type="text"
                    value={editingUmrah.durationBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, durationBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="১৫ দিন"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ব্যাজ / অফার ট্যাগ</label>
                  <input
                    type="text"
                    value={editingUmrah.badgeBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, badgeBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="যেমন: জনপ্রিয় / রমজান স্পেশাল"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ছবি লিঙ্ক (Image URL)</label>
                  <input
                    type="text"
                    value={editingUmrah.image || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, image: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মক্কা হোটেল ও দূরত্ব</label>
                  <input
                    type="text"
                    value={editingUmrah.makkahHotelBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, makkahHotelBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="৩ স্টার হোটেল (৩০০ মিটার)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মদিনা হোটেল ও দূরত্ব</label>
                  <input
                    type="text"
                    value={editingUmrah.madinahHotelBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, madinahHotelBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="৩ স্টার হোটেল (২০০ মিটার)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">খাবার ব্যবস্থা</label>
                  <input
                    type="text"
                    value={editingUmrah.foodBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, foodBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="৩ বেলা দেশি সুস্বাদু খাবার"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">পরিবহন ও জিয়ারাহ্</label>
                  <input
                    type="text"
                    value={editingUmrah.transportBn || ''}
                    onChange={(e) => setEditingUmrah({ ...editingUmrah, transportBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="এসি বাস পরিবহন ও জিয়ারাহ্"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingUmrah(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800"
                >
                  {isProcessing ? 'সেভ হচ্ছে...' : 'প্যাকেজ সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: HAJJ EDIT / CREATE ---------------- */}
      {editingHajj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                {editingHajj.id ? 'হজ্ব প্যাকেজ এডিট করুন' : 'নতুন হজ্ব প্যাকেজ যোগ করুন'}
              </h3>
              <button onClick={() => setEditingHajj(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveHajj} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">হজ্ব প্যাকেজের নাম *</label>
                  <input
                    type="text"
                    required
                    value={editingHajj.titleBn || ''}
                    onChange={(e) => setEditingHajj({ ...editingHajj, titleBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মোট প্যাকেজ মূল্য (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={editingHajj.totalPriceBDT || ''}
                    onChange={(e) => setEditingHajj({ ...editingHajj, totalPriceBDT: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">প্রাক-নিবন্ধন ফি (BDT)</label>
                  <input
                    type="number"
                    value={editingHajj.regFeeBDT || 30000}
                    onChange={(e) => setEditingHajj({ ...editingHajj, regFeeBDT: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">হজ্ব বছর (Year)</label>
                  <input
                    type="number"
                    value={editingHajj.year || 2027}
                    onChange={(e) => setEditingHajj({ ...editingHajj, year: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">স্থায়িত্ব (Duration)</label>
                  <input
                    type="text"
                    value={editingHajj.durationBn || '৪০-৪২ দিন'}
                    onChange={(e) => setEditingHajj({ ...editingHajj, durationBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মক্কা হোটেল</label>
                  <input
                    type="text"
                    value={editingHajj.makkahHotelBn || ''}
                    onChange={(e) => setEditingHajj({ ...editingHajj, makkahHotelBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মদিনা হোটেল</label>
                  <input
                    type="text"
                    value={editingHajj.madinahHotelBn || ''}
                    onChange={(e) => setEditingHajj({ ...editingHajj, madinahHotelBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবি লিঙ্ক (Image URL)</label>
                <input
                  type="text"
                  value={editingHajj.image || ''}
                  onChange={(e) => setEditingHajj({ ...editingHajj, image: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingHajj(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800"
                >
                  {isProcessing ? 'সেভ হচ্ছে...' : 'হজ্ব প্যাকেজ সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: BLOG EDIT / CREATE ---------------- */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden my-6">
            <div className="p-4 bg-[#052917] text-white flex items-center justify-between border-b border-[#D4AF37]">
              <h3 className="font-black text-sm sm:text-base text-[#F3E0A0]">
                {editingBlog.id ? 'ব্লগ পোস্ট এডিট করুন' : 'নতুন ব্লগ বা গাইড পোস্ট লিখুন'}
              </h3>
              <button onClick={() => setEditingBlog(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পোস্টের শিরোনাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={editingBlog.titleBn || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, titleBn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs sm:text-sm font-semibold"
                  placeholder="যেমন: উমরাহ্ পালনের সঠিক ও সহজ নিয়মাবলী"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={editingBlog.categoryBn || 'উমরাহ্ গাইড'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, categoryBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                  >
                    <option value="উমরাহ্ নির্দেশিকা">উমরাহ্ নির্দেশিকা</option>
                    <option value="হজ্ব নির্দেশিকা">হজ্ব নির্দেশিকা</option>
                    <option value="ভ্রমণ পরামর্শ ও টিপস">ভ্রমণ পরামর্শ ও টিপস</option>
                    <option value="ভিসা ও টিকিট সংক্রান্ত">ভিসা ও টিকিট সংক্রান্ত</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">লেখকের নাম</label>
                  <input
                    type="text"
                    value={editingBlog.authorBn || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, authorBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="মুফতী মাওলানা কাফেল প্রধান"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ (Summary)</label>
                <input
                  type="text"
                  value={editingBlog.summaryBn || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summaryBn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                  placeholder="এক নজরে আর্টিকেলের সারসংক্ষেপ..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মূল কনটেন্ট / বিস্তারিত আর্টিকেল *</label>
                <textarea
                  rows={6}
                  required
                  value={editingBlog.contentBn || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, contentBn: e.target.value })}
                  className="w-full p-3 border rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-800"
                  placeholder="এখানে আপনার বিস্তারিত পোস্ট লিখুন..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবির লিঙ্ক (Image URL)</label>
                <input
                  type="text"
                  value={editingBlog.image || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-[#0D472B] text-[#F3E0A0] font-black text-xs rounded-xl border border-[#D4AF37] shadow-md hover:bg-emerald-800"
                >
                  {isProcessing ? 'পাবলিশ হচ্ছে...' : 'পোস্ট পাবলিশ করুন'}
                </button>
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
              <h3 className="font-black text-sm text-[#F3E0A0]">গ্যালারিতে নতুন ছবি যোগ করুন</h3>
              <button onClick={() => setEditingGallery(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={editingGallery.titleBn || ''}
                  onChange={(e) => setEditingGallery({ ...editingGallery, titleBn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={editingGallery.category || 'umrah'}
                  onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                >
                  <option value="umrah">উমরাহ্ কাফেলা</option>
                  <option value="hajj">পবিত্র হজ্ব</option>
                  <option value="office">পান্থপথ অফিস</option>
                  <option value="group">গ্রুপ ফটো</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবির ওয়েব লিঙ্ক (Image URL) *</label>
                <input
                  type="text"
                  required
                  value={editingGallery.imageUrl || ''}
                  onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
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
                  {isProcessing ? 'সেভ হচ্ছে...' : 'ছবি সেভ করুন'}
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
              <h3 className="font-black text-sm text-[#F3E0A0]">কাস্টমার রিভিউ যোগ/এডিট করুন</h3>
              <button onClick={() => setEditingReview(null)} className="p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">হাজীর নাম *</label>
                <input
                  type="text"
                  required
                  value={editingReview.nameBn || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, nameBn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা / এলাকা</label>
                  <input
                    type="text"
                    value={editingReview.locationBn || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, locationBn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                    placeholder="পান্থপথ, ঢাকা"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">রেটিং (১-৫ স্টার)</label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ স্টার)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ স্টার)</option>
                    <option value={3}>⭐⭐⭐ (৩ স্টার)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মতামত / রিভিউ বক্তব্য *</label>
                <textarea
                  rows={3}
                  required
                  value={editingReview.commentBn || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, commentBn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
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
                  {isProcessing ? 'সেভ হচ্ছে...' : 'রিভিউ সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
