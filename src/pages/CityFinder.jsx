import { useState, useEffect, useRef } from "react";

// ─── DESIGN: Warm cartographic editorial — think travel magazine meets data viz ─
const T = {
  bg: "#0F1117",
  surface: "#161820",
  card: "#1C1F2B",
  cardHover: "#21253A",
  border: "#252838",
  borderBright: "#383C55",
  text: "#F0EDE6",
  textMid: "#8C8FA8",
  textDim: "#3C3F55",
  accent: "#E8B86D",
  accentBg: "rgba(232,184,109,0.08)",
  accentDeep: "#B8843D",
  teal: "#4ECDC4",
  tealBg: "rgba(78,205,196,0.08)",
  coral: "#FF6B6B",
  coralBg: "rgba(255,107,107,0.08)",
  lavender: "#9B8FE8",
  lavenderBg: "rgba(155,143,232,0.08)",
  green: "#56CFB2",
  greenBg: "rgba(86,207,178,0.08)",
  ff: "'Abril Fatface', 'Georgia', serif",
  sans: "'Outfit', 'Helvetica Neue', sans-serif",
  mono: "'Space Mono', 'Courier New', monospace",
};

// ─── CITIES ───────────────────────────────────────────────────────────────────
const CITIES = [
  {
    id: "atlanta",
    name: "Atlanta, GA",
    state: "Georgia",
    emoji: "🍑",
    tagline: "The city that never stops building",
    color: "#E8734A",
    colorBg: "rgba(232,115,74,0.1)",
    scores: {
      cost: 3, culture_black: 5, culture_latino: 2, culture_intl: 3, culture_lgbtq: 3,
      culture_arts: 4, food: 4, nightlife: 5, walkability: 3, transit: 2,
      nature: 3, safety: 2, jobs_tech: 4, jobs_creative: 4, jobs_finance: 4,
      jobs_healthcare: 4, jobs_trades: 3, weather_warm: 5, weather_mild: 3,
      weather_seasons: 2, outdoor: 3, family: 3, young_professional: 5,
      beach: 0, airport: 5,
    },
    rentRange: "$1,400–$1,900/mo",
    population: "498K city / 6.1M metro",
    highlights: [
      "Black cultural capital of the South — HBCUs, art, music, food",
      "One of the fastest-growing job markets in the US",
      "Strong young professional and networking scene",
      "Home to Delta, Coca-Cola, CNN, and booming film industry",
    ],
    cons: ["Traffic among the worst in the US", "Car-dependent outside of Beltline", "Growing pains — affordability tightening"],
    neighborhoods: ["Old Fourth Ward", "West End", "Midtown", "Decatur", "East Point"],
    climate: "Hot humid summers, mild winters — rarely freezes. 4 distinct seasons.",
    transit: "MARTA light rail covers major corridors. Car still helps significantly.",
    vibes: ["Hustle", "Culture", "Ambition", "Community"],
  },
  {
    id: "charlotte",
    name: "Charlotte, NC",
    state: "North Carolina",
    emoji: "🏙️",
    tagline: "The New South's fastest rising star",
    color: "#4A90D9",
    colorBg: "rgba(74,144,217,0.1)",
    scores: {
      cost: 4, culture_black: 4, culture_latino: 3, culture_intl: 3, culture_lgbtq: 3,
      culture_arts: 3, food: 3, nightlife: 3, walkability: 2, transit: 2,
      nature: 3, safety: 3, jobs_tech: 4, jobs_creative: 3, jobs_finance: 5,
      jobs_healthcare: 4, jobs_trades: 4, weather_warm: 4, weather_mild: 4,
      weather_seasons: 3, outdoor: 3, family: 4, young_professional: 4,
      beach: 0, airport: 4,
    },
    rentRange: "$1,200–$1,700/mo",
    population: "875K city / 2.7M metro",
    highlights: [
      "Major US banking hub — Bank of America, Truist HQ",
      "One of the fastest-growing cities in the Southeast",
      "Strong Black middle-class and professional community",
      "4 mild seasons and easy access to mountains and beaches",
    ],
    cons: ["Sprawling and car-dependent", "Nightlife still developing vs. ATL", "Growing pains — traffic worsening"],
    neighborhoods: ["NoDa", "Plaza Midwood", "South End", "University City", "Steele Creek"],
    climate: "Mild four seasons. Hot summers, light snow possible in winter. Pleasant most of the year.",
    transit: "LYNX light rail expanding but still heavily car-dependent.",
    vibes: ["Upwardly Mobile", "Steady", "Livable", "Growing"],
  },
  {
    id: "houston",
    name: "Houston, TX",
    state: "Texas",
    emoji: "🤠",
    tagline: "Big city energy with room to breathe",
    color: "#9B6FD9",
    colorBg: "rgba(155,111,217,0.1)",
    scores: {
      cost: 5, culture_black: 4, culture_latino: 5, culture_intl: 5, culture_lgbtq: 3,
      culture_arts: 4, food: 5, nightlife: 4, walkability: 1, transit: 2,
      nature: 2, safety: 3, jobs_tech: 4, jobs_creative: 3, jobs_finance: 4,
      jobs_healthcare: 5, jobs_trades: 5, weather_warm: 4, weather_mild: 2,
      weather_seasons: 1, outdoor: 2, family: 4, young_professional: 4,
      beach: 0, airport: 5,
    },
    rentRange: "$1,050–$1,550/mo",
    population: "2.3M city / 7.3M metro",
    highlights: [
      "Most diverse city in the US — extraordinary food culture",
      "No state income tax — keep more of what you earn",
      "Massive medical center, energy sector, and growing tech hub",
      "Very affordable for a major metro",
    ],
    cons: ["Not walkable — car is essentially mandatory", "Brutal summer heat and humidity", "Flooding risk / no zoning"],
    neighborhoods: ["Midtown", "Montrose", "Third Ward", "EaDo", "Heights"],
    climate: "Very hot and humid May–October. Mild winters. Occasional severe weather.",
    transit: "METRORail covers some corridors. Almost everyone drives.",
    vibes: ["Diverse", "Affordable", "Ambitious", "No Limits"],
  },
  {
    id: "dc",
    name: "Washington, DC",
    state: "DC / MD / VA",
    emoji: "🏛️",
    tagline: "Power, culture, and purpose in one city",
    color: "#E84A4A",
    colorBg: "rgba(232,74,74,0.1)",
    scores: {
      cost: 1, culture_black: 5, culture_latino: 4, culture_intl: 5, culture_lgbtq: 5,
      culture_arts: 5, food: 5, nightlife: 4, walkability: 5, transit: 5,
      nature: 3, safety: 3, jobs_tech: 4, jobs_creative: 4, jobs_finance: 4,
      jobs_healthcare: 4, jobs_trades: 3, weather_warm: 3, weather_mild: 2,
      weather_seasons: 4, outdoor: 3, family: 3, young_professional: 5,
      beach: 0, airport: 5,
    },
    rentRange: "$2,100–$3,000/mo",
    population: "689K city / 6.4M metro",
    highlights: [
      "World-class walkability and Metro system",
      "Rich Black American cultural history and community",
      "Enormous job market — federal, private sector, nonprofits",
      "Free Smithsonian museums, monuments, incredible public spaces",
    ],
    cons: ["Very expensive — one of the priciest metros in the US", "Political atmosphere is pervasive", "Gentrification has dramatically shifted neighborhoods"],
    neighborhoods: ["U Street Corridor", "Columbia Heights", "Shaw", "Silver Spring MD", "Alexandria VA"],
    climate: "Four seasons — hot humid summers, cold winters with occasional snow.",
    transit: "Excellent Metro system. Very walkable core. Bikeshare everywhere.",
    vibes: ["Power", "Purpose", "Culture", "Connected"],
  },
  {
    id: "raleigh",
    name: "Raleigh-Durham, NC",
    state: "North Carolina",
    emoji: "🔬",
    tagline: "The Research Triangle — brains and balance",
    color: "#56CFB2",
    colorBg: "rgba(86,207,178,0.1)",
    scores: {
      cost: 4, culture_black: 4, culture_latino: 3, culture_intl: 3, culture_lgbtq: 3,
      culture_arts: 3, food: 3, nightlife: 2, walkability: 2, transit: 2,
      nature: 4, safety: 4, jobs_tech: 5, jobs_creative: 3, jobs_finance: 3,
      jobs_healthcare: 5, jobs_trades: 3, weather_warm: 4, weather_mild: 4,
      weather_seasons: 3, outdoor: 4, family: 5, young_professional: 4,
      beach: 0, airport: 3,
    },
    rentRange: "$1,150–$1,650/mo",
    population: "470K city / 1.5M metro",
    highlights: [
      "Research Triangle — UNC, Duke, NC State, and massive biotech/pharma presence",
      "Strong HBCUs — NCCU, Shaw University",
      "Excellent quality of life with lower cost than comparable metros",
      "Great for families — top schools and safe neighborhoods",
    ],
    cons: ["Suburban feel — lacks big-city energy", "Limited nightlife compared to Atlanta or Charlotte", "Traffic worsening as it grows fast"],
    neighborhoods: ["Downtown Durham", "Brier Creek", "Cary", "Five Points", "Carrboro"],
    climate: "Four mild seasons. Occasional snow. Warm pleasant summers.",
    transit: "Mostly car-dependent. GoTriangle bus system improving.",
    vibes: ["Smart", "Balanced", "Family-First", "Steady"],
  },
  {
    id: "miami",
    name: "Miami, FL",
    state: "Florida",
    emoji: "🌴",
    tagline: "Sun, culture, ambition — year round",
    color: "#4ECDC4",
    colorBg: "rgba(78,205,196,0.1)",
    scores: {
      cost: 2, culture_black: 4, culture_latino: 5, culture_intl: 5, culture_lgbtq: 4,
      culture_arts: 4, food: 5, nightlife: 5, walkability: 3, transit: 2,
      nature: 4, safety: 3, jobs_tech: 4, jobs_creative: 4, jobs_finance: 4,
      jobs_healthcare: 3, jobs_trades: 3, weather_warm: 5, weather_mild: 4,
      weather_seasons: 1, outdoor: 5, family: 3, young_professional: 5,
      beach: 5, airport: 5,
    },
    rentRange: "$1,900–$2,800/mo",
    population: "442K city / 6.2M metro",
    highlights: [
      "No state income tax — significant financial advantage",
      "Extraordinary cultural diversity — Afro-Caribbean, Latin, international",
      "Year-round outdoor lifestyle and beach access",
      "Booming tech and finance scene post-COVID migration",
    ],
    cons: ["Very expensive — rents surged dramatically since 2020", "Climate change / flooding risk is real", "Traffic is brutal"],
    neighborhoods: ["Wynwood", "Little Haiti", "Brickell", "Overtown", "South Beach"],
    climate: "Tropical — warm year-round, hot humid summers, hurricane season June–November.",
    transit: "Metrorail and Metromover exist but most people drive.",
    vibes: ["Vibrant", "International", "Sunny", "Ambitious"],
  },
  {
    id: "nashville",
    name: "Nashville, TN",
    state: "Tennessee",
    emoji: "🎵",
    tagline: "Boomtown with a backbeat",
    color: "#E8B86D",
    colorBg: "rgba(232,184,109,0.1)",
    scores: {
      cost: 3, culture_black: 3, culture_latino: 2, culture_intl: 2, culture_lgbtq: 3,
      culture_arts: 4, food: 4, nightlife: 5, walkability: 2, transit: 1,
      nature: 4, safety: 3, jobs_tech: 4, jobs_creative: 4, jobs_finance: 3,
      jobs_healthcare: 5, jobs_trades: 4, weather_warm: 4, weather_mild: 3,
      weather_seasons: 3, outdoor: 4, family: 4, young_professional: 4,
      beach: 0, airport: 4,
    },
    rentRange: "$1,400–$2,000/mo",
    population: "689K city / 2.1M metro",
    highlights: [
      "No state income tax",
      "Thriving music, food, and creative scene",
      "Major healthcare industry hub — HCA, Vanderbilt Medical",
      "Outdoor access — hiking, lakes, state parks nearby",
    ],
    cons: ["Rapidly gentrifying — much more expensive than 5 years ago", "Car-dependent — no real transit system", "Tourism can make downtown feel like a party district"],
    neighborhoods: ["East Nashville", "Germantown", "North Nashville", "Antioch", "Berry Hill"],
    climate: "Four seasons — hot summers, mild winters with occasional snow.",
    transit: "Very car-dependent. WeGo bus system is limited.",
    vibes: ["Creative", "Growing", "Lively", "Southern"],
  },
  {
    id: "dallas",
    name: "Dallas, TX",
    state: "Texas",
    emoji: "⭐",
    tagline: "Corporate ambition meets Southern scale",
    color: "#6B9FD9",
    colorBg: "rgba(107,159,217,0.1)",
    scores: {
      cost: 3, culture_black: 4, culture_latino: 4, culture_intl: 4, culture_lgbtq: 3,
      culture_arts: 3, food: 4, nightlife: 4, walkability: 2, transit: 2,
      nature: 2, safety: 3, jobs_tech: 4, jobs_creative: 3, jobs_finance: 5,
      jobs_healthcare: 4, jobs_trades: 4, weather_warm: 4, weather_mild: 2,
      weather_seasons: 2, outdoor: 2, family: 4, young_professional: 4,
      beach: 0, airport: 5,
    },
    rentRange: "$1,300–$1,800/mo",
    population: "1.3M city / 7.8M metro",
    highlights: [
      "No state income tax — major financial advantage",
      "Major corporate HQ relocation destination — strong job market",
      "Strong Black professional and business community in southern suburbs",
      "World-class arts district",
    ],
    cons: ["Sprawling — one of the least walkable major metros", "Summer heat can be extreme", "Unpredictable weather swings including ice storms"],
    neighborhoods: ["Oak Cliff", "Bishop Arts", "Uptown", "Deep Ellum", "Frisco"],
    climate: "Hot summers, mild winters. Tornado risk. Occasional ice storms.",
    transit: "DART rail covers major corridors. Car still dominant.",
    vibes: ["Corporate", "Big", "Diverse", "No Income Tax"],
  },
  {
    id: "phoenix",
    name: "Phoenix, AZ",
    state: "Arizona",
    emoji: "🌵",
    tagline: "Desert modern — sun, space, and affordability",
    color: "#E8934A",
    colorBg: "rgba(232,147,74,0.1)",
    scores: {
      cost: 3, culture_black: 2, culture_latino: 4, culture_intl: 3, culture_lgbtq: 3,
      culture_arts: 3, food: 3, nightlife: 3, walkability: 2, transit: 2,
      nature: 5, safety: 3, jobs_tech: 4, jobs_creative: 2, jobs_finance: 3,
      jobs_healthcare: 4, jobs_trades: 5, weather_warm: 4, weather_mild: 3,
      weather_seasons: 1, outdoor: 5, family: 4, young_professional: 3,
      beach: 0, airport: 4,
    },
    rentRange: "$1,200–$1,700/mo",
    population: "1.6M city / 5M metro",
    highlights: [
      "Incredible desert landscape and outdoor lifestyle",
      "Very affordable for a major metro of its size",
      "Massive trades and construction boom — huge demand for skilled labor",
      "Strong Latino cultural presence and community",
    ],
    cons: ["Extreme summer heat — 110°F+ days are common", "Very car-dependent — almost no walkability", "Smaller Black community relative to other metros"],
    neighborhoods: ["Arcadia", "Tempe", "Scottsdale", "South Mountain", "Laveen"],
    climate: "Desert — mild Oct–Apr, extremely hot May–Sep. Very dry year-round.",
    transit: "Valley Metro light rail covers some areas. Car is essential.",
    vibes: ["Outdoorsy", "Affordable", "Sunny", "Sprawling"],
  },
  {
    id: "chicago",
    name: "Chicago, IL",
    state: "Illinois",
    emoji: "🏙️",
    tagline: "America's most underrated major city",
    color: "#4A7FD9",
    colorBg: "rgba(74,127,217,0.1)",
    scores: {
      cost: 3, culture_black: 5, culture_latino: 5, culture_intl: 5, culture_lgbtq: 5,
      culture_arts: 5, food: 5, nightlife: 5, walkability: 4, transit: 5,
      nature: 3, safety: 2, jobs_tech: 4, jobs_creative: 4, jobs_finance: 5,
      jobs_healthcare: 5, jobs_trades: 4, weather_warm: 2, weather_mild: 1,
      weather_seasons: 4, outdoor: 4, family: 3, young_professional: 5,
      beach: 2, airport: 5,
    },
    rentRange: "$1,400–$2,200/mo",
    population: "2.7M city / 9.5M metro",
    highlights: [
      "World-class food, music, art, and architecture",
      "Excellent public transit — CTA covers the city",
      "Rich Black cultural history — Chicago blues, house music, South Side legacy",
      "Major finance, healthcare, and tech hub",
    ],
    cons: ["Harsh winters — cold, windy, and snowy", "Property taxes are very high", "Crime varies significantly by neighborhood"],
    neighborhoods: ["Bronzeville", "Logan Square", "Wicker Park", "Hyde Park", "Pilsen"],
    climate: "Four dramatic seasons. Hot summers, brutally cold winters. Famous wind.",
    transit: "Excellent CTA L train and bus system. Very walkable core.",
    vibes: ["World-Class", "Cultural", "Gritty", "Real"],
  },
  {
    id: "denver",
    name: "Denver, CO",
    state: "Colorado",
    emoji: "🏔️",
    tagline: "Outdoor paradise with a growing urban core",
    color: "#56CFB2",
    colorBg: "rgba(86,207,178,0.1)",
    scores: {
      cost: 2, culture_black: 2, culture_latino: 4, culture_intl: 3, culture_lgbtq: 4,
      culture_arts: 3, food: 4, nightlife: 3, walkability: 3, transit: 3,
      nature: 5, safety: 3, jobs_tech: 5, jobs_creative: 3, jobs_finance: 3,
      jobs_healthcare: 4, jobs_trades: 4, weather_warm: 3, weather_mild: 3,
      weather_seasons: 4, outdoor: 5, family: 4, young_professional: 4,
      beach: 0, airport: 4,
    },
    rentRange: "$1,600–$2,300/mo",
    population: "715K city / 2.9M metro",
    highlights: [
      "Unmatched outdoor access — skiing, hiking, biking year-round",
      "300+ days of sunshine per year",
      "Booming tech sector — remote worker magnet",
      "Strong cannabis, aerospace, and healthcare industries",
    ],
    cons: ["Expensive — prices surged significantly post-2020", "Smaller Black community", "Altitude takes adjustment (5,280ft)"],
    neighborhoods: ["Five Points", "RiNo", "Capitol Hill", "Park Hill", "Highlands"],
    climate: "300 days of sun. Cold snowy winters. Mild spring and fall. Low humidity.",
    transit: "RTD light rail and bus. Bikeable downtown. Car helpful for suburbs.",
    vibes: ["Active", "Outdoorsy", "Tech-Forward", "Sunny"],
  },
  {
    id: "seattle",
    name: "Seattle, WA",
    state: "Washington",
    emoji: "🌲",
    tagline: "Tech capital with mountains and water at its doorstep",
    color: "#4ECDC4",
    colorBg: "rgba(78,205,196,0.1)",
    scores: {
      cost: 1, culture_black: 3, culture_latino: 3, culture_intl: 4, culture_lgbtq: 5,
      culture_arts: 4, food: 5, nightlife: 3, walkability: 4, transit: 4,
      nature: 5, safety: 3, jobs_tech: 5, jobs_creative: 4, jobs_finance: 3,
      jobs_healthcare: 4, jobs_trades: 3, weather_warm: 1, weather_mild: 3,
      weather_seasons: 2, outdoor: 5, family: 3, young_professional: 4,
      beach: 3, airport: 4,
    },
    rentRange: "$1,900–$2,800/mo",
    population: "737K city / 4M metro",
    highlights: [
      "Amazon, Microsoft, Boeing — top tech salaries in the US",
      "No state income tax",
      "Stunning natural setting — mountains, water, evergreen forests",
      "Excellent food scene and progressive culture",
    ],
    cons: ["Very expensive — especially rent and housing", "Grey and rainy October–April", "Smaller Black community relative to city size"],
    neighborhoods: ["Capitol Hill", "Columbia City", "Beacon Hill", "Fremont", "Rainier Valley"],
    climate: "Mild and grey — famous drizzle. Gorgeous dry summers. Rarely extreme cold.",
    transit: "Link Light Rail and strong bus network. Very bikeable.",
    vibes: ["Tech", "Nature", "Progressive", "Rainy"],
  },
];

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "life_stage", num: 1, category: "About You",
    question: "What stage of life are you in right now?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "High school — figuring out where to go", icon: "📚", tags: ["young"] },
      { label: "College — planning where to land after", icon: "🎒", tags: ["college"] },
      { label: "Recent grad (0–2 years out)", icon: "🚀", tags: ["recent_grad", "young_professional"] },
      { label: "Young professional (2–7 years in)", icon: "💼", tags: ["young_professional"] },
      { label: "Established professional / career transition", icon: "🔀", tags: ["established"] },
      { label: "Relocating with a partner or family", icon: "👨‍👩‍👧", tags: ["family"] },
    ],
  },
  {
    id: "budget", num: 2, category: "About You",
    question: "What's your monthly budget for rent?",
    instruction: "Choose one — be realistic",
    type: "single",
    options: [
      { label: "Under $900/mo — affordability is the priority", icon: "💚", tags: ["cost_5"] },
      { label: "$900–$1,400/mo — value conscious", icon: "💛", tags: ["cost_4"] },
      { label: "$1,400–$2,000/mo — willing to pay for quality of life", icon: "🟠", tags: ["cost_3"] },
      { label: "$2,000+/mo — cost is secondary to experience", icon: "🔴", tags: ["cost_any"] },
    ],
  },
  {
    id: "climate", num: 3, category: "Lifestyle",
    question: "What kind of climate do you actually want to live in?",
    instruction: "Select all that apply",
    type: "multi", max: 3,
    options: [
      { label: "Warm and sunny year-round", icon: "☀️", tags: ["weather_warm"] },
      { label: "Four seasons — I like variety", icon: "🍂", tags: ["weather_seasons"] },
      { label: "Mild and temperate — nothing extreme", icon: "🌤️", tags: ["weather_mild"] },
      { label: "Hot summers are fine, mild winters preferred", icon: "🌡️", tags: ["weather_warm", "weather_mild"] },
      { label: "I don't care about weather if everything else fits", icon: "🤷", tags: ["weather_any"] },
    ],
  },
  {
    id: "culture", num: 4, category: "Lifestyle",
    question: "What kind of cultural vibrancy matters to you in a city?",
    instruction: "Select everything that genuinely matters",
    type: "multi", max: 6,
    options: [
      { label: "A strong arts, music, and creative scene", icon: "🎨", tags: ["culture_arts"] },
      { label: "Diverse food culture — I want to eat well everywhere", icon: "🍜", tags: ["food"] },
      { label: "A visible and active Black community and culture", icon: "✊", tags: ["culture_black"] },
      { label: "A strong Latino or Hispanic cultural presence", icon: "🌮", tags: ["culture_latino"] },
      { label: "Rich international and immigrant community", icon: "🌍", tags: ["culture_intl"] },
      { label: "LGBTQ+ inclusive and welcoming community", icon: "🏳️‍🌈", tags: ["culture_lgbtq"] },
      { label: "Strong faith communities", icon: "🕊️", tags: ["culture_black", "culture_intl"] },
      { label: "I care more about other factors", icon: "➡️", tags: [] },
    ],
  },
  {
    id: "career", num: 5, category: "Career",
    question: "What's your career situation?",
    instruction: "Select all that apply",
    type: "multi", max: 4,
    options: [
      { label: "Remote — I can work from anywhere", icon: "🌐", tags: ["remote"] },
      { label: "I need a strong tech or finance job market", icon: "💻", tags: ["jobs_tech", "jobs_finance"] },
      { label: "I'm in or entering healthcare", icon: "🏥", tags: ["jobs_healthcare"] },
      { label: "I'm in or entering a creative field", icon: "🎬", tags: ["jobs_creative"] },
      { label: "I'm in the trades or skilled labor", icon: "🔧", tags: ["jobs_trades"] },
      { label: "Still figuring out my career path", icon: "🧭", tags: [] },
      { label: "I need access to a major international airport", icon: "✈️", tags: ["airport"] },
    ],
  },
  {
    id: "transit", num: 6, category: "Day to Day",
    question: "How do you want to get around day to day?",
    instruction: "Select all that apply",
    type: "multi", max: 4,
    options: [
      { label: "Walk everywhere — I want to be car-free", icon: "🚶", tags: ["walkability", "transit"] },
      { label: "Strong public transit system", icon: "🚇", tags: ["transit"] },
      { label: "I'll drive — walkability isn't a priority", icon: "🚗", tags: [] },
      { label: "Biking-friendly infrastructure", icon: "🚲", tags: ["walkability"] },
      { label: "A mix — walkable area but I'll have a car too", icon: "⚖️", tags: ["walkability"] },
    ],
  },
  {
    id: "social", num: 7, category: "Day to Day",
    question: "What does your ideal social life look like?",
    instruction: "Select up to 3",
    type: "multi", max: 3,
    options: [
      { label: "Thriving nightlife — bars, clubs, late nights", icon: "🌃", tags: ["nightlife"] },
      { label: "World-class restaurant and food scene", icon: "🍽️", tags: ["food"] },
      { label: "Live music and entertainment", icon: "🎵", tags: ["culture_arts", "nightlife"] },
      { label: "Outdoor social scenes — patios, parks, festivals", icon: "🌳", tags: ["outdoor"] },
      { label: "Tight-knit neighborhood community feel", icon: "🏘️", tags: ["family"] },
      { label: "Strong young professional social scene", icon: "🤝", tags: ["young_professional"] },
      { label: "Family-friendly activities and spaces", icon: "👨‍👩‍👧", tags: ["family"] },
    ],
  },
  {
    id: "nature", num: 8, category: "Day to Day",
    question: "How much does access to nature and outdoors matter?",
    instruction: "Select all that apply",
    type: "multi", max: 4,
    options: [
      { label: "Beach or waterfront access", icon: "🏖️", tags: ["beach", "outdoor"] },
      { label: "Hiking, trails, and serious outdoor recreation", icon: "🥾", tags: ["outdoor", "nature"] },
      { label: "Day trips to mountains or natural landmarks", icon: "🏔️", tags: ["outdoor", "nature"] },
      { label: "Parks and green space within the city", icon: "🌿", tags: ["outdoor"] },
      { label: "Not a major factor for me", icon: "🏙️", tags: [] },
    ],
  },
  {
    id: "safety", num: 9, category: "What Matters",
    question: "How important is safety in choosing your city?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "Top priority — I won't compromise on this", icon: "🛡️", tags: ["safety_top"] },
      { label: "Important but I can navigate risk in a big city", icon: "🌆", tags: ["safety_mid"] },
      { label: "I'm aware of it but it won't be a dealbreaker", icon: "⚖️", tags: [] },
      { label: "I'm street smart and adaptable — not a major concern", icon: "💪", tags: [] },
    ],
  },
  {
    id: "timeline", num: 10, category: "What Matters",
    question: "What's your long-term intention with this move?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "Testing it out — 1 to 2 years to see if it fits", icon: "🧪", tags: ["young_professional", "young"] },
      { label: "Building roots — I want to stay 5+ years", icon: "🌱", tags: ["family", "established"] },
      { label: "Following a career opportunity — might move again", icon: "📈", tags: ["young_professional"] },
      { label: "Looking for a forever city", icon: "🏡", tags: ["family"] },
    ],
  },
  {
    id: "dealbreakers", num: 11, category: "What Matters",
    question: "What would make a city an automatic no for you?",
    instruction: "Select everything that applies",
    type: "multi", max: 8,
    options: [
      { label: "Too expensive — I can't build real purchasing power", icon: "💸", tags: ["avoid_expensive"] },
      { label: "Too cold or grey — weather is a dealbreaker", icon: "🥶", tags: ["avoid_cold"] },
      { label: "Too car-dependent — I need to walk or use transit", icon: "🚗", tags: ["avoid_cardep"] },
      { label: "Limited cultural scene — I'd feel bored or out of place", icon: "😑", tags: ["avoid_boring"] },
      { label: "Weak job market for my field", icon: "📉", tags: ["avoid_nojobs"] },
      { label: "Safety concerns I'm not comfortable with", icon: "⚠️", tags: ["avoid_unsafe"] },
      { label: "Too small — I need a real major city", icon: "🏘️", tags: ["avoid_small"] },
      { label: "Too suburban and spread out", icon: "🛣️", tags: ["avoid_suburban"] },
    ],
  },
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
function computeResults(allAnswers) {
  const tagCounts = {};
  const avoidTags = [];
  const budgetLevel = { cost_5: 5, cost_4: 4, cost_3: 3, cost_any: 1 };
  let userBudget = 3;

  allAnswers.forEach((selectedIndices, qIdx) => {
    const q = QUESTIONS[qIdx];
    selectedIndices.forEach(optIdx => {
      const tags = q.options[optIdx].tags || [];
      tags.forEach(tag => {
        if (tag.startsWith("avoid_")) {
          avoidTags.push(tag);
        } else if (budgetLevel[tag] !== undefined) {
          userBudget = budgetLevel[tag];
        } else {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    });
  });

  return CITIES.map(city => {
    let score = 0;

    // Culture scoring
    if (tagCounts["culture_black"]) score += city.scores.culture_black * tagCounts["culture_black"] * 3;
    if (tagCounts["culture_latino"]) score += city.scores.culture_latino * tagCounts["culture_latino"] * 2;
    if (tagCounts["culture_intl"]) score += city.scores.culture_intl * tagCounts["culture_intl"] * 2;
    if (tagCounts["culture_lgbtq"]) score += city.scores.culture_lgbtq * tagCounts["culture_lgbtq"] * 2;
    if (tagCounts["culture_arts"]) score += city.scores.culture_arts * tagCounts["culture_arts"] * 2;
    if (tagCounts["food"]) score += city.scores.food * tagCounts["food"] * 2;
    if (tagCounts["nightlife"]) score += city.scores.nightlife * tagCounts["nightlife"] * 2;

    // Lifestyle
    if (tagCounts["weather_warm"]) score += city.scores.weather_warm * tagCounts["weather_warm"] * 2;
    if (tagCounts["weather_seasons"]) score += city.scores.weather_seasons * tagCounts["weather_seasons"] * 2;
    if (tagCounts["weather_mild"]) score += city.scores.weather_mild * tagCounts["weather_mild"] * 2;
    if (tagCounts["outdoor"]) score += city.scores.outdoor * tagCounts["outdoor"] * 2;
    if (tagCounts["beach"]) score += city.scores.beach * tagCounts["beach"] * 3;
    if (tagCounts["nature"]) score += city.scores.outdoor * tagCounts["nature"];

    // Career
    if (tagCounts["jobs_tech"]) score += city.scores.jobs_tech * tagCounts["jobs_tech"] * 3;
    if (tagCounts["jobs_finance"]) score += city.scores.jobs_finance * tagCounts["jobs_finance"] * 3;
    if (tagCounts["jobs_healthcare"]) score += city.scores.jobs_healthcare * tagCounts["jobs_healthcare"] * 3;
    if (tagCounts["jobs_creative"]) score += city.scores.jobs_creative * tagCounts["jobs_creative"] * 3;
    if (tagCounts["jobs_trades"]) score += city.scores.jobs_trades * tagCounts["jobs_trades"] * 3;
    if (tagCounts["airport"]) score += city.scores.airport * tagCounts["airport"] * 2;

    // Transit
    if (tagCounts["walkability"]) score += city.scores.walkability * tagCounts["walkability"] * 3;
    if (tagCounts["transit"]) score += city.scores.transit * tagCounts["transit"] * 3;

    // Social
    if (tagCounts["young_professional"]) score += city.scores.young_professional * tagCounts["young_professional"] * 2;
    if (tagCounts["family"]) score += city.scores.family * tagCounts["family"] * 2;

    // Safety
    if (tagCounts["safety_top"]) score += city.scores.safety * 6;
    if (tagCounts["safety_mid"]) score += city.scores.safety * 3;

    // Budget scoring
    score += city.scores.cost * userBudget;

    // AVOID penalties
    if (avoidTags.includes("avoid_expensive") && city.scores.cost <= 2) score -= 20;
    if (avoidTags.includes("avoid_cold") && city.scores.weather_warm <= 2) score -= 20;
    if (avoidTags.includes("avoid_cardep") && city.scores.walkability <= 2) score -= 15;
    if (avoidTags.includes("avoid_boring") && (city.scores.culture_arts + city.scores.nightlife) <= 5) score -= 15;
    if (avoidTags.includes("avoid_unsafe") && city.scores.safety <= 2) score -= 25;
    if (avoidTags.includes("avoid_suburban") && city.scores.walkability <= 2) score -= 10;

    // Normalize to percentage
    const maxPossible = 280;
    const pct = Math.min(Math.max(Math.round((score / maxPossible) * 100), 18), 97);

    return { ...city, matchScore: pct };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ScoreDots({ value, color }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i <= value ? color : T.border,
          transition: "background 0.2s",
        }} />
      ))}
    </div>
  );
}

