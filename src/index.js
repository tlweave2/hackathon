// src/index.js — PRODUCTION VERSION with full integration

const { Actor } = require('apify');
const { jobScout } = require('./jobScout');
const { applyToJob } = require('./applicationOrchestrator');
const { validateSessionsBeforeStart } = require('./sessionManager');
const { pushResult, pushSessionValidation, generateFinalSummary } = require('./outputManager');

Actor.main(async () => {
    const input = await Actor.getInput({}) ?? {};
    const log = Actor.getLogger();

    log.info('AutoApply Agent starting...');

    // Validate required inputs
    if (!input.anthropicApiKey) {
        throw new Error('anthropicApiKey is required');
    }

    if (!input.linkedinCookies && !input.indeedCookies) {
        throw new Error('At least one set of cookies (linkedinCookies or indeedCookies) is required');
    }

    if (!input.firstName || !input.lastName || !input.email) {
        throw new Error('firstName, lastName, and email are required');
    }

    // Prepare cookie map
    const cookieMap = {
        linkedin: input.linkedinCookies ?? [],
        indeed: input.indeedCookies ?? [],
    };

    // Launch browser
    const browser = await Actor.launchPlaywright({ 
        stealth: true,
        headless: true // Set to false for debugging
    });

    // STEP 1: Validate sessions before starting (if requested)
    if (input.validateSessionsFirst !== false) {
        log.info('Validating sessions before job search...');
        const sessionResults = await validateSessionsBeforeStart(cookieMap, browser, log);
        await pushSessionValidation(sessionResults);

        const hasValidSession = Object.values(sessionResults).some(r => r.valid || r.loggedIn);
        
        if (!hasValidSession) {
            log.error('No valid sessions found. Please check your cookies and try again.');
            await browser.close();
            return;
        }
    }

    // STEP 2: Scout for jobs
    log.info('Scouting for jobs...');
    const jobs = await jobScout(input);
    log.info(`Found ${jobs.length} jobs to process`);

    if (jobs.length === 0) {
        log.warn('No jobs found matching criteria');
        await browser.close();
        return;
    }

    // STEP 3: Prepare user context for Claude
    const userContext = {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone || '',
        careerContext: input.careerContext || '',
        resumeUrl: input.resumeUrl || ''
    };

    // STEP 4: Process each job
    const results = [];
    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        log.info(`Processing job ${i + 1}/${jobs.length}: ${job.url}`);

        try {
            const result = await applyToJob({ 
                job, 
                browser, 
                cookieMap, 
                log,
                anthropicApiKey: input.anthropicApiKey,
                userContext
            });
            
            results.push(result);

            // Rate limiting: wait between applications
            if (i < jobs.length - 1) {
                const delayMs = 5000 + Math.random() * 5000; // 5-10 seconds
                log.info(`Waiting ${Math.round(delayMs/1000)}s before next application...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }

        } catch (error) {
            log.error(`Failed to process job ${job.url}:`, error);
            results.push({
                job,
                status: 'failed',
                error: error.message
            });
        }
    }

    // STEP 5: Generate final summary
    log.info('Generating final summary...');
    const summary = await generateFinalSummary(jobs, results);
    
    log.info('AutoApply Agent complete!');
    log.info(`Summary: ${summary.submitted} submitted, ${summary.skipped} skipped, ${summary.failed} failed`);

    await browser.close();
});
