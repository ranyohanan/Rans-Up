const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const joi = require("joi");
const { find } = require("lodash");

const userSchema = joi.object({
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    phone: joi.string().required().min(10),
    imageUrl: joi.string().required().min(2),
    imageAlt: joi.string().required().min(2),
    state: joi.string().min(2),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required(),
    zipCode: joi.string().min(5).required(),
    userType: joi.string()
})

// get all users
router.get("/", auth, async (req, res) => {
    try {
        if (req.payload.userType !== "admin")
            return res.status(401).send("Access denied. not an admin")

        const users = await User.find();
        if (!users) return res.status(401).res("No users");

        res.status(201).send(users)
    } catch (error) {
        res.status(404).send(error);
    }
})

// get user by id
router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (!user) return res.status(401).send("No user found");

        if (req.payload._id === req.params.id) {
            return res.status(201).send(user)
        } else if (req.payload.userType === "admin") {
            return res.status(201).send(user)
        } else {
            return res.status(401).send("Access denied. not an admin")
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

// edit user
router.put("/:id", auth, async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body)
        if (error) return res.status(401).send(error);

        if (req.payload._id !== req.params.id)
            return res.status(401).send("Access denied");

        let userToEdit = await User.findOneAndUpdate({
            _id: req.params.id
        },
            req.body,
            {
                new: true
            });
        if (!userToEdit) return res.status(401).send("No user found")

        res.status(201).send(userToEdit)
    } catch (error) {
        res.status(404).send(error);
    }
})

// change userType status
router.patch("/:id", auth, async (req, res) => {
    try {
        if (req.payload._id !== req.params.id)
            return res.status(401).send("Access denied");

        let userStatus = await User.findOneAndUpdate({
            _id: req.payload._id
        }, req.body, {
            new: true
        })

        if (!userStatus) return res.status(401).send("No user Found")

        res.status(201).send(userStatus);
    } catch (error) {
        res.status(404).send(error);
    }
})

// delete user
router.delete("/:id", auth, async (req, res) => {
    try {
        let user = await User.findById({ _id: req.params.id });
        if (!user) return res.status(401).send("No such User");

        if (req.payload._id === req.params.id) {
            await user.deleteOne();
            return res.status(201).send("User deleted successfully")
        }
        if (req.payload.userType === "admin") {
            await user.deleteOne();
            return res.status(201).send("User deleted successfully")
        }
        else {
            return res.status(401).send("Access denied, not an admin")
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;