import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto p-4 bg-white rounded-2xl shadow-lg animate-slideUp">
      <table className="min-w-full border-collapse">
        <caption className="text-lg font-bold py-3 text-[#1E3A8A] text-left">
          A list of your applied jobs
        </caption>
        <thead className="bg-[#1E3A8A] text-white">
          <tr>
            <th className="px-4 py-2 text-left border border-[#3B82F6]">
              Date
            </th>
            <th className="px-4 py-2 text-left border border-[#3B82F6]">
              Job Role
            </th>
            <th className="px-4 py-2 text-left border border-[#3B82F6]">
              Company
            </th>
            <th className="px-4 py-2 text-right border border-[#3B82F6]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-[#F59E0B] font-semibold"
              >
                You have not applied for any jobs yet.
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr
                key={appliedJob._id}
                className="bg-white hover:bg-gradient-to-r hover:from-[#E0E7FF]/50 hover:to-white transition-all duration-300 rounded-lg"
              >
                <td className="px-4 py-2 border border-[#D1D5DB]">
                  {appliedJob?.createdAt?.split("T")[0]}
                </td>
                <td className="px-4 py-2 border border-[#D1D5DB]">
                  {appliedJob.job?.title}
                </td>
                <td className="px-4 py-2 border border-[#D1D5DB]">
                  {appliedJob.job?.company?.name}
                </td>
                <td className="px-4 py-2 border border-[#D1D5DB] text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-semibold transition-colors duration-300 ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob.status?.toUpperCase()}
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
