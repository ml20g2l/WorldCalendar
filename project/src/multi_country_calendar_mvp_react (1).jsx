import React, { useMemo, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalIcon, AlertTriangle } from "lucide-react";

const COUNTRY_META = {
  KR: { label: "Korea", labelLocal: "한국", color: "bg-sky-500" },
  UK: { label: "United Kingdom", labelLocal: "United Kingdom", color: "bg-rose-500" },
  US: { label: "United States", labelLocal: "United States", color: "bg-amber-500" },
  CA: { label: "Canada", labelLocal: "Canada", color: "bg-emerald-500" },
  AU: { label: "Australia", labelLocal: "Australia", color: "bg-blue-600" },
  NZ: { label: "New Zealand", labelLocal: "New Zealand", color: "bg-black" },
  IE: { label: "Ireland", labelLocal: "Ireland", color: "bg-green-600" },
  FR: { label: "France", labelLocal: "France", color: "bg-indigo-500" },
};

const FR_REGION_META = [
  { key: "AM", label: "Alsace–Moselle" },
  { key: "RE", label: "La Réunion" },
  { key: "GP", label: "Guadeloupe" },
  { key: "MQ", label: "Martinique" },
  { key: "GF", label: "Guyane" },
  { key: "YT", label: "Mayotte" },
  { key: "NC", label: "Nouvelle-Calédonie" },
  { key: "PF", label: "Polynésie française" },
  { key: "WF", label: "Wallis‑et‑Futuna" },
];

const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());
const coerceDate = (maybeDate, fallback = new Date()) =>
  isValidDate(maybeDate) ? new Date(maybeDate) : new Date(fallback.getFullYear(), fallback.getMonth(), 1);

const z = (n) => (n < 10 ? `0${n}` : `${n}`);
const toKey = (date) => (isValidDate(date) ? `${date.getFullYear()}-${z(date.getMonth() + 1)}-${z(date.getDate())}` : "");

const startOfMonth = (date) => {
  const d = coerceDate(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

const addMonths = (date, delta) => {
  const d = coerceDate(date);
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
};

function buildMonthMatrix(viewDate) {
  const first = startOfMonth(viewDate);
  const startOffset = first.getDay();
  const start = new Date(first);
  start.setDate(first.getDate() - startOffset);
  const grid = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    grid.push(d);
  }
  return grid;
}

function isSameDay(a, b) {
  return isValidDate(a) && isValidDate(b) && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function getEnv(keyPath) {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[keyPath]) return import.meta.env[keyPath];
  } catch {}
  try {
    if (typeof process !== "undefined" && process.env && process.env[keyPath]) return process.env[keyPath];
  } catch {}
  return undefined;
}

function getApiBase() {
  let hasWinBase = false;
  let winBase;
  if (typeof window !== "undefined") {
    hasWinBase = Object.prototype.hasOwnProperty.call(window, "__HOLIDAY_API_BASE__");
    winBase = window.__HOLIDAY_API_BASE__;
  }
  if (hasWinBase && winBase !== undefined) return (winBase ?? "").toString();
  const viteBase = getEnv("VITE_API_BASE");
  if (viteBase !== undefined) return viteBase.toString();
  const craBase = getEnv("REACT_APP_API_BASE");
  if (craBase !== undefined) return craBase.toString();
  const origin = typeof window !== "undefined" && window.location ? window.location.origin : "";
  return origin.toString();
}

function buildApiUrl(code, year) {
  const base = getApiBase();
  const path = `/holidays/${code}/${year}`;
  if (!base) return path;
  return base.endsWith("/") ? `${base.slice(0, -1)}${path}` : `${base}${path}`;
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function nthWeekdayOfMonth(year, monthIdx0, weekday, nth) {
  const first = new Date(year, monthIdx0, 1);
  const offset = (7 + weekday - first.getDay()) % 7;
  const day = 1 + offset + (nth - 1) * 7;
  return new Date(year, monthIdx0, day);
}

function lastWeekdayOfMonth(year, monthIdx0, weekday) {
  const last = new Date(year, monthIdx0 + 1, 0);
  const diff = (7 + last.getDay() - weekday) % 7;
  return new Date(year, monthIdx0, last.getDate() - diff);
}

function observedUS(year, monthIdx0, day) {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, -1);
  if (w === 0) return addDays(d, 1);
  return d;
}

function observedUK(year, monthIdx0, day) {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, 2);
  if (w === 0) return addDays(d, 1);
  return d;
}

function observedAU(year, monthIdx0, day) {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, 2);
  if (w === 0) return addDays(d, 1);
  return d;
}

function observedNZ(year, monthIdx0, day) {
  return observedUK(year, monthIdx0, day);
}

