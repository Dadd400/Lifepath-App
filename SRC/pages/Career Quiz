import { useState } from “react”;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
bg: “#F5F2ED”,
surface: “#EDEAE3”,
card: “#FFFFFF”,
cardHover: “#FAFAF8”,
border: “#D8D4CB”,
borderActive: “#2C2C2C”,
ink: “#1A1A1A”,
inkMid: “#6B6560”,
inkDim: “#B0AB9F”,
accent: “#1A1A1A”,
accentBg: “#1A1A1A”,
gold: “#C4873A”,
goldBg: “rgba(196,135,58,0.08)”,
green: “#2E7D52”,
greenBg: “rgba(46,125,82,0.08)”,
coral: “#C4503A”,
coralBg: “rgba(196,80,58,0.08)”,
blue: “#2A5EA8”,
blueBg: “rgba(42,94,168,0.08)”,
ff: “‘Playfair Display’, ‘Georgia’, serif”,
sans: “‘Epilogue’, ‘Helvetica Neue’, sans-serif”,
mono: “‘IBM Plex Mono’, ‘Courier New’, monospace”,
};

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
{
id: “age”, num: 1, category: “About You”,
question: “How old are you?”,
instruction: “Choose one”,
type: “single”,
options: [
{ label: “Under 18”, icon: “🌱”, tags: [“young”, “hs”] },
{ label: “18–22”, icon: “⚡”, tags: [“college”, “early”] },
{ label: “23–27”, icon: “🔥”, tags: [“early_career”] },
{ label: “28–35”, icon: “💡”, tags: [“mid_career”] },
{ label: “35+”, icon: “🏆”, tags: [“senior”] },
],
},
{
id: “education”, num: 2, category: “About You”,
question: “What’s your current education level?”,
instruction: “Choose one”,
type: “single”,
options: [
{ label: “Still in high school”, icon: “📚”, tags: [“hs”, “no_degree”] },
{ label: “Some college / currently enrolled”, icon: “🎒”, tags: [“in_school”] },
{ label: “Associate degree or trade certification”, icon: “🔧”, tags: [“trade_cert”, “skilled”] },
{ label: “Bachelor’s degree”, icon: “🎓”, tags: [“degree”, “corporate”] },
{ label: “Master’s degree or higher”, icon: “🏛️”, tags: [“advanced”, “expert”, “corporate”] },
{ label: “No degree — self-taught / work experience”, icon: “💪”, tags: [“self_taught”, “trade_ok”] },
],
},
{
id: “aptitude”, num: 3, category: “Your Strengths”,
question: “What subjects or areas have always come naturally to you?”,
instruction: “Select up to 4”,
type: “multi”, max: 4,
options: [
{ label: “Math, numbers, and logic”, icon: “🔢”, tags: [“analytical”, “finance”, “data”, “engineering”] },
{ label: “Writing, communication, and language”, icon: “✍️”, tags: [“content”, “marketing”, “law”, “consulting”] },
{ label: “Science and how things work”, icon: “🔬”, tags: [“engineering”, “healthcare”, “research”] },
{ label: “People, relationships, and helping others”, icon: “🤝”, tags: [“social_work”, “hr”, “healthcare”, “sales”] },
{ label: “Art, design, and creative expression”, icon: “🎨”, tags: [“design”, “media”, “creative”] },
{ label: “Technology and computers”, icon: “💻”, tags: [“tech”, “data”, “engineering”] },
{ label: “Business, money, and strategy”, icon: “📊”, tags: [“finance”, “consulting”, “ops”, “strategy”] },
{ label: “Building, fixing, and working with your hands”, icon: “🔨”, tags: [“trades”, “skilled”, “engineering”] },
{ label: “Leadership and organizing people”, icon: “🧭”, tags: [“management”, “ops”, “consulting”] },
{ label: “Research and deep learning”, icon: “🔍”, tags: [“research”, “data”, “law”, “healthcare”] },
],
},
{
id: “industry”, num: 4, category: “Your Interests”,
question: “Which of these industries genuinely interest you?”,
instruction: “Select up to 4”,
type: “multi”, max: 4,
options: [
{ label: “Technology and software”, icon: “💻”, tags: [“tech”] },
{ label: “Healthcare and medicine”, icon: “🏥”, tags: [“healthcare”] },
{ label: “Business, finance, and consulting”, icon: “📈”, tags: [“finance”, “consulting”] },
{ label: “Trades and skilled labor”, icon: “⚡”, tags: [“trades”] },
{ label: “Education and social services”, icon: “📚”, tags: [“social_work”] },
{ label: “Media, entertainment, and creative arts”, icon: “🎬”, tags: [“media”, “creative”] },
{ label: “Government, military, or public service”, icon: “🏛️”, tags: [“government”] },
{ label: “Supply chain, logistics, and operations”, icon: “🚚”, tags: [“ops”, “scm”] },
{ label: “Law and criminal justice”, icon: “⚖️”, tags: [“law”] },
{ label: “Real estate and property”, icon: “🏠”, tags: [“realestate”] },
{ label: “Entrepreneurship and startups”, icon: “🚀”, tags: [“startup”] },
{ label: “Science and engineering”, icon: “🔬”, tags: [“engineering”] },
],
},
{
id: “work_env”, num: 5, category: “How You Work”,
question: “What does your ideal work environment look like?”,
instruction: “Select up to 3”,
type: “multi”, max: 3,
options: [
{ label: “Fully remote — I work best from home or anywhere”, icon: “🌐”, tags: [“remote_strong”] },
{ label: “Hybrid — some office, some remote”, icon: “🔄”, tags: [“remote_hybrid”] },
{ label: “In-person — I need the structure and people around me”, icon: “🏢”, tags: [“inperson”] },
{ label: “Field work — I want to be out in the world, not at a desk”, icon: “🌍”, tags: [“field”, “trades”] },
{ label: “I want to own my own schedule completely”, icon: “⏰”, tags: [“freelance”, “startup”] },
{ label: “I’d love to travel for work”, icon: “✈️”, tags: [“consulting”, “field”, “sales”] },
],
},
{
id: “people”, num: 6, category: “How You Work”,
question: “How do you feel about working with people day to day?”,
instruction: “Choose one”,
type: “single”,
options: [
{ label: “I thrive on constant collaboration and team energy”, icon: “🙌”, tags: [“collab”, “sales”, “hr”, “consulting”] },
{ label: “I like working with people but need solo time too”, icon: “⚖️”, tags: [“hybrid_social”, “management”] },
{ label: “I prefer mostly independent work with occasional check-ins”, icon: “🎯”, tags: [“independent”, “data”, “engineering”] },
{ label: “I work best almost entirely alone”, icon: “🧘”, tags: [“solo”, “research”, “data”, “creative”] },
],
},
{
id: “problems”, num: 7, category: “How You Think”,
question: “What kind of problems do you most enjoy solving?”,
instruction: “Select up to 3”,
type: “multi”, max: 3,
options: [
{ label: “Technical problems — systems, code, engineering”, icon: “⚙️”, tags: [“tech”, “engineering”, “data”] },
{ label: “Human problems — helping, coaching, or supporting people”, icon: “❤️”, tags: [“healthcare”, “social_work”, “hr”] },
{ label: “Creative problems — design, storytelling, making something new”, icon: “✨”, tags: [“creative”, “media”, “design”] },
{ label: “Strategic problems — planning, analysis, big picture decisions”, icon: “🗺️”, tags: [“consulting”, “strategy”, “finance”] },
{ label: “Operational problems — making processes faster and more efficient”, icon: “⚡”, tags: [“ops”, “scm”, “management”] },
{ label: “Physical problems — building, fixing, or working with your hands”, icon: “🔨”, tags: [“trades”, “engineering”] },
],
},
{
id: “income”, num: 8, category: “What Matters to You”,
question: “How important is income potential to you right now?”,
instruction: “Choose one”,
type: “single”,
options: [
{ label: “Top priority — I need to maximize earning potential”, icon: “💰”, tags: [“high_income”, “finance”, “tech”, “consulting”] },
{ label: “Very important but not the only factor”, icon: “📊”, tags: [“income_balanced”] },
{ label: “Important but I’d take less pay for work I love”, icon: “🌟”, tags: [“fulfillment”] },
{ label: “I care more about impact and fulfillment than money”, icon: “💙”, tags: [“social_work”, “government”, “education”] },
],
},
{
id: “risk”, num: 9, category: “What Matters to You”,
question: “What’s your relationship with risk?”,
instruction: “Choose one”,
type: “single”,
options: [
{ label: “I want stability — steady paycheck, clear career path”, icon: “🏛️”, tags: [“stable”, “government”, “corporate”, “trades”] },
{ label: “Some risk is fine if the upside is real”, icon: “📈”, tags: [“moderate_risk”, “corporate”] },
{ label: “I’m comfortable with significant uncertainty for the right opportunity”, icon: “🎯”, tags: [“high_risk”, “startup”] },
{ label: “I want full ownership of my income even if it’s harder”, icon: “🔑”, tags: [“freelance”, “startup”, “trades”] },
],
},
{
id: “education_open”, num: 10, category: “Your Path”,
question: “How do you feel about ongoing education and certifications?”,
instruction: “Select all that apply”,
type: “multi”, max: 6,
options: [
{ label: “Open to a 2–4 year degree if it’s the right path”, icon: “🎓”, tags: [“degree_ok”] },
{ label: “I’d do a short certification or bootcamp (3–12 months)”, icon: “⚡”, tags: [“cert_ok”, “tech”, “trades”] },
{ label: “I want to learn on the job — formal education isn’t for me”, icon: “💪”, tags: [“otj”, “trades”, “startup”] },
{ label: “I’m already credentialed and want to use what I have”, icon: “✅”, tags: [“credentialed”] },
{ label: “I’m interested in trade school or apprenticeship programs”, icon: “🔧”, tags: [“trades”, “apprentice”] },
],
},
{
id: “success”, num: 11, category: “Your Future”,
question: “What does success look like for you in 7–10 years?”,
instruction: “Select up to 3”,
type: “multi”, max: 3,
options: [
{ label: “Senior leadership or executive title”, icon: “🏆”, tags: [“management”, “corporate”, “ops”] },
{ label: “Deep expert in a specific niche — the go-to person”, icon: “🔬”, tags: [“expert”, “data”, “engineering”, “healthcare”] },
{ label: “Running my own business or practice”, icon: “🚀”, tags: [“startup”, “freelance”, “trades”] },
{ label: “High income with strong work-life balance”, icon: “⚖️”, tags: [“high_income”, “remote_strong”, “trades”] },
{ label: “Doing work that creates real impact on people or communities”, icon: “🌍”, tags: [“social_work”, “government”, “healthcare”] },
{ label: “Location and lifestyle freedom”, icon: “✈️”, tags: [“remote_strong”, “freelance”, “startup”] },
{ label: “Owning my time completely”, icon: “⏰”, tags: [“freelance”, “trades”, “startup”] },
],
},
{
id: “work_style”, num: 12, category: “Your Future”,
question: “Which of these work styles fits you best?”,
instruction: “Select up to 2”,
type: “multi”, max: 2,
options: [
{ label: “Clear deliverables and defined success metrics”, icon: “📋”, tags: [“corporate”, “ops”, “data”] },
{ label: “Variety — no two days the same”, icon: “🌀”, tags: [“consulting”, “sales”, “field”] },
{ label: “Building things over long time horizons”, icon: “🏗️”, tags: [“engineering”, “research”, “management”] },
{ label: “Fast-paced environments with quick results”, icon: “⚡”, tags: [“startup”, “sales”, “ops”] },
{ label: “Creative freedom with room to experiment”, icon: “🎨”, tags: [“creative”, “design”, “media”, “startup”] },
{ label: “Structured systems with room to improve them”, icon: “⚙️”, tags: [“ops”, “scm”, “engineering”] },
],
},
{
id: “concerns”, num: 13, category: “Right Now”,
question: “What’s your biggest concern about your career right now?”,
instruction: “Select up to 3”,
type: “multi”, max: 3,
options: [
{ label: “I don’t know what I actually want to do”, icon: “🧭”, tags: [“undecided”] },
{ label: “I’m worried about income — I need to earn more”, icon: “💸”, tags: [“high_income”] },
{ label: “I feel stuck in the wrong field”, icon: “🔀”, tags: [“career_change”] },
{ label: “I don’t have the right credentials or experience”, icon: “📄”, tags: [“cert_ok”, “degree_ok”] },
{ label: “I’m not sure if my skills translate to anything valuable”, icon: “❓”, tags: [“skills_doubt”] },
{ label: “The job market feels too competitive”, icon: “🏁”, tags: [“competitive”] },
{ label: “I’m torn between multiple paths I’m interested in”, icon: “🔱”, tags: [“multi_path”] },
{ label: “I’m worried about job security in a world with AI”, icon: “🤖”, tags: [“ai_concern”, “trades”, “healthcare”] },
],
},
{
id: “dealbreakers”, num: 14, category: “Right Now”,
question: “Which of these would make a career feel like the wrong fit?”,
instruction: “Select all that apply”,
type: “multi”, max: 8,
options: [
{ label: “Repetitive tasks with no variety”, icon: “😴”, tags: [“avoid_routine”] },
{ label: “No clear path for advancement”, icon: “🚫”, tags: [“avoid_dead_end”] },
{ label: “Requiring a long or expensive degree I don’t want”, icon: “💸”, tags: [“avoid_degree”] },
{ label: “Physically demanding work”, icon: “🏋️”, tags: [“avoid_physical”] },
{ label: “High-pressure sales or cold outreach”, icon: “📞”, tags: [“avoid_sales”] },
{ label: “Being stuck behind a screen all day”, icon: “🖥️”, tags: [“avoid_desk”] },
{ label: “No remote work options at all”, icon: “🏢”, tags: [“avoid_inperson”] },
{ label: “Unstable income or contract-only work”, icon: “📉”, tags: [“avoid_unstable”] },
],
},
];

