import express from 'express';
import { Admin, validateAdmin } from '../Admin/model_admin.js';
import isSuperAdmin from '../Admin/super_admin.js';

const router = express.Router();

router.post('/createAdmin', isSuperAdmin, async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = new Admin(req.body);
    admin = await admin.save();
    res.send(admin);
});

router.get('/admins', isSuperAdmin, async (req, res) => {
    const admins = await Admin.find();
    res.send(admins);
});

export default router;

