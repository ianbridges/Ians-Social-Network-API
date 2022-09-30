router = require('express').Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeFriend
} = require('../../controllers/hhs_users_controller.js');

router
  .route('/')
  .get(getAllUser)
  .post(createUser);

routerr
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(removeFriend);


module.exports = router;
