import React, { useState } from 'react';
import { COUNTRY_META, FR_REGION_META } from '../constants/countries';
import { CountryCode, LanguageDisplay } from '../types/calendar';

interface OnboardingScreenProps {
  onComplete: (
    countries: CountryCode[],
    languageDisplay: LanguageDisplay,
    frRegions: Record<string, boolean>
  ) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>([]);
  const [languageDisplay, setLanguageDisplay] = useState<LanguageDisplay>('app');
  const [frRegions, setFrRegions] = useState<Record<string, boolean>>({
    AM: false,
    RE: false,
    GP: false,
    MQ: false,
    GF: false,
    YT: false,
    NC: false,
    PF: false,
    WF: false,
  });

  const toggleCountry = (code: CountryCode) => {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const toggleRegion = (key: string) => {
    setFrRegions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    if (selectedCountries.length > 0) {
      onComplete(selectedCountries, languageDisplay, frRegions);
    }
  };

  const availableCountries = Object.keys(COUNTRY_META) as CountryCode[];
  const isFRSelected = selectedCountries.includes('FR');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">World Calendar</h1>
        <p className="text-neutral-600 text-center mb-8">
          View public holidays from multiple countries at a glance
        </p>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Countries</h2>
          <div className="max-h-80 overflow-y-auto border border-neutral-200 rounded-xl p-4 space-y-2">
            {availableCountries.map((code) => (
              <div key={code}>
                <button
                  onClick={() => toggleCountry(code)}
                  className={`
                    w-full px-4 py-3 rounded-xl text-left border transition-all
                    ${
                      selectedCountries.includes(code)
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }
                  `}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="text-xl">{COUNTRY_META[code]?.flag}</span>
                    <span className="font-medium">{COUNTRY_META[code]?.label}</span>
                    <span className="text-sm opacity-70">
                      ({COUNTRY_META[code]?.labelLocal})
                    </span>
                  </span>
                </button>

                {code === 'FR' && isFRSelected && (
                  <div className="mt-3 ml-4 pl-4 border-l-2 border-neutral-200 space-y-2">
                    <div className="text-xs text-neutral-500 font-medium mb-2">
                      France Regional Holidays
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {FR_REGION_META.map((r) => (
                        <button
                          key={r.key}
                          onClick={() => toggleRegion(r.key)}
                          className={`
                            px-3 py-2 rounded-lg border text-sm transition-all
                            ${
                              frRegions[r.key]
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                            }
                          `}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Language Display</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
              <input
                type="radio"
                name="language"
                value="native"
                checked={languageDisplay === 'native'}
                onChange={(e) => setLanguageDisplay(e.target.value as LanguageDisplay)}
                className="w-4 h-4"
              />
              <div>
                <div className="font-medium">Show holidays in each country's native language</div>
                <div className="text-sm text-neutral-500">
                  e.g., "Jour de l'An" for French New Year
                </div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors">
              <input
                type="radio"
                name="language"
                value="app"
                checked={languageDisplay === 'app'}
                onChange={(e) => setLanguageDisplay(e.target.value as LanguageDisplay)}
                className="w-4 h-4"
              />
              <div>
                <div className="font-medium">Show holidays in app language</div>
                <div className="text-sm text-neutral-500">
                  e.g., "New Year's Day" for all countries
                </div>
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={selectedCountries.length === 0}
          className="w-full px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
