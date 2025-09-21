import React from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="text-[#111827] font-sans">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#1E3A8A]">
          <span className="text-[#F59E0B]">Latest & Top</span> Job Openings
        </h1>
        <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto text-lg">
          Discover the newest opportunities across industries and locations.{" "}
          {""}
          <span className="font-semibold text-[#1E3A8A]">
            Apply to your dream role today!
          </span>
        </p>
      </motion.section>

      {/* Jobs Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {allJobs?.length <= 0 ? (
          <motion.div
            className="text-[#F59E0B] text-center col-span-full text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🚀 No Jobs Available Right Now
          </motion.div>
        ) : (
          <>
            {allJobs.slice(0, 6).map((job, index) => (
              <motion.div
                key={job._id}
                className="rounded-2xl shadow-md bg-white border border-gray-100 cursor-pointer
                           transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))}

            {/* See All Jobs Button */}
            {allJobs.length > 6 && (
              <div className="col-span-full flex justify-center mt-8 w-full">
                <button
                  onClick={() => navigate("/jobs")}
                  className="px-6 py-3 rounded-full bg-[#1E3A8A] text-white font-medium shadow-md 
                 flex items-center gap-2 hover:bg-[#2546b0] hover:scale-105 transition-all duration-300"
                >
                  See All Jobs <FaArrowRight />
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
