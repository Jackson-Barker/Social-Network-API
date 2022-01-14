const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).put(updateUser)

module.exports = router