// ─── CAREER PROFILES ──────────────────────────────────────────────────────────
const PROFILES = [
{
id: “tech”,
title: “Technology & Software”,
headline: “You’re wired for the digital economy.”,
color: “#1E3A5F”,
accent: “#4A90D9”,
accentBg: “rgba(74,144,217,0.08)”,
icon: “💻”,
summary: “Your analytical instincts, comfort with technology, and preference for independent problem-solving point strongly toward tech. It’s one of the most remote-friendly, high-income fields available — and it’s accessible through multiple paths, not just a traditional CS degree.”,
remoteScore: 5,
incomeScore: 5,
stabilityScore: 4,
entryPaths: [
{ label: “Software Engineering”, time: “4-yr degree or bootcamp (6–12 mo)”, salary: “$75K–$130K starting” },
{ label: “Data Analytics”, time: “Degree or self-taught + certs”, salary: “$60K–$100K starting” },
{ label: “UX/Product Design”, time: “Bootcamp or degree, 6–18 mo”, salary: “$65K–$110K starting” },
{ label: “Cybersecurity”, time: “Certs (CompTIA, CISSP), 6–12 mo”, salary: “$70K–$120K starting” },
],
industries: [“Big Tech (Google, Microsoft, Apple)”, “Fintech and Startups”, “Healthcare Tech”, “Government / Defense Tech”],
remote: “One of the most remote-friendly fields on earth. Most roles can be done fully remote from day one.”,
certPath: “If you don’t have a degree, a focused bootcamp or Google/Meta/AWS certification (3–12 months) is a legitimate entry point.”,
watchOut: “The field is competitive at entry level right now due to AI. Specializing early (AI/ML, security, data) beats being a generalist.”,
tags: [“tech”, “data”, “engineering”, “remote_strong”, “remote_hybrid”, “high_income”],
},
{
id: “healthcare”,
title: “Healthcare & Allied Health”,
headline: “You’re built for work that actually matters.”,
color: “#1F4A35”,
accent: “#3DBF7A”,
accentBg: “rgba(61,191,122,0.08)”,
icon: “🏥”,
summary: “Healthcare is one of the most AI-proof, recession-proof sectors in existence. If you’re drawn to helping people, science, or human systems — and you’re comfortable with education investments — this field has one of the highest long-term return profiles of any career.”,
remoteScore: 2,
incomeScore: 4,
stabilityScore: 5,
entryPaths: [
{ label: “Registered Nurse (RN)”, time: “2–4 year degree”, salary: “$65K–$95K+ starting” },
{ label: “Physician Assistant / NP”, time: “Graduate degree (6–8 yrs)”, salary: “$100K–$150K+” },
{ label: “Medical Coder / Biller”, time: “Certification, 3–6 months”, salary: “$40K–$65K (remote-friendly)” },
{ label: “Healthcare Administration”, time: “2–4 year degree”, salary: “$55K–$90K” },
],
industries: [“Hospital Systems”, “Private Practice”, “Insurance & Health Plans”, “Health Tech Startups”],
remote: “Limited for clinical roles but strong for healthcare admin, medical coding, and health IT roles.”,
certPath: “Medical coding is one of the fastest legitimate entry points — 3–6 month cert, remote work, growing demand.”,
watchOut: “Clinical roles require significant upfront education investment. Know the difference between clinical and administrative paths before committing.”,
tags: [“healthcare”, “social_work”, “research”, “stable”, “government”],
},
{
id: “trades”,
title: “Skilled Trades & Technical Work”,
headline: “The most underrated high-income path in America.”,
color: “#4A2A10”,
accent: “#C4873A”,
accentBg: “rgba(196,135,58,0.08)”,
icon: “⚡”,
summary: “Skilled trades are experiencing a generational shortage — demand is massive, competition is low, and you can be earning six figures in 3–4 years without student debt. If you’re hands-on, independent, and skeptical of the traditional college path, this is worth serious consideration.”,
remoteScore: 1,
incomeScore: 4,
stabilityScore: 5,
entryPaths: [
{ label: “Electrician”, time: “Apprenticeship 4–5 yrs”, salary: “$60K–$100K+ (Master Electrician)” },
{ label: “HVAC Technician”, time: “Trade school 6–24 mo + cert”, salary: “$50K–$90K+” },
{ label: “Plumber”, time: “Apprenticeship 4–5 yrs”, salary: “$55K–$100K+” },
{ label: “Welder / CNC Machinist”, time: “Trade school 6–18 mo”, salary: “$45K–$85K+” },
],
industries: [“Residential & Commercial Construction”, “Manufacturing”, “Energy & Utilities”, “Own Your Own Business”],
remote: “Field-based work — no remote. But you own your schedule and can build toward running your own shop.”,
certPath: “Most trades have apprenticeship programs that pay you while you learn. Zero tuition, earn while training.”,
watchOut: “Physically demanding — factor in long-term body wear. The real wealth comes from moving from labor to ownership.”,
tags: [“trades”, “skilled”, “field”, “avoid_degree”, “avoid_desk”, “stable”, “freelance”],
},
{
id: “consulting_strategy”,
title: “Consulting & Business Strategy”,
headline: “You solve problems for a living — and get paid well for it.”,
color: “#1E2A5F”,
accent: “#6A7FD9”,
accentBg: “rgba(106,127,217,0.08)”,
icon: “📊”,
summary: “You’re drawn to strategy, variety, and high-stakes problem solving. Consulting — whether management, operations, or specialized — rewards analytical rigor, communication, and the ability to navigate complex organizations. It’s one of the best springboards for long-term career optionality.”,
remoteScore: 3,
incomeScore: 5,
stabilityScore: 3,
entryPaths: [
{ label: “Management Consulting (Big 4 / MBB)”, time: “Bachelor’s degree minimum, MBA preferred”, salary: “$80K–$130K starting” },
{ label: “Operations / Supply Chain Consulting”, time: “Bachelor’s degree + relevant experience”, salary: “$70K–$120K” },
{ label: “HR / People Consulting”, time: “Degree + HR certs (SHRM)”, salary: “$60K–$100K” },
{ label: “Freelance / Independent Consultant”, time: “10+ years expertise in any field”, salary: “$80–$300/hr” },
],
industries: [“Big 4 (Deloitte, PwC, KPMG, EY)”, “Boutique Strategy Firms”, “Corporate Strategy Teams”, “Independent / Fractional”],
remote: “Hybrid is the norm — client work requires presence but much of the analysis is remote.”,
certPath: “MBA accelerates the path significantly but isn’t mandatory. Project Management (PMP) and Six Sigma are strong add-ons.”,
watchOut: “High travel demand in traditional consulting. Internal strategy roles offer similar work with better work-life balance.”,
tags: [“consulting”, “strategy”, “management”, “finance”, “analytical”, “ops”],
},
{
id: “creative_media”,
title: “Creative & Media”,
headline: “You see the world differently — and there’s a market for that.”,
color: “#4A1A3A”,
accent: “#C44A8A”,
accentBg: “rgba(196,74,138,0.08)”,
icon: “🎨”,
summary: “Creative careers are more viable than ever — but the path looks different than it used to. The most successful people in this space pair creative talent with business or technical skills. Design, content strategy, UX, and brand are all fields where your creative instincts translate directly to high-value, remote-friendly work.”,
remoteScore: 5,
incomeScore: 3,
stabilityScore: 3,
entryPaths: [
{ label: “Brand / Graphic Designer”, time: “Degree or self-taught portfolio”, salary: “$45K–$90K” },
{ label: “UX / Product Designer”, time: “Bootcamp or degree, portfolio”, salary: “$70K–$120K” },
{ label: “Content Strategist / Copywriter”, time: “Self-taught or degree, strong portfolio”, salary: “$50K–$100K” },
{ label: “Video / Film Production”, time: “Degree or self-taught”, salary: “$40K–$90K” },
],
industries: [“Tech Companies (in-house design teams)”, “Agencies”, “Media & Entertainment”, “Freelance / Creator Economy”],
remote: “One of the most remote-friendly fields. Most creative roles can be done entirely remotely.”,
certPath: “Portfolio > credentials here. A strong body of work beats any degree. Focus on building and showing real work.”,
watchOut: “AI is disrupting entry-level creative work fast. Pair creative skills with strategy, UX thinking, or technical ability to stay differentiated.”,
tags: [“creative”, “design”, “media”, “remote_strong”, “solo”, “startup”, “freelance”],
},
{
id: “finance_data”,
title: “Finance, Data & Analytics”,
headline: “Numbers are your language — and it’s a profitable one.”,
color: “#1A3A2A”,
accent: “#2EA87A”,
accentBg: “rgba(46,168,122,0.08)”,
icon: “📈”,
summary: “Your analytical instincts, strategic thinking, and comfort with data point toward one of the highest-paying, most stable career families available. Finance and data analytics roles sit at the intersection of business decisions and quantitative rigor — and they’re in demand across almost every industry.”,
remoteScore: 4,
incomeScore: 5,
stabilityScore: 4,
entryPaths: [
{ label: “Financial Analyst”, time: “Bachelor’s degree (finance/accounting)”, salary: “$60K–$100K starting” },
{ label: “Data Analyst”, time: “Degree or self-taught + SQL/Python certs”, salary: “$60K–$105K” },
{ label: “Investment Banking / Private Equity”, time: “Top-tier degree + networking”, salary: “$100K–$200K+ (demanding)” },
{ label: “Actuary”, time: “Degree + exams (long path, high reward)”, salary: “$80K–$150K+” },
],
industries: [“Banking & Financial Services”, “Corporate Finance (any industry)”, “Consulting”, “Fintech & Startups”],
remote: “Strong hybrid options. Data roles especially have moved heavily remote.”,
certPath: “CFA (finance), CPA (accounting), or data certs (Google Data Analytics, SQL) all add immediate value.”,
watchOut: “Investment banking has brutal hours at the junior level. Corporate finance and data analytics offer similar earning power with far better lifestyle.”,
tags: [“finance”, “data”, “analytical”, “high_income”, “corporate”, “research”],
},
{
id: “ops_scm”,
title: “Operations & Supply Chain”,
headline: “You make complex systems actually work.”,
color: “#2A1A4A”,
accent: “#8A6FD9”,
accentBg: “rgba(138,111,217,0.08)”,
icon: “🚚”,
summary: “Operations and supply chain sit at the center of how every company delivers its product or service. It’s analytical, cross-functional, and increasingly strategic. For people who love making things efficient and measurable, this field offers strong comp, clear career progression, and surprising variety across industries.”,
remoteScore: 3,
incomeScore: 4,
stabilityScore: 5,
entryPaths: [
{ label: “Supply Chain Analyst”, time: “Bachelor’s degree”, salary: “$55K–$85K starting” },
{ label: “Operations Manager”, time: “Degree + 2–4 yrs experience”, salary: “$65K–$100K” },
{ label: “Procurement / Sourcing Manager”, time: “Degree + certs (CSCP, CPM)”, salary: “$70K–$110K” },
{ label: “Logistics Coordinator”, time: “Degree or experience”, salary: “$45K–$75K” },
],
industries: [“Manufacturing & Industrials”, “CPG & Retail”, “Healthcare Systems”, “Consulting”, “Tech Operations”],
remote: “Hybrid is common for analyst and manager roles. Director+ roles are often remote-eligible.”,
certPath: “APICS CSCP or CPIM certifications are the gold standard. Lean Six Sigma adds immediate value.”,
watchOut: “Entry-level roles can feel transactional. Target companies where SCM is a strategic function, not just a cost center.”,
tags: [“ops”, “scm”, “management”, “analytical”, “corporate”, “stable”],
},
{
id: “social_education”,
title: “Social Services, Education & Public Sector”,
headline: “You want your work to mean something.”,
color: “#1A3A4A”,
accent: “#3A9FBF”,
accentBg: “rgba(58,159,191,0.08)”,
icon: “🌍”,
summary: “If impact drives you more than income — and you’re drawn to systems that serve people — education, social work, and public service offer something most fields don’t: the feeling that your work genuinely matters. These careers are also more stable than people assume, and remote options are growing.”,
remoteScore: 3,
incomeScore: 2,
stabilityScore: 5,
entryPaths: [
{ label: “Social Worker (BSW/MSW)”, time: “Bachelor’s or Master’s degree”, salary: “$40K–$70K” },
{ label: “Teacher / School Counselor”, time: “Degree + state certification”, salary: “$40K–$75K + pension” },
{ label: “Nonprofit Program Manager”, time: “Degree + experience”, salary: “$45K–$80K” },
{ label: “Government / Federal Employment”, time: “Degree varies by role”, salary: “$50K–$110K + full benefits” },
],
industries: [“K–12 and Higher Education”, “Nonprofits and NGOs”, “Federal / State Government”, “Community Organizations”],
remote: “Growing remote options — especially in program coordination, policy, and grant management roles.”,
certPath: “AmeriCorps or Teach For America are powerful 1–2 year entry points that build credentials and connections.”,
watchOut: “Pay ceiling is real in most of these roles. The trade-off is stability, benefits, pension, and genuine mission.”,
tags: [“social_work”, “government”, “education”, “stable”, “fulfillment”, “avoid_unstable”],
},
{
id: “entrepreneur_freelance”,
title: “Entrepreneurship & Freelance”,
headline: “You don’t want a job — you want to build something.”,
color: “#3A2A10”,
accent: “#D4A843”,
accentBg: “rgba(212,168,67,0.08)”,
icon: “🚀”,
summary: “Your risk tolerance, independence, and desire to own your income point toward building something for yourself. Whether that’s a freelance practice, a small business, or a startup — the common thread is you’re building equity, not just earning a salary. The path is harder but the upside is real.”,
remoteScore: 5,
incomeScore: 4,
stabilityScore: 2,
entryPaths: [
{ label: “Freelance Consultant / Contractor”, time: “Build on existing expertise”, salary: “$50K–$300K+ (variable)” },
{ label: “Agency / Service Business”, time: “1–2 yrs to profitability typically”, salary: “$60K–$500K+ (owner’s draw)” },
{ label: “SaaS / Tech Startup”, time: “2–5 yrs to meaningful revenue”, salary: “Variable — high risk, high reward” },
{ label: “Trade Business Owner”, time: “3–5 yrs journeyman → own shop”, salary: “$80K–$200K+ running a crew” },
],
industries: [“Any — entrepreneurship is a vehicle, not an industry”],
remote: “Fully flexible — you set the terms.”,
certPath: “The best preparation is getting good at something valuable first, then packaging it. Execution > credentials.”,
watchOut: “The income is real but so is the instability early on. Make sure your financial foundation is solid before going fully independent.”,
tags: [“startup”, “freelance”, “remote_strong”, “high_risk”, “avoid_inperson”, “avoid_unstable”],
},
{
id: “law_government”,
title: “Law, Policy & Government”,
headline: “You’re drawn to systems — and changing them.”,
color: “#2A2A1A”,
accent: “#8A8A3A”,
accentBg: “rgba(138,138,58,0.08)”,
icon: “⚖️”,
summary: “Law and policy attract people who are analytical, articulate, and interested in how power and systems actually work. It’s a long path but one of the most versatile — a law degree opens doors in business, finance, politics, and beyond, not just courtrooms.”,
remoteScore: 2,
incomeScore: 4,
stabilityScore: 4,
entryPaths: [
{ label: “Attorney / Lawyer”, time: “3-yr law school (JD) after undergrad”, salary: “$70K–$200K+ depending on sector” },
{ label: “Paralegal / Legal Assistant”, time: “Certificate or degree, 1–2 yrs”, salary: “$45K–$75K” },
{ label: “Policy Analyst”, time: “Bachelor’s or Master’s in policy/poli-sci”, salary: “$50K–$90K” },
{ label: “Compliance Officer”, time: “Degree + industry certs”, salary: “$60K–$110K” },
],
industries: [“Law Firms (BigLaw, boutique)”, “Corporate Legal Departments”, “Government & Regulatory Agencies”, “Nonprofits & Advocacy”],
remote: “Limited for courtroom work, growing for corporate legal and policy roles.”,
certPath: “LSAT prep is the critical first gate. Political internships and policy fellowships are the non-law alternative path.”,
watchOut: “Law school is expensive and demanding. Be clear on why you want law specifically vs. policy, compliance, or business as alternatives.”,
tags: [“law”, “government”, “research”, “analytical”, “stable”, “corporate”],
},
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
function scoreProfiles(allAnswers) {
const allTags = [];
const avoidTags = [];

allAnswers.forEach((selectedIndices, qIdx) => {
const q = QUESTIONS[qIdx];
selectedIndices.forEach(optIdx => {
const tags = q.options[optIdx].tags || [];
tags.forEach(tag => {
if (tag.startsWith(“avoid_”)) avoidTags.push(tag);
else allTags.push(tag);
});
});
});

const tagCount = {};
allTags.forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; });

