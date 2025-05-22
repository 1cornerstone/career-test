const express = require('express');
const {LoginDto} = require("../dtos/login.dto");
const { CreateUserDto } = require('../dtos/create-user.dto');
const {validationMiddleware} = require("../middleware/validate");
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const {JWT_EXPIRES_IN} = require("../config/config");
const {sign} = require("jsonwebtoken");


const router = express.Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: securepassword
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Validation error
 */

router.post(
    '/register',
    validationMiddleware(CreateUserDto),
    async (req, res) => {
       try {
           const { firstName, lastName, email,password } = req.validatedBody;

           const existingUser = await User.findOne({ email: email.toLowerCase() });

           if(existingUser) {
              return res.status(400).json({
                   message: 'Email already exists',
               });
           }


           const user = new User({
               firstName,
               lastName,
               email,
               password
           });

           const createdUser =  await user.save();

           return res.status(201).json({
               message: 'User registered successfully',
               userId: createdUser.id,
           });
       }catch (err) {
           return res.status(500).json({ message: 'Unable to create user' });
       }

    }
);



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid login credentials
 */

router.post('/login', validationMiddleware(LoginDto), async  (req, res) => {

    try {

        const { email, password } = req.validatedBody;

        let user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if(!user) {
            res.status(401).json({
                message: 'Invalid login credentials',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(401).json({
                message: 'Invalid login credentials',
            });
        }

        const payload = {
            userId: user._id,
            email: user.email,
        };


        const token = sign(payload, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        return res.status(200).json({
                "message": "Login successful",
                "token": token
            }
        );
    } catch (err) {
        res.status(500).json({ message: 'Unable to login', error: err.message });
    }

});


module.exports = router;
