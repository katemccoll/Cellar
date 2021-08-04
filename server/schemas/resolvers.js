const { AuthenticationError } = require('apollo-server-express');
const { User, Wine } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('wines');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        wines: async (parent, { email }) => {
            const params = email ? { email } : {};
            return Wine.find(params).sort({ createdAt: -1 });
        },
        wine: async (parent, { wineId }) => {
            return Wine.findById({ _id: wineId });
        },
    },

    Mutation: {
        addUser: async (parent, payload) => {
            let { firstName, lastName, email, password } = payload;
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user);
            return { token, user };
            // if (e.name === "MongoError") {
            //         if (e.code === 11000) {
            //             throw new UserInputError("Email address already in use");
            //         }
            //     }
            //
            //     throw e;
            // }
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
        addWine: async (parent, payload , context) => {
            let { wineryName, wineType, description, image, rating } = payload;
            if (context.user) {
                const wine = await Wine.create({
                    wineryName,
                    wineType,
                    description,
                    image,
                    rating,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { wines: wine._id } }
                );

                return wine;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // updateUser: async (parent, args, context) => {
        //     if (context.user) {
        //         return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        //     }
        //
        //     throw new AuthenticationError('Not logged in');
        // },
        // updateWine: async (parent, { _id, quantity }) => {
        //     const decrement = Math.abs(quantity) * -1;
        //
        //     return await Wine.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        // },
        // removeWine: async (parent, { wineId }, context) => {
        //     if (context.user) {
        //         const wine = await Wine.findOneAndDelete({
        //             _id: wineId,
        //         });
        //
        //         await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { wines: wine._id } }
        //         );
        //
        //         return wine;
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },
    },
};

module.exports = resolvers;