return PROFILES.map(profile => {
let score = 0;
profile.tags.forEach(tag => { score += (tagCount[tag] || 0) * 2; });

```
// Avoid penalties
if (avoidTags.includes("avoid_desk") && ["finance_data", "consulting_strategy"].includes(profile.id)) score -= 4;
if (avoidTags.includes("avoid_physical") && profile.id === "trades") score -= 6;
if (avoidTags.includes("avoid_degree") && ["law_government", "healthcare"].includes(profile.id)) score -= 4;
if (avoidTags.includes("avoid_inperson") && ["trades", "healthcare"].includes(profile.id)) score -= 3;
if (avoidTags.includes("avoid_unstable") && ["entrepreneur_freelance", "creative_media"].includes(profile.id)) score -= 4;
if (avoidTags.includes("avoid_sales") && profile.id === "entrepreneur_freelance") score -= 2;
if (avoidTags.includes("avoid_routine") && ["ops_scm", "finance_data"].includes(profile.id)) score -= 2;

const maxPossible = profile.tags.length * 2 * 3;
const pct = Math.min(Math.round((score / maxPossible) * 100), 99);
return { ...profile, score: Math.max(pct, 20) };
```

}).sort((a, b) => b.score - a.score);
}

// ─── SCORE DOTS ───────────────────────────────────────────────────────────────
function ScoreBar({ label, value, color }) {
return (
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 8 }}>
<span style={{ fontSize: 11, color: T.inkMid, fontFamily: T.mono }}>{label}</span>
<div style={{ display: “flex”, gap: 3 }}>
{[1,2,3,4,5].map(i => (
<div key={i} style={{ width: 10, height: 10, borderRadius: “50%”, background: i <= value ? color : T.border }} />
))}
</div>
</div>
);
}

