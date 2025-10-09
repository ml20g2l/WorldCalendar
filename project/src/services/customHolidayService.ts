import { CustomHoliday } from '../types/calendar';

const STORAGE_KEY = 'world_calendar_custom_holidays';

export const customHolidayService = {
  getAll(): CustomHoliday[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(holidays: CustomHoliday[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(holidays));
    } catch (error) {
      console.error('Failed to save custom holidays:', error);
    }
  },

  add(holiday: Omit<CustomHoliday, 'id'>): CustomHoliday {
    const holidays = this.getAll();
    const newHoliday: CustomHoliday = {
      ...holiday,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    holidays.push(newHoliday);
    this.save(holidays);
    return newHoliday;
  },

  update(id: string, updates: Partial<CustomHoliday>): void {
    const holidays = this.getAll();
    const index = holidays.findIndex(h => h.id === id);
    if (index !== -1) {
      holidays[index] = { ...holidays[index], ...updates };
      this.save(holidays);
    }
  },

  delete(id: string): void {
    const holidays = this.getAll();
    const filtered = holidays.filter(h => h.id !== id);
    this.save(filtered);
  },

  getForDate(date: string): CustomHoliday[] {
    const holidays = this.getAll();
    return holidays.filter(h => {
      if (h.isRecurring) {
        const holidayDate = h.date.substring(5);
        const targetDate = date.substring(5);
        return holidayDate === targetDate;
      }
      return h.date === date;
    });
  },

  getForMonth(year: number, month: number): Record<string, CustomHoliday[]> {
    const holidays = this.getAll();
    const result: Record<string, CustomHoliday[]> = {};

    holidays.forEach(h => {
      let keys: string[] = [];

      if (h.isRecurring) {
        const [, monthStr, dayStr] = h.date.split('-');
        const key = `${year}-${monthStr}-${dayStr}`;
        keys.push(key);
      } else {
        const [holidayYear, holidayMonth] = h.date.split('-').map(Number);
        if (holidayYear === year && holidayMonth === month + 1) {
          keys.push(h.date);
        }
      }

      keys.forEach(key => {
        if (!result[key]) result[key] = [];
        result[key].push(h);
      });
    });

    return result;
  },
};
