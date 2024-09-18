import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;
