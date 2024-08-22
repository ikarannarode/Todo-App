import express from "express";
import { register, login, myProfile, logout } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);




router.get("/logout", logout);


router.get("/profile", isAuthenticated, myProfile);


export default router;