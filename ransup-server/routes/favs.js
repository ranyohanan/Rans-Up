const express = require("express");
const auth = require("../middleware/auth");
const joi = require("joi");
const Fav = require("../models/Fav");
const Card = require("../models/Card");
const User = require("../models/User");
const router = express.Router();

const cardSchema = joi.object({
    title: joi.string().required().min(2),
    subtitle: joi.string().required().min(2),
    email: joi.string().required().email(),
    description: joi.string().required().min(2),
    phone: joi.string().required().min(10),
    imageUrl: joi.string().required().min(2),
    imageAlt: joi.string().required().min(2),
    state: joi.string().required(),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required(),
    zipCode: joi.string().min(5),
    coverImg: joi.string().required().min(2),
    web: joi.string().min(2),
    _id: joi.string()
})

// add card to favourits
router.post("/", auth, async (req, res) => {
    try {
        // joi validation
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(401).send(error);

        // find user fav
        const fav = await Fav.findOne({ userId: req.payload._id, active: true })
        if (!fav) return res.status(401).send("There is no Favourits list available for this user");

        // check if card exist
        let cardExist = await Card.findOne({ _id: req.body._id })
        if (!cardExist) return res.status(404).send("Card is not existed")

        // check if card already in list
        let cardToFind = fav.cards.find((c) => c._id == req.body._id)
        if (cardToFind) {
            return res.status(404).send("Card already exist in list")
        }
        else { fav.cards.push({ ...req.body }); }

        await fav.save();

        res.status(201).send("Card added successfully to your favourits");
    } catch (error) {
        res.status(400).send(error);
    }
})

// get all favs
router.get("/", auth, async (req, res) => {
    try {
        const favs = await Fav.findOne({ userId: req.payload._id, active: true });
        if (!favs) return res.status(401).send("No favourite list available for this user")

        res.status(201).send(favs.cards);
    } catch (error) {
        res.status(400).send(error);
    }
})

// delete Card from favs
router.delete("/:id", auth, async (req, res) => {
    try {
        const fav = await Fav.findOne({
            userId: req.payload._id, active: true
        })
        if (!fav) return res.status(404).send("There is no Favourits list available for this user");

        let cardToDelete = fav.cards.find((c) => c._id == req.params.id)
        if (!cardToDelete) {
            return res.status(401).send("Card is not existed in list")
        }
        else {
            fav.cards.splice(cardToDelete, 1)
        }
        await fav.save();

        res.status(201).send(fav.cards);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;