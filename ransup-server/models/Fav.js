const mongoose = require("mongoose");


const favSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

const Fav = mongoose.model("favs", favSchema);
module.exports = Fav;