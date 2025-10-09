import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Settings } from 'lucide-react';
import { CountryCode, LanguageDisplay, CalendarEvent } from '../types/calendar';
import { buildMonthMatrix, addMonths, startOfMonth, toKey, coerceDate } from '../utils/dateUtils';
import { holidayCalculators } from '../utils/holidayCalculators';
import { customHolidayService } from '../services/customHolidayService';
import { COUNTRY_META } from '../constants/countries';
import { OnboardingScreen } from './OnboardingScreen';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';
import { CustomHolidayModal } from './CustomHolidayModal';

const SETTINGS_KEY = 'world_calendar_settings';

export const WorldCalendar: React.FC = () => {
  const initialNow = useRef(new Date()).current;
  const [viewDate, setViewDate] = useState(new Date(initialNow.getFullYear(), initialNow.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(initialNow);
  const [activeCountries, setActiveCountries] = useState<CountryCode[]>([]);
  const [languageDisplay, setLanguageDisplay] = useState<LanguageDisplay>('app');
  const [frRegions, setFrRegions] = useState<Record<string, boolean>>({});
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customHolidays, setCustomHolidays] = useState(customHolidayService.getAll());

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setActiveCountries(settings.selectedCountries || []);
        setLanguageDisplay(settings.languageDisplay || 'app');
        setFrRegions(settings.frRegions || {});
        setShowOnboarding(false);
      } catch {
        setShowOnboarding(true);
      }
    }
  }, []);

  const saveSettings = (
    countries: CountryCode[],
    lang: LanguageDisplay,
    regions: Record<string, boolean>
  ) => {
    const settings = {
      selectedCountries: countries,
      languageDisplay: lang,
      frRegions: regions,
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  };

  const handleOnboardingComplete = (
    countries: CountryCode[],
    lang: LanguageDisplay,
    regions: Record<string, boolean>
  ) => {
    setActiveCountries(countries);
    setLanguageDisplay(lang);
    setFrRegions(regions);
    saveSettings(countries, lang, regions);
    setShowOnboarding(false);
  };

  const safeViewDate = coerceDate(viewDate, initialNow);
  const year = safeViewDate.getFullYear();
  const month = safeViewDate.getMonth();

  const monthGrid = useMemo(() => buildMonthMatrix(safeViewDate), [safeViewDate]);

  const monthName = safeViewDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const publicHolidays = useMemo(() => {
    const result: Record<string, any> = {};

    activeCountries.forEach((code) => {
      let calculator = holidayCalculators[code];
      if (!calculator) return;

      let holidays;
      if (code === 'FR') {
        holidays = calculator(year, frRegions);
      } else {
        holidays = calculator(year);
      }

      Object.entries(holidays).forEach(([dateKey, events]) => {
        if (!result[dateKey]) result[dateKey] = {};
        result[dateKey][code] = events;
      });
    });

    return result;
  }, [activeCountries, year, frRegions]);

  const customHolidaysByDate = useMemo(() => {
    return customHolidayService.getForMonth(year, month);
  }, [customHolidays, year, month]);

  const eventsByDate = useMemo(() => {
    const result: Record<string, CalendarEvent[]> = {};

    Object.entries(publicHolidays).forEach(([dateKey, countryData]) => {
      const eventMap: Record<string, CalendarEvent> = {};

      Object.entries(countryData).forEach(([countryCode, events]: [string, any]) => {
        const meta = COUNTRY_META[countryCode as CountryCode];
        if (!meta) return;

        (events as any[]).forEach((event) => {
          const displayName = languageDisplay === 'native' ? event.name_local : event.name_intl;

          if (!eventMap[displayName]) {
            eventMap[displayName] = {
              label: displayName,
              countries: [],
              type: 'public',
            };
          }

          eventMap[displayName].countries.push({
            code: countryCode,
            local: event.name_local,
            flag: meta.flag,
          });
        });
      });

      result[dateKey] = Object.values(eventMap);
    });

    Object.entries(customHolidaysByDate).forEach(([dateKey, holidays]) => {
      if (!result[dateKey]) result[dateKey] = [];
      holidays.forEach((holiday) => {
        result[dateKey].push({
          label: holiday.title,
          countries: [],
          type: 'custom',
          color: holiday.color,
        });
      });
    });

    return result;
  }, [publicHolidays, customHolidaysByDate, languageDisplay]);

  const selectedEvents = eventsByDate[toKey(selectedDate)] || [];

  const handleAddCustomHoliday = (holiday: Omit<any, 'id'>) => {
    customHolidayService.add(holiday);
    setCustomHolidays(customHolidayService.getAll());
  };

  const handlePrevMonth = () => setViewDate(addMonths(safeViewDate, -1));
  const handleNextMonth = () => setViewDate(addMonths(safeViewDate, 1));
  const handleToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const handleOpenCustomModal = () => {
    setShowCustomModal(true);
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-7 w-7 text-neutral-900" />
              <h1 className="text-2xl font-bold tracking-tight">World Calendar</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="px-4 py-1.5 text-sm font-medium min-w-[140px] text-center">
                  {monthName}
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleToday}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-neutral-200 hover:bg-neutral-100 transition-colors"
              >
                Today
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <button
                onClick={() => {
                  setShowOnboarding(true);
                  setShowSettings(false);
                }}
                className="px-4 py-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 text-sm font-medium transition-colors"
              >
                Change Countries & Settings
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <CalendarGrid
            monthGrid={monthGrid}
            viewDate={safeViewDate}
            today={initialNow}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            eventsByDate={eventsByDate}
            activeCountries={activeCountries}
            languageDisplay={languageDisplay}
          />

          <CalendarSidebar
            selectedDate={selectedDate}
            events={selectedEvents}
            activeCountries={activeCountries}
            languageDisplay={languageDisplay}
            onAddCustomHoliday={handleOpenCustomModal}
          />
        </div>
      </main>

      <CustomHolidayModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onSave={handleAddCustomHoliday}
        initialDate={toKey(selectedDate)}
      />
    </div>
  );
};
