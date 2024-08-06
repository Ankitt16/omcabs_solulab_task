import express from 'express';
const router = express.Router();
import UserController from '../userRegistration/user_controller.js';
import checkUserAuth from '../userRegistration/auth_middleware.js';

//route Level Middleware  - to protect Route

router.use('/changepassword' , checkUserAuth)

// register / login routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);


//passwordchange routes

router.post('/changepassword', UserController.changeUserPassword)

export default router;
