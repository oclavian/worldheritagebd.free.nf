export type Language = "bn" | "en";

export type PageId =
  | "home"
  | "umrah"
  | "hajj"
  | "air-tickets"
  | "tours-visas"
  | "gallery"
  | "reviews"
  | "blog"
  | "contact"
  | "admin";

export interface PackageItineraryDay {
  dayNumber: string;
  titleBn: string;
  titleEn?: string;
  descBn: string;
  descEn?: string;
  mealsBn?: string;
  mealsEn?: string;
}

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
  galleryImages?: string[];
  descriptionBn?: string;
  descriptionEn?: string;
  makkahStayDaysBn?: string;
  madinahStayDaysBn?: string;
  itinerary?: PackageItineraryDay[];
  inclusionsBn: string[];
  inclusionsEn: string[];
  exclusionsBn?: string[];
  exclusionsEn?: string[];
  guidelinesBn?: string[];
  guidelinesEn?: string[];
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
  inclusionsBn?: string[];
  inclusionsEn?: string[];
  exclusionsBn?: string[];
  exclusionsEn?: string[];
  image: string;
  galleryImages?: string[];
  descriptionBn?: string;
  descriptionEn?: string;
  makkahStayDaysBn?: string;
  madinahStayDaysBn?: string;
  itinerary?: PackageItineraryDay[];
  guidelinesBn?: string[];
  guidelinesEn?: string[];
}

export interface TourPackage {
  id: string;
  titleBn: string;
  titleEn: string;
  category: "domestic" | "international" | "group" | "couple" | "family";
  countryBn: string;
  countryEn: string;
  durationBn: string;
  durationEn: string;
  priceBDT: number;
  image: string;
  galleryImages?: string[];
  descriptionBn?: string;
  descriptionEn?: string;
  highlightsBn: string[];
  highlightsEn: string[];
  itinerary?: PackageItineraryDay[];
  inclusionsBn?: string[];
  inclusionsEn?: string[];
  exclusionsBn?: string[];
  exclusionsEn?: string[];
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
  categoryKey:
    | "hajj-guide"
    | "umrah-guide"
    | "travel-tips"
    | "visa-info"
    | "air-travel"
    | "saudi";
  date: string;
  authorBn: string;
  authorEn: string;
  summaryBn: string;
  summaryEn: string;
  contentBn: string;
  contentEn: string;
  image: string;
  galleryImages?: string[];
}

export interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: "umrah" | "hajj" | "tours" | "office" | "group";
  imageUrl: string;
  galleryImages?: string[];
  captionBn?: string;
  captionEn?: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType:
    "Umrah" | "Hajj" | "Air Ticket" | "Tour & Visa" | "General Inquiry";
  packageTitle?: string;
  travelersCount: number;
  expectedDate?: string;
  message?: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
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

export interface HomePageStatItem {
  id: string;
  valueBn: string;
  valueEn: string;
  labelBn: string;
  labelEn: string;
}

export interface HomePageTrustBadge {
  id: string;
  textBn: string;
  textEn: string;
}

export interface HomePageServiceCard {
  id: string;
  emoji: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  btnTextBn: string;
  btnTextEn: string;
  pageId: PageId;
}

export interface HomePageAccordionItem {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
}

export interface HomePageAccreditationItem {
  id: string;
  iconName: "ShieldCheck" | "Award" | "Building2" | "Plane";
  titleBn: string;
  titleEn: string;
  subBn: string;
  subEn: string;
}

export interface HomePageConfig {
  // Section Visibility Toggles
  showHeroSection: boolean;
  showHajjAnnouncementCard: boolean;
  showImportantInfoSection: boolean;
  showServicesSection: boolean;
  showFeaturedPackagesSection: boolean;
  showAccordionSection: boolean;
  showFeaturesSection: boolean;
  showAccreditationsSection: boolean;
  showContactBannerSection: boolean;

  // 1. Hero Section
  heroBgImage: string;
  typewriterMessagesBn: string[];
  typewriterMessagesEn: string[];
  heroTitleBn: string;
  heroTitleEn: string;
  heroSubtitleBn: string;
  heroSubtitleEn: string;
  stats: HomePageStatItem[];
  trustBadges: HomePageTrustBadge[];
  heroBtnUmrahBn: string;
  heroBtnUmrahEn: string;
  heroBtnHajjBn: string;
  heroBtnHajjEn: string;
  showHadithMarquee: boolean;

