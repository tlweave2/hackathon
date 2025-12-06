// outputManager.js — PRODUCTION VERSION with Apify Dataset integration

const { Actor } = require('apify');

async function pushResult(record) {
    // Add timestamp if not present
    if (!record.timestamp) {
        record.timestamp = new Date().toISOString();
    }

    // Log to console
    console.log('Result:', JSON.stringify(record, null, 2));

    // Push to Apify Dataset for persistence
    try {
        await Actor.pushData(record);
    } catch (error) {
        console.error('Failed to push to dataset:', error.message);
    }
}

async function pushSessionValidation(sessionResults) {
    const summary = {
        type: 'session_validation',
        timestamp: new Date().toISOString(),
        platforms: sessionResults,
        summary: {
            totalPlatforms: Object.keys(sessionResults).length,
            validSessions: Object.values(sessionResults).filter(r => r.valid || r.loggedIn).length,
            invalidSessions: Object.values(sessionResults).filter(r => !(r.valid || r.loggedIn)).length
        }
    };

    await pushResult(summary);
    return summary;
}

async function generateFinalSummary(jobs, results) {
    const summary = {
        type: 'final_summary',
        timestamp: new Date().toISOString(),
        totalJobs: jobs.length,
        submitted: results.filter(r => r.status === 'submitted').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        failed: results.filter(r => r.status === 'failed').length,
        skipReasons: {},
        platforms: {}
    };

    // Count skip reasons
    results.filter(r => r.status === 'skipped').forEach(r => {
        const reason = r.reason || 'unknown';
        summary.skipReasons[reason] = (summary.skipReasons[reason] || 0) + 1;
    });

    // Count by platform
    jobs.forEach(job => {
        const hostname = new URL(job.url).hostname;
        const platform = hostname.includes('linkedin') ? 'linkedin' : 
                        hostname.includes('indeed') ? 'indeed' : 
                        'other';
        summary.platforms[platform] = (summary.platforms[platform] || 0) + 1;
    });

    await pushResult(summary);
    return summary;
}

module.exports = { 
    pushResult,
    pushSessionValidation,
    generateFinalSummary
};
