const fetch = require('node-fetch'); // O cualquier otra librería para hacer solicitudes HTTP

// Esta función se ejecutará cada vez que se realice una solicitud a la URL correspondiente en Netlify
exports.handler = async function(event, context) {
    // Realiza una solicitud GET a la API de fútbol
    const response = await fetch('https://api.football-api.com/v2/matches', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer TU_API_KEY', // Reemplaza 'TU_API_KEY' con tu clave real
        }
    });
    
    // Espera la respuesta de la API
    const data = await response.json();
    
    // Devuelve la respuesta con el código de estado 200 (OK) y los datos en formato JSON
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
