import "dotenv/config";
import mongoose from "mongoose";
import User from "../02_Model/User.model.js";
import connectDB from "../01_Database/database.js";
import { hashingPwd } from "../04_Utils/PwdChange.utils.js";

const Super_Admin_Creation = async() => {
    try {
        await connectDB();

        const existingSuperAdmin = await User.findOne({role: "Super_Admin"});
        
        if(existingSuperAdmin){
            console.log("Super Admin already exists.");
            return
        }

        if (!process.env.AUTHOR_NAME ||!process.env.AUTHOR_EMAIL ||!process.env.AUTHOR_PASSWORD) {
            console.log("Missing Super Admin environment variables.");
            return
        }

        const hashedPwd = await hashingPwd(process.env.AUTHOR_PASSWORD);

        await User.create({
            name: process.env.AUTHOR_NAME,
            email: process.env.AUTHOR_EMAIL,
            password: hashedPwd,
            role: "Super_Admin",
            isActive: true  
        })

        

        console.log(`Super Admin Created Successfully: ${process.env.AUTHOR_EMAIL}`);

    } catch (error) {
        console.log(`Seed Error: ${error.message}`);
    }finally{
        await mongoose.connection.close();
    }
}


Super_Admin_Creation();
