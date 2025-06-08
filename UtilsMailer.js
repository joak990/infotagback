const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joakhaidar@gmail.com',
    pass: 'qtarpmtbtohczyjv', // recordá que es mejor mover esto a variables de entorno
  },
});

const sendVerificationCode = async (to, code) => {
  const mailOptions = {
    from: '"Infotag" <elpilin397@gmail.com>',
    to,
    subject: '¡Ya casi sos parte de INFOTAG!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; border-radius: 10px; color: #333;">
        <h2 style="color: #1a73e8;">¡Ya casi estás dentro de <span style="color: #000;">INFOTAG</span>!</h2>
        <p>Estamos muy felices de que te unas a nuestra comunidad.</p>
        <p>Para completar tu registro, ingresá el siguiente código de verificación:</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border: 2px dashed #1a73e8; border-radius: 8px; text-align: center;">
          <span style="font-size: 24px; font-weight: bold; color: #1a73e8;">${code}</span>
        </div>
        <p>Si no solicitaste este código, simplemente ignorá este mensaje.</p>
        <p style="font-size: 12px; color: #888;">INFOTAG © 2025</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código enviado a ${to}`);
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw new Error('No se pudo enviar el correo');
  }
};

module.exports = sendVerificationCode;
