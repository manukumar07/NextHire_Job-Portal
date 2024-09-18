import { useState } from "react";
import Navbar from "../Navbar";
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
          headers: {
            "Content-Type": "application/json",
          },
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
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
      {" "}
      {/* Background Color */}
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="font-bold text-2xl text-[#1E3A8A]">Your Company Name</h1>{" "}
        {/* Primary Color */}
        <p className="text-[#9CA3AF] my-2">
          What would you like to give your company name? You can change this
          later.
        </p>
        <label className="text-[#1E3A8A]">Company Name</label>{" "}
        {/* Primary Color */}
        <input
          type="text"
          className="my-2 border border-[#9CA3AF] rounded-md p-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
          style={{ borderColor: "#9CA3AF", color: "#111827" }} // Light Gray Border and Charcoal Black Text
        />
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => navigate("/admin/companies")}
            className="text-[#9CA3AF] border border-[#9CA3AF] py-2 px-4 rounded-md hover:bg-[#F9FAFB] hover:text-[#111827]" // Light Gray and Hover Effect
          >
            Cancel
          </button>
          <button
            onClick={registerNewCompany}
            className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/80 py-2 px-4 rounded-md font-bold" // Primary Color with Darker Hover
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
