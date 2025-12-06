// formFiller.js — handles multi-step form filling with Claude assistance

async function fillForm({ page, job, log }) {
    log?.info('Starting form fill', { job: job.url });
    // Placeholder for screenshot -> Claude -> actions loop
    await page.waitForTimeout(500);
    log?.info('Assumed form completed for', { job: job.url });
}

module.exports = { fillForm };
