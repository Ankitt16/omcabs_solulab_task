// // const jwt = require('jsonwebtoken');

// // function auth(req, res, next) {
// //     const token = req.header('x-auth-token');
// //     if (!token) return res.status(401).send('Access denied. No token provided.');

// //     try {
// //         const decoded = jwt.verify(token, 'your_jwt_private_key'); // secret key 
// //         req.user = decoded;
// //         next();
// //     } catch (ex) {
// //         res.status(400).send('Invalid token.');
// //     }
// // }

// // module.exports = auth;

// // auth.js middleware
// import jwt from 'jsonwebtoken';

// function auth(req, res, next) {
//     const token = req.header('x-auth-token');
//     if (!token && req.path !== '/register') {  
//         return res.status(401).send('Access denied. No token provided.');
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         res.status(400).send('Invalid token.');
//     }
// }

// export default auth;
