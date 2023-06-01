const express = require("express");
const { connectDb } = require("./db");
const bodyParser = require("body-parser");
const { createAccessToken, verifyAccessToken, refreshAccessToken } = require("./authMiddleware");
const { user } = require("./user");


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
connectDb();

app.post("/create-token", async (req, res) => {
    var token = await createAccessToken(user.id);
    res.status(200).send({
        status: 200,
        token: token
    })
})

app.post("/refresh-token", async (req, res) => {
    var token = await refreshAccessToken(user.id);
    res.status(200).send({
        status: 200,
        refreshtoken: token
    })
})


app.use(async function (req, res, next) {
    //Here you would check for the user being authenticated
    //Unsure how you're actually checking this, so some psuedo code below
    var authorised = await verifyAccessToken(req.headers.authorization);
    if (!authorised) {
        //Stop the user progressing any further
        return res.status(403).send("Unauthorised!");
    }
    else {
        //Carry on with the request chain
        next();
    }
});
app.get("/login", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "success"
    })
})

app.listen(8080, () => {
    console.log("Your app will be listening on port 8080");
})