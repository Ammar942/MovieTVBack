import { Router } from "express";
import * as entryController from "../controllers/entryController";
import { validate } from "../middlewares/validationMiddleware";
import {
  createEntrySchema,
  updateEntrySchema,
  paginationSchema,
  searchSchema,
} from "../validationSchemas/entrySchemas";

const router = Router();

router.post("/", validate(createEntrySchema), entryController.createEntry);
router.get(
  "/",
  validate(searchSchema, "query"),
  entryController.getEntries as any // TODO: Fix type casting
);
router.get("/:id", entryController.getEntryById);
router.put("/:id", validate(updateEntrySchema), entryController.updateEntry);
router.delete("/:id", entryController.deleteEntry);

export default router;
