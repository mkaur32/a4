import express from 'express';
import { createUser, loginUser } from '../controller/userController';
import  isAuthenticated  from '../middleware/authMiddleware';

const router = express.Router();

// Create a new user
router.route('/signup').post(createUser);

// Login a user (requires authentication)
router.route('/login').post(isAuthenticated, loginUser);

export default router;

