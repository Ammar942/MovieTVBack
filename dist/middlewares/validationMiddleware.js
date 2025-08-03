"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const errorHandler_1 = require("../utils/errorHandler");
const validate = (schema, target = "body") => (req, res, next) => {
    try {
        schema.parse(req[target]);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errors = error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            }));
            next(new errorHandler_1.ApiError("Validation Failed", 400, errors));
        }
        else {
            console.error("Validation middleware error:", error);
            next(new errorHandler_1.ApiError("Internal Server Error", 500));
        }
    }
};
exports.validate = validate;
//# sourceMappingURL=validationMiddleware.js.map