import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { getRandomColor } from "../../utils/helpers";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 cursor-pointer 
                 transition-all duration-300 flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
    >
      {/* Top: Company Logo + Name */}
      <div className="flex items-center gap-4 mb-4">
        {job?.company?.logo ? (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 rounded-full object-cover" // Circle logo
          />
        ) : (
          <div
            style={{ backgroundColor: getRandomColor(job?.company?.name) }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
          >
            {job?.company?.name?.charAt(0).toUpperCase() || "C"}
          </div>
        )}
        <div>
          <h2 className="font-semibold text-lg text-[#1E3A8A]">
            {job?.company?.name}
          </h2>
          <p className="text-gray-600 text-md flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-600" />{" "}
            {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-[#111827]">{job?.title}</h1>
        <p className="text-gray-600 text-sm line-clamp-3 mt-1">
          {job?.description}
        </p>
      </div>

      {/* Job Info Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.position && (
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded-md">
            {job.position} {job.position > 1 ? "Positions" : "Position"}
          </span>
        )}
        {job?.jobType && (
          <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded-md">
            {job.jobType}
          </span>
        )}
        {/* {job?.experienceLevel && (
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
            <FaClock className="w-3 h-3" /> {job.experienceLevel}
          </span>
        )} */}
        {job?.salary && (
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-md">
            💰 {job.salary}
          </span>
        )}
      </div>

      {/* View Details Button */}
      <button
        onClick={() => navigate(`/description/${job._id}`)}
        className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white 
                   font-medium hover:bg-[#2546b0] transition-all duration-200"
      >
        View Details <FaArrowRight />
      </button>
    </motion.div>
  );
};

export default LatestJobCards;
