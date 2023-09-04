const sdk = require('api')('@requestly/v1.0#2dp5to2dlm1spg1x');
sdk.auth(process.env.TEAT1_WORKSPACE_API_KEY);

async function fetchAllRules() {
    console.log('Fetching all rules...');
    let allRules = null;

    try {
        const apiResponse = await sdk.getRules();
        allRules = apiResponse.data;
        console.log('Number of rules 👉👉👉👉', allRules.data.length);
    } catch(e) {
        console.error(e);
    }
    
    return allRules;
}

async function createNewRedirectRule(ruleName, ruleDesc, requestURL, destinationURL) {
    try {
        const postRulesAPIRresponse = await sdk.postRules({
            objectType: 'rule',
            ruleType: 'Redirect',
            status: 'Active',
            name: ruleName,
            description: ruleDesc,
            pairs: [
                {
                source: {
                    key: 'Url',
                    operator: 'Equals',
                    value: requestURL
                },
                destination: destinationURL,
                destinationType: 'url'
                }
            ]
        });

        if (postRulesAPIRresponse.data.success) {
            console.log('👉 Rule created successfully!!');
        }

        return postRulesAPIRresponse.data;
    } catch (e) {
        console.error(e);
    }
}

async function updateRedirectRule(ruleId, ruleName, ruleDesc, requestURL, destinationURL) {
    console.log(`👉 Updating a rule with Id=${ruleId} And name=${ruleName}`);

    try {
        const updateRulesAPIResponse = await sdk.putRulesRuleid({
            objectType: 'rule',
            ruleType: 'Redirect',
            status: 'Active',
            name: ruleName,
            description: ruleDesc,
            pairs: [
              {
                source: {
                  key: 'Url',
                  operator: 'Equals',
                  value: requestURL
                },
                destination: destinationURL,
                destinationType: 'url'
              }
            ]
          }, {ruleId: ruleId})

        if (updateRulesAPIResponse.data.success) {
            console.log('👉 Rule updated successfully!!', updateRulesAPIResponse.data.data);
        }

        return updateRulesAPIResponse.data;
    } catch (e) {
        console.error(e);
    }
}

function getRuleWithName(allRules, ruleName) {
    const rulesList = allRules.data;
    return rulesList.filter(ruleObject => ruleObject.name === ruleName)[0];
}

async function deleteRule(ruleId) {
    try {
        deleteRuleAPIResponse = sdk.deleteRulesRuleid({ ruleId });
    } catch (e) {
        console.error(e);
    }   
}

// Make this code below explicitly under async so as to leverage the async-await functionality
(async() => {
    const ruleName = 'PR-1234';
    
    // Get All the rules
    let rules = await fetchAllRules();
    console.log(`Printing names for all the ${rules.data.length} rules 👇`, rules.data.map(ruleObject => ruleObject.name));
    
    //Create a new rule
    console.log(`Creating a rule with name ${ruleName}`);
    await createNewRedirectRule(
        ruleName, 
        ruleDesc = 'github.com/requestly/requestly/pulls/753 Testing API access',
        requestURL = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
        destinationURL = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
    )

    // Test the total number of rules now
    rules = await fetchAllRules();    
    
    // Find the rule with RuleName & Update the description
    const ruleObject = getRuleWithName(rules, ruleName);
    await updateRedirectRule(
        ruleObject.id, 
        ruleName, 
        'Updated description', 
        requestURL = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
        destinationURL = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js?a=1'
    )

    // Test the total number of rules now
    rules = await fetchAllRules();
})()