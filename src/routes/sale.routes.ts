import { Router } from "express";
import {
  createSale,
  getSales,
  getSaleById,
  revertSale,
} from "../controllers/sale.controller";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";

const router = Router();


router.get("/", verifyToken, getSales);
router.get("/:id", verifyToken, getSaleById);
router.post("/", verifyToken, createSale);
router.post("/:id/revert", verifyToken, revertSale);

export default router;
