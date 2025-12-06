# AutoApply Agent

This repository hosts the AutoApply Agent that runs inside Apify Actors with cookie-based authentication. The [revised plan](AUTOAPPLY-AGENT-REVISED-PLAN.md) describes the goals, architecture, and demo workflow.

## Layout

```
hackathon
├─ AUTOAPPLY-AGENT-REVISED-PLAN.md
├─ README.md
├─ package.json
├─ .gitignore
└─ src/
   ├─ index.js
   ├─ jobScout.js
   ├─ sessionManager.js
   ├─ applicationOrchestrator.js
   ├─ formFiller.js
   └─ outputManager.js
```

## Getting started

1. `npm install`
2. Place your exported cookies into the Actor input (`linkedinCookies`, `indeedCookies`) as described in the plan.
3. Run `npm start` to launch the stubbed orchestrator (this will need to be completed with real Apify logic).

## Notes

- The `src/` modules are currently stubs that match the revised plan sections, providing placeholders to hook into the Actor once you implement the details.
- Please refer to `AUTOAPPLY-AGENT-REVISED-PLAN.md` for the input schema, session management strategy, and module responsibilities before contributing.