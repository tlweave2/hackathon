// outputManager.js — records application outcomes

async function pushResult(record) {
    // TODO: persist to Apify Dataset or KV
    console.log('Result', record);
}

module.exports = { pushResult };
