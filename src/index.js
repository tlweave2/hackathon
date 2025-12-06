// src/index.js — entry point for the AutoApply Agent

const { Actor } = require('apify');
const { jobScout } = require('./jobScout');
const { applyToJob } = require('./applicationOrchestrator');
const { pushResult } = require('./outputManager');

Actor.main(async () => {
    const input = await Actor.getInput({}) ?? {};
    const browser = await Actor.launchPlaywright({ stealth: true });

    const jobs = await jobScout(input);
    const cookieMap = {
        linkedin: input.linkedinCookies ?? [],
        indeed: input.indeedCookies ?? [],
    };

    const log = Actor.getLogger();

    for (const job of jobs) {
        await applyToJob({ job, browser, cookieMap, log });
    }

    await pushResult({ summary: 'run complete', jobsProcessed: jobs.length });
    await browser.close();
});
