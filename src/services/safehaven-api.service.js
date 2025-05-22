const axios = require('axios');
const {CLIENT_ASSERTION, SAFEHAVEN_CLIENT_ID} = require("../config/config");

global.havenSessionToken = '';
global.ibsClientID = '';

async function createToken() {
    // Example API integration
    const response = await axios.post('https://api.sandbox.safehavenmfb.com/oauth2/token', {
        "grant_type": "client_credentials",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion": CLIENT_ASSERTION,
        "client_id": SAFEHAVEN_CLIENT_ID
    });

    global.havenSessionToken = response.data['access_token'];
    global.ibsClientID = response.data['ibs_client_id'];
    // console.log(havenSessionToken);

    return response.data;
}


async function createVirtualAccount(fullName) {
    // Example API integration
    const response = await axios.post('https://api.sandbox.safehavenmfb.com/accounts', {
            "accountType": "Savings",
            "suffix": fullName,

        }, {
            headers: {
                'content-type': 'application/json',
                'ClientID': ibsClientID,
                'authorization': `Bearer ${havenSessionToken}`,
            }
        }
    );

    return response.data['data'];
}

module.exports = {
    createVirtualAccount,
    createToken
};


