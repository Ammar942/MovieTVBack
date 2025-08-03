"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSchema = exports.paginationSchema = exports.updateEntrySchema = exports.createEntrySchema = void 0;
// backend/src/validationSchemas/entrySchemas.ts
const zod_1 = require("zod");
// Base schema for creating an entry
exports.createEntrySchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),
    type: zod_1.z.enum(["Movie", "TV_Show"], {
        message: 'Type must be "Movie" or "TV_Show"',
    }),
    director: zod_1.z
        .string()
        .min(1, "Director is required")
        .max(255, "Director cannot exceed 255 characters"),
    budget: zod_1.z
        .string()
        .max(100, "Budget cannot exceed 100 characters")
        .optional()
        .or(zod_1.z.literal("")),
    location: zod_1.z
        .string()
        .max(255, "Location cannot exceed 255 characters")
        .optional()
        .or(zod_1.z.literal("")),
    duration: zod_1.z
        .string()
        .max(100, "Duration cannot exceed 100 characters")
        .optional()
        .or(zod_1.z.literal("")),
    releaseYear: zod_1.z
        .number()
        .int()
        .min(1888, "Release year must be 1888 or later")
        .max(new Date().getFullYear() + 5, "Release year cannot be in the distant future"), // Up to 5 years from now
    endTime: zod_1.z
        .string()
        .max(100, "End Time cannot exceed 100 characters")
        .optional()
        .or(zod_1.z.literal("")),
    notes: zod_1.z
        .string()
        .max(1000, "Notes cannot exceed 1000 characters")
        .optional()
        .or(zod_1.z.literal("")),
    poster: zod_1.z
        .string()
        .max(500, "Poster URL cannot exceed 500 characters")
        .optional()
        .or(zod_1.z.literal("")),
});
// Schema for updating an entry (all fields are optional)
exports.updateEntrySchema = exports.createEntrySchema.partial();
// Schema for pagination query parameters
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .default("1")
        .transform((val) => {
        const num = parseInt(val);
        return isNaN(num) || num < 1 ? 1 : num;
    }),
    limit: zod_1.z
        .string()
        .optional()
        .default("10")
        .transform((val) => {
        const num = parseInt(val);
        return isNaN(num) || num < 1 || num > 100 ? 10 : num; // Limit max items per page
    }),
});
// Schema for search and filter query parameters
exports.searchSchema = exports.paginationSchema.extend({
    search: zod_1.z.string().optional(),
    type: zod_1.z.enum(["Movie", "TV_Show"]).optional(),
    director: zod_1.z.string().optional(),
    releaseYear: zod_1.z
        .string()
        .optional()
        .transform((val) => {
        if (!val)
            return undefined;
        const num = parseInt(val);
        return isNaN(num) ? undefined : num;
    }),
});
//# sourceMappingURL=entrySchemas.js.map