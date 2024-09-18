import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-[#F9FAFB] p-4 rounded-md shadow-md">
      {" "}
      {/* Background Color */}
      <table className="min-w-full table-auto border-collapse">
        <caption className="text-left py-2 text-[#111827]">
          {" "}
          {/* Text Color */}A list of your recent registered companies
        </caption>
        <thead>
          <tr className="border-b border-[#9CA3AF]">
            {" "}
            {/* Border Color */}
            <th className="py-2 text-left text-[#111827]">
              {" "}
              {/* Text Color */}
              Logo
            </th>
            <th className="py-2 text-left text-[#111827]">
              {" "}
              {/* Text Color */}
              Name
            </th>
            <th className="py-2 text-left text-[#111827]">
              {" "}
              {/* Text Color */}
              Date
            </th>
            <th className="py-2 text-right text-[#111827]">
              {" "}
              {/* Text Color */}
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.map((company) => (
            <tr key={company._id} className="border-b border-[#9CA3AF]">
              {" "}
              {/* Border Color */}
              <td className="py-2">
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="py-2 text-[#111827]">
                {" "}
                {/* Text Color */}
                {company.name}
              </td>
              <td className="py-2 text-[#111827]">
                {" "}
                {/* Text Color */}
                {company.createdAt.split("T")[0]}
              </td>
              <td className="py-2 text-right">
                <div className="relative inline-block">
                  <MdMoreHoriz className="text-[#1E3A8A] cursor-pointer" />{" "}
                  {/* Primary Color */}
                  <div
                    className="absolute right-0 mt-2 bg-white border border-[#9CA3AF] rounded-md shadow-lg z-10" // Border Color
                    style={{ display: "none" }} // Initially hidden; show when needed
                  >
                    <div
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#F1F5F9] rounded-md"
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                    >
                      <FaEdit className="text-[#1E3A8A]" />{" "}
                      {/* Primary Color */}
                      <span className="text-[#111827]">Edit</span>{" "}
                      {/* Text Color */}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
