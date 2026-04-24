import { useState } from “react”;

const CITIES = [
{
name: “Lisbon, Portugal”,
country: “Portugal”,
region: “Europe”,
emoji: “🇵🇹”,
scores: { cost: 4, blackCulture: 2, walkability: 4, weather: 5, jobMarket: 3, nightlife: 4, nature: 4, safety: 5, expat: 5, language: 4, healthcare: 4, visa: 5, diversity: 3, pace: 3 },
blackPop: “Small but growing Afro-Portuguese & African diaspora community”,
medianRent: “$1,200–1,800/mo”,
highlights: [“Golden Visa / D7 visa friendly”, “English widely spoken”, “Year-round sunshine”, “Thriving expat community”, “Direct flights to Africa & US”],
vibe: “Slow Luxury”,
climate: “Mediterranean — warm sunny summers, mild rainy winters”,
neighborhoods: [“Mouraria”, “Alfama”, “Príncipe Real”, “Intendente”],
cons: [“Wages low if working locally”, “Rapidly gentrifying”, “Small Black community”, “Bureaucracy can be slow”],
color: “#C86A2A”,
accent: “#F0A060”,
visaEase: “Very Easy”,
language: “Portuguese (English widely spoken)”,
costNote: “~40% cheaper than Western Europe average”,
},
{
name: “Mexico City, Mexico”,
country: “Mexico”,
region: “Latin America”,
emoji: “🇲🇽”,
scores: { cost: 5, blackCulture: 3, walkability: 5, jobMarket: 4, nightlife: 5, nature: 3, safety: 3, expat: 5, language: 3, healthcare: 4, visa: 5, diversity: 4, pace: 4, weather: 4 },
blackPop: “Afro-Mexican community + growing Black American expat scene”,
medianRent: “$800–1,400/mo”,
highlights: [“No visa needed for most nationalities”, “World-class food & arts scene”, “Fully walkable neighborhoods”, “Remote work hub”, “Rich Afro-Latino culture”],
vibe: “Creative Capital”,
climate: “Eternal spring — 60–75°F year round, rainy season June–Oct”,
neighborhoods: [“Roma Norte”, “Condesa”, “Juárez”, “Coyoacán”],
cons: [“Air quality issues”, “Earthquake risk”, “Safety varies by neighborhood”, “Spanish essential for deep integration”],
color: “#2A8A4A”,
accent: “#50D480”,
visaEase: “Very Easy”,
language: “Spanish”,
costNote: “~60% cheaper than US major cities”,
},
{
name: “Accra, Ghana”,
country: “Ghana”,
region: “West Africa”,
emoji: “🇬🇭”,
scores: { cost: 5, blackCulture: 5, walkability: 2, weather: 3, jobMarket: 3, nightlife: 4, nature: 3, safety: 4, expat: 4, language: 5, healthcare: 2, visa: 5, diversity: 5, pace: 3 },
blackPop: “~100% Black population — Pan-African cultural capital”,
medianRent: “$500–1,200/mo”,
highlights: [“Right of Abode for African diaspora”, “Year of Return movement”, “English official language”, “Strong Black American expat community”, “Deep cultural roots”],
vibe: “Diaspora Homecoming”,
climate: “Tropical — hot year round, two rainy seasons, humid coastal”,
neighborhoods: [“East Legon”, “Cantonments”, “Labone”, “Osu”],
cons: [“Infrastructure gaps”, “Power outages (load shedding)”, “Limited elite healthcare”, “Traffic is severe”],
color: “#C8A820”,
accent: “#F0D050”,
visaEase: “Very Easy (Right of Abode for diaspora)”,
language: “English”,
costNote: “~70% cheaper than US if earning in USD”,
},
{
name: “Dubai, UAE”,
country: “United Arab Emirates”,
region: “Middle East”,
emoji: “🇦🇪”,
scores: { cost: 3, blackCulture: 3, walkability: 3, weather: 2, jobMarket: 5, nightlife: 4, nature: 2, safety: 5, expat: 5, language: 5, healthcare: 5, visa: 4, diversity: 5, pace: 5 },
blackPop: “Highly diverse expat city — significant African & Caribbean diaspora”,
medianRent: “$1,500–2,500/mo”,
highlights: [“Zero income tax”, “World-class infrastructure”, “Very safe”, “Global business hub”, “Large diverse expat community”],
vibe: “Ambition & Opulence”,
climate: “Desert — extremely hot summers (110°F+), perfect Oct–Apr”,
neighborhoods: [“Dubai Marina”, “JVC”, “Downtown”, “Jumeirah”],
cons: [“Extreme summer heat”, “Conservative laws”, “Very car-dependent”, “No path to permanent residency”],
color: “#8A6A20”,
accent: “#D4B040”,
visaEase: “Moderate (employment or investor visa needed)”,
language: “English widely spoken”,
costNote: “Tax-free income offsets higher rents”,
},
{
name: “Nairobi, Kenya”,
country: “Kenya”,
region: “East Africa”,
emoji: “🇰🇪”,
scores: { cost: 5, blackCulture: 5, walkability: 2, weather: 5, jobMarket: 4, nightlife: 4, nature: 5, safety: 3, expat: 4, language: 5, healthcare: 3, visa: 4, diversity: 5, pace: 3 },
blackPop: “~99% Black — East Africa’s tech and innovation capital”,
medianRent: “$400–1,000/mo”,
highlights: [“Silicon Savannah tech hub”, “English official language”, “Gateway to incredible nature”, “Strong NGO and startup ecosystem”, “Year-round perfect weather”],
vibe: “Safari Meets Startup”,
climate: “Perfect — 65–80°F year round, two short rainy seasons”,
neighborhoods: [“Westlands”, “Kilimani”, “Karen”, “Lavington”],
cons: [“Traffic among worst globally”, “Infrastructure inconsistent”, “Some security concerns”, “Political instability cycles”],
color: “#2A6A3A”,
accent: “#50C470”,
visaEase: “Easy (e-visa on arrival for most)”,
language: “English & Swahili”,
costNote: “~75% cheaper than US if earning in USD”,
},
{
name: “London, UK”,
country: “United Kingdom”,
region: “Europe”,
emoji: “🇬🇧”,
scores: { cost: 1, blackCulture: 4, walkability: 5, weather: 2, jobMarket: 5, nightlife: 5, nature: 3, safety: 4, expat: 5, language: 5, healthcare: 5, visa: 2, diversity: 5, pace: 5 },
blackPop: “~13% — vibrant Black British, African & Caribbean communities”,
medianRent: “$2,200–3,500/mo”,
highlights: [“World-class Black cultural scene”, “Excellent public transit”, “NHS free healthcare”, “Global finance & tech hub”, “Rich Caribbean and African diaspora”],
vibe: “World City”,
climate: “Temperate — mild but grey & rainy, rarely extreme”,
neighborhoods: [“Brixton”, “Peckham”, “Hackney”, “Tottenham”],
cons: [“Extremely expensive”, “Visa very hard post-Brexit”, “Gloomy weather”, “Housing crisis”],
color: “#2A3A8A”,
accent: “#6080D4”,
visaEase: “Difficult (work visa sponsorship required)”,
language: “English”,
costNote: “One of the most expensive cities in the world”,
},
{
name: “Medellín, Colombia”,
country: “Colombia”,
region: “Latin America”,
emoji: “🇨🇴”,
scores: { cost: 5, blackCulture: 3, walkability: 4, weather: 5, jobMarket: 3, nightlife: 5, nature: 5, safety: 3, expat: 5, language: 2, healthcare: 4, visa: 5, diversity: 4, pace: 4 },
blackPop: “Afro-Colombian communities + growing international expat scene”,
medianRent: “$600–1,100/mo”,
highlights: [“Eternal spring climate (72°F year round)”, “Booming digital nomad hub”, “Stunning mountain scenery”, “Incredible food & nightlife”, “Affordable world-class healthcare”],
vibe: “Eternal Spring”,
climate: “Perfect year-round — 68–76°F, lush green, occasional rain”,
neighborhoods: [“El Poblado”, “Laureles”, “Envigado”, “Sabaneta”],
cons: [“Spanish essential”, “Cartel history / lingering safety concerns”, “Limited Black expat community”, “Altitude takes adjustment (5,000ft)”],
color: “#6A2A8A”,
accent: “#B060D4”,
visaEase: “Very Easy (tourist visa extendable, digital nomad visa available)”,
language: “Spanish”,
costNote: “~65% cheaper than US major cities”,
},
{
name: “Toronto, Canada”,
country: “Canada”,
region: “North America”,
emoji: “🇨🇦”,
scores: { cost: 2, blackCulture: 5, walkability: 4, weather: 2, jobMarket: 5, nightlife: 4, nature: 4, safety: 5, expat: 5, language: 5, healthcare: 5, visa: 3, diversity: 5, pace: 4 },
blackPop: “~9% Black — one of the most diverse cities on earth”,
medianRent: “$1,800–2,800/mo”,
highlights: [“Thriving Caribbean & African communities”, “Universal healthcare”, “Very safe and multicultural”, “Strong job market”, “Path to permanent residency & citizenship”],
vibe: “Multicultural Excellence”,
climate: “4 seasons — beautiful summers, brutal cold winters”,
neighborhoods: [“Scarborough”, “North York”, “Regent Park”, “Little Jamaica”],
cons: [“Harsh winters”, “Very expensive housing”, “Visa process competitive”, “High taxes”],
color: “#8A2A2A”,
accent: “#D45050”,
visaEase: “Moderate (Express Entry or Provincial Nominee Program)”,
language: “English (& French)”,
costNote: “Expensive but cheaper than comparable US metros”,
},
{
name: “Bangkok, Thailand”,
country: “Thailand”,
region: “Southeast Asia”,
emoji: “🇹🇭”,
scores: { cost: 5, blackCulture: 2, walkability: 3, weather: 3, jobMarket: 3, nightlife: 5, nature: 4, safety: 4, expat: 5, language: 2, healthcare: 5, visa: 4, diversity: 3, pace: 4 },
blackPop: “Small but growing African and Black American expat community”,
medianRent: “$500–1,000/mo”,
highlights: [“World-class affordable healthcare”, “Incredibly affordable lifestyle”, “Thriving expat and digital nomad scene”, “Amazing food”, “Easy access to SE Asia travel”],
vibe: “Nomad Paradise”,
climate: “Tropical — hot year round, monsoon season May–Oct, cool Nov–Feb”,
neighborhoods: [“Sukhumvit”, “Silom”, “Sathorn”, “Ari”],
cons: [“Extreme heat and humidity”, “Language barrier significant”, “Small Black community”, “Visa runs required (no easy long-term path)”],
color: “#8A4A1A”,
accent: “#D48040”,
visaEase: “Easy (tourist visa, LTR visa for remote workers)”,
language: “Thai (English in expat areas)”,
costNote: “~75% cheaper than US — premium lifestyle on modest income”,
},
{
name: “Amsterdam, Netherlands”,
country: “Netherlands”,
region: “Europe”,
emoji: “🇳🇱”,
scores: { cost: 2, blackCulture: 3, walkability: 5, weather: 2, jobMarket: 4, nightlife: 5, nature: 4, safety: 4, expat: 5, language: 5, healthcare: 5, visa: 3, diversity: 4, pace: 3 },
blackPop: “~14% non-Western — Surinamese, Antillean, African communities”,
medianRent: “$1,800–2,800/mo”,
highlights: [“Most bikeable city in the world”, “English widely spoken”, “Progressive and open culture”, “Strong job market for internationals”, “Surinamese & Caribbean Black community”],
vibe: “Progressive & Free”,
climate: “Maritime — mild but grey, rainy, rarely extreme cold”,
neighborhoods: [“Bijlmer (AMsterdam-Zuidoost)”, “De Pijp”, “Noord”, “Bos en Lommer”],
cons: [“Very expensive and worsening”, “Grey weather”, “Housing crisis”, “Highly competitive visa / job market”],
color: “#2A5A8A”,
accent: “#50A0D4”,
visaEase: “Moderate (EU Blue Card or Dutch highly skilled migrant)”,
language: “Dutch (English widely spoken)”,
costNote: “Expensive — comparable to major US cities”,
},
{
name: “Cape Town, South Africa”,
country: “South Africa”,
region: “Southern Africa”,
emoji: “🇿🇦”,
scores: { cost: 5, blackCulture: 4, walkability: 3, weather: 5, jobMarket: 3, nightlife: 4, nature: 5, safety: 2, expat: 4, language: 5, healthcare: 3, visa: 4, diversity: 4, pace: 3 },
blackPop: “~38% Black African — stunning Pan-African cultural scene”,
medianRent: “$600–1,200/mo”,
highlights: [“Breathtaking natural beauty”, “English widely spoken”, “Year-round outdoor lifestyle”, “Vibrant arts and Black creative scene”, “Incredibly affordable on USD income”],
vibe: “Wild & Beautiful”,
climate: “Mediterranean — warm dry summers, mild wet winters, gorgeous”,
neighborhoods: [“Observatory”, “Woodstock”, “Langa”, “Khayelitsha”, “Sea Point”],
cons: [“High crime rates”, “Severe inequality”, “Load shedding (power cuts)”, “Political instability”],
color: “#2A7A5A”,
accent: “#50C4A0”,
visaEase: “Easy (Remote Worker Visa available)”,
language: “English (+ 10 other official languages)”,
costNote: “~70% cheaper than US on USD income”,
},
{
name: “São Paulo, Brazil”,
country: “Brazil”,
region: “Latin America”,
emoji: “🇧🇷”,
scores: { cost: 4, blackCulture: 5, walkability: 3, weather: 4, jobMarket: 4, nightlife: 5, nature: 3, safety: 2, expat: 4, language: 2, healthcare: 3, visa: 4, diversity: 5, pace: 5 },
blackPop: “~35% Black — largest Black population outside Africa”,
medianRent: “$700–1,300/mo”,
highlights: [“Largest Black diaspora city in the world”, “World-class food, art & nightlife”, “Enormous economic hub”, “Massive Afro-Brazilian culture scene”, “Warm and vibrant energy”],
vibe: “Black Megacity”,
climate: “Subtropical — warm year round, rainy summers, mild winters”,
neighborhoods: [“Vila Madalena”, “Pinheiros”, “Liberdade”, “Consolação”],
cons: [“Portuguese is essential”, “Traffic is extreme”, “High crime in parts”, “Pollution”],
color: “#8A2A4A”,
accent: “#D45080”,
visaEase: “Easy (digital nomad visa + Portuguese ancestry path)”,
language: “Portuguese”,
costNote: “~55% cheaper than US on USD income”,
},
{
name: “Bali, Indonesia”,
country: “Indonesia”,
region: “Southeast Asia”,
emoji: “🇮🇩”,
scores: { cost: 5, blackCulture: 2, walkability: 2, weather: 4, jobMarket: 2, nightlife: 4, nature: 5, safety: 4, expat: 5, language: 3, healthcare: 3, visa: 4, diversity: 3, pace: 2 },
blackPop: “Very small Black community — mostly Southeast Asian population”,
medianRent: “$400–900/mo”,
highlights: [“Incredibly affordable”, “Stunning natural beauty”, “World-class wellness & yoga culture”, “Strong digital nomad community”, “Spiritual and creative energy”],
vibe: “Slow Living & Nature”,
climate: “Tropical — warm year round, dry season May–Sep, rainy Nov–Mar”,
neighborhoods: [“Canggu”, “Seminyak”, “Ubud”, “Sanur”],
cons: [“Very small Black community”, “No easy long-term visa path”, “Limited if not remote working”, “Tourist-heavy”],
color: “#5A7A2A”,
accent: “#A0C450”,
visaEase: “Moderate (B211A social visa, new digital nomad visa)”,
language: “Bahasa Indonesian (English in expat areas)”,
costNote: “~80% cheaper than US — luxury lifestyle very affordable”,
},
{
name: “Abuja, Nigeria”,
country: “Nigeria”,
region: “West Africa”,
emoji: “🇳🇬”,
scores: { cost: 4, blackCulture: 5, walkability: 2, weather: 3, jobMarket: 4, nightlife: 5, nature: 3, safety: 3, expat: 3, language: 5, healthcare: 2, visa: 4, diversity: 5, pace: 4 },
blackPop: “~100% Black — Nigeria is Africa’s largest economy”,
medianRent: “$500–1,200/mo”,
highlights: [“Africa’s most powerful economy”, “English official language”, “Massive Afrobeats & creative scene”, “Strong professional networks”, “Nigerian diaspora return community”],
vibe: “African Power”,
climate: “Tropical — hot dry season, rainy season April–October”,
neighborhoods: [“Maitama”, “Wuse 2”, “Garki”, “Jabi”],
cons: [“Infrastructure challenges”, “Healthcare limited”, “Power outages common”, “Traffic intense”],
color: “#2A6A4A”,
accent: “#50B880”,
visaEase: “Easy for diaspora / Nigerian passport holders”,
language: “English”,
costNote: “Varies — affordable on USD but inflation is high”,
},
{
name: “Paris, France”,
country: “France”,
region: “Europe”,
emoji: “🇫🇷”,
scores: { cost: 2, blackCulture: 4, walkability: 5, weather: 3, jobMarket: 3, nightlife: 5, nature: 3, safety: 3, expat: 4, language: 2, healthcare: 5, visa: 3, diversity: 4, pace: 3 },
blackPop: “~10-15% — large Afro-French, Caribbean & West African communities”,
medianRent: “$1,500–2,500/mo”,
highlights: [“Rich Black French & Afro-Caribbean culture”, “World-class healthcare”, “Extraordinary food, art, architecture”, “Easy EU travel access”, “Longstanding Black American expat tradition”],
vibe: “Sophisticated & Cultural”,
climate: “Temperate — mild 4 seasons, warm summers, cool winters, occasional heat waves”,
neighborhoods: [“Belleville”, “Barbès”, “Saint-Denis”, “Château Rouge”],
cons: [“French language nearly essential”, “Bureaucracy notorious”, “Expensive”, “Social tensions around race can be complex”],
color: “#4A2A6A”,
accent: “#8050B4”,
visaEase: “Moderate (Talent Passport or EU Blue Card)”,
language: “French (English limited outside tourist areas)”,
costNote: “Expensive but cheaper than London or NYC”,
},
];

