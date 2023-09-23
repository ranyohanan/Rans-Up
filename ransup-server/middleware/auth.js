const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).send("Access denied, no valid token")

        const payload = jwt.verify(token, process.env.jwtKey)

        req.payload = payload;

        next();
    } catch (error) {
        res.status(404).send(error);
    }
}