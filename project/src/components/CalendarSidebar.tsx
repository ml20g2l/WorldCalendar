import React from 'react';
import { Plus } from 'lucide-react';
import { COUNTRY_META } from '../constants/countries';
import { CalendarEvent, CountryCode, LanguageDisplay } from '../types/calendar';

interface CalendarSidebarProps {
  selectedDate: Date;
  events: CalendarEvent[];
  activeCountries: CountryCode[];
  languageDisplay: LanguageDisplay;
  onAddCustomHoliday: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  events,
  activeCountries,
  languageDisplay,
  onAddCustomHoliday,
}) => {
  const publicEvents = events.filter((e) => e.type === 'public');
  const customEvents = events.filter((e) => e.type === 'custom');

  return (
    <aside className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-5 flex flex-col max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="text-sm text-neutral-500 mb-1">Selected date</div>
      <div className="text-lg font-semibold mb-4">
        {selectedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Events</div>
        <button
          onClick={onAddCustomHoliday}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          title="Add custom holiday"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-sm text-neutral-500 mb-4">No events this day</div>
      ) : (
        <div className="space-y-3 mb-4">
          {publicEvents.length > 0 && (
            <div>
              <div className="text-xs font-medium text-neutral-500 mb-2">Public Holidays</div>
              <ul className="space-y-2">
                {publicEvents.map((ev, i) => (
                  <li key={i} className="flex flex-col gap-1.5">
                    <div className="font-medium text-sm">{ev.label}</div>
                    <div className="flex gap-2 flex-wrap">
                      {ev.countries.map((c, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-600"
                        >
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              COUNTRY_META[c.code as CountryCode]?.color || 'bg-neutral-400'
                            }`}
                          />
                          <span>{c.flag}</span>
                          {languageDisplay === 'native' && c.local !== ev.label && (
                            <span className="text-neutral-500">{c.local}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {customEvents.length > 0 && (
            <div>
              <div className="text-xs font-medium text-neutral-500 mb-2">Custom Events</div>
              <ul className="space-y-2">
                {customEvents.map((ev, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: ev.color }}
                    />
                    <span className="font-medium text-sm">{ev.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-neutral-200 pt-4 mt-auto">
        <div className="text-sm font-medium mb-3">Active Countries</div>
        <div className="space-y-2">
          {activeCountries.map((code) => (
            <div key={code} className="flex items-center gap-2 text-sm">
              <span
                className={`h-2.5 w-2.5 inline-block rounded-full ${
                  COUNTRY_META[code]?.color || 'bg-neutral-400'
                }`}
              />
              <span className="mr-1">{COUNTRY_META[code]?.flag}</span>
              <span>{COUNTRY_META[code]?.label || code}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
