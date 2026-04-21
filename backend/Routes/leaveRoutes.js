import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addLeave, getLeaves } from '../Controlers/leaveControllers.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/add',verifyUser, addLeave);
router.get('/user', verifyUser, getLeaves);

export default router;