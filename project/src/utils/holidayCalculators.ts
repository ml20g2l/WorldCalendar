import { HolidayEvent } from '../types/calendar';
import {
  addDays,
  easterSunday,
  lastWeekdayOfMonth,
  nthWeekdayOfMonth,
  observedAU,
  observedCA,
  observedIE,
  observedNZ,
  observedUK,
  observedUS,
  toKey,
} from './dateUtils';

type HolidayMap = Record<string, HolidayEvent[]>;

function addHoliday(
  map: HolidayMap,
  date: Date,
  nameLocal: string,
  nameIntl: string,
  code: string
): void {
  const key = toKey(date);
  if (!map[key]) map[key] = [];
  map[key].push({ name_local: nameLocal, name_intl: nameIntl, country: code });
}

export function makeUSHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, observedUS(year, 0, 1), "New Year's Day", "New Year's Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 0, 1, 3), "Martin Luther King Jr. Day", "Martin Luther King Jr. Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 1, 1, 3), "Presidents' Day", "Presidents' Day", "US");
  addHoliday(map, lastWeekdayOfMonth(year, 4, 1), "Memorial Day", "Memorial Day", "US");
  addHoliday(map, observedUS(year, 5, 19), "Juneteenth", "Juneteenth", "US");
  addHoliday(map, observedUS(year, 6, 4), "Independence Day", "Independence Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 8, 1, 1), "Labor Day", "Labor Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 2), "Columbus Day", "Columbus Day", "US");
  addHoliday(map, observedUS(year, 10, 11), "Veterans Day", "Veterans Day", "US");
  addHoliday(map, nthWeekdayOfMonth(year, 10, 4, 4), "Thanksgiving", "Thanksgiving", "US");
  addHoliday(map, observedUS(year, 11, 25), "Christmas", "Christmas", "US");
  return map;
}

export function makeUKHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, observedUK(year, 0, 1), "New Year's Day", "New Year's Day", "UK");
  const easter = easterSunday(year);
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "UK");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "UK");
  addHoliday(map, nthWeekdayOfMonth(year, 4, 1, 1), "Early May bank holiday", "Early May bank holiday", "UK");
  addHoliday(map, lastWeekdayOfMonth(year, 4, 1), "Spring bank holiday", "Spring bank holiday", "UK");
  addHoliday(map, lastWeekdayOfMonth(year, 7, 1), "Summer bank holiday", "Summer bank holiday", "UK");

  const xmasObserved = observedUK(year, 11, 25);
  let boxingObserved = observedUK(year, 11, 26);
  if (toKey(xmasObserved) === toKey(boxingObserved)) boxingObserved = addDays(boxingObserved, 1);
  addHoliday(map, xmasObserved, "Christmas", "Christmas", "UK");
  addHoliday(map, boxingObserved, "Boxing Day", "Boxing Day", "UK");

  const jan2 = observedUK(year, 0, 2);
  const newYear = observedUK(year, 0, 1);
  if (toKey(jan2) === toKey(newYear)) {
    addHoliday(map, addDays(jan2, 1), "2 January (Scotland)", "2 January (Scotland)", "UK");
  } else {
    addHoliday(map, jan2, "2 January (Scotland)", "2 January (Scotland)", "UK");
  }
  addHoliday(map, nthWeekdayOfMonth(year, 7, 1, 1), "Summer bank holiday (Scotland)", "Summer bank holiday (Scotland)", "UK");
  addHoliday(map, observedUK(year, 10, 30), "St Andrew's Day (Scotland)", "St Andrew's Day (Scotland)", "UK");

  addHoliday(map, observedUK(year, 2, 17), "St Patrick's Day (N. Ireland)", "St Patrick's Day (N. Ireland)", "UK");
  addHoliday(map, observedUK(year, 6, 12), "Battle of the Boyne (N. Ireland)", "Battle of the Boyne (N. Ireland)", "UK");

  return map;
}

