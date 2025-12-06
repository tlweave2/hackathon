// applicationOrchestrator.js — orchestrates the job application process

const { injectCookies, verifyLoggedIn, getCookiesForJob } = require('./sessionManager');
const { fillForm } = require('./formFiller');
const { pushResult } = require('./outputManager');

async function applyToJob({ job, browser, cookieMap, log }) {
    const cookies = getCookiesForJob(job, cookieMap);
    const context = await browser.newContext();
    await injectCookies(context, cookies);

    const page = await context.newPage();
    await page.goto(job.url, { waitUntil: 'domcontentloaded' });

    const verification = await verifyLoggedIn(page, job.platform);
    if (!verification.loggedIn) {
        await pushResult({ job, status: 'skipped', reason: 'session-expired', verification });
        await context.close();
        return;
    }

    await fillForm({ page, job, log });
    await pushResult({ job, status: 'submitted', sessionValid: true });
    await context.close();
}

module.exports = { applyToJob };
