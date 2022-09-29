const User = require('../models/user.js');

const userController = {

    getAllUser(req, res) {
        console.log(User);
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addNewFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $push: { friends: params.friendId } })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $pull: { friends: params.friendId } })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    }
};


module.exports = userController;
