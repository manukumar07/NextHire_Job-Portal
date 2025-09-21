import express from "express";
const router = express.Router();
import {
  login,
  register,
  updateProfile,
  logout,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
