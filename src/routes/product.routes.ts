import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
} from "../controllers/product.controller";
import { authMiddleware as verifyToken} from "../middleware/auth.middleware";

const router = Router();

// Rutas de productos
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

// Control de inventario
router.post("/:id/stock", verifyToken, adjustStock);

export default router;
