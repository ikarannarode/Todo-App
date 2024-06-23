import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers//task.controllers.js";
import { isAuthenticated } from "../middlewares/user.auth.js";
const router = express.Router();


router.post("/new", isAuthenticated, newTask);
router.get("/all", isAuthenticated, getMyTask);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)



export default router;