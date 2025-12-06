const express = require('express');
const router = express.Router();
const SajuReading = require('../models/SajuReading');

// Create a new Saju reading
router.post('/readings', async (req, res, next) => {
  try {
    const { userId, type, content } = req.body;

    const reading = new SajuReading({
      userId,
      type,
      content,
    });

    await reading.save();

    res.status(201).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    next(error);
  }
});

// Get specific reading for user by type
router.get('/readings/:userId/:type', async (req, res, next) => {
  try {
    const { userId, type } = req.params;
    const now = new Date();

    // Find the most recent valid reading
    const reading = await SajuReading.findOne({
      userId,
      type,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: now } }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('userId', 'name birthDate');

    if (!reading) {
      return res.status(404).json({
        success: false,
        error: 'No reading found',
      });
    }

    res.status(200).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    next(error);
  }
});

// Get all readings for a user
router.get('/readings/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    const readings = await SajuReading.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name birthDate');

    res.status(200).json({
      success: true,
      data: readings,
    });
  } catch (error) {
    next(error);
  }
});

// Delete expired readings (utility endpoint)
router.delete('/readings/cleanup', async (req, res, next) => {
  try {
    const now = new Date();
    
    const result = await SajuReading.deleteMany({
      expiresAt: { $ne: null, $lt: now }
    });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} expired readings`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
