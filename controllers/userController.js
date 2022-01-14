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

  getUserById: (req, res) => {
    User.findOne({ _id: req.params.userId }).then((userdata) =>
      !userdata
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(userdata)
    );
  },

  createUser({ body }, res) {
    User.create(body)
      .then((userdata) => res.json(userdata))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userdata) =>
        !userdata
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userdata)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
