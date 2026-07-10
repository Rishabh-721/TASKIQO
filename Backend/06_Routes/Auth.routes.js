import { Router } from "express";
import { getMe, login, signUp } from "../05_Controller/Auth.controller.js"
import auth from "../03_Middleware/Auth.Middleware.js";

const route = Router();

route.post("/signup", signUp);
route.post("/login", login);
route.get("/me", auth, getMe);


export default route;