const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const wineSchema = new Schema({
    wineryName: {
        type: String,
        required: 'You need to leave a winery name',
        trim: true,
    },
    wineType: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
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
    }
});

const Wine = model('Wine', wineSchema);

module.exports= Wine;