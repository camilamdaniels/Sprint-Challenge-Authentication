const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;
const createUser = require('../controllers/user');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

// STEP 2

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  const encryptedPassword = bcrypt.hashSync(req.body.password, SaltRounds);
  // req.body.password = encryptedPassword;
  // Once the password is encrypted using bcrypt you'll need to set a user obj on req.user with the encrypted PW
  req.user = new User({ username, password: encryptedPassword });
  // Once the user is set, call next and head back into the userController to save it to the DB
  createUser.createUser(req, res);
  next();
};

// STEP 3

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  User.findOne({ username }).then(user => {
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) throw err;
      if (isValid) {
        req.username = user.username;
        next();
      }
    });
  })
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
