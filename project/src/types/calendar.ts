export interface CountryMeta {
  label: string;
  labelLocal: string;
  color: string;
  flag: string;
}

export interface HolidayEvent {
  name_local: string;
  name_intl: string;
  country: string;
}

export interface CustomHoliday {
  id: string;
  title: string;
  date: string;
  isRecurring: boolean;
  category: 'birthday' | 'anniversary' | 'religious' | 'cultural' | 'other';
  color: string;
  notificationDays: number[];
}

export interface CalendarEvent {
  label: string;
  countries: Array<{ code: string; local: string; flag: string }>;
  type: 'public' | 'custom';
  color?: string;
}

export type CountryCode = 'KR' | 'UK' | 'US' | 'CA' | 'AU' | 'NZ' | 'IE' | 'FR' | 'DE' | 'JP' | 'CN' | 'BR' | 'IN';

export type LanguageDisplay = 'native' | 'app';

export interface AppSettings {
  selectedCountries: CountryCode[];
  languageDisplay: LanguageDisplay;
  frRegions: Record<string, boolean>;
}
