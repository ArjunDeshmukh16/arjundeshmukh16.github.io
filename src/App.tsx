import { useEffect, useRef, useState } from 'react';
import { capabilities, experience, links, projects } from './content';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function ExternalLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<Arrow diagonal /></a>;
}

function SignalModel() {
  const [values, setValues] = useState([70, 40, 20, 0]);
  const weights = [0.3, 0.3, 0.2, 0.2];
  const names = ['Trend', 'Momentum', 'Volume', 'Sentiment'];
  const score = Math.round((values.reduce((s, v, i) => s + v / 100 * weights[i], 0) + 1) * 50 * 10) / 10;
  const signal = score >= 70 ? 'BUY' : score >= 45 ? 'HOLD' : 'SELL';
  return <div className="signal-model">
    <div className="model-top"><span className="eyebrow">A MODEL, EXPLAINED</span><span className="model-dot" aria-hidden="true" /></div>
    <div className="model-heading"><h2>Four inputs.<br />One clear signal.</h2><span className={`signal signal-${signal.toLowerCase()}`}>{signal}</span></div>
    <div className="model-score"><span>{score.toFixed(1)}</span><span className="model-denominator">/ 100</span><svg viewBox="0 0 120 55" role="img" aria-label="Weighted score indicator"><path d="M8 48 A52 52 0 0 1 112 48" fill="none" stroke="currentColor" strokeWidth="5" opacity=".14" /><path d="M8 48 A52 52 0 0 1 112 48" fill="none" stroke="currentColor" strokeWidth="5" pathLength="100" strokeDasharray={`${score} 100`} /></svg></div>
    <div className="model-sliders">{names.map((name, i) => <label className="model-input" key={name}><span>{name}<small>{weights[i] * 100}% weight</small></span><input aria-label={`${name} component`} type="range" min="-100" max="100" value={values[i]} onChange={e => setValues(v => v.map((x, j) => j === i ? Number(e.target.value) : x))} /><output>{values[i] > 0 ? '+' : ''}{(values[i] / 100).toFixed(2)}</output></label>)}</div>
    <p className="model-note">Move the inputs to see the scoring rule at work. These are example inputs, not live market data or investment advice.</p>
    <a href="#projects" className="model-link">The research behind it <Arrow /></a>
  </div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const modalTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  function closeDialog() {
    dialog.current?.close();
    setSelected(null);
    modalTrigger.current?.focus();
  }
  function openProject(project: typeof projects[number], button: HTMLButtonElement) {
    modalTrigger.current = button;
    setSelected(project);
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-shell">
      <a className="wordmark" href="#home" aria-label="Arjun Deshmukh home">AD<span>.</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Menu'}</button>
      <nav id="primary-nav" aria-label="Main navigation" className={menuOpen ? 'nav-open' : ''}>
        {['Projects', 'Experience', 'About'].map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{n}</a>)}
        <a className="nav-resume" href={links.resume} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Resume <Arrow diagonal /></a>
      </nav>
    </div></header>
    <main id="main">
      <section className="hero section-shell" id="home">
        <div className="hero-copy"><div className="availability"><span aria-hidden="true" />OPEN TO FINANCE & INVESTMENT ROLES</div>
          <p className="hero-intro">ARJUN DESHMUKH</p>
          <h1>Finance is the focus.<br /><em>Curiosity is the engine.</em></h1>
          <p className="hero-description">I build financial models, examine investments, and use technology to make the work clearer. My path brought me from computer science in Mumbai to financial engineering at USC, and into the business behind the numbers.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Arrow /></a><a className="button button-quiet" href={links.resume} target="_blank" rel="noopener noreferrer">View resume <Arrow diagonal /></a></div>
          <div className="hero-credentials"><span>MS Financial Engineering <strong>USC, 2026</strong></span><span>BTech Computer Science & Business Systems <strong>NMIMS, 2024</strong></span></div>
        </div><SignalModel />
      </section>
      <section className="evidence-band" aria-label="Selected experience"><div className="section-shell evidence-grid"><p>Real work.<br /><strong>Specific evidence.</strong></p><div><strong>4 deals / $5M</strong><span>Private opportunities screened at UTI</span></div><div><strong>3 properties / $166K</strong><span>Invested equity covered at Cogitative</span></div><div><strong>T+1</strong><span>Incentive reporting turnaround at Yes Bank</span></div></div></section>
      <section className="section-shell projects-section" id="projects"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Questions worth<br /><em>working through.</em></h2></div><p>Research, models, and a venture. Each starts with a practical question and makes the reasoning visible.</p></div>
        <div className="project-grid">{projects.map(project => <article className={`project-card project-${project.id}`} key={project.id}>
          <div className="project-top"><span className="project-number">{project.number}</span><span className="eyebrow">{project.type}</span></div>
          <div className="project-graphic" aria-hidden="true">{project.id === 'signal-engine' ? <><div className="graphic-grid" /><svg viewBox="0 0 320 100"><path d="M0 77 L30 72 L60 82 L90 40 L120 52 L150 26 L180 39 L210 14 L240 35 L280 22 L320 10" /><path className="secondary-line" d="M0 64 L40 68 L80 57 L120 62 L160 46 L200 51 L240 40 L280 43 L320 33" /></svg><span>STRUCTURE + SENTIMENT</span></> : project.id === 'tail-risk' ? <><svg viewBox="0 0 320 100"><path className="tail-area" d="M0 89 C40 89 42 86 67 80 L67 89 Z" /><path d="M0 89 C66 89 77 83 108 56 C127 37 143 10 164 10 C190 10 197 47 225 65 C258 89 280 89 320 89" /><line x1="67" y1="90" x2="67" y2="58" /></svg><span>LOOK INTO THE LEFT TAIL</span></> : <><div className="venture-bars"><i /><i /><i /><i /><i /></div><span>ACTIVITY IS NOT THE SAME AS REVENUE</span></>}</div>
          <p className="project-subtitle">{project.subtitle}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p>
          <div className="project-metrics">{project.metrics.map(m => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
          <div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>
          <button className="case-study-link" onClick={e => openProject(project, e.currentTarget)}>Read the case study <Arrow /></button>
          {project.href && <ExternalLink className="repo-link" href={project.href}>{project.action}</ExternalLink>}
        </article>)}</div><p className="section-caption">The graphics illustrate each research question. They are not performance charts. Case studies distinguish saved outputs from results that can be reproduced today.</p>
      </section>
      <section className="experience-section" id="experience"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow">02 / EXPERIENCE</p><h2>Learning where<br /><em>the decisions happen.</em></h2></div><p>From healthcare research to private credit, pricing, and real estate. The common thread is careful analysis that helps someone make a decision.</p></div>
        <div className="experience-list">{experience.slice(0, showAll ? experience.length : 3).map((job, i) => <article className="experience-row" key={job.company}><div className="experience-meta"><span className="experience-index">0{i + 1}</span><p>{job.period}</p><span>{job.location}</span></div><div className="experience-body"><span className="eyebrow">{job.focus}</span><h3>{job.company}</h3><p className="role">{job.role}</p><ul>{job.bullets.map(b => <li key={b}>{b}</li>)}</ul></div></article>)}</div>
        <button className="button button-outline experience-toggle" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? 'Show recent experience' : 'Show all six roles'} <span aria-hidden="true">{showAll ? '−' : '+'}</span></button>
      </div></section>
      <section className="section-shell about-section" id="about"><div className="about-story"><p className="eyebrow">03 / THE PERSON BEHIND THE WORK</p><h2>A technical foundation.<br /><em>A financial direction.</em></h2><p>Computer science taught me how to build things. Finance made me ask what those things are worth, how they work, and where they can go wrong.</p><p>I completed my Master’s in Financial Engineering at USC in May 2026, after a BTech in Computer Science and Business Systems at NMIMS. I want to grow in investment analysis, FP&A, and strategic finance, with technology helping me do the work better.</p><p>Outside work, I follow markets, play chess and cricket, enjoy poker, and watch far too many thrillers. I like questions that reward patience and a closer look.</p><div className="education"><div><span>2026</span><div><strong>University of Southern California</strong><p>MS Financial Engineering</p><small>Financial Analytics · Quantitative Investing · Capital Markets · Investments and Portfolio Management</small></div></div><div><span>2024</span><div><strong>NMIMS University</strong><p>BTech Computer Science and Business Systems</p><small>Artificial Intelligence · Data Mining · Algorithms · Business Strategy and Economics</small></div></div></div></div>
        <div className="capabilities"><p className="eyebrow">WHAT I BRING TO THE WORK</p>{capabilities.map((g, i) => <div className="capability" key={g.title}><span>0{i + 1}</span><div><h3>{g.title}</h3><ul>{g.items.map(t => <li key={t}>{t}</li>)}</ul></div></div>)}</div>
      </section>
      <section className="contact-section" id="contact"><div className="section-shell contact-inner"><div><p className="eyebrow">LET’S TALK</p><h2>Good work starts<br /><em>with a conversation.</em></h2><p>I’d be glad to discuss an opportunity, a research question, or your path in finance.</p></div><div className="contact-links"><ExternalLink href={links.linkedin}>Connect on LinkedIn</ExternalLink><ExternalLink href={links.github}>Explore my GitHub</ExternalLink><a href={links.resume} download="Arjun_Deshmukh_Resume.pdf">Download my resume <Arrow diagonal /></a></div></div></section>
    </main>
    <footer className="section-shell site-footer"><a className="wordmark" href="#home">AD<span>.</span></a><p>Arjun Deshmukh<span>Finance · Investments · Technology</span></p><a href="#home">Back to top ↑</a></footer>
    <dialog ref={dialog} aria-labelledby="case-title" className="case-dialog" onCancel={e => { e.preventDefault(); closeDialog(); }} onClick={e => { if (e.target === e.currentTarget) closeDialog(); }}>
      {selected && <div className="case-content"><div className="case-header"><p className="eyebrow">{selected.type}</p><button aria-label="Close case study" onClick={closeDialog}>Close ×</button></div><h2 id="case-title">{selected.subtitle}</h2><p className="case-question">{selected.question}</p>{[['Approach', selected.method], ['What I learned', selected.finding], ['Limits of the evidence', selected.limit], ['Next step', selected.next]].map(([title, body]) => <section key={title}><h3>{title}</h3><p>{body}</p></section>)}{selected.href && <ExternalLink className="button button-primary" href={selected.href}>View the source repository</ExternalLink>}</div>}
    </dialog>
  </>;
}
