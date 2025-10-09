import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CustomHoliday } from '../types/calendar';

interface CustomHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (holiday: Omit<CustomHoliday, 'id'>) => void;
  initialDate?: string;
}

const CATEGORY_OPTIONS: Array<{ value: CustomHoliday['category']; label: string }> = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'religious', label: 'Religious' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'other', label: 'Other' },
];

const COLOR_OPTIONS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

export const CustomHolidayModal: React.FC<CustomHolidayModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDate,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || '');
  const [isRecurring, setIsRecurring] = useState(true);
  const [category, setCategory] = useState<CustomHoliday['category']>('other');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [notificationDays, setNotificationDays] = useState<number[]>([1]);

  const handleSave = () => {
    if (!title.trim() || !date) return;

    onSave({
      title: title.trim(),
      date,
      isRecurring,
      category,
      color,
      notificationDays,
    });

    setTitle('');
    setDate(initialDate || '');
    setIsRecurring(true);
    setCategory('other');
    setColor(COLOR_OPTIONS[0]);
    setNotificationDays([1]);
    onClose();
  };

  const toggleNotificationDay = (day: number) => {
    setNotificationDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Mom's Birthday"
              className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium">Repeat annually</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-neutral-900' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notifications</label>
            <div className="flex gap-2 flex-wrap">
              {[1, 7, 14, 30].map((day) => (
                <button
                  key={day}
                  onClick={() => toggleNotificationDay(day)}
                  className={`
                    px-3 py-2 rounded-lg border text-sm transition-all
                    ${
                      notificationDays.includes(day)
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }
                  `}
                >
                  {day === 1 ? '1 day before' : `${day} days before`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !date}
            className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 text-white disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
