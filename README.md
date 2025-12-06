# AutoApply Agent

> Cookie-powered job application assistant that pilots LinkedIn and Indeed flows with Claude.

## Overview

- Bring your own authenticated LinkedIn/Indeed sessions: export browser cookies once and reuse them for ~30 days.
- Scout and rank job listings from trusted Apify Actors (LinkedIn, Glassdoor, Indeed) with flexibility beyond Easy Apply.
- Validate sessions up front, inject cookies per platform, and orchestrate form submissions with Claude.
- Track results in datasets with per-job artifacts and a roll-up summary.

## Key capabilities

1. **Input validation** – Ensures cookie dumps, personal details, and API keys are present and well-formed before anything runs.
2. **Job scouting** – Reuses public scrapers (default: `bebity/linkedin-jobs-scraper`, `apify/glassdoor-jobs-scraper`, and `apify/indeed-jobs-scraper [PPR]`) to discover and rank relevant listings.
3. **Session management** – Loads the correct cookie bundle per platform, verifies expiry, and skips invalid sessions.
4. **Application orchestration** – Detects platform, injects cookies, launches automation, and loops until submission or failure.
5. **Claude-guided form filling** – Captures each step, asks Claude for the next action, and applies the response. You can optionally enable OpenRouter guidance for human-in-the-loop plans until full automation ships.
6. **Structured outputs** – Pushes per-job results and summary metrics into Apify datasets for easy reporting.

## Project structure

| Module                   | File                             | Responsibility                                                                                                                                                                                                                          |
| ------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry point              | `src/main.js`                    | Validates input, stores cookies, coordinates sessions, scouting, and applications.                                                                                                                                                      |
| Input validation         | `src/utils/inputValidator.js`    | Parses Cookie-Editor JSON blobs and validates applicant context with Zod.                                                                                                                                                               |
| Job scout                | `src/jobScout.js`                | Calls the LinkedIn (primary `bebity/linkedin-jobs-scraper`, fallback `apify/linkedin-jobs-scraper`), Glassdoor (`apify/glassdoor-jobs-scraper`), and Indeed (`apify/indeed-jobs-scraper [PPR]`) actors, then ranks listings by quality. |
| Session manager          | `src/sessionManager.js`          | Checks required cookies, estimates expiry, and gates access per platform.                                                                                                                                                               |
| Application orchestrator | `src/applicationOrchestrator.js` | Routes jobs to the correct automation flow and records outcomes.                                                                                                                                                                        |
| Form filler              | `src/formFiller.js`              | Placeholder for Claude-driven, multi-step form automation.                                                                                                                                                                              |
| Output manager           | `src/outputManager.js`           | Aggregates metrics and persists summary data in datasets.                                                                                                                                                                               |

## Input schema

Required actor input fields:

| Field                                     | Type                | Notes                                                      |
| ----------------------------------------- | ------------------- | ---------------------------------------------------------- |
| `linkedinCookies`                         | JSON string / array | Exported via Cookie-Editor after logging into LinkedIn.    |
| `indeedCookies`                           | JSON string / array | Exported via Cookie-Editor after logging into Indeed.      |
| `jobKeywords`                             | string[]            | Keywords used for scouting (e.g. `['React', 'frontend']`). |
| `jobLocation`                             | string              | Preferred city / region.                                   |
| `firstName`, `lastName`, `email`, `phone` | string              | Personal contact details.                                  |
| `careerContext`                           | string              | Skills & experience narrative for Claude prompting.        |
| `anthropicApiKey`                         | string              | Claude API key (usually starts with `sk-ant-`).            |

Optional fields:

