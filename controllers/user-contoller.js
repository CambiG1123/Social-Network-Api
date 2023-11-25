const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({ path: "friends", select: "_id username email" })
      .select("-__v")
      .sort({ _id: 1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "_id username email" })
      .select("-__v")
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.status(400).json(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) =>
        dbUserData
          ? Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
              .then(() => res.json({ message: "User and associated thoughts deleted!" }))
          : res.status(404).json({ message: "No user with this id!" })
      )
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user with this id" })
      )
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) =>
        dbUserData
          ? res.json(dbUserData)
          : res.status(404).json({ message: "No user with this id!" })
      )
      .catch((err) => res.json(err));
  },
};

module.exports = userController;