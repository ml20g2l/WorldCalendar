export const isValidDate = (d: any): d is Date =>
  d instanceof Date && !Number.isNaN(d.getTime());

export const coerceDate = (maybeDate: any, fallback: Date = new Date()): Date =>
  isValidDate(maybeDate) ? new Date(maybeDate) : new Date(fallback.getFullYear(), fallback.getMonth(), 1);

export const z = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const toKey = (date: Date): string =>
  isValidDate(date) ? `${date.getFullYear()}-${z(date.getMonth() + 1)}-${z(date.getDate())}` : "";

export const startOfMonth = (date: Date): Date => {
  const d = coerceDate(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

export const addMonths = (date: Date, delta: number): Date => {
  const d = coerceDate(date);
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
};

export const addDays = (d: Date, n: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export function buildMonthMatrix(viewDate: Date): Date[] {
  const first = startOfMonth(viewDate);
  const startOffset = first.getDay();
  const start = new Date(first);
  start.setDate(first.getDate() - startOffset);
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    grid.push(d);
  }
  return grid;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    isValidDate(a) &&
    isValidDate(b) &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function nthWeekdayOfMonth(year: number, monthIdx0: number, weekday: number, nth: number): Date {
  const first = new Date(year, monthIdx0, 1);
  const offset = (7 + weekday - first.getDay()) % 7;
  const day = 1 + offset + (nth - 1) * 7;
  return new Date(year, monthIdx0, day);
}

export function lastWeekdayOfMonth(year: number, monthIdx0: number, weekday: number): Date {
  const last = new Date(year, monthIdx0 + 1, 0);
  const diff = (7 + last.getDay() - weekday) % 7;
  return new Date(year, monthIdx0, last.getDate() - diff);
}

export function observedUS(year: number, monthIdx0: number, day: number): Date {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, -1);
  if (w === 0) return addDays(d, 1);
  return d;
}

export function observedUK(year: number, monthIdx0: number, day: number): Date {
  const d = new Date(year, monthIdx0, day);
  const w = d.getDay();
  if (w === 6) return addDays(d, 2);
  if (w === 0) return addDays(d, 1);
  return d;
}

export const observedCA = observedUS;
export const observedAU = observedUK;
export const observedNZ = observedUK;
export const observedIE = observedUK;

export function easterSunday(year: number): Date {
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
