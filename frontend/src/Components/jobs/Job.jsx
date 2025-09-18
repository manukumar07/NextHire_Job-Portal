import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { getRandomColor } from "../../utils/helpers";
import { formatDate } from "../../utils/date";
import { FaMapMarkerAlt } from "react-icons/fa";

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 rounded-md shadow-lg border border-gray-200"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      {/* Top bar: Formatted Date + Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          {formatDate(job?.createdAt)}
        </p>
        <button className="rounded-full p-2 border border-gray-300 hover:bg-gray-100">
          <FaBookmark style={{ color: "#1E3A8A" }} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        {job?.company?.logo ? (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold border border-gray-200"
            style={{ backgroundColor: getRandomColor(job?.company?.name) }}
          >
            {job?.company?.name?.charAt(0).toUpperCase() || "C"}
          </div>
        )}
        <div>
          <h1 className="font-medium text-lg" style={{ color: "#111827" }}>
            {job?.company?.name}
          </h1>

          <p
            className="text-sm text-gray-600 text-md flex items-center gap-1"
            style={{ color: "#9CA3AF" }}
          >
            <FaMapMarkerAlt className="text-gray-600" />{" "}
            {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg my-2" style={{ color: "#111827" }}>
          {job?.title}
        </h1>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="flex items-center gap-2 mt-4">
        <span
          className="px-2 py-1 rounded-md"
          style={{ backgroundColor: "#E0E7FF", color: "#1E3A8A" }}
        >
          {job?.position} Positions
        </span>
        <span
          className="px-2 py-1 rounded-md"
          style={{ backgroundColor: "#FEF3C7", color: "#F59E0B" }}
        >
          {job?.jobType}
        </span>
        <span
          className="px-2 py-1 rounded-md"
          style={{ backgroundColor: "#DDD6FE", color: "#7209b7" }}
        >
          {job?.salary} LPA
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
          style={{ color: "#1E3A8A", borderColor: "#9CA3AF" }}
        >
          Details
        </button>
        <button
          className="px-4 py-2 rounded-md hover:bg-purple-700"
          style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }}
        >
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
