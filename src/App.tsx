import { useEffect, useState, useRef } from "react";

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

const roles = [
  { text: "Graduated from ", highlight: "USC", from: "#CC0000", to: "#FFCC00" },
  { text: "Private Equity Analyst at ", highlight: "UTI Alternatives", from: "#1A56DB", to: "#D4AF37" },
  { text: "Graduated from ", highlight: "NMIMS", from: "#8B1538", to: "#FF6B6B" },
  { text: "Quantitative Analyst at ", highlight: "HDFC Securities", from: "#003D7A", to: "#E63946" },
  { text: "Data Analyst at ", highlight: "YES BANK", from: "#1E3A8A", to: "#60A5FA" },
  { text: "Investment Analyst at ", highlight: "Aditya Birla Capital", from: "#8B0000", to: "#FF6B6B" },
  { text: "Structured Credit Analyst at ", highlight: "UTI Alternatives", from: "#1A56DB", to: "#D4AF37" },
];

const taglines = [
  { word: "AI", color: "#3B82F6", glow: "rgba(59,130,246,0.4)" },
  { word: "Investments", color: "#F59E0B", glow: "rgba(245,158,11,0.4)" },
  { word: "Data", color: "#10B981", glow: "rgba(16,185,129,0.4)" },
  { word: "Strategy", color: "#EF4444", glow: "rgba(239,68,68,0.4)" },
  { word: "Poker", color: "#D4AF37", glow: "rgba(212,175,55,0.4)" },
];

const commands = [
  { id: "home", label: "Home", category: "Navigate" },
  { id: "about", label: "About", category: "Navigate" },
  { id: "work", label: "Work", category: "Navigate" },
  { id: "projects", label: "Projects", category: "Navigate" },
  { id: "skills", label: "Skills", category: "Navigate" },
  { id: "contact", label: "Contact", category: "Navigate" },
  { id: "credits", label: "Credits", category: "Navigate" },
];

