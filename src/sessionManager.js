// sessionManager.js — PRODUCTION VERSION with real verification

async function loadCookies(platform, storage) {
    // Fetch uploaded cookie file from key-value store or Actor input.
    return storage[platform] ?? [];
}

function validateCookies(cookies) {
    if (!Array.isArray(cookies)) return false;
    if (cookies.length === 0) return false;
    
    // Check that cookies have required fields
    return cookies.every(cookie => 
        cookie.name && cookie.value && cookie.domain
    );
}

async function injectCookies(context, cookies) {
    if (!validateCookies(cookies)) {
        console.log('Invalid cookies provided');
        return false;
    }
    
    try {
        await context.addCookies(cookies);
        return true;
    } catch (error) {
        console.error('Cookie injection failed:', error.message);
        return false;
    }
}

async function verifyLoggedIn(page, platform) {
    // Platform-specific login verification
    const checks = {
        'linkedin.com': async () => {
            try {
                // Look for logged-in navigation
                await page.waitForSelector('nav.global-nav, .global-nav__me', { timeout: 5000 });
                
                // Check for user profile menu
                const hasProfile = await page.$$eval('.global-nav__me', els => els.length > 0).catch(() => false);
                
                if (hasProfile) {
                    return { loggedIn: true, message: 'LinkedIn session verified (profile menu found)' };
                }
                
                return { loggedIn: true, message: 'LinkedIn nav detected' };
            } catch {
                // Check if we see sign-in button (means not logged in)
                const hasSignIn = await page.$$eval('a:has-text("Sign in")', els => els.length > 0).catch(() => false);
                
                if (hasSignIn) {
                    return { loggedIn: false, message: 'LinkedIn sign-in button detected - session expired' };
                }
                
                return { loggedIn: false, message: 'Could not verify LinkedIn session' };
            }
        },
        
        'indeed.com': async () => {
            try {
                // Indeed shows user menu when logged in
                await page.waitForSelector('[data-gnav-element-name="SignedInMenu"], #gnav-user-menu', { timeout: 5000 });
                return { loggedIn: true, message: 'Indeed session verified' };
            } catch {
                // Check for sign-in link
                const hasSignIn = await page.$$eval('a:has-text("Sign in")', els => els.length > 0).catch(() => false);
                
                if (hasSignIn) {
                    return { loggedIn: false, message: 'Indeed sign-in link detected - session expired' };
                }
                
                return { loggedIn: false, message: 'Could not verify Indeed session' };
            }
        }
    };

    const platformKey = Object.keys(checks).find(key => platform.includes(key));
    const checker = checks[platformKey];
    
    if (!checker) {
        return { 
            loggedIn: false, 
            message: `Unknown platform: ${platform}. Supported: linkedin.com, indeed.com` 
        };
    }

    return await checker();
}

function getCookiesForJob(job, cookieMap) {
    const hostname = new URL(job.url).hostname;
    
    if (hostname.includes('linkedin.com')) {
        return cookieMap.linkedin || [];
    }
    if (hostname.includes('indeed.com')) {
        return cookieMap.indeed || [];
    }
    
    console.warn(`No cookies available for platform: ${hostname}`);
    return [];
}

async function validateSessionsBeforeStart(cookieMap, browser, log) {
    // Test all sessions before starting job applications
    const results = {
        linkedin: { valid: false, message: '' },
        indeed: { valid: false, message: '' }
    };

    for (const [platform, cookies] of Object.entries(cookieMap)) {
        if (!cookies || cookies.length === 0) {
            results[platform] = { valid: false, message: 'No cookies provided' };
            continue;
        }

        const testUrls = {
            linkedin: 'https://www.linkedin.com/jobs',
            indeed: 'https://www.indeed.com'
        };

        const context = await browser.newContext();
        await injectCookies(context, cookies);
        
        const page = await context.newPage();
        try {
            await page.goto(testUrls[platform], { waitUntil: 'domcontentloaded', timeout: 15000 });
            const verification = await verifyLoggedIn(page, platform);
            results[platform] = verification;
            
            log?.info(`Session check for ${platform}:`, verification);
        } catch (error) {
            results[platform] = { valid: false, message: `Navigation failed: ${error.message}` };
        } finally {
            await context.close();
        }
    }

    return results;
}

module.exports = {
    loadCookies,
    validateCookies,
    injectCookies,
    verifyLoggedIn,
    getCookiesForJob,
    validateSessionsBeforeStart
};
