const express = require('express');
const { PORT } = require('./config/config');
const { setUpSwagger } = require('./services/swagger.service');
const connectDB = require('./config/db');
const {
    createToken,
    createVirtualAccount,
} = require('./services/safehaven-api.service');

const app = express();

// Middlewares
app.use(express.json());

// Swagger setup
setUpSwagger(app);


app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/banking', require('./routes/banking.route'));
app.use('/api/webhooks', require('./routes/webhook.route'));

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

async function bootstrap() {
    try {


        await connectDB();
        await createToken();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

        // Export server for testing or shutdown handling
        module.exports = { app, server };
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

bootstrap();
