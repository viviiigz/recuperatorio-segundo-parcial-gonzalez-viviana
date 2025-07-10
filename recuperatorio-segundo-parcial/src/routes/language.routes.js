//rutas que voy a utilizar
import { Router } from "express";
import {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.controllers.js";

const router = Router();
// definición de las rutas
router.get("/", getAllLanguages);
router.get("/:id", getLanguageById);
router.post("/", createLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

export default router;
