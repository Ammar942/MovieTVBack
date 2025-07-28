// backend/src/utils/errorHandler.ts
import { Request, Response, NextFunction } from "express";

// Custom error class
export class ApiError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(message: string, statusCode: number = 500, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype); // Maintain proper prototype chain
  }
}

// 404 Not Found Handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new ApiError(`Not Found - ${req.originalUrl}`, 404));
};

// Generic Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || undefined;

  // Handle Prisma errors more gracefully if needed, e.g., unique constraint violation
  // if (err.code === 'P2002') { // Example for unique constraint violation
  //     statusCode = 409;
  //     message = `Duplicate field value: ${err.meta.target}`;
  // }

  console.error(err); // Log the error for debugging purposes

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: errors,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Only show stack in development
  });
};
