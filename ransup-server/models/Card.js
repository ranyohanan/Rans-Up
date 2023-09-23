const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    userId: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 2
    },
    phone: {
        type: String,
        required: true,
        minLength: 10
    },
    imageUrl: {
        type: String,
        required: true,
        minLength: 2
    },
    imageAlt: {
        type: String,
        required: true,
        minLength: 2
    },
    state: {
        type: String,
        minLength: 2
    },
    country: {
        type: String,
        required: true,
        minLength: 2
    },
    city: {
        type: String,
        required: true,
        minLength: 2
    },
    street: {
        type: String,
        required: true,
        minLength: 2
    },
    houseNumber: {
        type: Number,
        required: true
    },
    zipCode: {
        type: String,
        minLength: 5
    },
    coverImg: {
        type: String,
        required: true,
        minLength: 2
    },
    web: {
        type: String,
        minLength: 2
    }
})

const Card = mongoose.model("cards", cardSchema)
module.exports = Card;