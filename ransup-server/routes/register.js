const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Fav = require("../models/Fav");

const userSchema = joi.object({
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    phone: joi.string().required().min(10),
    imageUrl: joi.string().required().min(2),
    imageAlt: joi.string().required().min(2),
    state: joi.string(),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required(),
    zipCode: joi.string().min(5).required(),
    userType: joi.string().required()
})

router.post("/", async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body)
        if (error) return res.status(401).send(error)

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(401).send("User already exist")

        user = new User(req.body);

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();

        let fav = new Fav({ userId: user._id, active: true, cards: [] })

        await fav.save();

        const token = jwt.sign({ _id: user._id, email: user.email, userType: user.userType, imageUrl: user.imageUrl }, process.env.jwtKey)

        res.status(201).send(token);
    } catch (error) {
        res.status(404).send(error);
    }

})

module.exports = router;