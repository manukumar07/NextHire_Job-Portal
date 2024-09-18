import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

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
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to update UI in real time
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-text">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-primary font-bold bg-blue-100 px-2 py-1 rounded">
              <FaBriefcase className="inline mr-1" /> {singleJob?.position}{" "}
              Positions
            </span>
            <span className="text-accent font-bold bg-red-100 px-2 py-1 rounded">
              <FaCalendarAlt className="inline mr-1" /> {singleJob?.jobType}
            </span>
            <span className="text-accent font-bold bg-purple-100 px-2 py-1 rounded">
              <FaMoneyBillWave className="inline mr-1" /> {singleJob?.salary}{" "}
              LPA
            </span>
          </div>
        </div>
        <button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 md:mt-0 rounded-lg ${
            isApplied
              ? "bg-secondary cursor-not-allowed"
              : "bg-primary hover:bg-[#16397a] text-white"
          } py-2 px-4`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-text">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 text-text">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            <FaMapMarkerAlt className="inline mr-1" />
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length || 0}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-text">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
