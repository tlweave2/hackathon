// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor } from 'apify';
// Crawlee - web scraping and browser automation library (Read more at https://crawlee.dev)
import { CheerioCrawler, Dataset } from 'crawlee';

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Structure of input is defined in input_schema.json
const input = await Actor.getInput();
const {
    jobKeywords = ['software engineer'],
    location = 'Remote',
    platforms = ['linkedin', 'indeed', 'simplyhired'],
    maxJobsPerPlatform = 100,
    experienceLevel = 'any',
    jobType = 'any',
    postedWithin = 'week'
} = input ?? {};

console.log('🚀 Starting EasyJobs Multi-Platform Scraper');
console.log(`📝 Keywords: ${jobKeywords.join(', ')}`);
console.log(`📍 Location: ${location}`);
console.log(`🌐 Platforms: ${platforms.join(', ')}`);
console.log(`🎯 Target: ${maxJobsPerPlatform} jobs per platform`);

// Helper to encode URL parameters
const encode = (str) => encodeURIComponent(str);

// Track job counts per platform
const jobCounts = { linkedin: 0, indeed: 0, simplyhired: 0 };

// Set to track unique job URLs to avoid duplicates
const seenUrls = new Set();

// Build search URLs for each platform WITH PAGINATION
function buildLinkedInUrls(keywords, loc, numPages = 5) {
    const urls = [];
    const keywordQuery = keywords.join(' ');
    
    for (let page = 0; page < numPages; page++) {
        let url = `https://www.linkedin.com/jobs/search/?keywords=${encode(keywordQuery)}&location=${encode(loc)}&start=${page * 25}`;
        if (postedWithin === '24hours') url += '&f_TPR=r86400';
        else if (postedWithin === 'week') url += '&f_TPR=r604800';
        else if (postedWithin === 'month') url += '&f_TPR=r2592000';
        if (jobType === 'full-time') url += '&f_JT=F';
        else if (jobType === 'part-time') url += '&f_JT=P';
        else if (jobType === 'contract') url += '&f_JT=C';
        else if (jobType === 'internship') url += '&f_JT=I';
        if (experienceLevel === 'entry') url += '&f_E=2';
        else if (experienceLevel === 'mid') url += '&f_E=3';
        else if (experienceLevel === 'senior') url += '&f_E=4';
        else if (experienceLevel === 'executive') url += '&f_E=5';
        urls.push({ url, userData: { platform: 'linkedin', page } });
    }
    return urls;
}

function buildIndeedUrls(keywords, loc, numPages = 10) {
    const urls = [];
    const keywordQuery = keywords.join(' ');
    
    for (let page = 0; page < numPages; page++) {
        let url = `https://www.indeed.com/jobs?q=${encode(keywordQuery)}&l=${encode(loc)}&start=${page * 10}`;
        if (postedWithin === '24hours') url += '&fromage=1';
        else if (postedWithin === 'week') url += '&fromage=7';
        else if (postedWithin === 'month') url += '&fromage=30';
        if (jobType === 'full-time') url += '&jt=fulltime';
        else if (jobType === 'part-time') url += '&jt=parttime';
        else if (jobType === 'contract') url += '&jt=contract';
        else if (jobType === 'internship') url += '&jt=internship';
        urls.push({ url, userData: { platform: 'indeed', page } });
    }
    return urls;
}

function buildSimplyHiredUrls(keywords, loc, numPages = 10) {
    const urls = [];
    const keywordQuery = keywords.join(' ');
    
    for (let page = 1; page <= numPages; page++) {
        let url = `https://www.simplyhired.com/search?q=${encode(keywordQuery)}&l=${encode(loc)}&pn=${page}`;
        if (postedWithin === '24hours') url += '&fdb=1';
        else if (postedWithin === 'week') url += '&fdb=7';
        else if (postedWithin === 'month') url += '&fdb=30';
        if (jobType === 'full-time') url += '&fjt=fulltime';
        else if (jobType === 'part-time') url += '&fjt=parttime';
        else if (jobType === 'contract') url += '&fjt=contract';
        else if (jobType === 'internship') url += '&fjt=internship';
        urls.push({ url, userData: { platform: 'simplyhired', page } });
    }
    return urls;
}

