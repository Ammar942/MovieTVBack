// backend/src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/errorHandler";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, target: ValidationTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        next(new ApiError("Validation Failed", 400, errors));
      } else {
        console.error("Validation middleware error:", error);
        next(new ApiError("Internal Server Error", 500));
      }
    }
  };
