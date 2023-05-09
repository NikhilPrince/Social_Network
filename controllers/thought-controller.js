const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
            .then(thoughtDataDB => res.json(thoughtDataDB))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtDataDB => res.json(thoughtDataDB))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { thoughts: params.userId },
                    { $pull: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtDataDB => {
                if (!thoughtDataDB) {
                    res.status(404).json({ message: 'Incorrect' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, body,)
            .then(thoughtDataDB => {
                if (!thoughtDataDB) {
                    res.status(404).json({ message: 'No user under this ID!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId },)
            .then(thoughtDataDB => {
                if (!thoughtDataDB) {
                    res.status(404).json({ message: 'No user under this ID!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: body}},
            { new: true, runValidators: true }
        )
        .then(thoughtDataDB => {
            if (!thoughtDataDB) {
                res.status(404).json({ message: 'Incorrect' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId : params.reactionId}}},
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));


module.exports = thoughtController;