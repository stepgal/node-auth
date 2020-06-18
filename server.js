const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dns");
require("dnscache")({ "enable": true, "ttl": 300, "cachesize": 1000 });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { getUserInfo, setUserInfo } = require("./mongoServer");

const app = express();

if (process.env.NODE_ENV === "DEVELOPMENT") {
    app.use(morgan("dev"));
}

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { docExpansion: "none" }));

/**
 * @swagger
 * /user/{email/{password}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user
 *     description: 'Login user if not exist, otherwise - Sign up'
 *     operationId: getSystemData
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *            $ref: '#/definitions/response'
 *
 *       '400':
 *         description: Password is wrong
 *         schema:
 *            $ref: '#/definitions/responseError'
 *
 *       '404':
 *         description: Wrong URL
 *         schema:
 *            $ref: '#/definitions/responseError'
 */
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
        return res.status(400).json(
            {
                "status": "FAILURE",
                "message": "Wrong Password"
            });
    }

    res.status(200).json(
        {
            "status": "OK",
            "message": "EXISTING USER",
            user
        });
});

app.use("/", async (req, res) => {
    res.status(404).send({
        "status": "FAILURE",
        "message": "Bad request: format - GET http://url:port/user/{email}/{password}"
    });
});

app.listen(process.env.SERVER_PORT || 3001);
