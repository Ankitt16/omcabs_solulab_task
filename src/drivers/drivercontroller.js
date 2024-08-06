import Driver from '../drivers/modeldriver.js';
import { validationResult } from 'express-validator';
import Ride from '../ride/modelride.js';


// Create Driver
export const createDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).json(driver);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ error: 'Driver not found' });
        res.status(200).json(driver);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!driver) return res.status(404).json({ error: 'Driver not found' });
        res.status(200).json(driver);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) return res.status(404).json({ error: 'Driver not found' });
        res.status(200).json({ message: 'Driver deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find Nearest Driver // working
export const findNearestDriver = async (req, res) => {
    const { pickupLocation } = req.body;

    try {
        const drivers = await Driver.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: pickupLocation.coordinates,
                    },
                    $maxDistance: 5000, // 5km radius ke andar hum yaha driver find kar rahe ahi
                },
            },
            status: 'available',
        }).limit(1);

        if (drivers.length === 0) return res.status(404).json({ error: 'No available drivers found' });

        res.status(200).json(drivers[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const acceptRide = async (req, res) => {
    const { rideId, driverId } = req.params;

    try {
        const ride = await Ride.findByIdAndUpdate(rideId, { driverId, status: 'accepted' }, { new: true });
        if (!ride) return res.status(404).json({ error: 'Ride not found' });

        const driver = await Driver.findByIdAndUpdate(driverId, { status: 'unavailable' }, { new: true });
        if (!driver) return res.status(404).json({ error: 'Driver not found' });

        res.status(200).json(ride);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cancel a Ride
export const cancelRide = async (req, res) => {
    const { rideId } = req.params;

    try {
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true });
        if (!ride) return res.status(404).json({ error: 'Ride not found' });

        if (ride.driverId) {
            await Driver.findByIdAndUpdate(ride.driverId, { status: 'available' });
        }

        res.status(200).json(ride);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const declineRide = async (req, res) => {
    const { rideId, driverId } = req.params;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) return res.status(404).json({ error: 'Ride not found' });

        if (ride.driverId && ride.driverId.toString() === driverId) {
            ride.driverId = null;
            ride.status = 'requested';
            await ride.save();

            await Driver.findByIdAndUpdate(driverId, { status: 'available' });

            res.status(200).json(ride);
        } else {
            res.status(400).json({ error: 'Driver not assigned to this ride' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
