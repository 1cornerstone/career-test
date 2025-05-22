const express = require('express');
const {authMiddleware} = require("../middleware/auth.middleware");
const User = require('../models/user.model');
const {createVirtualAccount} = require("../services/safehaven-api.service");
const {isNullOrEmpty} = require("../utils/data-validator");

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /banking/virtual-account:
 *   post:
 *     summary: create a virtual account
 *     tags: [Banking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      401:
 *         description: Unauthorized
 */

router.post(
    '/virtual-account', async (req, res) => {

        const user = await User.findOne({_id: req.user.userId});
        try {
            if (!isNullOrEmpty(user.virtualAccountNumber)) {
                return res.status(200).json({
                    "message": "Virtual account created successfully",
                    "virtualAccountNumber": user.virtualAccountNumber
                });
            } else {

                const response = await createVirtualAccount(`${user.firstName} ${user.lastName}`);
                const virtualAccountNumber = response.accountNumber;
                await User.findByIdAndUpdate(
                    req.user.userId,
                    {virtualAccountNumber, updatedAt: new Date()},
                ).select('-password');

                return res.status(201).json({
                    "message": "Virtual account created successfully",
                    "virtualAccountNumber": virtualAccountNumber
                });
            }
        } catch (err) {
            res.status(500).json({message: 'Unable to generate virtual account'});
        }

    }
);

module.exports = router;