// test-input-validator.js — Validates your input before running the Actor

const fs = require('fs');
const path = require('path');

function validateInput(inputPath) {
    console.log('🔍 Validating input file:', inputPath);
    
    let input;
    try {
        const content = fs.readFileSync(inputPath, 'utf-8');
        input = JSON.parse(content);
    } catch (error) {
        console.error('❌ Failed to parse JSON:', error.message);
        process.exit(1);
    }

    console.log('\n📋 Checking required fields...');
    const required = ['anthropicApiKey', 'firstName', 'lastName', 'email'];
    const missing = required.filter(field => !input[field]);

    if (missing.length > 0) {
        console.error('❌ Missing required fields:', missing);
        process.exit(1);
    }
    console.log('✅ All required fields present');

    console.log('\n🍪 Checking cookies...');
    if (!input.linkedinCookies && !input.indeedCookies) {
        console.error('❌ No cookies provided! Need at least linkedinCookies or indeedCookies');
        process.exit(1);
    }

    const validateCookies = (cookies, platform) => {
        if (!Array.isArray(cookies)) {
            console.error(`❌ ${platform} cookies must be an array`);
            return false;
        }
        
        if (cookies.length === 0) {
            console.warn(`⚠️  ${platform} cookies array is empty`);
            return true;
        }

        const invalid = cookies.filter(cookie => 
            !cookie.name || !cookie.value || !cookie.domain
        );

        if (invalid.length > 0) {
            console.error(`❌ Invalid cookies in ${platform}:`, invalid);
            return false;
        }

        console.log(`✅ ${platform}: ${cookies.length} valid cookies`);
        return true;
    };

    let hasValidCookies = false;
    if (input.linkedinCookies) {
        hasValidCookies = validateCookies(input.linkedinCookies, 'LinkedIn') || hasValidCookies;
    }
    if (input.indeedCookies) {
        hasValidCookies = validateCookies(input.indeedCookies, 'Indeed') || hasValidCookies;
    }

    if (!hasValidCookies) {
        console.error('❌ No valid cookies found');
        process.exit(1);
    }

    console.log('\n🔑 Checking API key...');
    if (!input.anthropicApiKey.startsWith('sk-ant-')) {
        console.warn('⚠️  API key does not start with "sk-ant-" - might be invalid');
    } else {
        console.log('✅ API key format looks valid');
    }

    console.log('\n📊 Input summary:');
    console.log('  Name:', input.firstName, input.lastName);
    console.log('  Email:', input.email);
    console.log('  Phone:', input.phone || '(not provided)');
    console.log('  Keywords:', input.jobKeywords || '(not provided)');
    console.log('  Location:', input.jobLocation || '(not provided)');
    console.log('  Max jobs:', input.maxJobsToProcess || 10);
    console.log('  Validate first:', input.validateSessionsFirst !== false);

    console.log('\n✅ Input validation passed!');
    console.log('\n💡 Next steps:');
    console.log('  1. Replace YOUR_ACTUAL_COOKIE_VALUE with real cookie data');
    console.log('  2. Replace YOUR_KEY with your Anthropic API key');
    console.log('  3. Run: npx apify run --input-file=' + inputPath);
}

// Run validator
const inputFile = process.argv[2] || './test-input-minimal.json';
const inputPath = path.resolve(inputFile);

if (!fs.existsSync(inputPath)) {
    console.error('❌ Input file not found:', inputPath);
    console.log('\n💡 Usage: node test-input-validator.js [path-to-input.json]');
    process.exit(1);
}

validateInput(inputPath);
