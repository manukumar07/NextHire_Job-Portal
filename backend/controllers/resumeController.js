import cloudinary from "../utils/cloudinary.js";
import { Resume } from "../models/Resumemodel.js";
import mongoose from "mongoose";
import streamifier from "streamifier";
import { extractTextFromPDF } from "../utils/pdf.js";
import { parseResumeText } from "../utils/parseResume.js";


export const uploadResume = async (req, res) => {
    try {
        const { userId, resumeText } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or missing userId" });
        }

        let text = "";
        let resumeFileURL = "";
        let resumeOriginalName = "";

        if (req.file) {
            // Upload to Cloudinary
            const uploadToCloudinary = (buffer) =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "auto", folder: "resumes" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result.secure_url);
                        }
                    );
                    streamifier.createReadStream(buffer).pipe(stream);
                });

            resumeFileURL = await uploadToCloudinary(req.file.buffer);
            resumeOriginalName = req.file.originalname;

            // Extract text from PDF
            text = await extractTextFromPDF(req.file.buffer);
        } else if (resumeText) {
            text = resumeText;
        } else {
            return res.status(400).json({ message: "No resume file or text provided" });
        }

        // AI parsing
        let parsedData = {};
        try {
            parsedData = await parseResumeText(text);
            // Ensure experience descriptions are strings
            if (parsedData.experience?.length) {
                parsedData.experience = parsedData.experience.map(exp => {
                    if (Array.isArray(exp.description)) {
                        exp.description = exp.description.join(". ");
                    } else if (typeof exp.description !== "string") {
                        exp.description = exp.description || "";
                    }
                    return exp;
                });
            }
            // Ensure projects are objects with title & description
            if (parsedData.projects?.length) {
                parsedData.projects = parsedData.projects.map(proj => {
                    if (typeof proj === "string") {
                        return {
                            title: proj.split(' ')[0] || 'Project',
                            description: proj,
                        };
                    } else {
                        if (Array.isArray(proj.description)) {
                            proj.description = proj.description.join(". ");
                        } else if (typeof proj.description !== "string") {
                            proj.description = proj.description || "";
                        }
                        return proj;
                    }
                });
            }
        } catch (err) {
            console.warn("AI parsing failed:", err.message);
        }

        // Save to DB
        const newResume = await Resume.create({
            user: userId,
            resumeText: text,
            resumeFile: resumeFileURL,
            resumeOriginalName,
            ...parsedData,
        });

        res.status(201).json({
            message: "Resume uploaded successfully",
            resume: newResume,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to upload resume", error: error.message
        });
    }
};

// get all resumes
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().populate("user", "fullname email");
        res.status(200).json({
            message: "Resumes fetched successfully", resumes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch resumes", error: error.message
        });
    }
};


// update status
export const updateResumeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const resume = await Resume.findByIdAndUpdate(id, { status }, { new: true });
        if (!resume) return res.status(404).json({
            message: "Resume not found"
        });

        res.status(200).json({
            message: "Resume status updated", success: true, resume
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update resume status", error: error.message
        });
    }
};
