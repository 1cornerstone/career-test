const express = require('express');
const User = require("../models/user.model");

const router = express.Router();

/**
 * @swagger
 * /webhooks/safehaven:
 *   post:
 *     summary: weebhook
 *     tags: [Banking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      401:
 *         description: Unauthorized
 */

router.post(
    '/safehaven',
    async (req, res) => {

        // const user = await User.findOne({_id: req.user.userId});
        res.status(201).json({
                "event": "transaction_successful",
                "data": {
                    "accountNumber": "1234567890",
                    "amount": 10000,
                    "transactionId": "txn_123456"
                }
            }
        );
    }
);

module.exports = router;