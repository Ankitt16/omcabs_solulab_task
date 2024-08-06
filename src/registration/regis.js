import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const RegistrationModel = mongoose.model('OmCabs', registrationSchema);

export default RegistrationModel;
