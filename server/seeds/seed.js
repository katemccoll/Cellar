const db = require('../config/connection');
const { Wine } = require('../models');
const wineSeeds = require('./wineSeeds.json');

db.once('open', async () => {
    await Wine.deleteMany({});
    await Wine.create(wineSeeds);

    console.log('all done!');
    process.exit(0);
});