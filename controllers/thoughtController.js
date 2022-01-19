const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtdata) => res.json(thoughtdata));
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtdata) => {
        if (!thoughtdata) {
          res.status(404).json({ message: "No thought with that id" });
          return;
        }
        res.json(thoughtdata);
      });
  },
  createThought({ body }, res) {
    Thought.create(body).then((thoughtdata) => {
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thoughtdata._id } },
        { new: true }
      ).then((userdata) => {
        if (!userdata) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        res.json(userdata);
      });
    });
  },
  
};
