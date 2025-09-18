import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update search text in the store on input change
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen transition-all duration-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-20">
        {/* Header: Search + New Company Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 animate-fadeIn">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="🔍 Filter by company name"
              className="w-full p-3 border rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] 
                         transition-all duration-300 text-[#111827] bg-white"
            />
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <button
              onClick={() => navigate("/admin/companies/create")}
              className="px-6 py-2 rounded-xl font-bold text-white 
                         bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] shadow-md 
                         hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              ➕ New Company
            </button>
          </div>
        </div>

        {/* Companies Table Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 animate-slideUp transition-all duration-500">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
