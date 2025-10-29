import { Router } from "express";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";
import {
  getUserShifts,
  createShift,
  updateShift,
  deleteShift
} from "../controllers/shift.controller";

const router = Router();

router.get("/:userId", verifyToken, getUserShifts);
router.post("/", verifyToken, createShift);
router.put("/:id", verifyToken, updateShift);
router.delete("/:id", verifyToken, deleteShift);

export default router;
