const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const wineSchema = new Schema({
    wineryName: {
        type: String,
        required: 'You need to enter a winery name',
        trim: true,
    },
    wineType: {
        type: String,
    },
    description: {
        type: String,
        maxlength: 280,
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    rating: {
        type: Number,
        default: 0,
    },
    region: {
        type: String,
        required: false,
    },
    year: {
        type: Number,
        required: false,
    }
});

const Wine = model('Wine', wineSchema);

module.exports= Wine;