import "dotenv/config";
import express from "express";
import cors from "cors";
import User from "./02_Model/User.model.js";
import connectDB from "./01_Database/database.js";
import authRoute from "./06_Routes/Auth.routes.js";
import userRoute from "./06_Routes/User.routes.js";
import taskRoute from "./06_Routes/Task.routes.js";

const port = process.env.PORT;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials : true,
}

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/task", taskRoute);

connectDB();

app.listen(port, "0.0.0.0", () => console.log(`Server is create on port :${port}`))