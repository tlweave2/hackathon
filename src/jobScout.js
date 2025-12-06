// jobScout.js — finds and scores jobs using existing Apify Actors

async function jobScout(input) {
    // TODO: call the Apify Actors that aggregate jobs from LinkedIn/Indeed/etc.
    // Return an array of job objects with platform metadata so the orchestrator can continue.
    return [{ platform: 'linkedin.com', url: 'https://linkedin.com/jobs' }];
}

module.exports = { jobScout };
