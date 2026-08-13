export interface TeamMember {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  companyBn: string;
  companyEn: string;
  detailsBn?: string[];
  detailsEn?: string[];
  locationBn?: string;
  locationEn?: string;
  category: 'management' | 'shariah' | 'moallem';
  image?: string;
  isPlaceholder?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'chairman',
    nameBn: 'আল-হাজ্ব নুর মোহাম্মাদ এনামূল হক',
    nameEn: 'Al-Haj Nur Mohammad Enamul Haque',
    roleBn: 'চেয়ারম্যান',
    roleEn: 'Chairman',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    detailsBn: ['প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক'],
    category: 'management',
    image: 'https://lh3.googleusercontent.com/d/1KF8lFX-bH03rBWKvWtZtMrc3O7IDezqs',
  },
  {
    id: 'mufti-sadikur',
    nameBn: 'শায়খ মুফতি সাদিকুর রহমান',
    nameEn: 'Shaykh Mufti Sadikur Rahman',
    roleBn: 'শরিয়াহ কনসালটেন্ট',
    roleEn: 'Shariah Consultant',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    detailsBn: [
      'ইমাম ও খতীব, আশুলিয়া বাজার কেন্দ্রীয় জামে মসজিদ',
      'প্রভাষক, তা\'মীরুল মিল্লাত কামিল মাদরাসা, টঙ্গী',
    ],
    category: 'shariah',
    image: 'https://lh3.googleusercontent.com/d/1NeZquHjetmojSrRfaFPO1MKktO6rvciw',
  },
  {
    id: 'miraj-ahmed',
    nameBn: 'মিরাজ আহমেদ',
    nameEn: 'Miraj Ahmed',
    roleBn: 'ম্যানেজার & সেলস এক্সেকিউটিভ',
    roleEn: 'Manager & Sales Executive',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    category: 'management',
    image: 'https://lh3.googleusercontent.com/d/1Z87t30JqaRXnkJoI_T0Nh4I6gpeksfYz',
  },
  {
    id: 'masudur-rahman',
    nameBn: 'মোঃ মাসুদুর রহমান',
    nameEn: 'Md. Masudur Rahman',
    roleBn: 'মোয়াল্লেম & শরিয়াহ কনসালটেন্ট',
    roleEn: 'Moallem & Shariah Consultant',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    category: 'moallem',
    isPlaceholder: true,
  },
  {
    id: 'moallem-barishal',
    nameBn: 'Unknown',
    nameEn: 'Unknown',
    roleBn: 'মোয়াল্লেম',
    roleEn: 'Moallem',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    locationBn: 'বরিশাল অঞ্চল',
    locationEn: 'Barishal Region',
    category: 'moallem',
    isPlaceholder: true,
  },
  {
    id: 'moallem-rangpur',
    nameBn: 'Unknown',
    nameEn: 'Unknown',
    roleBn: 'মোয়াল্লেম',
    roleEn: 'Moallem',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    locationBn: 'রংপুর অঞ্চল',
    locationEn: 'Rangpur Region',
    category: 'moallem',
    isPlaceholder: true,
  },
  {
    id: 'moallem-tangail',
    nameBn: 'Unknown',
    nameEn: 'Unknown',
    roleBn: 'মোয়াল্লেম',
    roleEn: 'Moallem',
    companyBn: 'ওয়ার্ল্ড হেরিটেজ ট্যুর্স অ্যান্ড ট্রাভেলস',
    companyEn: 'World Heritage Tours & Travels',
    locationBn: 'টাঙ্গাইল অঞ্চল',
    locationEn: 'Tangail Region',
    category: 'moallem',
    isPlaceholder: true,
  },
];

