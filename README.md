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

The calendar now supports **44 countries** across all continents:

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
| **Africa** | Nigeria | `NG` | Democracy Day and Independence Day. |
| Africa | Ethiopia | `ET` | Orthodox Christmas and Ethiopian New Year. |
| Africa | Kenya | `KE` | Madaraka Day and Mashujaa Day. |
| **Middle East** | Turkey | `TR` | Republic Day and Democracy and National Unity Day. |
| **South Asia** | Bangladesh | `BD` | International Mother Language Day and Victory Day. |
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
- **Build Tools:** Vite
- **Mobile:** Capacitor (Android/iOS support)
- **Backend:** Supabase (Authentication & Database)
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

### Web Development

Clone and install dependencies:

```bash
git clone https://github.com/ml20g2l/WorldCalendar.git
cd WorldCalendar/project
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The app will be served locally at `http://localhost:5173/`.

### Mobile Development (Android)

This project uses **Capacitor** to wrap the React web app as a native Android application.

#### Prerequisites

- Node.js and npm installed
- Android Studio installed
- Java Development Kit (JDK) 17 or higher

#### Setup Steps

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the web app**:
   ```bash
   npm run build
   ```

3. **Sync web assets with Android**:
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

#### Building the APK/AAB

1. Open the project in Android Studio
2. Go to **Build > Generate Signed Bundle / APK**
3. Select **Android App Bundle (.aab)** for Google Play or **APK** for direct installation
4. Create or select a keystore for signing
5. Choose the release build variant
6. The signed package will be generated in `android/app/release/`

#### Deploying to Google Play

1. Sign the app bundle (.aab) using your release keystore
2. Go to [Google Play Console](https://play.google.com/console)
3. Create a new app or select an existing one
4. Navigate to **Production** or **Testing** tracks
5. Upload your signed .aab file
6. Complete the store listing and content rating
7. Submit for review

**Important Notes:**
- Keep your keystore file secure and backed up
- Never commit keystores or signing credentials to version control
- Use consistent package naming (e.g., `com.worldcalendar.app`)
- The `/android` directory is generated by Capacitor and can be gitignored, but keeping it in version control helps with platform-specific configurations

#### iOS Support (Future)

To add iOS support, run:
```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

iOS builds require macOS and Xcode.

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

### v0.8 (October 2025)
- Added **5 new countries with high Android market share**: Nigeria, Bangladesh, Ethiopia, Kenya, and Turkey.
- Total countries supported: **44**.
- Enhanced localization with native language labels (Bengali, Amharic, Turkish).
- Added regional African holidays and Ethiopian Orthodox calendar support.
- Completed holiday implementations for all previously listed countries (GR, ES, PT, LU, DK, FI, HU, EE, IS, SE).
- Optimized for Android-dominant markets across Africa, South Asia, and Middle East.

### v0.7 (October 2025)
- Integrated **Capacitor** for native Android app support
- Added **Supabase Authentication** with email/password signup and login
- Implemented user profiles with secure database storage
- Added password reset functionality
- Mobile-optimized viewport and responsive design
- Ready for Google Play deployment with AAB/APK building

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
