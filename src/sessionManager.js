// sessionManager.js — cookie loading and platform verification

async function loadCookies(platform, storage) {
    // Fetch uploaded cookie file from key-value store or Actor input.
    return storage[platform] ?? [];
}

function validateCookies(cookies) {
    return Array.isArray(cookies);
}

async function injectCookies(context, cookies) {
    if (!validateCookies(cookies)) return false;
    await context.addCookies(cookies);
    return true;
}

async function verifyLoggedIn(page, platform) {
    // Placeholder: platform-specific selectors
    return { loggedIn: true, message: `Assumed logged in on ${platform}` };
}

function getCookiesForJob(job, cookieMap) {
    const hostname = new URL(job.url).hostname;
    if (hostname.includes('linkedin.com')) {
        return cookieMap.linkedin;
    }
    if (hostname.includes('indeed.com')) {
        return cookieMap.indeed;
    }
    return [];
}

module.exports = {
    loadCookies,
    validateCookies,
    injectCookies,
    verifyLoggedIn,
    getCookiesForJob,
};
