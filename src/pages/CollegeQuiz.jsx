import { useState } from "react";

// ─── DESIGN: Scholarly meets modern — think acceptance letter meets editorial ──
const T = {
  bg: "#FAFAF7",
  surface: "#F2F0EB",
  card: "#FFFFFF",
  border: "#E0DDD6",
  borderActive: "#2C2C2C",
  ink: "#1C1C1C",
  inkMid: "#6B6560",
  inkDim: "#B8B4AC",
  accent: "#1C3D6B",
  accentLight: "#2E5FA3",
  accentBg: "rgba(28,61,107,0.06)",
  gold: "#C4873A",
  goldBg: "rgba(196,135,58,0.08)",
  green: "#2A7A52",
  greenBg: "rgba(42,122,82,0.08)",
  coral: "#C44A3A",
  coralBg: "rgba(196,74,58,0.08)",
  purple: "#6B3A8A",
  purpleBg: "rgba(107,58,138,0.08)",
  teal: "#2A7A8A",
  tealBg: "rgba(42,122,138,0.08)",
  ff: "'DM Serif Display', 'Georgia', serif",
  sans: "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif",
  mono: "'Fira Code', 'Courier New', monospace",
};

// ─── FREE QUESTIONS (10) ──────────────────────────────────────────────────────
const FREE_QUESTIONS = [
  {
    id: "situation", num: 1, category: "Where You Are",
    question: "What's your current situation?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "High school junior — planning ahead", icon: "📚", tags: ["junior", "planning"] },
      { label: "High school senior — deciding now", icon: "⏰", tags: ["senior", "urgent"] },
      { label: "Currently in college — considering transferring", icon: "🔄", tags: ["transfer"] },
      { label: "Taking a gap year — deciding what's next", icon: "🌍", tags: ["gap_year"] },
      { label: "Adult learner returning to school", icon: "💼", tags: ["adult_learner"] },
    ],
  },
  {
    id: "goal", num: 2, category: "Your Why",
    question: "What's your primary goal after getting your degree or certification?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "Land a specific high-paying job as fast as possible", icon: "💰", tags: ["career_fast", "roi"] },
      { label: "Build a career in a field I'm genuinely passionate about", icon: "🔥", tags: ["passion", "career"] },
      { label: "Start a business or work for myself eventually", icon: "🚀", tags: ["entrepreneur"] },
      { label: "Go to grad or professional school (law, med, MBA)", icon: "🎓", tags: ["grad_school", "prestige"] },
      { label: "I'm not sure yet — I want to explore", icon: "🧭", tags: ["explorer"] },
      { label: "Give back through public service or social impact", icon: "🌍", tags: ["service", "impact"] },
    ],
  },
  {
    id: "interest", num: 3, category: "Your Why",
    question: "What are you genuinely interested in studying?",
    instruction: "Select up to 3",
    type: "multi", max: 3,
    options: [
      { label: "STEM — science, tech, engineering, math", icon: "🔬", tags: ["stem", "tech", "high_demand"] },
      { label: "Business, finance, or entrepreneurship", icon: "📊", tags: ["business", "roi", "high_demand"] },
      { label: "Healthcare or pre-med", icon: "🏥", tags: ["healthcare", "grad_school", "high_demand"] },
      { label: "Arts, design, or media", icon: "🎨", tags: ["arts", "creative"] },
      { label: "Social sciences or humanities", icon: "📖", tags: ["humanities", "grad_school"] },
      { label: "Law, criminal justice, or policy", icon: "⚖️", tags: ["law", "grad_school"] },
      { label: "Education or social work", icon: "🤝", tags: ["service", "impact"] },
      { label: "Trades, technical, or vocational", icon: "🔧", tags: ["trade", "no_debt"] },
      { label: "I have no idea yet", icon: "🤷", tags: ["explorer", "liberal_arts"] },
    ],
  },
  {
    id: "finances", num: 4, category: "The Money",
    question: "What's your financial situation going into this decision?",
    instruction: "Choose one — this is one of the most important questions",
    type: "single",
    options: [
      { label: "I need the most affordable option — debt is a real concern", icon: "🟢", tags: ["budget_tight", "no_debt", "community_college"] },
      { label: "I have some aid but cost still matters a lot", icon: "🟡", tags: ["budget_mid", "in_state"] },
      { label: "Strong aid or family support — cost is less of a concern", icon: "🟠", tags: ["budget_ok", "prestige"] },
      { label: "Willing to take on debt if the school is worth it", icon: "🔵", tags: ["debt_ok", "prestige", "roi"] },
      { label: "I want zero debt — work-first or trade routes interest me", icon: "🔴", tags: ["no_debt", "trade", "work_first"] },
    ],
  },
  {
    id: "experience", num: 5, category: "What You Want",
    question: "How important is the full college experience — campus life, social scene, athletics?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "Very important — I want the full experience", icon: "🎉", tags: ["campus_life", "large_school"] },
      { label: "Somewhat — I want balance of academics and social life", icon: "⚖️", tags: ["balanced"] },
      { label: "Not that important — focused on degree and career outcome", icon: "🎯", tags: ["career_focused"] },
      { label: "Irrelevant — I just need the credential or skill", icon: "📋", tags: ["credential_only", "community_college", "online"] },
    ],
  },
  {
    id: "hbcu", num: 6, category: "What You Want",
    question: "How do you feel about HBCUs?",
    instruction: "Be honest — there's no wrong answer here",
    type: "single",
    options: [
      { label: "It's a priority — I specifically want to attend an HBCU", icon: "✊", tags: ["hbcu_strong"] },
      { label: "Very open to HBCUs — want to know more", icon: "💡", tags: ["hbcu_open"] },
      { label: "I'd consider one if it's the best fit academically and financially", icon: "🤔", tags: ["hbcu_consider"] },
      { label: "Not focused on HBCUs — other factors matter more", icon: "➡️", tags: ["hbcu_neutral"] },
      { label: "Not sure what HBCUs offer — open to learning", icon: "🔍", tags: ["hbcu_curious"] },
    ],
  },
  {
    id: "reputation", num: 7, category: "What You Want",
    question: "How important is the school's name and reputation to you?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "Very important — I want a name that opens doors", icon: "🏆", tags: ["prestige", "grad_school"] },
      { label: "Somewhat — reputation matters but fit matters more", icon: "📊", tags: ["balanced", "fit"] },
      { label: "Not very important — I care about outcome not prestige", icon: "🎯", tags: ["outcome_focused", "roi"] },
      { label: "Completely irrelevant — going for skill and certification", icon: "🔧", tags: ["trade", "community_college"] },
    ],
  },
  {
    id: "learning", num: 8, category: "How You Learn",
    question: "What kind of learning environment fits you best?",
    instruction: "Select up to 3",
    type: "multi", max: 3,
    options: [
      { label: "Small classes — professors know my name", icon: "👥", tags: ["small_school", "liberal_arts"] },
      { label: "Strong research and academic rigor", icon: "🔬", tags: ["research", "prestige"] },
      { label: "Hands-on, practical, project-based learning", icon: "🛠️", tags: ["applied", "trade", "stem"] },
      { label: "Flexible or online options — fits around my schedule", icon: "💻", tags: ["online", "flexible", "adult_learner"] },
      { label: "Strong internship and career placement programs", icon: "💼", tags: ["career_focused", "roi"] },
      { label: "Competitive environment that pushes me hard", icon: "⚡", tags: ["prestige", "driven"] },
      { label: "Supportive and nurturing community", icon: "🤝", tags: ["support", "hbcu_open", "small_school"] },
    ],
  },
  {
    id: "concerns", num: 9, category: "Your Concerns",
    question: "What concerns you most about this decision?",
    instruction: "Select up to 3 — be honest",
    type: "multi", max: 3,
    options: [
      { label: "Taking on too much student debt", icon: "💸", tags: ["debt_concern", "no_debt", "community_college"] },
      { label: "Choosing the wrong major and wasting time or money", icon: "🔀", tags: ["explorer", "liberal_arts"] },
      { label: "Not getting into the schools I want", icon: "📉", tags: ["realistic"] },
      { label: "Feeling out of place or not belonging", icon: "🫂", tags: ["belonging", "hbcu_open", "small_school"] },
      { label: "Not being prepared for college-level work", icon: "📚", tags: ["support", "community_college"] },
      { label: "Wasting time in college when I could be earning", icon: "⏱️", tags: ["trade", "work_first", "roi"] },
      { label: "Making a decision that disappoints people close to me", icon: "❤️", tags: ["pressure"] },
      { label: "AI and automation making my degree less valuable", icon: "🤖", tags: ["stem", "trade", "future_proof"] },
    ],
  },
  {
    id: "timeline", num: 10, category: "Your Path",
    question: "How quickly do you want to be earning a real income?",
    instruction: "Choose one",
    type: "single",
    options: [
      { label: "ASAP — I want income within 1–2 years", icon: "⚡", tags: ["trade", "community_college", "fast_track"] },
      { label: "2–3 years — open to associate degree or transfer path", icon: "📅", tags: ["community_college", "transfer"] },
      { label: "4 years — standard bachelor's degree timeline", icon: "🎓", tags: ["four_year"] },
      { label: "5+ years — I'm investing in a longer path (grad school, med, law)", icon: "🏛️", tags: ["grad_school", "prestige", "long_term"] },
      { label: "Flexible — I'll take as long as the right path requires", icon: "🌊", tags: ["flexible"] },
    ],
  },
];

