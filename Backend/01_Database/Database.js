import mongoose from "mongoose";

const connectDB = async(req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(`Server Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;