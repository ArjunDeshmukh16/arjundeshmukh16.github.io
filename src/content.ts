export const links = {
  resume: '/docs/Arjun_Deshmukh_Resume.pdf',
  github: 'https://github.com/ArjunDeshmukh16',
  linkedin: 'https://www.linkedin.com/in/arjun-deshmukh1609/',
  engine: 'https://github.com/ArjunDeshmukh16/Generating-Buy-Sell-Trading-Signals-from-Structured-Market-Data',
  cvar: 'https://github.com/ArjunDeshmukh16/CVaR-Based-Left-Tail-Factor-Strategy',
};

export const learning = ['Bloomberg Concepts', 'JPMC Job Simulation', 'Anthropic AI Fluency Certifications', 'Financial Modeling & Python skills by CFA'];
export const languages = ['English', 'Hindi', 'Marathi', 'Punjabi'];

export const projects = [
  {
    id: 'signal-engine', number: '01', type: 'MARKET RESEARCH', title: 'A trading signal you can explain.',
    subtitle: 'Buy/Sell Trading Signal Engine',
    description: 'Combine price trends, momentum, volume, and news sentiment into a score. Then show the indicators behind the signal, so the output can be questioned rather than taken on trust.',
    metrics: [{ value: '118', label: 'equities' }, { value: '11', label: 'sectors' }, { value: '0–100', label: 'score range' }],
    tags: ['Python', 'Market data', 'TextBlob', 'Streamlit'],
    question: 'How can different kinds of market information become a clear, inspectable signal?',
    method: 'The current implementation combines trend, momentum, volume, and TextBlob headline sentiment. It scores stocks on a 0–100 scale and labels them BUY, HOLD, or SELL. Default weights are 30%, 30%, 20%, and 20%.',
    finding: 'The useful output is more than a label: rankings, technical indicators, and the underlying news help explain what changed and why.',
    limit: 'The public release focuses on signal inspection. Historical charts use neutral sentiment because a historical news series is not included. A complete out-of-sample evaluation should accompany any claim of a trading edge.',
    next: 'Publish a reproducible evaluation with trading costs, benchmark comparisons, and historical news coverage.',
    href: links.engine, action: 'Explore the code',
  },
  {
    id: 'tail-risk', number: '02', type: 'QUANTITATIVE INVESTING', title: 'Does a better risk measure make a better portfolio?',
    subtitle: 'CVaR-Based Left-Tail Factor Strategy',
    description: 'Test whether the worst part of a stock’s return distribution adds information beyond ordinary volatility. Compare portfolios, examine factor exposure, and study what holds up across market regimes.',
    metrics: [{ value: '252', label: 'day lookback' }, { value: '5%', label: 'tail threshold' }, { value: '2016–24', label: 'saved result period' }],
    tags: ['Portfolio construction', 'CRSP', 'Factor regressions', 'Risk'],
    question: 'Does downside-tail risk capture a distinct return premium, or mostly the same information as volatility?',
    method: 'Estimate rolling CVaR, form long and short portfolios, and examine performance with Fama–French and Fama–MacBeth regressions. The research includes beta neutralization and robustness checks for lookback windows, tail thresholds, and market regimes.',
    finding: 'The saved 2016–2024 summaries report a long-only Sharpe of 0.70 and a long-short Sharpe of 0.22. The saved cross-sectional TailScore t-statistic is 1.17, which does not establish a separately priced characteristic.',
    limit: 'These are saved research outputs, not a fresh reproduction or live returns. Portfolio variants must be distinguished before comparing their results. Full replication requires licensed CRSP inputs.',
    next: 'Make every reported result traceable to its portfolio specification and output file, and document the complete research environment.',
    href: links.cvar, action: 'Read the research',
  },
  {
    id: 'campusx', number: '03', type: 'FINANCE & ENTREPRENEURSHIP', title: 'Build a business. Learn what actually pays.',
    subtitle: 'CampusX Student Marketplace',
    description: 'Co-found a student marketplace and use financial models to understand burn, unit economics, and capital allocation. Look beyond registrations to the activity that generates fees.',
    metrics: [{ value: '5,470', label: 'registrations' }, { value: '164', label: 'fee-generating transactions' }, { value: '2024–25', label: 'venture period' }],
    tags: ['Unit economics', 'Financial models', 'Conversion', 'Strategy'],
    question: 'What turns marketplace activity into a business that can sustain itself?',
    method: 'Build models to track burn rate, unit economics, and capital allocation. Monitor paid conversion, take rate, and repeat usage alongside registrations.',
    finding: 'The marketplace reached 5,470 registrations. I identified fee generation from 164 transactions, making paid activity a more useful focus than registration growth alone.',
    limit: 'This case study reflects my experience and resume. It does not expose user records, private transaction data, or claim that every registration became a paying customer.',
    next: 'Create a public case study using aggregated, approved data to explain the business decisions and lessons.',
    href: '', action: 'Read the case study',
  },
];

