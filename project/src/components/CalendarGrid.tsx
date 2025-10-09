import React from 'react';
import { WEEK_LABELS, COUNTRY_META } from '../constants/countries';
import { CalendarEvent, CountryCode, LanguageDisplay } from '../types/calendar';
import { isSameDay, toKey } from '../utils/dateUtils';

interface CalendarGridProps {
  monthGrid: Date[];
  viewDate: Date;
  today: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  eventsByDate: Record<string, CalendarEvent[]>;
  activeCountries: CountryCode[];
  languageDisplay: LanguageDisplay;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  monthGrid,
  viewDate,
  today,
  selectedDate,
  onSelectDate,
  eventsByDate,
  activeCountries,
  languageDisplay,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 text-xs font-medium text-neutral-600 border-b border-neutral-200 bg-neutral-50">
        {WEEK_LABELS.map((label) => (
          <div key={label} className="px-3 py-3 text-center">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-[minmax(100px,1fr)]">
        {monthGrid.map((date, idx) => {
          const key = toKey(date);
          const inMonth = date.getMonth() === viewDate.getMonth();
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          const events = eventsByDate[key] || [];

          const publicEvents = events.filter((e) => e.type === 'public');
          const customEvents = events.filter((e) => e.type === 'custom');

          const uniqueCountries = new Set(
            publicEvents.flatMap((e) => e.countries.map((c) => c.code))
          );

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`
                relative border-b border-r border-neutral-100 p-2 text-left transition-colors
                hover:bg-neutral-50
                ${!inMonth ? 'bg-neutral-50/40 text-neutral-400' : ''}
                ${isSelected ? 'ring-2 ring-inset ring-neutral-900' : ''}
              `}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className={`
                    text-sm font-medium
                    ${isToday ? 'flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900 text-white' : ''}
                  `}
                >
                  {date.getDate()}
                </span>

                {uniqueCountries.size > 0 && (
                  <div className="flex -space-x-0.5 text-xs leading-none">
                    {Array.from(uniqueCountries)
                      .slice(0, 3)
                      .map((code) => (
                        <span key={code}>
                          {COUNTRY_META[code as CountryCode]?.flag || ''}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                {publicEvents.slice(0, 2).map((event, i) => (
                  <div
                    key={i}
                    className="text-[10px] leading-tight truncate text-neutral-700"
                  >
                    {event.countries.length > 1 && event.countries.length === activeCountries.length
                      ? event.label
                      : `${event.countries.map((c) => c.flag).join('')} ${event.label}`}
                  </div>
                ))}

                {customEvents.slice(0, 1).map((event, i) => (
                  <div
                    key={`custom-${i}`}
                    className="text-[10px] leading-tight truncate font-medium"
                    style={{ color: event.color }}
                  >
                    {event.label}
                  </div>
                ))}

                {publicEvents.length + customEvents.length > 3 && (
                  <div className="text-[9px] text-neutral-400">
                    +{publicEvents.length + customEvents.length - 3} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
