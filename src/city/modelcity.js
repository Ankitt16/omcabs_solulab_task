// import mongoose from 'mongoose';

// const citySchema = new mongoose.Schema({
//     cityName: {
//         type: String,
//         required: true
//     },
//     country_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Country',
//         required: true
//     }
// });

// const City = mongoose.model('City', citySchema);
// export default City;


import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,  
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    population: {
        type: Number,
        min: [0, 'Population must be a positive number']  
    },
    area: {
        type: Number,
        min: [0, 'Area must be a positive number']  
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
}, {
    timestamps: true  
});

const City = mongoose.model('City', citySchema);
export default City;


