const Thought = require('../models/thought.js');
const User = require('../models/user.js');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                User.findOneAndUpdate({ _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } });
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));

    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    addNewReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body } })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            {$pull: {reactions: {reactionId: body.reactionId}}})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    }
};


module.exports = thoughtController;
