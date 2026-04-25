import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  bg: "#07070F",
  surface: "#0D0D1A",
  card: "#111120",
  border: "#1A1A30",
  borderBright: "#2E2E55",
  accent: "#7C6FE8",
  accentBright: "#A99FF5",
  accentDeep: "#4A40B8",
  accentGlow: "rgba(124,111,232,0.12)",
  gold: "#D4A843",
  goldLight: "#F0CC70",
  green: "#3DBF7A",
  coral: "#E8705A",
  text: "#EEEEF8",
  textMid: "#7070A0",
  textDim: "#303050",
  ff: "'Cormorant Garamond', 'Garamond', 'Times New Roman', serif",
  sans: "'DM Sans', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

const SIMS = [
  {
    icon: "🎓",
    title: "College Decision Quiz",
    desc: "HBCU, state flagship, community college, or trade — find your right path with real financial aid data and up to 8 matched schools.",
    tag: "Free + Premium",
    tagColor: C.green,
    route: "/quiz/college",
    detail: "10 free questions · 15 for school recommendations",
    highlights: ["6 pathway profiles", "HBCU recommendations", "Net price after aid (Premium)", "8 matched schools (Premium)"],
    color: C.accent,
  },
  {
    icon: "💼",
    title: "Career Path Quiz",
    desc: "14 questions across age, education, aptitude, and work style — matched to 10 career tracks with entry paths, salary ranges, and remote scores.",
    tag: "Free",
    tagColor: C.green,
    route: "/quiz/career",
    detail: "14 questions · 10 career profiles",
    highlights: ["Remote work scores", "Entry paths & salaries", "Industry recommendations", "Dealbreaker filtering"],
    color: C.accentBright,
  },
  {
    icon: "🌆",
    title: "US City Finder",
    desc: "11 questions matching you to 12 US cities — cost, culture, walkability, Black community, job market, weather, safety, and more.",
    tag: "Free",
    tagColor: C.green,
    route: "/quiz/city-us",
    detail: "11 questions · 12 US cities",
    highlights: ["Cultural vibrancy scoring", "Neighborhood guides", "Transit & walkability", "Dealbreaker filtering"],
    color: C.gold,
  },
  {
    icon: "🌍",
    title: "Global City Finder",
    desc: "18 questions. 15 cities across Africa, Europe, Latin America, Southeast Asia, and the Middle East — scored on visa, healthcare, safety, and cost.",
    tag: "Free",
    tagColor: C.green,
    route: "/quiz/city-global",
    detail: "18 questions · 15 global cities",
    highlights: ["Visa ease scoring", "Healthcare & safety", "Black diaspora presence", "Cost of living on USD"],
    color: C.coral,
  },
  {
    icon: "🚪",
    title: "Exit Strategy Builder",
    desc: "Is it time to leave your job? Map the timing, finances, and your next move before you quit.",
    tag: "Premium — Coming Soon",
    tagColor: C.gold,
    route: "/onboarding",
    detail: "Coming soon · Premium only",
    highlights: ["Financial runway calculator", "Job market timing", "Next role simulator", "Nova coaching included"],
    color: C.textMid,
  },
  {
    icon: "👫",
    title: "Couples Decision Mode",
    desc: "Both partners answer separately — Nova finds the overlap and builds a joint plan you both actually want.",
    tag: "Premium — Coming Soon",
    tagColor: C.gold,
    route: "/onboarding",
    detail: "Coming soon · Premium only",
    highlights: ["Separate intake forms", "Conflict resolution framework", "Joint simulation output", "Shared milestone calendar"],
    color: C.textMid,
  },
];

