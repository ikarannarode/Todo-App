import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser";
config({ path: "./config/.env" })

export const app = express()

app.use(express.json())
app.use(cookieParser())




app.use("/api/v1/user", userRoutes)
app.use("/api/v1/task", taskRoutes)

