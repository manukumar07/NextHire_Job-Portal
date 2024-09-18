// import React from "react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto p-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <caption className="text-lg font-semibold py-2 text-[#1E3A8A]">
          A list of your applied jobs
        </caption>
        <thead className="bg-[#1E3A8A] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Job Role
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Company
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-[#F59E0B]">
                You have not applied for any jobs yet.
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {appliedJob?.createdAt?.split("T")[0]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appliedJob.job?.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appliedJob.job?.company?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
