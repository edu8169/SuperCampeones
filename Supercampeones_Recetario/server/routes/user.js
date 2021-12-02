const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {TOKEN_SECRET} = process.env;


router.post('/login', async (req, res) => {
  try {
  const {email, password} = req.body;
  const user = await User.findOne({email: email});
  const equal = await bcrypt.compare(password, user.password);
  if (equal === false) {
    throw new Error('Correo o contraseña incorrecta');
  }
  const token = jwt.sign({id: user.id}, TOKEN_SECRET, {expiresIn: 60*60});
  res.send({token});
  } catch (err) {
    console.log('Error', err);
    res.status(403).send('Correo o contraseña incorrecta')
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({id: user._id}, TOKEN_SECRET, {expiresIn: 60 * 60});
    res.send({token});
  } catch (err) {
    console.log(err);
    res.status(500).send('Error');
  }
})

module.exports = router;