const TESTIMONIALS = [
  { name: "Jordan M.", role: "High School Senior, Atlanta", quote: "I was choosing between 4 schools for 6 months. The college quiz helped me decide in one afternoon — it showed me the actual cost after aid at each school. Changed everything.", avatar: "J" },
  { name: "Alexis T.", role: "Supply Chain Manager, Charlotte", quote: "The career quiz nailed it. I'd been in the wrong lane for 3 years. Seeing the exit strategy path laid out gave me a real plan for the first time instead of just anxiety.", avatar: "A" },
  { name: "DeShawn R.", role: "Recent Grad, Houston", quote: "The US city finder helped me choose between 4 cities after graduation. I matched 87% with Charlotte — moved there 2 months later. Best decision I've made.", avatar: "D" },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Start exploring your paths",
    color: C.textMid,
    features: [
      "All 4 live simulations",
      "Career, College, US Cities, Global Cities",
      "Shareable result cards",
      "Basic pathway profiles",
      "3 messages with Nova",
    ],
    cta: "Start Free",
    highlight: false,
    route: "/onboarding",
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    desc: "The full coaching experience",
    color: C.accent,
    features: [
      "Everything in Free",
      "Nova AI Coach — full memory",
      "College school recommendations",
      "Work plans + milestone calendars",
      "Life projections at 25, 30, 35",
      "Couples Decision Mode",
      "Exit strategy simulator",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
    route: "/onboarding",
  },
  {
    name: "Lifetime",
    price: "$149",
    period: "one-time",
    desc: "Own it forever",
    color: C.gold,
    features: [
      "Everything in Premium",
      "Never pay again",
      "50 Nova sessions/month",
      "Early access to new simulations",
      "Founding member badge",
      "Direct feedback channel",
    ],
    cta: "Get Lifetime Access",
    highlight: false,
    badge: "Best Value",
    route: "/onboarding",
  },
];

const FAQS = [
  { q: "What makes LifePath different from a regular quiz app?", a: "Most tools give you a result and move on. LifePath builds you a living plan — Nova remembers your goals, checks in on your progress, and adjusts your path as your life changes. The simulations don't just tell you what to do, they show you why and walk with you through it." },
  { q: "How does Nova actually remember me?", a: "Your profile is built during onboarding and updated every time you interact. Nova carries context about your goals, decisions, and progress into every conversation — she knows your story." },
  { q: "What's the difference between the College Quiz free and premium tiers?", a: "The free tier gives you 6 pathway profiles (HBCU Track, State Flagship, Community College Transfer, Trade/Technical, Competitive University, Liberal Arts) with detailed guidance. Premium adds 5 questions and unlocks up to 8 specific school recommendations with net price after aid, acceptance rates, and fit scoring." },
  { q: "Is this right for me if I'm not in school?", a: "Absolutely. The career quiz, city finders, and exit strategy simulator are built for working professionals navigating major life decisions. Some of our most engaged users are 5–10 years into a career who feel stuck or are planning a major pivot." },
  { q: "What's the difference between the subscription and lifetime plan?", a: "The subscription gives you unlimited Nova sessions and is best if you're actively working through a decision. The lifetime plan is the same experience but you own it forever — Nova sessions are capped at 50/month vs. unlimited on subscription." },
  { q: "Can couples use LifePath together?", a: "Couples Mode is coming — both partners complete the intake separately and Nova synthesizes your inputs into a shared decision framework. It's been the most requested feature." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function NovaOrb({ size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDeep} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, color: "#fff",
      boxShadow: `0 0 ${size * 0.5}px ${C.accent}44`,
    }}>✦</div>
  );
}

