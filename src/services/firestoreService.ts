import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  UmrahPackage, 
  HajjPackage, 
  TourPackage, 
  BlogPost, 
  GalleryItem, 
  Review, 
  BookingInquiry, 
  AgencyInfo,
  HomePageConfig
} from '../types';
import { 
  initialUmrahPackages, 
  initialHajjPackages, 
  initialTourPackages, 
  initialGalleryItems, 
  initialReviews, 
  initialBlogPosts,
  initialAgencyInfo 
} from '../data/initialData';
import { initialHomePageConfig } from '../data/initialHomePageData';

// Collection Names
export const COLLECTIONS = {
  UMRAH: 'umrah_packages',
  HAJJ: 'hajj_packages',
  TOURS: 'tour_packages',
  BLOGS: 'blog_posts',
  GALLERY: 'gallery_items',
  REVIEWS: 'reviews',
  INQUIRIES: 'inquiries',
  SETTINGS: 'site_settings',
};

// ==================== DELETED IDS PERSISTENT BLACKLIST ====================
// Tracks deleted IDs so that deleted initial/fallback posts and deleted cloud items NEVER reappear
const DELETED_IDS_STORAGE_KEY = 'wh_deleted_doc_ids_v2';

export const getDeletedDocIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(DELETED_IDS_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    return new Set();
  }
};

export const markDocAsDeleted = (id: string): void => {
  if (!id) return;
  try {
    const set = getDeletedDocIds();
    set.add(id);
    localStorage.setItem(DELETED_IDS_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.error('Error saving deleted doc id to localStorage:', e);
  }
};

export const unmarkDocAsDeleted = (id: string): void => {
  if (!id) return;
  try {
    const set = getDeletedDocIds();
    if (set.has(id)) {
      set.delete(id);
      localStorage.setItem(DELETED_IDS_STORAGE_KEY, JSON.stringify(Array.from(set)));
    }
  } catch (e) {
    console.error('Error unmarking deleted doc id:', e);
  }
};

export const isDocDeleted = (id: string): boolean => {
  if (!id) return false;
  return getDeletedDocIds().has(id);
};

export const clearDeletedDocsBlacklist = (): void => {
  try {
    localStorage.removeItem(DELETED_IDS_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing deleted doc ids:', e);
  }
};

// ==================== 1. UMRAH PACKAGES ====================
export const subscribeUmrahPackages = (
  callback: (packages: UmrahPackage[]) => void,
  fallbackData: UmrahPackage[] = initialUmrahPackages
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.UMRAH));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: UmrahPackage[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<UmrahPackage, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Umrah snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeUmrahPackages:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveUmrahPackage = async (pkg: UmrahPackage): Promise<string> => {
  const { id, ...data } = pkg;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.UMRAH, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.UMRAH);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteUmrahPackage = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.UMRAH, id));
  } catch (err) {
    console.warn('Firestore delete error for Umrah package:', err);
  }
};

// ==================== 2. HAJJ PACKAGES ====================
export const subscribeHajjPackages = (
  callback: (packages: HajjPackage[]) => void,
  fallbackData: HajjPackage[] = initialHajjPackages
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.HAJJ));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: HajjPackage[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<HajjPackage, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Hajj snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeHajjPackages:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveHajjPackage = async (pkg: HajjPackage): Promise<string> => {
  const { id, ...data } = pkg;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.HAJJ, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.HAJJ);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteHajjPackage = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.HAJJ, id));
  } catch (err) {
    console.warn('Firestore delete error for Hajj package:', err);
  }
};

// ==================== 3. BLOG POSTS ====================
export const subscribeBlogPosts = (
  callback: (posts: BlogPost[]) => void,
  fallbackData: BlogPost[] = initialBlogPosts
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.BLOGS));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: BlogPost[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<BlogPost, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Blog snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeBlogPosts:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveBlogPost = async (post: BlogPost): Promise<string> => {
  const { id, ...data } = post;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.BLOGS, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.BLOGS);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.BLOGS, id));
  } catch (err) {
    console.warn('Firestore delete error for Blog post:', err);
  }
};

// ==================== 4. TOUR PACKAGES ====================
export const subscribeTourPackages = (
  callback: (packages: TourPackage[]) => void,
  fallbackData: TourPackage[] = initialTourPackages
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.TOURS));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: TourPackage[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<TourPackage, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Tours snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeTourPackages:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveTourPackage = async (pkg: TourPackage): Promise<string> => {
  const { id, ...data } = pkg;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.TOURS, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.TOURS);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteTourPackage = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.TOURS, id));
  } catch (err) {
    console.warn('Firestore delete error for Tour package:', err);
  }
};

