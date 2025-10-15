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

export function makeQAHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 11, 18), "اليوم الوطني", "National Day", "QA");
  return map;
}

export function makeLTHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Naujieji metai", "New Year's Day", "LT");
  addHoliday(map, new Date(year, 1, 16), "Lietuvos valstybės atkūrimo diena", "Independence Day", "LT");
  addHoliday(map, new Date(year, 2, 11), "Lietuvos nepriklausomybės atkūrimo diena", "Restoration of Independence", "LT");
  addHoliday(map, addDays(easter, 0), "Velykos", "Easter Sunday", "LT");
  addHoliday(map, addDays(easter, 1), "Antroji Velykų diena", "Easter Monday", "LT");
  addHoliday(map, new Date(year, 4, 1), "Tarptautinė darbo diena", "Labour Day", "LT");
  addHoliday(map, nthWeekdayOfMonth(year, 4, 0, 1), "Motinos diena", "Mother's Day", "LT");
  addHoliday(map, nthWeekdayOfMonth(year, 5, 0, 1), "Tėvo diena", "Father's Day", "LT");
  addHoliday(map, new Date(year, 5, 24), "Rasos ir Joninių diena", "Midsummer Day", "LT");
  addHoliday(map, new Date(year, 6, 6), "Valstybės diena", "Statehood Day", "LT");
  addHoliday(map, new Date(year, 7, 15), "Žolinė", "Assumption", "LT");
  addHoliday(map, new Date(year, 10, 1), "Visų šventųjų diena", "All Saints' Day", "LT");
  addHoliday(map, new Date(year, 11, 25), "Kalėdos", "Christmas", "LT");
  addHoliday(map, new Date(year, 11, 26), "Antroji Kalėdų diena", "Boxing Day", "LT");
  return map;
}

export function makeROHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const orthodoxEaster = addDays(easter, 7);

  addHoliday(map, new Date(year, 0, 1), "Anul Nou", "New Year's Day", "RO");
  addHoliday(map, new Date(year, 0, 2), "Anul Nou", "New Year's Day", "RO");
  addHoliday(map, new Date(year, 0, 24), "Ziua Unirii", "Unification Day", "RO");
  addHoliday(map, addDays(orthodoxEaster, -2), "Vinerea Mare", "Good Friday", "RO");
  addHoliday(map, addDays(orthodoxEaster, 0), "Paștele", "Easter Sunday", "RO");
  addHoliday(map, addDays(orthodoxEaster, 1), "Lunea Paștelui", "Easter Monday", "RO");
  addHoliday(map, new Date(year, 4, 1), "Ziua Muncii", "Labour Day", "RO");
  addHoliday(map, new Date(year, 5, 1), "Ziua Copilului", "Children's Day", "RO");
  addHoliday(map, addDays(orthodoxEaster, 49), "Rusaliile", "Whit Sunday", "RO");
  addHoliday(map, addDays(orthodoxEaster, 50), "Lunea Rusaliilor", "Whit Monday", "RO");
  addHoliday(map, new Date(year, 7, 15), "Adormirea Maicii Domnului", "Assumption", "RO");
  addHoliday(map, new Date(year, 10, 30), "Sfântul Andrei", "St Andrew's Day", "RO");
  addHoliday(map, new Date(year, 11, 1), "Ziua Națională", "National Day", "RO");
  addHoliday(map, new Date(year, 11, 25), "Crăciunul", "Christmas", "RO");
  addHoliday(map, new Date(year, 11, 26), "Crăciunul", "Boxing Day", "RO");
  return map;
}

export function makeRUHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const orthodoxEaster = addDays(easter, 7);

  addHoliday(map, new Date(year, 0, 1), "Новый год", "New Year's Day", "RU");
  addHoliday(map, new Date(year, 0, 7), "Рождество", "Orthodox Christmas", "RU");
  addHoliday(map, new Date(year, 1, 23), "День защитника Отечества", "Defender of the Fatherland Day", "RU");
  addHoliday(map, new Date(year, 2, 8), "Международный женский день", "International Women's Day", "RU");
  addHoliday(map, new Date(year, 4, 1), "Праздник Весны и Труда", "Spring and Labour Day", "RU");
  addHoliday(map, new Date(year, 4, 9), "День Победы", "Victory Day", "RU");
  addHoliday(map, new Date(year, 5, 12), "День России", "Russia Day", "RU");
  addHoliday(map, new Date(year, 10, 4), "День народного единства", "Unity Day", "RU");
  return map;
}

