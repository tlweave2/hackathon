# Development Setup Guide

## Prerequisites Installation

### 1. Install Apify CLI
```powershell
# Install globally via npm
npm install -g apify-cli

# Verify installation
apify --version

# Login to Apify (you'll need an account)
apify login
```

### 2. Install Dependencies
```powershell
cd c:\Users\weave\Downloads\apify\hackathon
npm install
```

## Already Done ✅

Your Actor is **already initialized** - you don't need `apify create`. You have:
- ✅ `.actor/actor.json` - Actor configuration
- ✅ `.actor/input_schema.json` - Input form definition
- ✅ `Dockerfile` - Container setup
- ✅ `package.json` - Dependencies
- ✅ `src/` - All source code modules

## MCP Servers Setup (Optional for Cursor)

MCP (Model Context Protocol) servers provide AI assistants with context about APIs and tools.

### Option 1: Apify MCP Documentation Server

This gives your AI assistant access to Apify documentation.

**Add to Cursor settings** (`.cursorrules` or Cursor MCP config):
```json
{
  "mcpServers": {
    "apify-docs": {
      "url": "https://mcp.apify.com/?tools=docs"
    }
  }
}
```

### Option 2: Chrome DevTools MCP Server

Helps with browser automation debugging.

```powershell
# Clone the repository
git clone https://github.com/ChromeDevTools/chrome-devtools-mcp.git
cd chrome-devtools-mcp

# Follow their setup instructions
npm install
npm run build
```

### Option 3: Upstash Context7

Provides memory/context persistence.

```powershell
git clone https://github.com/upstash/context7.git
cd context7
npm install
```

**Reality Check:** For a hackathon, **skip MCP setup** unless you have specific needs. Focus on getting the Actor working first.

## Local Development Workflow

### Test Locally (No Deployment)
```powershell
# Validate your test input
node test-input-validator.js test-input-minimal.json

# Run Actor locally with test input
npx apify run --input-file=test-input-minimal.json

# Output goes to ./storage/datasets/default/
# Logs appear in console
```

### Deploy to Apify Cloud
```powershell
# Push Actor to Apify platform
apify push

# This will:
# 1. Build Docker image
# 2. Upload to Apify
# 3. Create/update Actor in your account
# 4. Give you a URL to run it
```

### View Results
```powershell
# After local run, check results:
Get-Content ./storage/datasets/default/*.json | ConvertFrom-Json | Format-List

# Or explore in file explorer:
explorer ./storage/datasets/default/
```

## "Vibe Coding" with Actors 🎯

**What is "Vibe Coding" with Actors?**
Build quickly, iterate fast, use AI assistance, deploy often.

### The Flow:

1. **Write code in `src/`**
   - Modify `jobScout.js`, `formFiller.js`, etc.
   - Use Cursor/GitHub Copilot for suggestions

2. **Test locally immediately**
   ```powershell
   npx apify run --input-file=test-input-minimal.json
   ```

3. **Check logs and datasets**
   - Logs show in terminal
   - Results in `./storage/datasets/default/`

4. **Iterate**
   - Fix bugs
   - Add features
   - Re-run locally

5. **Deploy when ready**
   ```powershell
   apify push
   ```

6. **Run in cloud**
   - Go to app.apify.com
   - Find your Actor
   - Click "Try it"
   - Use web UI to run with real inputs

### Quick Iteration Loop

```powershell
# Make a change to src/formFiller.js
# Test it:
npx apify run --input-file=test-input-minimal.json

# See output immediately
# Fix bugs, repeat
```

## Debugging Tips

### Enable Headful Browser (See What's Happening)
```javascript
// In src/index.js, change:
const browser = await Actor.launchPlaywright({ 
    stealth: true,
    headless: false  // <-- Set to false to see browser
});
```

### Add More Logging
```javascript
log.info('Current step:', { stepNumber: i, action: 'filling form' });
```

### Check Screenshots
Screenshots are stored as base64 in dataset. Extract them:
```javascript
// The dataset record has screenshotBase64 field
// Decode and save to view:
const fs = require('fs');
const buffer = Buffer.from(record.screenshotBase64, 'base64');
fs.writeFileSync('debug.png', buffer);
```

## Common Commands Cheat Sheet

```powershell
# Install dependencies
npm install

# Validate input file
node test-input-validator.js test-input-minimal.json

# Run locally
npx apify run --input-file=test-input-minimal.json

# Run with custom input from stdin
echo '{"firstName":"Test"}' | npx apify run

# Deploy to Apify cloud
apify push

# Pull Actor from cloud (if you edit in web UI)
apify pull

# View local storage
explorer storage/datasets/default/

# Clean local storage
Remove-Item -Recurse -Force storage/
```

## File Structure Reference

```
hackathon/
├─ .actor/
│  ├─ actor.json           # Actor metadata
│  └─ input_schema.json    # Input form definition
├─ src/
│  ├─ index.js             # Entry point (Actor.main)
│  ├─ jobScout.js          # Find jobs
│  ├─ sessionManager.js    # Cookie handling
│  ├─ applicationOrchestrator.js  # Apply logic
│  ├─ formFiller.js        # Claude integration
│  └─ outputManager.js     # Results/logging
├─ storage/                # Local run data (gitignored)
│  ├─ datasets/
│  ├─ key_value_stores/
│  └─ request_queues/
├─ Dockerfile              # Container definition
├─ package.json            # Dependencies
├─ test-input-minimal.json # Test data
└─ test-input-validator.js # Input checker
```

## Saturday Morning Checklist

Before the hackathon starts:

- [ ] `npm install` completed successfully
- [ ] `apify login` authenticated
- [ ] Real cookies exported to `test-input-minimal.json`
- [ ] Real Anthropic API key in test input
- [ ] `node test-input-validator.js` passes
- [ ] `npx apify run --input-file=test-input-minimal.json` runs (even if it fails, it should start)
- [ ] You understand where to look for logs (terminal) and results (`./storage/datasets/default/`)

## Need Help During Hackathon?

1. **Logs not showing?** Check terminal output during `apify run`
2. **Actor fails immediately?** Run validator: `node test-input-validator.js`
3. **Can't find results?** Check `./storage/datasets/default/*.json`
4. **Browser not launching?** Set `headless: false` in `src/index.js`
5. **Form filling stuck?** Check Claude API key is valid and has credits

## Pro Tips

- **Start small**: Test with `maxJobsToProcess: 1` first
- **Use real data**: Export real cookies Thursday/Friday
- **Check credits**: Verify Anthropic API has credits before Saturday
- **Local first**: Test everything locally before deploying
- **Save often**: Commit to git after each working feature

Good luck! 🚀
