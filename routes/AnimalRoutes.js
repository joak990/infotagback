// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // 👈 importás multer
const {
  getAnimalByQR,
  getAllAnimals,
  createAnimal,
  getAnimalMedicalInfo
} = require('../controllers/animalController');

// Obtener todos los animales
router.get('/animales', getAllAnimals);

// Obtener animal por QR
router.get('/:qr', getAnimalByQR);

// Crear animal con imagen
router.post('/registeranimal', upload.single('imagen'), createAnimal); // 👈 acá

// Obtener info médica
router.post('/getmedicaldata', getAnimalMedicalInfo);

module.exports = router;
