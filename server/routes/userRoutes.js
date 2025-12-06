const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const { name, birthDate, birthTime, gender } = req.body;

    const user = new User({
      name,
      birthDate,
      birthTime,
      gender,
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/:id', async (req, res, next) => {
  try {
    const { name, birthDate, birthTime, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, birthDate, birthTime, gender, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
