const mongoose = require('mongoose');
const swaggerJSDoc = require("swagger-jsdoc");
const m2s = require('mongoose-to-swagger');
const schemas = require("../schemas/mongooseSchemas");
const definitions = require("../schemas/definitions");
const SWAGGER = require("./");

const swaggerSpec = swaggerJSDoc(SWAGGER.options);

Object.keys(schemas).forEach((key) => {
    swaggerSpec.definitions[key] = m2s(mongoose.model(key, schemas[key]));
});

Object.keys(definitions).forEach((key) => {
    swaggerSpec.definitions[key] = definitions[key];
});

module.exports = swaggerSpec;
