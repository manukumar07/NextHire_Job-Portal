import { useEffect, useState } from "react";
import Job from "../Components/jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { FaBriefcase, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../Components/layout/Navbar";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    dispatch(setSearchedQuery(search));
  }, [search, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      jobTypeFilter === "all" || job.jobType === jobTypeFilter;
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen transition-all duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 mt-24">
        {/* Top Title, Description & CTA Button */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
            Explore Job Opportunities
          </h1>
          <p className="text-[#111827] text-lg md:text-xl mb-6">
            Browse the latest job listings from top companies and find the
            perfect role that matches your skills and ambitions.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by job title or company"
            className="w-full md:w-1/3 p-3 border rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]
                       transition-all duration-300 text-[#111827] bg-white"
          />
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="w-full md:w-40 p-3 border rounded-xl shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]
                       text-[#111827] bg-white"
          >
            <option value="all">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Job Count */}
        <p className="text-[#1E3A8A] font-semibold mb-6">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 && "s"}
        </p>

        {/* Jobs Grid */}
        {currentJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
            <FaBriefcase className="w-12 h-12 text-[#F59E0B] mb-4 animate-bounce" />
            <p className="text-[#F59E0B] font-semibold text-lg mb-2">
              No job listings found
            </p>
            <p className="text-gray-500 text-sm max-w-xs">
              Try adjusting your search or filters. Check back later for new
              opportunities!
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-4">
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
    </div>
  );
};

export default Browse;
