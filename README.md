WorldCalendar – Multi‑Country Holidays
WorldCalendar is a lightweight React component that displays public holidays from many countries on a single calendar. The component uses React and Tailwind CSS to deliver a responsive UI where users can select multiple countries to compare holidays. Most countries use hard‑coded holiday rules so the calendar works offline, while Korea (KR) fetches data from an API[1]. The latest release adds Germany (DE), Japan (JP), China (CN), Brazil (BR) and India (IN) in addition to the original set (KR, UK, US, CA, AU, NZ, IE and FR)[2].
Supported Countries
Each country is identified by its ISO‑style code and data source. The unified United Kingdom (UK) rule set uses England & Wales as the base and appends Scotland/Northern Ireland‑specific holidays in parentheses[3]. France (FR) offers optional regional toggles such as Alsace–Moselle and overseas territories[4].
Country	Code	Data source
Korea	KR	API (backend)
United Kingdom (base)	UK	Offline rules
United States	US	Offline rules
Canada	CA	Offline rules
Australia	AU	Offline rules
New Zealand	NZ	Offline rules
Ireland	IE	Offline rules
France	FR	Offline rules with regional toggles
Germany	DE	Offline rules[5]

Japan	JP	Offline rules[6]

China	CN	Offline rules[7]

Brazil	BR	Offline rules[8]

India	IN	Offline rules[9]

Features
•	Onboarding selector – A scrollable multi‑select menu lets users choose any combination of the supported countries. If FR is selected, a panel appears with regional toggles such as Alsace–Moselle, Réunion and other territories[10].
•	Calendar navigation – Navigate between months and jump back to the current day via a “Today” button[10].
•	Color‑coded events – Each country is represented by a distinct color. Holidays shared across countries merge their titles (e.g., Christmas appears once with multiple country codes)[11].
•	Side panel – Selecting a day reveals a panel with the merged list of events and a legend for the active countries[11].
•	Error handling – If the KR API call fails or returns no data, a banner with a Retry button appears while other countries continue to display normally[12].
•	Lightweight dev tests – A small suite runs on first mount, logging results to the console to validate date grids, API base logic and country rules[13][14].
Technology
•	React (functional components & hooks)
•	Tailwind CSS (utility‑first styling)
•	lucide‑react icons[15]
Getting Started
You can integrate the calendar into any modern React setup. Below is an example using Vite:
1.	Create a new app and install dependencies:
npm create vite@latest world-calendar -- --template react
cd world-calendar
npm install
npm install lucide-react
# Follow the Tailwind installation guide for Vite
1.	Configure Tailwind as described in the official guide. Replace your default App.jsx with the calendar component and import the accompanying CSS[16].
2.	Run the development server:
npm run dev
API Configuration (Korea)
KR holidays are retrieved via a backend endpoint returning a map of YYYY‑MM‑DD dates to arrays of { name_local, name_intl }[17]. Configure the API base in one of three ways:
1.	Global variable before mounting React:
<script>
  window.__HOLIDAY_API_BASE__ = "https://your-backend.example.com";