// ─── PREMIUM QUESTIONS (5 additional) ────────────────────────────────────────
const PREMIUM_QUESTIONS = [
  {
    id: "gpa", num: 11, category: "Your Profile",
    question: "What's your honest GPA right now?",
    instruction: "This helps us match you to realistic schools — no judgment",
    type: "single",
    options: [
      { label: "3.7 or above — strong academic record", icon: "⭐", tags: ["gpa_high"] },
      { label: "3.0–3.6 — solid, competitive for most schools", icon: "✅", tags: ["gpa_mid"] },
      { label: "2.5–2.9 — need to be strategic about options", icon: "📊", tags: ["gpa_low"] },
      { label: "Below 2.5 — need schools that look beyond GPA", icon: "🔄", tags: ["gpa_rebuild"] },
      { label: "Non-traditional — GPA isn't my full story", icon: "💪", tags: ["non_traditional"] },
    ],
  },
  {
    id: "test_scores", num: 12, category: "Your Profile",
    question: "What's your SAT or ACT score situation?",
    instruction: "Test-optional is real — this just helps narrow recommendations",
    type: "single",
    options: [
      { label: "1400+ SAT / 31+ ACT — strong scores", icon: "🏆", tags: ["test_high"] },
      { label: "1200–1399 SAT / 26–30 ACT — solid scores", icon: "✅", tags: ["test_mid"] },
      { label: "1000–1199 SAT / 20–25 ACT — average range", icon: "📊", tags: ["test_avg"] },
      { label: "Below 1000 SAT / below 20 ACT", icon: "📈", tags: ["test_low"] },
      { label: "Haven't taken it yet or going test-optional", icon: "🔓", tags: ["test_optional"] },
    ],
  },
  {
    id: "state", num: 13, category: "Your Profile",
    question: "What region of the US are you in?",
    instruction: "Unlocks in-state tuition recommendations and regional school matches",
    type: "single",
    options: [
      { label: "Southeast (GA, NC, SC, VA, TN, FL, AL, MS)", icon: "🍑", tags: ["region_southeast"] },
      { label: "Northeast (NY, NJ, PA, MD, DC, MA, CT)", icon: "🗽", tags: ["region_northeast"] },
      { label: "South / Texas (TX, LA, OK, AR)", icon: "⭐", tags: ["region_south"] },
      { label: "Midwest (IL, OH, MI, MO, IN, MN)", icon: "🌽", tags: ["region_midwest"] },
      { label: "West / Southwest (CA, AZ, CO, WA, OR, NV)", icon: "🌵", tags: ["region_west"] },
      { label: "Open to any region — location doesn't matter much", icon: "🌍", tags: ["region_any"] },
    ],
  },
  {
    id: "aid", num: 14, category: "The Money",
    question: "What's your expected financial aid situation?",
    instruction: "Be as honest as possible — this directly shapes which schools are realistic",
    type: "multi", max: 3,
    options: [
      { label: "Pell Grant eligible — EFC is $0", icon: "💚", tags: ["pell", "need_based"] },
      { label: "Some family support — under $10K/year", icon: "💛", tags: ["limited_support"] },
      { label: "Moderate family support — $10–25K/year", icon: "🟠", tags: ["moderate_support"] },
      { label: "Strong family support — $25K+/year", icon: "🔵", tags: ["strong_support"] },
      { label: "Counting on merit scholarships", icon: "🏆", tags: ["merit_focused"] },
      { label: "Haven't done FAFSA yet", icon: "📋", tags: ["fafsa_pending"] },
    ],
  },
  {
    id: "debt_limit", num: 15, category: "The Money",
    question: "What's the maximum debt you're comfortable graduating with?",
    instruction: "The reality check question — be honest with yourself",
    type: "single",
    options: [
      { label: "Zero — I want to graduate completely debt free", icon: "🎯", tags: ["no_debt"] },
      { label: "Under $15K — minimal debt only", icon: "✅", tags: ["low_debt"] },
      { label: "$15–30K — acceptable if the degree delivers", icon: "📊", tags: ["mid_debt"] },
      { label: "$30–50K — willing to invest with clear ROI", icon: "📈", tags: ["high_debt"] },
      { label: "$50K+ — committed to the school regardless", icon: "🏛️", tags: ["max_debt"] },
    ],
  },
];

