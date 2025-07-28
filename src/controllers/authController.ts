import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