export function makeCAHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, observedCA(year, 0, 1), "New Year's Day", "New Year's Day", "CA");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "CA");

  const may24 = new Date(year, 4, 24);
  const delta = (7 + may24.getDay() - 1) % 7;
  const victoria = new Date(year, 4, 24 - delta);
  addHoliday(map, victoria, "Victoria Day", "Victoria Day", "CA");

  addHoliday(map, observedCA(year, 6, 1), "Canada Day", "Canada Day", "CA");
  addHoliday(map, nthWeekdayOfMonth(year, 8, 1, 1), "Labour Day", "Labour Day", "CA");

  if (year >= 2021) {
    addHoliday(map, observedCA(year, 8, 30), "Truth and Reconciliation Day", "Truth and Reconciliation Day", "CA");
  }

  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 2), "Thanksgiving", "Thanksgiving", "CA");
  addHoliday(map, observedCA(year, 10, 11), "Remembrance Day", "Remembrance Day", "CA");
  addHoliday(map, observedCA(year, 11, 25), "Christmas", "Christmas", "CA");
  addHoliday(map, observedCA(year, 11, 26), "Boxing Day", "Boxing Day", "CA");

  return map;
}

export function makeAUHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, observedAU(year, 0, 1), "New Year's Day", "New Year's Day", "AU");
  addHoliday(map, observedAU(year, 0, 26), "Australia Day", "Australia Day", "AU");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "AU");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "AU");
  addHoliday(map, observedAU(year, 3, 25), "ANZAC Day", "ANZAC Day", "AU");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 2), "King's Birthday", "King's Birthday", "AU");
  addHoliday(map, observedAU(year, 11, 25), "Christmas", "Christmas", "AU");
  addHoliday(map, observedAU(year, 11, 26), "Boxing Day", "Boxing Day", "AU");
  return map;
}

export function makeNZHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const ny = observedNZ(year, 0, 1);
  let ny2 = observedNZ(year, 0, 2);
  if (toKey(ny) === toKey(ny2)) ny2 = addDays(ny2, 1);

  addHoliday(map, ny, "New Year's Day", "New Year's Day", "NZ");
  addHoliday(map, ny2, "Day after New Year", "Day after New Year", "NZ");
  addHoliday(map, observedNZ(year, 1, 6), "Waitangi Day", "Waitangi Day", "NZ");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "NZ");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "NZ");
  addHoliday(map, observedNZ(year, 3, 25), "ANZAC Day", "ANZAC Day", "NZ");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 1), "King's Birthday", "King's Birthday", "NZ");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 4), "Labour Day", "Labour Day", "NZ");

  const xmasObserved = observedNZ(year, 11, 25);
  let boxingObserved = observedNZ(year, 11, 26);
  if (toKey(xmasObserved) === toKey(boxingObserved)) boxingObserved = addDays(boxingObserved, 1);
  addHoliday(map, xmasObserved, "Christmas", "Christmas", "NZ");
  addHoliday(map, boxingObserved, "Boxing Day", "Boxing Day", "NZ");

  return map;
}

export function makeIEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, observedIE(year, 0, 1), "New Year's Day", "New Year's Day", "IE");

  if (year >= 2023) {
    const feb1 = new Date(year, 1, 1);
    const stBrigid = feb1.getDay() === 5 ? feb1 : nthWeekdayOfMonth(year, 1, 1, 1);
    addHoliday(map, stBrigid, "St Brigid's Day", "St Brigid's Day", "IE");
  }

  addHoliday(map, observedIE(year, 2, 17), "St Patrick's Day", "St Patrick's Day", "IE");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 4, 1, 1), "May Day", "May Day", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 1, 1), "June Holiday", "June Holiday", "IE");
  addHoliday(map, nthWeekdayOfMonth(year, 7, 1, 1), "August Holiday", "August Holiday", "IE");
  addHoliday(map, lastWeekdayOfMonth(year, 9, 1), "October Bank Holiday", "October Bank Holiday", "IE");

  const xmasObserved = observedIE(year, 11, 25);
  let stephObserved = observedIE(year, 11, 26);
  if (toKey(xmasObserved) === toKey(stephObserved)) stephObserved = addDays(stephObserved, 1);
  addHoliday(map, xmasObserved, "Christmas", "Christmas", "IE");
  addHoliday(map, stephObserved, "St Stephen's Day", "St Stephen's Day", "IE");

  return map;
}

