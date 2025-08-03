"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.ApiError = void 0;
// Custom error class
class ApiError extends Error {
    constructor(message, statusCode = 500, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype); // Maintain proper prototype chain
    }
}
exports.ApiError = ApiError;
// 404 Not Found Handler
const notFoundHandler = (req, res, next) => {
    next(new ApiError(`Not Found - ${req.originalUrl}`, 404));
};
exports.notFoundHandler = notFoundHandler;
// Generic Error Handler
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map