export function makeUZHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Yangi yil", "New Year's Day", "UZ");
  addHoliday(map, new Date(year, 2, 8), "Xotin-qizlar kuni", "International Women's Day", "UZ");
  addHoliday(map, new Date(year, 2, 21), "Navroʻz", "Nowruz", "UZ");
  addHoliday(map, new Date(year, 4, 9), "Xotira va qadrlash kuni", "Memorial Day", "UZ");
  addHoliday(map, new Date(year, 8, 1), "Mustaqillik kuni", "Independence Day", "UZ");
  addHoliday(map, new Date(year, 9, 1), "Oʻqituvchi va murabbiylar kuni", "Teachers' Day", "UZ");
  addHoliday(map, new Date(year, 11, 8), "Konstitutsiya kuni", "Constitution Day", "UZ");
  return map;
}

export function makeIDHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Tahun Baru", "New Year's Day", "ID");
  addHoliday(map, new Date(year, 4, 1), "Hari Buruh", "Labour Day", "ID");
  addHoliday(map, new Date(year, 5, 1), "Hari Lahir Pancasila", "Pancasila Day", "ID");
  addHoliday(map, new Date(year, 7, 17), "Hari Kemerdekaan", "Independence Day", "ID");
  addHoliday(map, new Date(year, 11, 25), "Natal", "Christmas", "ID");
  return map;
}

export function makeKHHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "ចូលឆ្នាំសាកល", "New Year's Day", "KH");
  addHoliday(map, new Date(year, 0, 7), "ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍", "Victory Day", "KH");
  addHoliday(map, new Date(year, 2, 8), "ទិវាអន្តរជាតិនារី", "International Women's Day", "KH");
  addHoliday(map, new Date(year, 4, 1), "ទិវាពលកម្មអន្តរជាតិ", "Labour Day", "KH");
  addHoliday(map, new Date(year, 4, 14), "ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល", "Royal Ploughing Ceremony", "KH");
  addHoliday(map, new Date(year, 9, 15), "ទិវាជាតិ", "King Father's Birthday", "KH");
  addHoliday(map, new Date(year, 10, 9), "ទិវាឯករាជ្យ", "Independence Day", "KH");
  return map;
}

export function makePKHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 1, 5), "یوم یکجہتی کشمیر", "Kashmir Day", "PK");
  addHoliday(map, new Date(year, 2, 23), "یوم پاکستان", "Pakistan Day", "PK");
  addHoliday(map, new Date(year, 4, 1), "یوم مزدور", "Labour Day", "PK");
  addHoliday(map, new Date(year, 7, 14), "یوم آزادی", "Independence Day", "PK");
  addHoliday(map, new Date(year, 10, 9), "اقبال دن", "Iqbal Day", "PK");
  addHoliday(map, new Date(year, 11, 25), "قائد کا یوم پیدائش", "Quaid-e-Azam's Birthday", "PK");
  return map;
}

export function makeGEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const orthodoxEaster = addDays(easter, 7);

  addHoliday(map, new Date(year, 0, 1), "ახალი წელი", "New Year's Day", "GE");
  addHoliday(map, new Date(year, 0, 2), "ახალი წელი", "New Year's Day", "GE");
  addHoliday(map, new Date(year, 0, 7), "ქრისტეშობა", "Orthodox Christmas", "GE");
  addHoliday(map, new Date(year, 0, 19), "ნათლისღება", "Epiphany", "GE");
  addHoliday(map, new Date(year, 2, 3), "დედის დღე", "Mother's Day", "GE");
  addHoliday(map, new Date(year, 2, 8), "ქალთა საერთაშორისო დღე", "International Women's Day", "GE");
  addHoliday(map, addDays(orthodoxEaster, -2), "პარასკევი", "Good Friday", "GE");
  addHoliday(map, addDays(orthodoxEaster, -1), "შაბათი", "Holy Saturday", "GE");
  addHoliday(map, addDays(orthodoxEaster, 0), "აღდგომა", "Easter Sunday", "GE");
  addHoliday(map, addDays(orthodoxEaster, 1), "ორშაბათი", "Easter Monday", "GE");
  addHoliday(map, new Date(year, 3, 9), "ეროვნული ერთიანობის დღე", "National Unity Day", "GE");
  addHoliday(map, new Date(year, 4, 9), "გამარჯვების დღე", "Victory Day", "GE");
  addHoliday(map, new Date(year, 4, 12), "წმინდა ანდრია დიდმოწამის დღე", "St Andrew's Day", "GE");
  addHoliday(map, new Date(year, 4, 26), "დამოუკიდებლობის დღე", "Independence Day", "GE");
  addHoliday(map, new Date(year, 7, 28), "მარიამობა", "Mariamoba", "GE");
  addHoliday(map, new Date(year, 9, 14), "მცხეთობა-სვეტიცხოვლობა", "Svetitskhovloba", "GE");
  addHoliday(map, new Date(year, 10, 23), "გიორგობა", "St George's Day", "GE");
  return map;
}

