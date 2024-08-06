// //API
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");

// const RegistrationModel = require("../server/registration/regis");
// const connectDb = require("./database/db");
// const adminRoutes = require("../server/Admin/adminRoutes");
// const cityRoutes = require("../server/city/cityRoutes");
// const countryRoutes = require("../server/country/countryRoutes");
// const DriverRoutes = require("../server/drivers/DriverRoutes");
// const rideRoutes = require("../server/ride/rideRoutes");
// const settingRoutes = require("../server/setting/settingRoutes");
// const userRoutes = require("../server/userRegistration/userRoutes");
// const vechileRoutes = require("../server/vechile/vechileRoutes");
// const googleMapsRoutes = require("../server/googlemaps/googlemaproutes")
// const app = express();
// connectDb();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.use(adminRoutes);
// app.use(cityRoutes);
// app.use(countryRoutes);
// app.use(DriverRoutes);
// app.use(rideRoutes);
// app.use(settingRoutes);
// app.use(userRoutes);
// app.use(vechileRoutes);
// app.use('/api', googleMapsRoutes);

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   RegistrationModel.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         return res.json("No Record Existed");
//       }
//       if (user.password === password) {
//         return res.json(user);
//       } else {
//         return res.json("Password is incorrect");
//       }
//     })
//     .catch((err) => res.status(500).json("Error: " + err));
// });

// app.post("/register", async (req, res) => {
//   try {
//     const alldata = new RegistrationModel(req.body);
//     const userdata = await alldata.save();
//     res.status(201).json(userdata);
//   } catch (err) {
//     res.status(400).json("Error: " + err);
//   }
// });

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

//   ------------------------------------Adding es6--------------------------------------------------------

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import jwt from "jsonwebtoken";

import adminRoutes from "../src/Admin/admin_Routes.js";
import superAdminRoutes from "../src/Admin/super_admin_routes.js";
import cityRoutes from "../src/city/cityRoutes.js";
import DriverRoutes from "../src/drivers/DriverRoutes.js";
import rideRoutes from "../src/ride/ride_routes.js";
import userRoutes from "../src/userRegistration/user_routes.js";
import vechileRoutes from "../src/vechile/routesvechile.js";
import RegistrationModel from "../src/registration/regis.js"; 
// import auth from "../src/Admin/auth.js";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(auth);

// Routes
app.use(adminRoutes);
app.use(superAdminRoutes);
app.use(cityRoutes);
app.use(DriverRoutes);
app.use(rideRoutes);
app.use(userRoutes);
app.use(vechileRoutes);



app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegistrationModel.findOne({ email });
    if (!user) {
      return res.status(404).json("No Record Existed");
    }
    
    if (user.password === password) {
      return res.json(user);
    } else {
      return res.status(401).json("Password is incorrect");
    }
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const alldata = new RegistrationModel(req.body);
    const userdata = await alldata.save();
    res.status(201).json(userdata);
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
