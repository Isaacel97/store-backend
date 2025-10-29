import { Request, Response } from "express";
import * as inventoryMovementService from "../services/inventoryMovement.service";

export const getMovements = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;
    const data = await inventoryMovementService.getAll({
      limit: Number(limit) || 50,
      offset: Number(offset) || 0
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching inventory movements" });
  }
};

export const getMovementsByProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);
    const data = await inventoryMovementService.getByProduct(productId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching movements for product" });
  }
};
