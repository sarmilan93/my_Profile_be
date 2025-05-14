import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { getCurrentUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// @route   POST /api/register
authRouter.post('/register', async (req, res) => {
  const { userId, password, confirmPassword } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ userId, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/login
authRouter.post('/login', async (req, res) => {
  const { userId, password, rememberMe } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '365d' : '1d', // 1 year if rememberMe is checked
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Login successful', token: token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

authRouter.get('/logout', async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  return res.status(200).json({ message: 'Logout successful' });
});

authRouter.get("/me", protect, getCurrentUser);

export default authRouter;