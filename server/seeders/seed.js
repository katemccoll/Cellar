const db = require('../config/connection');
const { User } = require('../models');
// const wineSeeds = require('./wineSeeds.json');

db.once('open', async () => {
    await db.db.dropDatabase();

    await User.create({
        firstName: 'Kate',
        lastName: 'McColl',
        email: 'kate@testmail.com',
        password: 'kate1234',

    });

    process.exit();
});