function NavBar({ onGetStarted }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? C.bg + "F0" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s ease", padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NovaOrb size={32} />
          <span style={{ fontSize: 18, fontWeight: 600, color: C.text, fontFamily: C.ff, letterSpacing: "0.02em" }}>LifePath</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[
            { label: "College", route: "/quiz/college" },
            { label: "Career", route: "/quiz/career" },
            { label: "US Cities", route: "/quiz/city-us" },
            { label: "Global", route: "/quiz/city-global" },
          ].map(q => (
            <button key={q.route} onClick={() => navigate(q.route)} style={{ background: "transparent", border: "none", color: C.textMid, padding: "6px 12px", fontSize: 13, fontFamily: C.sans, cursor: "pointer" }}>{q.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onGetStarted} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, padding: "8px 18px", borderRadius: 24, fontSize: 13, fontFamily: C.sans, cursor: "pointer" }}>Sign In</button>
          <button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "9px 20px", borderRadius: 24, fontSize: 13, fontFamily: C.sans, fontWeight: 600, cursor: "pointer", boxShadow: `0 4px 20px ${C.accent}44` }}>Get Started Free</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ onGetStarted }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(2847);
  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}18 0%, transparent 70%)`, top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.accentGlow, border: `1px solid ${C.accent}33`, borderRadius: 24, padding: "6px 16px", marginBottom: 32, animation: "fadeUp 0.6s ease both" }}>
          <NovaOrb size={20} />
          <span style={{ fontSize: 12, fontFamily: C.mono, color: C.accentBright, letterSpacing: "0.08em" }}>MEET NOVA — YOUR AI LIFE COACH</span>
        </div>

        <h1 style={{ fontSize: "clamp(42px, 8vw, 88px)", fontWeight: 300, color: C.text, margin: "0 0 8px", lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: C.ff, animation: "fadeUp 0.6s ease 0.1s both" }}>
          Stop guessing.<br />
          <span style={{ background: `linear-gradient(135deg, ${C.accentBright}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Simulate your life.</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: C.textMid, maxWidth: 580, margin: "24px auto 40px", lineHeight: 1.75, fontFamily: C.sans, animation: "fadeUp 0.6s ease 0.2s both" }}>
          LifePath helps young adults run simulations on the biggest decisions of their lives — college, career, city, relationships — then builds a real plan to follow through.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20, animation: "fadeUp 0.6s ease 0.3s both" }}>
          {!submitted ? (
            <>
              <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email.includes("@") && setSubmitted(true)} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "14px 20px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, outline: "none", width: 280 }} />
              <button onClick={() => email.includes("@") && setSubmitted(true)} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, fontWeight: 600, cursor: "pointer", boxShadow: `0 8px 32px ${C.accent}55`, whiteSpace: "nowrap" }}>Get Early Access →</button>
            </>
          ) : (
            <div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 30, padding: "14px 28px", fontSize: 15, color: C.green, fontFamily: C.sans }}>✓ You're on the list — we'll be in touch soon</div>
          )}
        </div>

        <div style={{ fontSize: 12, color: C.textDim, fontFamily: C.mono, animation: "fadeUp 0.6s ease 0.4s both" }}>{count.toLocaleString()} people already on the waitlist · Free forever tier available</div>

        {/* Quiz quick-access buttons */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 32, animation: "fadeUp 0.6s ease 0.5s both" }}>
          <button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "13px 22px", borderRadius: 30, fontSize: 13, fontFamily: C.sans, fontWeight: 600, cursor: "pointer" }}>Start with Nova →</button>
          {[
            { label: "🎓 College", route: "/quiz/college" },
            { label: "💼 Career", route: "/quiz/career" },
            { label: "🌆 US Cities", route: "/quiz/city-us" },
            { label: "🌍 Global Cities", route: "/quiz/city-global" },
          ].map(q => (
            <button key={q.route} onClick={() => window.location.href = q.route} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, padding: "13px 16px", borderRadius: 30, fontSize: 13, fontFamily: C.sans, cursor: "pointer" }}>{q.label}</button>
          ))}
        </div>

        {/* App preview mockup */}
        <div style={{ marginTop: 60, position: "relative", animation: "fadeUp 0.8s ease 0.5s both" }}>
          <div style={{ background: `linear-gradient(160deg, ${C.card}, ${C.surface})`, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px", maxWidth: 520, margin: "0 auto", boxShadow: `0 40px 120px rgba(0,0,0,0.6)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <NovaOrb size={36} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: C.sans }}>Nova</div>
                <div style={{ fontSize: 10, fontFamily: C.mono, color: C.green }}>● Your LifePath Coach</div>
              </div>
            </div>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px 14px 14px 14px", padding: "14px 16px", marginBottom: 14, textAlign: "left", fontSize: 14, color: C.textMid, lineHeight: 1.7, fontFamily: C.sans }}>
              "You're choosing between Howard and NC A&T. Based on your goals — supply chain career, staying near Atlanta, and minimizing debt — here's how these two paths play out by age 28..."
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Howard Path", value: "84%", sub: "match score", color: C.accent },
                { label: "NC A&T Path", value: "79%", sub: "match score", color: C.green },
                { label: "Est. Salary @ 28", value: "$68K", sub: "supply chain", color: C.textMid },
                { label: "Debt Load", value: "$42K", sub: "with aid", color: C.textMid },
              ].map(s => (
                <div key={s.label} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px", textAlign: "left" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: C.mono }}>{s.value}</div>
                  <div style={{ fontSize: 9, fontFamily: C.mono, color: C.textDim, letterSpacing: "0.1em", margin: "2px 0" }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontSize: 11, color: C.textDim }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SimsSection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const liveSims = SIMS.slice(0, 4);
  const comingSoon = SIMS.slice(4);
  return (
    <section ref={ref} style={{ padding: "100px 24px", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>SIMULATIONS</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: "0 0 16px" }}>4 live simulations.<br />Real decisions. Real data.</h2>
          <p style={{ fontSize: 16, color: C.textMid, maxWidth: 480, margin: "0 auto", fontFamily: C.sans, lineHeight: 1.7 }}>Each quiz maps real tradeoffs — salary timelines, debt loads, cultural fit, visa ease, career ceilings — so you can compare paths with actual numbers.</p>
        </div>

        {/* 4 live quizzes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: 16, marginBottom: 16 }}>
          {liveSims.map((sim, i) => (
            <div key={sim.title} onClick={() => navigate(sim.route)}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "28px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`, cursor: "pointer", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.borderBright}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{ position: "absolute", top: 20, right: 20, display: "flex", alignItems: "center", gap: 5, background: C.green + "15", border: `1px solid ${C.green}33`, borderRadius: 20, padding: "3px 10px" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />
                <span style={{ fontSize: 9, fontFamily: C.mono, color: C.green, fontWeight: 700, letterSpacing: "0.1em" }}>LIVE</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: `${sim.color}18`, border: `1px solid ${sim.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{sim.icon}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: C.text, fontFamily: C.sans, marginBottom: 4 }}>{sim.title}</div>
                  <div style={{ fontSize: 11, fontFamily: C.mono, color: C.textDim, letterSpacing: "0.06em" }}>{sim.detail}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, margin: "0 0 18px", fontFamily: C.sans }}>{sim.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {sim.highlights.map(h => (
                  <span key={h} style={{ fontSize: 10, fontFamily: C.mono, color: C.textMid, border: `1px solid ${C.border}`, padding: "3px 9px", borderRadius: 10 }}>{h}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, fontFamily: C.mono, fontWeight: 700, color: sim.tagColor, border: `1px solid ${sim.tagColor}44`, padding: "3px 10px", borderRadius: 12, letterSpacing: "0.1em" }}>{sim.tag}</span>
                <span style={{ fontSize: 13, fontFamily: C.mono, color: C.accent }}>Take quiz →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div>
          <div style={{ fontSize: 10, fontFamily: C.mono, letterSpacing: "0.2em", color: C.textDim, marginBottom: 12 }}>COMING SOON — PREMIUM</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {comingSoon.map((sim, i) => (
              <div key={sim.title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", opacity: inView ? 0.5 : 0, transition: `opacity 0.5s ease ${(i + 4) * 0.1}s` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ fontSize: 22 }}>{sim.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: C.textMid, fontFamily: C.sans }}>{sim.title}</div>
                    <div style={{ fontSize: 10, fontFamily: C.mono, color: C.textDim }}>{sim.detail}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, margin: 0, fontFamily: C.sans }}>{sim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    { num: "01", title: "Tell Nova your situation", desc: "A 4-minute onboarding that learns who you are — your life stage, what's weighing on you, and how you make decisions.", icon: "🎯" },
    { num: "02", title: "Run your simulation", desc: "Pick a decision you're facing. LifePath maps out how each option plays out — with real numbers, real timelines, and real tradeoffs.", icon: "◈" },
    { num: "03", title: "Get your work plan", desc: "Your simulation becomes a milestone calendar with deadlines, action steps, and everything you need to actually follow through.", icon: "▦" },
    { num: "04", title: "Nova keeps you on track", desc: "Your AI coach checks in, adjusts the plan when life changes, and makes sure you're moving — not just knowing.", icon: "✦" },
  ];
  return (
    <section ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: 0 }}>From overwhelmed to on track<br />in one afternoon</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ padding: "32px 28px", borderLeft: i > 0 ? `1px solid ${C.border}` : "none", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
              <div style={{ fontSize: 11, fontFamily: C.mono, color: C.accentBright, letterSpacing: "0.2em", marginBottom: 16 }}>{step.num}</div>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{step.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text, fontFamily: C.sans, margin: "0 0 10px" }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, margin: 0, fontFamily: C.sans }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "100px 24px", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>REAL PATHS</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: 0 }}>Decisions that actually got made</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
              <div style={{ fontSize: 32, color: C.accent, marginBottom: 16, lineHeight: 1, fontFamily: C.ff }}>"</div>
              <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.8, margin: "0 0 24px", fontFamily: C.sans, fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 600 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: C.sans }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.textDim, fontFamily: C.mono }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [annual, setAnnual] = useState(false);
  return (
    <section ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>PRICING</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Start free. Upgrade when<br />the path gets real.</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: "6px 6px 6px 16px" }}>
            <span style={{ fontSize: 13, color: annual ? C.textMid : C.text, fontFamily: C.sans }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: annual ? C.accent : C.border, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: annual ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </button>
            <span style={{ fontSize: 13, color: annual ? C.text : C.textMid, fontFamily: C.sans }}>Annual</span>
            <span style={{ fontSize: 10, fontFamily: C.mono, color: C.green, background: C.green + "18", border: `1px solid ${C.green}33`, padding: "3px 8px", borderRadius: 10 }}>SAVE 35%</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {PRICING.map((plan, i) => (
            <div key={plan.name} style={{ background: plan.highlight ? `linear-gradient(160deg, #18183A, ${C.card})` : C.card, border: `1px solid ${plan.highlight ? C.accent + "66" : C.border}`, borderRadius: 20, padding: "32px 28px", position: "relative", boxShadow: plan.highlight ? `0 20px 60px ${C.accent}22` : "none", opacity: inView ? 1 : 0, transform: inView ? plan.highlight ? "scale(1.02)" : "none" : "translateY(20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
              {plan.badge && (<div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.highlight ? C.accent : C.gold, color: "#fff", fontSize: 10, fontFamily: C.mono, fontWeight: 700, padding: "4px 14px", borderRadius: 12, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{plan.badge}</div>)}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontFamily: C.mono, color: plan.color, letterSpacing: "0.15em", marginBottom: 8 }}>{plan.name.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 300, color: C.text, fontFamily: C.ff, lineHeight: 1 }}>{plan.period === "per month" && annual ? "$" + (parseFloat(plan.price.replace("$", "")) * 0.65).toFixed(2) : plan.price}</span>
                  <span style={{ fontSize: 13, color: C.textMid, fontFamily: C.sans }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: 13, color: C.textMid, fontFamily: C.sans }}>{plan.desc}</div>
              </div>
              <div style={{ marginBottom: 28 }}>
                {plan.features.map(f => (<div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}><span style={{ color: plan.color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span><span style={{ fontSize: 13, color: C.textMid, fontFamily: C.sans, lineHeight: 1.4 }}>{f}</span></div>))}
              </div>
              <button onClick={() => navigate(plan.route)} style={{ width: "100%", background: plan.highlight ? `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})` : plan.name === "Lifetime" ? `linear-gradient(135deg, ${C.gold}CC, ${C.gold}88)` : "transparent", border: plan.highlight || plan.name === "Lifetime" ? "none" : `1px solid ${C.border}`, color: plan.highlight || plan.name === "Lifetime" ? "#fff" : C.textMid, padding: "13px", borderRadius: 12, fontSize: 14, fontFamily: C.mono, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", boxShadow: plan.highlight ? `0 8px 24px ${C.accent}44` : "none" }}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "100px 24px", background: C.surface }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: 0 }}>Questions you probably have</h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}`, opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16, textAlign: "left" }}>
              <span style={{ fontSize: 16, color: C.text, fontFamily: C.sans, fontWeight: 500, lineHeight: 1.4 }}>{faq.q}</span>
              <span style={{ color: open === i ? C.accent : C.textDim, fontSize: 18, transition: "transform 0.2s, color 0.2s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
            </button>
            {open === i && (<div style={{ fontSize: 15, color: C.textMid, lineHeight: 1.8, fontFamily: C.sans, paddingBottom: 22 }}>{faq.a}</div>)}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ onGetStarted }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section style={{ padding: "120px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 800, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, ${C.accent}15 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
        <NovaOrb size={64} />
        <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.025em", margin: "28px 0 16px", lineHeight: 1.1 }}>
          Your path starts<br />
          <span style={{ background: `linear-gradient(135deg, ${C.accentBright}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>right now.</span>
        </h2>
        <p style={{ fontSize: 17, color: C.textMid, margin: "0 0 40px", lineHeight: 1.7, fontFamily: C.sans }}>Join thousands of young adults who stopped guessing and started simulating.</p>
        {!submitted ? (
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email.includes("@") && setSubmitted(true)} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "14px 22px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, outline: "none", width: 280 }} />
            <button onClick={() => email.includes("@") && setSubmitted(true)} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "14px 30px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, fontWeight: 600, cursor: "pointer", boxShadow: `0 8px 32px ${C.accent}55` }}>Start for Free →</button>
          </div>
        ) : (
          <div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 30, padding: "16px 32px", fontSize: 16, color: C.green, fontFamily: C.sans, display: "inline-block" }}>✓ Welcome to LifePath — check your inbox</div>
        )}
        <div style={{ marginTop: 16, fontSize: 11, color: C.textDim, fontFamily: C.mono }}>No credit card required · Free tier available forever</div>
        <div style={{ marginTop: 24, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "13px 22px", borderRadius: 30, fontSize: 13, fontFamily: C.sans, fontWeight: 600, cursor: "pointer" }}>Start with Nova →</button>
          {[
            { label: "🎓 College Quiz", route: "/quiz/college" },
            { label: "💼 Career Quiz", route: "/quiz/career" },
          ].map(q => (
            <button key={q.route} onClick={() => window.location.href = q.route} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, padding: "13px 16px", borderRadius: 30, fontSize: 13, fontFamily: C.sans, cursor: "pointer" }}>{q.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "48px 24px", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <NovaOrb size={28} />
              <span style={{ fontSize: 16, color: C.text, fontFamily: C.ff }}>LifePath</span>
            </div>
            <p style={{ fontSize: 13, color: C.textDim, fontFamily: C.sans, lineHeight: 1.6, maxWidth: 220 }}>Stop guessing. Simulate your life and build a real plan with Nova, your AI life coach.</p>
          </div>
          <div>
            <div style={{ fontSize: 10, fontFamily: C.mono, color: C.textDim, letterSpacing: "0.15em", marginBottom: 14 }}>LIVE QUIZZES</div>
            {[
              { label: "🎓 College Decision Quiz", route: "/quiz/college" },
              { label: "💼 Career Path Quiz", route: "/quiz/career" },
              { label: "🌆 US City Finder", route: "/quiz/city-us" },
              { label: "🌍 Global City Finder", route: "/quiz/city-global" },
            ].map(q => (
              <div key={q.route} onClick={() => navigate(q.route)} style={{ fontSize: 13, color: C.textMid, fontFamily: C.sans, marginBottom: 10, cursor: "pointer" }}>{q.label}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontFamily: C.mono, color: C.textDim, letterSpacing: "0.15em", marginBottom: 14 }}>COMPANY</div>
            {["About", "Blog", "Pricing", "Privacy", "Terms", "Contact"].map(l => (
              <div key={l} style={{ fontSize: 13, color: C.textMid, fontFamily: C.sans, marginBottom: 10, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: C.textDim, fontFamily: C.mono }}>© 2025 LifePath · All rights reserved</div>
          <div style={{ fontSize: 11, color: C.textDim, fontFamily: C.mono }}>Built with Nova · Powered by Claude</div>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  function handleGetStarted() { navigate("/onboarding"); }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: C.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07070F; }
        input::placeholder { color: #303050; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #07070F; }
        ::-webkit-scrollbar-thumb { background: #1A1A30; border-radius: 2px; }
      `}</style>
      <NavBar onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} />
      <HowItWorks />
      <SimsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
