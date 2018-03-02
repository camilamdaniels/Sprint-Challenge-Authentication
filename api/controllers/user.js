const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.
  console.log(req.user);
  req.user.save()
  	.then(newUser => {
  		res.status(201).json(newUser);
  	})
  	.catch(err => {
  		res.status(422).json(err);
  	})
};

module.exports = {
  createUser
};
