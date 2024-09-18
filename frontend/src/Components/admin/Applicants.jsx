import { useEffect } from "react";

import Navbar from "../Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
// import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import setAllApplicants from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${"http://localhost:8000/api/v1/application"}/${
            params.id
          }/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-xl my-5 text-primary">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
