const mongoose = require("mongoose");
const logger = require("./logger");

const options = {
    useNewUrlParser: process.env.MONGO_DB_MAIN_USE_NEW_URL_PARSER || true,
    autoReconnect: process.env.MONGO_DB_MAIN_AUTO_RECONNECT || false,
    bufferMaxEntries: parseInt(process.env.MONGO_DB_MAIN_BUFFER_MAX_ENTRIES || 0),
    bufferCommands: process.env.MONGO_DB_MAIN_BUFFER_COMMAND || false,
    connectTimeoutMS: parseInt(process.env.MONGO_DB_MAIN_CONNECTION_TIMEOUT_MS || 20000),
    poolSize: parseInt(process.env.MONGO_DB_MAIN_POOL_SIZE || 50),
    useUnifiedTopology: true
};
if (process.env.MONGO_DB_MAIN_REPLICA_SET) {
    options.replicaSet = process.env.MONGO_DB_MAIN_REPLICA_SET;
    options.readPreference = process.env.MONGO_DB_MAIN_READ_PREFERENCE || "secondaryPreferred";
}

mongoose.connect(
    process.env.MONGO_DB_MAIN_HOST,
    options
);

mongoose.connection.on("disconnected", (err) => {
    logger.log("error", err);
    setTimeout(() => {
        logger.log("info", "Reconnecting");
        mongoose.connect(process.env.MONGO_DB_MAIN_HOST, options);
    }, 5000);
});
mongoose.connection.on("open", () => {
    logger.log("info", "Connected to MongoDB \t- Host: " + process.env.MONGO_DB_MAIN_HOST);
});

mongoose.connection.on("error", (err) => {
    logger.log("error", err);
});

/*
* Schemas
* */

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    minimize: false,
    versionKey: false
});
const UserModel = mongoose.connection.model("Users", userSchema, "users");

module.exports = {
    async getUserInfo (email) {
        return UserModel.findOne(
            { email },
            null,
            { lean: true }
        );
    },
    async setUserInfo (email, password) {
        return UserModel.create({
            email,
            password
        });
    }
};