export function makeARHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Año Nuevo", "New Year's Day", "AR");
  addHoliday(map, new Date(year, 1, 12), "Carnaval", "Carnival", "AR");
  addHoliday(map, new Date(year, 1, 13), "Carnaval", "Carnival", "AR");
  addHoliday(map, new Date(year, 2, 24), "Día Nacional de la Memoria", "Memorial Day", "AR");
  addHoliday(map, new Date(year, 3, 2), "Día del Veterano", "Veterans Day", "AR");
  addHoliday(map, new Date(year, 4, 1), "Día del Trabajador", "Labour Day", "AR");
  addHoliday(map, new Date(year, 4, 25), "Día de la Revolución de Mayo", "May Revolution", "AR");
  addHoliday(map, new Date(year, 5, 20), "Día de la Bandera", "Flag Day", "AR");
  addHoliday(map, new Date(year, 6, 9), "Día de la Independencia", "Independence Day", "AR");
  addHoliday(map, new Date(year, 7, 17), "Paso a la Inmortalidad del Gral San Martín", "San Martín Day", "AR");
  addHoliday(map, new Date(year, 9, 12), "Día del Respeto a la Diversidad", "Diversity Day", "AR");
  addHoliday(map, new Date(year, 10, 20), "Día de la Soberanía Nacional", "National Sovereignty Day", "AR");
  addHoliday(map, new Date(year, 11, 8), "Inmaculada Concepción", "Immaculate Conception", "AR");
  addHoliday(map, new Date(year, 11, 25), "Navidad", "Christmas", "AR");
  return map;
}

export function makeMXHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Año Nuevo", "New Year's Day", "MX");
  addHoliday(map, nthWeekdayOfMonth(year, 1, 1, 1), "Día de la Constitución", "Constitution Day", "MX");
  addHoliday(map, nthWeekdayOfMonth(year, 2, 1, 3), "Natalicio de Benito Juárez", "Benito Juárez's Birthday", "MX");
  addHoliday(map, new Date(year, 4, 1), "Día del Trabajo", "Labour Day", "MX");
  addHoliday(map, new Date(year, 8, 16), "Día de la Independencia", "Independence Day", "MX");
  addHoliday(map, nthWeekdayOfMonth(year, 10, 1, 3), "Día de la Revolución", "Revolution Day", "MX");
  addHoliday(map, new Date(year, 11, 25), "Navidad", "Christmas", "MX");
  return map;
}

export function makeTHHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "วันขึ้นปีใหม่", "New Year's Day", "TH");
  addHoliday(map, new Date(year, 1, 16), "วันมาฆบูชา", "Makha Bucha", "TH");
  addHoliday(map, new Date(year, 3, 6), "วันจักรี", "Chakri Memorial Day", "TH");
  addHoliday(map, new Date(year, 3, 13), "วันสงกรานต์", "Songkran Festival", "TH");
  addHoliday(map, new Date(year, 3, 14), "วันสงกรานต์", "Songkran Festival", "TH");
  addHoliday(map, new Date(year, 3, 15), "วันสงกรานต์", "Songkran Festival", "TH");
  addHoliday(map, new Date(year, 4, 1), "วันแรงงานแห่งชาติ", "Labour Day", "TH");
  addHoliday(map, new Date(year, 4, 4), "วันฉัตรมงคล", "Coronation Day", "TH");
  addHoliday(map, new Date(year, 6, 28), "วันเฉลิมพระชนมพรรษา", "King's Birthday", "TH");
  addHoliday(map, new Date(year, 7, 12), "วันเฉลิมพระชนมพรรษา", "Queen Mother's Birthday", "TH");
  addHoliday(map, new Date(year, 9, 13), "วันคล้ายวันสวรรคต", "King Rama IX Memorial Day", "TH");
  addHoliday(map, new Date(year, 9, 23), "วันปิยมหาราช", "Chulalongkorn Day", "TH");
  addHoliday(map, new Date(year, 11, 5), "วันคBirthday", "King Rama IX Birthday", "TH");
  addHoliday(map, new Date(year, 11, 10), "วันรัฐธรรมนูญ", "Constitution Day", "TH");
  addHoliday(map, new Date(year, 11, 31), "วันสิ้นปี", "New Year's Eve", "TH");
  return map;
}

