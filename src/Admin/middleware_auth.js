import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token && req.path !== '/register') {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

export default auth;
