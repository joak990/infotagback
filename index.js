const express = require('express');
const app = express();
const port = 3000;

// Importar el router
const animalRoutes = require('./routes/AnimalRoutes');
const userRoutes = require('./routes/UserRoutes');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Usar el router con el prefijo /infoanimal
app.use('/infoanimal', animalRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
