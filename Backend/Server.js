import "dotenv/config";
import express from "express";
import User from "./02_Model/User.model.js";
import connectDB from "./01_Database/database.js";
import authRoute from "./06_Routes/Auth.routes.js"

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

connectDB();

app.listen(port, "0.0.0.0", () => console.log(`Server is create on port :${port}`))