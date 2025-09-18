import { useState } from "react";
import Navbar from "../layout/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please select a company before posting a job");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Job posted successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col transition-all duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg animate-slideUp mt-24">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-6">
          Post a New Job
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Title",
                name: "title",
                type: "text",
                placeholder: "Frontend Developer, Backend Engineer...",
              },
              {
                label: "Description",
                name: "description",
                type: "text",
                placeholder: "Brief description of the job role",
              },
              {
                label: "Requirements",
                name: "requirements",
                type: "text",
                placeholder: "Required skills, technologies, qualifications",
              },
              {
                label: "Salary",
                name: "salary",
                type: "text",
                placeholder: "e.g., 50,000 - 80,000 USD",
              },
              {
                label: "Location",
                name: "location",
                type: "text",
                placeholder: "City, State or Remote",
              },
              {
                label: "Job Type",
                name: "jobType",
                type: "text",
                placeholder: "Full-time, Part-time, Internship",
              },
              {
                label: "Experience Level",
                name: "experience",
                type: "text",
                placeholder: "Junior, Mid-level, Senior",
              },
              {
                label: "No of Position",
                name: "position",
                type: "number",
                placeholder: "Number of open positions",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-[#1E3A8A] font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={input[field.name]}
                  placeholder={field.placeholder}
                  onChange={changeEventHandler}
                  className="mt-1 w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all duration-300"
                  required
                />
              </div>
            ))}

            {/* Company Select */}
            <div className="col-span-2">
              <label className="text-[#1E3A8A] font-medium">Company</label>
              <select
                className="mt-1 w-full border border-[#D1D5DB] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all duration-300"
                onChange={selectChangeHandler}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a Company
                </option>
                {companies.map((company) => (
                  <option key={company._id} value={company.name.toLowerCase()}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex items-center justify-center py-2 rounded-lg text-white font-bold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] hover:scale-105 transform"
            }`}
            disabled={loading}
          >
            {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {loading ? "Posting..." : "Post New Job"}
          </button>

          {companies.length === 0 && (
            <p className="text-red-600 font-semibold text-center mt-4">
              *Please register a company before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
