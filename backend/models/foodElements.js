const mongoose = require('../config/db');

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        unique: false,
        required: true
    },
    foodType: {
        type: String,
        unique: false,
        required: false
    },
    price: {
        type: Number,
        unique: false,
        required: true
    },
    description: {
        type: String,
        unique: false,
        required: false
    },
    vegetarian: {
        type: Number,
        unique: false,
        required: false,
        default: 0
    },
    alcohol: {
        type: Number,
        unique: false,
        required: false,
        default: 1
    },
    country: {
        type: String,
        unique: false,
        required: false
    },
    personCount: {
        type: Number,
        unique: false,
        required: false,
        default: 1
    },
    optional_addition: {
        type: String,
        unique: false,
        required: false
    }
});

module.exports = mongoose.model('foodElement', FoodSchema);