# Arjun Deshmukh’s portfolio

A finance-focused portfolio with experience, project case studies, an interactive signal-scoring explanation, and a downloadable resume.

## Run locally

Use Node.js 24 and npm.

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

GitHub Actions builds and deploys `dist/` to GitHub Pages after a change is merged into `main`. Work on a `chatgpt/<topic>` branch and open a pull request.

## Update content

- `src/content.ts`: project case studies, experience, capabilities, and links.
- `src/App.tsx`: page layout, navigation, project dialogs, and the illustrative scoring model.
- `src/index.css`: visual design and responsive layouts.
- `public/docs/Arjun_Deshmukh_Resume.pdf`: the public resume. Replace this file with the exact approved PDF so all resume buttons stay synchronized.
- `index.html`: page metadata and social preview settings.

The education, experience, and venture metrics were reconciled with Arjun’s approved October 11, 2026 resume. CVaR result statements come from the project’s saved performance and regression summaries. They are identified as saved results, not fresh reproductions. The interactive model illustrates the signal engine’s default weighting and thresholds; it does not request live market data or offer investment advice.

Never copy private career-tracker records, Gmail content, application history, or credentials into this public repository. Do not add API tokens. Do not claim performance, certifications, or completed work without source evidence. Public contact information appears in the resume only as approved by Arjun.

## Review before publishing

Check the production build, mobile layouts, keyboard navigation, dialog open/close behavior, scoring boundaries, and resume-file integrity. Check that each link resolves and that every metric has a source. Keep project graphics clearly identified as illustrations rather than performance charts.
