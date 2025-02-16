import React, { useEffect, useState } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/.netlify/functions/get-events');  // URL de la función de Netlify
                const data = await response.json();
                setEvents(data.matches);  // Suponiendo que 'matches' es el array con los eventos
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
