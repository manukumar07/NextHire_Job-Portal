import { useEffect } from "react";
import Navbar from "../layout/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { toast } from "sonner";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/application/${params.id}/applicants`,
          { withCredentials: true }
        );

        // Adjust payload depending on your API shape
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applicants. Please try again!");
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen transition-all duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-20">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1E3A8A] animate-fadeIn">
          Applicants ({applicants?.applications?.length || 0})
        </h1>

        {/* Applicants Table Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 transition-transform transform hover:scale-[1.01] animate-slideUp">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
