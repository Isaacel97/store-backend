import { Request, Response } from "express";
import * as inventoryService from "../services/inventory.service";

/**
 * GET /api/inventory
 * Opcional: ?productId=1
 */
export const getInventory = async (req: Request, res: Response) => {
  try {
    const productId = req.query.productId ? Number(req.query.productId) : undefined;
    const data = await inventoryService.getInventory({ productId });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching inventory" });
  }
};

/**
 * GET /api/inventory/:productId
 */
export const getInventoryByProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);
    const data = await inventoryService.getInventoryByProduct(productId);
    if (!data) {
      return res.status(404).json({ error: "Product not found in inventory" });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching inventory for product" });
  }
};
