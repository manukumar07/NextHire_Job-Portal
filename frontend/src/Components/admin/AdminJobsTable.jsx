import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2, Eye } from "lucide-react";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const handleEdit = (jobId) => {
    toast.success("Redirecting to edit job!");
    navigate(`/admin/companies/${jobId}`);
  };

  const handleViewApplicants = (jobId) => {
    toast("Opening applicants list");
    navigate(`/admin/jobs/${jobId}/applicants`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <caption className="text-lg py-4 font-semibold text-[#1E3A8A]">
          Your Recent Job Posts
        </caption>
        <thead className="bg-gray-100 text-left sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <tr
                key={job._id}
                className="border-b hover:bg-[#F9FAFB] transition-colors duration-200"
              >
                <td className="px-4 py-3 font-medium">
                  {job?.company?.name || "N/A"}
                </td>
                <td className="px-4 py-3">{job?.title || "N/A"}</td>
                <td className="px-4 py-3">
                  {/* {job?.createdAt?.split("T")[0] || "N/A"}
                   */}
                  {job.createdAt ? job.createdAt.split("T")[0] : "NA"}
                </td>
                <td className="px-4 py-3 text-right relative">
                  {/* Dropdown */}
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === job._id ? null : job._id)
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                  >
                    <MoreHorizontal className="text-gray-500 w-5 h-5" />
                  </button>

                  {openDropdown === job._id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slideUp">
                      <div
                        onClick={() => handleEdit(job._id)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F9FAFB] cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-[#1E3A8A]" />
                        <span className="text-sm text-[#1E3A8A]">Edit</span>
                      </div>
                      <div
                        onClick={() => handleViewApplicants(job._id)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F9FAFB] cursor-pointer transition"
                      >
                        <Eye className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-sm text-[#F59E0B]">
                          Applicants
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