function CityCard({ city, rank, expanded, onToggle }) {
  const medals = ["🥇", "🥈", "🥉", "④"];
  return (
    <div style={{
      background: T.card,
      border: `1px solid ${expanded ? city.color + "60" : T.border}`,
      borderRadius: 16, overflow: "hidden",
      marginBottom: 10, transition: "all 0.25s",
      boxShadow: expanded ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${city.color}30` : "none",
    }}>
      {/* Header */}
      <button onClick={onToggle} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "18px 22px", textAlign: "left",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, flexShrink: 0,
          background: city.colorBg, border: `1px solid ${city.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
        }}>{city.emoji}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            {rank < 3 && <span style={{ fontSize: 16 }}>{medals[rank]}</span>}
            <span style={{
              fontSize: 17, fontWeight: 600, color: T.text,
              fontFamily: T.sans, letterSpacing: "-0.01em",
            }}>{city.name}</span>
          </div>
          <div style={{ fontSize: 11, color: T.textMid, fontFamily: T.mono }}>
            {city.tagline}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            {city.vibes.map(v => (
              <span key={v} style={{
                fontSize: 9, fontFamily: T.mono, color: city.color,
                border: `1px solid ${city.color}30`,
                padding: "2px 7px", borderRadius: 8, letterSpacing: "0.08em",
              }}>{v}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{
            fontSize: 30, fontWeight: 700, color: city.color,
            fontFamily: T.mono, lineHeight: 1,
          }}>{city.matchScore}%</div>
          <div style={{ fontSize: 9, color: T.textDim, fontFamily: T.mono }}>match</div>
        </div>

        <span style={{ color: T.textDim, marginLeft: 6, fontSize: 12 }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "20px 22px 24px" }}>
          {/* Key stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8, marginBottom: 20,
          }}>
            {[
              { label: "Rent Range", value: city.rentRange },
              { label: "Population", value: city.population },
              { label: "State", value: city.state },
            ].map(s => (
              <div key={s.label} style={{
                background: T.surface, borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontSize: 9, fontFamily: T.mono, color: T.textDim, letterSpacing: "0.12em", marginBottom: 4 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 12, color: T.text, fontFamily: T.sans, lineHeight: 1.3 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Score breakdown */}
          <div style={{ background: T.surface, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.textDim, marginBottom: 14 }}>AT A GLANCE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
              {[
                ["Cost of Living", "cost"],
                ["Black Community", "culture_black"],
                ["Cultural Diversity", "culture_intl"],
                ["Walkability", "walkability"],
                ["Public Transit", "transit"],
                ["Nightlife & Food", "nightlife"],
                ["Outdoor Access", "outdoor"],
                ["Safety", "safety"],
                ["Job Market", "jobs_tech"],
                ["Young Prof. Scene", "young_professional"],
              ].map(([label, key]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: T.textMid, fontFamily: T.mono }}>{label}</span>
                  <ScoreDots value={city.scores[key] || 0} color={city.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Why it fits / Heads up */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.textDim, marginBottom: 10 }}>WHY IT FITS</div>
              {city.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: city.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5, fontFamily: T.sans }}>{h}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.textDim, marginBottom: 10 }}>HEADS UP</div>
              {city.cons.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#E84A4A", fontSize: 10, marginTop: 3, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5, fontFamily: T.sans }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Climate + Transit */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label: "☁️ CLIMATE", val: city.climate },
              { label: "🚇 TRANSIT", val: city.transit },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: T.surface, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.12em", color: T.textDim, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6, fontFamily: T.sans }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Neighborhoods */}
          <div>
            <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.textDim, marginBottom: 10 }}>NEIGHBORHOODS TO EXPLORE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {city.neighborhoods.map(n => (
                <span key={n} style={{
                  fontSize: 11, fontFamily: T.mono, color: city.color,
                  border: `1px solid ${city.color}30`,
                  padding: "4px 11px", borderRadius: 20,
                }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Track({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: i === current ? 4 : 1, height: 2, borderRadius: 1,
          background: i < current ? T.accent : i === current ? T.accent : T.border,
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );
}

function OptionBtn({ opt, selected, onToggle, isMulti, disabled }) {
  return (
    <button onClick={() => !disabled && onToggle()} style={{
      display: "flex", alignItems: "center", gap: 14,
      background: selected ? T.accentBg : disabled ? T.surface + "80" : T.card,
      border: `1px solid ${selected ? T.accent + "80" : T.border}`,
      borderRadius: 12, padding: "13px 16px",
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left", width: "100%",
      transition: "all 0.15s", opacity: disabled ? 0.35 : 1,
    }}>
      <span style={{ fontSize: 20, width: 26, textAlign: "center", flexShrink: 0 }}>{opt.icon}</span>
      <span style={{ fontSize: 14, color: selected ? T.accent : T.text, fontFamily: T.sans, flex: 1, lineHeight: 1.4 }}>{opt.label}</span>
      <div style={{
        width: 18, height: 18, borderRadius: isMulti ? 4 : "50%", flexShrink: 0,
        border: `2px solid ${selected ? T.accent : T.border}`,
        background: selected ? T.accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: T.bg, fontWeight: 700,
      }}>{selected ? "✓" : ""}</div>
    </button>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CityFinderV2() {
  const [phase, setPhase] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [allSelected, setAllSelected] = useState(
    Array.from({ length: QUESTIONS.length }, () => [])
  );
  const [results, setResults] = useState(null);
  const [expanded, setExpanded] = useState(0);
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [qIdx, phase]);

  const q = QUESTIONS[qIdx];
  const sel = allSelected[qIdx];
  const isMulti = q?.type === "multi";

  function toggle(i) {
    setAllSelected(prev => prev.map((s, qi) => {
      if (qi !== qIdx) return s;
      if (!isMulti) return s.includes(i) ? [] : [i];
      if (s.includes(i)) return s.filter(x => x !== i);
      if (s.length >= (q.max || 99)) return s;
      return [...s, i];
    }));
  }

  function next() {
    if (sel.length === 0) return;
    if (qIdx + 1 >= QUESTIONS.length) {
      setResults(computeResults(allSelected));
      setPhase("results");
    } else {
      setQIdx(qIdx + 1);
    }
  }

  function back() { if (qIdx > 0) setQIdx(qIdx - 1); }

  function restart() {
    setPhase("intro"); setQIdx(0);
    setAllSelected(Array.from({ length: QUESTIONS.length }, () => []));
    setResults(null); setExpanded(0);
  }

  return (
    <div ref={topRef} style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 0", animation: "fadeUp 0.6s ease" }}>
            {/* Decorative city grid */}
            <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {CITIES.slice(0, 8).map(c => (
                <div key={c.id} style={{
                  background: c.colorBg, border: `1px solid ${c.color}30`,
                  borderRadius: 10, padding: "6px 12px",
                  fontSize: 12, fontFamily: T.mono, color: c.color,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span>{c.emoji}</span>
                  <span>{c.name.split(",")[0]}</span>
                </div>
              ))}
              <div style={{ fontSize: 12, fontFamily: T.mono, color: T.textDim, padding: "6px 0", display: "flex", alignItems: "center" }}>+{CITIES.length - 8} more</div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: "0.3em", marginBottom: 16 }}>LIFEPATH · CITY FINDER</div>
              <h1 style={{
                fontSize: "clamp(48px, 10vw, 88px)",
                fontFamily: T.ff, fontWeight: 400,
                color: T.text, margin: "0 0 4px",
                lineHeight: 0.95, letterSpacing: "-0.02em",
              }}>
                Find your<br />
                <span style={{ color: T.accent }}>city.</span>
              </h1>
              <div style={{ marginTop: 24 }} />
              <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.8, maxWidth: 480, fontFamily: T.sans }}>
                11 questions. 12 US cities scored across cost, culture, walkability, weather, job market, safety, and more. Built for anyone figuring out where to plant roots — or just test the waters.
              </p>
            </div>

            {/* Factor pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
              {["Cost of Living", "Cultural Vibrancy", "Black Community", "Weather", "Walkability", "Nightlife", "Job Market", "Safety", "Nature Access", "Young Prof. Scene"].map(f => (
                <span key={f} style={{
                  fontSize: 11, fontFamily: T.mono, color: T.textMid,
                  border: `1px solid ${T.border}`,
                  padding: "5px 12px", borderRadius: 20,
                }}>{f}</span>
              ))}
            </div>

            <button onClick={() => setPhase("quiz")} style={{
              background: T.accent, color: T.bg, border: "none",
              padding: "15px 40px", borderRadius: 30,
              fontSize: 14, fontFamily: T.mono, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.08em",
              alignSelf: "flex-start",
              boxShadow: `0 8px 32px ${T.accent}44`,
            }}>FIND MY CITY →</button>
            <div style={{ marginTop: 14, fontSize: 11, color: T.textDim, fontFamily: T.mono }}>11 questions · 12 cities · Free</div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <div style={{ paddingTop: 40, paddingBottom: 100 }}>
            <Track current={qIdx} total={QUESTIONS.length} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: "0.2em" }}>{q.category.toUpperCase()}</span>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.textDim }}>{qIdx + 1} OF {QUESTIONS.length}</span>
            </div>

            <h2 style={{
              fontSize: "clamp(22px, 4.5vw, 32px)",
              fontFamily: T.ff, fontWeight: 400,
              color: T.text, margin: "0 0 6px",
              lineHeight: 1.2, letterSpacing: "-0.01em",
            }}>{q.question}</h2>

            <p style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono, margin: "0 0 20px", letterSpacing: "0.06em" }}>
              {q.instruction}
              {isMulti && q.max && (
                <span style={{ color: T.accent }}> · {sel.length}/{q.max}</span>
              )}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {q.options.map((opt, i) => (
                <OptionBtn
                  key={i} opt={opt} selected={sel.includes(i)}
                  onToggle={() => toggle(i)} isMulti={isMulti}
                  disabled={isMulti && !sel.includes(i) && sel.length >= (q.max || 99)}
                />
              ))}
            </div>

            {/* Fixed bottom nav */}
            <div style={{
              position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: "100%", maxWidth: 680,
              background: T.bg + "F0", backdropFilter: "blur(16px)",
              borderTop: `1px solid ${T.border}`,
              padding: "14px 20px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              zIndex: 50,
            }}>
              <button onClick={back} style={{
                background: "none", border: `1px solid ${T.border}`,
                color: qIdx > 0 ? T.textMid : "transparent",
                fontFamily: T.mono, fontSize: 12, cursor: qIdx > 0 ? "pointer" : "default",
                padding: "9px 18px", borderRadius: 20,
                borderColor: qIdx > 0 ? T.border : "transparent",
              }}>← Back</button>

              <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono }}>
                {sel.length > 0 ? `${sel.length} selected` : "select to continue"}
              </span>

              <button onClick={next} style={{
                background: sel.length > 0 ? T.accent : T.border,
                border: "none",
                color: sel.length > 0 ? T.bg : T.textDim,
                padding: "10px 24px", borderRadius: 20,
                fontSize: 13, fontFamily: T.mono, fontWeight: 700,
                cursor: sel.length > 0 ? "pointer" : "default",
                transition: "all 0.15s", letterSpacing: "0.06em",
                boxShadow: sel.length > 0 ? `0 4px 16px ${T.accent}44` : "none",
              }}>
                {qIdx + 1 === QUESTIONS.length ? "SEE MY CITIES →" : "NEXT →"}
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && results && (
          <div style={{ paddingTop: 48, paddingBottom: 60 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: "0.3em", marginBottom: 12 }}>YOUR RESULTS</div>
              <h2 style={{ fontSize: "clamp(36px, 7vw, 60px)", fontFamily: T.ff, fontWeight: 400, color: T.text, margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Your cities.
              </h2>
              <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7, fontFamily: T.sans }}>
                Ranked by how well each city matches what you told us. Tap any city to expand the full breakdown — scores, neighborhoods, climate, transit, and more.
              </p>
            </div>

            {/* Top 4 */}
            <div style={{ marginBottom: 16 }}>
              {results.slice(0, 4).map((city, i) => (
                <CityCard
                  key={city.id} city={city} rank={i}
                  expanded={expanded === i}
                  onToggle={() => setExpanded(expanded === i ? -1 : i)}
                />
              ))}
            </div>

            {/* Others */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.2em", color: T.textDim, marginBottom: 12 }}>ALSO WORTH CONSIDERING</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {results.slice(4, 9).map(city => (
                  <div key={city.id} style={{
                    background: T.card, border: `1px solid ${T.border}`,
                    borderRadius: 10, padding: "10px 14px",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontSize: 18 }}>{city.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, color: T.text, fontFamily: T.sans, fontWeight: 500 }}>{city.name}</div>
                      <div style={{ fontSize: 10, fontFamily: T.mono, color: T.textDim }}>{city.matchScore}% match</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={restart} style={{
              background: "none", border: `1px solid ${T.border}`,
              color: T.textMid, fontSize: 12, fontFamily: T.mono,
              cursor: "pointer", padding: "10px 24px", borderRadius: 20,
              letterSpacing: "0.08em",
            }}>↩ Retake</button>
          </div>
        )}
      </div>
    </div>
  );
}
