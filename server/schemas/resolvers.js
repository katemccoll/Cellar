const { AuthenticationError } = require('apollo-server-express');
const { User, Wine } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('wines');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('wines');
        },
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Wine.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { wineId }) => {
            return Wine.findOne({ _id: wineId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('wines');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addWine: async (parent, { wineName, wineType }, context) => {
            if (context.user) {
                const wine = await Wine.create({
                    wineName,
                    wineType,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { wines: wine._id } }
                );

                return wine;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { wineId, commentText }, context) => {
            if (context.user) {
                return Wine.findOneAndUpdate(
                    { _id: wineId },
                    {
                        $addToSet: {
                            comments: { commentText },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeWine: async (parent, { wineId }, context) => {
            if (context.user) {
                const wine = await Wine.findOneAndDelete({
                    _id: wineId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { thoughts: wine._id } }
                );

                return wine;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { wineId, commentId }, context) => {
            if (context.user) {
                return Wine.findOneAndUpdate(
                    { _id: wineId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
