const { User, Thought } = require('../models');

const userController = {
    getAllUsers:(req,res) => {
        User.find().populate('thoughts').populate('friends').select('-__v')
        .then(userdata => {
            res.json(userdata)
        }) 
    }

}

module.exports = userController