export function makePHHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);

  addHoliday(map, new Date(year, 0, 1), "Bagong Taon", "New Year's Day", "PH");
  addHoliday(map, addDays(easter, -3), "Huwebes Santo", "Maundy Thursday", "PH");
  addHoliday(map, addDays(easter, -2), "Biyernes Santo", "Good Friday", "PH");
  addHoliday(map, addDays(easter, -1), "Sabado de Gloria", "Black Saturday", "PH");
  addHoliday(map, new Date(year, 3, 9), "Araw ng Kagitingan", "Day of Valor", "PH");
  addHoliday(map, new Date(year, 4, 1), "Araw ng Paggawa", "Labour Day", "PH");
  addHoliday(map, new Date(year, 5, 12), "Araw ng Kalayaan", "Independence Day", "PH");
  addHoliday(map, lastWeekdayOfMonth(year, 7, 1), "Araw ng mga Bayani", "National Heroes Day", "PH");
  addHoliday(map, new Date(year, 10, 30), "Araw ng mga Bayani", "Bonifacio Day", "PH");
  addHoliday(map, new Date(year, 11, 25), "Pasko", "Christmas", "PH");
  addHoliday(map, new Date(year, 11, 30), "Araw ni Rizal", "Rizal Day", "PH");
  return map;
}

export function makeVNHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Tết Dương lịch", "New Year's Day", "VN");
  addHoliday(map, new Date(year, 3, 30), "Ngày Giải phóng miền Nam", "Reunification Day", "VN");
  addHoliday(map, new Date(year, 4, 1), "Ngày Quốc tế Lao động", "Labour Day", "VN");
  addHoliday(map, new Date(year, 8, 2), "Quốc khánh", "National Day", "VN");
  return map;
}

export function makeBHHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "رأس السنة الميلادية", "New Year's Day", "BH");
  addHoliday(map, new Date(year, 4, 1), "عيد العمال", "Labour Day", "BH");
  addHoliday(map, new Date(year, 11, 16), "اليوم الوطني", "National Day", "BH");
  addHoliday(map, new Date(year, 11, 17), "اليوم الوطني", "National Day", "BH");
  return map;
}

export function makeMYHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Tahun Baru", "New Year's Day", "MY");
  addHoliday(map, new Date(year, 1, 1), "Hari Wilayah Persekutuan", "Federal Territory Day", "MY");
  addHoliday(map, new Date(year, 4, 1), "Hari Pekerja", "Labour Day", "MY");
  addHoliday(map, new Date(year, 5, 5), "Hari Keputeraan Rasmi", "King's Birthday", "MY");
  addHoliday(map, new Date(year, 7, 31), "Hari Kebangsaan", "National Day", "MY");
  addHoliday(map, new Date(year, 8, 16), "Hari Malaysia", "Malaysia Day", "MY");
  addHoliday(map, new Date(year, 11, 25), "Hari Krismas", "Christmas", "MY");
  return map;
}

export function makeGRHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const orthodoxEaster = addDays(easter, 7);

  addHoliday(map, new Date(year, 0, 1), "Πρωτοχρονιά", "New Year's Day", "GR");
  addHoliday(map, new Date(year, 0, 6), "Θεοφάνεια", "Epiphany", "GR");
  addHoliday(map, new Date(year, 2, 25), "Εικοστή Πέμπτη Μαρτίου", "Independence Day", "GR");
  addHoliday(map, addDays(orthodoxEaster, -48), "Καθαρά Δευτέρα", "Clean Monday", "GR");
  addHoliday(map, addDays(orthodoxEaster, -2), "Μεγάλη Παρασκευή", "Good Friday", "GR");
  addHoliday(map, addDays(orthodoxEaster, 0), "Πάσχα", "Easter Sunday", "GR");
  addHoliday(map, addDays(orthodoxEaster, 1), "Δευτέρα του Πάσχα", "Easter Monday", "GR");
  addHoliday(map, new Date(year, 4, 1), "Εργατική Πρωτομαγιά", "Labour Day", "GR");
  addHoliday(map, addDays(orthodoxEaster, 50), "Αγίου Πνεύματος", "Whit Monday", "GR");
  addHoliday(map, new Date(year, 7, 15), "Κοίμηση της Θεοτόκου", "Assumption", "GR");
  addHoliday(map, new Date(year, 9, 28), "Ημέρα του Όχι", "Ochi Day", "GR");
  addHoliday(map, new Date(year, 11, 25), "Χριστούγεννα", "Christmas", "GR");
  addHoliday(map, new Date(year, 11, 26), "Σύναξη Θεοτόκου", "Synaxis of the Mother of God", "GR");
  return map;
}

