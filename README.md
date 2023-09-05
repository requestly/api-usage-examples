# Requestly API Usage Examples
Examples of how to manage rules in a workspace through APIs.

## References
- Documentation - https://developers.requestly.io/api/overview/
- Playground - https://readme.requestly.io

## Code Usage

### Dependency

```bash
npm install api --save
```

```js
const sdk = require('api')('@requestly/v1.0#2dp5to2dlm1spg1x');
sdk.auth(process.env.TEAT1_WORKSPACE_API_KEY);
```

**You can get the API Key by contacting us**

### Fetch All Rules

```js
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
```

### Create a Rule
```js
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
```

### Update a Rule

```js
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
```

### Delete a Rule
```js
async function deleteRule(ruleId) {
    try {
        deleteRuleAPIResponse = sdk.deleteRulesRuleid({ ruleId });
    } catch (e) {
        console.error(e);
    }   
}
```
