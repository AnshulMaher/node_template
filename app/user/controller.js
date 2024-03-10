const User = require('./model');
const factory = require('../../utils/handleFactory');

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.createUser = factory.createOne(User);