export function makeESHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Año Nuevo", "New Year's Day", "ES");
  addHoliday(map, new Date(year, 0, 6), "Epifanía del Señor", "Epiphany", "ES");
  addHoliday(map, addDays(easter, -2), "Viernes Santo", "Good Friday", "ES");
  addHoliday(map, new Date(year, 4, 1), "Fiesta del Trabajo", "Labour Day", "ES");
  addHoliday(map, new Date(year, 7, 15), "Asunción de la Virgen", "Assumption", "ES");
  addHoliday(map, new Date(year, 9, 12), "Fiesta Nacional de España", "National Day", "ES");
  addHoliday(map, new Date(year, 10, 1), "Día de Todos los Santos", "All Saints' Day", "ES");
  addHoliday(map, new Date(year, 11, 6), "Día de la Constitución", "Constitution Day", "ES");
  addHoliday(map, new Date(year, 11, 8), "Inmaculada Concepción", "Immaculate Conception", "ES");
  addHoliday(map, new Date(year, 11, 25), "Navidad", "Christmas", "ES");
  return map;
}

export function makePTHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Ano Novo", "New Year's Day", "PT");
  addHoliday(map, addDays(easter, -47), "Carnaval", "Carnival", "PT");
  addHoliday(map, addDays(easter, -2), "Sexta-feira Santa", "Good Friday", "PT");
  addHoliday(map, addDays(easter, 0), "Páscoa", "Easter Sunday", "PT");
  addHoliday(map, new Date(year, 3, 25), "Dia da Liberdade", "Freedom Day", "PT");
  addHoliday(map, new Date(year, 4, 1), "Dia do Trabalhador", "Labour Day", "PT");
  addHoliday(map, addDays(easter, 60), "Corpo de Deus", "Corpus Christi", "PT");
  addHoliday(map, new Date(year, 5, 10), "Dia de Portugal", "Portugal Day", "PT");
  addHoliday(map, new Date(year, 7, 15), "Assunção de Nossa Senhora", "Assumption", "PT");
  addHoliday(map, new Date(year, 9, 5), "Implantação da República", "Republic Day", "PT");
  addHoliday(map, new Date(year, 10, 1), "Dia de Todos os Santos", "All Saints' Day", "PT");
  addHoliday(map, new Date(year, 11, 1), "Restauração da Independência", "Restoration of Independence", "PT");
  addHoliday(map, new Date(year, 11, 8), "Imaculada Conceição", "Immaculate Conception", "PT");
  addHoliday(map, new Date(year, 11, 25), "Natal", "Christmas", "PT");
  return map;
}

export function makeLUHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Neijoerschdag", "New Year's Day", "LU");
  addHoliday(map, addDays(easter, 1), "Ouschterméindeg", "Easter Monday", "LU");
  addHoliday(map, new Date(year, 4, 1), "Dag vun der Aarbecht", "Labour Day", "LU");
  addHoliday(map, new Date(year, 4, 9), "Europadag", "Europe Day", "LU");
  addHoliday(map, addDays(easter, 39), "Christi Himmelfaart", "Ascension Day", "LU");
  addHoliday(map, addDays(easter, 50), "Péngschtméindeg", "Whit Monday", "LU");
  addHoliday(map, new Date(year, 5, 23), "Nationalfeierdag", "National Day", "LU");
  addHoliday(map, new Date(year, 7, 15), "Léiffrawëschdag", "Assumption", "LU");
  addHoliday(map, new Date(year, 10, 1), "Allerhellgen", "All Saints' Day", "LU");
  addHoliday(map, new Date(year, 11, 25), "Chrëschtdag", "Christmas", "LU");
  addHoliday(map, new Date(year, 11, 26), "Stiefesdag", "St Stephen's Day", "LU");
  return map;
}

