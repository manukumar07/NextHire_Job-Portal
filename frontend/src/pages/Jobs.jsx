import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import FilterCard from "../Components/jobs/FilterCard";
import Job from "../Components/jobs/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaBriefcase, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Jobs = () => {
  const { allJobs, searchedQuery, selectedFilters } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Latest");
  const jobsPerPage = 4;

  useEffect(() => {
    const now = new Date();

    const filtered = allJobs.filter((job) => {
      const jobTitle = (job.title || "").toString().toLowerCase();
      const jobCompany = (job.company || "").toString().toLowerCase();
      const jobDescription = (job.description || "").toString().toLowerCase();
      const jobLocation = (job.location || "").toString().toLowerCase();
      const jobType = (job.jobType || "").toString();
      const jobExp = (job.experienceLevel || "").toString();

      const searchLower = search.toLowerCase();
      const queryLower = searchedQuery.toLowerCase();

      // Search filter
      const matchesSearch =
        jobTitle.includes(searchLower) || jobCompany.includes(searchLower);

      // Searched query filter
      const matchesSearchedQuery =
        searchedQuery === "" ||
        jobTitle.includes(queryLower) ||
        jobDescription.includes(queryLower) ||
        jobLocation.includes(queryLower);

      // Job Type filter
      const jobTypeFilter = selectedFilters?.["Job Type"] || [];
      const matchesJobType =
        jobTypeFilter.length === 0 || jobTypeFilter.includes(jobType);

      // Experience Level filter
      const expFilter = selectedFilters?.["Experience Level"] || [];
      const matchesExperience =
        expFilter.length === 0 || expFilter.includes(jobExp);

      return (
        matchesSearch &&
        matchesSearchedQuery &&
        matchesJobType &&
        matchesExperience
      );
    });

    // Filter by date
    const filteredByDate = filtered.filter((job) => {
      const jobDate = new Date(job.createdAt);
      if (sortOption === "Last Day") {
        return jobDate >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (sortOption === "Last Week") {
        return jobDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (sortOption === "Last Month") {
        return (
          jobDate >=
          new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        );
      } else if (sortOption === "Last Year") {
        return (
          jobDate >=
          new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        );
      }
      return true; // Latest
    });

    // Sort Latest first
    if (sortOption === "Latest") {
      filteredByDate.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilterJobs(filteredByDate);
    setCurrentPage(1); // Reset page
  }, [allJobs, searchedQuery, search, selectedFilters, sortOption]);

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen transition-all duration-300 bg-[#F9FAFB]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
        {/* Top Title & Description */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4"
          >
            Find Your Dream Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Explore thousands of job opportunities from top companies and
            startups. Use filters to narrow down your search and find the best
            fit for you.
          </motion.p>
        </div>

        {/* Filters & Jobs */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Filters */}
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            <FilterCard />
          </div>

          {/* Right: Search + Sort + Jobs */}
          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search by title or company..."
                className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
              >
                <option value="Latest">Newest First</option>
                <option value="Last Day">Last Day</option>
                <option value="Last Week">Last Week</option>
                <option value="Last Month">Last Month</option>
                <option value="Last Year">Last Year</option>
              </select>
            </div>

            {/* Jobs List */}
            {currentJobs.length <= 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                <FaBriefcase className="w-12 h-12 text-[#F59E0B] mb-4 animate-bounce" />
                <p className="text-[#F59E0B] font-semibold text-lg mb-2">
                  No job found
                </p>
                <p className="text-gray-500 text-sm max-w-xs">
                  Try adjusting your search or filters. Check back later for new
                  opportunities!
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-6 gap-4">
                    {/* Prev Button */}
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#1E3A8A] border-gray-300 hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]"
                      }`}
                    >
                      <FaArrowLeft /> Prev
                    </button>

                    <span className="text-gray-600 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#1E3A8A] border-gray-300 hover:bg-[#F59E0B] hover:text-white hover:border-[#F59E0B]"
                      }`}
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
