import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`✅ Status updated: ${status}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "⚠️ Failed to update status"
      );
    }
  };

  return (
    <div className="bg-[#F9FAFB] p-4 rounded-2xl shadow-md transition-all duration-300">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <caption className="text-[#6B7280] mb-4 font-medium text-left">
          📋 Recent Applicants
        </caption>
        <thead className="bg-[#E5E7EB]">
          <tr>
            <th className="px-4 py-2 text-left border-b border-[#D1D5DB]">
              Full Name
            </th>
            <th className="px-4 py-2 text-left border-b border-[#D1D5DB]">
              Email
            </th>
            <th className="px-4 py-2 text-left border-b border-[#D1D5DB]">
              Contact
            </th>
            <th className="px-4 py-2 text-left border-b border-[#D1D5DB]">
              Resume
            </th>
            <th className="px-4 py-2 text-left border-b border-[#D1D5DB]">
              Date
            </th>
            <th className="px-4 py-2 text-right border-b border-[#D1D5DB]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-[#F1F5F9] transition-colors duration-200"
              >
                <td className="px-4 py-2 border-b border-[#E5E7EB]">
                  {item?.applicant?.fullname || "NA"}
                </td>
                <td className="px-4 py-2 border-b border-[#E5E7EB]">
                  {item?.applicant?.email || "NA"}
                </td>
                <td className="px-4 py-2 border-b border-[#E5E7EB]">
                  {item?.applicant?.phoneNumber || "NA"}
                </td>
                <td className="px-4 py-2 border-b border-[#E5E7EB]">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E3A8A] underline hover:text-[#162e6e] transition-colors"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "NA"
                  )}
                </td>
                <td className="px-4 py-2 border-b border-[#E5E7EB]">
                  {item?.applicant?.createdAt
                    ? item.applicant.createdAt.split("T")[0]
                    : "NA"}
                </td>
                <td className="px-4 py-2 border-b border-[#E5E7EB] text-right">
                  <select
                    className="p-2 border border-[#9CA3AF] rounded-lg bg-white text-[#111827] hover:border-[#1E3A8A] transition-all duration-200"
                    onChange={(e) => statusHandler(e.target.value, item._id)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    {shortlistingStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No applicants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
