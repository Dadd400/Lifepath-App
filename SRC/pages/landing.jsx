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
{ icon: "🎓", title: "College Decision", desc: "4-year, HBCU, community college, or trade — mapped out side by side.", tag: "Free", tagColor: C.green, route: "/quiz/career" },
{ icon: "🌆", title: "City After Graduation", desc: "Simulate life in Atlanta, Charlotte, Houston and 9 more cities.", tag: "Free", tagColor: C.green, route: "/quiz/city-us" },
{ icon: "🌍", title: "Global City Finder", desc: "15 cities across Africa, Europe, Latin America and beyond.", tag: "Free", tagColor: C.green, route: "/quiz/city-global" },
{ icon: "🚪", title: "Exit Strategy Builder", desc: "Is it time to leave your job? Map the timing, financials, and next move.", tag: "Premium", tagColor: C.gold, route: "/onboarding" },
{ icon: "💰", title: "Financial Future", desc: "Net worth at 30, 35, 40 based on the decisions you make right now.", tag: "Premium", tagColor: C.gold, route: "/onboarding" },
{ icon: "👫", title: "Couples Decision Mode", desc: "Both partners answer separately — Nova finds the overlap and builds a joint plan.", tag: "Premium", tagColor: C.gold, route: "/onboarding" },
];

const TESTIMONIALS = [
{ name: "Jordan M.", role: "College Senior, Atlanta", quote: "I was choosing between 4 schools for 6 months. LifePath helped me decide in one afternoon. The simulation showed me things I hadn't thought to compare.", avatar: "J" },
{ name: "Alexis T.", role: "Supply Chain Manager, Charlotte", quote: "I used the exit strategy simulator before leaving my job. It was the first time I could see the decision clearly instead of just feeling anxious about it.", avatar: "A" },
{ name: "Marcus & Priya", role: "Couple, Houston", quote: "Couples mode was exactly what we needed. We had the same fight about moving cities for 2 years. Nova helped us find a path we both actually wanted.", avatar: "M" },
];

const PRICING = [
{
name: "Free",
price: "$0",
period: "forever",
desc: "Start exploring your paths",
color: C.textMid,
features: ["3 simulations per month", "Shareable result cards", "Basic life path comparison", "Save up to 2 scenarios", "3 messages with Nova"],
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
features: ["Unlimited simulations", "Nova AI Coach — full memory", "Work plans + milestone calendars", "Life projections at 25, 30, 35", "Couples Decision Mode", "Exit strategy & career simulations", "Priority support"],
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
features: ["Everything in Premium", "Never pay again", "50 Nova sessions/month", "Early access to new simulations", "Founding member badge", "Direct feedback channel"],
cta: "Get Lifetime Access",
highlight: false,
badge: "Best Value",
route: "/onboarding",
},
];

const FAQS = [
{ q: "What makes LifePath different from a regular quiz app?", a: "Most tools give you a result and move on. LifePath builds you a living plan — Nova remembers your goals, checks in on your progress, and adjusts your path as your life changes." },
{ q: "How does Nova actually remember me?", a: "Your profile is built during onboarding and updated every time you interact. Nova carries context about your goals, your decisions, and your progress into every conversation." },
{ q: "Is this right for me if I'm not in school?", a: "Absolutely. Some of our most engaged users are working professionals 5–10 years into a career who feel stuck or are planning a major pivot." },
{ q: "What's the difference between the one-time payment and subscription?", a: "The subscription gives you unlimited Nova sessions. The lifetime plan is the same experience but you own it forever — Nova sessions are capped at 50/month on lifetime vs. unlimited on subscription." },
{ q: "Can couples use LifePath together?", a: "Yes — Couples Mode lets both partners complete the intake separately and Nova synthesizes your inputs into a shared decision framework." },
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

async function handleSubmit() {
if (!email.includes("@")) return;
// Wire your Kit form ID here:
// await fetch('https://app.kit.com/forms/YOUR_FORM_ID/subscriptions', {
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// body: JSON.stringify({ email_address: email })
// })
setSubmitted(true);
}

return (
<section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px", position: "relative", overflow: "hidden", textAlign: "center" }}>
<div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.accent}18 0%, transparent 70%)`, top: "10%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
<div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.accentGlow, border: `1px solid ${C.accent}33`, borderRadius: 24, padding: "6px 16px", marginBottom: 32, animation: "fadeUp 0.6s ease both" }}>
<NovaOrb size={20} />
<span style={{ fontSize: 12, fontFamily: C.mono, color: C.accentBright, letterSpacing: "0.08em" }}>MEET NOVA — YOUR AI LIFE COACH</span>
</div>
<h1 style={{ fontSize: "clamp(42px, 8vw, 88px)", fontWeight: 300, color: C.text, margin: "0 0 8px", lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: C.ff, animation: "fadeUp 0.6s ease 0.1s both" }}>
Stop guessing.<br />
<span style={{ background: `linear-gradient(135deg, ${C.accentBright}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Simulate your life.</span>
</h1>
<p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: C.textMid, maxWidth: 580, margin: "24px auto 40px", lineHeight: 1.75, fontFamily: C.sans, animation: "fadeUp 0.6s ease 0.2s both" }}>
LifePath helps young adults run simulations on the biggest decisions of their lives — college, career, city, relationships — and builds a real plan to follow through.
</p>
<div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20, animation: "fadeUp 0.6s ease 0.3s both" }}>
{!submitted ? (
<>
<input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "14px 20px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, outline: "none", width: 280 }} />
<button onClick={handleSubmit} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 30, fontSize: 15, fontFamily: C.sans, fontWeight: 600, cursor: "pointer", boxShadow: `0 8px 32px ${C.accent}55`, whiteSpace: "nowrap" }}>Get Early Access →</button>
</>
) : (
<div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 30, padding: "14px 28px", fontSize: 15, color: C.green, fontFamily: C.sans }}>✓ You're on the list — we'll be in touch soon</div>
)}
</div>
<div style={{ fontSize: 12, color: C.textDim, fontFamily: C.mono, animation: "fadeUp 0.6s ease 0.4s both" }}>{count.toLocaleString()} people already on the waitlist · Free forever tier available</div>

