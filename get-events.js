const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.FOOTBALL_API_KEY;  // Accede a la variable de entorno
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'API key missing' })
        };
    }

const response = await fetch('https://v3.football.api-sports.io/', {
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
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Hubo un error al cargar los eventos. Intenta más tarde.' })
        };
    }
};
const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Hubo un error al cargar los eventos. Intenta más tarde.' })
        };
    }
};
