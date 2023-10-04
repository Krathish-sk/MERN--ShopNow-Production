import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// User authentication (verify the token)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodeToken.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized,No Auth Token");
  }
});

// Check for admin user or not
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
};