// ─── PATHWAY PROFILES ─────────────────────────────────────────────────────────
const PATHWAYS = [
  {
    id: "hbcu",
    title: "HBCU Track",
    headline: "Culture, community, and credentials — all in one.",
    icon: "✊",
    color: "#1C3D6B",
    accent: "#2E5FA3",
    accentBg: "rgba(28,61,107,0.07)",
    summary: "HBCUs offer something most schools can't — an environment where Black excellence is the default, not the exception. Academically rigorous, deeply networked, and increasingly well-funded, HBCUs produce a disproportionate share of Black professionals, doctors, lawyers, and executives.",
    whyConsider: [
      "Network effect is real — HBCU alumni networks punch far above their size",
      "Strong financial aid — many HBCUs have generous need-based packages",
      "Culture of belonging that directly impacts graduation rates and outcomes",
      "Graduate school pipeline — HBCUs produce more Black PhD candidates than any other school type",
    ],
    schools_free: ["Howard University (DC)", "Spelman College (GA)", "Morehouse College (GA)", "Hampton University (VA)", "NC A&T (NC)", "FAMU (FL)", "Clark Atlanta University (GA)", "Xavier University of Louisiana"],
    costRange: "$18,000–$35,000/year (before aid)",
    aidNote: "Many HBCUs meet 100% of demonstrated need. HBCU-specific scholarships are widely available.",
    timeline: "4 years to bachelor's degree",
    outcomes: "Strong pipeline to healthcare, law, business, STEM, and public service careers",
    watchOut: "Funding and resources vary significantly between HBCUs — research each school's specific programs in your field.",
    tags: ["hbcu_strong", "hbcu_open", "hbcu_consider", "hbcu_curious", "belonging", "support", "hbcu_open"],
  },
  {
    id: "state_value",
    title: "State Flagship / In-State Value",
    headline: "Maximum ROI. Legitimate credential. Manageable debt.",
    icon: "🏛️",
    color: "#2A7A52",
    accent: "#3DAF78",
    accentBg: "rgba(42,122,82,0.07)",
    summary: "State flagship universities offer a genuine combination of academic quality, career placement, and affordability that private schools often can't match once you factor in aid. In-state tuition is one of the most underrated financial advantages available to any college student.",
    whyConsider: [
      "In-state tuition can be 60–70% cheaper than comparable private schools",
      "State flagships have strong employer relationships in their regions",
      "Large alumni networks — being from the state flagship matters locally",
      "Research opportunities and grad school preparation at flagship universities",
    ],
    schools_free: ["University of North Carolina", "University of Florida", "Georgia Tech / UGA", "UT Austin", "University of Michigan", "Ohio State", "UCLA / UC Berkeley", "University of Maryland"],
    costRange: "$10,000–$22,000/year in-state (before aid)",
    aidNote: "In-state aid programs, merit scholarships, and federal aid can bring this significantly lower.",
    timeline: "4 years to bachelor's degree",
    outcomes: "Strong across all fields — especially business, STEM, healthcare, and law",
    watchOut: "Large universities can feel anonymous. Find your community early — clubs, organizations, and smaller programs within the university.",
    tags: ["in_state", "budget_mid", "budget_tight", "roi", "outcome_focused", "four_year", "balanced"],
  },
  {
    id: "community_transfer",
    title: "Community College → Transfer",
    headline: "The smartest financial play most people overlook.",
    icon: "🔀",
    color: "#C4873A",
    accent: "#D9A050",
    accentBg: "rgba(196,135,58,0.07)",
    summary: "Start at a community college, transfer to a 4-year university, graduate with the same degree for a fraction of the cost. This path is used by millions of successful professionals — and it works especially well if you're not sure what you want to study or need time to build your GPA.",
    whyConsider: [
      "Save $20,000–$40,000 on the first two years of your education",
      "Time to figure out your major before committing to a 4-year school",
      "Guaranteed transfer agreements with state universities in most states",
      "Strong path for adult learners, working students, or anyone with a rocky academic start",
    ],
    schools_free: ["Any community college → State university transfer", "Northern Virginia CC → University of Virginia", "Miami Dade College → University of Florida", "De Anza College → UC System", "Montgomery College → University of Maryland"],
    costRange: "$3,000–$8,000/year for community college",
    aidNote: "Pell Grant covers most or all community college costs for eligible students. Transfer merit scholarships often available.",
    timeline: "2 years CC + 2 years university = 4 years total",
    outcomes: "Graduate with a full 4-year degree — employers see the final degree, not where you started",
    watchOut: "Transfer planning requires intentionality — take the right courses from day one. Meet with a transfer counselor early.",
    tags: ["community_college", "budget_tight", "no_debt", "transfer", "debt_concern", "explorer", "fast_track"],
  },
  {
    id: "trade_technical",
    title: "Trade / Technical Program",
    headline: "The highest ROI path that nobody talks about enough.",
    icon: "⚡",
    color: "#6B3A8A",
    accent: "#9B60C4",
    accentBg: "rgba(107,58,138,0.07)",
    summary: "Skilled trades and technical certifications are producing some of the strongest income and job security numbers of any career path — often in 12–24 months, with zero or minimal debt. Electricians, HVAC technicians, welders, and coders are all in short supply and commanding serious salaries.",
    whyConsider: [
      "Earn $50,000–$100,000+ without a 4-year degree or significant debt",
      "Job security — AI can't replace skilled hands-on work",
      "Apprenticeship programs pay you while you learn",
      "Clear path from employee to business owner",
    ],
    schools_free: ["Lincoln Tech", "Universal Technical Institute (UTI)", "Fortis College", "Local union apprenticeship programs", "Coding bootcamps (General Assembly, Flatiron)", "Community college vocational programs"],
    costRange: "$3,000–$20,000 total (some apprenticeships are free)",
    aidNote: "Pell Grants apply to many technical programs. Apprenticeships often include wages during training.",
    timeline: "6 months to 2 years depending on program",
    outcomes: "Electrician, HVAC tech, welder, plumber, coder, medical coder, dental hygienist — all $40K–$100K+",
    watchOut: "Research program quality carefully — not all trade schools are created equal. Prefer union apprenticeships or community college programs over for-profit trade schools.",
    tags: ["trade", "no_debt", "fast_track", "work_first", "credential_only", "roi", "future_proof"],
  },
  {
    id: "competitive",
    title: "Competitive University Track",
    headline: "Reach high. The network and brand are worth the investment.",
    icon: "🏆",
    color: "#C44A3A",
    accent: "#E06A58",
    accentBg: "rgba(196,74,58,0.07)",
    summary: "For students with strong academic profiles aiming for grad school, top corporate recruiters, or highly competitive fields — the name, network, and rigor of a competitive university can make a real difference in outcomes. The key is being strategic about financing it.",
    whyConsider: [
      "Top employer recruiting happens almost exclusively at competitive universities",
      "Alumni networks at elite schools open doors decades into your career",
      "Strong scholarship opportunities for high-achieving students",
      "Best preparation if graduate or professional school is the goal",
    ],
    schools_free: ["Georgetown, Vanderbilt, Wake Forest (private competitive)", "Morehouse, Spelman, Howard (HBCU competitive tier)", "Michigan, UNC, UCLA (public competitive)", "Duke, Emory, Northwestern, NYU"],
    costRange: "$35,000–$65,000/year (before aid — many meet 100% of need)",
    aidNote: "Many highly selective schools meet 100% of demonstrated financial need. Apply regardless of sticker price.",
    timeline: "4 years to bachelor's degree",
    outcomes: "Investment banking, consulting, law, medicine, tech leadership — highest ceiling career paths",
    watchOut: "Don't take on $200K in debt for an average outcome. Only worth it if financial aid makes it comparable to state school costs.",
    tags: ["prestige", "grad_school", "driven", "research", "career_fast", "gpa_high", "test_high"],
  },
  {
    id: "liberal_arts",
    title: "Liberal Arts College",
    headline: "Small, intimate, and built for people who aren't sure yet.",
    icon: "📖",
    color: "#2A7A8A",
    accent: "#3AAAC4",
    accentBg: "rgba(42,122,138,0.07)",
    summary: "Liberal arts colleges offer something most universities don't — small classes, genuine faculty mentorship, and a broad education that builds the critical thinking, communication, and adaptability that employers increasingly value. Perfect for students still figuring out their direction.",
    whyConsider: [
      "Professors know your name — real mentorship relationships",
      "Flexible curriculum lets you explore before committing to a path",
      "Surprisingly strong post-graduate outcomes relative to school size",
      "Excellent for pre-law, pre-med, and any field where critical thinking is paramount",
    ],
    schools_free: ["Spelman College (HBCU)", "Howard University (HBCU)", "Oberlin", "Vassar", "Davidson", "Kenyon", "Wesleyan", "Bates"],
    costRange: "$25,000–$60,000/year (before aid — very generous with need-based aid)",
    aidNote: "Most liberal arts colleges have large endowments and give generous need-based aid. Often cheaper than state schools for lower-income families.",
    timeline: "4 years to bachelor's degree",
    outcomes: "Broad career preparation — law, medicine, education, business, nonprofit, graduate school",
    watchOut: "Career placement support varies widely. Research career services before committing.",
    tags: ["small_school", "liberal_arts", "explorer", "humanities", "support", "belonging", "fit"],
  },
];