// ─── RESULT CARD ──────────────────────────────────────────────────────────────
function ResultCard({ profile, rank, expanded, onToggle }) {
return (
<div style={{
background: T.card, border: `1px solid ${expanded ? profile.color : T.border}`,
borderRadius: 16, overflow: “hidden”, marginBottom: 12,
transition: “border-color 0.2s, box-shadow 0.2s”,
boxShadow: expanded ? `0 8px 32px rgba(0,0,0,0.08)` : “none”,
}}>
<button onClick={onToggle} style={{
width: “100%”, background: “none”, border: “none”, cursor: “pointer”,
padding: “20px 24px”, textAlign: “left”, display: “flex”, alignItems: “center”, gap: 16,
}}>
<div style={{
width: 48, height: 48, borderRadius: 12, flexShrink: 0,
background: profile.accentBg, border: `1px solid ${profile.accent}33`,
display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 22,
}}>{profile.icon}</div>
<div style={{ flex: 1 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 8, marginBottom: 3 }}>
{rank === 0 && <span style={{ fontSize: 9, fontFamily: T.mono, fontWeight: 700, letterSpacing: “0.15em”, color: profile.accent, border: `1px solid ${profile.accent}`, padding: “2px 8px”, borderRadius: 10 }}>BEST FIT</span>}
{rank === 1 && <span style={{ fontSize: 9, fontFamily: T.mono, fontWeight: 700, letterSpacing: “0.15em”, color: T.inkMid, border: `1px solid ${T.border}`, padding: “2px 8px”, borderRadius: 10 }}>STRONG ALTERNATIVE</span>}
</div>
<div style={{ fontSize: 17, fontWeight: 600, color: T.ink, fontFamily: T.sans }}>{profile.title}</div>
<div style={{ fontSize: 12, color: T.inkMid, fontFamily: T.mono, marginTop: 2 }}>{profile.headline}</div>
</div>
<div style={{ textAlign: “right”, flexShrink: 0 }}>
<div style={{ fontSize: 28, fontWeight: 700, color: profile.accent, fontFamily: T.mono, lineHeight: 1 }}>{profile.score}%</div>
<div style={{ fontSize: 9, color: T.inkDim, fontFamily: T.mono }}>match</div>
</div>
<span style={{ color: T.inkDim, fontSize: 12, marginLeft: 4 }}>{expanded ? “▲” : “▼”}</span>
</button>

```
{expanded && (
<div style={{ padding: "0 24px 28px", borderTop: `1px solid ${T.border}` }}>
<p style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.8, margin: "20px 0 20px", fontFamily: T.sans, borderLeft: `3px solid ${profile.accent}`, paddingLeft: 14 }}>{profile.summary}</p>

{/* At a glance scores */}
<div style={{ background: T.surface, borderRadius: 10, padding: "16px", marginBottom: 20 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 12 }}>AT A GLANCE</div>
<ScoreBar label="Remote Friendly" value={profile.remoteScore} color={profile.accent} />
<ScoreBar label="Income Potential" value={profile.incomeScore} color={profile.accent} />
<ScoreBar label="Job Stability" value={profile.stabilityScore} color={profile.accent} />
</div>

{/* Entry paths */}
<div style={{ marginBottom: 20 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 12 }}>WAYS IN</div>
{profile.entryPaths.map((p, i) => (
<div key={i} style={{ display: "flex", flexDirection: "column", padding: "12px 14px", background: i % 2 === 0 ? T.surface : "transparent", borderRadius: 8, marginBottom: 4 }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
<span style={{ fontSize: 14, color: T.ink, fontWeight: 500, fontFamily: T.sans }}>{p.label}</span>
<span style={{ fontSize: 12, color: profile.accent, fontFamily: T.mono, whiteSpace: "nowrap", fontWeight: 700 }}>{p.salary}</span>
</div>
<span style={{ fontSize: 11, color: T.inkMid, fontFamily: T.mono, marginTop: 3 }}>{p.time}</span>
</div>
))}
</div>

{/* Industries */}
<div style={{ marginBottom: 20 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 10 }}>INDUSTRIES TO TARGET</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
{profile.industries.map(ind => (
<span key={ind} style={{ fontSize: 12, color: profile.accent, border: `1px solid ${profile.accent}33`, padding: "4px 12px", borderRadius: 16, fontFamily: T.mono }}>{ind}</span>
))}
</div>
</div>

{/* Remote + cert */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
<div style={{ background: T.surface, borderRadius: 10, padding: "14px" }}>
<div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 6 }}>🌐 REMOTE WORK</div>
<div style={{ fontSize: 13, color: T.inkMid, lineHeight: 1.6, fontFamily: T.sans }}>{profile.remote}</div>
</div>
<div style={{ background: T.surface, borderRadius: 10, padding: "14px" }}>
<div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 6 }}>🎯 FAST ENTRY PATH</div>
<div style={{ fontSize: 13, color: T.inkMid, lineHeight: 1.6, fontFamily: T.sans }}>{profile.certPath}</div>
</div>
</div>

{/* Watch out */}
<div style={{ background: profile.accentBg, border: `1px solid ${profile.accent}22`, borderRadius: 10, padding: "14px 16px" }}>
<span style={{ fontSize: 10, fontFamily: T.mono, fontWeight: 700, color: profile.accent, letterSpacing: "0.12em" }}>WATCH OUT FOR </span>
<span style={{ fontSize: 13, color: T.inkMid, fontFamily: T.sans, lineHeight: 1.6 }}>{profile.watchOut}</span>
</div>
</div>
)}
</div>
```

);
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function Progress({ current, total, category }) {
return (
<div style={{ marginBottom: 28 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 10 }}>
<span style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: “0.2em”, color: T.inkMid }}>{category.toUpperCase()}</span>
<span style={{ fontSize: 10, fontFamily: T.mono, color: T.inkDim }}>{current}/{total}</span>
</div>
<div style={{ display: “flex”, gap: 3 }}>
{Array.from({ length: total }).map((_, i) => (
<div key={i} style={{
flex: i === current - 1 ? 3 : 1, height: 3, borderRadius: 2,
background: i < current ? T.ink : T.border,
transition: “all 0.3s ease”,
}} />
))}
</div>
</div>
);
}

