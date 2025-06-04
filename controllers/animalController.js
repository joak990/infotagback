const pool = require('../config/db');


exports.getAnimalByQR = async (req, res) => {
    const { qr } = req.params;
    console.log(qr)
    const pool = require('../config/db');
  
    try {
      const result = await pool.query('SELECT * FROM animales WHERE qr = $1', [qr]);
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ success:false});
      }
    } catch (error) {
      console.error('Error al buscar el animal por QR:', error);
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };
  
// Controlador para obtener todos los animales
exports.getAllAnimals = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM animales');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los animales' });
  }
};
  
  // Controlador para obtener un animal por ID
  exports.getAnimalById = (req, res) => {
    const { id } = req.params;
    const animales = [
      { id: 1, nombre: 'Fido' },
      { id: 2, nombre: 'Luna' },
      { id: 3, nombre: 'Max' }
    ];
  
    const animal = animales.find(a => a.id === parseInt(id));
    
    if (animal) {
      res.json(animal);
    } else {
      res.status(404).json({ mensaje: 'Animal no encontrado' });
    }
  };
  