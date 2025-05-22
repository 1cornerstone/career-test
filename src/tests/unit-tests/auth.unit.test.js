

const request = require('supertest');
const mongoose = require('mongoose');
const {app, server} = require('../../server'); // Your Express app
const User = require('../../models/user.model');
const {MONGO_URI} = require("../../config/config");

describe('POST /api/auth/register', () => {

    beforeAll(async () => {
        const conn = await mongoose.connect(MONGO_URI, {});
        console.log(`MongoDB connected: ${conn.connection.host}`);
    });


    it('should create account and return userId', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "johndoe@example.com",
                    "password": "securepassword"
                }
            );

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('userId');
        // expect(response.body.userId).toEqual(expect.any(String));
    });

    it('should reject email used', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                "firstName": "John",
                "lastName": "Doe",
                "email": "johndoe@example.com",
                "password": "securepassword"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Email already exists');
    });
});




describe('POST /api/auth/login', () => {


    afterAll(async () => {
        await User.deleteMany({email: 'johndoe@example.com' });
        await mongoose.connection.close();
        await server.close();
    });

    it('should login with correct credentials and return token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                "email": "johndoe@example.com",
                "password": "securepassword"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toEqual(expect.any(String))
    });

    it('should reject invalid credential', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                "email": "johndoe@example.com",
                "password": "secure" });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid login credentials');
    });
});
