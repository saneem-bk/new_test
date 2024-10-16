import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (id) => {
  return jwt.sign({id: id}, secret_key, { expiresIn: "1d" });
};



export const adminToken = (id) => {
    return jwt.sign({id: id}, secret_key, {
      expiresIn: "1d",
    });
  };