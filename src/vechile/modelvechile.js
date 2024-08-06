import mongoose from 'mongoose';
import Joi from 'joi';


const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    number: {
        type: String,
        unique: true,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Joi schema for validation
const joiVehicleSchema = Joi.object({
    model: Joi.string().required(),
    number: Joi.string().required(),
    driver: Joi.string().optional() 
});


const validateVehicle = (data) => joiVehicleSchema.validate(data);

export default Vehicle;
export { validateVehicle };
