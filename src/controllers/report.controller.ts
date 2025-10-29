import { Request, Response } from "express";
import * as reportService from "../services/report.service";

export const dailySales = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  const data = await reportService.getDailySales(from as string, to as string);
  res.json(data);
};

export const lowStock = async (_req: Request, res: Response) => {
  const data = await reportService.getLowStock();
  res.json(data);
};

export const salesBySeller = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  const data = await reportService.getSalesBySeller(from as string, to as string);
  res.json(data);
};

export const inventoryMovements = async (req: Request, res: Response) => {
  const { limit = 50, offset = 0 } = req.query;
  const data = await reportService.getInventoryMovements(Number(limit), Number(offset));
  res.json(data);
};
