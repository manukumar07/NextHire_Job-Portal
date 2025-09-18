import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "../../redux/jobSlice";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

// ✅ Import Navbar & Footer
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto my-12 px-6 py-8 shadow-xl rounded-2xl mt-24 "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl text-[#1E3A8A]">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-[#1E3A8A] font-bold bg-blue-100 px-3 py-1 rounded-full">
                <FaBriefcase className="inline mr-1" /> {singleJob?.position}{" "}
                Positions
              </span>
              <span className="text-[#F59E0B] font-bold bg-yellow-100 px-3 py-1 rounded-full">
                <FaCalendarAlt className="inline mr-1" /> {singleJob?.jobType}
              </span>
              <span className="text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full">
                <FaMoneyBillWave className="inline mr-1" /> {singleJob?.salary}{" "}
                LPA
              </span>
            </div>
          </div>
          <motion.button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`mt-6 md:mt-0 rounded-lg px-6 py-3 font-semibold shadow-md transition-all ${
              isApplied
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-[#1E3A8A] text-white hover:bg-[#16397a] hover:shadow-lg"
            }`}
            whileHover={!isApplied ? { scale: 1.05 } : {}}
            whileTap={!isApplied ? { scale: 0.95 } : {}}
          >
            {isApplied ? "✅ Already Applied" : "Apply Now"}
          </motion.button>
        </div>

        {/* Description */}
        <h1 className="border-b-2 border-gray-200 font-semibold py-4 mt-6 text-lg text-[#111827]">
          Job Details
        </h1>
        <div className="my-4 space-y-3 text-gray-700">
          <p>
            <span className="font-bold">📌 Role:</span> {singleJob?.title}
          </p>
          <p>
            <span className="font-bold">📍 Location:</span>{" "}
            <FaMapMarkerAlt className="inline mr-1" /> {singleJob?.location}
          </p>
          <p>
            <span className="font-bold">📝 Description:</span>{" "}
            {singleJob?.description}
          </p>
          <p>
            <span className="font-bold">💼 Experience:</span>{" "}
            {singleJob?.experience} yrs
          </p>
          <p>
            <span className="font-bold">💰 Salary:</span> {singleJob?.salary}{" "}
            LPA
          </p>
          <p>
            <span className="font-bold">👥 Total Applicants:</span>{" "}
            {singleJob?.applications?.length || 0}
          </p>
          <p>
            <span className="font-bold">📅 Posted Date:</span>{" "}
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
          </p>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default JobDescription;
