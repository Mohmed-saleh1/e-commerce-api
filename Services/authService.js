const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.status(201).json({ data: user, token: token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password"));
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.status(201).json({ data: user, token: token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers);
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return next(new ApiError("You are not loged in ", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  const currentuser = await User.findById(decoded.userId);
  if (!currentuser) {
    return next(new ApiError("ther user for this token not exist ", 401));
  }
  next();
});
