const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.FOOTBALL_API_KEY;  // Accede a la variable de entorno
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'API key missing' })
        };
    }

const response = await fetch('https://api.football-api.com/v2/matches', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer 63e9798f582dde9c9cc2dc00ba634a42', // Tu API key
    }
});

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
