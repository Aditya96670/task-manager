/// <reference types="node" />
import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import taskRoutes from "./routes/task.routes"
 
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend port
    credentials: true,
  })
);
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Backend is Running")
})

app.use("/api/auth", authRoutes)

app.use("/api/tasks", taskRoutes)







const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})