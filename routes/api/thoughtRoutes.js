const router = require('express').Router();
const {
   getAllThoughts,
   getThoughtById,
   createThought,
   deleteThought,
   updateThought,
   addReaction,
   deleteReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts).post(createThought)
router.route('/:id').get(getThoughtById).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction)

module.exports = router

