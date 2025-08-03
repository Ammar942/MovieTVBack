"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.getEntryById = exports.getEntries = exports.createEntry = void 0;
const entryService = __importStar(require("../services/entryService"));
const errorHandler_1 = require("../utils/errorHandler");
const createEntry = async (req, res, next) => {
    try {
        const entry = await entryService.createEntry(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        next(error);
    }
};
exports.createEntry = createEntry;
const getEntries = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        // Extract search filters
        const filters = {
            search: req.query.search,
            type: req.query.type,
            director: req.query.director,
            releaseYear: req.query.releaseYear ? Number(req.query.releaseYear) : undefined,
        };
        // Remove undefined values
        const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== undefined));
        const { entries, total } = await entryService.getEntries(page, limit, Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined);
        res.status(200).json({ entries, total, page, limit });
    }
    catch (error) {
        next(error);
    }
};
exports.getEntries = getEntries;
const getEntryById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.ApiError("Invalid ID format", 400);
        }
        const entry = await entryService.getEntryById(id);
        if (!entry) {
            throw new errorHandler_1.ApiError("Entry not found", 404);
        }
        res.status(200).json(entry);
    }
    catch (error) {
        next(error);
    }
};
exports.getEntryById = getEntryById;
const updateEntry = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.ApiError("Invalid ID format", 400);
        }
        const updatedEntry = await entryService.updateEntry(id, req.body);
        if (!updatedEntry) {
            throw new errorHandler_1.ApiError("Entry not found", 404);
        }
        res.status(200).json(updatedEntry);
    }
    catch (error) {
        next(error);
    }
};
exports.updateEntry = updateEntry;
const deleteEntry = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new errorHandler_1.ApiError("Invalid ID format", 400);
        }
        const deletedEntry = await entryService.deleteEntry(id);
        if (!deletedEntry) {
            throw new errorHandler_1.ApiError("Entry not found", 404);
        }
        res.status(204).send(); // No content for successful deletion
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEntry = deleteEntry;
//# sourceMappingURL=entryController.js.map