{/* CTA buttons to quizzes */}
<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32, animation: "fadeUp 0.6s ease 0.5s both" }}>
<button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 30, fontSize: 14, fontFamily: C.sans, fontWeight: 600, cursor: "pointer" }}>Start Onboarding →</button>
<button onClick={() => window.location.href = "/quiz/career"} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, padding: "14px 28px", borderRadius: 30, fontSize: 14, fontFamily: C.sans, cursor: "pointer" }}>Try a Free Quiz</button>
</div>
</div>
</section>
);
}

function SimsSection() {
const navigate = useNavigate();
const [ref, inView] = useInView();
return (
<section ref={ref} style={{ padding: "100px 24px", background: C.surface }}>
<div style={{ maxWidth: 1100, margin: "0 auto" }}>
<div style={{ textAlign: "center", marginBottom: 60 }}>
<div style={{ fontSize: 10, fontFamily: C.mono, color: C.accent, letterSpacing: "0.3em", marginBottom: 12 }}>SIMULATIONS</div>
<h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 300, color: C.text, fontFamily: C.ff, letterSpacing: "-0.02em", margin: "0 0 16px" }}>Run your future before<br />you live it</h2>
<p style={{ fontSize: 16, color: C.textMid, maxWidth: 480, margin: "0 auto", fontFamily: C.sans, lineHeight: 1.7 }}>Each simulation maps real tradeoffs — salary timelines, debt loads, lifestyle costs, career ceilings — so you can compare paths with actual data.</p>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
{SIMS.map((sim, i) => (
<div key={sim.title} onClick={() => navigate(sim.route)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`, position: "relative", overflow: "hidden", cursor: "pointer" }}>
<div style={{ fontSize: 32, marginBottom: 14 }}>{sim.icon}</div>
<div style={{ fontSize: 16, fontWeight: 500, color: C.text, fontFamily: C.sans, marginBottom: 8 }}>{sim.title}</div>
<p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: "0 0 16px", fontFamily: C.sans }}>{sim.desc}</p>
<span style={{ fontSize: 10, fontFamily: C.mono, fontWeight: 700, color: sim.tagColor, border: `1px solid ${sim.tagColor}44`, padding: "3px 10px", borderRadius: 12, letterSpacing: "0.1em" }}>{sim.tag}</span>
</div>
))}
</div>
</div>
</section>
);
}

function HowItWorks() {
const [ref, inView] = useInView();
const steps = [
{ num: "01", title: "Tell Nova your situation", desc: "A 4-minute onboarding that actually learns who you are — your life stage, what's weighing on you, and how you make decisions.", icon: "🎯" },
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
<div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
<button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 30, fontSize: 14, fontFamily: C.sans, fontWeight: 600, cursor: "pointer" }}>Start Onboarding →</button>
</div>
</div>
</section>
);
}

function Footer() {
return (
<footer style={{ borderTop: `1px solid ${C.border}`, padding: "48px 24px", background: C.surface }}>
<div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<NovaOrb size={28} />
<span style={{ fontSize: 16, color: C.text, fontFamily: C.ff }}>LifePath</span>
</div>
<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
{["Simulations", "Pricing", "About", "Blog", "Privacy", "Terms"].map(l => (
<span key={l} style={{ fontSize: 13, color: C.textDim, fontFamily: C.sans, cursor: "pointer" }}>{l}</span>
))}
</div>
<div style={{ fontSize: 11, color: C.textDim, fontFamily: C.mono }}>© 2025 LifePath · All rights reserved</div>
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
