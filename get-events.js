const fetch = require('node-fetch'); // Librería para hacer solicitudes HTTP

exports.handler = async function(event, context) {
    try {
        // Realiza la solicitud GET a la API de fútbol, usando la variable de entorno para la API Key
        const response = await fetch('https://api.football-api.com/v2/matches', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.FOOTBALL_API_KEY}`, // Usamos la variable de entorno FOOTBALL_API_KEY
            }
        });

        // Si la respuesta no es exitosa, lanzamos un error
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }

        // Parseamos los datos a formato JSON
        const data = await response.json();

        // Devolvemos la respuesta con código 200 (OK) y los datos en formato JSON
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        // Si algo falla, devolvemos un error 500
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Hubo un error al cargar los eventos. Intenta más tarde.' })
        };
    }
};
