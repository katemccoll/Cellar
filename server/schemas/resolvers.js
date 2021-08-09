const { AuthenticationError, UserInputError} = require('apollo-server-express');
const { User, Wine } = require('../models');
const { signToken } = require('../utils/auth');

function ensureLoggedIn(context) {
    if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
    }
}

const resolvers = {
    Query: {

        user: async (parent, args, context) => {
            ensureLoggedIn(context);
            return User.findOne({ _id: context.user._id }).populate('wines');
        },
        wines: async (parent, { filters }, context) => {
            ensureLoggedIn(context);

            if (!filters) {
                filters = {};
            }

            const user = await User.findById(context.user._id).populate({
                    path: 'wines',
                }
            );

            let wines = user.wines.filter((wine) => {
                let matches = true;

                if (filters.rating) {
                    matches &= wine.rating === filters.rating;
                }

                if (filters.wineType) {
                    matches &= wine.wineType === filters.wineType;
                }

                if (filters.searchWineryName) {
                    matches &= wine.wineryName.contains(filter.searchWineryName);
                }

                return matches;
            });

            if (filters.sortBy) {
                wines.sort((a, b) => {
                    a = a[filters.sortBy];
                    b = b[filters.sortBy];
                    return (a < b) ? -1 : (a > b) ? 1 : 0
                })
            }

            return wines;
        },
        wine: async (parent, { wineId }, context) => {
            ensureLoggedIn(context);

            const user = await User.findById(context.user._id).populate({
                path: 'wines',
                match: {_id: wineId}
            });

            return user.wines.id(wineId);
        },
    },

    Mutation: {
        addUser: async (parent, payload) => {
            try {
                let {firstName, lastName, email, password} = payload;
                const user = await User.create({firstName, lastName, email, password});
                const token = signToken(user);
                return {token, user};
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
        addWine: async (parent, payload , context) => {
            ensureLoggedIn(context);

            let { wineryName, wineType, description, image, rating, region, year } = payload;
            const wine = await Wine.create({
                wineryName,
                wineType,
                description,
                image,
                rating,
                region,
                year
            });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { wines: [wine] } }
            );

            return wine;

        },

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
