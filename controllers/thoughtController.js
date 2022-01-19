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
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true }).then(
      (thoughtdata) => {
        if (!thoughtdata) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(thoughtdata);
      }
    );
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }).then((thoughtdata) => {
      if (!thoughtdata) {
        res.status(404).json({ message: "No thought with this id" });
        return;
      }
      User.findByOneAndUpdate(
        { username: thoughtdata.username },
        { $pull: { thoughts: params.id } }
      ).then(() => {
        res.json({ message: "thought deleted" });
      });
    });
  },
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    ).then((thoughtdata) => {
      if (!thoughtdata) {
        res.status(404).json({ message: "No thought with this id" });
        return;
      }
      res.json(thoughtdata);
    });
  },
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true }
    ).then((thoughtdata) => {
      if (!thoughtdata) {
        res.status(404).json({ message: "No thought with this id" });
        return;
      }
      res.json({ message: "reaction deleted" });
    });
  },
};
