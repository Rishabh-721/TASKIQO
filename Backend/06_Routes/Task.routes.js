import { Router } from "express";
import auth from "../03_Middleware/Auth.Middleware.js";
import role from "../03_Middleware/Role.Middleware.js"
import { taskCreation, taskDelete, taskList, taskReassingAdmin, taskUpdate } from "../05_Controller/Task.controller.js";

const route = Router();

route.get("/", auth, taskList);
route.post("/create",auth, role("Admin"), taskCreation);
route.post("/update/:id",auth, role("Admin"), taskUpdate);
route.post("/delete/:id",auth, role("Admin"), taskDelete);
route.post("/admin/:id/reassing", auth, role("Super_Admin"), taskReassingAdmin)

export default route;


