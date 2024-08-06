import Vehicle from '../vechile/modelvechile.js';
import Driver from '../drivers/modeldriver.js';


export const createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        const savedVehicle = await vehicle.save();
        res.status(201).json(savedVehicle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const deleteVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
        if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
        res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const assignDriver = async (req, res) => {
    const { vehicleId, driverId } = req.params;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

        const driver = await Driver.findById(driverId);
        if (!driver) return res.status(404).json({ error: "Driver not found" });

        vehicle.driver = driverId;
        await vehicle.save();

        driver.vehicle = vehicleId;
        await driver.save();

        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Revoke a Driver from a Vehicle // not working
export const revokeDriver = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

        const driver = await Driver.findOneAndUpdate({ vehicle: vehicleId }, { vehicle: null }, { new: true });
        if (!driver) return res.status(404).json({ error: "Driver not found" });

        vehicle.driver = null;
        await vehicle.save();

        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
