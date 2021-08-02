const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const wineSchema = new Schema({
    wineId: {

    },
    wineName: {
        type: String,
        required: 'You need to leave a winery name',
        trim: true,
    },
    wineType: {
        type: String,
    },
    wineText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },

    // ratings: [
    //     {
    //         rateWine: {
    //             type: Number,
    //             default: 0,
    //         },
    //         rateValue: {
    //             type: Number,
    //             default: 0,
    //         },
    //     },
    // ],
});

const Wine = model('Wine', wineSchema);

module.exports= Wine;