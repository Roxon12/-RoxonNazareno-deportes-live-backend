const fetch = require('node-fetch'); // Asegúrate de tener instalado 'node-fetch'

exports.handler = async function(event, context) {
    try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures', {
            method: 'GET',
            headers: {
                'x-apisports-key': process.env.FOOTBALL_API_KEY, // Usamos la clave de API desde las variables de entorno
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los eventos: ${response.statusText}`);
        }

        const data = await response.json(); // Suponiendo que la respuesta es un objeto JSON
        return {
            statusCode: 200,
            body: JSON.stringify(data) // Devolvemos los datos de los eventos
        };
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Hubo un error al cargar los eventos. Intenta más tarde.' })
        };
    }
};
