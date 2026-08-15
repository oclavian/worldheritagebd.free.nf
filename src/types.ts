export type Language = 'bn' | 'en';

export type PageId = 
  | 'home'
  | 'umrah'
  | 'hajj'
  | 'air-tickets'
  | 'tours-visas'
  | 'gallery'
  | 'reviews'
  | 'blog'
  | 'contact';

export interface UmrahPackage {
  id: string;
  titleBn: string;
  titleEn: string;
  badgeBn?: string;
  badgeEn?: string;
  durationBn: string;
  durationEn: string;
  makkahHotelBn: string;
  makkahHotelEn: string;
  makkahDistanceBn: string;
  makkahDistanceEn: string;
  madinahHotelBn: string;
  madinahHotelEn: string;
  madinahDistanceBn: string;
  madinahDistanceEn: string;
  foodBn: string;
  foodEn: string;
  transportBn: string;
  transportEn: string;
  ziyaraBn: string;
  ziyaraEn: string;
  visaAndTicketBn: string;
  visaAndTicketEn: string;
  priceBDT: number;
  featured?: boolean;
  image: string;
  inclusionsBn: string[];
  inclusionsEn: string[];
}

export interface HajjPackage {
  id: string;
  titleBn: string;
  titleEn: string;
  packageCategoryBn?: string;
  packageCategoryEn?: string;
  badgeBn?: string;
  badgeEn?: string;
  year: number;
  durationBn: string;
  durationEn: string;
  regFeeBDT: number;
  totalPriceBDT: number;
  flightTypeBn?: string;
  flightTypeEn?: string;
  qurbaniBn?: string;
  qurbaniEn?: string;
  makkahHotelBn: string;
  makkahHotelEn: string;
  makkahDistanceBn?: string;
  makkahDistanceEn?: string;
  madinahHotelBn: string;
  madinahHotelEn: string;
  madinahDistanceBn?: string;
  madinahDistanceEn?: string;
  minaArafatBn?: string;
  minaArafatEn?: string;
  foodBn: string;
  foodEn: string;
  transportBn: string;
  transportEn: string;
  bulletTrainBn?: string;
  bulletTrainEn?: string;
  ziyarahBn?: string;
  ziyarahEn?: string;
  moallemBn: string;
  moallemEn: string;
  giftItemsBn?: string;
  giftItemsEn?: string;
  registrationStatusBn: string;
  registrationStatusEn: string;
  facilitiesBn: string[];
  facilitiesEn: string[];
  exclusionsBn?: string[];
  exclusionsEn?: string[];
  image: string;
  galleryImages?: string[];
}

export interface TourPackage {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'domestic' | 'international' | 'group' | 'couple' | 'family';
  countryBn: string;
  countryEn: string;
  durationBn: string;
  durationEn: string;
  priceBDT: number;
  image: string;
  highlightsBn: string[];
  highlightsEn: string[];
  visaRequired: boolean;
}

export interface Review {
  id: string;
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  serviceBn: string;
  serviceEn: string;
  rating: number; // 1-5
  commentBn: string;
  commentEn: string;
  date: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  categoryKey: 'hajj-guide' | 'umrah-guide' | 'travel-tips' | 'visa-info' | 'air-travel' | 'saudi';
  date: string;
  authorBn: string;
  authorEn: string;
  summaryBn: string;
  summaryEn: string;
  contentBn: string;
  contentEn: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'umrah' | 'hajj' | 'tours' | 'office' | 'group';
  imageUrl: string;
  captionBn?: string;
  captionEn?: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: 'Umrah' | 'Hajj' | 'Air Ticket' | 'Tour & Visa' | 'General Inquiry';
  packageTitle?: string;
  travelersCount: number;
  expectedDate?: string;
  message?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
}

export interface AgencyInfo {
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  taglineEn: string;
  hotline: string;
  email: string;
  addressBn: string;
  addressEn: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  googleMapsUrl: string;
}
