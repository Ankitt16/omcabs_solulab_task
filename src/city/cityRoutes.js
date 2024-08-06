import express from 'express';
import { createCity, getAllCities, getCityById, updateCity, deleteCity } from '../city/citycontroller.js';

const router = express.Router();

router.post('/city', createCity);
router.get('/cities', getAllCities);
router.get('/city/:id', getCityById);
router.put('/city/:id', updateCity);
router.delete('/city/:id', deleteCity);

export default router;
