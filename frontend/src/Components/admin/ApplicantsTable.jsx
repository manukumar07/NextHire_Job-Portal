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
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] p-4">
      {" "}
      {/* Background and Text Colors */}
      <table className="w-full border-collapse border border-[#9CA3AF]">
        {" "}
        {/* Border Color */}
        <caption className="text-[#9CA3AF] mb-2">
          {" "}
          {/* Secondary Color */}A list of your recent applied users
        </caption>
        <thead>
          <tr>
            <th className="border border-[#9CA3AF] p-2">Full Name</th>{" "}
            {/* Border Color */}
            <th className="border border-[#9CA3AF] p-2">Email</th>{" "}
            {/* Border Color */}
            <th className="border border-[#9CA3AF] p-2">Contact</th>{" "}
            {/* Border Color */}
            <th className="border border-[#9CA3AF] p-2">Resume</th>{" "}
            {/* Border Color */}
            <th className="border border-[#9CA3AF] p-2">Date</th>{" "}
            {/* Border Color */}
            <th className="border border-[#9CA3AF] p-2 text-right">
              Action
            </th>{" "}
            {/* Border Color */}
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.map((item) => (
            <tr key={item._id} className="hover:bg-[#F1F5F9]">
              {" "}
              {/* Hover Background Color */}
              <td className="border border-[#9CA3AF] p-2">
                {item?.applicant?.fullname}
              </td>
              <td className="border border-[#9CA3AF] p-2">
                {item?.applicant?.email}
              </td>
              <td className="border border-[#9CA3AF] p-2">
                {item?.applicant?.phoneNumber}
              </td>
              <td className="border border-[#9CA3AF] p-2">
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-[#1E3A8A] underline" // Primary Color
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  "NA"
                )}
              </td>
              <td className="border border-[#9CA3AF] p-2">
                {item?.applicant.createdAt.split("T")[0]}
              </td>
              <td className="border border-[#9CA3AF] p-2 text-right">
                <select
                  className="p-1 border border-[#9CA3AF] bg-white text-[#111827]" // Border Color and Text Color
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