export function makeFRHolidays(year: number, regions: Record<string, boolean> = {}): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);

  addHoliday(map, new Date(year, 0, 1), "Jour de l'An", "New Year's Day", "FR");
  addHoliday(map, addDays(easter, 1), "Lundi de Pâques", "Easter Monday", "FR");
  addHoliday(map, new Date(year, 4, 1), "Fête du Travail", "Labour Day", "FR");
  addHoliday(map, new Date(year, 4, 8), "Victoire 1945", "VE Day", "FR");
  addHoliday(map, addDays(easter, 39), "Ascension", "Ascension Day", "FR");
  addHoliday(map, addDays(easter, 50), "Lundi de Pentecôte", "Whit Monday", "FR");
  addHoliday(map, new Date(year, 6, 14), "Fête Nationale", "Bastille Day", "FR");
  addHoliday(map, new Date(year, 7, 15), "Assomption", "Assumption", "FR");
  addHoliday(map, new Date(year, 10, 1), "La Toussaint", "All Saints' Day", "FR");
  addHoliday(map, new Date(year, 10, 11), "Armistice 1918", "Armistice Day", "FR");
  addHoliday(map, new Date(year, 11, 25), "Noël", "Christmas", "FR");

  if (regions.AM) {
    addHoliday(map, addDays(easter, -2), "Vendredi saint (AM)", "Good Friday (AM)", "FR");
    addHoliday(map, new Date(year, 11, 26), "Saint Étienne (AM)", "St Stephen's (AM)", "FR");
  }
  if (regions.RE) addHoliday(map, new Date(year, 11, 20), "Abolition esclavage (RE)", "Abolition Slavery (RE)", "FR");
  if (regions.GP) addHoliday(map, new Date(year, 4, 27), "Abolition esclavage (GP)", "Abolition Slavery (GP)", "FR");
  if (regions.MQ) addHoliday(map, new Date(year, 4, 22), "Abolition esclavage (MQ)", "Abolition Slavery (MQ)", "FR");
  if (regions.GF) addHoliday(map, new Date(year, 5, 10), "Abolition esclavage (GF)", "Abolition Slavery (GF)", "FR");
  if (regions.YT) addHoliday(map, new Date(year, 3, 27), "Abolition esclavage (YT)", "Abolition Slavery (YT)", "FR");
  if (regions.NC) addHoliday(map, new Date(year, 8, 24), "Fête Citoyenneté (NC)", "Citizenship Day (NC)", "FR");
  if (regions.PF) addHoliday(map, new Date(year, 5, 29), "Fête Autonomie (PF)", "Autonomy Day (PF)", "FR");
  if (regions.WF) addHoliday(map, new Date(year, 3, 28), "St Pierre Chanel (WF)", "St Pierre Chanel (WF)", "FR");

  return map;
}

export function makeKRHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "신정", "New Year's Day", "KR");
  addHoliday(map, new Date(year, 2, 1), "삼일절", "Independence Movement Day", "KR");
  addHoliday(map, new Date(year, 4, 5), "어린이날", "Children's Day", "KR");
  addHoliday(map, new Date(year, 5, 6), "현충일", "Memorial Day", "KR");
  addHoliday(map, new Date(year, 7, 15), "광복절", "Liberation Day", "KR");
  addHoliday(map, new Date(year, 9, 3), "개천절", "National Foundation Day", "KR");
  addHoliday(map, new Date(year, 9, 9), "한글날", "Hangeul Day", "KR");
  addHoliday(map, new Date(year, 11, 25), "크리스마스", "Christmas", "KR");
  return map;
}

export function makeDEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Neujahr", "New Year's Day", "DE");
  addHoliday(map, addDays(easter, -2), "Karfreitag", "Good Friday", "DE");
  addHoliday(map, addDays(easter, 1), "Ostermontag", "Easter Monday", "DE");
  addHoliday(map, new Date(year, 4, 1), "Tag der Arbeit", "Labour Day", "DE");
  addHoliday(map, addDays(easter, 39), "Christi Himmelfahrt", "Ascension Day", "DE");
  addHoliday(map, addDays(easter, 50), "Pfingstmontag", "Whit Monday", "DE");
  addHoliday(map, new Date(year, 9, 3), "Tag der Deutschen Einheit", "German Unity Day", "DE");
  addHoliday(map, new Date(year, 11, 25), "Weihnachten", "Christmas", "DE");
  addHoliday(map, new Date(year, 11, 26), "Zweiter Weihnachtsfeiertag", "Boxing Day", "DE");
  return map;
}

