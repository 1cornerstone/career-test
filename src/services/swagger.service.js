

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const {PORT} = require("../config/config");

const specs = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'API documentation for SafeHaven project',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.js']
});

function setUpSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = { setUpSwagger };
