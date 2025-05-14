import express from 'express';
import {
  updateBasicDetails,
  updateAdditionalDetails,
  updatePersonalPreferences,
  updateSpouseDetails,
  getUserProfile,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const userProfileRouter = express.Router();

userProfileRouter.get('/profile', protect, getUserProfile);
userProfileRouter.put('/basicProfile', protect, updateBasicDetails);
userProfileRouter.put('/additional', protect, updateAdditionalDetails);
userProfileRouter.put('/preferences', protect, updatePersonalPreferences);
userProfileRouter.put('/spouse', protect, updateSpouseDetails);

export default userProfileRouter;