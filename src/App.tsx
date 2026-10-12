import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactEmail, resumeUrl, roles, aboutParagraphs, whyHireMe, seekingText, jobs, projectGroups, skillGroups, pinnedRepos } from "./content";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function lerpColor(c1: string, c2: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(c1);
  const [r2, g2, b2] = hexToRgb(c2);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

function GradientText({ text, from, to }: { text: string; from: string; to: string }) {
  return (
    <>
      {text.split("").map((char, i) => {
        const t = text.length > 1 ? i / (text.length - 1) : 0;
        return <span key={i} style={{ color: lerpColor(from, to, t) }}>{char}</span>;
      })}
    </>
  );
}

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const taglines = [
  { word: "AI", color: "#990000", glow: "rgba(59,130,246,0.4)" },
  { word: "Investments", color: "#990000", glow: "rgba(245,158,11,0.4)" },
  { word: "Data", color: "var(--cardinal)", glow: "rgba(16,185,129,0.4)" },
  { word: "Strategy", color: "#990000", glow: "rgba(239,68,68,0.4)" },
  { word: "Poker", color: "#990000", glow: "rgba(212,175,55,0.4)" },
];

const commands = [
  { id: "home", label: "Home", category: "Navigate" },
  { id: "about", label: "About", category: "Navigate" },
  { id: "work", label: "Work", category: "Navigate" },
  { id: "projects", label: "Projects", category: "Navigate" },
  { id: "skills", label: "Skills", category: "Navigate" },
  { id: "github", label: "Featured GitHub Projects", category: "Navigate" },
  { id: "contact", label: "Contact", category: "Navigate" },
  { id: "credits", label: "Credits", category: "Navigate" },
];

function Nav({ onNav, onCmd }: { onNav: (id: string) => void; onCmd: () => void }) {
  return (
    <nav className="site-nav" style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      background: "var(--cardinal)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(92,57,43,0.08)", padding: "1.2rem 2rem"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => onNav("home")} style={{
          fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-1px", cursor: "pointer",
          background: "linear-gradient(90deg, #FFCC00 0%, #FFFFFF 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          transition: "all 0.3s"
        }}>A</div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", fontSize: "0.75rem", letterSpacing: "1px" }}>
          {["about", "work", "projects", "skills", "contact"].map(s => (
            <span key={s} onClick={() => onNav(s)} style={{
              color: "var(--muted)", cursor: "pointer", textTransform: "uppercase",
              fontWeight: 500, position: "relative", transition: "color 0.2s"
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cardinal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >{s}</span>
          ))}
          <span onClick={onCmd} style={{
            cursor: "pointer", opacity: 0.6, fontWeight: 600, fontSize: "1.2rem", color: "var(--cardinal)", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.transform = "scale(1)"; }}
          >⌘</span>
        </div>
      </div>
    </nav>
  );
}


const companyMarks: Record<string, {src?: string; initials?: string; dark?: boolean}> = {
  "Cogitative Investments": {initials: "CI"},
  "Easley-Dunn Productions, Inc.": {src: "/brand/easley-dunn.png", dark: true},
  "UTI Alternatives": {src: "/brand/uti-alternatives.svg"},
  "HDFC Securities": {src: "/brand/hdfc-securities.jpg"},
  "Yes Bank Limited": {src: "/brand/yes-bank.png"},
  "Aditya Birla Capital": {src: "/brand/aditya-birla-capital.svg"},
};
function CompanyMark({company}: {company:string}) {
  const mark = companyMarks[company];
  return <div className={`company-mark ${mark?.dark ? "company-mark-dark" : ""}`}>
    {mark?.src ? <img src={mark.src} alt={`${company} logo`} loading="lazy" /> : <span aria-label={`${company} initials`}>{mark?.initials || company.slice(0,2)}</span>}
  </div>;
}
function ProjectVisual({signal}: {signal:boolean}) {
  return <aside className="project-visual" aria-label={signal ? "Illustration of signal scoring inputs" : "Illustration of downside tail risk"}>
    <img className="project-school" src={signal ? "/brand/usc-viterbi.png" : "/brand/usc-marshall.png"} alt={signal ? "USC Viterbi" : "USC Marshall"} loading="lazy" />
    {signal ? <>
      <div className="visual-eyebrow">MARKET DATA × NEWS</div>
      <svg viewBox="0 0 320 235" role="img" aria-label="Trend, momentum, volume and news sentiment feed a weighted scoring engine producing buy, hold or sell signals">
        <defs><linearGradient id="signal-gold"><stop stopColor="#ffcc00"/><stop offset="1" stopColor="#ffe79c"/></linearGradient></defs>
        {[['Trend',35],['Momentum',81],['Volume',127],['Sentiment',173]].map(([t,y])=><g key={t}><rect x="12" y={Number(y)} width="105" height="34" rx="8" fill="#fff" stroke="#d8cdbf"/><text x="64" y={Number(y)+22} textAnchor="middle" fill="#665c55" fontSize="12">{t}</text><path d={`M117 ${Number(y)+17} C150 ${Number(y)+17}, 150 119, 172 119`} fill="none" stroke="#bd978c" strokeWidth="1.5"/></g>)}
        <rect x="172" y="75" width="128" height="88" rx="18" fill="#990000"/>
        <rect x="189" y="91" width="94" height="3" rx="1.5" fill="url(#signal-gold)"/>
        <text x="236" y="119" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">Weighted score</text>
        <text x="236" y="144" textAnchor="middle" fill="#ffcc00" fontSize="17">0 — 100</text>
        <path d="M236 163 V190" stroke="#990000" strokeWidth="1.5"/><rect x="171" y="190" width="130" height="30" rx="8" fill="#fff" stroke="#d8cdbf"/>
        <text x="236" y="210" textAnchor="middle" fill="#990000" fontSize="11" fontWeight="700">BUY · HOLD · SELL</text>
      </svg>
      <p>Explainable inputs. One composite score.</p>
    </> : <>
      <div className="visual-eyebrow">UNDERSTANDING THE LEFT TAIL</div>
      <svg viewBox="0 0 320 235" role="img" aria-label="Illustrative distribution highlighting downside tail risk">
        <defs><linearGradient id="tail-fill" x2="0" y2="1"><stop stopColor="#990000" stopOpacity=".35"/><stop offset="1" stopColor="#990000" stopOpacity=".06"/></linearGradient></defs>
        <path d="M20 180 C55 180,76 164,98 128 C120 78,140 50,160 48 C195 50,210 115,237 150 C255 172,280 180,301 180" fill="none" stroke="#9f8d7f" strokeWidth="2"/>
        <path d="M20 180 C55 180,76 164,98 128 L98 180 Z" fill="url(#tail-fill)" stroke="#990000" strokeWidth="2"/>
        <path d="M20 181 H301" stroke="#d8cdbf"/>
        <path d="M98 128 V193" stroke="#990000" strokeDasharray="4 5"/>
        <text x="56" y="113" textAnchor="middle" fill="#990000" fontSize="13" fontWeight="700">Left tail</text>
        <text x="99" y="210" textAnchor="middle" fill="#665c55" fontSize="11">5% tail threshold</text>
        <text x="229" y="210" textAnchor="middle" fill="#665c55" fontSize="11">Return distribution</text>
      </svg>
      <p>Looking beyond average volatility.</p>
    </>}
    <small>Concept illustration · not performance data</small>
  </aside>;
}

function Hero({ onNav }: { onNav: (id: string) => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [roleFade, setRoleFade] = useState(true);
  const [taglineFade, setTaglineFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % roles.length); setRoleFade(true); }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTaglineFade(false);
      setTimeout(() => { setTaglineIdx(i => (i + 1) % taglines.length); setTaglineFade(true); }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const btnBase: React.CSSProperties = {
    padding: "0.9rem 1.8rem", borderRadius: 6, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s", fontSize: "0.95rem", textDecoration: "none", display: "inline-block", border: "none"
  };

  return (
    <main className="hero" style={{ paddingTop: 100, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 850, padding: "0 2rem", marginTop: "-40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 style={{
            fontSize: "5rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-2px",
            background: "linear-gradient(120deg, #990000 0%, #600000 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>Arjun Deshmukh</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ fontSize: "1.3rem", color: "var(--muted)", marginBottom: "0.8rem", height: 50, display: "flex", alignItems: "center", fontWeight: 600 }}>
            <span style={{ opacity: roleFade ? 1 : 0, transition: "opacity 0.5s ease" }}>
              {roles[roleIdx].text}
              <GradientText
                text={roles[roleIdx].highlight}
                from={roles[roleIdx].from}
                to={roles[roleIdx].to}
              />
            </span>
          </div>

          <div style={{ fontSize: "1.1rem", marginBottom: "2rem", height: 36, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--muted)" }}>Obsessed with</span>
            <span style={{
              color: taglines[taglineIdx].color,
              fontWeight: 700,
              textShadow: "none",
              opacity: taglineFade ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}>{taglines[taglineIdx].word}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}
        >
          <button onClick={() => onNav("contact")}
            style={{ ...btnBase, background: "var(--cardinal)", color: "#FFFFFF" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--cardinal-hover)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--cardinal)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >Let's Talk</button>
          <a href={resumeUrl}
            target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "transparent", color: "var(--muted)", border: "2px solid var(--line)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--muted)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >View CV</a>
          <a href="https://linkedin.com/in/arjun-deshmukh1609" target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "transparent", color: "var(--muted)", border: "2px solid var(--line)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0A66C2"; (e.currentTarget as HTMLAnchorElement).style.color = "#0A66C2"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >LinkedIn</a>
          <a href="https://github.com/ArjunDeshmukh16" target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "transparent", color: "var(--muted)", border: "2px solid var(--line)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#6e7681"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >GitHub</a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ fontSize: "0.875rem", color: "var(--muted)", letterSpacing: "0.3px" }}
        >
          Press{" "}
          <kbd style={{ background: "var(--surface-hover)", border: "1px solid var(--line)", borderRadius: 4, padding: "0.3rem 0.6rem", fontFamily: "Monaco, monospace", fontSize: "0.8rem" }}>⌘</kbd>
          {" "}<kbd style={{ background: "var(--surface-hover)", border: "1px solid var(--line)", borderRadius: 4, padding: "0.3rem 0.6rem", fontFamily: "Monaco, monospace", fontSize: "0.8rem" }}>K</kbd>{" "}
          to navigate →
        </motion.p>
      </div>
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ padding: "100px 2rem 80px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <h2 style={{
          fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-1px",
          background: "linear-gradient(90deg, #990000 0%, #600000 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>{title}</h2>
        <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #990000, #FFCC00)", borderRadius: 2, marginBottom: "2.5rem" }} />
      </FadeIn>
      <div style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--body)" }}>{children}</div>
    </div>
  );
}

function AcademicLogoStrip() {
  return <div className="academic-logo-strip" aria-label="USC university and academic schools">
    <a href="https://www.usc.edu/" target="_blank" rel="noreferrer"><img src="/brand/usc-university-upload.png" alt="University of Southern California" loading="lazy" /></a>
    <a href="https://viterbischool.usc.edu/" target="_blank" rel="noreferrer"><img src="/brand/usc-viterbi-upload.png" alt="USC Viterbi School of Engineering" loading="lazy" /></a>
    <a href="https://www.marshall.usc.edu/" target="_blank" rel="noreferrer"><img src="/brand/usc-marshall-upload.png" alt="USC Marshall School of Business" loading="lazy" /></a>
  </div>;
}

function About({ onNav }: { onNav: (id: string) => void }) {
  void onNav;
  return (
    <Section id="about" title="About">
      <FadeIn delay={0.05}>
        <p style={{ marginBottom: "1.5rem" }}>{aboutParagraphs[0]}</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p style={{ marginBottom: "1.5rem" }}>{aboutParagraphs[1]}</p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p style={{ marginBottom: "1.5rem" }}>{aboutParagraphs[2]}</p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{ marginBottom: "1.5rem" }}>{aboutParagraphs[3]}</p>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div style={{
          background: "rgba(92,57,43,0.04)", borderLeft: "4px solid var(--cardinal)",
          padding: "1.5rem", margin: "2rem 0", borderRadius: 4
        }}>
          <p style={{ color: "var(--ink)", marginBottom: 0 }}>
            <strong style={{ color: "var(--cardinal)" }}>Why Hire Me:</strong>{" "}{whyHireMe}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p style={{ marginBottom: "1.5rem" }}>{seekingText}</p>
        <p style={{ marginBottom: "1.5rem" }}><strong>Top skills:</strong> Communication · Problem Solving · Investment Analysis · Valuation · Equity Research</p>
      </FadeIn>
    </Section>
  );
}

const recommendations = [
  {
    author: "Aaditya Vinayak, Strategy and Products at UTI Alternatives",
    text: "\"As an intern within our investments team, Arjun supported private credit transactions with deal analysis and investment deliverables. He approached assignments methodically with high precision in execution. Arjun demonstrated solid understanding of risk considerations, deal structure, and capital protection. He remains dependable in fast-moving transaction environments with a clear interest in private markets and long-term investing perspective. He would be a strong contributor in investment-focused roles.\""
  },
  {
    author: "Sonali Palande, Strategising Derivative Products at HDFC Securities",
    text: "\"Arjun was part of our team supporting quantitative research and benchmarking efforts related to markets and product strategy. He worked comfortably with data, translating analysis into practical insights that informed real business decisions rather than purely academic outcomes. He is highly motivated, adapts quickly to new concepts, and maintains clarity and discipline. Arjun is a strong fit for roles at the intersection of markets, data analytics, and investment decision-making.\""
  },
];

const lors = [
  { name: "Dr. Deepti Reddy", role: "Associate Professor, Computer Engineering — NMIMS University", url: "/docs/lor-deepti-reddy.pdf" },
  { name: "Prof. Sanjay Deshmukh", role: "Assistant Professor, Computer Engineering — NMIMS University", url: "/docs/lor-sanjay-deshmukh.pdf" },
  { name: "Prof. Krishna Samdani", role: "Assistant Professor, Computer Engineering — NMIMS University", url: "/docs/lor-krishna-samdani.pdf" },
];

function Recommendations() {
  return (
    <div style={{ padding: "0 2rem 80px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <h2 style={{
          fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-1px",
          background: "linear-gradient(90deg, #990000 0%, #600000 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>Recommendations</h2>
        <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #990000, #FFCC00)", borderRadius: 2, marginBottom: "2.5rem" }} />
      </FadeIn>
      {recommendations.map((r, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div style={{
            background: "rgba(92,57,43,0.03)", border: "1px solid rgba(92,57,43,0.08)",
            padding: "1.5rem", marginBottom: "1.5rem", borderRadius: 8
          }}>
            <a
              href="https://www.linkedin.com/in/arjun-deshmukh1609/details/recommendations/"
              target="_blank" rel="noreferrer"
              style={{ display: "block", color: "var(--muted)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
            >{r.author} ↗</a>
            <div style={{ color: "var(--body)", lineHeight: 1.7, fontStyle: "italic" }}>{r.text}</div>
          </div>
        </FadeIn>
      ))}

      <FadeIn delay={0.2}>
        <div style={{ marginTop: "3rem" }}>
          <div style={{ fontWeight: 700, color: "var(--cardinal)", marginBottom: "1.2rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Letters of Recommendation</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {lors.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "1rem 1.25rem", background: "rgba(92,57,43,0.03)",
                border: "1px solid rgba(92,57,43,0.08)", borderRadius: 8,
                textDecoration: "none", transition: "all 0.2s"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.07)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(92,57,43,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.03)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(92,57,43,0.08)"; }}
              >
                <div>
                  <div style={{ color: "var(--ink)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{l.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{l.role}</div>
                </div>
                <span style={{ color: "var(--muted)", fontSize: "0.85rem", whiteSpace: "nowrap", marginLeft: "1rem" }}>View LOR ↗</span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block", padding: "0.2rem 0.55rem", background: "var(--surface-hover)",
      border: "1px solid var(--line)", borderRadius: 4, color: "var(--cardinal)",
      fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.3px"
    }}>{label}</span>
  );
}

function Work() {
  return (
    <Section id="work" title="Experience">
      {jobs.map((job, i) => (
        <FadeIn key={i} delay={i * 0.08}>
          <div className="experience-row" style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: i < jobs.length - 1 ? "1px solid rgba(92,57,43,0.05)" : "none" }}>
            <CompanyMark company={job.company} />
            <div className="experience-copy">
            <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: "0.3rem", fontSize: "1.05rem" }}>{job.title}</div>
            <div style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
              {job.companyUrl ? (<a href={job.companyUrl} target="_blank" rel="noreferrer"
                style={{ color: job.companyColor, fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >{job.company} ↗</a>) : (<span style={{ color: job.companyColor, fontWeight: 600 }}>{job.company}</span>)}, {job.location}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "0.8rem" }}>{job.period}</div>
            <div style={{ color: "var(--body)", lineHeight: 1.7, marginBottom: "0.8rem" }}>{job.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.8rem" }}>
              {job.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            {job.certUrl && (
              <a href={job.certUrl} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.35rem 0.75rem", background: "rgba(92,57,43,0.05)",
                borderRadius: 4, color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem",
                border: "1px solid rgba(92,57,43,0.08)", transition: "all 0.2s"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
              >↗ View Certificate</a>
            )}
            </div>
          </div>
        </FadeIn>
      ))}
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Research & Projects">
      {projectGroups.map((group, gi) => (
        <div key={gi} style={{ marginTop: gi > 0 ? "3rem" : 0 }}>
          <FadeIn delay={0.05}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem", padding: "0.3rem 0.8rem",
              background: "rgba(92,57,43,0.04)", border: `1px solid ${group.labelColor}40`,
              borderRadius: 20
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: group.labelColor, display: "inline-block" }} />
              <span style={{ color: group.labelColor, fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>{group.label}</span>
            </div>
          </FadeIn>
          {group.projects.map((p, i) => (
            <FadeIn key={i} delay={0.05 + i * 0.08}>
              <div className="project-card" style={{
                marginBottom: "2rem", padding: "1.5rem",
                background: "rgba(92,57,43,0.02)", border: "1px solid rgba(92,57,43,0.06)",
                borderRadius: 10, transition: "all 0.25s"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(92,57,43,0.04)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(92,57,43,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(92,57,43,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(92,57,43,0.06)"; }}
              >
                <div className="project-copy">
                <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: "0.3rem", fontSize: "1.05rem" }}>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      style={{ color: "var(--ink)", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--muted)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--ink)")}
                    >{p.title}</a>
                  ) : p.title}
                </div>
                <div style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "0.8rem" }}>{p.meta}</div>
                {p.highlight && (
                  <div style={{
                    display: "inline-block", padding: "0.25rem 0.7rem", marginBottom: "0.8rem",
                    background: "var(--surface-hover)", border: "1px solid var(--line)",
                    borderRadius: 4, color: "var(--cardinal)", fontSize: "0.82rem", fontWeight: 700, fontFamily: "Monaco, monospace"
                  }}>{p.highlight}</div>
                )}
                <div style={{ color: "var(--body)", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.8rem" }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      display: "inline-block", padding: "0.18rem 0.5rem",
                      background: "rgba(92,57,43,0.05)", border: "1px solid rgba(92,57,43,0.1)",
                      borderRadius: 4, color: "var(--muted)", fontSize: "0.72rem", fontWeight: 500
                    }}>{tag}</span>
                  ))}
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.4rem 0.8rem", background: "rgba(92,57,43,0.06)",
                    borderRadius: 4, color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem",
                    transition: "all 0.2s", border: "1px solid rgba(92,57,43,0.08)"
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
                  >↗ GitHub Repo</a>
                )}
                </div>
                <ProjectVisual signal={i === 0} />
              </div>
            </FadeIn>
          ))}
        </div>
      ))}
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills & Certifications">
      {skillGroups.map((s, i) => (
        <FadeIn key={i} delay={i * 0.06}>
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontWeight: 700, color: "var(--cardinal)", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
            <div style={{ color: "var(--body)" }}>{s.text}</div>
          </div>
        </FadeIn>
      ))}
    </Section>
  );
}

