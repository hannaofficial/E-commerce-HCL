import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Protect routes
export const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user is Admin or User. 
        // We might need to check both collections or have a type in token.
        // For now, let's assume we look for Admin first, then User if not found?
        // Or better, the token should contain the role or type.
        // Assuming the token payload has { id: ... }

        req.user = await Admin.findById(decoded.id).select('-password');

        if (!req.user) {
            // If not admin, maybe it's a regular user?
            // If this middleware is shared, we might need to handle both.
            // But for now, let's assume this is for Admin routes as per RBAC requirement.
            // If we need it for Users, we can import User model too.
            const User = (await import('../models/user.js')).default;
            req.user = await User.findById(decoded.id).select('-password');
        }

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'seller_admin' || req.user.role === 'super_admin')) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Not authorized as an admin' });
    }
};

// Super Admin middleware
export const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Not authorized as a super admin' });
    }
};
