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
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Hubo un error al cargar los eventos. Intenta más tarde.' })
        };
    }
};
2. Asegúrate de haber configurado la variable de entorno en Netlify
Ve a la configuración de tu sitio en Netlify.
En Site settings > Build & deploy > Environment.
Agrega la variable de entorno FOOTBALL_API_KEY con el valor de tu clave API:
ini
Copiar
Editar
FOOTBALL_API_KEY=63e9798f582dde9c9cc2dc00ba634a42
3. Despliega tu proyecto en Netlify
Asegúrate de que el archivo get-events.js esté en la carpeta correcta ./netlify/functions/.
Luego, realiza el deploy de tu proyecto en Netlify. Si ya tienes la carpeta functions/ y la función está correctamente definida, Netlify la reconocerá y la desplegará como una función serverless.
Verifica en los logs de Netlify si la función se despliega correctamente y no arroja errores.
4. Cómo realizar la solicitud desde el frontend (React)
En tu código de frontend, cuando quieras obtener los eventos, realiza una solicitud a la URL de la función de Netlify. Este es un ejemplo de cómo hacerlo:

javascript
Copiar
Editar
import React, { useEffect, useState } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/.netlify/functions/get-events'); // URL de la función desplegada en Netlify
                const data = await response.json();
                setEvents(data.matches); // Suponiendo que 'matches' es el array con los eventos
            } catch (err) {
                setError('Error al cargar los eventos.');
            }
        };

        fetchEvents();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Eventos de Fútbol</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.homeTeam.name} vs {event.awayTeam.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
