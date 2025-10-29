import { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service";

export const clockIn = async (req: Request, res: Response) => {
  const userId = req.user?.id || req.body.user_id;
  const result = await attendanceService.clockIn(userId);
  res.json(result);
};

export const clockOut = async (req: Request, res: Response) => {
  const userId = req.user?.id || req.body.user_id;
  const result = await attendanceService.clockOut(userId);
  res.json(result);
};

export const getAttendanceHistory = async (req: Request, res: Response) => {
  const { userId, from, to } = req.query;
  const result = await attendanceService.getHistory({
    userId: userId ? Number(userId) : undefined,
    from: from as string,
    to: to as string
  });
  res.json(result);
};