function GitHubStats() {
  return (
    <div id="github" style={{ padding: "0 2rem 80px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        {/* Terminal-style header bar */}
        <div style={{
          borderTop: "1px solid rgba(92,57,43,0.08)",
          paddingTop: "3rem",
          marginBottom: "0",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.6rem 1rem",
            background: "rgba(92,57,43,0.03)",
            border: "1px solid rgba(92,57,43,0.07)",
            borderBottom: "none",
            borderRadius: "6px 6px 0 0",
          }}>
            <span style={{
              fontFamily: "'Courier New', 'Menlo', monospace",
              fontSize: "0.72rem", color: "var(--muted)",
              letterSpacing: "0.08em", textTransform: "uppercase"
            }}>
              github / ArjunDeshmukh16 &nbsp;·&nbsp; {pinnedRepos.length} featured repositories
            </span>
            <a href="https://github.com/ArjunDeshmukh16" target="_blank" rel="noreferrer"
              style={{
                fontFamily: "'Courier New', 'Menlo', monospace",
                fontSize: "0.72rem", color: "var(--muted)",
                textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--muted)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >view profile ↗</a>
          </div>
        </div>
      </FadeIn>

      {/* Repo rows */}
      <FadeIn delay={0.05}>
        <div style={{
          border: "1px solid rgba(92,57,43,0.07)",
          borderRadius: "0 0 6px 6px",
          overflow: "hidden",
        }}>
          {pinnedRepos.map((repo, i) => (
            <a key={i} href={repo.url} target="_blank" rel="noreferrer"
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr auto auto",
                alignItems: "center",
                gap: "1rem",
                padding: "0.9rem 1rem",
                borderBottom: i < pinnedRepos.length - 1 ? "1px solid rgba(92,57,43,0.05)" : "none",
                textDecoration: "none",
                background: "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(92,57,43,0.03)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              {/* index */}
              <span style={{
                fontFamily: "'Courier New', 'Menlo', monospace",
                fontSize: "0.72rem", color: "var(--line)",
              }}>{repo.idx}</span>

              {/* repo name */}
              <span style={{
                fontFamily: "'Courier New', 'Menlo', monospace",
                fontSize: "0.88rem", color: "var(--body)",
                letterSpacing: "0.01em",
              }}>{repo.name}</span>

              {/* tags */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {repo.tags.map((tag, t) => (
                  <span key={t} style={{
                    fontFamily: "'Courier New', 'Menlo', monospace",
                    fontSize: "0.68rem", color: "var(--muted)",
                    padding: "0.15rem 0.5rem",
                    border: "1px solid rgba(92,57,43,0.07)",
                    borderRadius: 3,
                    whiteSpace: "nowrap",
                  }}>{tag}</span>
                ))}
              </div>

              {/* arrow */}
              <span style={{ color: "var(--line)", fontSize: "0.8rem" }}>↗</span>
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendEmail = () => {
    if (!name.trim() || !email.trim() || !message.trim()) { setError("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Please enter a valid email address."); return; }
    setError("");
    const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
    const body = encodeURIComponent(`Name: ${name.trim()}\nReply email: ${email.trim()}\n\n${message.trim()}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", background: "var(--surface)",
    border: "1px solid var(--line)", borderRadius: 6, color: "var(--ink)",
    fontFamily: "inherit", fontSize: "1rem", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
  };

  const btnBase: React.CSSProperties = {
    padding: "0.9rem 1.8rem", borderRadius: 6, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s", fontSize: "0.95rem", textDecoration: "none", display: "inline-block", border: "none"
  };

  const linkStyle: React.CSSProperties = { color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" };

  return (
    <Section id="contact" title="Let's Connect">
      <FadeIn delay={0.05}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <a href={resumeUrl}
            target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "var(--cardinal)", color: "#FFFFFF" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--cardinal-hover)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--cardinal)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >View CV</a>
          <a href="https://linkedin.com/in/arjun-deshmukh1609" target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "transparent", color: "var(--muted)", border: "2px solid var(--line)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0A66C2"; (e.currentTarget as HTMLAnchorElement).style.color = "#0A66C2"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >LinkedIn</a>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ maxWidth: 560 }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--ink)" }}>Send me an email</h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.2rem", fontSize: "0.9rem" }}>Opens your email app with a draft to <a href={`mailto:${contactEmail}`} style={{ color: "var(--body)" }}>{contactEmail}</a>.</p>

              {[
                { label: "Name", value: name, setter: setName, type: "text", placeholder: "Jane Smith" },
                { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "jane.smith@gmail.com" },
              ].map(({ label, value, setter, type, placeholder }) => (
                <div key={label} style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontWeight: 600, color: "var(--muted)", marginBottom: "0.4rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</label>
                  <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--cardinal)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--line)")}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: 600, color: "var(--muted)", marginBottom: "0.4rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="What's on your mind?"
                  style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--cardinal)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--line)")}
                />
              </div>
              {error && <p style={{ color: "#EF4444", fontSize: "0.85rem", marginBottom: "0.8rem" }}>{error}</p>}
              <button onClick={sendEmail} style={{
                width: "100%", padding: "0.85rem",
                background: "var(--cardinal)", color: "#FFFFFF",
                border: "none", borderRadius: 6, fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.95rem", transition: "all 0.2s", letterSpacing: "0.3px",
                opacity: 1
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >Open email draft →</button>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p style={{ marginTop: "3rem", color: "var(--muted)", fontSize: "0.95rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}` },
            { label: "LinkedIn", href: "https://linkedin.com/in/arjun-deshmukh1609" },
            { label: "GitHub", href: "https://github.com/ArjunDeshmukh16" },
            { label: "Instagram", href: "https://instagram.com/160991_arjun" },
          ].map((l, i, arr) => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <a href={l.href} target="_blank" rel="noreferrer"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >{l.label}</a>
              {i < arr.length - 1 && <span style={{ color: "var(--line)" }}>|</span>}
            </span>
          ))}
        </p>
      </FadeIn>
    </Section>
  );
}

function Credits() {
  return (
    <Section id="credits" title="Credits">
      <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
        Inspired by{" "}
        <a href="https://parthdesai.site" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Parth Desai</a>{" "}and{" "}
        <a href="https://zenorocha.com" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Zeno Rocha</a>.
        Built with React & TypeScript.
      </p>
      <p style={{ marginTop: "1rem", color: "var(--muted)", fontSize: "0.9rem" }}>© 2026 Arjun Deshmukh. All rights reserved.</p>
    </Section>
  );
}

function CommandPalette({ open, onClose, onNav }: { open: boolean; onClose: () => void; onNav: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  if (!open) return null;
  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(45,25,20,0.5)",
      backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: 120
    }}>
      <div style={{
        width: "90%", maxWidth: 600, background: "var(--surface)", border: "1px solid var(--line)",
        borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(45,25,20,0.5)"
      }}>
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Type a command or search..."
          style={{
            width: "100%", padding: "1rem", background: "var(--surface)", border: "none",
            borderBottom: "1px solid var(--line)", color: "var(--ink)", fontSize: "1rem",
            outline: "none", fontFamily: "inherit", boxSizing: "border-box"
          }}
        />
        <div style={{ maxHeight: 400, overflowY: "auto", padding: "0.5rem" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "var(--muted)" }}>No commands found</div>
          ) : filtered.map(cmd => (
            <button key={cmd.id} onClick={() => { onNav(cmd.id); onClose(); }}
              style={{
                padding: "0.75rem 1rem", marginBottom: "0.25rem", borderRadius: 6, cursor: "pointer",
                background: "transparent", border: "none", color: "var(--body)", width: "100%",
                textAlign: "left", display: "flex", justifyContent: "space-between", fontSize: "0.95rem"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span>{cmd.label}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{cmd.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer" style={{
      position: "relative", width: "100%", display: "flex",
      justifyContent: "center", gap: "2.5rem", fontSize: "0.75rem", color: "#FFFFFF",
      zIndex: 50, letterSpacing: "0.5px", flexWrap: "wrap"
    }}>
      {[
        { label: "email", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}` },
        { label: "instagram", href: "https://instagram.com/160991_arjun" },
        { label: "github", href: "https://github.com/ArjunDeshmukh16" },
        { label: "linkedin", href: "https://linkedin.com/in/arjun-deshmukh1609" },
      ].map(link => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
          style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--muted)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >{link.label}</a>
      ))}
    </footer>
  );
}

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const navigate = (id: string) => {
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(v => !v); }
      if (e.key === "Escape") setCmdOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ background: "var(--page)", color: "var(--ink)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: "-0.3px" }}>
      <Nav onNav={navigate} onCmd={() => setCmdOpen(v => !v)} />
      <Hero onNav={navigate} />
      <AcademicLogoStrip />
      <About onNav={navigate} />
      <Work />
      <Recommendations />
      <Projects />
      <Skills />
      <GitHubStats />
      <Contact />
      <Credits />
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNav={navigate} />
    </div>
  );
}