function observedIE(year, monthIdx0, day) {
  return observedUK(year, monthIdx0, day);
}

function observedCA(year, monthIdx0, day) {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, -1);
  if (w === 0) return addDays(d, 1);
  return d;
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addHoliday(map, date, nameLocal, nameIntl, code) {
  const key = toKey(date);
  if (!map[key]) map[key] = [];
  map[key].push({ name_local: nameLocal, name_intl: nameIntl, country: code });
}

function mergeMaps(base, ...extras) {
  const out = { ...(base || {}) };
  for (const m of extras) {
    for (const [k, arr] of Object.entries(m || {})) {
      if (!out[k]) out[k] = [];
      for (const ev of arr) out[k].push(ev);
    }
  }
  return out;
}

function makeUSHolidays(year) {
  const map = {};
  addHoliday(map, observedUS(year, 0, 1), "New Year's Day (observed)", "New Year's Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 0, 1, 3), "Martin Luther King Jr. Day", "Martin Luther King Jr. Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 1, 1, 3), "Presidents' Day", "Presidents' Day", "US");
  addHoliday(map, lastWeekdayOfMonth(year, 4, 1), "Memorial Day", "Memorial Day", "US");
  addHoliday(map, observedUS(year, 5, 19), "Juneteenth", "Juneteenth", "US");
  addHoliday(map, observedUS(year, 6, 4), "Independence Day (observed)", "Independence Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 8, 1, 1), "Labor Day", "Labor Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 2), "Columbus Day", "Columbus Day", "US");
  addHoliday(map, observedUS(year, 10, 11), "Veterans Day (observed)", "Veterans Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 10, 4, 4), "Thanksgiving", "Thanksgiving", "US");
  addHoliday(map, observedUS(year, 11, 25), "Christmas Day (observed)", "Christmas", "US");
  return map;
}

function makeEWHolidays(year, code = "UK") {
  const map = {};
  addHoliday(map, observedUK(year, 0, 1), "New Year's Day", "New Year's Day", code);
  const easter = easterSunday(year);
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", code);
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", code);
  addHoliday(map, nthWeekdayOfMonth(year, 4, 1, 1), "Early May bank holiday", "Early May bank holiday", code);
  addHoliday(map, lastWeekdayOfMonth(year, 4, 1), "Spring bank holiday", "Spring bank holiday", code);
  addHoliday(map, lastWeekdayOfMonth(year, 7, 1), "Summer bank holiday", "Summer bank holiday", code);
  const xmasObserved = observedUK(year, 11, 25);
  let boxingObserved = observedUK(year, 11, 26);
  if (toKey(xmasObserved) === toKey(boxingObserved)) boxingObserved = addDays(boxingObserved, 1);
  addHoliday(map, xmasObserved, "Christmas Day", "Christmas", code);
  addHoliday(map, boxingObserved, "Boxing Day", "Boxing Day", code);
  return map;
}

function makeScotlandHolidays(year) {
  const map = {};
  const newYear = observedUK(year, 0, 1);
  const jan2 = observedUK(year, 0, 2);
  if (toKey(jan2) === toKey(newYear)) {
    addHoliday(map, addDays(jan2, 1), "2 January (Scotland)", "2 January (Scotland)", "UK");
  } else {
    addHoliday(map, jan2, "2 January (Scotland)", "2 January (Scotland)", "UK");
  }
  addHoliday(map, nthWeekdayOfMonth(year, 7, 1, 1), "Summer bank holiday (Scotland)", "Summer bank holiday (Scotland)", "UK");
  const stAndrews = observedUK(year, 10, 30);
  addHoliday(map, stAndrews, "St Andrew's Day (Scotland)", "St Andrew's Day (Scotland)", "UK");
  return map;
}

function makeNorthernIrelandHolidays(year) {
  const map = {};
  addHoliday(map, observedUK(year, 2, 17), "St Patrick's Day (Northern Ireland)", "St Patrick's Day (Northern Ireland)", "UK");
  const boyne = observedUK(year, 6, 12);
  addHoliday(map, boyne, "Battle of the Boyne (Northern Ireland)", "Battle of the Boyne (Northern Ireland)", "UK");
  return map;
}

