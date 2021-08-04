const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Wine, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'wines',
                    populate: 'category'
                });
                user.wines.sort((a, b) => b.createdAt - a.createdAt);
            }
            return user;
        },

        wines: async (parent, { category, wineName }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (wineName) {
                params.wineName = {
                    $regex: wineName
                };
            }
            return Wine.find(params).populate('category');
        },
        wine: async (parent, { _id }) => {
            return Wine.findById(_id).populate('category');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);

                return { token, user };
            } catch (e) {
                if (e.name === "MongoError") {
                    if (e.code === 11000) {
                        throw new UserInputError("Email address already in use");
                    }
                }

                throw e;
            }

        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid email or password');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid email or password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addWine: async (parent, { wineName, wineType, wineText, wineImage }, context) => {
            if (context.user) {
                const wine = await Wine.create({
                    wineName,
                    wineType,
                    wineText,
                    wineImage
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { wines: wine._id } }
                );

                return wine;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        updateWine: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Wine.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        removeWine: async (parent, { wineId }, context) => {
            if (context.user) {
                const wine = await Wine.findOneAndDelete({
                    _id: wineId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { wines: wine._id } }
                );

                return wine;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
