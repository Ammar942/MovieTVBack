import express from "express";
import cors from "cors";
import entryRoutes from "./routes/entryRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler, notFoundHandler } from "./utils/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/entries", entryRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware (must be after routes)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
