# Cookie Export & Testing Guide

## Before Saturday Morning

### 1. Export Your Cookies (Thursday/Friday Night)

#### LinkedIn Cookies
1. Install [Cookie-Editor](https://chrome.google.com/webstore) extension
2. Log into LinkedIn completely at https://www.linkedin.com
3. Navigate to https://www.linkedin.com/jobs
4. Click the Cookie-Editor extension icon
5. Click **Export** → **JSON**
6. Copy the entire JSON array
7. Paste into `test-input-minimal.json` as the `linkedinCookies` value

#### Indeed Cookies (Optional)
1. Log into Indeed at https://www.indeed.com
2. Click Cookie-Editor extension icon
3. Click **Export** → **JSON**
4. Copy and paste into `indeedCookies`

### 2. Get Your Anthropic API Key
1. Go to https://console.anthropic.com/settings/keys
2. Create new key or copy existing
3. Format: `sk-ant-api03-...`
4. Paste into `anthropicApiKey` field in test input

### 3. Validate Your Test Input

```powershell
# Validate minimal test input
node test-input-validator.js test-input-minimal.json
```

You should see:
```
✅ All required fields present
✅ LinkedIn: 15 valid cookies
✅ API key format looks valid
✅ Input validation passed!
```

## Saturday Morning Quick Test

### Test 1: Cookie Validation Only (2 minutes)
```powershell
cd c:\Users\weave\Downloads\apify\hackathon
npm install
node test-input-validator.js test-input-minimal.json
```

### Test 2: Local Actor Run (5 minutes)
```powershell
# Run with your test input
npx apify run --input-file=test-input-minimal.json
```

Expected output:
- ✅ Session validation shows "logged in"
- ✅ Finds 3 jobs
- ✅ Attempts to apply to each

### Test 3: Deploy to Apify Cloud (Before Demo)
```powershell
# Login once
npx apify login

# Push to cloud
npx apify push

# Run in cloud via UI with test input
```

## Troubleshooting

### "Session expired" errors
- Re-export cookies Saturday morning
- LinkedIn cookies expire after ~30 days
- Make sure you're fully logged in before exporting

### "No cookies for platform" warnings
- Check that cookie `domain` field includes `.linkedin.com` or `.indeed.com`
- Export while on the actual platform domain

### API key invalid
- Verify it starts with `sk-ant-api03-`
- Check no extra spaces or quotes
- Regenerate from console.anthropic.com if needed

## Example Valid Cookie
```json
{
  "name": "li_at",
  "value": "AQEDATEABCDxyz123...",
  "domain": ".linkedin.com",
  "path": "/",
  "expires": 1735689600,
  "httpOnly": true,
  "secure": true,
  "sameSite": "None"
}
```

The most important cookies:
- **LinkedIn**: `li_at`, `JSESSIONID`
- **Indeed**: `CTK`, `INDEED_CSRF_TOKEN`

## Success Criteria
Before you start the hackathon work, confirm:
- [ ] Cookie validator passes
- [ ] You have real exported cookies (not placeholder text)
- [ ] API key is valid and starts with `sk-ant-`
- [ ] Test input has your real name/email
- [ ] `maxJobsToProcess` set to 3 or less for initial test