export function makeDKHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Nytårsdag", "New Year's Day", "DK");
  addHoliday(map, addDays(easter, -3), "Skærtorsdag", "Maundy Thursday", "DK");
  addHoliday(map, addDays(easter, -2), "Langfredag", "Good Friday", "DK");
  addHoliday(map, addDays(easter, 0), "Påskedag", "Easter Sunday", "DK");
  addHoliday(map, addDays(easter, 1), "Anden påskedag", "Easter Monday", "DK");
  addHoliday(map, addDays(easter, 26), "Store bededag", "Great Prayer Day", "DK");
  addHoliday(map, addDays(easter, 39), "Kristi himmelfartsdag", "Ascension Day", "DK");
  addHoliday(map, addDays(easter, 49), "Pinsedag", "Whit Sunday", "DK");
  addHoliday(map, addDays(easter, 50), "Anden pinsedag", "Whit Monday", "DK");
  addHoliday(map, new Date(year, 11, 25), "Juledag", "Christmas Day", "DK");
  addHoliday(map, new Date(year, 11, 26), "Anden juledag", "Boxing Day", "DK");
  return map;
}

export function makeFIHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Uudenvuodenpäivä", "New Year's Day", "FI");
  addHoliday(map, new Date(year, 0, 6), "Loppiainen", "Epiphany", "FI");
  addHoliday(map, addDays(easter, -2), "Pitkäperjantai", "Good Friday", "FI");
  addHoliday(map, addDays(easter, 0), "Pääsiäispäivä", "Easter Sunday", "FI");
  addHoliday(map, addDays(easter, 1), "Toinen pääsiäispäivä", "Easter Monday", "FI");
  addHoliday(map, new Date(year, 4, 1), "Vappu", "May Day", "FI");
  addHoliday(map, addDays(easter, 39), "Helatorstai", "Ascension Day", "FI");
  const midsummerEve = nthWeekdayOfMonth(year, 5, 5, -1);
  addHoliday(map, addDays(midsummerEve, 1), "Juhannuspäivä", "Midsummer Day", "FI");
  addHoliday(map, nthWeekdayOfMonth(year, 10, 6, 1), "Pyhäinpäivä", "All Saints' Day", "FI");
  addHoliday(map, new Date(year, 11, 6), "Itsenäisyyspäivä", "Independence Day", "FI");
  addHoliday(map, new Date(year, 11, 25), "Joulupäivä", "Christmas Day", "FI");
  addHoliday(map, new Date(year, 11, 26), "Tapaninpäivä", "Boxing Day", "FI");
  return map;
}

export function makeHUHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Újév", "New Year's Day", "HU");
  addHoliday(map, new Date(year, 2, 15), "Nemzeti ünnep", "National Day", "HU");
  addHoliday(map, addDays(easter, -2), "Nagypéntek", "Good Friday", "HU");
  addHoliday(map, addDays(easter, 0), "Húsvétvasárnap", "Easter Sunday", "HU");
  addHoliday(map, addDays(easter, 1), "Húsvéthétfő", "Easter Monday", "HU");
  addHoliday(map, new Date(year, 4, 1), "A munka ünnepe", "Labour Day", "HU");
  addHoliday(map, addDays(easter, 49), "Pünkösdvasárnap", "Whit Sunday", "HU");
  addHoliday(map, addDays(easter, 50), "Pünkösdhétfő", "Whit Monday", "HU");
  addHoliday(map, new Date(year, 7, 20), "Államalapítás ünnepe", "State Foundation Day", "HU");
  addHoliday(map, new Date(year, 9, 23), "Nemzeti ünnep", "Republic Day", "HU");
  addHoliday(map, new Date(year, 10, 1), "Mindenszentek", "All Saints' Day", "HU");
  addHoliday(map, new Date(year, 11, 25), "Karácsony", "Christmas Day", "HU");
  addHoliday(map, new Date(year, 11, 26), "Karácsony másnapja", "Boxing Day", "HU");
  return map;
}

export function makeEEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Uusaasta", "New Year's Day", "EE");
  addHoliday(map, new Date(year, 1, 24), "Iseseisvuspäev", "Independence Day", "EE");
  addHoliday(map, addDays(easter, -2), "Suur reede", "Good Friday", "EE");
  addHoliday(map, addDays(easter, 0), "Ülestõusmispühade 1. püha", "Easter Sunday", "EE");
  addHoliday(map, new Date(year, 4, 1), "Kevadpüha", "Spring Day", "EE");
  addHoliday(map, addDays(easter, 49), "Nelipühade 1. püha", "Whit Sunday", "EE");
  addHoliday(map, new Date(year, 5, 23), "Võidupüha", "Victory Day", "EE");
  addHoliday(map, new Date(year, 5, 24), "Jaanipäev", "Midsummer Day", "EE");
  addHoliday(map, new Date(year, 7, 20), "Taasiseseisvumispäev", "Restoration of Independence", "EE");
  addHoliday(map, new Date(year, 11, 25), "Jõulud", "Christmas Day", "EE");
  addHoliday(map, new Date(year, 11, 26), "Teine jõulupüha", "Boxing Day", "EE");
  return map;
}

