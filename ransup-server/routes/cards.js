const express = require("express");
const router = express.Router();
const joi = require("joi");
const Card = require("../models/Card");
const User = require("../models/User");
const auth = require("../middleware/auth");

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
    userId: joi.string()
})


// add new card
router.post("/", auth, async (req, res) => {
    try {
        // check if user is business
        if (req.payload.userType === "Standart")
            return res.status(401).send("Permition denied, not a business user")

        // joi validation
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(401).send(error);

        // check if card already exist
        let card = await Card.findOne({
            userId: req.payload._id,
            title: req.body.title,
            email: req.body.email
        })
        if (card) return res.status(401).send("Card is already exist");

        // add card
        card = new Card({ ...req.body, userId: req.payload._id });
        await card.save()

        res.status(201).send(card);
    } catch (error) {
        res.status(404).send(error);
    }
})


// get all cards
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(201).send(cards)
    } catch (error) {
        res.status(404).send(error);
    }
})

// get user's cards
router.get("/mycards", auth, async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.payload._id });
        if (!cards) return res.status(401).send("No cards for that user")

        res.status(201).send(cards)
    } catch (error) {
        res.status(404).send(error);
    }
})

// get card by id
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id)
        if (!card) return res.status(401).send("no such card")

        res.status(201).send(card);
    } catch (error) {
        res.status(404).send(error);
    }
})


// delete card
router.delete("/:id", auth, async (req, res) => {
    try {
        let card = await Card.findById({ _id: req.params.id });
        if (!card) return res.status(401).send("no such card");

        if (req.payload._id === card.userId) {
            await card.deleteOne();
            return res.status(201).send("Card deleted successfully")
        } else if (req.payload.userType === "admin") {
            await card.deleteOne();
            return res.status(201).send("Card deleted successfully")
        }
        else {
            return res.status(401).send("Access denied, not an admin")
        }
    } catch (error) {
        res.status(404).send(error);
    }
})


// update card
router.put("/:id", auth, async (req, res) => {
    try {
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let card = await Card.findOneAndUpdate({
            _id: req.params.id,
            userId: req.payload._id
        },
            req.body,
            { new: true }
        );
        if (!card) return res.status(401).send("Not card's owner, or no existing card")

        res.status(201).send(card)
    } catch (error) {
        res.status(404).send(error);
    }
})


module.exports = router