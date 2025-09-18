import { useState } from "react";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import setSingleCompany from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error("Failed to register company. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col transition-all duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg animate-slideUp mt-24">
        <h1 className="font-bold text-3xl text-[#1E3A8A] animate-fadeIn">
          Your Company Name
        </h1>
        <p className="text-[#9CA3AF] my-4 text-sm md:text-base animate-fadeIn">
          What would you like to give your company name? You can change this
          later.
        </p>

        <label className="text-[#1E3A8A] font-medium">Company Name</label>
        <input
          type="text"
          className="my-3 border border-[#9CA3AF] rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all duration-300 text-[#111827]"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
          <button
            onClick={() => navigate("/admin/companies")}
            className="w-full md:w-auto text-[#9CA3AF] border border-[#9CA3AF] py-2 px-6 rounded-xl hover:bg-[#F9FAFB] hover:text-[#111827] transition-all duration-300"
          >
            Cancel
          </button>

          <button
            onClick={registerNewCompany}
            className="w-full md:w-auto bg-[#1E3A8A] text-white py-2 px-6 rounded-xl font-bold hover:bg-[#162e6e] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
