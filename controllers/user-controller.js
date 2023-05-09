const { User } = require('../models');

const userController = {
    getEveryUsers(req, res) {
        User.find({})
            .then(user => res.json(user))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    makerUser({ body }, res) {
        User.create(body)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true,})
            .then(user => {
                if(!user) {
                    res.status(404).json({ message: 'No user under this ID!' });
                    return;
                }

                res.json(user);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'No user under this ID!' });
                return;
            }

            res.json(user);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendID}},
            {runValidators: true, new: true}
        )
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'No user under this ID!' });
                return;
            }
            res.json(user);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend({params}, res) {

    }
}

module.exports = userController;