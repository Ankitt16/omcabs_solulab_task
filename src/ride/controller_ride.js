import Ride from '../ride/modelride.js';

// Create$Book a new Ride
export const createRide = async (req, res) => {
    try {
        console.log(Ride);
        const ride = new Ride(req.body);
        const savedRide = await ride.save();
        res.status(201).json(savedRide);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const cancelRide = async (req, res) => {
   
    const { rideId } = req.params;
    try {
        
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true });
        if (!ride) return res.status(404).json({ error: "Ride not found" });
        res.status(200).json(ride);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