// ─── SCHOOL RECOMMENDATIONS (Premium) ────────────────────────────────────────
const SCHOOL_DATABASE = [
  // HBCUs
  { name: "Howard University", location: "Washington, DC", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "gpa_high", "gpa_mid", "prestige", "grad_school", "region_northeast", "region_any"], tuition: "$30,000/yr", netPrice: "$14,000/yr avg after aid", acceptance: "42%", strengths: ["Law", "Medicine", "Business", "Journalism"], note: "The flagship HBCU — unmatched alumni network in DC and nationally" },
  { name: "Spelman College", location: "Atlanta, GA", type: "HBCU · Women's", tags: ["hbcu_strong", "hbcu_open", "gpa_high", "gpa_mid", "region_southeast", "region_any", "small_school"], tuition: "$28,000/yr", netPrice: "$12,000/yr avg after aid", acceptance: "34%", strengths: ["STEM", "Pre-Med", "Social Sciences", "Arts"], note: "#1 HBCU for women — extraordinary grad school pipeline" },
  { name: "Morehouse College", location: "Atlanta, GA", type: "HBCU · Men's", tags: ["hbcu_strong", "hbcu_open", "gpa_high", "gpa_mid", "region_southeast", "region_any", "small_school"], tuition: "$28,000/yr", netPrice: "$13,000/yr avg after aid", acceptance: "58%", strengths: ["Business", "Pre-Med", "Humanities", "Law"], note: "Most prestigious HBCU for men — elite alumni network" },
  { name: "NC A&T State University", location: "Greensboro, NC", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "hbcu_consider", "gpa_mid", "gpa_low", "region_southeast", "budget_tight", "stem"], tuition: "$7,500/yr in-state", netPrice: "$5,000/yr avg after aid", acceptance: "64%", strengths: ["Engineering", "Agriculture", "Business", "STEM"], note: "Largest HBCU in the US — massive engineering program, very affordable" },
  { name: "Florida A&M University", location: "Tallahassee, FL", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "gpa_mid", "region_southeast", "budget_tight", "business"], tuition: "$5,800/yr in-state", netPrice: "$4,200/yr avg after aid", acceptance: "32%", strengths: ["Pharmacy", "Business", "Law", "Engineering"], note: "Top pharmacy and business programs — very affordable in-state" },
  { name: "Hampton University", location: "Hampton, VA", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "hbcu_consider", "gpa_mid", "region_southeast", "region_northeast"], tuition: "$26,000/yr", netPrice: "$11,000/yr avg after aid", acceptance: "33%", strengths: ["Business", "Nursing", "Architecture", "Sciences"], note: "Beautiful waterfront campus — strong professional programs" },
  { name: "Xavier University of Louisiana", location: "New Orleans, LA", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "gpa_high", "gpa_mid", "region_south", "healthcare", "grad_school"], tuition: "$24,000/yr", netPrice: "$10,000/yr avg after aid", acceptance: "65%", strengths: ["Pre-Med", "Pharmacy", "Biology", "Chemistry"], note: "#1 in placing Black students into med school — incredible pre-med program" },
  { name: "Clark Atlanta University", location: "Atlanta, GA", type: "HBCU", tags: ["hbcu_strong", "hbcu_open", "hbcu_consider", "gpa_mid", "gpa_low", "region_southeast", "business"], tuition: "$25,000/yr", netPrice: "$9,000/yr avg after aid", acceptance: "43%", strengths: ["Business", "Communications", "Social Work", "Arts"], note: "Part of Atlanta University Center — access to all AUC resources" },
  // State Flagships
  { name: "University of North Carolina", location: "Chapel Hill, NC", type: "Public Flagship", tags: ["in_state", "region_southeast", "gpa_high", "gpa_mid", "prestige", "balanced"], tuition: "$9,000/yr in-state", netPrice: "$6,500/yr avg after aid", acceptance: "17%", strengths: ["Business", "Journalism", "Pre-Med", "Public Health"], note: "Public Ivy — nationally respected degree, excellent value in-state" },
  { name: "Georgia Tech", location: "Atlanta, GA", type: "Public Flagship", tags: ["in_state", "region_southeast", "gpa_high", "stem", "career_fast", "roi"], tuition: "$12,000/yr in-state", netPrice: "$9,000/yr avg after aid", acceptance: "17%", strengths: ["Engineering", "Computer Science", "Business", "Architecture"], note: "Top 5 engineering school — elite recruiting pipeline to tech and finance" },
  { name: "University of Florida", location: "Gainesville, FL", type: "Public Flagship", tags: ["in_state", "region_southeast", "gpa_high", "gpa_mid", "balanced", "large_school"], tuition: "$6,200/yr in-state", netPrice: "$4,800/yr avg after aid", acceptance: "23%", strengths: ["Business", "Engineering", "Pre-Med", "Agriculture"], note: "One of the best public university values in the country" },
  { name: "UT Austin", location: "Austin, TX", type: "Public Flagship", tags: ["in_state", "region_south", "gpa_high", "gpa_mid", "business", "stem", "career_fast"], tuition: "$11,000/yr in-state", netPrice: "$8,000/yr avg after aid", acceptance: "29%", strengths: ["Business", "Engineering", "Liberal Arts", "Law"], note: "Texas's elite public — strong recruiting from tech and energy sectors" },
  { name: "University of Maryland", location: "College Park, MD", type: "Public Flagship", tags: ["in_state", "region_northeast", "gpa_high", "gpa_mid", "stem", "business"], tuition: "$10,000/yr in-state", netPrice: "$7,500/yr avg after aid", acceptance: "44%", strengths: ["Computer Science", "Business", "Engineering", "Public Policy"], note: "Close to DC — excellent internship and government job access" },
  // Competitive Private
  { name: "Emory University", location: "Atlanta, GA", type: "Private Research", tags: ["prestige", "region_southeast", "gpa_high", "test_high", "grad_school", "healthcare"], tuition: "$56,000/yr", netPrice: "$22,000/yr avg after aid", acceptance: "11%", strengths: ["Pre-Med", "Business", "Law", "Public Health"], note: "Strong financial aid — meets 100% of demonstrated need" },
  { name: "Georgetown University", location: "Washington, DC", type: "Private Research", tags: ["prestige", "region_northeast", "gpa_high", "test_high", "law", "grad_school"], tuition: "$58,000/yr", netPrice: "$28,000/yr avg after aid", acceptance: "12%", strengths: ["International Relations", "Law", "Business", "Pre-Med"], note: "Best school for law and international careers — DC network unmatched" },
  { name: "Vanderbilt University", location: "Nashville, TN", type: "Private Research", tags: ["prestige", "region_southeast", "gpa_high", "test_high", "grad_school", "balanced"], tuition: "$58,000/yr", netPrice: "$17,000/yr avg after aid", acceptance: "7%", strengths: ["Medicine", "Engineering", "Education", "Business"], note: "Meets 100% of need — one of the most generous financial aid packages in the country" },
  { name: "Wake Forest University", location: "Winston-Salem, NC", type: "Private Research", tags: ["prestige", "region_southeast", "gpa_high", "gpa_mid", "business", "balanced", "small_school"], tuition: "$60,000/yr", netPrice: "$25,000/yr avg after aid", acceptance: "21%", strengths: ["Business", "Pre-Med", "Law", "Communications"], note: "Strong MBA and law school feeder — excellent career placement" },
  // Community College
  { name: "Northern Virginia CC → UVA Transfer", location: "Virginia", type: "CC → Transfer", tags: ["community_college", "transfer", "region_northeast", "budget_tight", "no_debt"], tuition: "$5,000/yr CC", netPrice: "$3,000/yr avg after aid", acceptance: "Open enrollment", strengths: ["Any major", "Pre-Transfer Programs", "Business", "STEM"], note: "Guaranteed transfer to UVA and other VA schools with qualifying GPA" },
  { name: "Miami Dade College → State University", location: "Miami, FL", type: "CC → Transfer", tags: ["community_college", "transfer", "region_southeast", "budget_tight", "no_debt", "pell"], tuition: "$3,500/yr", netPrice: "$0/yr for Pell recipients", acceptance: "Open enrollment", strengths: ["Any major", "Business", "Healthcare", "Technology"], note: "Florida AA degree guarantees transfer to any state university" },
  { name: "Montgomery College → UMD Transfer", location: "Maryland", type: "CC → Transfer", tags: ["community_college", "transfer", "region_northeast", "budget_tight", "no_debt"], tuition: "$5,500/yr", netPrice: "$2,000/yr avg after aid", acceptance: "Open enrollment", strengths: ["Business", "STEM", "Nursing", "Computer Science"], note: "Direct transfer partnership with University of Maryland" },
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
function scorePathways(allAnswers, questions) {
  const tagCounts = {};
  allAnswers.forEach((selectedIndices, qIdx) => {
    const q = questions[qIdx];
    if (!q) return;
    selectedIndices.forEach(optIdx => {
      const tags = q.options[optIdx]?.tags || [];
      tags.forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
    });
  });

  return PATHWAYS.map(p => {
    let score = 0;
    p.tags.forEach(tag => { score += (tagCounts[tag] || 0) * 2; });
    const maxP = p.tags.length * 2 * 3;
    const pct = Math.min(Math.max(Math.round((score / maxP) * 100), 22), 97);
    return { ...p, score: pct };
  }).sort((a, b) => b.score - a.score);
}

