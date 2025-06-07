// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const { getAnimalByQR, getAllAnimals, createAnimal, getAnimalMedicalInfo } = require('../controllers/animalController');

// Ruta para obtener todos los animales
router.get('/animales', getAllAnimals);

// Ruta dinámica para obtener animal por QR
router.get('/:qr', getAnimalByQR);

router.post('/registeranimal', createAnimal);

router.post('/getmedicaldata', getAnimalMedicalInfo);


module.exports = router;
