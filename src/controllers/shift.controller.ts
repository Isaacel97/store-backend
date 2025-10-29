import { Request, Response } from "express";
import * as shiftService from "../services/shift.service";

export const getUserShifts = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const shifts = await shiftService.getByUser(userId);
  res.json(shifts);
};

export const createShift = async (req: Request, res: Response) => {
  const { user_id, day_of_week, start_time, end_time } = req.body;
  const shift = await shiftService.create({ user_id, day_of_week, start_time, end_time });
  res.json(shift);
};

export const updateShift = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { day_of_week, start_time, end_time } = req.body;
  const updated = await shiftService.update(id, { day_of_week, start_time, end_time });
  res.json(updated);
};

export const deleteShift = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await shiftService.remove(id);
  res.json({ message: "Shift deleted successfully" });
};
