import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2, Eye } from "lucide-react"; // Used Lucide icons

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <table className="min-w-full table-auto">
        <caption className="text-lg py-4">
          A list of your recent posted jobs
        </caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.map((job) => (
            <tr key={job._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{job?.company?.name}</td>
              <td className="px-4 py-2">{job?.title}</td>
              <td className="px-4 py-2">
                {job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}
              </td>
              <td className="px-4 py-2 text-right">
                <div>
                  <div>
                    <MoreHorizontal className="cursor-pointer text-gray-500" />
                  </div>
                  <div className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:text-amber-500"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 cursor-pointer hover:text-amber-500 mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
