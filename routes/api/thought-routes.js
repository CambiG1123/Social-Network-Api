// const router = require('express').Router();
// const {
//   getAllThought,
//   getThoughtById,
//   createThought,
//   updateThought,
//   deleteThought,
//   addReaction,
//   removeReaction,
// } = require('../../controllers/thought-controller');

// // /api/thoughts
// router.route('/api/thoughts')
//   .get(getAllThought)
//   .post(createThought);

// // /api/thoughts/:id
// router.route('/api/thoughts/:id')
//   .get(getThoughtById)
//   .put(updateThought)
//   .delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions
// router.route('/api/thoughts/:thoughtId/reactions')
//   .post(addReaction)
//   .delete(removeReaction);

// module.exports = router;
const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

// Define your routes using the thoughtController methods
router.get('/', thoughtController.getAllThought);
router.get('/:id', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:id', thoughtController.updateThought);
router.delete('/:id', thoughtController.deleteThought);
router.post('/:thoughtId/reactions', thoughtController.addReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;