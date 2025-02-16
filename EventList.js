import React, { useEffect, useState } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/.netlify/functions/get-events');  // Llamada a la función de Netlify
                const data = await response.json();
                setEvents(data.response || []);  // Asegúrate de que 'response' es el array de eventos devuelto por la API
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
                {events.length > 0 ? (
                    events.map(event => (
                        <li key={event.fixture.id}>
                            {event.homeTeam.team.name} vs {event.awayTeam.team.name}
                        </li>
                    ))
                ) : (
                    <p>No se encontraron eventos.</p>
                )}
            </ul>
        </div>
    );
};

export default EventList;
