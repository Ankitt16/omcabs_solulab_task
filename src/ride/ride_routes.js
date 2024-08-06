import express from 'express';
import { createRide, cancelRide } from '../ride/controller_ride.js';

const router = express.Router();

// routes for ride/ cancel 
router.post('/ride', createRide);
router.get('/ride/cancel/:rideId', cancelRide);

export default router;
