import { Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await saleService.getAll();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Error fetching sales" });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.getById(Number(req.params.id));
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: "Error fetching sale" });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const { seller_id, items } = req.body;
    const sale = await saleService.createSale(seller_id, items);
    res.status(201).json(sale);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Error creating sale" });
  }
};

export const revertSale = async (req: Request, res: Response) => {
  try {
    const saleId = Number(req.params.id);
    const user = (req as any).user; // usuario autenticado desde el token

    const result = await saleService.revertSale(saleId, user.id);

    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || "Error reverting sale" });
  }
};
