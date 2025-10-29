import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers(req.params.type as string);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};