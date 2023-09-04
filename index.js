const sdk = require('api')('@requestly/v1.0#2dp5to2dlm1spg1x');
sdk.auth(process.env.TEAT1_WORKSPACE_API_KEY);

async function fetchAllRules() {
    console.log('Fetching all rules...');
    let allRules = null;

    try {
        const apiResponse = await sdk.getRules();
        allRules = apiResponse.data;
    } catch(e) {
        console.error(e);
    }
    
    return allRules;
}

async function createNewRedirectRule(ruleObject) {
    console.log('Creating a new Redirect Rule', ruleObject);

    
}

async function getRuleWithName(allRules, ruleName) {
    const rulesList = allRules.data;
    return rulesList.filter(ruleObject => ruleObject.name === ruleName);
}

// Make this code below explicitly under async so as to leverage the async-await functionality
(async() => {
    const rules = await fetchAllRules();
    console.log(rules);


})()