import { Router } from "express";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";
import {
  clockIn,
  clockOut,
  getAttendanceHistory
} from "../controllers/attendance.controller";

const router = Router();

router.post("/clockin", verifyToken, clockIn);
router.post("/clockout", verifyToken, clockOut);
router.get("/", verifyToken, getAttendanceHistory);

export default router;