function makeCanadaHolidays(year) {
  const map = {};
  const easter = easterSunday(year);
  addHoliday(map, observedCA(year, 0, 1), "New Year's Day (observed)", "New Year's Day", "CA");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "CA");
  const may24 = new Date(year, 4, 24);
  const delta = (7 + may24.getDay() - 1) % 7;
  const victoria = new Date(year, 4, 24 - delta);
  addHoliday(map, victoria, "Victoria Day", "Victoria Day", "CA");
  addHoliday(map, observedCA(year, 6, 1), "Canada Day (observed)", "Canada Day", "CA");
  addHoliday(map, nthWeekdayOfMonth(year, 8, 1, 1), "Labour Day", "Labour Day", "CA");
  if (year >= 2021) addHoliday(map, observedCA(year, 8, 30), "National Day for Truth and Reconciliation", "National Day for Truth and Reconciliation", "CA");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 2), "Thanksgiving (Canada)", "Thanksgiving (Canada)", "CA");
  addHoliday(map, observedCA(year, 10, 11), "Remembrance Day (observed)", "Remembrance Day", "CA");
  addHoliday(map, observedCA(year, 11, 25), "Christmas Day (observed)", "Christmas", "CA");
  addHoliday(map, observedCA(year, 11, 26), "Boxing Day (observed)", "Boxing Day", "CA");
  return map;
}

function makeAustraliaHolidays(year) {
  const map = {};
  const easter = easterSunday(year);
  addHoliday(map, observedAU(year, 0, 1), "New Year's Day (observed)", "New Year's Day", "AU");
  addHoliday(map, observedAU(year, 0, 26), "Australia Day (observed)", "Australia Day", "AU");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "AU");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "AU");
  addHoliday(map, observedAU(year, 3, 25), "ANZAC Day (observed)", "ANZAC Day", "AU");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 2), "King's Birthday (most states)", "King's Birthday (most states)", "AU");
  addHoliday(map, observedAU(year, 11, 25), "Christmas Day (observed)", "Christmas", "AU");
  addHoliday(map, observedAU(year, 11, 26), "Boxing Day (observed)", "Boxing Day", "AU");
  return map;
}

function makeNewZealandHolidays(year) {
  const map = {};
  const easter = easterSunday(year);
  const ny = observedNZ(year, 0, 1);
  let ny2 = observedNZ(year, 0, 2);
  if (toKey(ny) === toKey(ny2)) ny2 = addDays(ny2, 1);
  addHoliday(map, ny, "New Year's Day", "New Year's Day", "NZ");
  addHoliday(map, ny2, "Day after New Year's Day", "Day after New Year's Day", "NZ");
  addHoliday(map, observedNZ(year, 1, 6), "Waitangi Day", "Waitangi Day", "NZ");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "NZ");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "NZ");
  addHoliday(map, observedNZ(year, 3, 25), "ANZAC Day", "ANZAC Day", "NZ");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 1), "King's Birthday", "King's Birthday", "NZ");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 4), "Labour Day (NZ)", "Labour Day (NZ)", "NZ");
  const xmasObserved = observedNZ(year, 11, 25);
  let boxingObserved = observedNZ(year, 11, 26);
  if (toKey(xmasObserved) === toKey(boxingObserved)) boxingObserved = addDays(boxingObserved, 1);
  addHoliday(map, xmasObserved, "Christmas Day", "Christmas", "NZ");
  addHoliday(map, boxingObserved, "Boxing Day", "Boxing Day", "NZ");
  return map;
}

function makeIrelandHolidays(year) {
  const map = {};
  const easter = easterSunday(year);
  addHoliday(map, observedIE(year, 0, 1), "New Year's Day (observed)", "New Year's Day", "IE");
  if (year >= 2023) {
    const feb1 = new Date(year, 1, 1);
    const stBrigid = feb1.getDay() === 5 ? feb1 : nthWeekdayOfMonth(year, 1, 1, 1);
    addHoliday(map, stBrigid, "St Brigid's Day", "St Brigid's Day", "IE");
  }
  addHoliday(map, observedIE(year, 2, 17), "St Patrick's Day (observed)", "St Patrick's Day", "IE");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 4, 1, 1), "May Day", "May Day", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 1), "June Holiday", "June Holiday", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 7, 1, 1), "August Holiday", "August Holiday", "IE");
  addHoliday(map, lastWeekdayOfMonth(year, 9, 1), "October Bank Holiday", "October Bank Holiday", "IE");
  const xmasObserved = observedIE(year, 11, 25);
  let stephObserved = observedIE(year, 11, 26);
  if (toKey(xmasObserved) === toKey(stephObserved)) stephObserved = addDays(stephObserved, 1);
  addHoliday(map, xmasObserved, "Christmas Day", "Christmas", "IE");
  addHoliday(map, stephObserved, "St Stephen's Day", "St Stephen's Day", "IE");
  return map;
}