// Proxy configuration to rotate IP addresses and prevent blocking
const proxyConfiguration = await Actor.createProxyConfiguration();

// Calculate pages needed (approximately 10-25 jobs per page)
const pagesNeeded = Math.ceil(maxJobsPerPlatform / 15);

// ========================================
// CHEERIO CRAWLER - For all platforms
// ========================================
const crawler = new CheerioCrawler({
    proxyConfiguration,
    maxRequestsPerCrawl: pagesNeeded * platforms.length * 3,
    maxConcurrency: 3,
    requestHandlerTimeoutSecs: 90,
    
    async requestHandler({ request, $, log, enqueueLinks }) {
        const { platform, page } = request.userData;
        
        log.info(`Processing ${platform} page ${page + 1}`, { url: request.loadedUrl });
        
        if (platform === 'linkedin') {
            await handleLinkedIn($, log, request);
        } else if (platform === 'indeed') {
            await handleIndeed($, log, request);
        } else if (platform === 'simplyhired') {
            await handleSimplyHired($, log, request);
        }
    },
    
    async failedRequestHandler({ request, log }) {
        log.error(`Request failed: ${request.url}`);
    }
});

// LinkedIn job parsing
async function handleLinkedIn($, log, request) {
    const jobs = [];
    
    $('.jobs-search__results-list li, .base-card').each((index, element) => {
        if (jobCounts.linkedin >= maxJobsPerPlatform) return false;
        
        const $el = $(element);
        const title = $el.find('.base-search-card__title, .job-card-list__title').text().trim();
        const company = $el.find('.base-search-card__subtitle, .job-card-container__company-name').text().trim();
        const locationText = $el.find('.job-search-card__location, .job-card-container__metadata-item').text().trim();
        const link = $el.find('a.base-card__full-link, a.job-card-list__title').attr('href');
        const postedDate = $el.find('.job-search-card__listdate, time').attr('datetime') || $el.find('time').text().trim();
        
        const jobUrl = link ? (link.startsWith('http') ? link.split('?')[0] : `https://www.linkedin.com${link.split('?')[0]}`) : null;
        
        if (title && company && jobUrl && !seenUrls.has(jobUrl)) {
            seenUrls.add(jobUrl);
            jobs.push({
                platform: 'linkedin',
                title,
                company,
                location: locationText,
                url: link ? (link.startsWith('http') ? link : `https://www.linkedin.com${link}`) : request.loadedUrl,
                postedDate,
                scrapedAt: new Date().toISOString(),
                searchKeywords: jobKeywords.join(', '),
                searchLocation: location
            });
            jobCounts.linkedin++;
        }
    });
    
    if (jobs.length > 0) {
        log.info(`📋 Found ${jobs.length} LinkedIn jobs (Total: ${jobCounts.linkedin})`);
        await Dataset.pushData(jobs);
    } else {
        log.info('No new LinkedIn jobs found on this page');
    }
}

// Indeed job parsing
async function handleIndeed($, log, request) {
    const jobs = [];
    
    $('.job_seen_beacon, .jobsearch-ResultsList > li, .result').each((index, element) => {
        if (jobCounts.indeed >= maxJobsPerPlatform) return false;
        
        const $el = $(element);
        const title = $el.find('.jobTitle span, h2.jobTitle a span, .jobtitle').text().trim();
        const company = $el.find('.companyName, .company, [data-testid="company-name"]').text().trim();
        const locationText = $el.find('.companyLocation, .location, [data-testid="text-location"]').text().trim();
        const salary = $el.find('.salary-snippet, .salaryText, [data-testid="attribute_snippet_testid"]').text().trim();
        const snippet = $el.find('.job-snippet, .summary, [data-testid="job-snippet"]').text().trim();
        const linkEl = $el.find('a.jcs-JobTitle, h2.jobTitle a, a.jobtitle');
        const jobId = $el.attr('data-jk') || linkEl.attr('data-jk');
        
        const jobUrl = jobId ? `https://www.indeed.com/viewjob?jk=${jobId}` : null;
        
        if (title && company && jobUrl && !seenUrls.has(jobUrl)) {
            seenUrls.add(jobUrl);
            jobs.push({
                platform: 'indeed',
                title,
                company,
                location: locationText,
                salary: salary || null,
                description: snippet,
                url: jobUrl,
                scrapedAt: new Date().toISOString(),
                searchKeywords: jobKeywords.join(', '),
                searchLocation: location
            });
            jobCounts.indeed++;
        }
    });
    
    if (jobs.length > 0) {
        log.info(`📋 Found ${jobs.length} Indeed jobs (Total: ${jobCounts.indeed})`);
        await Dataset.pushData(jobs);
    } else {
        log.info('No new Indeed jobs found on this page');
    }
}

