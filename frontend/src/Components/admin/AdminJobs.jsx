import { useEffect, useState } from "react";
import Navbar from "../Navbar";
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
  }, [input]);

  return (
    <div style={{ backgroundColor: "#F9FAFB", color: "#111827" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-5">
          <input
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full md:w-auto px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
