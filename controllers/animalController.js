const pool = require('../config/db');
exports.getAnimalByQR = async (req, res) => {
  const qr = req.params.qr; // sin modificar
console.log('QR reciwwwwbido:', qr);

  const pool = require('../config/db');

  try {
    const result = await pool.query(
      `SELECT 
         a.nombre AS animal_nombre, 
         a.imagen_url, 
         d.nombre AS dueño_nombre, 
         d.telefono AS dueño_telefono
       FROM animales a
       JOIN dueños d ON a.dueno_id = d.id
       WHERE a.qr = $1`,
      [qr]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ success: false, mensaje: 'Animal no encontrado' });
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
  
  
// Controlador para obtener todos los animales<
exports.createAnimal = async (req, res) => {
  try {
    const { nombre, tipo, edad, qr, dueno_id, codseg } = req.body;

    // Si se subió una imagen, tomamos su nombre
    const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

    const insertAnimal = await pool.query(
      `INSERT INTO animales (nombre, tipo, edad, qr, dueno_id, codseg, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [nombre, tipo, edad, qr, dueno_id, codseg, imagen_url]
    );

    res.status(201).json(insertAnimal.rows[0]);
  } catch (error) {
    console.error('Error al crear animal:', error);
    res.status(500).json({ mensaje: 'Error al crear el animal' });
  }
};

exports.getAnimalMedicalInfo = async (req, res) => {
  try {
    const { nombre, codseg } = req.body;
 console.log(req.body, "body")
    const animalResult = await pool.query(
      `SELECT * FROM animales WHERE nombre = $1 AND codseg = $2`,
      [nombre, codseg]
    );

    const animal = animalResult.rows[0];

    if (!animal) {
      return res.status(404).json({ mensaje: ' código incorrecto' });
    }

    res.json({ mensaje: 'Código correcto' });
  } catch (error) {
    console.error('Error al validar el código:', error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
};
