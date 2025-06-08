const express = require('express');
const createuser = require('../controllers/CreateUserController');
const LoginRegisterController = require('../controllers/LoginRegisterController');
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = req.body; // <-- le pasás todo el body como objeto
    const newUser = await createuser(user); // <-- así lo espera el controlador
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await LoginRegisterController({ email, password });

    if (!result) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    res.status(200).json({ success: true});
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});
const crypto = require('crypto');
const sendVerificationCode = require('../UtilsMailer');
const pool = require('../config/db');

const verificationCodes = {}; // temporal

router.post('/pre-register', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requerido' });

  const code = crypto.randomInt(100000, 999999).toString();
  verificationCodes[email] = code;

  // Borrar el código en 2 minutos
  setTimeout(() => {
    delete verificationCodes[email];
  }, 2 * 60 * 1000); // 2 minutos

  try {
    await pool.query(
      'UPDATE dueños SET verificator = $1 WHERE email = $2',
      [code, email]
    );

    await sendVerificationCode(email, code);
    res.json({ message: 'Código enviado al correo' });
  } catch (error) {
    console.error('Error en pre-register:', error);
    res.status(500).json({ message: 'Error al enviar el código' });
  }
});


// Verificar código y activar usuario
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email y código requeridos' });
  }

  const validCode = verificationCodes[email];

  if (validCode !== code) {
    return res.status(401).json({ message: 'Código inválido' });
  }

  try {
    await pool.query(
      'UPDATE dueños SET isdeleted = false WHERE email = $1',
      [email]
    );

    delete verificationCodes[email];

    res.json({ success: true, message: 'Cuenta verificada correctamente' });
  } catch (error) {
    console.error('Error al verificar el código:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
