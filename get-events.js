const fetch = require('node-fetch'); // O cualquier otra librería para hacer solicitudes HTTP

exports.handler = async function(event, context) {
    const response = await fetch('https://api.football-api.com/v2/matches', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.FOOTBALL_API_KEY}`, // Asegúrate de que la clave esté bien configurada
        }
    });

    if (!response.ok) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching events' }),
        };
    }

    const data = await response.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
