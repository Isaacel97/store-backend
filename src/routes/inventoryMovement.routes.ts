import { Router } from "express";
import {
  getMovements,
  getMovementsByProduct
} from "../controllers/inventoryMovement.controller";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyToken, getMovements);
router.get("/:productId", verifyToken, getMovementsByProduct);

export default router;
