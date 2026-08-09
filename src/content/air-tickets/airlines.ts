export interface AirlinePartner {
  name: string;
  code: string;
  logo: string;
}

export const partnerAirlines: AirlinePartner[] = [
  { name: 'Saudia Airlines', code: 'SV', logo: '🇸🇦' },
  { name: 'Biman Bangladesh Airlines', code: 'BG', logo: '🇧🇩' },
  { name: 'Emirates', code: 'EK', logo: '🇦🇪' },
  { name: 'Qatar Airways', code: 'QR', logo: '🇶🇦' },
  { name: 'US-Bangla Airlines', code: 'BS', logo: '🇧🇩' },
  { name: 'Air Arabia', code: 'G9', logo: '🇦🇪' },
  { name: 'Kuwait Airways', code: 'KU', logo: '🇰🇼' },
  { name: 'Flydubai', code: 'FZ', logo: '🇦🇪' },
];
