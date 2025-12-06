// applicationOrchestrator.js — PRODUCTION VERSION with complete application flow

const { injectCookies, verifyLoggedIn, getCookiesForJob } = require('./sessionManager');
const { fillForm } = require('./formFiller');
const { pushResult } = require('./outputManager');

async function applyToJob({ job, browser, cookieMap, log, anthropicApiKey, userContext }) {
    log?.info('Starting application process', { job: job.url });

    // Get cookies for this job's platform
    const cookies = getCookiesForJob(job, cookieMap);
    
    if (cookies.length === 0) {
        log?.warn('No cookies available for this platform', { url: job.url });
        await pushResult({ 
            job, 
            status: 'skipped', 
            reason: 'no-cookies-for-platform',
            platform: new URL(job.url).hostname
        });
        return { job, status: 'skipped', reason: 'no-cookies-for-platform' };
    }

    // Create new browser context with cookies
    const context = await browser.newContext();
    const injected = await injectCookies(context, cookies);
    
    if (!injected) {
        log?.error('Cookie injection failed', { job: job.url });
        await pushResult({ 
            job, 
            status: 'skipped', 
            reason: 'cookie-injection-failed' 
        });
        await context.close();
        return { job, status: 'skipped', reason: 'cookie-injection-failed' };
    }

    const page = await context.newPage();
    
    try {
        // Navigate to job posting
        log?.info('Navigating to job...', { url: job.url });
        await page.goto(job.url, { 
            waitUntil: 'domcontentloaded', 
            timeout: 30000 
        });

        // Verify we're logged in
        const verification = await verifyLoggedIn(page, job.platform || new URL(job.url).hostname);
        log?.info('Session verification result', verification);
        
        if (!verification.loggedIn) {
            log?.warn('Session expired or invalid', { job: job.url, verification });
            
            // Take screenshot of login page for debugging
            const screenshotBuffer = await page.screenshot({ fullPage: true });
            
            await pushResult({ 
                job, 
                status: 'skipped', 
                reason: 'session-expired', 
                verification,
                screenshotBase64: screenshotBuffer.toString('base64')
            });
            
            await context.close();
            return { job, status: 'skipped', reason: 'session-expired' };
        }

        // Session is valid - proceed with application
        log?.info('Session valid, starting form fill...', { job: job.url });

        // Look for apply button before starting form fill
        const applyButtonSelectors = [
            'button:has-text("Easy Apply")',
            'button:has-text("Apply")',
            'a:has-text("Easy Apply")',
            '[data-control-name="jobdetails_topcard_inapply"]',
            '.jobs-apply-button'
        ];

        let foundApplyButton = false;
        for (const selector of applyButtonSelectors) {
            try {
                const button = await page.$(selector);
                if (button) {
                    log?.info('Found apply button', { selector });
                    await page.click(selector);
                    await page.waitForTimeout(2000); // Wait for form to load
                    foundApplyButton = true;
                    break;
                }
            } catch (e) {
                // Try next selector
            }
        }

        if (!foundApplyButton) {
            log?.warn('Could not find apply button', { job: job.url });
        }

        // Take initial screenshot
        const initialScreenshot = await page.screenshot({ fullPage: false });

        // Let Claude handle the form
        await fillForm({ 
            page, 
            job, 
            log, 
            anthropicApiKey, 
            userContext 
        });

        // Take final screenshot
        const finalScreenshot = await page.screenshot({ fullPage: true });

        // Check if we can detect successful submission
        const successIndicators = [
            'Application sent',
            'Application submitted',
            'Thank you for applying',
            'Your application has been received'
        ];

        const pageContent = await page.content();
        const likelySuccess = successIndicators.some(indicator => 
            pageContent.toLowerCase().includes(indicator.toLowerCase())
        );

        const status = likelySuccess ? 'submitted' : 'attempted';
        
        log?.info(`Application ${status}`, { job: job.url });

        await pushResult({ 
            job, 
            status,
            sessionValid: true,
            verification,
            finalScreenshotBase64: finalScreenshot.toString('base64')
        });

        await context.close();
        return { job, status, sessionValid: true };

    } catch (error) {
        log?.error('Application failed', { job: job.url, error: error.message });

        // Try to get screenshot even on error
        let errorScreenshot = null;
        try {
            const screenshot = await page.screenshot({ fullPage: true });
            errorScreenshot = screenshot.toString('base64');
        } catch (screenshotError) {
            // Ignore screenshot errors
        }

        await pushResult({ 
            job, 
            status: 'failed', 
            error: error.message,
            errorScreenshotBase64: errorScreenshot
        });

        await context.close();
        return { job, status: 'failed', error: error.message };
    }
}

module.exports = { applyToJob };
