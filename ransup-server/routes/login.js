const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
})

router.post("/", async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body)
        if (error) return res.status(401).send(error)

        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).send("Not existed user")

        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(401).send("Wrong email or password")

        const token = jwt.sign({ _id: user._id, email: user.email, userType: user.userType, imageUrl: user.imageUrl }, process.env.jwtKey)


        res.status(201).send(token)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;