import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-20">
        {/* Header: Search + New Job */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="🔍 Filter by name, role"
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                       text-gray-900 bg-white shadow-sm transition"
          />
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto px-5 py-2 rounded-lg font-medium text-white
                       bg-gradient-to-r from-blue-600 to-yellow-400
                       shadow hover:shadow-lg transform hover:scale-105
                       transition duration-300 ease-in-out"
          >
            ➕ New Job
          </button>
        </div>

        {/* Jobs Table Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 transition-all">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-blue-700 border-b pb-2">
            📋 Job Listings
          </h2>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
