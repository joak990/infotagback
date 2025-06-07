const pool = require('../config/db');
const bcrypt = require('bcrypt');

const LoginRegisterController = async (user) => {
  const { email, password } = user;

  // Buscar el usuario en la tabla dueños
  const result = await pool.query('SELECT * FROM dueños WHERE email = $1 AND isdeleted = false', [email]);
  const userDb = result.rows[0];

  if (!userDb) {
    return false; // Usuario no encontrado
  }

  // Comparar contraseñas
  const match = await bcrypt.compare(password, userDb.password);
  if (!match) {
    return false; // Contraseña incorrecta
  }

  // Login exitoso
  return {
    id: userDb.id,
    nombre: userDb.nombre,
    email: userDb.email,
    telefono: userDb.telefono,
    pais: userDb.pais,
    localidad: userDb.localidad
  };
};

module.exports = LoginRegisterController;
