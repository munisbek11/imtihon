const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      const error = new Error("Username va parol majburiy");
      error.statusCode = 400;
      return next(error);
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      const error = new Error("Bu username allaqachon mavjud");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tish" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      const error = new Error("Username va parol majburiy");
      error.statusCode = 400;
      return next(error);
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      const error = new Error("Admin topilmadi");
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new Error("Parol noto'g'ri");
      error.statusCode = 400;
      return next(error);
    }

    const token = jwt.sign(
      { id: admin._id, isAdmin: true, username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    admin.token = token;
    await admin.save();

    res.status(200).json({ message: "Muvaffaqiyatli login", token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token yuborilmadi");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      const error = new Error("Admin topilmadi");
      error.statusCode = 404;
      return next(error);
    }

    admin.token = null;
    await admin.save();

    res.status(200).json({ message: "Muvaffaqiyatli logout" });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      const error = new Error("Token noto'g'ri");
      error.statusCode = 401;
      return next(error);
    }
    next(err);
  }
};