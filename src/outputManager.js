// outputManager.js — records application outcomes

const { Actor } = require('apify');

async function pushResult(record) {
    await Actor.pushData(record);
}

async function pushSessionValidation(sessionResults) {
    await Actor.pushData({
        type: 'session-validation',
        timestamp: new Date().toISOString(),
        sessions: sessionResults
    });
}

async function generateFinalSummary(jobs, results) {
    const summary = {
        total: jobs.length,
        submitted: results.filter(r => r.status === 'submitted').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        failed: results.filter(r => r.status === 'failed').length,
        timestamp: new Date().toISOString()
    };
    
    await Actor.pushData({
        type: 'final-summary',
        ...summary
    });
    
    return summary;
}

module.exports = { pushResult, pushSessionValidation, generateFinalSummary };