function scoreSchools(allAnswers) {
  const allTags = [];
  const allQuestions = [...FREE_QUESTIONS, ...PREMIUM_QUESTIONS];
  allAnswers.forEach((selectedIndices, qIdx) => {
    const q = allQuestions[qIdx];
    if (!q) return;
    selectedIndices.forEach(optIdx => {
      const tags = q.options[optIdx]?.tags || [];
      allTags.push(...tags);
    });
  });
  const tagCounts = {};
  allTags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; });

  return SCHOOL_DATABASE.map(school => {
    let score = 0;
    school.tags.forEach(tag => { score += (tagCounts[tag] || 0) * 3; });
    return { ...school, score };
  }).sort((a, b) => b.score - a.score).slice(0, 8);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function ProgressBar({ current, total, isPremium }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontFamily: T.mono, color: isPremium ? T.gold : T.inkMid, letterSpacing: "0.2em" }}>
          {isPremium ? "✦ PREMIUM" : "FREE"}
        </span>
        <span style={{ fontSize: 10, fontFamily: T.mono, color: T.inkDim }}>{current}/{total}</span>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: i === current - 1 ? 3 : 1, height: 3, borderRadius: 2,
            background: i < current
              ? isPremium ? T.gold : T.accent
              : T.border,
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

function OptionBtn({ opt, selected, onToggle, isMulti, disabled }) {
  return (
    <button onClick={() => !disabled && onToggle()} style={{
      display: "flex", alignItems: "center", gap: 14,
      background: selected ? T.accentBg : disabled ? T.surface : T.card,
      border: `1.5px solid ${selected ? T.accent : T.border}`,
      borderRadius: 12, padding: "13px 16px",
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left", width: "100%",
      transition: "all 0.15s", opacity: disabled ? 0.35 : 1,
    }}>
      <span style={{ fontSize: 20, width: 26, textAlign: "center", flexShrink: 0 }}>{opt.icon}</span>
      <span style={{ fontSize: 14, color: selected ? T.accent : T.ink, fontFamily: T.sans, flex: 1, lineHeight: 1.4, fontWeight: selected ? 500 : 400 }}>{opt.label}</span>
      <div style={{
        width: 18, height: 18, borderRadius: isMulti ? 4 : "50%", flexShrink: 0,
        border: `2px solid ${selected ? T.accent : T.border}`,
        background: selected ? T.accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "#fff", fontWeight: 700,
      }}>{selected ? "✓" : ""}</div>
    </button>
  );
}

