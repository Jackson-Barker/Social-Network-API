const { User, Thought } = require("../models");

const userController = {
  getAllUsers: (req, res) => {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((userdata) => {
        res.json(userdata);
      });
  },

  getUserById: ({ params }, res) => {
    User.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v")
      .then((userdata) => {
        if (!userdata) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(userdata);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((userdata) => res.json(userdata))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      body,
      { runValidators: true, new: true }
    )
      .then((userdata) => {
        if (!userdata) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        res.json(userdata);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({_id: params.id})
    .then((userdata) => {
      if (!userdata) {
        res.status(404).json({ message: "No user with this id!" });
        return;
      }
      res.json(userdata)
    })
  },
 
  addFriend({ params }, res) {
  console.log(params.userID)
  console.log(params.friendId)
    User.findOneAndUpdate(
        { _id: params.userID },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
    )
    .then(userdata => {
        if (!userdata) {
            res.status(404).json({ message: 'No user with this Id' });
            return;
        }
        res.json(userdata)
    })
    .catch(err => res.json(err));
},
};

module.exports = userController;
