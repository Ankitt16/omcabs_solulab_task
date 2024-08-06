function isSuperAdmin(req, res, next) {
    if (req.user && req.user.role === 'superadmin') {
        next();
    } else {
        return res.status(403).send('Access denied. Only Super Admins can Access This.');
    }
}

export default isSuperAdmin;