export function makeISHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Nýársdagur", "New Year's Day", "IS");
  addHoliday(map, addDays(easter, -3), "Skírðardagur", "Maundy Thursday", "IS");
  addHoliday(map, addDays(easter, -2), "Föstudagurinn langi", "Good Friday", "IS");
  addHoliday(map, addDays(easter, 0), "Páskadagur", "Easter Sunday", "IS");
  addHoliday(map, addDays(easter, 1), "Annar í páskum", "Easter Monday", "IS");
  const firstSummerDay = nthWeekdayOfMonth(year, 3, 4, 1);
  addHoliday(map, firstSummerDay, "Sumardagurinn fyrsti", "First Day of Summer", "IS");
  addHoliday(map, new Date(year, 4, 1), "Verkalýðsdagurinn", "Labour Day", "IS");
  addHoliday(map, addDays(easter, 39), "Uppstigningardagur", "Ascension Day", "IS");
  addHoliday(map, addDays(easter, 49), "Hvítasunnudagur", "Whit Sunday", "IS");
  addHoliday(map, addDays(easter, 50), "Annar í hvítasunnu", "Whit Monday", "IS");
  addHoliday(map, new Date(year, 5, 17), "Þjóðhátíðardagurinn", "National Day", "IS");
  addHoliday(map, new Date(year, 11, 25), "Jóladagur", "Christmas Day", "IS");
  addHoliday(map, new Date(year, 11, 26), "Annar í jólum", "Boxing Day", "IS");
  return map;
}

export function makeSEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "Nyårsdagen", "New Year's Day", "SE");
  addHoliday(map, new Date(year, 0, 6), "Trettondedag jul", "Epiphany", "SE");
  addHoliday(map, addDays(easter, -2), "Långfredagen", "Good Friday", "SE");
  addHoliday(map, addDays(easter, 0), "Påskdagen", "Easter Sunday", "SE");
  addHoliday(map, addDays(easter, 1), "Annandag påsk", "Easter Monday", "SE");
  addHoliday(map, new Date(year, 4, 1), "Första maj", "Labour Day", "SE");
  addHoliday(map, addDays(easter, 39), "Kristi himmelsfärdsdag", "Ascension Day", "SE");
  addHoliday(map, new Date(year, 5, 6), "Nationaldagen", "National Day", "SE");
  const midsummerEve = nthWeekdayOfMonth(year, 5, 5, -1);
  addHoliday(map, addDays(midsummerEve, 1), "Midsommardagen", "Midsummer Day", "SE");
  addHoliday(map, nthWeekdayOfMonth(year, 10, 6, 1), "Alla helgons dag", "All Saints' Day", "SE");
  addHoliday(map, new Date(year, 11, 25), "Juldagen", "Christmas Day", "SE");
  addHoliday(map, new Date(year, 11, 26), "Annandag jul", "Boxing Day", "SE");
  return map;
}

export function makeNGHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "New Year's Day", "New Year's Day", "NG");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "NG");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "NG");
  addHoliday(map, new Date(year, 4, 1), "Workers' Day", "Workers' Day", "NG");
  addHoliday(map, new Date(year, 4, 29), "Democracy Day", "Democracy Day", "NG");
  addHoliday(map, new Date(year, 9, 1), "Independence Day", "Independence Day", "NG");
  addHoliday(map, new Date(year, 11, 25), "Christmas Day", "Christmas Day", "NG");
  addHoliday(map, new Date(year, 11, 26), "Boxing Day", "Boxing Day", "NG");
  return map;
}

export function makeBDHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 1, 21), "শহীদ দিবস", "International Mother Language Day", "BD");
  addHoliday(map, new Date(year, 2, 17), "জাতির পিতার জন্মদিন", "Sheikh Mujibur Rahman's Birthday", "BD");
  addHoliday(map, new Date(year, 2, 26), "স্বাধীনতা দিবস", "Independence Day", "BD");
  addHoliday(map, new Date(year, 3, 14), "পহেলা বৈশাখ", "Bengali New Year", "BD");
  addHoliday(map, new Date(year, 4, 1), "মে দিবস", "May Day", "BD");
  addHoliday(map, new Date(year, 7, 15), "জাতীয় শোক দিবস", "National Mourning Day", "BD");
  addHoliday(map, new Date(year, 11, 16), "বিজয় দিবস", "Victory Day", "BD");
  addHoliday(map, new Date(year, 11, 25), "বড়দিন", "Christmas", "BD");
  return map;
}

