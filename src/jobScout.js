// jobScout.js — finds jobs using Apify LinkedIn Jobs Scraper Actor

const { Actor } = require('apify');

async function jobScout(input) {
    const keywords = input.jobKeywords || 'software engineer';
    const location = input.jobLocation || 'Remote';
    const maxJobs = input.maxJobsToProcess || 10;
    
    console.log(`Searching LinkedIn for "${keywords}" in "${location}"...`);
    
    // Call Apify's LinkedIn Jobs Scraper Actor
    // https://apify.com/bebity/linkedin-jobs-scraper
    const scraperInput = {
        keywords: keywords,
        location: location,
        maxResults: maxJobs * 2, // Get extra in case some aren't Easy Apply
        easyApplyOnly: true,
    };
    
    console.log('Calling LinkedIn Jobs Scraper Actor...');
    
    const scraperRun = await Actor.call('bebity/linkedin-jobs-scraper', scraperInput);
    
    if (!scraperRun || !scraperRun.defaultDatasetId) {
        throw new Error('LinkedIn scraper returned no results');
    }
    
    // Fetch results from the scraper's dataset
    const client = Actor.newClient();
    const { items } = await client.dataset(scraperRun.defaultDatasetId).listItems();
    
    console.log(`LinkedIn scraper found ${items.length} jobs`);
    
    // Transform scraper results to our job format
    const jobs = items.map(item => ({
        url: item.url || item.jobUrl,
        title: item.title || item.jobTitle,
        company: item.company || item.companyName,
        platform: 'linkedin.com',
        easyApply: true,
        description: item.description,
        location: item.location
    })).filter(job => job.url); // Remove jobs without URLs
    
    console.log(`Processed ${jobs.length} valid jobs`);
    
    return jobs.slice(0, maxJobs);
}

module.exports = { jobScout };
