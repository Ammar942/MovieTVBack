import { PrismaClient, Entry, EntryType } from "@prisma/client";
import { ApiError } from "../utils/errorHandler";

const prisma = new PrismaClient();

type CreateEntryData = {
  title: string;
  type: EntryType;
  director: string;
  budget?: string | null;
  location?: string | null;
  duration?: string | null;
  releaseYear: number;
  endTime?: string | null;
  notes?: string | null;
  poster?: string | null;
};

type UpdateEntryData = Partial<CreateEntryData>;

export const createEntry = async (data: CreateEntryData): Promise<Entry> => {
  try {
    console.log("Data received in createEntry:", data); // Log the received data
    return await prisma.entry.create({
      data: {
        ...data,
        releaseYear: Number(data.releaseYear),
      },
    });
  } catch (error) {
    console.error("Error in createEntry:", error); // Log the real error
    throw new ApiError("Failed to create entry", 500);
  }
};

export const getEntries = async (
  page: number,
  limit: number,
  filters?: {
    search?: string;
    type?: "Movie" | "TV_Show";
    director?: string;
    releaseYear?: number;
  }
): Promise<{ entries: Entry[]; total: number }> => {
  try {
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};

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
  } catch (error) {
    console.error("Prisma error in getEntries:", error);
    throw new ApiError("Failed to retrieve entries", 500);
  }
};

export const getEntryById = async (id: number): Promise<Entry | null> => {
  try {
    return await prisma.entry.findUnique({ where: { id } });
  } catch (error) {
    throw new ApiError(`Failed to retrieve entry with ID ${id}`, 500);
  }
};

export const updateEntry = async (
  id: number,
  data: UpdateEntryData
): Promise<Entry | null> => {
  try {
    if (data.releaseYear !== undefined) {
      data.releaseYear = Number(data.releaseYear);
    }
    return await prisma.entry.update({
      where: { id },
      data: data,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return null;
    }
    throw new ApiError(`Failed to update entry with ID ${id}`, 500);
  }
};

export const deleteEntry = async (id: number): Promise<Entry | null> => {
  try {
    return await prisma.entry.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      return null;
    }
    throw new ApiError(`Failed to delete entry with ID ${id}`, 500);
  }
};
