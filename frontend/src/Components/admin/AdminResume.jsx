import React, { useState, useEffect, useMemo } from "react";
import { Search, Calendar, Mail, Download, Eye, X } from "lucide-react";
import axios from "axios";
import { RESUME_API_END_POINT } from "../../utils/constant";

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [viewResume, setViewResume] = useState(null);

  // Fetch resumes from backend
  // Fetch resumes from backend
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get(`${RESUME_API_END_POINT}`);
        setResumes(data.resumes || []);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // Handle status update
  const handleStatusChange = async (resumeId, newStatus) => {
    try {
      await axios.patch(`${RESUME_API_END_POINT}/${resumeId}/status`, {
        status: newStatus,
      });
      setResumes((prev) =>
        prev.map((r) => (r._id === resumeId ? { ...r, status: newStatus } : r))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // Filter resumes by search and status
  const filteredResumes = useMemo(() => {
    return resumes.filter((resume) => {
      const matchesSearch =
        resume.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.skills?.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ? true : resume.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [resumes, searchTerm, statusFilter]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-200 text-green-800";
      case "reviewed":
        return "bg-yellow-200 text-yellow-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-blue-200 text-blue-800";
    }
  };

  // Download resume file
  const handleDownload = (resume) => {
    if (resume.resumeFile) {
      const link = document.createElement("a");
      link.href = resume.resumeFile;
      link.download = resume.resumeOriginalName || "resume.pdf";
      link.click();
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 font-sans">
      <div className="max-w-8xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2 animate-slideUp text-[#1E3A8A]">
            Resume Management
          </h1>
          <p className="text-[#9CA3AF]">
            Manage and review all uploaded resumes with enhanced filtering
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-[#9CA3AF] rounded w-full h-10 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#9CA3AF] rounded px-3 py-2 h-10 w-full md:w-52 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
          >
            <option value="all">All Status</option>
            <option value="uploaded">Uploaded</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto animate-slideUp">
          <table className="min-w-full divide-y divide-[#9CA3AF]">
            <thead className="bg-[#F9FAFB]">
              <tr>
                {[
                  "Candidate",
                  "Contact",
                  "Skills & Experience",
                  "Status",
                  "Upload Date",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-sm font-medium text-[#111827]"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-[#9CA3AF]">
              {filteredResumes.length > 0 ? (
                filteredResumes.map((resume) => (
                  <tr
                    key={resume._id || resume.id}
                    className="hover:bg-[#F9FAFB]/50 transition"
                  >
                    {/* Candidate */}
                    <td className="px-6 py-4 font-sans text-[#111827]">
                      <div className="text-sm font-medium">{resume.name}</div>
                      <div className="text-sm text-[#9CA3AF]">
                        {resume.resumeOriginalName || resume.fileName}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 text-sm text-[#9CA3AF]">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{resume.email}</span>
                      </div>
                      <div>{resume.phoneNumber || resume.phone}</div>
                    </td>

                    {/* Skills */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {resume.skills?.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded text-xs bg-[#1E3A8A]/20 text-[#1E3A8A] font-sans animate-pulseGlow"
                          >
                            {skill}
                          </span>
                        ))}
                        {resume.skills?.length > 3 && (
                          <span className="px-2 py-1 border rounded text-xs text-[#9CA3AF]">
                            +{resume.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <select
                        value={resume.status}
                        onChange={(e) =>
                          handleStatusChange(resume._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded text-xs font-sans ${getStatusColor(
                          resume.status
                        )}`}
                      >
                        <option value="uploaded">Uploaded</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* Upload Date */}
                    <td className="px-6 py-4 flex items-center space-x-2 text-[#9CA3AF] text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(resume.createdAt || resume.uploadDate)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="flex items-center px-3 py-1 bg-[#1E3A8A]/20 text-[#1E3A8A] rounded text-sm font-sans hover:bg-[#1E3A8A]/40 transition animate-slideUp"
                          onClick={() => setViewResume(resume)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button
                          className="flex items-center px-3 py-1 border border-[#9CA3AF] text-[#9CA3AF] rounded text-sm font-sans hover:bg-[#F9FAFB]/20 transition animate-slideUp"
                          onClick={() => handleDownload(resume)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-[#9CA3AF]">
                    <Search className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                    <div className="text-lg font-semibold mb-2 font-heading animate-slideUp">
                      No resumes found
                    </div>
                    <div>Try adjusting your search criteria</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing resume text */}
        {viewResume && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={() => setViewResume(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {viewResume.name}'s Resume
              </h2>
              <div className="overflow-y-auto max-h-96 border p-4 bg-gray-50 rounded">
                <pre className="whitespace-pre-wrap">
                  {viewResume.resumeText || "No text available"}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResumes;
