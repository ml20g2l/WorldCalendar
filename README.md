# World Calendar — Multi‑country Holidays (KR · UK · US · CA)

A lightweight React + Tailwind MVP that shows multiple countries’ public holidays on a single calendar.

- **Countries**: Korea (KR), United Kingdom (UK), United States (US), Canada (CA)
- **UK is unified** (England & Wales base). Scotland/Northern Ireland only holidays are shown with **parentheses**:
  - e.g., `St Andrew’s Day (Scotland)`, `St Patrick’s Day (Northern Ireland)`
- **Offline rules** for UK/US/CA (no API needed).  
  **KR** uses an API; if the API year is empty, the calendar renders with no KR events for that year. If the request fails, a banner appears with **Retry**, and other countries still render normally.

---

## Features

- Onboarding: scrollable multi‑select of countries (KR, UK, US, CA).
- Month navigation, “Today” button; resilient date handling.
- Calendar grid with **country color dots** and merged event titles across countries (e.g., Christmas appears once with country codes).
- Side panel with per‑day merged events and legend.
- API error banner with Retry; graceful handling of empty data (renders empty days rather than failing).
- Small “DevTests” suite logs to the console to sanity‑check core date & rule logic.

---

## Tech

- **React** (function components, hooks)
- **Tailwind CSS** (utility classes)
- **lucide-react** icons

> The code lives in a single component: `MultiCountryCalendarApp`.

---

## Running Locally

Any React setup works (Vite, CRA, Next.js). Example with **Vite**:

```bash
# New app
npm create vite@latest world-calendar -- --template react
cd world-calendar
npm i
npm i lucide-react
# Add Tailwind (https://tailwindcss.com/docs/guides/vite)
# …configure tailwind, then replace App.jsx with the component code from canvas.
npm run dev
```

Render the component in your `App.jsx` (or page) and ensure Tailwind is loaded.

---

## Country Logic

### United States (US) — Offline
- New Year’s Day (observed)
- Martin Luther King Jr. Day (3rd Monday in Jan)
- Presidents’ Day (3rd Monday in Feb)
- Memorial Day (last Monday in May)
- Juneteenth (observed)
- Independence Day (observed)
- Labor Day (1st Monday in Sep)
- Columbus Day (2nd Monday in Oct)
- Veterans Day (observed)
- Thanksgiving (4th Thursday in Nov)
- Christmas Day (observed)

### United Kingdom (UK) — Unified, Offline
- Base (England & Wales): Good Friday, *Easter Monday*, Early May bank holiday (1st Mon in May), Spring bank holiday (last Mon in May), Summer bank holiday (last Mon in Aug), Christmas, Boxing Day, New Year’s Day (all with UK “Mondayisation” rules).
- **Scotland only** (appended label): `2 January (Scotland)`, `Summer bank holiday (Scotland)` (1st Mon in Aug), `St Andrew’s Day (Scotland)` (Nov 30, observed rules).
- **Northern Ireland only** (appended label): `St Patrick’s Day (Northern Ireland)` (Mar 17, observed), `Battle of the Boyne (Northern Ireland)` (Jul 12, observed).

### Canada (CA) — Offline
- New Year’s Day (observed)
- Good Friday
- **Victoria Day** (Monday before May 25)
- **Canada Day** (observed)
- **Labour Day** (1st Monday in Sep)
- **National Day for Truth and Reconciliation** (since 2021; Sep 30, observed)
- **Thanksgiving (Canada)** (2nd Monday in Oct)
- Remembrance Day (observed)
- Christmas Day (observed), Boxing Day (observed)

> “Observed” means weekend dates shift to the nearest weekday according to each country’s rule set.

### Korea (KR) — API
KR uses a backend endpoint returning a map of `YYYY-MM-DD` → array of `{ name_local, name_intl }`.  
If the API returns **no data** for a year, KR simply has no events for that year (calendar still renders). Failures show a banner with a **Retry** button.

**Endpoint shape**
```
GET {API_BASE}/holidays/{code}/{year}
→ 200 OK
{
  "2025-01-01": [ { "name_local": "신정", "name_intl": "New Year’s Day" } ],
  ...
}
```

---

## Configuration

### API Base (for KR only)
You can set the API base in any of the following ways (priority order):
1) Global variable before React mounts:
```html
<script>window.__HOLIDAY_API_BASE__ = "https://your-api.example.com";</script>
```
2) Env vars (depending on bundler):
- `VITE_API_BASE` (Vite)
- `REACT_APP_API_BASE` (CRA)
3) Fallback: relative path (e.g., `/holidays/KR/2026`).

### Country Colors/Labels
Adjust in `COUNTRY_META`:
```js
const COUNTRY_META = {
  KR: { label: "Korea", color: "bg-sky-500" },
  UK: { label: "United Kingdom", color: "bg-rose-500" },
  US: { label: "United States", color: "bg-amber-500" },
  CA: { label: "Canada", color: "bg-emerald-500" },
};
```

---

## Dev Tests

A lightweight runtime test suite logs results to the browser console on first mount.

- To **disable**:
```html
<script>window.__RUN_CAL_TESTS__ = false;</script>
```

The tests cover:
- Date grid building
- Safe date utilities
- API base URL builder
- UK regional rules (Easter Monday difference, NI extras)
- CA rules (Canada Day present, Victoria Day Monday-before-25th, Thanksgiving second Monday in October, Truth & Reconciliation since 2021)

---

## Known Limitations / Next Steps

- KR lunar (음력) aligned holidays still require backend logic.
- Localized labels per country/event can be expanded (currently English in offline rules).
- Additional regions (e.g., UK: separate England label, Canada provinces like Family Day) can be added with similar rule helpers.
- Accessibility: add keyboard navigation and aria labels for full a11y.
- Persist selected countries to localStorage.

---

## License
For internal MVP/demo use. Add your preferred license before distribution.
