import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="p-5 rounded-md shadow-lg bg-white border border-gray-200"
      style={{ backgroundColor: "#F9FAFB" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <button className="rounded-full p-2 border border-gray-300 hover:bg-gray-100">
          <FaBookmark style={{ color: "#1E3A8A" }} />
        </button>
      </div>

      <div className="flex items-center gap-2 my-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
          <img
            src={job?.company?.logo}
            alt="Company Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="font-medium text-lg" style={{ color: "#111827" }}>
            {job?.company?.name}
          </h1>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            India
          </p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2" style={{ color: "#111827" }}>
          {job?.title}
        </h1>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span
          className="px-2 py-1"
          style={{ backgroundColor: "#E0E7FF", color: "#1E3A8A" }}
        >
          {job?.position} Positions
        </span>
        <span
          className="px-2 py-1"
          style={{ backgroundColor: "#FEF3C7", color: "#F59E0B" }}
        >
          {job?.jobType}
        </span>
        <span
          className="px-2 py-1"
          style={{ backgroundColor: "#DDD6FE", color: "#7209b7" }}
        >
          {job?.salary} LPA
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md"
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
