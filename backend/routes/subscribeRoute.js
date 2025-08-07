const express = require('express');
const router = express.Router();
const Subscribe = require('../models/Subscribe');
// @route POST /api/subscribe/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post('/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        // Check if the email is already subscribed
        let subscriber = await Subscribe.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ message: 'Email is already subscribed' });
        }
        subscriber = new Subscribe({ email });
        await subscriber.save();
        res.status(201).json({ message: 'Successfully subscribed to the newsletter!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