// SimplyHired job parsing
async function handleSimplyHired($, log, request) {
    const jobs = [];
    
    // SimplyHired job card selectors
    $('[data-testid="searchSerpJob"], .SerpJob, .jobposting-card, article[data-id], li[data-jobkey]').each((index, element) => {
        if (jobCounts.simplyhired >= maxJobsPerPlatform) return false;
        
        const $el = $(element);
        const title = $el.find('[data-testid="searchSerpJobTitle"], .jobposting-title, h2 a, .SerpJob-title a, a[data-testid="job-title"]').text().trim();
        const company = $el.find('[data-testid="companyName"], .jobposting-company, .SerpJob-company, span[data-testid="company-name"]').text().trim();
        const locationText = $el.find('[data-testid="searchSerpJobLocation"], .jobposting-location, .SerpJob-location, span[data-testid="job-location"]').text().trim();
        const salary = $el.find('[data-testid="searchSerpJobSalary"], .jobposting-salary, .SerpJob-salary').text().trim();
        const snippet = $el.find('.jobposting-snippet, .SerpJob-description').text().trim();
        const link = $el.find('a[data-testid="searchSerpJobTitle"], h2 a, .SerpJob-title a, a[data-testid="job-title"]').attr('href');
        
        const jobUrl = link ? (link.startsWith('http') ? link : `https://www.simplyhired.com${link}`) : null;
        
        if (title && company && jobUrl && !seenUrls.has(jobUrl)) {
            seenUrls.add(jobUrl);
            jobs.push({
                platform: 'simplyhired',
                title,
                company,
                location: locationText,
                salary: salary || null,
                description: snippet,
                url: jobUrl,
                scrapedAt: new Date().toISOString(),
                searchKeywords: jobKeywords.join(', '),
                searchLocation: location
            });
            jobCounts.simplyhired++;
        }
    });
    
    if (jobs.length > 0) {
        log.info(`📋 Found ${jobs.length} SimplyHired jobs (Total: ${jobCounts.simplyhired})`);
        await Dataset.pushData(jobs);
    } else {
        log.info('No new SimplyHired jobs found on this page');
    }
}

// ========================================
// RUN CRAWLER
// ========================================
console.log(`🔗 Starting job search with pagination...`);

// Build URLs for each platform WITH PAGINATION
const urls = [];

if (platforms.includes('linkedin')) {
    const linkedinUrls = buildLinkedInUrls(jobKeywords, location, pagesNeeded);
    urls.push(...linkedinUrls);
    console.log(`   LinkedIn: ${linkedinUrls.length} pages to scrape`);
}

if (platforms.includes('indeed')) {
    const indeedUrls = buildIndeedUrls(jobKeywords, location, pagesNeeded);
    urls.push(...indeedUrls);
    console.log(`   Indeed: ${indeedUrls.length} pages to scrape`);
}

if (platforms.includes('simplyhired')) {
    const simplyhiredUrls = buildSimplyHiredUrls(jobKeywords, location, pagesNeeded);
    urls.push(...simplyhiredUrls);
    console.log(`   SimplyHired: ${simplyhiredUrls.length} pages to scrape`);
}

console.log(`📄 Total: ${urls.length} pages to crawl`);
await crawler.run(urls);

// Final summary
const totalJobs = jobCounts.linkedin + jobCounts.indeed + jobCounts.simplyhired;
console.log('\n📊 Scraping Summary:');
console.log(`   LinkedIn: ${jobCounts.linkedin} jobs`);
console.log(`   Indeed: ${jobCounts.indeed} jobs`);
console.log(`   SimplyHired: ${jobCounts.simplyhired} jobs`);
console.log(`   Total: ${totalJobs} unique jobs`);

// Gracefully exit the Actor process
await Actor.exit();
