# AutoApply Agent Revised Plan

## Executive summary
- Build a job-application automation Actor that runs using a pre-authenticated LinkedIn/Indeed session owned by the user. No new account, password, or email verification is required because the Actor loads cookies exported from the users browser.
- Users must log into LinkedIn/Indeed ahead of time, export cookies via Cookie-Editor, and upload those files when starting the Actor. The cookies are stored in the Actor key-value store and remain valid for 30+ days.
- The Actor scouts job listings, filters/ranks them, loads the correct cookies for each platform, and applies using Claude-powered form automation while tracking session status and application results.

## Key functionality
1. **Input validation**
   - Ensure both cookie blobs are valid JSON objects and contain expected fields.
   - Validate career context (name, email, phone, resume data, keywords, locations).
   - Confirm API keys (Anthropic/Claude) are provided and well-formed.
2. **Job scout**
   - Reuse existing Apify Actors to scout a wide range of listings without forcing Easy Apply.
   - Aggregate results and rank by quality, giving Easy Apply jobs bonus points but still surfacing others.
3. **Session manager**
   - Load the correct cookie bundle for each platform (LinkedIn, Indeed, or skip platforms without cookies).
   - Inject cookies into Playwright browser contexts and verify the logged-in state before application.
   - Skip jobs whose sessions have expired and log that event.
4. **Application orchestrator**
   - Detect platform per job URL, inject cookies, verify login, click the apply button (Easy Apply, generic Apply, etc.), and capture screenshots for Claude.
   - Handle multi-step flows by screenshotting each step, running Claude for guidance, and executing actions until submission is confirmed.
5. **Form filler**
   - Support looping through multi-step flows via Next/Continue detection before final Submit/Review.
   - Use Claude Vision assistance where needed for complex forms.
6. **Output dataset**
   - Emit per-job records containing submission status, session validity/expiry, login verification, cookies used, and a screenshot reference.
   - Provide summary metrics such as how many sessions are valid, sessions expiring, and jobs skipped due to expired sessions.

## Cookie-based authentication strategy
1. Install Cookie-Editor or EditThisCookie (Chrome/Firefox).
2. Export LinkedIn cookies after logging in, save as `linkedin_cookies.json`.
3. Export Indeed cookies after logging in, save as `indeed_cookies.json`.
4. Upload both JSON files as Actor input; store them in the key-value store with 30+ day validity.
5. Optional pre-run test script:
```javascript
const cookies = require('./linkedin_cookies.json');
const browser = await playwright.chromium.launch();
const context = await browser.newContext();
await context.addCookies(cookies);
const page = await context.newPage();
await page.goto('https://linkedin.com/jobs');
// Expect to see the authenticated user name rather than "Join now".
```

## Module breakdown
| Module | File | Responsibility |
| --- | --- | --- |
| Job Scout | `src/jobScout.js` | Scout jobs via existing Apify Actors, filter/score without Easy Apply restriction, and supply ranked listings. |
| Session Manager | `src/sessionManager.js` | Load/validate cookies, inject them into browsers, detect platforms, verify logins, and report expired sessions. |
| Application Orchestrator | `src/applicationOrchestrator.js` | Inject cookies per job, verify session, navigate to jobs, locate apply buttons (including multi-label search), capture screenshots for Claude, and run Claude-suggested actions. |
| Form Filler | `src/formFiller.js` | Manage multi-step forms by repeating screenshot -> Claude -> action loops until submission. |
| Output Manager | `src/outputManager.js` (if needed) | Record application metrics, session summaries, and dataset entries. |

## Input parameters
| Input | Required | Description |
| --- | --- | --- |
| `linkedinCookies` | Yes | JSON export from LinkedIn using Cookie-Editor. |
| `indeedCookies` | Yes | JSON export from Indeed using Cookie-Editor. |
| `jobKeywords` | Yes | Search terms for job scouting. |
| `jobLocation` | Yes | Desired city/state. |
| `firstName`, `lastName`, `email`, `phone` | Yes | Personal contact details. |
| `careerContext` | Yes | Skills and experience summary for Claude. |
| `anthropicApiKey` | Yes | Claude API key for form filling intelligence. |
| `resumeUrl` | No | Optional URL to resume PDF. |
| `skipExpiredSessions` | No | Defaults to true; skip jobs when session invalidated. |
| `validateSessionsFirst` | No | Defaults to true; test cookies before scouting. |

## Outputs
- `applicationResults` dataset rows with fields: `sessionValid`, `sessionExpiredDuringProcess`, `loginVerified`, `cookiesUsed`, `jobUrl`, `status`, `screenshotUrl`, `timestamp`.
- Summary object containing `sessionsValid`, `sessionExpiryWarnings`, `jobsSkippedDueToExpiredSession`, and overall success metrics.

## Team roles
1. **Orchestrator Lead** – owns Core + Session Manager, adds cookie injection and session checks.
2. **Job Scout** – widens job discovery, removes Easy Apply mandate, ranks results.
3. **AI Engineer** – tunes Form Filler for multi-step flows and Claude interactions.
4. **UI/Demo** – documents cookie export guide and reinforces the one-time setup story.

## Timeline
- **Before Hackathon (Friday evening, 30 minutes)**
  1. Ensure LinkedIn/Indeed accounts exist and are logged in.
  2. Export cookies using Cookie-Editor and save JSON files.
  3. Upload both files to the Actor and confirm validity with the test script.
- **Saturday (as previously scheduled)**
  - 10:00-11:00 Setup
  - 11:00-13:00 Development (with cookie integration)
  - 13:00-13:30 Lunch
  - 13:30-15:00 Integration
  - 15:00-16:30 Testing
  - 16:30-17:00 Deploy & Demo

## Demo script highlights
1. Slide 1: Present the manual job application problem (20s).
2. Slide 2: Introduce AutoApply Agent as the solution leveraging real user sessions (30s).
3. Slide 3: Show one-time cookie export setup with screenshot (30s).
4. Slide 4: Live demo using Actor input (90s), highlighting logs such as “Loading session cookies” and showing actual logins.

## Notes
- Always remind users: Claude can err, so verify outputs before submission.
- Skip platforms without session cookies (e.g., `greenhouse.io`/`lever.co`) or log a warning asking for manual handling.
