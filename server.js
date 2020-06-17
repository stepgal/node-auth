// SG
const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dns");
require("dnscache")({ "enable": true, "ttl": 300, "cachesize": 1000 });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const { getUserInfo, setUserInfo } = require("./mongoServer");

const app = express();

if (process.env.NODE_ENV === "DEVELOPMENT") {
    app.use(morgan("dev"));
}

app.get("/user/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    if (!email) return res.status(400).send();

    const user = await getUserInfo(email);
    if (!user) {
        const newUser = await setUserInfo(email, password);
        return res.json(
            {
                "status": "OK",
                "message": "NEW USER",
                user: newUser
            });
    }
    if (user.password !== password) {
        return res.json(
            {
                "status": "FAILURE",
                "message": "Wrong Password"
            });
    }

    res.json(
        {
            "status": "OK",
            "message": "EXISTING USER",
            user
        });
});

app.use("/", async (req, res) => {
    res.status(404).send({
        "message": "Bad request: format - GET http://localhost/user/{email}/{password}"
    });
});

app.listen(process.env.SERVER_PORT || 3001);