export function makeJPHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "元日", "New Year's Day", "JP");
  addHoliday(map, nthWeekdayOfMonth(year, 0, 1, 2), "成人の日", "Coming of Age Day", "JP");
  addHoliday(map, new Date(year, 1, 11), "建国記念の日", "National Foundation Day", "JP");
  addHoliday(map, new Date(year, 1, 23), "天皇誕生日", "Emperor's Birthday", "JP");
  addHoliday(map, new Date(year, 2, 20), "春分の日", "Vernal Equinox Day", "JP");
  addHoliday(map, new Date(year, 3, 29), "昭和の日", "Showa Day", "JP");
  addHoliday(map, new Date(year, 4, 3), "憲法記念日", "Constitution Day", "JP");
  addHoliday(map, new Date(year, 4, 4), "みどりの日", "Greenery Day", "JP");
  addHoliday(map, new Date(year, 4, 5), "こどもの日", "Children's Day", "JP");
  addHoliday(map, nthWeekdayOfMonth(year, 6, 1, 3), "海の日", "Marine Day", "JP");
  addHoliday(map, new Date(year, 7, 11), "山の日", "Mountain Day", "JP");
  addHoliday(map, nthWeekdayOfMonth(year, 8, 1, 3), "敬老の日", "Respect for the Aged Day", "JP");
  addHoliday(map, new Date(year, 8, 23), "秋分の日", "Autumnal Equinox Day", "JP");
  addHoliday(map, nthWeekdayOfMonth(year, 9, 1, 2), "スポーツの日", "Sports Day", "JP");
  addHoliday(map, new Date(year, 10, 3), "文化の日", "Culture Day", "JP");
  addHoliday(map, new Date(year, 10, 23), "勤労感謝の日", "Labour Thanksgiving Day", "JP");
  return map;
}

export function makeCNHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "元旦", "New Year's Day", "CN");
  addHoliday(map, new Date(year, 3, 4), "清明节", "Qingming Festival", "CN");
  addHoliday(map, new Date(year, 4, 1), "劳动节", "Labour Day", "CN");
  addHoliday(map, new Date(year, 9, 1), "国庆节", "National Day", "CN");
  return map;
}

export function makeBRHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Ano Novo", "New Year's Day", "BR");
  addHoliday(map, addDays(easter, -47), "Carnaval", "Carnival", "BR");
  addHoliday(map, addDays(easter, -2), "Sexta-feira Santa", "Good Friday", "BR");
  addHoliday(map, new Date(year, 3, 21), "Tiradentes", "Tiradentes' Day", "BR");
  addHoliday(map, new Date(year, 4, 1), "Dia do Trabalho", "Labour Day", "BR");
  addHoliday(map, addDays(easter, 60), "Corpus Christi", "Corpus Christi", "BR");
  addHoliday(map, new Date(year, 8, 7), "Independência", "Independence Day", "BR");
  addHoliday(map, new Date(year, 9, 12), "Nossa Senhora Aparecida", "Our Lady of Aparecida", "BR");
  addHoliday(map, new Date(year, 10, 2), "Finados", "All Souls' Day", "BR");
  addHoliday(map, new Date(year, 10, 15), "Proclamação da República", "Republic Day", "BR");
  addHoliday(map, new Date(year, 11, 25), "Natal", "Christmas", "BR");
  return map;
}

export function makeINHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 26), "गणतंत्र दिवस", "Republic Day", "IN");
  addHoliday(map, new Date(year, 7, 15), "स्वतंत्रता दिवस", "Independence Day", "IN");
  addHoliday(map, new Date(year, 9, 2), "गांधी जयंती", "Gandhi Jayanti", "IN");
  addHoliday(map, new Date(year, 11, 25), "Christmas", "Christmas", "IN");
  return map;
}

export const holidayCalculators = {
  US: makeUSHolidays,
  UK: makeUKHolidays,
  CA: makeCAHolidays,
  AU: makeAUHolidays,
  NZ: makeNZHolidays,
  IE: makeIEHolidays,
  FR: makeFRHolidays,
  KR: makeKRHolidays,
  DE: makeDEHolidays,
  JP: makeJPHolidays,
  CN: makeCNHolidays,
  BR: makeBRHolidays,
  IN: makeINHolidays,
};