| Field                      | Type    | Default           | Description                                                                            |
| -------------------------- | ------- | ----------------- | -------------------------------------------------------------------------------------- |
| `resumeUrl`                | string  | –                 | Direct link to resume PDF.                                                             |
| `skipExpiredSessions`      | boolean | `true`            | Skip applications when cookies look invalid or expired.                                |
| `validateSessionsFirst`    | boolean | `true`            | Perform local cookie sanity checks before scouting.                                    |
| `useOpenRouterSuggestions` | boolean | `false`           | Draft manual guidance via the `apify/openrouter` proxy when automation is unavailable. |
| `openRouterModel`          | string  | `openrouter/auto` | Model slug sent to OpenRouter (e.g. `anthropic/claude-3.5-sonnet`).                    |

## Cookie export checklist

1. Install Cookie-Editor (Chrome/Firefox) or a compatible extension.
2. Log into LinkedIn in a regular tab, open the extension, and export cookies as `linkedin_cookies.json`.
3. Repeat for Indeed -> `indeed_cookies.json`.
4. Open the actor in Apify Console, paste the JSON blobs (or upload files) into the corresponding input fields.

Optional local smoke test:

```javascript
const playwright = require("playwright");
const cookies = require("./linkedin_cookies.json");

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  await context.addCookies(cookies);
  const page = await context.newPage();
  await page.goto("https://www.linkedin.com/jobs");
  console.log(await page.title());
  await browser.close();
})();
```

## Running locally

```bash
npm install
apify run
```

> The current `formFiller` module returns `NOT_IMPLEMENTED`, so runs will log scouting/session data without actually submitting applications.

### Configuring scraper actors

- LinkedIn: defaults to `bebity/linkedin-jobs-scraper`. Override with the `LINKEDIN_SCRAPER_ACTOR_ID` env var (e.g. set to `apify/linkedin-jobs-scraper`). A fallback to `apify/linkedin-jobs-scraper` runs automatically if the primary actor errors.
- Glassdoor: defaults to `apify/glassdoor-jobs-scraper`. Override with `GLASSDOOR_SCRAPER_ACTOR_ID` if you prefer a fork or self-hosted build. Failures are logged and the rest of the run continues.
- Indeed: defaults to `apify/indeed-jobs-scraper` (PPR). Override with `INDEED_SCRAPER_ACTOR_ID` if you have a clone or custom fork. Errors are logged and the run continues.

### MCP tooling

- `chrome-devtools-mcp` ships for local DOM inspection while iterating on Playwright flows. Launch it with `npx -y chrome-devtools-mcp` in a separate terminal when needed.
- `@upstash/context7-mcp` delivers up-to-date library documentation via the Model Context Protocol. Start a local server with `npx -y @upstash/context7-mcp --api-key YOUR_CONTEXT7_KEY` (API key optional for basic usage) and add it to your client of choice.
- For LLM context indexing, the Apify platform guidance from `https://docs.apify.com/llms.txt` is mirrored in `docs/apify-llms.txt`. Point Context7 or other ingestion pipelines to that local file to keep responses grounded in current platform docs.

### OpenRouter guidance (optional)

- Toggle `useOpenRouterSuggestions` to have the actor call the `apify/openrouter` proxy for a numbered action plan, personalization cues, and a short elevator pitch per job.
- The proxy automatically authenticates with your `APIFY_TOKEN`. When running locally, export the token (`export APIFY_TOKEN=...`) before executing `apify run`.
- Adjust `openRouterModel` if you prefer a specific provider or model slug—any OpenRouter-supported identifier works (e.g. `anthropic/claude-3.5-sonnet`, `google/gemini-1.5-pro`).

## Roadmap

- [ ] Implement Claude-guided, multi-step form automation in `FormFiller`.
- [ ] Add Playwright flows for LinkedIn Easy Apply and Indeed Native Apply.
- [ ] Capture screenshots per step and upload to key-value store for auditing.
- [ ] Enrich output dataset with Claude reasoning traces and resume attachment status.
- [ ] Wire up optional validation run that opens each platform to confirm login before scouting.

## Demo outline

1. Highlight the manual application burden.
2. Walk through the one-time cookie export.
3. Show the actor input JSON.
4. Run the actor, narrating session checks and job ranking logs.
5. Close with dataset metrics: sessions valid vs expiring, jobs applied/skipped.
