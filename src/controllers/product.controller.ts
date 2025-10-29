import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await productService.update(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.remove(Number(req.params.id));
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

export const adjustStock = async (req: Request, res: Response) => {
  try {
    const { quantity_change, reason, user_id } = req.body;
    const updatedStock = await productService.adjustStock(
      Number(req.params.id),
      quantity_change,
      reason,
      user_id
    );
    res.json(updatedStock);
  } catch (err) {
    res.status(500).json({ error: "Error adjusting stock" });
  }
};
