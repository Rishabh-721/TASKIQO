import "dotenv/config";
import jwt from "jsonwebtoken";

const generateToken = (data, time) => jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: time});

export default generateToken;