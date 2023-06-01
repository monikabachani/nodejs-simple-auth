const jwt = require("jsonwebtoken");

async function createAccessToken(id) {
    return await jwt.sign({
        id: id
    }, "NODEJSECRETKEY", { expiresIn: '1h' });

}

async function refreshAccessToken(id) {
    return await jwt.sign({
        id: id
    }, "NODEJSECRETKEY", { expiresIn: '1d' });

}


async function verifyAccessToken(token) {
    return await jwt.verify(token, "NODEJSECRETKEY");

}

module.exports = { createAccessToken, verifyAccessToken, refreshAccessToken }