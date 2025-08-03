"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.getEntryById = exports.getEntries = exports.createEntry = void 0;
const client_1 = require("@prisma/client");
const errorHandler_1 = require("../utils/errorHandler");
const prisma = new client_1.PrismaClient();
const createEntry = async (data) => {
    try {
        console.log("Data received in createEntry:", data); // Log the received data
        return await prisma.entry.create({
            data: {
                ...data,
                releaseYear: Number(data.releaseYear),
            },
        });
    }
    catch (error) {
        console.error("Error in createEntry:", error); // Log the real error
        throw new errorHandler_1.ApiError("Failed to create entry", 500);
    }
};
exports.createEntry = createEntry;
const getEntries = async (page, limit, filters) => {
    try {
        const skip = (page - 1) * limit;
        // Build where clause for filtering
        const where = {};
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search } },
                { director: { contains: filters.search } },
                { notes: { contains: filters.search } },
            ];
        }
        if (filters?.type) {
            where.type = filters.type;
        }
        if (filters?.director) {
            where.director = { contains: filters.director };
        }
        if (filters?.releaseYear) {
            where.releaseYear = filters.releaseYear;
        }
        const [entries, total] = await prisma.$transaction([
            prisma.entry.findMany({
                where,
                skip: skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.entry.count({ where }),
        ]);
        return { entries, total };
    }
    catch (error) {
        console.error("Prisma error in getEntries:", error);
        throw new errorHandler_1.ApiError("Failed to retrieve entries", 500);
    }
};
exports.getEntries = getEntries;
const getEntryById = async (id) => {
    try {
        return await prisma.entry.findUnique({ where: { id } });
    }
    catch (error) {
        throw new errorHandler_1.ApiError(`Failed to retrieve entry with ID ${id}`, 500);
    }
};
exports.getEntryById = getEntryById;
const updateEntry = async (id, data) => {
    try {
        if (data.releaseYear !== undefined) {
            data.releaseYear = Number(data.releaseYear);
        }
        return await prisma.entry.update({
            where: { id },
            data: data,
        });
    }
    catch (error) {
        if (error.code === "P2025") {
            return null;
        }
        throw new errorHandler_1.ApiError(`Failed to update entry with ID ${id}`, 500);
    }
};
exports.updateEntry = updateEntry;
const deleteEntry = async (id) => {
    try {
        return await prisma.entry.delete({ where: { id } });
    }
    catch (error) {
        if (error.code === "P2025") {
            return null;
        }
        throw new errorHandler_1.ApiError(`Failed to delete entry with ID ${id}`, 500);
    }
};
exports.deleteEntry = deleteEntry;
//# sourceMappingURL=entryService.js.map