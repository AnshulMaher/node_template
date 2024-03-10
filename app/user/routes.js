const router = require('express').Router();
const validators = require('./validator');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./controller');

router.route('/').get(getAllUsers).post(validators.createValidator, createUser);

router
  .route('/:id')
  .get(validators.getValidator, getUser)
  .patch(validators.getValidator, validators.updateValidator, updateUser)
  .delete(validators.getValidator, deleteUser);

module.exports = router;
