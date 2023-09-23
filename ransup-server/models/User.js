const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2
    },
    lastName: {
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
    password: {
        type: String,
        required: true,
        minLength: 8
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
        minLength: 5,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
})

const User = mongoose.model("users", userSchema)
module.exports = User;