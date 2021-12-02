const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = process.env;

const verifyUser = (req, res, next) => {
  try {
    const token = req.header('x-auth')
    if (token) {
      jwt.verify(token, TOKEN_SECRET);
      return next();
    }
    throw new Error('No hay token')
  } catch (err) {
    console.log('Error', err);
    res.status(403).send('No autorizado');
  }
}

module.exports = verifyUser;