// formFiller.js — PRODUCTION VERSION with Claude integration

const Anthropic = require('@anthropic-ai/sdk');

async function fillForm({ page, job, log, anthropicApiKey, userContext }) {
    log?.info('Starting Claude-powered form fill', { job: job.url });
    
    const anthropic = new Anthropic({ apiKey: anthropicApiKey });
    let stepCount = 0;
    const maxSteps = 10; // Prevent infinite loops

    while (stepCount < maxSteps) {
        stepCount++;
        log?.info(`Form step ${stepCount}`, { job: job.url });

        // Take screenshot of current state
        const screenshot = await page.screenshot({ fullPage: false });
        const base64Image = screenshot.toString('base64');

        // Ask Claude what to do
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [{
                role: 'user',
                content: [
                    {
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: 'image/png',
                            data: base64Image
                        }
                    },
                    {
                        type: 'text',
                        text: `You are helping fill out a job application form. 

User context:
- Name: ${userContext.firstName} ${userContext.lastName}
- Email: ${userContext.email}
- Phone: ${userContext.phone}
- Career summary: ${userContext.careerContext}
${userContext.resumeUrl ? `- Resume URL: ${userContext.resumeUrl}` : ''}

Analyze this screenshot and tell me what to do next. Respond ONLY with valid JSON:
{
  "action": "fill_field" | "click_button" | "submit" | "done",
  "selector": "CSS selector for element",
  "value": "value to enter (if filling field)",
  "reasoning": "why you chose this action"
}

If the form is complete or submitted, use action "done".
If you see "Easy Apply" or "Apply" button, click it first.`
                    }
                ]
            }],
        });

        // Parse Claude's response
        const claudeText = response.content[0].text;
        log?.info('Claude response:', { claudeText });

        let action;
        try {
            // Extract JSON from response (handle markdown code blocks)
            const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
            action = JSON.parse(jsonMatch[0]);
        } catch (e) {
            log?.error('Failed to parse Claude response', { error: e.message, response: claudeText });
            break;
        }

        // Execute the action
        if (action.action === 'done') {
            log?.info('Claude says form is complete');
            break;
        }

        try {
            if (action.action === 'fill_field') {
                await page.fill(action.selector, action.value);
                log?.info(`Filled field: ${action.selector} = ${action.value}`);
            } else if (action.action === 'click_button' || action.action === 'submit') {
                await page.click(action.selector);
                log?.info(`Clicked: ${action.selector}`);
                await page.waitForTimeout(2000); // Wait for page transition
            }
        } catch (e) {
            log?.error('Action failed', { action, error: e.message });
            
            // Try alternative selectors if main one fails
            if (action.action === 'click_button') {
                try {
                    // Try common "Apply" button patterns
                    const alternatives = [
                        'button:has-text("Apply")',
                        'button:has-text("Submit")',
                        'a:has-text("Easy Apply")',
                        '[data-control-name="jobdetails_topcard_inapply"]'
                    ];
                    
                    for (const alt of alternatives) {
                        try {
                            await page.click(alt, { timeout: 2000 });
                            log?.info(`Clicked alternative: ${alt}`);
                            break;
                        } catch {}
                    }
                } catch (altError) {
                    log?.error('All alternatives failed');
                }
            }
        }

        await page.waitForTimeout(1000); // Brief pause between steps
    }

    log?.info('Form filling complete', { steps: stepCount });
}

module.exports = { fillForm };
