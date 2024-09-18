import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update search text in the store on input change
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      {" "}
      {/* Background Color */}
      {/* Navbar */}
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Search and New Company Button */}
        <div className="flex flex-col md:flex-row items-center justify-between my-5">
          <input
            className="w-full md:w-1/2 mb-4 md:mb-0 p-2 border rounded-md"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            style={{
              borderColor: "#9CA3AF", // Light Gray Border
              color: "#111827", // Text Color (Charcoal Black)
            }}
          />
          <button
            className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/80 p-2 px-4 rounded-md font-bold" // Primary Color with Darker Hover
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </button>
        </div>
        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
