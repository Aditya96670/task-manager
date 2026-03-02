import { Router } from "express"
import { createTask } from "../controllers/task.controller"
import { authenticateUser } from "../middleware/auth.middleware"
import { getTasks } from "../controllers/task.controller"
import { updateTask } from "../controllers/task.controller"
import { deleteTask } from "../controllers/task.controller"




const router = Router()

router.post("/", authenticateUser, createTask)
router.get("/", authenticateUser, getTasks)

router.patch("/:id", authenticateUser, updateTask)
router.delete("/:id", authenticateUser, deleteTask)
export default router