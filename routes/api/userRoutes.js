const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)
router.route('/:userID/friends/:friendId').post(addFriend)

module.exports = router