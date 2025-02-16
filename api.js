// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

// Crear una instancia de Express
const app = express();
app.use(express.json());
app.use(cors()); // Permite las solicitudes desde otros orígenes

// Conectar a MongoDB usando la URI de la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error en conexión MongoDB:", err));

// Esquema de Evento Deportivo
const eventSchema = new mongoose.Schema({
  sport: String,
  league: String,
  match: String,
  time: String,
  duration: String,
  country: String,
  stream_links: [String],
});

const Event = mongoose.model("Event", eventSchema);

// Función para obtener eventos deportivos desde la API de Football
async function fetchEvents() {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY },
      params: { league: 39, season: 2024 }, // Ejemplo para Premier League 2024
    });

    const events = response.data.response.map((match) => ({
      sport: "Fútbol",
      league: match.league.name,
      match: `${match.teams.home.name} vs ${match.teams.away.name}`,
      time: match.fixture.date,
      duration: match.fixture.status.duration || "Desconocida",
      country: match.league.country,
      stream_links: [`https://rojadirecta.stream/${match.fixture.id}`],
    }));

    // Eliminar eventos anteriores y agregar los nuevos
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("✅ Eventos deportivos actualizados.");
  } catch (error) {
    console.error("❌ Error al obtener eventos:", error);
  }
}

// Actualizar eventos cada 30 minutos
setInterval(fetchEvents, 30 * 60 * 1000);
fetchEvents(); // Obtener los eventos al iniciar el servidor

// Función para manejar la solicitud HTTP a la API
const handler = (req, res) => {
  // Aquí se maneja la ruta /events
  if (req.method === 'GET') {
    Event.find()
      .then(events => res.json(events))
      .catch(error => res.status(500).json({ message: "Error al obtener eventos." }));
  }
};

module.exports = handler;
