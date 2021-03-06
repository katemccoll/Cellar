const { AuthenticationError, UserInputError} = require('apollo-server-express');
const { User, Wine } = require('../models');
const { signToken } = require('../utils/auth');

function ensureLoggedIn(context) {
    if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
    }
}

async function findWineById(context, wineId) {
    const user = await User.findById(context.user._id).populate({
        path: 'wines',
        match: {_id: wineId}
    });

    return user.wines.id(wineId);
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

                if ('rating' in filters) {
                    matches &= wine.rating === filters.rating;
                }

                if (filters.wineType) {
                    matches &= wine.wineType === filters.wineType;
                }

                if (filters.searchWineryName) {
                    matches &= wine.wineryName.toLowerCase().includes(filters.searchWineryName.toLowerCase());
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
            return findWineById(context, wineId);
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

        removeWine: async (parent, { wineId }, context) => {
            ensureLoggedIn(context);
            let wine = await findWineById(context, wineId);

            if (!wine) {
                throw new UserInputError("Unknown wine");
            }

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { wines: wine } }
            );

            await Wine.findByIdAndDelete(wine._id);
            return wine;
        },
    },
};

module.exports = resolvers;