export const experience = [
  { company: 'Cogitative Investments', role: 'Investment Analyst', period: 'Jul 2026 – Present', location: 'San Diego', focus: 'Real estate returns & forecasting', bullets: ['Standardized cash-on-cash calculations, correcting returns from −0.42% to 6.25% and from 15.22% to 11.40%.', 'Established monthly reporting for three properties with $166K of invested equity. Combined four spreadsheets into one driver-based quarterly forecast.'] },
  { company: 'Easley-Dunn Productions', role: 'Financial Analyst', period: 'Jun 2026 – Jul 2026', location: 'Torrance', focus: 'Pricing & financial analysis', bullets: ['Compared pricing across three markets using FX conversion and volatility-based regional price bands.', 'Evaluated inflation risk in a dual-currency economy with Python, Monte Carlo simulations, and regression. Built KPI dashboards for pricing reviews.'] },
  { company: 'UTI Alternatives', role: 'Private Equity and Structured Credit Intern', period: 'Jul 2025 – Sep 2025', location: 'New Delhi', focus: 'Private investments & credit', bullets: ['Screened four private investment opportunities totaling $5M. One advanced to term sheet.', 'Assessed school expansion debt capacity across three scenarios using enrollment, tuition, staffing, DSCR, and collateral coverage.'] },
  { company: 'HDFC Securities', role: 'Trading and Product Strategy Intern', period: 'May 2025 – Jul 2025', location: 'Mumbai', focus: 'Trading products & collateral risk', bullets: ['Compared onboarding, research, trading, and margin access across competing platforms.', 'Benchmarked collateral haircuts across 25 common equities, separating haircut rates from pledge eligibility for like-for-like comparisons.'] },
  { company: 'Yes Bank', role: 'Business Analyst Intern', period: 'May 2023 – Jul 2023', location: 'Mumbai', focus: 'Finance reporting & automation', bullets: ['Automated two incentive plans for 1,000+ employees and 25+ business rules with SQL and Python, retaining Excel reporting.', 'Reduced reporting turnaround to T+1. Delivered automated plans and roadmaps supporting a 130-plan automation strategy.'] },
  { company: 'Aditya Birla Capital', role: 'Investments and Equity Research Intern', period: 'Jun 2022 – Jul 2022', location: 'Mumbai', focus: 'Healthcare equity research', bullets: ['Shortlisted two of 20 healthcare companies using financial screening and hospital operating models across base, upside, and downside cases.', 'Recommended KIMS and Rainbow Children’s Medicare, which subsequently outperformed the Sensex by 26 and 58 percentage points over one year.'] },
];

export const capabilities = [
  { title: 'Understand the investment', items: ['Financial valuation and modeling', 'DCF and investment research', 'Credit capacity and scenario analysis', 'Portfolio risk and factor research'] },
  { title: 'Explain the business', items: ['FP&A and forecasting', 'Variance analysis and KPI reporting', 'Pricing and unit economics', 'Capital allocation'] },
  { title: 'Build the tools', items: ['Python and SQL', 'Excel and Anaplan', 'Power BI and Tableau', 'Data analysis and automation'] },
];
