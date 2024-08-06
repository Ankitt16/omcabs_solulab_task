// const express = require("express");
// const router = express.Router();
// const Admin = require("./model_admin");


// router.post("/admin", async (req, res) => {
//   try {
//     const admin = new Admin(req.body);
//     await admin.save();
//     res.status(201).json(admin);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get all Admins
// router.get("/admin", async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json(admins);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get Admin by ID
// router.get("/admin/:id", async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin) return res.status(404).json({ error: "Admin not found" });
//     res.status(200).json(admin);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Admin
// router.put("/admin/:id", async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!admin) return res.status(404).json({ error: "Admin not found" });
//     res.status(200).json(admin);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete Admin
// router.delete("/admin/:id", async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndDelete(req.params.id);
//     if (!admin) return res.status(404).json({ error: "Admin not found" });
//     res.status(200).json({ message: "Admin deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

import express from 'express';
import { Admin, validateAdmin } from '../Admin/model_admin.js';

const router = express.Router();

router.post('/admin', async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/admin/:id', async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        res.status(200).json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        res.status(200).json({ message: "Admin deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

