import { Router } from 'express';

import { login, register, getUser } from '../controllers/Users';

const router = Router();

// @desc    Sign in user
// @route   POST /auth/login
router.post('/login', login);

// @desc    Register user
// @route   POST /auth/register
router.post('/register', register);

// @desc    Get user
// @route   GET /auth/user
router.get('/user', getUser);

export default router;
