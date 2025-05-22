require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    MONGO_URI: process.env.MONGO_URI,
    MOCK_MONGO_URI: process.env.MOCK_MONGO_URI,
    SAFEHAVEN_CLIENT_ID: process.env.SAFEHAVEN_CLIENT_ID,
    CLIENT_ASSERTION: process.env.CLIENT_ASSERTION,

};