function makeFranceRegionalHolidays(year, regions = {}) {
  const map = {};
  const easter = easterSunday(year);
  if (regions.AM) {
    addHoliday(map, addDays(easter, -2), "Vendredi saint (Alsace–Moselle)", "Good Friday (Alsace–Moselle)", "FR");
    addHoliday(map, new Date(year, 11, 26), "Saint Étienne (Alsace–Moselle)", "St Stephen's Day (Alsace–Moselle)", "FR");
  }
  if (regions.RE) {
    addHoliday(map, new Date(year, 11, 20), "Abolition de l'esclavage (La Réunion)", "Abolition of Slavery (Réunion)", "FR");
  }
  if (regions.GP) {
    addHoliday(map, new Date(year, 4, 27), "Abolition de l'esclavage (Guadeloupe)", "Abolition of Slavery (Guadeloupe)", "FR");
  }
  if (regions.MQ) {
    addHoliday(map, new Date(year, 4, 22), "Abolition de l'esclavage (Martinique)", "Abolition of Slavery (Martinique)", "FR");
  }
  if (regions.GF) {
    addHoliday(map, new Date(year, 5, 10), "Abolition de l'esclavage (Guyane)", "Abolition of Slavery (French Guiana)", "FR");
  }
  if (regions.YT) {
    addHoliday(map, new Date(year, 3, 27), "Abolition de l'esclavage (Mayotte)", "Abolition of Slavery (Mayotte)", "FR");
  }
  if (regions.NC) {
    addHoliday(map, new Date(year, 8, 24), "Fête de la Citoyenneté (Nouvelle-Calédonie)", "Citizenship Day (New Caledonia)", "FR");
  }
  if (regions.PF) {
    addHoliday(map, new Date(year, 5, 29), "Fête de l'Autonomie (Polynésie française)", "Autonomy Day (French Polynesia)", "FR");
  }
  if (regions.WF) {
    addHoliday(map, new Date(year, 3, 28), "Saint Pierre Chanel (Wallis‑et‑Futuna)", "Saint Peter Chanel (Wallis & Futuna)", "FR");
  }
  return map;
}

function makeFranceHolidays(year, regions = {}) {
  const map = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Jour de l'An", "New Year's Day", "FR");
  addHoliday(map, addDays(easter, 1), "Lundi de Pâques", "Easter Monday", "FR");
  addHoliday(map, new Date(year, 4, 1), "Fête du Travail", "Labour Day", "FR");
  addHoliday(map, new Date(year, 4, 8), "Victoire 1945", "Victory in Europe Day", "FR");
  addHoliday(map, addDays(easter, 39), "Ascension", "Ascension Day", "FR");
  addHoliday(map, addDays(easter, 50), "Lundi de Pentecôte", "Whit Monday", "FR");
  addHoliday(map, new Date(year, 6, 14), "Fête Nationale", "Bastille Day", "FR");
  addHoliday(map, new Date(year, 7, 15), "Assomption", "Assumption of Mary", "FR");
  addHoliday(map, new Date(year, 10, 1), "La Toussaint", "All Saints' Day", "FR");
  addHoliday(map, new Date(year, 10, 11), "Armistice 1918", "Armistice Day", "FR");
  addHoliday(map, new Date(year, 11, 25), "Noël", "Christmas", "FR");
  return mergeMaps(map, makeFranceRegionalHolidays(year, regions));
}

