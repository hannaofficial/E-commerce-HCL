import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

// Seller Login
// api/seller/login
export const sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password required!" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Logged In!", token, role: admin.role });

  } catch (error) {
    next(error);
  }
};

// Register Seller (For testing or internal use)
// api/seller/register
export const registerSeller = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details!" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: 'seller_admin' // Default to seller
    });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ success: true, message: "Seller Registered!", token, role: admin.role });

  } catch (error) {
    next(error);
  }
};

// Check if seller is authenticated
// api/seller/is-auth
export const isSellerAuth = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    return res.json({ success: true, admin: req.user });
  } catch (error) {
    next(error);
  }
}

// Seller Logout
// api/seller/logout
export const logoutSeller = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}
