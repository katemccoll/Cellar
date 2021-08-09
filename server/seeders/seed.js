const db = require('../config/connection');
const { User, Wine } = require('../models');
// const wineSeeds = require('./wineSeeds.json');

db.once('open', async () => {
    await db.db.dropDatabase();

    const kate = await User.create({
        firstName: 'Kate',
        lastName: 'McColl',
        email: 'kate@testmail.com',
        password: 'kate1234',
    });

    let notKate = await User.create({
        firstName: 'Not Kate',
        lastName: 'McColl',
        email: 'notkate@testmail.com',
        password: 'kate1234',
    });

    const kateWines = await Wine.insertMany([
        {
            wineryName: 'Ned',
            wineType: "White Wine",
            description: "Good",
        },

        {
            wineryName: 'Rocket',
            wineType: "White Wine",
            description: "Very big",
            image: 'https://i.imgur.com/vjEHjKR.jpeg'
        },
    ]);

    await User.findByIdAndUpdate(kate._id, { $push: { wines: kateWines } });

    const notKateWines = await Wine.insertMany([
        {
            wineryName: 'Ned (Not)',
            wineType: "White Wine",
            description: "Good",
        },

        {
            wineryName: 'Rocket (Not)',
            wineType: "White Wine",
            description: "Very big",
            image: 'https://i.imgur.com/vjEHjKR.jpeg'
        },
    ]);

    await User.findByIdAndUpdate(notKate._id, { $push: { wines: notKateWines } });

    process.exit();
});