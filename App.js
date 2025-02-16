import React from 'react';
import EventList from './components/EventList'; // Importa el componente

function App() {
    return (
        <div className="App">
            <h1>Bienvenido a la aplicación de eventos</h1>
            <EventList />  {/* Agrega el componente donde quieras mostrar los eventos */}
        </div>
    );
}

export default App;
