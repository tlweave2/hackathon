# AutoApply Agent PRD

_Last updated: 2025-12-06_

## 1. Overview

The AutoApply Agent is an Apify Actor that automates the repetitive work of sourcing and applying to software engineering jobs. Users provide authenticated session cookies for target job platforms and a short career brief; the actor validates access, scouts relevant openings via trusted Apify Store scrapers, ranks opportunities, and guides (or eventually performs) the application process with AI assistance.

## 2. Problem statement

Manual job searches and application forms consume hours each week for software professionals. Platform UX differs wildly, “Easy Apply” filters miss highly relevant roles, and tailoring outreach is tedious. Candidates want higher throughput without sacrificing personalization or risking account bans.

## 3. Goals & success criteria

- **Reduce manual effort**: Surface a ranked list of quality leads that match user keywords and location preferences.
- **Speed up submissions**: Automate or tightly script repetitive form interactions, minimizing context switching.
- **Preserve account safety**: Respect platform rules by reusing user-exported cookies and validating session health before acting.
- **Stay contextual**: Summarize job descriptions and align suggestions with the applicant’s career narrative.

### Success metrics

| Metric                       | Target                                                            | Notes                                                         |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| Valid job listings per run   | ≥ 15 (default limit)                                              | Combines LinkedIn, Glassdoor, and Indeed sources.             |
| Session validation pass rate | ≥ 90% when cookies are fresh (<30 days)                           | Indicates healthy cookie export flow.                         |
| Application throughput       | ≥ 10 jobs per run ready for manual review or auto-submit          | Counts `SUBMITTED` + `NOT_IMPLEMENTED` entries with guidance. |
| Guidance satisfaction        | ≥ 80% of feedback sessions rate OpenRouter output as “actionable” | Future user survey/telemetry.                                 |

## 4. Scope

### In-scope

- Cookie-based session ingestion for LinkedIn, Glassdoor, and Indeed.
- Job scouting via Apify Store actors (`bebity/linkedin-jobs-scraper`, `apify/glassdoor-jobs-scraper`, `apify/indeed-jobs-scraper`).
- Ranking heuristics based on easy apply flags, keyword/description match, and location.
- Placeholder application loop with optional OpenRouter-generated manual guidance.
- Anthropic Claude integration for future fully automated flows.
- Output datasets capturing per-job results and run summary metrics.

### Out of scope (v0.1)

- Automatic resume tailoring and document generation.
- Automated account creation or login without user-provided cookies.
- Applications outside supported platforms.
- End-to-end mobile workflows.

## 5. Personas & user needs

| Persona                                   | Needs                                                           | Pain points addressed                                |
| ----------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| **Software Engineer in job search**       | Batch-apply to curated openings without missing relevant roles. | Time sink, repetitive forms, unclear prioritization. |
| **Recruiting operations specialist**      | Aggregate roles for candidates, maintain audit trail.           | Fragmented scraper scripts, manual CSV juggling.     |
| **Growth hacker / automation enthusiast** | Experiment with LLM-assisted job outreach at scale.             | Hard to coordinate multiple scrapers and AI tools.   |

## 6. User stories

1. _As a job seeker_, I want to load my LinkedIn & Indeed cookies once so I can rerun the actor without logging in again.
2. _As a candidate_, I want a ranked list of jobs that mention my keywords so I can prioritize high-fit roles.
3. _As an automation tinkerer_, I want optional AI-generated instructions so I can manually finish complex applications faster.
4. _As a recruiter_, I want structured output with timestamps so I can audit which roles were processed.

## 7. Functional requirements

### 7.1 Input validation & storage

- Parse Cookie-Editor exports (JSON array) for LinkedIn and Indeed (Glassdoor optional future field).
- Validate anthropic API key format (`sk-ant-…`).
- Persist cookies to Apify key-value store for reuse during the run.

### 7.2 Job scouting

- Invoke LinkedIn actor with fallback to `apify/linkedin-jobs-scraper` on failure.
- Invoke Glassdoor and Indeed actors concurrently (current implementation sequential but mission-critical to support both).
- Deduplicate job URLs across sources.
- Score listings and trim to configurable limit (default 15).

### 7.3 Session management

- Check cookie freshness (expires field) and report invalid sessions.
- Allow configuration to skip applications when sessions appear expired.

### 7.4 Application orchestration

- Iterate through ranked jobs and detect platform by URL.
- Skip unsupported platforms gracefully.
- Record per-job outcome in dataset (`ApplicationStatus` enum).
- Sleep between jobs to mimic human pacing (currently 1s).

### 7.5 LLM integrations

- **Anthropic (planned)**: Primary automation brain for interactive sessions.
- **OpenRouter proxy (new optional)**: Generate manual action plan when automation is disabled. Requires `useOpenRouterSuggestions=true` and valid `APIFY_TOKEN`.

### 7.6 Outputs

- Push individual job results to dataset with session validity, notes, and statuses.
- Persist summary metrics (counts, session states) via `OutputManager`.
- Save final `OUTPUT` key-value with run digest.

## 8. Non-functional requirements

- Execute within Apify free-tier memory (128 MB) and default timeout (60 min) for typical runs.
- Handle network errors from external actors gracefully (retry or log warning).
- Avoid storing sensitive credentials beyond cookies and API keys in secure storage.
- Maintain modular architecture to support future platforms (e.g., Wellfound, Hired).

## 9. Dependencies & integrations

- Apify CLI/Platform runtime (v1+).
- External Apify Store actors (LinkedIn, Glassdoor, Indeed).
- Anthropic SDK (`@anthropic-ai/sdk`).
- OpenRouter proxy actor (`apify/openrouter`).
- Optional MCP servers: `chrome-devtools-mcp`, `@upstash/context7-mcp` for developer ergonomics.

## 10. Release plan

| Milestone   | Target date   | Deliverables                                                                                   |
| ----------- | ------------- | ---------------------------------------------------------------------------------------------- |
| MVP (0.1.0) | ✅ 2025-12-06 | Job scouting, session validation, manual guidance, documentation.                              |
| 0.2.0       | Jan 2026      | Playwright automation for LinkedIn Easy Apply, screenshot capture, configurable resume upload. |
| 0.3.0       | Feb 2026      | Indeed automation, multi-platform cookie ingestion (Glassdoor), configurable throttling.       |
| 0.4.0       | Mar 2026      | Advanced personalization (LLM templates), CRM export, webhook events.                          |

## 11. Risks & mitigations

| Risk                                       | Impact                      | Mitigation                                                 |
| ------------------------------------------ | --------------------------- | ---------------------------------------------------------- |
| Cookie expiration faster than expected     | Session invalid, run wasted | Pre-run validation + optional re-run prompt.               |
| External actors throttle or change schemas | Missing listings            | Add fallbacks, monitor Apify store updates.                |
| LLM hallucinations for guidance            | Poor candidate experience   | Keep manual review mandatory until automation proven.      |
| Platform TOS changes                       | Account lockouts            | Limit automation speed, allow user to disable risky flows. |

## 12. Open questions

- Should we add resume upload support before full automation?
- Which success metrics can be instrumented automatically (e.g., dataset analytics vs. manual surveys)?
- Do we need built-in scheduling (cron) or rely on Apify schedules + alerts?

## 13. Appendices

- **Docs for indexing**: `docs/apify-llms.txt` mirrors `https://docs.apify.com/llms.txt`.
- **Environment overrides**: `LINKEDIN_SCRAPER_ACTOR_ID`, `INDEED_SCRAPER_ACTOR_ID`, `GLASSDOOR_SCRAPER_ACTOR_ID`, `APIFY_TOKEN`.
