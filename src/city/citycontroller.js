import City from '../city/modelcity.js';

// Create City
export const createCity = async (req, res) => {
    try {
        
        const existingCity = await City.findOne({ cityName: req.body.cityName });
        if (existingCity) {
            return res.status(400).json({ error: "City with this name already exists" });
        }

        // Create a new city if it doesn't exist
        const city = new City(req.body);
        const savedCity = await city.save();
        res.status(201).json(savedCity);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all Cities
export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('country_id');
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get City by ID
export const getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id).populate('country_id');
        if (!city) return res.status(404).json({ error: "City not found" });
        res.status(200).json(city);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update City
export const updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!city) return res.status(404).json({ error: "City not found" });
        res.status(200).json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete City
export const deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) return res.status(404).json({ error: "City not found" });
        res.status(200).json({ message: "City deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