</script>
1.	Environment variables (priority: VITE_API_BASE for Vite, REACT_APP_API_BASE for CRA)
2.	Fallback – if neither is set, the component defaults to a relative path (e.g., /holidays/KR/2026)[18].
Customization
Country names and colors are stored in COUNTRY_META. You can adjust labels or Tailwind classes as needed. The object now includes entries for Germany, Japan, China, Brazil and India[2]. For example:
const COUNTRY_META = {
  // …existing countries…
  DE: { label: 'Germany', labelLocal: 'Deutschland', color: 'bg-slate-800' },
  JP: { label: 'Japan', labelLocal: '日本', color: 'bg-red-500' },
  CN: { label: 'China', labelLocal: '中国', color: 'bg-red-700' },
  BR: { label: 'Brazil', labelLocal: 'Brasil', color: 'bg-green-500' },
  IN: { label: 'India', labelLocal: 'भारत', color: 'bg-orange-500' },
};
You can also extend or override colors to suit your brand.
Country Holiday Highlights
Below is a non‑exhaustive summary of the main holidays covered for each country. For detailed logic see the source code.
United States (US)
New Year’s Day, Martin Luther King Jr. Day (3rd Mon of Jan), Presidents’ Day (3rd Mon of Feb), Memorial Day (last Mon of May), Juneteenth, Independence Day, Labour Day, Columbus Day, Veterans Day, Thanksgiving (4th Thu of Nov) and Christmas[19].
United Kingdom (UK)
Core holidays include New Year’s Day, Good Friday, Easter Monday, Early May bank holiday, Spring bank holiday, Summer bank holiday, Christmas and Boxing Day. Scottish holidays (2 January, Summer bank holiday (Scotland), St Andrew’s Day) and Northern Irish holidays (St Patrick’s Day, Battle of the Boyne) are appended as regional extras[20].
Canada (CA)
New Year’s Day, Good Friday, Victoria Day (Monday before 25 May), Canada Day, Labour Day, Truth and Reconciliation Day (from 2021), Thanksgiving (Canada), Remembrance Day, Christmas and Boxing Day[21].
Australia (AU) & New Zealand (NZ)
Australia observes New Year’s Day, Australia Day (26 Jan), Good Friday, Easter Monday, ANZAC Day, the King’s Birthday (2nd Mon of Jun for most states), and Christmas and Boxing Day[22]. New Zealand includes New Year’s Day and the following day, Waitangi Day (6 Feb), Good Friday, Easter Monday, ANZAC Day, King’s Birthday (1st Mon of Jun), Labour Day (4th Mon of Oct) and the Christmas pair[23].
Ireland (IE)
New Year’s Day, St Brigid’s Day (1st Mon of Feb from 2023), St Patrick’s Day, Easter Monday, May Day (1st Mon of May), June Holiday (1st Mon of Jun), August Holiday (1st Mon of Aug), October Bank Holiday (last Mon of Oct), Christmas and St Stephen’s Day[24].
France (FR)
Jour de l’An (1 Jan), Easter Monday, Labour Day (1 May), VE Day (8 May), Ascension (39 days after Easter), Whit Monday (50 days after Easter), Bastille Day (14 Jul), Assumption (15 Aug), All Saints’ Day (1 Nov), Armistice Day (11 Nov) and Noël (25 Dec)[25]. Regional toggles add Good Friday and St Étienne in Alsace–Moselle and abolition‑day celebrations in various overseas territories[26].
Korea (KR)
Observed offline rules include New Year’s Day (신정), Independence Movement Day (삼일절), Children’s Day (어린이날), Memorial Day (현충일), Liberation Day (광복절), National Foundation Day (개천절), Hangeul Day (한글날) and Christmas (크리스마스)[1]. Additional lunar‑calendar holidays are planned but require backend support[1].
Germany (DE)
New Year’s Day (Neujahr), Good Friday (Karfreitag), Easter Monday (Ostermontag), Labour Day (Tag der Arbeit) on 1 May, Ascension Day (Christi Himmelfahrt) 39 days after Easter, Whit Monday (Pfingstmontag) 50 days after Easter, German Unity Day (Tag der Deutschen Einheit) on 3 October, Christmas (Weihnachten) on 25 December and Boxing Day (Zweiter Weihnachtsfeiertag) on 26 December[5].
Japan (JP)
Key holidays include New Year’s Day (元日), Coming of Age Day (成人の日 – 2nd Mon of Jan), National Foundation Day (建国記念の日 – 11 Feb), Emperor’s Birthday (天皇誕生日 – 23 Feb), Vernal Equinox Day (春分の日), Showa Day (昭和の日 – 29 Apr), Constitution Day (憲法記念日 – 3 May), Greenery Day (みどりの日 – 4 May), Children’s Day (こどもの日 – 5 May), Marine Day (海の日 – 3rd Mon of Jul), Mountain Day (山の日 – 11 Aug), Respect for the Aged Day (敬老の日 – 3rd Mon of Sep), Autumnal Equinox Day (秋分の日 – 23 Sep), Sports Day (スポーツの日 – 2nd Mon of Oct), Culture Day (文化の日 – 3 Nov) and Labour Thanksgiving Day (勤労感謝の日 – 23 Nov)[6].
China (CN)
Simplified rules include New Year’s Day (元旦) on 1 Jan, Qingming Festival (清明节) on 4 April, Labour Day (劳动节) on 1 May and National Day (国庆节) on 1 October[7].
Brazil (BR)
Brazilian holidays model New Year’s Day (Ano Novo – 1 Jan), Carnival (Carnaval – 47 days before Easter), Good Friday (Sexta‑feira Santa – 2 days before Easter), Tiradentes’ Day (21 Apr), Labour Day (Dia do Trabalho – 1 May), Corpus Christi (60 days after Easter), Independence Day (Independência – 7 Sep), Our Lady of Aparecida (Nossa Senhora Aparecida – 12 Oct), All Souls’ Day (Finados – 2 Nov), Republic Day (Proclamação da República – 15 Nov) and Christmas (Natal – 25 Dec)[8].
India (IN)
The Indian rule set includes Republic Day (गणतंत्र दिवस) on 26 January, Independence Day (स्वतंत्रता दिवस) on 15 August, Gandhi Jayanti (गांधी जयंती) on 2 October and Christmas on 25 December[9]. Other regional and religious holidays are not currently modeled.
Dev Tests
The built‑in test suite verifies the integrity of date grids, safe date utilities, API base handling and country‑specific rules for all supported countries[13][14]. To disable these logs, set window.__DEV_TESTS__ = false before mounting the component.
Known Limitations & Next Steps
•	Lunar (음력) holidays in KR are not yet modeled; backend logic is needed[27].
•	Localized labels can be expanded; most offline rules currently use English or transliterated names[28].
•	Sub‑national variations beyond the implemented regions are not included (e.g., Australian states, Canadian provinces, NZ’s Matariki, Indian state holidays)[29].
•	Accessibility – add keyboard navigation and ARIA labels to improve a11y[30].
•	Persist selection – persist selected countries and regional choices to localStorage[31].
•	Locale formatting – support user‑selected locales and time zones beyond the default navigator language[32].
Changelog
•	v0.5 – Added Germany (DE), Japan (JP), China (CN), Brazil (BR) and India (IN) offline holiday rules[5][33].
•	v0.4 – Added France regional holiday toggles and tests[34].
•	v0.3 – Added Ireland offline rules; fixed duplicate functions and added IE tests[35].
•	v0.2 – Added Australia and New Zealand offline rules; improved error handling and DevTests[36].
•	v0.1 – Initial MVP supporting KR (API), UK, US and CA with an error banner and multi‑select onboarding[37].
License
This project is provided as an internal MVP/demo. Please add a suitable license before distributing the software[38].
________________________________________
[1] [5] [6] [7] [8] [9] [14] [19] [20] [21] [22] [23] [24] [25] [26] [33] raw.githubusercontent.com
https://raw.githubusercontent.com/ml20g2l/WorldCalendar/main/project/src/utils/holidayCalculators.ts
[2] raw.githubusercontent.com
https://raw.githubusercontent.com/ml20g2l/WorldCalendar/main/project/src/constants/countries.ts
[3] [4] [10] [11] [12] [13] [15] [16] [17] [18] [27] [28] [29] [30] [31] [32] [34] [35] [36] [37] [38] raw.githubusercontent.com
https://raw.githubusercontent.com/ml20g2l/WorldCalendar/main/README.md
