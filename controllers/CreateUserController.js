const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
  try {
    const root = user.uid ? 'google' : 'register';

    const existingUser = await pool.query(
      'SELECT * FROM dueños WHERE email = $1',
      [user.email]
    );

    const userDb = existingUser.rows[0];

    if (userDb && userDb.isdeleted) {
      return { isDeleted: true };
    }

    if (userDb) {
      return {
        id: userDb.id,
        email: userDb.email,
        nombre: userDb.nombre,
        telefono: userDb.telefono,
        pais: userDb.pais,
        localidad: userDb.localidad,
        root,
        duplicated: true,
        isDeleted: false
      };
    }
const saltRounds = 4;
let hashedPassword = null;

if (!user.uid && user.password) {
  hashedPassword = await bcrypt.hash(user.password, saltRounds);
}

// Si viene con uid (por Google, por ejemplo), no hasheás nada
const insertUser = await pool.query(
  `INSERT INTO dueños (nombre, email, password, uid, pais, localidad, telefono, isdeleted)
   VALUES ($1, $2, $3, $4, $5, $6, $7, true)
   RETURNING *`,
  [
    user.nombre,
    user.email,
    hashedPassword, // null si es con uid
    user.uid || null,
    user.pais || null,
    user.localidad || null,
    user.telefono || null,
  
  ]
);

  
    const newUser = insertUser.rows[0];

    return {
      ...newUser,
      root,
      duplicated: false
    };
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error(error.message);
  }
};

module.exports = createUser;
