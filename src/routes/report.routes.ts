import { Router } from "express";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";
import {
  dailySales,
  lowStock,
  salesBySeller,
  inventoryMovements
} from "../controllers/report.controller";

const router = Router();

router.get("/sales/daily", verifyToken, dailySales);
router.get("/stock/low", verifyToken, lowStock);
router.get("/sales/sellers", verifyToken, salesBySeller);
router.get("/inventory/movements", verifyToken, inventoryMovements);

export default router;