  // 2. Hajj Announcement Box (Right side of Hero)
  hajjCardBadgeBn: string;
  hajjCardBadgeEn: string;
  hajjCardCycleBn: string;
  hajjCardCycleEn: string;
  hajjCardPortalUrl: string;
  hajjCardPortalTextBn: string;
  hajjCardPortalTextEn: string;

  // Tab 1 (2027 Hajj)
  hajjTab1YearBn: string;
  hajjTab1YearEn: string;
  hajjTab1TitleBn: string;
  hajjTab1TitleEn: string;
  hajjTab1SubtitleBn: string;
  hajjTab1SubtitleEn: string;
  hajjTab1GovtFeeBn: string;
  hajjTab1GovtFeeEn: string;
  hajjTab1StartDateBn: string;
  hajjTab1StartDateEn: string;
  hajjTab1EndDateBn: string;
  hajjTab1EndDateEn: string;
  hajjTab1HajjDateBn: string;
  hajjTab1HajjDateEn: string;
  hajjTab1ConditionsBn: string[];
  hajjTab1ConditionsEn: string[];

  // Tab 2 (2028 Hajj)
  hajjTab2YearBn: string;
  hajjTab2YearEn: string;
  hajjTab2TitleBn: string;
  hajjTab2TitleEn: string;
  hajjTab2SubtitleBn: string;
  hajjTab2SubtitleEn: string;
  hajjTab2RegFeeBn: string;
  hajjTab2RegFeeEn: string;
  hajjTab2ValidityBn: string;
  hajjTab2ValidityEn: string;
  hajjTab2NoteBn: string;
  hajjTab2NoteEn: string;
  hajjCardCtaBtnBn: string;
  hajjCardCtaBtnEn: string;

  // 3. Important Guidance Section ("একটু জেনে নিন...")
  importantTaglineBn: string;
  importantTaglineEn: string;
  importantTitleBn: string;
  importantTitleEn: string;
  importantDescBn: string;
  importantDescEn: string;
  importantBoxTitleBn: string;
  importantBoxTitleEn: string;
  importantBoxPointsBn: string[];
  importantBoxPointsEn: string[];
  importantBtnTextBn: string;
  importantBtnTextEn: string;

  // 4. Core Services Section
  servicesTaglineBn: string;
  servicesTaglineEn: string;
  servicesTitleBn: string;
  servicesTitleEn: string;
  servicesList: HomePageServiceCard[];

  // 5. Featured Packages Section
  featuredTaglineBn: string;
  featuredTaglineEn: string;
  featuredTitleBn: string;
  featuredTitleEn: string;
  featuredFilterAllBn: string;
  featuredFilterAllEn: string;
  featuredFilterUmrahBn: string;
  featuredFilterUmrahEn: string;
  featuredFilterHajjBn: string;
  featuredFilterHajjEn: string;
  featuredExploreBtnBn: string;
  featuredExploreBtnEn: string;

  // 6. Accordion FAQ & Guides
  accordionTitleBn: string;
  accordionTitleEn: string;
  accordionItems: HomePageAccordionItem[];

  // 7. Distinctive Features
  featuresTitleBn: string;
  featuresTitleEn: string;
  featuresListBn: string[];
  featuresListEn: string[];

  // 8. Accreditations & Licenses
  accreditationsTaglineBn: string;
  accreditationsTaglineEn: string;
  accreditationsTitleBn: string;
  accreditationsTitleEn: string;
  accreditationsList: HomePageAccreditationItem[];

  // 9. Contact Hotline Banner
  contactBannerTitleBn: string;
  contactBannerTitleEn: string;
  contactBannerSubtitleBn: string;
  contactBannerSubtitleEn: string;
  contactBannerHotline: string;
  contactBannerHotlineLabelBn: string;
  contactBannerHotlineLabelEn: string;
  contactBannerCtaBtnBn: string;
  contactBannerCtaBtnEn: string;
}