// ─── OPTION BUTTON ────────────────────────────────────────────────────────────
function Option({ opt, selected, onToggle, isMulti, disabled }) {
return (
<button onClick={() => !disabled && onToggle()} style={{
display: “flex”, alignItems: “center”, gap: 14,
background: selected ? T.ink : disabled ? T.surface : T.card,
border: `1px solid ${selected ? T.ink : T.border}`,
borderRadius: 10, padding: “13px 16px”, cursor: disabled ? “not-allowed” : “pointer”,
textAlign: “left”, width: “100%”, transition: “all 0.15s”,
opacity: disabled ? 0.4 : 1,
}}>
<span style={{ fontSize: 20, flexShrink: 0, width: 26, textAlign: “center” }}>{opt.icon}</span>
<span style={{ fontSize: 14, color: selected ? “#fff” : T.ink, fontFamily: T.sans, flex: 1, lineHeight: 1.4 }}>{opt.label}</span>
<div style={{
width: 18, height: 18, borderRadius: isMulti ? 4 : “50%”, flexShrink: 0,
border: `2px solid ${selected ? "#fff" : T.border}`,
background: selected ? “#fff” : “transparent”,
display: “flex”, alignItems: “center”, justifyContent: “center”,
fontSize: 10, color: T.ink,
}}>{selected ? “✓” : “”}</div>
</button>
);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CareerQuizV3() {
const [phase, setPhase] = useState(“intro”);
const [qIdx, setQIdx] = useState(0);
const [allSelected, setAllSelected] = useState(Array.from({ length: QUESTIONS.length }, () => []));
const [results, setResults] = useState(null);
const [expanded, setExpanded] = useState(0);

const q = QUESTIONS[qIdx];
const sel = allSelected[qIdx];
const isMulti = q?.type === “multi”;

function toggle(i) {
setAllSelected(prev => prev.map((s, qi) => {
if (qi !== qIdx) return s;
if (!isMulti) return s.includes(i) ? [] : [i];
if (s.includes(i)) return s.filter(x => x !== i);
if (s.length >= (q.max || 99)) return s;
return […s, i];
}));
}

function next() {
if (sel.length === 0) return;
if (qIdx + 1 >= QUESTIONS.length) {
setResults(scoreProfiles(allSelected));
setPhase(“results”);
} else {
setQIdx(qIdx + 1);
}
}

function back() { if (qIdx > 0) setQIdx(qIdx - 1); }

function restart() {
setPhase(“intro”); setQIdx(0);
setAllSelected(Array.from({ length: QUESTIONS.length }, () => []));
setResults(null); setExpanded(0);
}

return (
<div style={{ background: T.bg, minHeight: “100vh”, fontFamily: T.sans }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Epilogue:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;700&display=swap'); * { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${T.bg}; } ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

```
<div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>

{/* ── INTRO ── */}
{phase === "intro" && (
<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 60, paddingBottom: 60, animation: "fadeUp 0.6s ease" }}>
<div style={{ marginBottom: 48 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.3em", color: T.inkMid, marginBottom: 20 }}>LIFEPATH · CAREER QUIZ</div>
<h1 style={{ fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 400, color: T.ink, margin: "0 0 20px", lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: T.ff }}>
What career<br />were you<br />built for?
</h1>
<p style={{ fontSize: 17, color: T.inkMid, lineHeight: 1.8, maxWidth: 440, margin: "0 0 36px", fontFamily: T.sans }}>
14 questions. Every age, every background, every starting point. Your results include specific roles, entry paths, salary ranges, remote work options, and what to watch out for.
</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
{["High school students", "College students", "Career changers", "Working professionals"].map(tag => (
<span key={tag} style={{ fontSize: 11, fontFamily: T.mono, color: T.inkMid, border: `1px solid ${T.border}`, padding: "5px 12px", borderRadius: 20 }}>{tag}</span>
))}
</div>
</div>

{/* Sample result preview */}
<div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px 22px", marginBottom: 32 }}>
<div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.15em", color: T.inkDim, marginBottom: 14 }}>EXAMPLE RESULT</div>
<div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
<div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(74,144,217,0.08)", border: "1px solid rgba(74,144,217,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💻</div>
<div>
<div style={{ fontSize: 15, fontWeight: 600, color: T.ink, fontFamily: T.sans }}>Technology & Software</div>
<div style={{ fontSize: 11, color: T.inkMid, fontFamily: T.mono }}>87% match · Remote-friendly · $75K–$130K entry</div>
</div>
</div>
<div style={{ fontSize: 12, color: T.inkMid, fontFamily: T.sans, lineHeight: 1.6 }}>Roles, entry paths, salary ranges, remote score, certifications and what to watch out for — all personalized to your answers.</div>
</div>

<button onClick={() => setPhase("quiz")} style={{
background: T.ink, color: "#fff", border: "none",
padding: "16px 36px", borderRadius: 30, fontSize: 15,
fontFamily: T.mono, fontWeight: 700, cursor: "pointer",
letterSpacing: "0.06em", alignSelf: "flex-start",
}}>BEGIN THE QUIZ →</button>
<div style={{ marginTop: 14, fontSize: 11, color: T.inkDim, fontFamily: T.mono }}>14 questions · ~5 minutes · Free</div>
</div>
)}

{/* ── QUIZ ── */}
{phase === "quiz" && (
<div style={{ paddingTop: 40, paddingBottom: 100 }}>
<Progress current={qIdx + 1} total={QUESTIONS.length} category={q.category} />

<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
<div style={{ width: 6, height: 6, borderRadius: "50%", background: T.ink }} />
<span style={{ fontSize: 11, fontFamily: T.mono, color: T.inkMid, letterSpacing: "0.12em" }}>QUESTION {q.num} OF {QUESTIONS.length}</span>
</div>

<h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 400, color: T.ink, margin: "0 0 6px", lineHeight: 1.3, letterSpacing: "-0.015em", fontFamily: T.ff }}>{q.question}</h2>
<p style={{ fontSize: 12, color: T.inkDim, fontFamily: T.mono, margin: "0 0 22px", letterSpacing: "0.05em" }}>
{q.instruction}
{isMulti && q.max && <span style={{ color: T.gold }}> · {sel.length}/{q.max} selected</span>}
</p>

<div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
{q.options.map((opt, i) => (
<Option
key={i} opt={opt} selected={sel.includes(i)}
onToggle={() => toggle(i)} isMulti={isMulti}
disabled={isMulti && !sel.includes(i) && sel.length >= (q.max || 99)}
/>
))}
</div>

{/* Nav */}
<div style={{
position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
width: "100%", maxWidth: 640,
background: T.bg + "F0", backdropFilter: "blur(12px)",
borderTop: `1px solid ${T.border}`,
padding: "16px 20px 24px",
display: "flex", justifyContent: "space-between", alignItems: "center",
zIndex: 10,
}}>
<button onClick={back} style={{ background: "none", border: "none", color: qIdx > 0 ? T.inkMid : "transparent", fontFamily: T.mono, fontSize: 13, cursor: qIdx > 0 ? "pointer" : "default" }}>← Back</button>
<span style={{ fontSize: 11, color: T.inkDim, fontFamily: T.mono }}>{sel.length > 0 ? `${sel.length} selected` : "select to continue"}</span>
<button onClick={next} style={{
background: sel.length > 0 ? T.ink : T.border,
border: "none", color: sel.length > 0 ? "#fff" : T.inkDim,
padding: "11px 24px", borderRadius: 24,
fontSize: 13, fontFamily: T.mono, fontWeight: 700,
cursor: sel.length > 0 ? "pointer" : "default",
transition: "all 0.15s", letterSpacing: "0.06em",
}}>
{qIdx + 1 === QUESTIONS.length ? "SEE RESULTS →" : "NEXT →"}
</button>
</div>
</div>
)}

{/* ── RESULTS ── */}
{phase === "results" && results && (
<div style={{ paddingTop: 48, paddingBottom: 60 }}>
<div style={{ marginBottom: 32 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.25em", color: T.inkMid, marginBottom: 12 }}>YOUR RESULTS</div>
<h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.025em", fontFamily: T.ff }}>Your career matches</h2>
<p style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.7, fontFamily: T.sans, marginBottom: 8 }}>
Ranked by how well each field matches your strengths, interests, and preferences. Tap any card to see the full breakdown — roles, entry paths, salary ranges, and more.
</p>
</div>

{/* Top 3 */}
<div style={{ marginBottom: 12 }}>
{results.slice(0, 3).map((profile, i) => (
<ResultCard
key={profile.id} profile={profile} rank={i}
expanded={expanded === i}
onToggle={() => setExpanded(expanded === i ? -1 : i)}
/>
))}
</div>

{/* Others */}
<div style={{ marginBottom: 32 }}>
<div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.2em", color: T.inkDim, marginBottom: 12 }}>ALSO WORTH EXPLORING</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
{results.slice(3, 7).map(p => (
<div key={p.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
<span style={{ fontSize: 16 }}>{p.icon}</span>
<div>
<div style={{ fontSize: 13, color: T.ink, fontFamily: T.sans, fontWeight: 500 }}>{p.title}</div>
<div style={{ fontSize: 10, fontFamily: T.mono, color: T.inkDim }}>{p.score}% match</div>
</div>
</div>
))}
</div>
</div>

{/* Retake */}
<button onClick={restart} style={{ background: "none", border: `1px solid ${T.border}`, color: T.inkMid, fontSize: 13, fontFamily: T.mono, cursor: "pointer", padding: "10px 24px", borderRadius: 20, letterSpacing: "0.08em" }}>↩ Retake Quiz</button>
</div>
)}
</div>
</div>
```

);
}
