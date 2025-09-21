
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String },
        email: { type: String },
        phoneNumber: { type: Number },
        location: { type: String },
        skills: [{ type: String }],
        experience: [{ company: String, role: String, duration: Number }],
        education: [{ degree: String, institution: String, year: Number }],
        resumeText: { type: String },
        resumeFile: { type: String },
        resumeOriginalName: { type: String },
        status: {
            type: String,
            enum: ["uploaded", "reviewed", "shortlisted", "rejected"],
            default: "uploaded",
        },
    },
    { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