export function makeETHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  const orthodoxEaster = addDays(easter, 7);

  addHoliday(map, new Date(year, 0, 7), "ገና", "Orthodox Christmas", "ET");
  addHoliday(map, new Date(year, 0, 19), "ጥምቀት", "Epiphany", "ET");
  addHoliday(map, new Date(year, 2, 2), "አድዋ ድል", "Victory of Adwa", "ET");
  addHoliday(map, addDays(orthodoxEaster, -2), "ስቅለት", "Good Friday", "ET");
  addHoliday(map, addDays(orthodoxEaster, 0), "ፋሲካ", "Easter Sunday", "ET");
  addHoliday(map, new Date(year, 4, 1), "የሰራተኞች ቀን", "Labour Day", "ET");
  addHoliday(map, new Date(year, 4, 5), "የአርበኞች ቀን", "Patriots' Victory Day", "ET");
  addHoliday(map, new Date(year, 4, 28), "ደርግ የወደቀበት ቀን", "Derg Downfall Day", "ET");
  addHoliday(map, new Date(year, 8, 11), "እንቁጣጣሽ", "Ethiopian New Year", "ET");
  addHoliday(map, new Date(year, 8, 27), "መስቀል", "Meskel", "ET");
  return map;
}

export function makeKEHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  const easter = easterSunday(year);
  addHoliday(map, new Date(year, 0, 1), "New Year's Day", "New Year's Day", "KE");
  addHoliday(map, addDays(easter, -2), "Good Friday", "Good Friday", "KE");
  addHoliday(map, addDays(easter, 1), "Easter Monday", "Easter Monday", "KE");
  addHoliday(map, new Date(year, 4, 1), "Labour Day", "Labour Day", "KE");
  addHoliday(map, new Date(year, 5, 1), "Madaraka Day", "Madaraka Day", "KE");
  addHoliday(map, new Date(year, 9, 10), "Huduma Day", "Huduma Day", "KE");
  addHoliday(map, new Date(year, 9, 20), "Mashujaa Day", "Heroes' Day", "KE");
  addHoliday(map, new Date(year, 11, 12), "Jamhuri Day", "Independence Day", "KE");
  addHoliday(map, new Date(year, 11, 25), "Christmas Day", "Christmas Day", "KE");
  addHoliday(map, new Date(year, 11, 26), "Boxing Day", "Boxing Day", "KE");
  return map;
}

export function makeTRHolidays(year: number): HolidayMap {
  const map: HolidayMap = {};
  addHoliday(map, new Date(year, 0, 1), "Yılbaşı", "New Year's Day", "TR");
  addHoliday(map, new Date(year, 3, 23), "Ulusal Egemenlik ve Çocuk Bayramı", "National Sovereignty and Children's Day", "TR");
  addHoliday(map, new Date(year, 4, 1), "Emek ve Dayanışma Günü", "Labour and Solidarity Day", "TR");
  addHoliday(map, new Date(year, 4, 19), "Atatürk'ü Anma, Gençlik ve Spor Bayramı", "Commemoration of Atatürk, Youth and Sports Day", "TR");
  addHoliday(map, new Date(year, 6, 15), "Demokrasi ve Millî Birlik Günü", "Democracy and National Unity Day", "TR");
  addHoliday(map, new Date(year, 7, 30), "Zafer Bayramı", "Victory Day", "TR");
  addHoliday(map, new Date(year, 9, 29), "Cumhuriyet Bayramı", "Republic Day", "TR");
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
  GR: makeGRHolidays,
  ES: makeESHolidays,
  PT: makePTHolidays,
  LU: makeLUHolidays,
  DK: makeDKHolidays,
  FI: makeFIHolidays,
  HU: makeHUHolidays,
  EE: makeEEHolidays,
  IS: makeISHolidays,
  SE: makeSEHolidays,
  QA: makeQAHolidays,
  LT: makeLTHolidays,
  RO: makeROHolidays,
  RU: makeRUHolidays,
  UZ: makeUZHolidays,
  ID: makeIDHolidays,
  KH: makeKHHolidays,
  PK: makePKHolidays,
  GE: makeGEHolidays,
  AR: makeARHolidays,
  MX: makeMXHolidays,
  TH: makeTHHolidays,
  PH: makePHHolidays,
  VN: makeVNHolidays,
  BH: makeBHHolidays,
  MY: makeMYHolidays,
  NG: makeNGHolidays,
  BD: makeBDHolidays,
  ET: makeETHolidays,
  KE: makeKEHolidays,
  TR: makeTRHolidays,
};
