const router = require('express').Router();
const {
   getAllThoughts,
   getThoughtById
} = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts)
router.route('/:id').get(getThoughtById)

module.exports = router