// ==================== 5. GALLERY ITEMS ====================
export const subscribeGalleryItems = (
  callback: (items: GalleryItem[]) => void,
  fallbackData: GalleryItem[] = initialGalleryItems
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.GALLERY));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: GalleryItem[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Gallery snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeGalleryItems:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveGalleryItem = async (item: GalleryItem): Promise<string> => {
  const { id, ...data } = item;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.GALLERY, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.GALLERY);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
  } catch (err) {
    console.warn('Firestore delete error for Gallery item:', err);
  }
};

// ==================== 6. REVIEWS ====================
export const subscribeReviews = (
  callback: (reviews: Review[]) => void,
  fallbackData: Review[] = initialReviews
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.REVIEWS));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Review[] = [];
          snapshot.forEach((d) => {
            if (!isDocDeleted(d.id)) {
              list.push({ id: d.id, ...(d.data() as Omit<Review, 'id'>) });
            }
          });
          callback(list);
        } else {
          const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
          callback(filtered);
        }
      },
      (error) => {
        console.warn('Firestore Reviews snapshot error, using fallback:', error);
        const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
        callback(filtered);
      }
    );
  } catch (err) {
    console.error('Error in subscribeReviews:', err);
    const filtered = fallbackData.filter((item) => !isDocDeleted(item.id));
    callback(filtered);
    return () => {};
  }
};

export const saveReview = async (rev: Review): Promise<string> => {
  const { id, ...data } = rev;
  if (id && id.trim().length > 0 && !id.startsWith('temp_')) {
    unmarkDocAsDeleted(id);
    const docRef = doc(db, COLLECTIONS.REVIEWS, id);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return id;
  } else {
    const collRef = collection(db, COLLECTIONS.REVIEWS);
    const newDoc = await addDoc(collRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    unmarkDocAsDeleted(newDoc.id);
    return newDoc.id;
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.REVIEWS, id));
  } catch (err) {
    console.warn('Firestore delete error for Review:', err);
  }
};

// ==================== 7. INQUIRIES ====================
export const subscribeInquiries = (
  callback: (inquiries: BookingInquiry[]) => void
): Unsubscribe => {
  try {
    const q = query(collection(db, COLLECTIONS.INQUIRIES));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: BookingInquiry[] = [];
        snapshot.forEach((d) => {
          if (!isDocDeleted(d.id)) {
            list.push({ id: d.id, ...(d.data() as Omit<BookingInquiry, 'id'>) });
          }
        });
        // Sort latest first
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(list);
      },
      (error) => {
        console.warn('Firestore Inquiries snapshot error:', error);
      }
    );
  } catch (err) {
    console.error('Error in subscribeInquiries:', err);
    return () => {};
  }
};

export const createBookingInquiry = async (
  inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>
): Promise<string> => {
  const collRef = collection(db, COLLECTIONS.INQUIRIES);
  const newDoc = await addDoc(collRef, {
    ...inquiry,
    status: 'new',
    createdAt: new Date().toISOString(),
  });
  return newDoc.id;
};

export const updateInquiryStatus = async (
  id: string,
  status: BookingInquiry['status']
): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.INQUIRIES, id);
  await updateDoc(docRef, { status });
};

export const deleteInquiry = async (id: string): Promise<void> => {
  if (!id) return;
  markDocAsDeleted(id);
  try {
    await deleteDoc(doc(db, COLLECTIONS.INQUIRIES, id));
  } catch (err) {
    console.warn('Firestore delete error for Inquiry:', err);
  }
};

// ==================== 8. SITE SETTINGS & HOME PAGE CONFIG ====================
export interface SiteSettingsData {
  hadithBn?: string;
  hadithEn?: string;
  noticeBn?: string;
  noticeEn?: string;
  hotline?: string;
  whatsappNumber?: string;
}

export const subscribeSiteSettings = (
  callback: (settings: SiteSettingsData | null) => void
): Unsubscribe => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'global_config');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as SiteSettingsData);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.warn('Firestore Settings snapshot error:', error);
        callback(null);
      }
    );
  } catch (err) {
    console.error('Error in subscribeSiteSettings:', err);
    return () => {};
  }
};

export const saveSiteSettings = async (settings: SiteSettingsData): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'global_config');
  await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
};