const QUESTIONS = [
{
id: 1, category: “Budget”, single: true,
question: “What’s your realistic monthly budget for rent?”,
instruction: “Be honest — this shapes everything”,
options: [
{ label: “Under $800/mo — I want to stretch my money far”, weights: { cost: 4 } },
{ label: “$800–$1,400/mo — comfortable but value-conscious”, weights: { cost: 3 } },
{ label: “$1,400–$2,000/mo — willing to pay for quality of life”, weights: { cost: 2 } },
{ label: “$2,000–$3,000/mo — cost is secondary to experience”, weights: { cost: 1 } },
{ label: “$3,000+/mo — I want the best, money isn’t the issue”, weights: { cost: 0 } },
],
},
{
id: 2, category: “Income Situation”, single: false,
question: “What’s your income situation?”,
instruction: “Select all that apply”,
options: [
{ label: “Remote work — I earn in USD/GBP and can work from anywhere”, weights: { cost: 2, visa: 1 } },
{ label: “I need to find a job locally in the new city”, weights: { jobMarket: 3 } },
{ label: “I run a business or have passive income”, weights: { cost: 1, visa: 1 } },
{ label: “I’m in supply chain / ops — I need a strong corporate job market”, weights: { jobMarket: 3 } },
{ label: “I’m open to consulting or contract work internationally”, weights: { jobMarket: 2, expat: 1 } },
],
},
{
id: 3, category: “Black Community”, single: false,
question: “How important is a strong Black community and diaspora presence?”,
instruction: “Select all that genuinely matter to you”,
options: [
{ label: “I want to live somewhere with a large Black population”, weights: { blackCulture: 3 } },
{ label: “African diaspora community — reconnecting with roots matters to me”, weights: { blackCulture: 3, diversity: 2 } },
{ label: “Black-owned businesses, arts, music, and cultural life”, weights: { blackCulture: 2, nightlife: 1 } },
{ label: “Pan-African identity — I want to live on the continent or close to it”, weights: { blackCulture: 3, diversity: 3 } },
{ label: “It’s a plus but I’m open to diverse international cities”, weights: { diversity: 2 } },
{ label: “Not a major factor for me in choosing a location”, weights: {} },
],
},
{
id: 4, category: “Weather”, single: false,
question: “What kind of climate do you want to live in?”,
instruction: “Select all that apply”,
options: [
{ label: “Warm and sunny year-round — I’m done with cold”, weights: { weather: 3 } },
{ label: “Mediterranean — warm dry summers, mild winters”, weights: { weather: 3 } },
{ label: “Tropical — heat and humidity is fine with me”, weights: { weather: 2 } },
{ label: “Eternal spring — 65–75°F always, no extremes”, weights: { weather: 3 } },
{ label: “Four distinct seasons — I like variety”, weights: { weather: 1 } },
{ label: “I can handle cold if everything else is great”, weights: {} },
],
},
{
id: 5, category: “Language”, single: true,
question: “How do you feel about learning a new language?”,
instruction: “Be realistic with yourself”,
options: [
{ label: “English only — I need to get by without learning another language”, weights: { language: 3 } },
{ label: “I’m open to basics but want English widely available”, weights: { language: 2 } },
{ label: “I’m willing to learn — I’d pick up Spanish or Portuguese”, weights: { language: 1 } },
{ label: “I’m excited to fully immerse in a new language”, weights: {} },
],
},
{
id: 6, category: “Visa & Residency”, single: false,
question: “What’s your visa situation and how long do you want to stay?”,
instruction: “Select all that apply”,
options: [
{ label: “I want somewhere I can move easily with minimal paperwork”, weights: { visa: 3 } },
{ label: “I’m looking for a path to permanent residency or citizenship”, weights: { visa: 2 } },
{ label: “Digital nomad visa — I want a legal way to stay 1+ years”, weights: { visa: 2, expat: 2 } },
{ label: “I have African heritage and want Right of Abode options”, weights: { blackCulture: 2, visa: 2 } },
{ label: “I’m just exploring — testing a city for 3–6 months”, weights: { visa: 1 } },
{ label: “I’m willing to go through a more complex visa process for the right city”, weights: {} },
],
},
{
id: 7, category: “Walkability & Transit”, single: false,
question: “How do you want to get around day to day?”,
instruction: “Select all that matter”,
options: [
{ label: “I want to walk everywhere — no car needed”, weights: { walkability: 3 } },
{ label: “Strong metro / public transit system”, weights: { walkability: 3 } },
{ label: “I love cities built for cyclists”, weights: { walkability: 2 } },
{ label: “I’ll drive — walkability isn’t a priority”, weights: {} },
{ label: “Somewhere between — walkable neighborhood but I’ll have a car”, weights: { walkability: 1 } },
],
},
{
id: 8, category: “Safety”, single: true,
question: “How much does personal safety factor into your decision?”,
instruction: “Be honest”,
options: [
{ label: “Top priority — I won’t compromise on safety”, weights: { safety: 4 } },
{ label: “Important but I’ll accept some risk for the right lifestyle”, weights: { safety: 2 } },
{ label: “I’m aware of risk and can navigate it — I’ve lived in big cities before”, weights: { safety: 1 } },
{ label: “Not a dealbreaker — I’m street-smart and adaptable”, weights: {} },
],
},
{
id: 9, category: “Healthcare”, single: false,
question: “How important is access to quality healthcare?”,
instruction: “Select all that apply”,
options: [
{ label: “World-class healthcare is non-negotiable”, weights: { healthcare: 3 } },
{ label: “Affordable private healthcare is fine”, weights: { healthcare: 2 } },
{ label: “I want a country with a public healthcare system”, weights: { healthcare: 2 } },
{ label: “I’ll carry international health insurance — flexibility matters more”, weights: { healthcare: 1 } },
{ label: “Not a major concern for me right now”, weights: {} },
],
},
{
id: 10, category: “Social Life”, single: false,
question: “What does your ideal social scene look like?”,
instruction: “Select all that resonate”,
options: [
{ label: “Thriving nightlife — rooftop bars, clubs, late nights”, weights: { nightlife: 3 } },
{ label: “World-class food and restaurant culture”, weights: { nightlife: 2 } },
{ label: “Live music, Afrobeats, reggae, and Black cultural events”, weights: { nightlife: 2, blackCulture: 1 } },
{ label: “Arts, galleries, fashion, and creative scenes”, weights: { nightlife: 2 } },
{ label: “Chill coffee shop, coworking, digital nomad culture”, weights: { expat: 2 } },
{ label: “I want a strong expat social community”, weights: { expat: 3 } },
],
},
{
id: 11, category: “Nature & Outdoors”, single: false,
question: “How much does access to nature matter to you?”,
instruction: “Select all that apply”,
options: [
{ label: “Beach access — ocean living is important to me”, weights: { nature: 3 } },
{ label: “Mountains, hiking, and dramatic landscapes”, weights: { nature: 3 } },
{ label: “Safari, wildlife, and raw natural experiences”, weights: { nature: 3 } },
{ label: “Parks and green space within the city”, weights: { nature: 2 } },
{ label: “I want a base for travel — a well-connected hub”, weights: { expat: 2 } },
{ label: “Nature is nice but not a deciding factor”, weights: {} },
],
},
{
id: 12, category: “City Pace”, single: true,
question: “What pace of life are you looking for?”,
instruction: “Choose the one that feels right”,
options: [
{ label: “Fast, ambitious, and electric — I thrive in hustle energy”, weights: { pace: 3, jobMarket: 1 } },
{ label: “Balanced — productive days, lively evenings, real downtime”, weights: { pace: 2 } },
{ label: “Slow and intentional — I want to decompress and live fully”, weights: { pace: 1 } },
{ label: “Deeply relaxed — I want a place that slows me down on purpose”, weights: { pace: 0 } },
],
},
{
id: 13, category: “Cultural Experience”, single: false,
question: “What kind of cultural experience are you looking for?”,
instruction: “Select all that appeal”,
options: [
{ label: “Reconnecting with African heritage and roots”, weights: { blackCulture: 3, diversity: 2 } },
{ label: “Immersing in Latin / Caribbean Black culture”, weights: { blackCulture: 2, diversity: 2 } },
{ label: “European history, architecture, and refinement”, weights: { nightlife: 1 } },
{ label: “Asian culture — food, spirituality, and contrast”, weights: { diversity: 2 } },
{ label: “A truly global city where everything coexists”, weights: { diversity: 3, expat: 2 } },
{ label: “I want to travel easily and experience many places from my base”, weights: { expat: 2 } },
],
},
{
id: 14, category: “Region”, single: false,
question: “Are there regions of the world you’re drawn to or ruling out?”,
instruction: “Select what feels right”,
options: [
{ label: “Africa — I’m interested in living on the continent”, weights: { blackCulture: 2, diversity: 2 } },
{ label: “Europe — I want the European lifestyle”, weights: { walkability: 1, healthcare: 1 } },
{ label: “Latin America — warmth, culture, and affordability”, weights: { cost: 2, nightlife: 1 } },
{ label: “Southeast Asia — adventure and extreme affordability”, weights: { cost: 3, nature: 1 } },
{ label: “Middle East — ambitious cities and tax-free income”, weights: { jobMarket: 2, safety: 1 } },
{ label: “I’m open to anywhere — show me what fits”, weights: {} },
],
},
{
id: 15, category: “Expat Community”, single: false,
question: “How important is an established expat / digital nomad community?”,
instruction: “Select all that apply”,
options: [
{ label: “Very important — I want to land and find my people quickly”, weights: { expat: 3 } },
{ label: “I want other Black Americans or diaspora specifically”, weights: { blackCulture: 2, expat: 2 } },
{ label: “Nice to have but I’m good at building from scratch”, weights: { expat: 1 } },
{ label: “I prefer to integrate with locals — not an expat bubble”, weights: {} },
],
},
{
id: 16, category: “Dealbreakers”, single: false,
question: “Which of these would make a city an automatic no?”,
instruction: “Be honest — these will filter your results”,
options: [
{ label: “High crime or safety concerns”, weights: { safety: 3 } },
{ label: “Cold or grey weather”, weights: { weather: 3 } },
{ label: “Very expensive — I want real purchasing power”, weights: { cost: 3 } },
{ label: “Very small or no Black community”, weights: { blackCulture: 3 } },
{ label: “Language barrier — English not widely spoken”, weights: { language: 3 } },
{ label: “Hard to get a visa or legal long-term stay”, weights: { visa: 3 } },
{ label: “Poor healthcare infrastructure”, weights: { healthcare: 3 } },
{ label: “Fully car-dependent with no transit”, weights: { walkability: 3 } },
],
},
{
id: 17, category: “Timeline”, single: true,
question: “What’s your actual timeline for this move?”,
instruction: “Be realistic”,
options: [
{ label: “I’m actively planning — moving within 6–12 months”, weights: { visa: 1 } },
{ label: “1–2 years — I’m doing serious research right now”, weights: {} },
{ label: “3–5 years — long-term planning and saving”, weights: {} },
{ label: “Just exploring — curious about options”, weights: {} },
],
},
{
id: 18, category: “Must Have”, single: false,
question: “What’s your single non-negotiable — the thing you absolutely must have?”,
instruction: “Pick 1–2 absolute must-haves”,
options: [
{ label: “Warm weather — sunshine is essential to my mental health”, weights: { weather: 4 } },
{ label: “Strong Black community — cultural belonging matters most”, weights: { blackCulture: 4 } },
{ label: “Affordability — I want maximum purchasing power”, weights: { cost: 4 } },
{ label: “Safety — I won’t compromise on this”, weights: { safety: 4 } },
{ label: “Career opportunity — job market is the priority”, weights: { jobMarket: 4 } },
{ label: “Freedom — easy visa, easy lifestyle, minimal friction”, weights: { visa: 3, expat: 2 } },
{ label: “Nature — I want to live somewhere breathtakingly beautiful”, weights: { nature: 4 } },
{ label: “Culture — world-class food, arts, nightlife, energy”, weights: { nightlife: 4 } },
],
},
];

