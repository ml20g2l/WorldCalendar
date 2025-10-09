# WorldCalendar – Multi‑Country Holiday Calendar

WorldCalendar is a responsive and extensible **React** application that allows users to view public holidays from multiple countries in one unified calendar interface.  
It supports **region‑specific**, **language‑based**, and **lunar calendar** holidays, making it suitable for both global users and multicultural teams.

---

## Overview

This project was designed to simplify international scheduling by visualising public holidays across multiple countries on the same calendar view.  
Users can toggle visibility for each country, view tooltips with holiday details in different languages, and customise which countries appear by default.  
Most holiday data is calculated offline using deterministic date logic, while lunar‑based regions like **South Korea** use external APIs for accuracy.

---

## Key Features

| Category | Description |
|-----------|--------------|
| **Multi‑Country Display** | View holidays from multiple countries side by side in one monthly calendar grid. |
| **Offline Holiday Calculation** | Each country (except KR) uses predefined holiday rules implemented in TypeScript. |
| **Lunar Calendar Support** | South Korea (KR) holidays include lunar‑based events fetched via an API. |
| **Regional Toggles** | Some countries (e.g., France) include region‑specific holidays like Alsace‑Moselle or Corsica. |
| **Multilingual Holiday Names** | Holiday names automatically adapt to the selected language or device locale. |
| **Customisable UI** | Easily adjust displayed countries or add new ones by modifying constants. |
| **Lightweight Design** | Built entirely with React + TailwindCSS for smooth rendering and modern styling. |

---

## Supported Countries

| Continent | Country | Code | Notes |
|------------|----------|------|-------|
| Europe | United Kingdom | `UK` | Includes England, Wales, Scotland, Northern Ireland (regional tags in brackets). |
| Europe | Ireland | `IE` | Includes Republic of Ireland national holidays. |
| Europe | France | `FR` | Regional options: Alsace‑Moselle, Corsica, Overseas Territories. |
| Europe | Germany | `DE` | Federal holidays; supports movable religious holidays. |
| Asia | South Korea | `KR` | API‑based lunar support. |
| Asia | Japan | `JP` | Includes national and Emperor’s Birthday holidays. |
| Asia | China | `CN` | Includes Lunar New Year and National Day; logic handles multi‑day sequences. |
| Americas | United States | `US` | Federal holidays, including Thanksgiving (fourth Thursday in November). |
| Americas | Canada | `CA` | Federal and some provincial holidays. |
| Americas | Brazil | `BR` | Carnival, Independence Day, and regional saint days. |
| Oceania | Australia | `AU` | State‑specific holidays are tagged (e.g., NSW, VIC). |
| Oceania | New Zealand | `NZ` | National and regional anniversary days. |
| Asia | India | `IN` | National holidays; Diwali and Holi added as sample movable holidays. |

---

## Tech Stack

- **Frontend:** React 18, Tailwind CSS  
- **Language:** JavaScript (ES6+), TypeScript (utility logic)  
- **Build Tools:** Vite / Create React App  
- **Data:** Static offline calculations + public APIs (KR)  
- **Version Control:** Git / GitHub

---

## Project Structure

```
WorldCalendar/
├── project/
│   ├── src/
│   │   ├── components/          # Calendar UI, country toggles, and popups
│   │   ├── constants/           # Supported country list and region metadata
│   │   ├── services/            # Custom holiday generators and API handlers
│   │   ├── utils/               # Date calculators (Easter, Lunar, etc.)
│   │   ├── App.jsx              # Main React component
│   │   ├── index.jsx            # Entry point
│   │   └── styles.css           # Tailwind styles
│   ├── public/                  # Static assets
│   ├── package.json             # Project configuration
│   └── README.md                # Documentation (this file)
└── .gitignore
```

---

## Installation & Setup

Clone and install dependencies:

```bash
git clone https://github.com/ml20g2l/WorldCalendar.git
cd WorldCalendar/project
npm install
```

Run the app in development mode:

```bash
npm start
```

Build for production:

```bash
npm run build
```

The app will be served locally at `http://localhost:3000/`.

---

## Holiday Logic Summary

Each country's holidays are computed using a mix of **fixed dates** (e.g., Christmas) and **movable rules** (e.g., Easter, Diwali).  
These are defined inside `src/utils/holidayCalculators.ts` and invoked based on user selection.

### Example Functions

```typescript
// Example: German Unity Day
function makeGermanyHolidays(year) {
  return [{ date: `${year}-10-03`, name: "Tag der Deutschen Einheit" }];
}

// Example: Japanese Holidays
function makeJapanHolidays(year) {
  return [
    { date: `${year}-01-01`, name: "元日 (New Year’s Day)" },
    { date: `${year}-02-11`, name: "建国記念の日 (Foundation Day)" },
    { date: `${year}-04-29`, name: "昭和の日 (Shōwa Day)" },
  ];
}
```

---

## Customisation

You can easily extend the calendar to include additional countries by editing:

- `src/constants/countries.ts` → Add ISO code, name, and region metadata  
- `src/utils/holidayCalculators.ts` → Define or import holiday calculation functions  
- `src/components/CountrySelector.jsx` → Add the country to the selector dropdown

---

## Example Use Case

**Scenario:** You want to see overlapping holidays between the UK, Japan, and India.  
Enable these three countries in the toggle list, and the calendar will highlight each in different colours.  
Hovering over a date shows tooltips with translated names such as “元日 – New Year’s Day” or “Holi Festival”.

---

## Changelog

### v0.5 (October 2025)
- Added **Germany, Japan, China, Brazil, and India**.
- Updated offline holiday logic for better accuracy.
- Improved date rendering for cross‑timezone consistency.
- Enhanced region toggle for France and Australia.
- Refactored structure for cleaner imports.

### v0.4 (September 2025)
- Added France, Ireland, and Korea (API‑based lunar support).
- Introduced Tailwind styling and tooltip components.

### v0.3 (September 2025)
- Added Canada, Australia, and New Zealand.

### v0.2 (September 2025)
- Added United States and United Kingdom.

### v0.1 (September 2025)
- Initial prototype with basic single‑country holiday view.

---

## License

MIT License © 2025 Geeyoon Lim  
For personal and educational use only. Contributions welcome!

---

