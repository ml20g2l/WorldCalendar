
# World Calendar — Multi‑country Holidays (KR · UK · US · CA · AU · NZ · IE · FR)

A lightweight React + Tailwind MVP that shows multiple countries’ public holidays on a single calendar.

- **Countries**: Korea (KR), United Kingdom (UK), United States (US), Canada (CA), Australia (AU), New Zealand (NZ), Ireland (IE), **France (FR)**.
- **UK is unified** (England & Wales base). Scotland/Northern Ireland only holidays are appended in parentheses:
  - e.g., `St Andrew’s Day (Scotland)`, `St Patrick’s Day (Northern Ireland)`
- **Offline rules** for **UK/US/CA/AU/NZ/IE/FR** (no API needed).  
  **KR** uses an API; if the API year is empty, the calendar renders with no KR events for that year. If the request fails, a banner appears with **Retry**, and other countries still render normally.
- **France regional toggles** in onboarding (Alsace–Moselle, overseas territories, etc.).

---

## Features

- Onboarding: scrollable multi‑select of countries (KR, UK, US, CA, AU, NZ, IE, FR).
  - If **FR** is selected, a **“France regional holidays”** panel appears with per‑region toggles.
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

## Country Logic (offline unless noted)

### United States (US)
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

### United Kingdom (UK) — **Unified**
- Base (England & Wales): Good Friday, *Easter Monday*, Early May bank holiday (1st Mon in May), Spring bank holiday (last Mon in May), Summer bank holiday (last Mon in Aug), Christmas, Boxing Day, New Year’s Day (“Mondayisation”).  
- **Scotland only** (appended): `2 January (Scotland)`, `Summer bank holiday (Scotland)` (1st Mon in Aug), `St Andrew’s Day (Scotland)` (Nov 30, observed).  
- **Northern Ireland only** (appended): `St Patrick’s Day (Northern Ireland)` (Mar 17, observed), `Battle of the Boyne (Northern Ireland)` (Jul 12, observed).

### Canada (CA)
- New Year’s Day (observed)
- Good Friday
- **Victoria Day** (Monday before May 25)
- **Canada Day** (observed)
- **Labour Day** (1st Monday in Sep)
- **National Day for Truth and Reconciliation** (since 2021; Sep 30, observed)
- **Thanksgiving (Canada)** (2nd Monday in Oct)
- Remembrance Day (observed)
- Christmas Day (observed), Boxing Day (observed)

### Australia (AU)
- New Year’s Day (observed)
- **Australia Day** (Jan 26, observed to Monday if weekend — *state variations exist*)
- Good Friday
- **Easter Monday**
- **ANZAC Day** (Apr 25, observed to Monday if weekend — *some states differ; simplified here*)
- **King’s Birthday** (2nd Monday in June — *most states*)
- Christmas Day (observed), Boxing Day (observed)

### New Zealand (NZ)
- New Year’s Day **and** Day after New Year’s (both **mondayised**; if they collide due to mondayisation, the second shifts again)
- **Waitangi Day** (Feb 6, mondayised)
- Good Friday, **Easter Monday**
- **ANZAC Day** (Apr 25, mondayised)
- **King’s Birthday** (1st Monday in June)
- **Labour Day** (4th Monday in October)
- Christmas Day, Boxing Day (pair **mondayisation** handled)

### Ireland (IE)
- **New Year’s Day (observed)**
- **St Brigid’s Day** — from **2023**: first **Monday** in February; **if Feb 1 is Friday, then Feb 1**
- **St Patrick’s Day (observed)** — Mar 17, mondayised
- **Easter Monday** (Good Friday is **not** a public holiday)
- **May Day** (1st Monday in May)
- **June Holiday** (1st Monday in June)
- **August Holiday** (1st Monday in August)
- **October Bank Holiday** (last Monday in October)
- **Christmas Day** and **St Stephen’s Day** (pair mondayisation handled)

