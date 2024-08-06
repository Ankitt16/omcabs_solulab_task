import express from 'express';
import { createVehicle, deleteVehicle, assignDriver, revokeDriver } from '../vechile/controllervechile.js';

const router = express.Router();


router.post('/createVehicle', createVehicle);

router.delete('/:vehicleId', deleteVehicle);

router.get('/:vehicleId/assign/:driverId', assignDriver);


router.get('/:vehicleId/revoke', revokeDriver);

export default router;
