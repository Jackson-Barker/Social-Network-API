const { User, Thought, Reaction } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtdata) => {
        res.json(thoughtdata).catch((err) => {
          res.status(500).json(err);
        });
      });
  },
};

module.export = thoughtController;
