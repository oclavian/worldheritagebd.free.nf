export interface HolySiteImageItem {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  url: string;
  fallbackUrl?: string;
}

export const HOLY_SITES_IMAGES = {
  makkah: {
    id: "makkah",
    nameBn: "পবিত্র মক্কা মুকাররমা (কাবা শরীফ)",
    nameEn: "Holy Makkah (The Kaaba & Masjid al-Haram)",
    descriptionBn: "পবিত্র কাবা শরীফ ও তাওয়াফ প্রান্তর",
    descriptionEn: "The Holy Kaaba & Grand Mosque Tawaf",
    url: "https://lh3.googleusercontent.com/d/12r4H9iF0KgHrHPi0hciMhvKPxU-4eWHt",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=12r4H9iF0KgHrHPi0hciMhvKPxU-4eWHt&sz=w1200",
  },
  madinah: {
    id: "madinah",
    nameBn: "পবিত্র মদিনা মুনাওয়ারা (মসজিদে নববী)",
    nameEn: "Holy Madinah (Al-Masjid an-Nabawi)",
    descriptionBn: "মসজিদে নববী, সবুজ গম্বুজ ও উন্মুক্ত ছাতা চত্বর",
    descriptionEn: "The Prophet's Mosque, Green Dome & Courtyard Umbrellas",
    url: "https://lh3.googleusercontent.com/d/10oFD9Le8oEeucvjzrJ4w8WaTdpD8UUfp",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=10oFD9Le8oEeucvjzrJ4w8WaTdpD8UUfp&sz=w1200",
  },
  mina: {
    id: "mina",
    nameBn: "পবিত্র মিনা প্রান্তর (তাঁবুর শহর)",
    nameEn: "Holy Mina (City of Tents)",
    descriptionBn:
      "হজ্বের দিনগুলোতে মিনার সুবিশাল শীতাতপ নিয়ন্ত্রিত তাঁবুর শহর",
    descriptionEn: "The iconic air-conditioned tent city in Mina valley",
    url: "https://lh3.googleusercontent.com/d/13E6zxdAkmFG6_U3coxwl-9wDBBrT-r3X",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=13E6zxdAkmFG6_U3coxwl-9wDBBrT-r3X&sz=w1200",
  },
  arafat: {
    id: "arafat",
    nameBn: "পবিত্র আরাফাত ময়দান (জাবালে রহমত)",
    nameEn: "Holy Mount Arafat (Jabal al-Rahmah)",
    descriptionBn: "হজের মূল আরকান—আরাফাতের ঐতিহাসিক বরকতময় প্রান্তর",
    descriptionEn: "The sacred plain of Arafat and Mountain of Mercy",
    url: "https://lh3.googleusercontent.com/d/1WXbn599ZILjt0T-lfCTQQ3AuGaqvKYHq",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=1WXbn599ZILjt0T-lfCTQQ3AuGaqvKYHq&sz=w1200",
  },
  muzdalifah: {
    id: "muzdalifah",
    nameBn: "পবিত্র মুজদালিফা প্রান্তর",
    nameEn: "Holy Muzdalifah Plain",
    descriptionBn: "মাশআরুল হারামে মুক্ত আকাশের নিচে রাত্রিযাপন ও পাথর সংগ্রহ",
    descriptionEn: "Pilgrims resting under open skies at sacred Muzdalifah",
    url: "https://lh3.googleusercontent.com/d/1FicUBcNXriSeuHcrmIw7WaSrbUzYlAQL",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=1FicUBcNXriSeuHcrmIw7WaSrbUzYlAQL&sz=w1200",
  },
  taif: {
    id: "taif",
    nameBn: "পবিত্র মক্কা মুকাররমা ও জিয়ারাহ",
    nameEn: "Holy Makkah Ziyarah & Holy Sites",
    descriptionBn: "পবিত্র মক্কার ঐতিহাসিক স্থানসমূহ ও বরকতময় জিয়ারাহ",
    descriptionEn: "Historical Holy Sites and Blessed Ziyarah in Makkah",
    url: "https://lh3.googleusercontent.com/d/1c72GWSQMJ6U9U4ntWGfylOwvwM2RBG3f",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=1c72GWSQMJ6U9U4ntWGfylOwvwM2RBG3f&sz=w1200",
  },
  jeddah: {
    id: "jeddah",
    nameBn: "পবিত্র মদিনা মুনাওয়ারা জিয়ারাহ",
    nameEn: "Holy Madinah Munawwarah Ziyarah",
    descriptionBn: "পবিত্র মদিনার ঐতিহাসিক মসজিদ ও বরকতময় জিয়ারাহ",
    descriptionEn: "Historical Holy Mosques and Blessed Ziyarah in Madinah",
    url: "https://lh3.googleusercontent.com/d/1A8-ulMjjQH6PnQjJZ7W-jh2paU6XKm8j",
    fallbackUrl:
      "https://drive.google.com/thumbnail?id=1A8-ulMjjQH6PnQjJZ7W-jh2paU6XKm8j&sz=w1200",
  },
};

// 7 Holy Sites Full Collection for Hajj Packages
export const HAJJ_HOLY_SITES_GALLERY: HolySiteImageItem[] = [
  HOLY_SITES_IMAGES.makkah,
  HOLY_SITES_IMAGES.madinah,
  HOLY_SITES_IMAGES.mina,
  HOLY_SITES_IMAGES.arafat,
  HOLY_SITES_IMAGES.muzdalifah,
  HOLY_SITES_IMAGES.taif,
  HOLY_SITES_IMAGES.jeddah,
];