function scoreCity(city, priorities) {
let total = 0, maxPossible = 0;
Object.entries(priorities).forEach(([key, weight]) => {
if (weight > 0) {
total += (city.scores[key] || 0) * weight;
maxPossible += 5 * weight;
}
});
return maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;
}

function computeResults(allAnswers) {
const priorities = {};
allAnswers.forEach((selectedIndices, qIdx) => {
const q = QUESTIONS[qIdx];
selectedIndices.forEach((optIdx) => {
const weights = q.options[optIdx].weights;
Object.entries(weights).forEach(([key, val]) => {
priorities[key] = (priorities[key] || 0) + val;
});
});
});
const scored = CITIES.map((city) => ({ …city, matchScore: scoreCity(city, priorities) }))
.sort((a, b) => b.matchScore - a.matchScore);
return { top: scored.slice(0, 4), others: scored.slice(4, 8) };
}

function ScoreDots({ value, color }) {
return (
<span style={{ fontFamily: “monospace”, fontSize: 12, color, letterSpacing: 2 }}>
{“●”.repeat(value)}
<span style={{ opacity: 0.2 }}>{“●”.repeat(5 - value)}</span>
</span>
);
}

function CityCard({ city, rank, expanded, onToggle }) {
const medals = [“🥇”, “🥈”, “🥉”, “✦”];
return (
<div style={{
background: “#0A1018”,
border: `1px solid ${expanded ? city.color + "88" : "#182030"}`,
borderRadius: 12,
overflow: “hidden”,
transition: “border-color 0.25s”,
marginBottom: 10,
}}>
<button onClick={onToggle} style={{
width: “100%”, background: “none”, border: “none”, cursor: “pointer”,
padding: “18px 22px”, textAlign: “left”, display: “flex”, alignItems: “center”, gap: 14,
}}>
<div style={{
width: 48, height: 48, borderRadius: 10,
background: city.color + “18”, border: `1px solid ${city.color}30`,
display: “flex”, alignItems: “center”, justifyContent: “center”,
fontSize: 24, flexShrink: 0,
}}>{city.emoji}</div>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 2 }}>
<span style={{ fontSize: 16 }}>{medals[rank]}</span>
<span style={{ fontSize: 17, fontWeight: 600, color: “#ECF2F8”, letterSpacing: “-0.01em”, whiteSpace: “nowrap”, overflow: “hidden”, textOverflow: “ellipsis” }}>{city.name}</span>
</div>
<div style={{ fontSize: 12, color: “#3A5060”, fontFamily: “monospace” }}>{city.region} · {city.vibe} · {city.medianRent}</div>
</div>
<div style={{ textAlign: “right”, flexShrink: 0, marginLeft: 8 }}>
<div style={{ fontSize: 26, fontWeight: 700, color: city.accent, fontFamily: “monospace”, lineHeight: 1 }}>{city.matchScore}%</div>
<div style={{ fontSize: 10, color: “#2A3A4A”, fontFamily: “monospace” }}>match</div>
</div>
<span style={{ color: “#2A3A4A”, fontSize: 12, marginLeft: 6 }}>{expanded ? “▲” : “▼”}</span>
</button>

```
{expanded && (
<div style={{ padding: "4px 22px 22px", borderTop: `1px solid ${city.color}20` }}>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 16, paddingTop: 16 }}>
{[
["Cost of Living", "cost"], ["Black Community", "blackCulture"],
["Walkability", "walkability"], ["Weather", "weather"],
["Job Market", "jobMarket"], ["Nightlife & Culture", "nightlife"],
["Nature", "nature"], ["Safety", "safety"],
["Healthcare", "healthcare"], ["Expat Scene", "expat"],
["Visa Ease", "visa"], ["Diversity", "diversity"],
].map(([label, key]) => (
<div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0" }}>
<span style={{ fontSize: 11, color: "#3A5060", fontFamily: "monospace" }}>{label}</span>
<ScoreDots value={city.scores[key] || 0} color={city.accent} />
</div>
))}
</div>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
<div>
<div style={DL}>Why it fits</div>
{city.highlights.map((h, i) => (
<div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
<span style={{ color: city.accent, fontSize: 11, marginTop: 3, flexShrink: 0 }}>✦</span>
<span style={{ fontSize: 13, color: "#7A90A0", lineHeight: 1.5 }}>{h}</span>
</div>
))}
</div>
<div>
<div style={DL}>Heads up</div>
{city.cons.map((c, i) => (
<div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
<span style={{ color: "#6A4040", fontSize: 11, marginTop: 3, flexShrink: 0 }}>✕</span>
<span style={{ fontSize: 13, color: "#5A6A70", lineHeight: 1.5 }}>{c}</span>
</div>
))}
</div>
</div>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
{[
["Climate", city.climate],
["Visa", `${city.visaEase} — ${city.language}`],
["Cost Note", city.costNote],
].map(([label, val]) => (
<div key={label} style={{ background: "#0D1820", border: "1px solid #182030", borderRadius: 6, padding: "10px 12px" }}>
<div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", color: "#2A4050", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
<div style={{ fontSize: 12, color: "#7A90A0", lineHeight: 1.5 }}>{val}</div>
</div>
))}
</div>

<div>
<div style={DL}>Neighborhoods to explore</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
{city.neighborhoods.map((n) => (
<span key={n} style={{ fontSize: 11, fontFamily: "monospace", color: city.accent, border: `1px solid ${city.color}30`, padding: "3px 10px", borderRadius: 4 }}>{n}</span>
))}
</div>
</div>

<div style={{ marginTop: 14, padding: "10px 14px", background: city.color + "10", border: `1px solid ${city.color}20`, borderRadius: 6 }}>
<span style={{ fontSize: 11, color: city.accent, fontFamily: "monospace", fontWeight: 700 }}>BLACK COMMUNITY </span>
<span style={{ fontSize: 12, color: "#5A7080" }}>{city.blackPop}</span>
</div>
</div>
)}
</div>
```

);
}

const DL = { fontSize: 9, fontFamily: “monospace”, letterSpacing: “0.2em”, color: “#2A4050”, textTransform: “uppercase”, marginBottom: 10 };

function Track({ total, current }) {
return (
<div style={{ display: “flex”, gap: 3, marginBottom: 24 }}>
{Array.from({ length: total }).map((_, i) => (
<div key={i} style={{
flex: i === current ? 4 : 1, height: 2, borderRadius: 1,
background: i < current ? “#5AAFD4” : i === current ? “#5AAFD4” : “#182030”,
transition: “all 0.3s ease”,
}} />
))}
</div>
);
}

export default function GlobalCityFinder() {
const [phase, setPhase] = useState(“intro”);
const [qIdx, setQIdx] = useState(0);
const [allSelected, setAllSelected] = useState(Array.from({ length: QUESTIONS.length }, () => []));
const [results, setResults] = useState(null);
const [expanded, setExpanded] = useState(0);

function toggle(i) {
const q = QUESTIONS[qIdx];
setAllSelected((prev) => prev.map((s, qi) => {
if (qi !== qIdx) return s;
if (q.single) return s.includes(i) ? [] : [i];
return s.includes(i) ? s.filter((x) => x !== i) : […s, i];
}));
}

function next() {
if (qIdx + 1 >= QUESTIONS.length) {
setResults(computeResults(allSelected));
setPhase(“results”);
} else setQIdx(qIdx + 1);
}

function back() { if (qIdx > 0) setQIdx(qIdx - 1); }

function restart() {
setPhase(“intro”); setQIdx(0);
setAllSelected(Array.from({ length: QUESTIONS.length }, () => []));
setResults(null); setExpanded(0);
}

const q = QUESTIONS[qIdx];
const sel = allSelected[qIdx];

return (
<div style={S.shell}>
<div style={S.bg} />
<div style={S.wrap}>

```
{phase === "intro" && (
<div style={S.intro}>
<div style={S.eyebrow}>🌍 GLOBAL CITY FINDER</div>
<h1 style={S.title}>Where in the world<br />should you live?</h1>
<p style={S.sub}>18 questions. 15 global cities. Matched on cost of living, Black community presence, weather, safety, visa ease, healthcare, walkability, and more.</p>
<div style={S.pills}>
{["Cost of Living", "Black Community", "Weather", "Safety", "Visa Ease", "Healthcare", "Walkability", "Nightlife", "Nature", "Job Market"].map((p) => (
<span key={p} style={S.pill}>{p}</span>
))}
</div>
<button style={S.startBtn} onClick={() => setPhase("quiz")}>Start the Assessment →</button>
<div style={S.note}>15 cities across Africa, Europe, Latin America, Southeast Asia & Middle East</div>
</div>
)}

{phase === "quiz" && (
<div style={S.card}>
<Track total={QUESTIONS.length} current={qIdx} />
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
<span style={S.cat}>{q.category}</span>
<span style={S.num}>{qIdx + 1} / {QUESTIONS.length}</span>
</div>
<h2 style={S.qText}>{q.question}</h2>
<p style={S.instr}>{q.instruction} {q.single ? "(choose one)" : ""}</p>
<div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
{q.options.map((opt, i) => {
const on = sel.includes(i);
return (
<button key={i} onClick={() => toggle(i)} style={{ ...S.opt, ...(on ? S.optOn : {}) }}>
<span style={{ ...S.box, ...(on ? S.boxOn : {}) }}>{on ? "✓" : ""}</span>
<span style={{ fontSize: 14, lineHeight: 1.5 }}>{opt.label}</span>
</button>
);
})}
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<button onClick={back} style={{ background: "none", border: "none", color: "#2A3A4A", fontFamily: "monospace", fontSize: 12, cursor: qIdx > 0 ? "pointer" : "default", opacity: qIdx > 0 ? 1 : 0 }}>← Back</button>
<span style={{ fontSize: 11, color: "#1A2A3A", fontFamily: "monospace" }}>{sel.length} selected</span>
<button
style={{ ...S.nextBtn, opacity: sel.length > 0 ? 1 : 0.2, cursor: sel.length > 0 ? "pointer" : "default" }}
onClick={sel.length > 0 ? next : undefined}
>
{qIdx + 1 === QUESTIONS.length ? "See My Cities →" : "Next →"}
</button>
</div>
</div>
)}

{phase === "results" && results && (
<div>
<div style={S.eyebrow}>🌍 YOUR MATCHES</div>
<h2 style={{ fontSize: "clamp(26px,5vw,36px)", fontWeight: 400, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "#ECF2F8" }}>Your top global cities</h2>
<p style={{ fontSize: 14, color: "#2A4050", lineHeight: 1.7, marginBottom: 24 }}>Ranked by how well each city matches everything you told us. Tap to expand for the full breakdown.</p>
{results.top.map((city, i) => (
<CityCard key={city.name} city={city} rank={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? -1 : i)} />
))}
{results.others.length > 0 && (
<div style={{ marginTop: 20 }}>
<div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", color: "#1A3040", textTransform: "uppercase", marginBottom: 10 }}>Also worth a look</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
{results.others.map((city) => (
<div key={city.name} style={{ background: "#0A1018", border: "1px solid #182030", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
<span style={{ fontSize: 18 }}>{city.emoji}</span>
<div>
<div style={{ fontSize: 13, color: "#C0CCD8" }}>{city.name}</div>
<div style={{ fontSize: 10, fontFamily: "monospace", color: "#2A3A4A" }}>{city.matchScore}% match</div>
</div>
</div>
))}
</div>
</div>
)}
<button onClick={restart} style={{ background: "none", border: "none", color: "#1A3040", fontSize: 12, fontFamily: "monospace", cursor: "pointer", padding: "24px 0 0", letterSpacing: "0.1em", display: "block" }}>↩ Start Over</button>
</div>
)}
</div>
</div>
```

);
}

const S = {
shell: { minHeight: “100vh”, background: “#060C14”, color: “#C0CCD8”, fontFamily: “‘Georgia’, serif”, display: “flex”, justifyContent: “center”, padding: “44px 20px”, position: “relative” },
bg: { position: “fixed”, inset: 0, pointerEvents: “none”, background: “radial-gradient(ellipse at 15% 40%, rgba(90,175,212,0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(200,106,42,0.03) 0%, transparent 50%)” },
wrap: { width: “100%”, maxWidth: 660, position: “relative”, zIndex: 1 },
intro: { textAlign: “center”, paddingTop: 28 },
eyebrow: { fontSize: 10, letterSpacing: “0.28em”, color: “#5AAFD4”, fontFamily: “monospace”, fontWeight: 700, marginBottom: 18 },
title: { fontSize: “clamp(34px,7vw,58px)”, fontWeight: 400, lineHeight: 1.12, margin: “0 0 20px”, letterSpacing: “-0.025em”, color: “#ECF2F8” },
sub: { fontSize: 15, lineHeight: 1.8, color: “#3A5060”, maxWidth: 500, margin: “0 auto 26px” },
pills: { display: “flex”, flexWrap: “wrap”, gap: 7, justifyContent: “center”, marginBottom: 32 },
pill: { fontSize: 11, fontFamily: “monospace”, color: “#4A8FB4”, border: “1px solid #182030”, padding: “4px 11px”, borderRadius: 20 },
startBtn: { background: “#5AAFD4”, color: “#060C14”, border: “none”, padding: “14px 42px”, fontSize: 14, fontFamily: “monospace”, fontWeight: 700, letterSpacing: “0.08em”, cursor: “pointer”, borderRadius: 3 },
note: { marginTop: 14, fontSize: 10, color: “#1A2A3A”, fontFamily: “monospace”, letterSpacing: “0.1em” },
card: { background: “#0A1018”, border: “1px solid #182030”, borderRadius: 12, padding: “32px 36px” },
cat: { fontSize: 10, letterSpacing: “0.22em”, color: “#5AAFD4”, fontFamily: “monospace”, textTransform: “uppercase” },
num: { fontSize: 10, color: “#1A2A3A”, fontFamily: “monospace” },
qText: { fontSize: “clamp(17px,3.2vw,22px)”, fontWeight: 400, lineHeight: 1.35, margin: “0 0 6px”, color: “#E4EEF6” },
instr: { fontSize: 11, color: “#1A2A3A”, fontFamily: “monospace”, margin: “0 0 18px” },
opt: { display: “flex”, alignItems: “flex-start”, gap: 13, background: “#060C14”, border: “1px solid #182030”, borderRadius: 6, padding: “12px 16px”, cursor: “pointer”, textAlign: “left”, transition: “all 0.15s”, color: “#5A7080” },
optOn: { border: “1px solid #5AAFD4”, background: “#081420”, color: “#D8E8F4” },
box: { width: 18, height: 18, border: “1px solid #182030”, borderRadius: 4, flexShrink: 0, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 10, fontFamily: “monospace”, color: “transparent”, marginTop: 2 },
boxOn: { background: “#5AAFD4”, border: “1px solid #5AAFD4”, color: “#060C14” },
nextBtn: { background: “transparent”, border: “1px solid #5AAFD4”, color: “#5AAFD4”, padding: “11px 26px”, fontSize: 12, fontFamily: “monospace”, fontWeight: 700, letterSpacing: “0.08em”, cursor: “pointer”, borderRadius: 3 },
};