export default function MultiCountryCalendarApp() {
  const initialNow = useRef(new Date()).current;
  const [viewDate, setViewDate] = useState(new Date(initialNow.getFullYear(), initialNow.getMonth(), 1));
  const [activeCountries, setActiveCountries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(initialNow);
  const [onboarding, setOnboarding] = useState(true);
  const [holidayData, setHolidayData] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [frRegions, setFrRegions] = useState({ AM: false, RE: false, GP: false, MQ: false, GF: false, YT: false, NC: false, PF: false, WF: false });

  const locale = (typeof navigator !== "undefined" && navigator.language) || "en-GB";
  const safeViewDate = coerceDate(viewDate, initialNow);
  const monthName = safeViewDate.toLocaleString(locale, { month: "long", year: "numeric" });

  const monthGrid = useMemo(() => buildMonthMatrix(safeViewDate), [safeViewDate]);
  const selectedKey = toKey(selectedDate);
  const year = useMemo(() => safeViewDate.getFullYear(), [safeViewDate]);

  function makeUKCombinedHolidays(year) {
    const base = makeEWHolidays(year, "UK");
    const scot = makeScotlandHolidays(year);
    const nir = makeNorthernIrelandHolidays(year);
    return mergeMaps(base, scot, nir);
  }

  async function fetchHolidaysForActiveCountries(signal) {
    const results = {};
    let anyError = null;
    for (const code of activeCountries) {
      if (code === "US") {
        results[code] = makeUSHolidays(year);
        continue;
      }
      if (code === "UK") {
        results[code] = makeUKCombinedHolidays(year);
        continue;
      }
      if (code === "CA") {
        results[code] = makeCanadaHolidays(year);
        continue;
      }
      if (code === "AU") {
        results[code] = makeAustraliaHolidays(year);
        continue;
      }
      if (code === "NZ") {
        results[code] = makeNewZealandHolidays(year);
        continue;
      }
      if (code === "IE") {
        results[code] = makeIrelandHolidays(year);
        continue;
      }
      if (code === "FR") {
        results[code] = makeFranceHolidays(year, frRegions);
        continue;
      }
      try {
        const url = buildApiUrl(code, year);
        if (typeof fetch !== "function") throw new Error("fetch not available in this environment");
        const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
        const text = await res.text();
        const json = text ? JSON.parse(text) : {};
        results[code] = json || {};
      } catch (err) {
        results[code] = results[code] || {};
        anyError = anyError || err;
      }
    }
    if (anyError) setApiError(anyError.message || String(anyError));
    else setApiError(null);
    return results;
  }

  useEffect(() => {
    if (activeCountries.length === 0) return;
    const ctrl = new AbortController();
    const run = async () => {
      setLoading(true);
      const data = await fetchHolidaysForActiveCountries(ctrl.signal);
      setHolidayData(data);
      setLoading(false);
    };
    run();
    return () => ctrl.abort();
  }, [activeCountries, year, frRegions]);

  const selectedEvents = useMemo(() => {
    if (!selectedKey) return [];
    const seen = {};
    const out = [];
    activeCountries.forEach((code) => {
      const holidays = holidayData[code] || {};
      const events = holidays[selectedKey];
      if (Array.isArray(events)) {
        events.forEach((ev) => {
          const key = ev?.name_intl || ev?.name_local || "Holiday";
          if (!seen[key]) {
            seen[key] = [];
            out.push({ label: key, countries: [] });
          }
          seen[key].push({ code, local: ev?.name_local || key });
        });
      }
    });
    return out.map((item) => ({ ...item, countries: seen[item.label] }));
  }, [selectedKey, activeCountries, holidayData]);

  if (onboarding) {
    const AVAILABLE_COUNTRIES = Object.keys(COUNTRY_META).map((k) => ({ code: k, label: COUNTRY_META[k].label }));
    const toggleCountry = (code) => {
      setActiveCountries((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    };

    const toggleRegion = (key) => {
      setFrRegions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const isFRSelected = activeCountries.includes("FR");

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 text-neutral-900 p-6">
        <h1 className="text-2xl font-bold mb-4">Select countries</h1>
        <div className="max-h-96 overflow-y-auto w-full max-w-sm space-y-2">
          {AVAILABLE_COUNTRIES.map(({ code, label }) => (
            <div key={code}>
              <button
                onClick={() => toggleCountry(code)}
                className={classNames(
                  "w-full px-4 py-2 rounded-xl text-left border",
                  activeCountries.includes(code) ? "bg-neutral-900 text-white" : "bg-white border-neutral-300"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <span className={classNames("inline-block h-2.5 w-2.5 rounded-full", COUNTRY_META[code]?.color)} />
                  {label} ({code})
                </span>
              </button>
              {code === "FR" && isFRSelected && (
                <div className="mt-2 pl-3 border-l border-neutral-200 space-y-2">
                  <div className="text-xs text-neutral-500">France regional holidays</div>
                  <div className="grid grid-cols-2 gap-2">
                    {FR_REGION_META.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => toggleRegion(r.key)}
                        className={classNames(
                          "px-3 py-1.5 rounded-lg border text-sm",
                          frRegions[r.key] ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-neutral-300"
                        )}
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
        <button
          onClick={() => setOnboarding(false)}
          disabled={activeCountries.length === 0}
          className="mt-6 px-6 py-2 rounded-xl bg-neutral-900 text-white disabled:bg-neutral-300"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CalIcon className="h-6 w-6" />
            <h1 className="text-lg font-semibold tracking-tight">World Calendar</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setViewDate(addMonths(safeViewDate, -1))} className="p-2 rounded-xl hover:bg-neutral-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="px-3 py-1.5 text-sm font-medium rounded-xl bg-neutral-100">{monthName}</div>
            <button onClick={() => setViewDate(addMonths(safeViewDate, 1))} className="p-2 rounded-xl hover:bg-neutral-100">
              <ChevronRight className="h-5 w-5" />
            </button>
            <button onClick={() => setViewDate(new Date(initialNow.getFullYear(), initialNow.getMonth(), 1))} className="ml-1 px-3 py-1.5 rounded-xl text-sm border">
              Today
            </button>
          </div>
        </div>
      </header>

      {apiError && (
        <div className="max-w-5xl mx-auto mt-3 px-4">
          <div className="flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-amber-900">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div className="text-sm">
              <div className="font-medium">Some holiday data could not be loaded.</div>
              <div className="opacity-80">{apiError}</div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={async () => {
                    setApiError(null);
                    const ctrl = new AbortController();
                    setLoading(true);
                    const data = await fetchHolidaysForActiveCountries(ctrl.signal);
                    setHolidayData(data);
                    setLoading(false);
                  }}
                  className="px-3 py-1.5 rounded-xl text-sm border border-amber-300 hover:bg-amber-100"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 pb-8 grid md:grid-cols-[1fr_320px] gap-6">
        <section className="rounded-3xl bg-white border shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 text-xs text-neutral-500 border-b">
            {WEEK_LABELS.map((w) => (
              <div key={w} className="px-3 py-2 text-center font-medium">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[minmax(98px,1fr)]">
            {monthGrid.map((date, idx) => {
              const key = toKey(date);
              const inMonth = date.getMonth() === safeViewDate.getMonth();
              const isToday = isSameDay(date, initialNow);

              const cellEvents = [];
              activeCountries.forEach((code) => {
                const holidays = holidayData[code] || {};
                const events = holidays[key];
                if (Array.isArray(events)) {
                  events.forEach((ev) => {
                    cellEvents.push({
                      code,
                      label: ev?.name_intl || ev?.name_local || "Holiday",
                      color: COUNTRY_META[code]?.color || "bg-neutral-400",
                    });
                  });
                }
              });

              const uniqueLabels = [...new Set(cellEvents.map((e) => e.label))];

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={classNames(
                    "relative border-b border-r p-2 text-left hover:bg-neutral-50",
                    !inMonth && "bg-neutral-50/60 text-neutral-400",
                    isSameDay(date, selectedDate) && "ring-2 ring-neutral-900"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{date.getDate()}</span>
                    <div className="flex -space-x-1">
                      {cellEvents.slice(0, 3).map((ev, i) => (
                        <span key={`${key}-${i}`} className={classNames("inline-block h-2.5 w-2.5 rounded-full border border-white", ev.color)} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-1 space-y-1">
                    {uniqueLabels.slice(0, 2).map((label, i) => (
                      <div key={i} className="truncate text-[11px] inline-flex items-center gap-1">
                        <span>{label}</span>
                        {loading && <span className="text-[10px] text-neutral-400">(updating…)</span>}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="rounded-3xl bg-white border shadow-sm p-4 flex flex-col border-neutral-200">
          <div className="text-sm text-neutral-500">Selected date</div>
          <div className="text-lg font-semibold">
            {isValidDate(selectedDate)
              ? selectedDate.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
              : "Invalid date"}
          </div>

          <div className="mt-4 text-sm font-medium">Events</div>
          {selectedEvents.length === 0 ? (
            <div className="mt-1 text-sm text-neutral-500">No events from active countries.</div>
          ) : (
            <ul className="mt-2 space-y-2">
              {selectedEvents.map((ev, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <div className="font-medium">{ev.label}</div>
                  <div className="flex gap-2 flex-wrap">
                    {ev.countries.map((c, j) => (
                      <span key={j} className="inline-flex items-center gap-1 text-sm">
                        <span className={classNames("inline-block h-2 w-2 rounded-full", COUNTRY_META[c.code]?.color || "bg-neutral-400")} /> {c.code}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 text-sm font-medium">Legend</div>
          <div className="mt-2 space-y-1">
            {activeCountries.map((code) => (
              <div key={code} className="flex items-center gap-2">
                <span className={classNames("h-2.5 w-2.5 inline-block rounded-full", COUNTRY_META[code]?.color || "bg-neutral-400")} />
                <span>{COUNTRY_META[code]?.label || code} ({code})</span>
              </div>
            ))}
          </div>
        </aside>
      </main>

      <DevTests />
    </div>
  );
}

function DevTests() {
  const ranRef = useRef(false);
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    if (typeof window !== "undefined" && window.__RUN_CAL_TESTS__ === false) return;

    const tests = [];
    const push = (name, fn) => tests.push({ name, fn });

    push("buildMonthMatrix handles valid date", () => buildMonthMatrix(new Date(2025, 0, 1)).length === 42);
    push("buildMonthMatrix handles null", () => buildMonthMatrix(null).length === 42);
    push("buildMonthMatrix handles undefined", () => buildMonthMatrix(undefined).length === 42);
    push("buildMonthMatrix handles invalid string", () => buildMonthMatrix(new Date("invalid"))[0] instanceof Date);
    push("toKey returns empty on invalid", () => toKey(new Date("invalid")) === "");
    push("addMonths handles invalid by falling back", () => isValidDate(addMonths("oops", 1)));

    push("buildApiUrl relative when base empty", () => {
      const prev = typeof window !== "undefined" ? window.__HOLIDAY_API_BASE__ : undefined;
      if (typeof window !== "undefined") window.__HOLIDAY_API_BASE__ = "";
      const url = buildApiUrl("US", 2025);
      if (typeof window !== "undefined") {
        if (prev === undefined) delete window.__HOLIDAY_API_BASE__;
        else window.__HOLIDAY_API_BASE__ = prev;
      }
      return url === "/holidays/US/2025";
    });
    push("buildApiUrl respects window base", () => {
      const prev = typeof window !== "undefined" ? window.__HOLIDAY_API_BASE__ : undefined;
      if (typeof window !== "undefined") window.__HOLIDAY_API_BASE__ = "https://api.example.com";
      const url = buildApiUrl("KR", 2026);
      if (typeof window !== "undefined") {
        if (prev === undefined) delete window.__HOLIDAY_API_BASE__;
        else window.__HOLIDAY_API_BASE__ = prev;
      }
      return url === "https://api.example.com/holidays/KR/2026";
    });

    push("selectedEvents merge tolerates missing data", () => {
      const sample = { UK: { "2025-12-25": [{ name_intl: "Christmas", name_local: "Christmas Day", country: "UK" }] } };
      const active = ["UK"];
      const key = "2025-12-25";
      const seen = {}; const out = [];
      active.forEach((code) => {
        const holidays = sample[code] || {};
        const events = holidays[key];
        if (Array.isArray(events)) {
          events.forEach((ev) => {
            const k = ev?.name_intl || ev?.name_local || "Holiday";
            if (!seen[k]) { seen[k] = []; out.push({ label: k, countries: [] }); }
            seen[k].push({ code, local: ev?.name_local || k });
          });
        }
      });
      return out.length === 1 && out[0].label === "Christmas";
    });

    push("empty year yields no events for any day", () => {
      const empty = {};
      const active = ["KR", "UK"];
      const key = "2025-01-01";
      const seen = {}; const out = [];
      active.forEach((code) => {
        const holidays = empty[code] || {};
        const events = holidays[key];
        if (Array.isArray(events)) {
          events.forEach((ev) => {
            const k = ev?.name_intl || ev?.name_local || "Holiday";
            if (!seen[k]) { seen[k] = []; out.push({ label: k, countries: [] }); }
            seen[k].push({ code, local: ev?.name_local || k });
          });
        }
      });
      return out.length === 0;
    });

    push("Wales vs Scotland Easter Monday rule", () => {
      const y = 2026;
      const wls = makeEWHolidays(y, "WLS");
      const sct = makeScotlandHolidays(y);
      const easter = easterSunday(y);
      const emKey = toKey(addDays(easter, 1));
      return Array.isArray(wls[emKey]) && !Array.isArray(sct[emKey]);
    });

    push("Northern Ireland extra holidays present", () => {
      const y = 2026;
      const nir = makeNorthernIrelandHolidays(y);
      return nir[toKey(observedUK(y, 2, 17))] && nir[toKey(observedUK(y, 6, 12))];
    });

    push("Australia Day observed to Monday if weekend (2021 ANZAC)", () => {
      const y = 2021;
      const au = makeAustraliaHolidays(y);
      const anzacObserved = observedAU(y, 3, 25);
      return Array.isArray(au[toKey(anzacObserved)]) && anzacObserved.getDay() === 1;
    });

    push("NZ New Year pair mondayisation (2022)", () => {
      const y = 2022;
      const nz = makeNewZealandHolidays(y);
      const nyMon = observedNZ(y, 0, 1);
      let ny2 = observedNZ(y, 0, 2);
      if (toKey(nyMon) === toKey(ny2)) ny2 = new Date(y, 0, 4);
      return Array.isArray(nz[toKey(nyMon)]) && Array.isArray(nz[toKey(ny2)]) && nyMon.getDay() === 1 && ny2.getDay() >= 1;
    });

    push("NZ Labour Day is 4th Monday of Oct", () => {
      const y = 2026;
      const nz = makeNewZealandHolidays(y);
      const labour = nthWeekdayOfMonth(y, 9, 1, 4);
      return Array.isArray(nz[toKey(labour)]) && labour.getDay() === 1 && labour.getMonth() === 9;
    });

    push("AU King's Birthday 2nd Monday in June (most states)", () => {
      const y = 2026;
      const au = makeAustraliaHolidays(y);
      const kb = nthWeekdayOfMonth(y, 5, 1, 2);
      return Array.isArray(au[toKey(kb)]) && kb.getDay() === 1 && kb.getMonth() === 5;
    });

    push("Canada core: Canada Day present", () => {
      const y = 2026;
      const ca = makeCanadaHolidays(y);
      const cd = observedCA(y, 6, 1);
      return Array.isArray(ca[toKey(cd)]);
    });

    push("Canada: Victoria Day is Monday before May 25", () => {
      const y = 2026;
      const ca = makeCanadaHolidays(y);
      const may24 = new Date(y, 4, 24);
      const delta = (7 + may24.getDay() - 1) % 7;
      const v = new Date(y, 4, 24 - delta);
      const arr = ca[toKey(v)];
      return Array.isArray(arr) && v.getDay() === 1 && v.getMonth() === 4 && v.getDate() <= 24;
    });

    push("Canada: Thanksgiving second Monday of October", () => {
      const y = 2026;
      const ca = makeCanadaHolidays(y);
      const tg = nthWeekdayOfMonth(y, 9, 1, 2);
      return Array.isArray(ca[toKey(tg)]) && tg.getDay() === 1 && tg.getMonth() === 9;
    });

    push("Canada: Truth & Reconciliation since 2021", () => {
      const y1 = 2023;
      const y0 = 2020;
      const ca1 = makeCanadaHolidays(y1);
      const ca0 = makeCanadaHolidays(y0);
      const k1 = toKey(observedCA(y1, 8, 30));
      const k0 = toKey(observedCA(y0, 8, 30));
      return Array.isArray(ca1[k1]) && !Array.isArray(ca0[k0]);
    });

    push("IE: Easter Monday present; Good Friday absent", () => {
      const y = 2026;
      const ie = makeIrelandHolidays(y);
      const easter = easterSunday(y);
      const em = toKey(addDays(easter, 1));
      const gf = toKey(addDays(easter, -2));
      return Array.isArray(ie[em]) && !Array.isArray(ie[gf]);
    });

    push("IE: St Brigid's Day first Monday of Feb (2025)", () => {
      const y = 2025;
      const ie = makeIrelandHolidays(y);
      const sbd = nthWeekdayOfMonth(y, 1, 1, 1);
      return Array.isArray(ie[toKey(sbd)]) && sbd.getDay() === 1 && sbd.getMonth() === 1;
    });

    push("IE: St Patrick's Day mondayised when Sunday (2024)", () => {
      const y = 2024;
      const ie = makeIrelandHolidays(y);
      const obs = observedIE(y, 2, 17);
      return Array.isArray(ie[toKey(obs)]) && obs.getDay() === 1;
    });

    push("IE: October bank holiday last Monday of Oct", () => {
      const y = 2026;
      const ie = makeIrelandHolidays(y);
      const lastMon = lastWeekdayOfMonth(y, 9, 1);
      return Array.isArray(ie[toKey(lastMon)]) && lastMon.getDay() === 1 && lastMon.getMonth() === 9;
    });

    push("FR: Easter Monday present; Good Friday absent", () => {
      const y = 2026;
      const fr = makeFranceHolidays(y);
      const easter = easterSunday(y);
      const em = toKey(addDays(easter, 1));
      const gf = toKey(addDays(easter, -2));
      return Array.isArray(fr[em]) && !Array.isArray(fr[gf]);
    });

    push("FR: Labour Day is May 1 (no mondayisation)", () => {
      const y = 2026;
      const fr = makeFranceHolidays(y);
      return Array.isArray(fr[`${y}-05-01`]);
    });

    push("FR: Bastille Day is July 14", () => {
      const y = 2026;
      const fr = makeFranceHolidays(y);
      return Array.isArray(fr[`${y}-07-14`]);
    });

    push("FR: Ascension is Easter+39 and a Thursday", () => {
      const y = 2026;
      const fr = makeFranceHolidays(y);
      const asc = addDays(easterSunday(y), 39);
      const key = toKey(asc);
      return Array.isArray(fr[key]) && asc.getDay() === 4;
    });

    push("FR region AM: Good Friday exists only when enabled", () => {
      const y = 2026;
      const base = makeFranceHolidays(y, {});
      const withAM = makeFranceHolidays(y, { AM: true });
      const gfKey = toKey(addDays(easterSunday(y), -2));
      return !Array.isArray(base[gfKey]) && Array.isArray(withAM[gfKey]);
    });

    push("FR region RE: Réunion Abolition on Dec 20 when enabled", () => {
      const y = 2026;
      const withRE = makeFranceHolidays(y, { RE: true });
      return Array.isArray(withRE[`${y}-12-20`]);
    });

    const results = tests.map((t) => {
      try {
        const ok = !!t.fn();
        if (!ok) console.error(`❌ Test failed: ${t.name}`);
        else console.log(`✅ ${t.name}`);
        return ok;
      } catch (e) {
        console.error(`💥 Exception in test: ${t.name}`, e);
        return false;
      }
    });

    const passed = results.filter(Boolean).length;
    console.log(`DevTests: ${passed}/${tests.length} passed`);
  }, []);
  return null;
}
