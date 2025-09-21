import express from "express";
import { uploadResume, getAllResumes, updateResumeStatus } from "../controllers/resumeController.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", singleUpload, uploadResume);
router.get("/", getAllResumes);
router.patch("/:id/status", updateResumeStatus);

export default router;