function Nav({ onNav, onCmd }: { onNav: (id: string) => void; onCmd: () => void }) {
  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      background: "rgba(0,0,0,0.98)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.2rem 2rem"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => onNav("home")} style={{
          fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-1px", cursor: "pointer",
          background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 33%, #138808 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          transition: "all 0.3s"
        }}>A</div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", fontSize: "0.75rem", letterSpacing: "1px" }}>
          {["about", "work", "projects", "skills", "contact"].map(s => (
            <span key={s} onClick={() => onNav(s)} style={{
              color: "#94a3b8", cursor: "pointer", textTransform: "uppercase",
              fontWeight: 500, position: "relative", transition: "color 0.2s"
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0ea5e9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >{s}</span>
          ))}
          <span onClick={onCmd} style={{
            cursor: "pointer", opacity: 0.6, fontWeight: 600, fontSize: "1.2rem", color: "#0ea5e9", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.transform = "scale(1)"; }}
          >⌘</span>
        </div>
      </div>
    </nav>
  );
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
    <main style={{ paddingTop: 100, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 850, padding: "0 2rem", marginTop: "-40px" }}>
        <h1 style={{
          fontSize: "5rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-2px",
          background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 33%, #138808 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>Arjun Deshmukh</h1>

        <div style={{ fontSize: "1.3rem", color: "#94a3b8", marginBottom: "0.8rem", height: 50, display: "flex", alignItems: "center", fontWeight: 600 }}>
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
          <span style={{ color: "#64748b" }}>Obsessed with</span>
          <span style={{
            color: taglines[taglineIdx].color,
            fontWeight: 700,
            textShadow: `0 0 20px ${taglines[taglineIdx].glow}, 0 0 40px ${taglines[taglineIdx].glow}`,
            opacity: taglineFade ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>{taglines[taglineIdx].word}</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <button onClick={() => onNav("contact")}
            style={{ ...btnBase, background: "#ffffff", color: "#000000" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >Let's Talk</button>
          <a href="https://docs.google.com/document/d/1T0BxkCFIXMT6j-x_vLjNW_4ADol_9hCf6WjeWpuij1s/export?format=pdf"
            download="Arjun_Deshmukh_CV.pdf"
            style={{ ...btnBase, background: "transparent", color: "#94a3b8", border: "2px solid #334155" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#334155"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >Download CV</a>
          <a href="https://linkedin.com/in/arjun-deshmukh1609" target="_blank" rel="noreferrer"
            style={{ ...btnBase, background: "transparent", color: "#94a3b8", border: "2px solid #334155" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#334155"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >LinkedIn</a>
        </div>

        <p style={{ fontSize: "0.875rem", color: "#64748b", letterSpacing: "0.3px" }}>
          Press{" "}
          <kbd style={{ background: "#1a1a2e", border: "1px solid #334155", borderRadius: 4, padding: "0.3rem 0.6rem", fontFamily: "Monaco, monospace", fontSize: "0.8rem" }}>⌘</kbd>
          {" "}<kbd style={{ background: "#1a1a2e", border: "1px solid #334155", borderRadius: 4, padding: "0.3rem 0.6rem", fontFamily: "Monaco, monospace", fontSize: "0.8rem" }}>K</kbd>{" "}
          to navigate →
        </p>
      </div>
    </main>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ padding: "100px 2rem 80px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{
        fontSize: "3rem", fontWeight: 800, marginBottom: "2.5rem", letterSpacing: "-1px",
        background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
      }}>{title}</h2>
      <div style={{ fontSize: "1rem", lineHeight: 1.85, color: "#cbd5e1" }}>{children}</div>
    </div>
  );
}

function About({ onNav }: { onNav: (id: string) => void }) {
  return (
    <Section id="about" title="About">
      <p style={{ marginBottom: "1.5rem" }}>Growing up in a family of financial strategists, I developed an early obsession with capital markets. Conversations around credit cycles, equity valuations, capital allocation, and risk pricing shaped my approach to investing: rigorous, data-driven, and always questioning.</p>
      <p style={{ marginBottom: "1.5rem" }}>Financial Engineering Graduate from the University of Southern California. Previously completed Computer Science from NMIMS University. This combination gives me a unique edge: deep technical foundations paired with rigorous financial theory. I bridge the gap between algorithmic thinking and real-world market dynamics.</p>
      <p style={{ marginBottom: "1.5rem" }}>Interned in India's most competitive investment firms: UTI Alternatives, HDFC Securities, Yes Bank, and Aditya Birla Capital. I've screened investment opportunities, built performance dashboards, constructed backtesting frameworks, executed transactions, and analyzed 50+ companies. Every internship taught me something different about how capital flows and value gets created.</p>
      <p style={{ marginBottom: "1.5rem" }}>The intersection of strategy and execution excites me most. Identifying inefficiencies in markets, structuring solutions, and guiding capital toward lasting value creation. My recent research at USC: tail-risk factor models and real-time signal generation: combines statistical rigor with practical implementation. I don't just build models; I build systems that work in the real world.</p>

      <div style={{
        background: "rgba(255,255,255,0.04)", borderLeft: "4px solid #FF9933",
        padding: "1.5rem", margin: "2rem 0", borderRadius: 4
      }}>
        <p style={{ color: "#e2e8f0", marginBottom: 0 }}>
          <strong style={{ color: "#FF9933" }}>Why Hire Me:</strong> I bring a{" "}
          <strong style={{ color: "#e2e8f0" }}>global perspective rare among Finance Engineering graduates</strong>.
          My dual exposure to Indian private markets (UTI, HDFC, ABC) and US quantitative research (USC) enables me to
          identify inefficiencies and build strategies that bridge emerging and developed markets. I'm ambitious about
          building investment teams in Asia that leverage both regions' strengths. I don't just analyze markets; I
          identify where capital flows inefficiently and structure solutions.
        </p>
      </div>

      <p style={{ marginBottom: "1.5rem" }}>Currently seeking full-time opportunities in investment analysis, quantitative research, portfolio management, and systematic trading. Authorized to work in the United States (OPT eligible, available May 2026). I'm looking for teams that value intellectual rigor, data-driven decision-making, and a relentless pursuit of alpha.</p>
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
      <h2 style={{
        fontSize: "3rem", fontWeight: 800, marginBottom: "2.5rem", letterSpacing: "-1px",
        background: "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
      }}>Recommendations</h2>
      {recommendations.map((r, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          padding: "1.5rem", marginBottom: "1.5rem", borderRadius: 8
        }}>
          <a
            href="https://www.linkedin.com/in/arjun-deshmukh1609/details/recommendations/"
            target="_blank" rel="noreferrer"
            style={{ display: "block", color: "#94a3b8", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem", textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
          >{r.author} ↗</a>
          <div style={{ color: "#cbd5e1", lineHeight: 1.7, fontStyle: "italic" }}>{r.text}</div>
        </div>
      ))}

      <div style={{ marginTop: "3rem" }}>
        <div style={{ fontWeight: 700, color: "#FF9933", marginBottom: "1.2rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Letters of Recommendation</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {lors.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
              textDecoration: "none", transition: "all 0.2s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{l.name}</div>
                <div style={{ color: "#64748b", fontSize: "0.82rem" }}>{l.role}</div>
              </div>
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", whiteSpace: "nowrap", marginLeft: "1rem" }}>View LOR ↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const jobs = [
  {
    title: "Private Equity & Structured Credit Analyst",
    company: "UTI Alternatives", companyColor: "#0052CC", companyUrl: "https://www.utialternatives.com/home", location: "New Delhi",
    period: "Jul 2025 - Sep 2025",
    desc: "Screened and evaluated 16+ private credit and equity deals (~$15M) with 40% conversion to term sheet. Executed transactions: $150K structured equity, $225K real estate financings, $127.5K education sector restructuring. Developed investor dashboards (IRR, MOIC, NAV, carried interest).",
    certUrl: "/docs/cert-uti.pdf"
  },
  {
    title: "Quantitative Trading Analyst",
    company: "HDFC Securities", companyColor: "#003D7A", companyUrl: "https://www.hdfcsec.com/", location: "Mumbai",
    period: "May 2025 - Jul 2025",
    desc: "Benchmarked collateral margin haircuts on 25 high-volume equities. Built robust backtests using technical analysis (RSI, MACD, Bollinger Bands) to refine signals for better risk-adjusted returns.",
    certUrl: "/docs/cert-hdfc.pdf"
  },
  {
    title: "Software Development & Data Mining Analyst",
    company: "Yes Bank", companyColor: "#1E40AF", companyUrl: "https://www.yes.bank.in/", location: "Mumbai",
    period: "May 2023 - Jul 2023",
    desc: "Automated incentive calculation systems using Python and Hadoop. Enhanced sales team productivity by 16% by reducing reporting turnaround time to T+1 day.",
    certUrl: "/docs/cert-yesbank.pdf"
  },
  {
    title: "Fundamental Research Analyst",
    company: "Aditya Birla Capital", companyColor: "#C8102E", companyUrl: "https://www.adityabirlacapital.com/abcd/share-market", location: "Mumbai",
    period: "Jun 2022 - Jul 2022",
    desc: "Conducted fundamental valuations of 20 listed healthcare companies. Identified KIMS and Rainbow Hospitals which delivered 42% returns within 12 months.",
    certUrl: "/docs/cert-abc.pdf"
  },
];

function Work() {
  return (
    <Section id="work" title="Experience">
      {jobs.map((job, i) => (
        <div key={i} style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: i < jobs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.3rem", fontSize: "1.05rem" }}>{job.title}</div>
          <div style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
            <a href={job.companyUrl} target="_blank" rel="noreferrer"
              style={{ color: job.companyColor, fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >{job.company} ↗</a>, {job.location}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.8rem" }}>{job.period}</div>
          <div style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "0.8rem" }}>{job.desc}</div>
          {job.certUrl && (
            <a href={job.certUrl} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.35rem 0.75rem", background: "rgba(255,255,255,0.05)",
              borderRadius: 4, color: "#94a3b8", textDecoration: "none", fontSize: "0.82rem",
              border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
            >↗ View Certificate</a>
          )}
        </div>
      ))}
    </Section>
  );
}

const projectGroups = [
  {
    label: "Quantitative Research",
    projects: [
      {
        title: "Generating Buy/Sell Trading Signals from Structured Market Data",
        link: "https://github.com/ArjunDeshmukh16/Generating-Buy-Sell-Trading-Signals-from-Structured-Market-Data",
        meta: "Directed Research | USC | Aug 2025 - Jan 2026",
        desc: "Designed end-to-end signal engine integrating live price/volume feeds, news headlines, social sentiment data, and SEC filings into real-time composite scoring framework. Python-based implementation with production-ready data pipeline.",
        github: "https://github.com/ArjunDeshmukh16/Generating-Buy-Sell-Trading-Signals-from-Structured-Market-Data"
      },
      {
        title: "CVaR-Based Left-Tail Factor Strategy",
        link: "https://github.com/ArjunDeshmukh16/CVaR-Based-Left-Tail-Factor-Strategy",
        meta: "Quantitative Research | USC | Aug 2025 - Nov 2025",
        desc: "Built long-short equity strategy using 252-day rolling CVaR(5%) with Fama-MacBeth regressions, beta neutralization, and regime analysis. Results: 2.3% annual alpha, 0.84 Sharpe ratio, -18.2% max drawdown over 15-year backtest.",
        github: "https://github.com/ArjunDeshmukh16/CVaR-Based-Left-Tail-Factor-Strategy"
      },
    ]
  },
  {
    label: "AI & Systems",
    projects: [
      {
        title: "SARA: Autonomous General-Purpose Model",
        link: "https://github.com/ArjunDeshmukh16/Articles-Blogs-and-Research-Papers/blob/main/SARA%20AI",
        meta: "AI & Deep Learning | NMIMS | Jul 2023 - May 2024",
        desc: "LLM-powered autonomous system executing MS Office and Email functions as personal AI assistant. Recommended by mentor for publication at ICICV-2024 (Springer LNNS).",
        github: "https://github.com/ArjunDeshmukh16/Articles-Blogs-and-Research-Papers/blob/main/SARA%20AI"
      },
      {
        title: "B-zier Flow: Curve Visualization & Optimization",
        link: "https://github.com/ArjunDeshmukh16/B-zier-flow",
        meta: "Computer Graphics | Jun 2022 - Aug 2022",
        desc: "Designed rapid visualization system for Quadratic and Cubic Bézier curves for vehicle and airplane trajectories. Optimal motion planning algorithm presented at AINA-2024, Kitakyushu, Japan.",
        github: "https://github.com/ArjunDeshmukh16/B-zier-flow"
      },
      {
        title: "MeaLit: Food Recommendation Engine",
        link: "https://github.com/ArjunDeshmukh16/MeaLit",
        meta: "Machine Learning | Data Science",
        desc: "Personalised food recommendation system using collaborative filtering and content-based techniques to match user preferences with curated meal suggestions.",
        github: "https://github.com/ArjunDeshmukh16/MeaLit"
      },
    ]
  },
  {
    label: "Research Papers",
    projects: [
      {
        title: "Generative Adversarial Networks: Theory & Applications",
        link: "https://github.com/ArjunDeshmukh16/Articles-Blogs-and-Research-Papers/blob/main/Generative%20Adversarial%20Networks",
        meta: "Research Paper | AI | Jan 2023 - Mar 2023",
        desc: "Research on GANs investigating generator/discriminator architecture and parallel intelligence. Grade: A",
        github: "https://github.com/ArjunDeshmukh16/Articles-Blogs-and-Research-Papers/blob/main/Generative%20Adversarial%20Networks"
      },
    ]
  },
];

function Projects() {
  return (
    <Section id="projects" title="Research & Projects">
      {projectGroups.map((group, gi) => (
        <div key={gi} style={{ marginTop: gi > 0 ? "0.5rem" : 0 }}>
          {group.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.3rem", fontSize: "1.05rem" }}>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ color: "#e2e8f0", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#94a3b8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#e2e8f0")}
                  >{p.title}</a>
                ) : p.title}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{p.meta}</div>
              <div style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "0.8rem" }}>{p.desc}</div>
              {p.github && (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.4rem 0.8rem", background: "rgba(255,255,255,0.06)",
                    borderRadius: 4, color: "#94a3b8", textDecoration: "none", fontSize: "0.85rem",
                    transition: "all 0.2s", border: "1px solid rgba(255,255,255,0.08)"
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
                  >↗ GitHub Repo</a>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </Section>
  );
}

const skillGroups = [
  { label: "Programming Languages", text: "Python, SQL, MATLAB, R Programming, JavaScript, C, C++, HTML, CSS, UML" },
  { label: "Tools & Platforms", text: "GitHub, Tableau, Power BI, MS Office Suite (Word, Excel, PowerPoint)" },
  { label: "Finance & Analytics", text: "Financial Analysis & Modeling, Security Valuation, Capital Budgeting, Fixed-Income Modeling, Options Analytics, Back-Testing" },
  { label: "Soft Skills", text: "Communication, Problem Solving, Critical Thinking, Attention to Detail, Team Collaboration, Relationship Building" },
  { label: "Languages", text: "English, Hindi, Marathi (Writing, Reading & Speaking)" },
  { label: "Interests", text: "Sports (Cricket, Soccer, Table Tennis), Competitive Chess, Poker, Active Investing, Market-Trend Analysis, Reading" },
];

function Skills() {
  return (
    <Section id="skills" title="Skills & Certifications">
      {skillGroups.map((s, i) => (
        <div key={i} style={{ marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, color: "#FF9933", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
          <div style={{ color: "#cbd5e1" }}>{s.text}</div>
        </div>
      ))}
    </Section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (!name || !email || !message) { alert("Please fill in all fields"); return; }
    const mailto = `mailto:arjun.deshmukh1609@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", background: "#0a0a0a",
    border: "1px solid #334155", borderRadius: 6, color: "#e2e8f0",
    fontFamily: "inherit", fontSize: "1rem", outline: "none", boxSizing: "border-box", transition: "all 0.2s"
  };

  const btnBase: React.CSSProperties = {
    padding: "0.9rem 1.8rem", borderRadius: 6, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s", fontSize: "0.95rem", textDecoration: "none", display: "inline-block", border: "none"
  };

  const linkStyle: React.CSSProperties = { color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" };

  return (
    <Section id="contact" title="Let's Connect">
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        <a href="https://docs.google.com/document/d/1T0BxkCFIXMT6j-x_vLjNW_4ADol_9hCf6WjeWpuij1s/export?format=pdf"
          download="Arjun_Deshmukh_CV.pdf"
          style={{ ...btnBase, background: "#ffffff", color: "#000000" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#e2e8f0"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
        >Download CV</a>
        <a href="https://linkedin.com/in/arjun-deshmukh1609" target="_blank" rel="noreferrer"
          style={{ ...btnBase, background: "transparent", color: "#94a3b8", border: "2px solid #334155" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#334155"; (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
        >LinkedIn</a>
      </div>

      <div style={{ maxWidth: 560 }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.4rem", color: "#e2e8f0" }}>Send me an email</h3>
        {[
          { label: "Name", value: name, setter: setName, type: "text", placeholder: "Shah Rukh Khan" },
          { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "iamsrk@globalstar.com" },
        ].map(({ label, value, setter, type, placeholder }) => (
          <div key={label} style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontWeight: 600, color: "#64748b", marginBottom: "0.4rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</label>
            <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#FF9933")}
              onBlur={e => (e.currentTarget.style.borderColor = "#334155")}
            />
          </div>
        ))}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, color: "#64748b", marginBottom: "0.4rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="What's on your mind?"
            style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
            onFocus={e => (e.currentTarget.style.borderColor = "#FF9933")}
            onBlur={e => (e.currentTarget.style.borderColor = "#334155")}
          />
        </div>
        <button onClick={sendEmail} style={{
          width: "100%", padding: "0.85rem", background: "#ffffff", color: "#000000",
          border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer",
          fontSize: "0.95rem", transition: "all 0.2s", letterSpacing: "0.3px"
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#e2e8f0"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#ffffff"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
        >Send Message →</button>
      </div>

      <p style={{ marginTop: "3rem", color: "#64748b", fontSize: "0.95rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        {[
          { label: "Gmail", href: "mailto:arjun.deshmukh1609@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/arjun-deshmukh1609" },
          { label: "GitHub", href: "https://github.com/ArjunDeshmukh16" },
          { label: "Instagram", href: "https://instagram.com/160991_arjun" },
        ].map((l, i, arr) => (
          <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >{l.label}</a>
            {i < arr.length - 1 && <span style={{ color: "#334155" }}>|</span>}
          </span>
        ))}
      </p>
    </Section>
  );
}

function Credits() {
  return (
    <Section id="credits" title="Credits">
      <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
        Inspired by{" "}
        <a href="https://parthdesai.site" target="_blank" rel="noreferrer" style={{ color: "#94a3b8" }}>Parth Desai</a>{" "}and{" "}
        <a href="https://zenorocha.com" target="_blank" rel="noreferrer" style={{ color: "#94a3b8" }}>Zeno Rocha</a>.
        Built with React & TypeScript.
      </p>
      <p style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.9rem" }}>© 2026 Arjun Deshmukh. All rights reserved.</p>
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
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: 120
    }}>
      <div style={{
        width: "90%", maxWidth: 600, background: "#0a0a0a", border: "1px solid #334155",
        borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)"
      }}>
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Type a command or search..."
          style={{
            width: "100%", padding: "1rem", background: "#0a0a0a", border: "none",
            borderBottom: "1px solid #334155", color: "#e2e8f0", fontSize: "1rem",
            outline: "none", fontFamily: "inherit", boxSizing: "border-box"
          }}
        />
        <div style={{ maxHeight: 400, overflowY: "auto", padding: "0.5rem" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "#64748b" }}>No commands found</div>
          ) : filtered.map(cmd => (
            <button key={cmd.id} onClick={() => { onNav(cmd.id); onClose(); }}
              style={{
                padding: "0.75rem 1rem", marginBottom: "0.25rem", borderRadius: 6, cursor: "pointer",
                background: "transparent", border: "none", color: "#cbd5e1", width: "100%",
                textAlign: "left", display: "flex", justifyContent: "space-between", fontSize: "0.95rem"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1a1a2e")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span>{cmd.label}</span>
              <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{cmd.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      position: "fixed", bottom: "2rem", width: "100%", display: "flex",
      justifyContent: "center", gap: "2.5rem", fontSize: "0.75rem", color: "#64748b",
      zIndex: 50, letterSpacing: "0.5px", flexWrap: "wrap"
    }}>
      {[
        { label: "email", href: "mailto:arjun.deshmukh1609@gmail.com" },
        { label: "instagram", href: "https://instagram.com/160991_arjun" },
        { label: "github", href: "https://github.com/ArjunDeshmukh16" },
        { label: "linkedin", href: "https://linkedin.com/in/arjun-deshmukh1609" },
      ].map(link => (
        <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
          style={{ color: "#64748b", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#94a3b8")}
          onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
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
    <div style={{ background: "#000000", color: "#e2e8f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: "-0.3px" }}>
      <Nav onNav={navigate} onCmd={() => setCmdOpen(v => !v)} />
      <Hero onNav={navigate} />
      <About onNav={navigate} />
      <Work />
      <Recommendations />
      <Projects />
      <Skills />
      <Contact />
      <Credits />
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNav={navigate} />
    </div>
  );
}
