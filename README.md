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

The calendar now supports **39 countries** across all continents:

| Continent | Country | Code | Notes |
|------------|----------|------|-------|
| **Europe** | United Kingdom | `UK` | Includes England, Wales, Scotland, Northern Ireland regional holidays. |
| Europe | Ireland | `IE` | Republic of Ireland national holidays. |
| Europe | France | `FR` | Regional options: Alsace‑Moselle, overseas territories. |
| Europe | Germany | `DE` | Federal holidays with movable religious dates. |
| Europe | Greece | `GR` | Orthodox Easter celebrations. |
| Europe | Spain | `ES` | National and religious holidays. |
| Europe | Portugal | `PT` | Includes Carnival and Freedom Day. |
| Europe | Luxembourg | `LU` | Includes Europe Day. |
| Europe | Denmark | `DK` | Nordic holidays with Maundy Thursday. |
| Europe | Finland | `FI` | Midsummer celebrations. |
| Europe | Hungary | `HU` | National days and religious holidays. |
| Europe | Estonia | `EE` | Independence and Victory Day. |
| Europe | Iceland | `IS` | Unique First Day of Summer. |
| Europe | Sweden | `SE` | Midsummer and national holidays. |
| Europe | Lithuania | `LT` | Independence restoration days. |
| Europe | Romania | `RO` | Orthodox Easter and Unification Day. |
| Europe | Russia | `RU` | Orthodox Christmas and Victory Day. |
| Europe | Georgia | `GE` | Orthodox holidays and Independence Day. |
| **Asia** | South Korea | `KR` | API‑based lunar calendar support. |
| Asia | Japan | `JP` | Emperor's Birthday and national holidays. |
| Asia | China | `CN` | Lunar New Year and National Day. |
| Asia | India | `IN` | Republic Day and Independence Day. |
| Asia | Qatar | `QA` | National Day. |
| Asia | Uzbekistan | `UZ` | Nowruz and Independence Day. |
| Asia | Indonesia | `ID` | Pancasila Day and Independence Day. |
| Asia | Cambodia | `KH` | Royal Ploughing Ceremony. |
| Asia | Pakistan | `PK` | Kashmir Day and Independence Day. |
| Asia | Thailand | `TH` | Songkran Festival and King's Birthday. |
| Asia | Philippines | `PH` | Day of Valor and Independence Day. |
| Asia | Vietnam | `VN` | Reunification Day and National Day. |
| Asia | Bahrain | `BH` | National Day. |
| Asia | Malaysia | `MY` | Malaysia Day and Federal Territory Day. |
| **Americas** | United States | `US` | Federal holidays including Thanksgiving. |
| Americas | Canada | `CA` | Federal and provincial holidays. |
| Americas | Brazil | `BR` | Carnival and regional celebrations. |
| Americas | Argentina | `AR` | May Revolution and Independence Day. |
| Americas | Mexico | `MX` | Constitution Day and Revolution Day. |
| **Oceania** | Australia | `AU` | State‑specific holidays (NSW, VIC, etc.). |
| Oceania | New Zealand | `NZ` | National and regional anniversary days. |

---

## Tech Stack

- **Frontend:** React 18, Tailwind CSS
- **Language:** JavaScript (ES6+), TypeScript (utility logic)
- **Build Tools:** Vite / Create React App
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
    { date: `${year}-01-01`, name: "元日 (New Year's Day)" },
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
Hovering over a date shows tooltips with translated names such as "元日 – New Year's Day" or "Holi Festival".

---

## Changelog

### v0.6 (October 2025)
- Added **26 new countries**: Greece, Spain, Portugal, Luxembourg, Denmark, Finland, Hungary, Estonia, Iceland, Sweden, Qatar, Lithuania, Romania, Russia, Uzbekistan, Indonesia, Cambodia, Pakistan, Georgia, Argentina, Mexico, Thailand, Philippines, Vietnam, Bahrain, and Malaysia.
- Total countries supported: **39**.
- Enhanced support for Orthodox Easter calculations.
- Added regional celebrations like Nowruz, Songkran, and Midsummer.
- Improved multilingual holiday name display with native scripts.

### v0.5 (October 2025)
- Added **Germany, Japan, China, Brazil, and India**.
- Updated offline holiday logic for better accuracy.
- Improved date rendering for cross‑timezone consistency.
- Enhanced region toggle for France and Australia.
- Refactored structure for cleaner imports.

### v0.4 (September 2025)
- Added France, Ireland, and Korea (API‑based lunar support).
- Introduced Tailwind styling and tooltip components.

### v0.3 (September 2025)
- Added Canada, Australia, and New Zealand.

### v0.2 (September 2025)
- Added United States and United Kingdom.

### v0.1 (September 2025)
- Initial prototype with basic single‑country holiday view.

---

## License

MIT License © 2025 Geeyoon Lim
For personal and educational use only. Contributions welcome!

---
