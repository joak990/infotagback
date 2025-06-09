const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: 'uploads/', // carpeta donde se guardan
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Exportás la instancia
const upload = multer({ storage });

module.exports = upload;
