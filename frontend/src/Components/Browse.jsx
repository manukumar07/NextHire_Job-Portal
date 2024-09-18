import { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs(); // Custom hook to get all jobs
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10 text-[#1E3A8A]">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length > 0 ? (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="col-span-3 text-center text-[#F59E0B]">
              No job listings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
