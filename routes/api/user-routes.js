// const router = require('express').Router();
// const {
//   getAllUser,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
//   addFriend,
//   removeFriend,
// } = require('../../controllers/user-contoller');

// // /api/users
// router.route('/api/users')
//   .get(getAllUser)
//   .post(createUser);

// // /api/users/:id
// router.route('/api/users/:id')
//   .get(getUserById)
//   .put(updateUser)
//   .delete(deleteUser);

// // /api/users/:userId/friends/:friendId
// router.route('/api/users/:userId/friends/:friendId')
//   .post(addFriend)
//   .delete(removeFriend);

// module.exports = router;
const router = require('express').Router();
const userController = require('../../controllers/user-contoller'); // Check the correct path

// Define your routes using the userController methods
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;