### France (FR)
**National (no mondayisation):**
- Jour de l’An (New Year’s Day) — 1/1  
- Lundi de Pâques (Easter Monday) — Easter + 1  
- Fête du Travail (Labour Day) — 5/1  
- Victoire 1945 (VE Day) — 5/8  
- Ascension — Easter + 39 (Thu)  
- Lundi de Pentecôte (Whit Monday) — Easter + 50  
- Fête Nationale (Bastille Day) — 7/14  
- Assomption — 8/15  
- La Toussaint — 11/1  
- Armistice 1918 — 11/11  
- Noël — 12/25

**Regional toggles (onboarding → select FR to reveal):**
- **AM — Alsace–Moselle**:  
  - *Vendredi saint (Good Friday)* — Easter − 2  
  - *Saint Étienne* — 12/26
- **RE — La Réunion**: *Abolition de l’esclavage* — 12/20  
- **GP — Guadeloupe**: *Abolition de l’esclavage* — 5/27  
- **MQ — Martinique**: *Abolition de l’esclavage* — 5/22  
- **GF — Guyane**: *Abolition de l’esclavage* — 6/10  
- **YT — Mayotte**: *Abolition de l’esclavage* — 4/27  
- **NC — Nouvelle‑Calédonie**: *Fête de la Citoyenneté* — 9/24  
- **PF — Polynésie française**: *Fête de l’Autonomie* — 6/29  
- **WF — Wallis‑et‑Futuna**: *Saint Pierre Chanel* — 4/28

> Regional days are appended with their region in parentheses (e.g., “Vendredi saint (Alsace–Moselle)”) and are rendered under the **FR** legend color.

### Korea (KR) — **API**
KR uses a backend endpoint returning a map of `YYYY-MM-DD` → array of `{ name_local, name_intl }`.  
If the API returns **no data** for a year, KR has no events for that year (calendar still renders). Failures show a banner with **Retry**.

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
  AU: { label: "Australia", color: "bg-blue-600" },
  NZ: { label: "New Zealand", color: "bg-black" },
  IE: { label: "Ireland", color: "bg-green-600" },
  FR: { label: "France", color: "bg-indigo-500" },
};
```

---

## Dev Tests

A lightweight runtime test suite logs results to the browser console on first mount.

- To **disable**:
```html
<script>window.__RUN_CAL_TESTS__ = false;</script>
```

Covers:
- Date grid building & safe date utilities
- API base URL builder
- UK regional rules (Easter Monday difference, NI extras)
- CA rules (Canada Day present, Victoria Day Monday-before-25th, Thanksgiving second Monday in October, Truth & Reconciliation since 2021)
- AU/NZ rules (ANZAC mondayisation; NZ New Year mondayisation pair; NZ Labour Day; AU King’s Birthday)
- IE rules (Easter Monday present; Good Friday excluded; St Brigid’s Day; St Patrick’s mondayisation; October Bank Holiday)
- **FR national rules** (Easter Monday; no Good Friday nationally; fixed dates like 5/1 and 7/14)
- **FR regional toggles** (AM Good Friday/12‑26; Réunion 12‑20; etc.)

---

## Known Limitations / Next Steps

- KR lunar (음력) aligned holidays still require backend logic.
- Localized labels per country/event can be expanded (currently English for offline rules, FR local strings included).
- **Sub‑national variations** outside the implemented set are not modeled (e.g., AU states in detail, CA provinces, NZ Matariki year-by-year).
- Accessibility: add keyboard navigation and aria labels for full a11y.
- Persist selected countries and FR regional choices to localStorage.
- Time zones / locale formatting: consider user‑selected locales beyond `navigator.language`.

---

## Changelog

- **v0.4**: Added **France (FR) regional holiday toggles** (Alsace–Moselle & overseas territories) and tests.
- **v0.3**: Added **Ireland (IE)** offline holiday rules; fixed duplicate function definition error; added IE tests.
- **v0.2**: Added **Australia (AU)** and **New Zealand (NZ)** offline holiday rules; fixed `DevTests` syntax; added AU/NZ tests; improved error handling.
- **v0.1**: Initial MVP with KR (API), UK (unified), US, CA offline rules; error banner + Retry; onboarding multi‑select.

---

## License
For internal MVP/demo use. Add your preferred license before distribution.
