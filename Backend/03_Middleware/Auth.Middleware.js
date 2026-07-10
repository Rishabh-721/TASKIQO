import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../02_Model/User.model.js";

const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "No Token Found"
        })
    }
    
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const id = decoded.userId;
        const user = await User.findById(id);

        if(!user){
            return res.status(401).json({
                message: `User Dosen't exist`
            })
        }

        if (decoded.purpose !== "Auth") {
            return res.status(401).json({
                message: "Token for wrong purpose"
            });
        }

        const sessionVersion = decoded.userSessionVersion;
        const userSession = user.sessionVersion;

        if(sessionVersion !== userSession){
            return res.status(401).json({
                message: `Session expired. Please login again.`
            })
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            message: `Auth Error : ${error.message}`
        })
    }
}

export default auth;