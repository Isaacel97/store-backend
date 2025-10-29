import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authMiddleware as verifyToken } from "../middleware/auth.middleware";

const router = Router();

// Rutas de usuarios
router.get("/:type", verifyToken, getUsers);

export default router;