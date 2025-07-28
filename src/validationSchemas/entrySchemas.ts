// backend/src/validationSchemas/entrySchemas.ts
import { z } from "zod";

// Base schema for creating an entry
export const createEntrySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title cannot exceed 255 characters"),
  type: z.enum(["Movie", "TV_Show"], {
    message: 'Type must be "Movie" or "TV_Show"',
  }),
  director: z
    .string()
    .min(1, "Director is required")
    .max(255, "Director cannot exceed 255 characters"),
  budget: z
    .string()
    .max(100, "Budget cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(255, "Location cannot exceed 255 characters")
    .optional()
    .or(z.literal("")),
  duration: z
    .string()
    .max(100, "Duration cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be 1888 or later")
    .max(
      new Date().getFullYear() + 5,
      "Release year cannot be in the distant future"
    ), // Up to 5 years from now
  endTime: z
    .string()
    .max(100, "End Time cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  poster: z
    .string()
    .max(500, "Poster URL cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

// Schema for updating an entry (all fields are optional)
export const updateEntrySchema = createEntrySchema.partial();

// Schema for pagination query parameters
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => {
      const num = parseInt(val);
      return isNaN(num) || num < 1 ? 1 : num;
    }),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => {
      const num = parseInt(val);
      return isNaN(num) || num < 1 || num > 100 ? 10 : num; // Limit max items per page
    }),
});

// Schema for search and filter query parameters
export const searchSchema = paginationSchema.extend({
  search: z.string().optional(),
  type: z.enum(["Movie", "TV_Show"]).optional(),
  director: z.string().optional(),
  releaseYear: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const num = parseInt(val);
      return isNaN(num) ? undefined : num;
    }),
});
