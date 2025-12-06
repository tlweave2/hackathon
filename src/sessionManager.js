// sessionManager.js — cookie loading and platform verification

async function injectCookies(context, cookies) {
    if (!Array.isArray(cookies) || cookies.length === 0) {
        return false;
    }
    
    try {
        await context.addCookies(cookies);
        return true;
    } catch (error) {
        console.error('Cookie injection failed:', error);
        return false;
    }
}

async function verifyLoggedIn(page, platform) {
    const checks = {
        'linkedin.com': async () => {
            // Wait for either logged-in nav or sign-in button
            try {
                await page.waitForSelector('nav.global-nav', { timeout: 5000 });
                return { loggedIn: true, message: 'LinkedIn nav detected' };
            } catch {
                return { loggedIn: false, message: 'Not logged in to LinkedIn' };
            }
        },
        'indeed.com': async () => {
            try {
                await page.waitForSelector('[data-gnav-element-name]', { timeout: 5000 });
                return { loggedIn: true, message: 'Indeed nav detected' };
            } catch {
                return { loggedIn: false, message: 'Not logged in to Indeed' };
            }
        }
    };

    const checker = checks[platform];
    if (!checker) {
        return { loggedIn: false, message: `Unknown platform: ${platform}` };
    }

    return await checker();
}

function getCookiesForJob(job, cookieMap) {
    const hostname = new URL(job.url).hostname;
    if (hostname.includes('linkedin.com')) return cookieMap.linkedin || [];
    if (hostname.includes('indeed.com')) return cookieMap.indeed || [];
    return [];
}

module.exports = {
    injectCookies,
    verifyLoggedIn,
    getCookiesForJob,
};
