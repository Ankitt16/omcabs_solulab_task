import express from 'express';
import { createDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver, findNearestDriver, acceptRide, cancelRide, declineRide } from '../drivers/drivercontroller.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/driver', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phone').isMobilePhone().withMessage('Valid phone number is required'),
    check('carModel').not().isEmpty().withMessage('Car model is required'),
    check('carNumber').not().isEmpty().withMessage('Car number is required'),
    check('location').isObject().withMessage('Location is required')
], createDriver);

router.get('/drivers', getAllDrivers);


router.get('/driver/:id', getDriverById);


router.put('/driver/:id', [
    check('name').optional().not().isEmpty().withMessage('Name is required'),
    check('email').optional().isEmail().withMessage('Valid email is required'),
    check('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
    check('carModel').optional().not().isEmpty().withMessage('Car model is required'),
    check('carNumber').optional().not().isEmpty().withMessage('Car number is required'),
    check('location').optional().isObject().withMessage('Location is required')
], updateDriver);


router.delete('/driver/:id', deleteDriver);


router.post('/driver/nearest', [
    check('pickupLocation').isObject().withMessage('Pickup location is required')
], findNearestDriver);

router.get('/ride/accept/:rideId/:driverId', acceptRide);


router.get('/driver/cancel/:rideId', cancelRide);


router.get('/ride/decline/:rideId/:driverId', declineRide);

export default router;
