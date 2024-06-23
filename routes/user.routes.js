import express from "express";
import { register, login, getAllUser, myProfile, logout } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/user.auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);




router.get("/logout", logout);

router.get("/all", isAuthenticated, getAllUser);

router.get("/profile", isAuthenticated, myProfile);


export default router;