const db = require('../config/connection');
const { User, Wine } = require('../models');
// const wineSeeds = require('./wineSeeds.json');

db.once('open', async () => {
    await db.db.dropDatabase();

    await Wine.deleteMany();
    const wines = await Wine.insertMany([
        {
            wineryName: 'Ned',
            wineType: "White Wine",
            description: "Good",
            image: "ned-wine.jpg"
        }
        ]
    )

    await User.create({
        firstName: 'Kate',
        lastName: 'McColl',
        email: 'kate@testmail.com',
        password: 'kate1234',

    });

    process.exit();
});