function PathwayCard({ pathway, rank, expanded, onToggle, showSchools }) {
  const medals = ["🎯", "✅", "📋"];
  return (
    <div style={{
      background: T.card,
      border: `1.5px solid ${expanded ? pathway.color + "70" : T.border}`,
      borderRadius: 16, overflow: "hidden", marginBottom: 12,
      boxShadow: expanded ? `0 8px 32px rgba(0,0,0,0.06)` : "none",
      transition: "all 0.2s",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "20px 24px", textAlign: "left",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          width: 50, height: 50, borderRadius: 12, flexShrink: 0,
          background: pathway.accentBg, border: `1px solid ${pathway.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>{pathway.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            {rank < 3 && <span style={{ fontSize: 14 }}>{medals[rank]}</span>}
            {rank === 0 && <span style={{ fontSize: 9, fontFamily: T.mono, fontWeight: 700, color: pathway.accent, border: `1px solid ${pathway.accent}`, padding: "2px 8px", borderRadius: 10, letterSpacing: "0.12em" }}>BEST FIT</span>}
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, color: T.ink, fontFamily: T.sans }}>{pathway.title}</div>
          <div style={{ fontSize: 12, color: T.inkMid, fontFamily: T.mono, marginTop: 2 }}>{pathway.headline}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: pathway.accent, fontFamily: T.mono, lineHeight: 1 }}>{pathway.score}%</div>
          <div style={{ fontSize: 9, color: T.inkDim, fontFamily: T.mono }}>match</div>
        </div>
        <span style={{ color: T.inkDim, fontSize: 12, marginLeft: 4 }}>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div style={{ padding: "4px 24px 28px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.8, margin: "18px 0 20px", fontFamily: T.sans, borderLeft: `3px solid ${pathway.color}`, paddingLeft: 14 }}>{pathway.summary}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.18em", color: T.inkDim, marginBottom: 10 }}>WHY CONSIDER THIS PATH</div>
            {pathway.whyConsider.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: pathway.accent, fontSize: 11, marginTop: 3, flexShrink: 0 }}>✦</span>
                <span style={{ fontSize: 13, color: T.inkMid, lineHeight: 1.5, fontFamily: T.sans }}>{w}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "💰 COST RANGE", val: pathway.costRange },
              { label: "🎓 TIMELINE", val: pathway.timeline },
              { label: "💡 FINANCIAL AID", val: pathway.aidNote },
              { label: "📈 OUTCOMES", val: pathway.outcomes },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: T.surface, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.12em", color: T.inkDim, marginBottom: 5 }}>{label}</div>
                <div style={{ fontSize: 12, color: T.inkMid, lineHeight: 1.5, fontFamily: T.sans }}>{val}</div>
              </div>
            ))}
          </div>

          {!showSchools ? (
            <div>
              <div style={{ fontSize: 9, fontFamily: T.mono, letterSpacing: "0.18em", color: T.inkDim, marginBottom: 10 }}>EXAMPLE SCHOOLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
                {pathway.schools_free.map(s => (
                  <span key={s} style={{ fontSize: 11, fontFamily: T.mono, color: pathway.accent, border: `1px solid ${pathway.color}30`, padding: "4px 10px", borderRadius: 16 }}>{s}</span>
                ))}
              </div>
            </div>
          ) : null}

          <div style={{ background: pathway.accentBg, border: `1px solid ${pathway.color}20`, borderRadius: 10, padding: "12px 16px" }}>
            <span style={{ fontSize: 10, fontFamily: T.mono, fontWeight: 700, color: pathway.accent, letterSpacing: "0.12em" }}>WATCH OUT  </span>
            <span style={{ fontSize: 13, color: T.inkMid, fontFamily: T.sans, lineHeight: 1.6 }}>{pathway.watchOut}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SchoolCard({ school, rank }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: T.card, border: `1.5px solid ${open ? T.accent + "60" : T.border}`,
      borderRadius: 14, overflow: "hidden", marginBottom: 8, transition: "all 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "16px 20px", textAlign: "left", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: T.accentBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontFamily: T.mono, fontWeight: 700, color: T.accent,
        }}>#{rank + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, fontFamily: T.sans }}>{school.name}</div>
          <div style={{ fontSize: 11, color: T.inkMid, fontFamily: T.mono }}>{school.location} · {school.type}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green, fontFamily: T.mono }}>{school.netPrice}</div>
          <div style={{ fontSize: 9, color: T.inkDim, fontFamily: T.mono }}>avg net price</div>
        </div>
        <span style={{ color: T.inkDim, fontSize: 11, marginLeft: 4 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "4px 20px 20px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontSize: 13, color: T.inkMid, lineHeight: 1.7, margin: "14px 0 14px", fontFamily: T.sans, fontStyle: "italic" }}>{school.note}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "STICKER PRICE", val: school.tuition },
              { label: "ACCEPTANCE RATE", val: school.acceptance },
              { label: "NET PRICE", val: school.netPrice },
            ].map(s => (
              <div key={s.label} style={{ background: T.surface, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 9, fontFamily: T.mono, color: T.inkDim, letterSpacing: "0.1em", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: T.ink, fontFamily: T.mono, fontWeight: 700 }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 9, fontFamily: T.mono, color: T.inkDim, letterSpacing: "0.15em", marginBottom: 7 }}>TOP STRENGTHS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {school.strengths.map(s => (
              <span key={s} style={{ fontSize: 11, fontFamily: T.mono, color: T.accent, border: `1px solid ${T.accent}30`, padding: "3px 10px", borderRadius: 12 }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PREMIUM GATE ─────────────────────────────────────────────────────────────
function PremiumGate({ onUpgrade, onContinue }) {
  return (
    <div style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
        <h2 style={{ fontSize: "clamp(24px,5vw,36px)", fontFamily: T.ff, fontWeight: 400, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          You have your pathway.
        </h2>
        <p style={{ fontSize: 15, color: T.inkMid, lineHeight: 1.7, fontFamily: T.sans, maxWidth: 420, margin: "0 auto" }}>
          Want specific school recommendations with net price, acceptance rate, and how well each school matches your actual profile?
        </p>
      </div>

      <div style={{ background: `linear-gradient(135deg, #F0EDE6, #E8E4DC)`, border: `1.5px solid ${T.gold}44`, borderRadius: 16, padding: "24px", marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontFamily: T.mono, color: T.gold, letterSpacing: "0.2em", marginBottom: 12 }}>✦ PREMIUM — 5 MORE QUESTIONS</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: T.ink, fontFamily: T.sans, marginBottom: 14 }}>Unlock real school recommendations</div>
        {[
          "Up to 8 specific schools matched to your profile",
          "Net price after financial aid for each school",
          "Acceptance rate and your likelihood of admission",
          "Side-by-side comparison of your top matches",
          "Unlock Nova coaching on your college decision",
        ].map(f => (
          <div key={f} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
            <span style={{ color: T.gold, fontSize: 12, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 13, color: T.inkMid, fontFamily: T.sans }}>{f}</span>
          </div>
        ))}
        <button onClick={onUpgrade} style={{
          width: "100%", marginTop: 16,
          background: `linear-gradient(135deg, ${T.gold}, ${T.accentDeep || "#B8743A"})`,
          border: "none", color: "#fff", padding: "14px", borderRadius: 10,
          fontSize: 14, fontFamily: T.mono, fontWeight: 700, cursor: "pointer",
          letterSpacing: "0.06em",
        }}>UNLOCK SCHOOL RECOMMENDATIONS →</button>
      </div>

      <button onClick={onContinue} style={{
        width: "100%", background: "transparent", border: `1.5px solid ${T.border}`,
        color: T.inkMid, padding: "13px", borderRadius: 10,
        fontSize: 13, fontFamily: T.mono, cursor: "pointer", letterSpacing: "0.05em",
      }}>View my free pathway results →</button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function CollegeQuiz() {
  const [phase, setPhase] = useState("intro"); // intro | free_quiz | gate | premium_quiz | results_free | results_premium
  const [qIdx, setQIdx] = useState(0);
  const [freeAnswers, setFreeAnswers] = useState(Array.from({ length: FREE_QUESTIONS.length }, () => []));
  const [premiumAnswers, setPremiumAnswers] = useState(Array.from({ length: PREMIUM_QUESTIONS.length }, () => []));
  const [pathways, setPathways] = useState(null);
  const [schools, setSchools] = useState(null);
  const [expanded, setExpanded] = useState(0);

  const isFree = phase === "free_quiz";
  const isPremium = phase === "premium_quiz";
  const q = isFree ? FREE_QUESTIONS[qIdx] : isPremium ? PREMIUM_QUESTIONS[qIdx] : null;
  const sel = isFree ? freeAnswers[qIdx] : isPremium ? premiumAnswers[qIdx] : [];
  const isMulti = q?.type === "multi";

  function toggle(i) {
    if (isFree) {
      setFreeAnswers(prev => prev.map((s, qi) => {
        if (qi !== qIdx) return s;
        if (!isMulti) return s.includes(i) ? [] : [i];
        if (s.includes(i)) return s.filter(x => x !== i);
        if (s.length >= (q.max || 99)) return s;
        return [...s, i];
      }));
    } else {
      setPremiumAnswers(prev => prev.map((s, qi) => {
        if (qi !== qIdx) return s;
        if (!isMulti) return s.includes(i) ? [] : [i];
        if (s.includes(i)) return s.filter(x => x !== i);
        if (s.length >= (q.max || 99)) return s;
        return [...s, i];
      }));
    }
  }

  function next() {
    if (sel.length === 0) return;
    if (isFree) {
      if (qIdx + 1 >= FREE_QUESTIONS.length) {
        const p = scorePathways(freeAnswers, FREE_QUESTIONS);
        setPathways(p);
        setPhase("gate");
      } else setQIdx(qIdx + 1);
    } else {
      if (qIdx + 1 >= PREMIUM_QUESTIONS.length) {
        const allAnswers = [...freeAnswers, ...premiumAnswers];
        const p = scorePathways(allAnswers, [...FREE_QUESTIONS, ...PREMIUM_QUESTIONS]);
        const s = scoreSchools(allAnswers);
        setPathways(p);
        setSchools(s);
        setPhase("results_premium");
      } else setQIdx(qIdx + 1);
    }
  }

  function startPremium() {
    setQIdx(0);
    setPhase("premium_quiz");
  }

  function viewFreeResults() { setPhase("results_free"); }

  function back() {
    if (qIdx > 0) setQIdx(qIdx - 1);
    else if (isPremium) { setPhase("gate"); setQIdx(0); }
  }

  function restart() {
    setPhase("intro"); setQIdx(0);
    setFreeAnswers(Array.from({ length: FREE_QUESTIONS.length }, () => []));
    setPremiumAnswers(Array.from({ length: PREMIUM_QUESTIONS.length }, () => []));
    setPathways(null); setSchools(null); setExpanded(0);
  }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>

        {/* ── INTRO ── */}
        {phase === "intro" && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 0", animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: "0.3em", marginBottom: 20 }}>LIFEPATH · COLLEGE DECISION</div>
            <h1 style={{ fontSize: "clamp(44px,9vw,80px)", fontFamily: T.ff, fontWeight: 400, color: T.ink, margin: "0 0 6px", lineHeight: 1, letterSpacing: "-0.025em" }}>
              Find your<br />right path.
            </h1>
            <div style={{ width: 60, height: 3, background: T.accent, borderRadius: 2, margin: "20px 0 24px" }} />
            <p style={{ fontSize: 16, color: T.inkMid, lineHeight: 1.8, maxWidth: 460, margin: "0 0 32px", fontFamily: T.sans }}>
              10 questions that match you to the college pathway that actually fits your goals, finances, and life — not just your GPA. Premium users get specific school recommendations with real financial aid data.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 36, maxWidth: 440 }}>
              {[
                { icon: "🎓", label: "HBCU Track", color: T.accent },
                { icon: "🏛️", label: "State Flagship", color: T.green },
                { icon: "🔀", label: "CC → Transfer", color: T.gold },
                { icon: "⚡", label: "Trade / Technical", color: T.purple },
                { icon: "🏆", label: "Competitive University", color: T.coral },
                { icon: "📖", label: "Liberal Arts", color: T.teal },
              ].map(p => (
                <div key={p.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, fontFamily: T.mono, color: p.color, fontWeight: 700 }}>{p.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setPhase("free_quiz")} style={{
                background: T.ink, color: "#fff", border: "none",
                padding: "15px 36px", borderRadius: 30,
                fontSize: 14, fontFamily: T.mono, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.06em",
              }}>START FREE QUIZ →</button>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 16 }}>
              <span style={{ fontSize: 11, color: T.inkDim, fontFamily: T.mono }}>10 questions free</span>
              <span style={{ fontSize: 11, color: T.gold, fontFamily: T.mono }}>✦ +5 questions for school recommendations</span>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {(isFree || isPremium) && q && (
          <div style={{ paddingTop: 40, paddingBottom: 100 }}>
            <ProgressBar
              current={qIdx + 1}
              total={isFree ? FREE_QUESTIONS.length : PREMIUM_QUESTIONS.length}
              isPremium={isPremium}
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {isPremium && <span style={{ fontSize: 10, fontFamily: T.mono, color: T.gold }}>✦</span>}
                <span style={{ fontSize: 10, fontFamily: T.mono, color: isPremium ? T.gold : T.inkMid, letterSpacing: "0.2em" }}>{q.category.toUpperCase()}</span>
              </div>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.inkDim }}>Q{q.num}</span>
            </div>

            <h2 style={{ fontSize: "clamp(20px,4vw,28px)", fontFamily: T.ff, fontWeight: 400, color: T.ink, margin: "0 0 6px", lineHeight: 1.3, letterSpacing: "-0.015em" }}>{q.question}</h2>
            <p style={{ fontSize: 11, color: T.inkDim, fontFamily: T.mono, margin: "0 0 20px", letterSpacing: "0.05em" }}>
              {q.instruction}
              {isMulti && q.max && <span style={{ color: T.accent }}> · {sel.length}/{q.max} selected</span>}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {q.options.map((opt, i) => (
                <OptionBtn key={i} opt={opt} selected={sel.includes(i)} onToggle={() => toggle(i)} isMulti={isMulti} disabled={isMulti && !sel.includes(i) && sel.length >= (q.max || 99)} />
              ))}
            </div>

            <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 640, background: T.bg + "F0", backdropFilter: "blur(12px)", borderTop: `1px solid ${T.border}`, padding: "14px 20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50 }}>
              <button onClick={back} style={{ background: "none", border: `1px solid ${T.border}`, color: (qIdx > 0 || isPremium) ? T.inkMid : "transparent", fontFamily: T.mono, fontSize: 12, cursor: (qIdx > 0 || isPremium) ? "pointer" : "default", padding: "9px 18px", borderRadius: 20, borderColor: (qIdx > 0 || isPremium) ? T.border : "transparent" }}>← Back</button>
              <span style={{ fontSize: 11, color: T.inkDim, fontFamily: T.mono }}>{sel.length > 0 ? `${sel.length} selected` : "select to continue"}</span>
              <button onClick={next} style={{ background: sel.length > 0 ? T.ink : T.border, border: "none", color: sel.length > 0 ? "#fff" : T.inkMid, padding: "10px 24px", borderRadius: 20, fontSize: 13, fontFamily: T.mono, fontWeight: 700, cursor: sel.length > 0 ? "pointer" : "default", transition: "all 0.15s", letterSpacing: "0.06em" }}>
                {(isFree && qIdx + 1 === FREE_QUESTIONS.length) || (isPremium && qIdx + 1 === PREMIUM_QUESTIONS.length) ? "SEE RESULTS →" : "NEXT →"}
              </button>
            </div>
          </div>
        )}

        {/* ── PREMIUM GATE ── */}
        {phase === "gate" && <PremiumGate onUpgrade={startPremium} onContinue={viewFreeResults} />}

        {/* ── FREE RESULTS ── */}
        {phase === "results_free" && pathways && (
          <div style={{ paddingTop: 48, paddingBottom: 60, animation: "fadeUp 0.5s ease" }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.accent, letterSpacing: "0.3em", marginBottom: 12 }}>YOUR PATHWAY</div>
              <h2 style={{ fontSize: "clamp(32px,6vw,52px)", fontFamily: T.ff, fontWeight: 400, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.025em", lineHeight: 1 }}>Your college paths.</h2>
              <p style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.7, fontFamily: T.sans }}>Based on your goals, finances, and priorities — here are the paths that fit you best. Tap each to see the full breakdown.</p>
            </div>

            {pathways.slice(0, 4).map((p, i) => (
              <PathwayCard key={p.id} pathway={p} rank={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? -1 : i)} showSchools={false} />
            ))}

            <div style={{ background: `linear-gradient(135deg, #F5F0E8, #EDE8DC)`, border: `1.5px solid ${T.gold}44`, borderRadius: 14, padding: "20px 22px", marginBottom: 20, marginTop: 8 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.gold, letterSpacing: "0.18em", marginBottom: 8 }}>✦ WANT SPECIFIC SCHOOLS?</div>
              <p style={{ fontSize: 14, color: T.inkMid, fontFamily: T.sans, lineHeight: 1.6, margin: "0 0 14px" }}>Answer 5 more questions to get up to 8 real school recommendations with net price after aid, acceptance rates, and how well each matches your profile.</p>
              <button onClick={startPremium} style={{ background: T.gold, border: "none", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 13, fontFamily: T.mono, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>GET SCHOOL RECOMMENDATIONS →</button>
            </div>

            <button onClick={restart} style={{ background: "none", border: `1px solid ${T.border}`, color: T.inkMid, fontSize: 12, fontFamily: T.mono, cursor: "pointer", padding: "10px 24px", borderRadius: 20, letterSpacing: "0.08em" }}>↩ Retake Quiz</button>
          </div>
        )}

        {/* ── PREMIUM RESULTS ── */}
        {phase === "results_premium" && pathways && schools && (
          <div style={{ paddingTop: 48, paddingBottom: 60, animation: "fadeUp 0.5s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.gold, letterSpacing: "0.25em" }}>✦ PREMIUM RESULTS</div>
            </div>
            <h2 style={{ fontSize: "clamp(30px,6vw,50px)", fontFamily: T.ff, fontWeight: 400, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.025em", lineHeight: 1 }}>Your schools &<br />pathways.</h2>
            <p style={{ fontSize: 14, color: T.inkMid, lineHeight: 1.7, fontFamily: T.sans, marginBottom: 32 }}>Matched to your GPA, region, finances, and goals. Net price shown is the average after financial aid — not the sticker price.</p>

            {/* School recommendations */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.2em", color: T.gold, marginBottom: 14 }}>✦ YOUR SCHOOL MATCHES</div>
              {schools.map((s, i) => <SchoolCard key={s.name} school={s} rank={i} />)}
            </div>

            {/* Pathways */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontFamily: T.mono, letterSpacing: "0.2em", color: T.inkDim, marginBottom: 14 }}>YOUR PATHWAY MATCHES</div>
              {pathways.slice(0, 3).map((p, i) => (
                <PathwayCard key={p.id} pathway={p} rank={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? -1 : i)} showSchools={true} />
              ))}
            </div>

            <button onClick={restart} style={{ background: "none", border: `1px solid ${T.border}`, color: T.inkMid, fontSize: 12, fontFamily: T.mono, cursor: "pointer", padding: "10px 24px", borderRadius: 20, letterSpacing: "0.08em" }}>↩ Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
