import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { toast } from "sonner";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState(null);

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // delete
  const deleteCompany = (id) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    setLoadingDelete(id);
    setTimeout(() => {
      // Remove the company from the local state
      setFilterCompany((prev) => prev.filter((c) => c._id !== id));
      toast.success("Company deleted successfully!");
      setLoadingDelete(null);
    }, 500);
  };

  return (
    <div className="bg-[#F9FAFB] p-4 rounded-2xl shadow-md transition-all duration-300 mt-24">
      <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-sm">
        <caption className="text-left py-3 text-[#111827] font-medium">
          📋 Recently Registered Companies
        </caption>
        <thead className="bg-[#E5E7EB] text-left">
          <tr>
            <th className="px-4 py-2 border-b border-[#D1D5DB]">Logo</th>
            <th className="px-4 py-2 border-b border-[#D1D5DB]">Name</th>
            <th className="px-4 py-2 border-b border-[#D1D5DB]">Date</th>
            <th className="px-4 py-2 border-b border-[#D1D5DB] text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <tr
                key={company._id}
                className="hover:bg-[#F1F5F9] transition-colors duration-200"
              >
                <td className="px-4 py-3">
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 text-[#111827]">{company.name}</td>
                <td className="px-4 py-3 text-[#111827]">
                  {company.createdAt ? company.createdAt.split("T")[0] : "NA"}
                </td>
                <td className="px-4 py-3 text-right relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === company._id ? null : company._id
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                  >
                    <MdMoreHoriz className="text-[#1E3A8A] w-6 h-6" />
                  </button>

                  {openDropdown === company._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-[#9CA3AF] rounded-lg shadow-lg z-50 animate-slideUp">
                      <div
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F5F9] cursor-pointer transition rounded-md"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <FaEdit className="w-4 h-4 text-[#1E3A8A]" />
                        <span className="text-[#111827] text-sm">Edit</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-4 py-2 hover:bg-[#FEE2E2] cursor-pointer transition rounded-md ${
                          loadingDelete === company._id
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                        onClick={() => deleteCompany(company._id)}
                      >
                        <FaTrash className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 text-sm">
                          {loadingDelete === company._id
                            ? "Deleting..."
                            : "Delete"}
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
