import { CountryMeta, CountryCode } from '../types/calendar';

export const COUNTRY_META: Record<CountryCode, CountryMeta> = {
  KR: { label: 'Korea', labelLocal: '대한민국', color: 'bg-sky-500', flag: '🇰🇷' },
  UK: { label: 'United Kingdom', labelLocal: 'United Kingdom', color: 'bg-rose-500', flag: '🇬🇧' },
  US: { label: 'United States', labelLocal: 'United States', color: 'bg-blue-600', flag: '🇺🇸' },
  CA: { label: 'Canada', labelLocal: 'Canada', color: 'bg-red-600', flag: '🇨🇦' },
  AU: { label: 'Australia', labelLocal: 'Australia', color: 'bg-amber-500', flag: '🇦🇺' },
  NZ: { label: 'New Zealand', labelLocal: 'New Zealand', color: 'bg-slate-700', flag: '🇳🇿' },
  IE: { label: 'Ireland', labelLocal: 'Ireland', color: 'bg-green-600', flag: '🇮🇪' },
  FR: { label: 'France', labelLocal: 'France', color: 'bg-blue-500', flag: '🇫🇷' },
  DE: { label: 'Germany', labelLocal: 'Deutschland', color: 'bg-slate-800', flag: '🇩🇪' },
  JP: { label: 'Japan', labelLocal: '日本', color: 'bg-red-500', flag: '🇯🇵' },
  CN: { label: 'China', labelLocal: '中国', color: 'bg-red-700', flag: '🇨🇳' },
  BR: { label: 'Brazil', labelLocal: 'Brasil', color: 'bg-green-500', flag: '🇧🇷' },
  IN: { label: 'India', labelLocal: 'भारत', color: 'bg-orange-500', flag: '🇮🇳' },
};

export const FR_REGION_META = [
  { key: 'AM', label: 'Alsace–Moselle' },
  { key: 'RE', label: 'La Réunion' },
  { key: 'GP', label: 'Guadeloupe' },
  { key: 'MQ', label: 'Martinique' },
  { key: 'GF', label: 'Guyane' },
  { key: 'YT', label: 'Mayotte' },
  { key: 'NC', label: 'Nouvelle-Calédonie' },
  { key: 'PF', label: 'Polynésie française' },
  { key: 'WF', label: 'Wallis‑et‑Futuna' },
];

export const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
