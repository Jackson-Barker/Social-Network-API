const { User, Thought, Reaction } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then(thoughtData => 
        res.json(thoughtData))
  },
  getThoughtById({ params }, res) {
    Thought.findOne({_id: params.id})
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then (thoughtData => {
      if (!thoughtData) {
        res.status(404).json({message: 'No thought with that id'});
        return;
      }
      res.json(thoughtData)
    })
  },
  
}



module.export = thoughtController;
