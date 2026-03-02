import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { loginUser } from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware"
import { refreshAccessToken } from "../controllers/auth.controller"
import { logoutUser } from "../controllers/auth.controller"

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authenticateUser, (req: any, res) => {
  res.json({ message: "Protected route working", userId: req.userId })
})
router.post("/refresh", refreshAccessToken)
router.post("/logout", logoutUser)


export default router;