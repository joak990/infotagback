// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const { getAnimalByQR, getAllAnimals } = require('../controllers/animalController');

// Ruta para obtener todos los animales
router.get('/animales', getAllAnimals);

// Ruta dinámica para obtener animal por QR
router.get('/:qr', getAnimalByQR);

module.exports = router;