// ==================== 8.1 HOME PAGE LIVE CONFIG ====================
export const subscribeHomePageConfig = (
  callback: (config: HomePageConfig) => void,
  fallbackConfig: HomePageConfig = initialHomePageConfig
): Unsubscribe => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'homepage_config');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<HomePageConfig>;
          // Merge with fallback to ensure all keys exist
          const merged: HomePageConfig = {
            ...fallbackConfig,
            ...data,
            stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : fallbackConfig.stats,
            trustBadges: Array.isArray(data.trustBadges) && data.trustBadges.length > 0 ? data.trustBadges : fallbackConfig.trustBadges,
            servicesList: Array.isArray(data.servicesList) && data.servicesList.length > 0 ? data.servicesList : fallbackConfig.servicesList,
            accordionItems: Array.isArray(data.accordionItems) && data.accordionItems.length > 0 ? data.accordionItems : fallbackConfig.accordionItems,
            accreditationsList: Array.isArray(data.accreditationsList) && data.accreditationsList.length > 0 ? data.accreditationsList : fallbackConfig.accreditationsList,
            featuresListBn: Array.isArray(data.featuresListBn) && data.featuresListBn.length > 0 ? data.featuresListBn : fallbackConfig.featuresListBn,
            featuresListEn: Array.isArray(data.featuresListEn) && data.featuresListEn.length > 0 ? data.featuresListEn : fallbackConfig.featuresListEn,
            typewriterMessagesBn: Array.isArray(data.typewriterMessagesBn) && data.typewriterMessagesBn.length > 0 ? data.typewriterMessagesBn : fallbackConfig.typewriterMessagesBn,
            typewriterMessagesEn: Array.isArray(data.typewriterMessagesEn) && data.typewriterMessagesEn.length > 0 ? data.typewriterMessagesEn : fallbackConfig.typewriterMessagesEn,
          };
          callback(merged);
        } else {
          callback(fallbackConfig);
        }
      },
      (error) => {
        console.warn('Firestore HomePageConfig snapshot error, using fallback:', error);
        callback(fallbackConfig);
      }
    );
  } catch (err) {
    console.error('Error in subscribeHomePageConfig:', err);
    callback(fallbackConfig);
    return () => {};
  }
};

export const saveHomePageConfig = async (config: HomePageConfig): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'homepage_config');
  await setDoc(docRef, { ...config, updatedAt: new Date().toISOString() }, { merge: true });
};


// ==================== 9. SEED ALL DEFAULT DATA TO FIRESTORE ====================
export const seedAllDefaultDataToFirestore = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Clear deleted docs blacklist when admin explicitly seeds
    clearDeletedDocsBlacklist();

    // 1. Seed Umrah Packages
    for (const pkg of initialUmrahPackages) {
      const docRef = doc(db, COLLECTIONS.UMRAH, pkg.id);
      const { id, ...data } = pkg;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 2. Seed Hajj Packages
    for (const pkg of initialHajjPackages) {
      const docRef = doc(db, COLLECTIONS.HAJJ, pkg.id);
      const { id, ...data } = pkg;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 3. Seed Tour Packages
    for (const pkg of initialTourPackages) {
      const docRef = doc(db, COLLECTIONS.TOURS, pkg.id);
      const { id, ...data } = pkg;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 4. Seed Blogs
    for (const blog of initialBlogPosts) {
      const docRef = doc(db, COLLECTIONS.BLOGS, blog.id);
      const { id, ...data } = blog;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 5. Seed Gallery
    for (const item of initialGalleryItems) {
      const docRef = doc(db, COLLECTIONS.GALLERY, item.id);
      const { id, ...data } = item;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 6. Seed Reviews
    for (const rev of initialReviews) {
      const docRef = doc(db, COLLECTIONS.REVIEWS, rev.id);
      const { id, ...data } = rev;
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() }, { merge: true });
    }

    // 7. Seed Settings
    await saveSiteSettings({
      hadithBn: 'রাসূলুল্লাহ (সা.) বলেছেন: "এক উমরাহ্ থেকে অপর উমরাহ্ মধ্যবর্তী সকল গুনাহের কাফফারা।" (বুখারী ও মুসলিম)',
      hadithEn: 'The Prophet (pbuh) said: "One Umrah to the next is an expiation for the sins committed between them." (Bukhari & Muslim)',
      noticeBn: 'পবিত্র হজ্ব ২০২৭ এর প্রাক-নিবন্ধন চলছে মাত্র ৩০,০০০ টাকায়। আজই যোগাযোগ করুন।',
      noticeEn: 'Holy Hajj 2027 pre-registration is ongoing with only 30,000 BDT. Contact us today.',
      hotline: initialAgencyInfo.hotline,
      whatsappNumber: initialAgencyInfo.whatsappNumber,
    });

    return { success: true, message: 'সকল ডাটা সফলভাবে ফায়ারবেস ক্লাউড ডাটাবেজে সংরক্ষিত হয়েছে!' };
  } catch (err: any) {
    console.error('Error seeding Firestore data:', err);
    return { success: false, message: 'ডাটা সংরক্ষণ করতে সমস্যা হয়েছে: ' + err.message };
  }
};
