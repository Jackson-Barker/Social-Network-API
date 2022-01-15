const router = require('express').Router();
const {
   getAllThoughts,
} = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts);
// router.route('/:id').get(getUserById).put(updateUser)

module.exports = router