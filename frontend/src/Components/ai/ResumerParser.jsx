import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Brain,
  Briefcase,
  GraduationCap,
  Loader2,
  CheckCircle,
  Code,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RESUME_API_END_POINT } from "../../utils/constant";

const ResumeParser = () => {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // File Upload Handler
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(uploadedFile.type)
    ) {
      alert("Only PDF, DOC, DOCX files are allowed.");
      return;
    }

    setFile(uploadedFile);
    setFile(uploadedFile);

    // ✅ Set selected file for UI display
    setSelectedFile(uploadedFile);
  };

  const parseResume = async () => {
    if (!resumeText.trim() && !file) {
      alert("Please upload a resume file or paste resume text first.");
      return;
    }

    if (!user?._id) {
      alert("User not logged in");
      return;
    }

    try {
      setIsAnalyzing(true);

      const formData = new FormData();
      if (file) formData.append("file", file);
      if (resumeText) formData.append("resumeText", resumeText);
      formData.append("userId", user._id);

      const { data } = await axios.post(
        `${RESUME_API_END_POINT}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAnalysisResult(data.resume);
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert(
        error.response?.data?.message ||
          "Failed to parse resume. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#111827] mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Let our AI parse your resume and extract skills, experience, and
            education to find the perfect job matches
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="flex items-center text-lg font-semibold text-[#111827] mb-4">
                <Upload className="w-5 h-5 mr-2 text-[#2563EB]" />
                Upload Resume
              </h2>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-[#D1D5DB] rounded-lg p-8 text-center mb-6">
                <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                <p className="text-[#6B7280] mb-4">
                  Drag and drop your resume file here, or click to browse
                </p>
                <label className="px-4 py-2 border rounded-lg text-[#374151] hover:bg-[#F3F4F6] cursor-pointer">
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-xs text-[#9CA3AF] mt-2">
                  Supports: PDF, DOC, DOCX
                </p>
                {selectedFile && (
                  <div className="flex items-center justify-center space-x-2 text-green-600 mt-4">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedFile.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center text-[#9CA3AF] mb-4">or</div>

              {/* Textarea Input */}
              <label className="block text-sm font-medium text-[#374151] mb-2">
                Paste Resume Text
              </label>
              <textarea
                placeholder="Paste your resume content here..."
                className="w-full border rounded-lg p-3 min-h-[200px] focus:ring-2 focus:ring-[#2563EB] outline-none"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />

              <button
                onClick={parseResume}
                disabled={isAnalyzing}
                className="w-full mt-4 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1E40AF] flex justify-center items-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Parse Resume
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-y-auto max-h-[80vh] pr-2"
          >
            {analysisResult ? (
              <div className="space-y-6">
                {/* Resume Score */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-green-800">
                      Resume Parsed Successfully
                    </h3>
                    <p className="text-green-600/80">
                      {analysisResult.resumeOriginalName || "Uploaded File"} •{" "}
                    </p>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="flex items-center text-lg font-semibold text-[#111827] mb-4">
                    <User className="w-5 h-5 text-[#2563EB] mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#6B7280]">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold">
                        {analysisResult.name}
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center space-x-1 text-sm font-medium text-[#6B7280]">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                      <p className="text-lg">{analysisResult.email}</p>
                    </div>
                    <div>
                      <label className="flex items-center space-x-1 text-sm font-medium text-[#6B7280]">
                        <Phone className="w-4 h-4" />
                        <span>Phone</span>
                      </label>
                      <p className="text-lg">{analysisResult.phone}</p>
                    </div>
                    <div>
                      <label className="flex items-center space-x-1 text-sm font-medium text-[#6B7280]">
                        <MapPin className="w-4 h-4" />
                        <span>Location</span>
                      </label>
                      <p className="text-lg">{analysisResult.location}</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="flex items-center text-lg font-semibold text-[#111827] mb-4">
                    <Code className="w-5 h-5 text-[#2563EB] mr-2" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#EFF6FF] text-[#1D4ED8] px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="flex items-center text-lg font-semibold text-[#111827] mb-4">
                    <Briefcase className="w-5 h-5 text-[#2563EB] mr-2" />
                    Experience
                  </h3>
                  {analysisResult.experience?.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold text-[#111827]">
                        {exp.role}
                      </h4>
                      <p className="text-[#2563EB] font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-[#6B7280]">{exp.duration}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="flex items-center text-lg font-semibold text-[#111827] mb-4">
                    <GraduationCap className="w-5 h-5 text-[#2563EB] mr-2" />
                    Education
                  </h3>
                  {analysisResult.education?.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <h4 className="font-semibold text-[#111827]">
                        {edu.degree}
                      </h4>
                      <p className="text-[#2563EB] font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-[#6B7280]">{edu.year}</p>
                    </div>
                  ))}
                </div>

                {/* Find Job Matches Button */}
                <div className="text-center">
                  <a
                    href="/browse"
                    className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    <span>Find Job Matches</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              // Empty state card
              <div className="bg-white rounded-xl shadow h-full flex items-center justify-center">
                <div className="text-center py-12 px-6">
                  <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Parse Your Resume
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Upload your resume to see detailed information extraction
                    including personal details, skills, work experience, and
                    education.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeParser;
