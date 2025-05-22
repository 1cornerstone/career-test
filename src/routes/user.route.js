const express = require('express');
const {LoginDto} = require("../dtos/login.dto");
const { CreateUserDto } = require('../dtos/create-user.dto');
const {validationMiddleware} = require("../middleware/validate");
const {authMiddleware} = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const {UpdateUserDto} = require("../dtos/update-user.dto");


const router = express.Router();
router.use(authMiddleware);


/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get a user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: return user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 virtualAccount:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

router.get(
    '/profile',
    async (req, res) => {
         const user = await User.findOne({ _id: req.user.userId });
        res.status(201).json({ user });
    }
);



/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile (firstName, lastName)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Johnny
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */

router.put('/profile', validationMiddleware(UpdateUserDto), async  (req, res) => {
    try{
        const { firstName, lastName } = req.validatedBody;

        await User.findByIdAndUpdate(
            req.user.userId,
            { firstName, lastName, updatedAt: new Date() },
        ).select('-password');


        res.json({ message:"Profile updated successfully" });
    }catch (err) {
        res.status(500).json({ message: 'Failed to update profile' });
    }

});






module.exports = router;
