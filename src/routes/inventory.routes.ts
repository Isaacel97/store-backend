import { Router } from "express";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";
import { getInventory, getInventoryByProduct } from "../controllers/inventory.controller";

const router = Router();

router.get("/", verifyToken, getInventory);
router.get("/:productId", verifyToken, getInventoryByProduct);

export default router;
