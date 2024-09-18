import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { FaFilter } from "react-icons/fa"; // Import React Icon for filter

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "UX/UI Designer",
      "software Developer",
      "App Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-80k", "80k-1.2L", "1.2L-2L", "2L+"],
  },
  {
    filterType: "Experience Level",
    array: ["Fresher", "1-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Company Size",
    array: ["Startup", "Small (11-50)", "Medium (51-200)", "Large (200+)"],
  },
  {
    filterType: "Job Type",
    array: ["Full-Time", "Part-Time", "Contract", "Internship"],
  },
  {
    filterType: "Education Level",
    array: [
      "High School",
      "Associate Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-[#F9FAFB] p-4 rounded-md">
      <h1 className="font-bold text-lg text-[#1E3A8A] flex items-center gap-2">
        <FaFilter className="text-[#F59E0B]" /> Filter Jobs
      </h1>
      <hr className="mt-3 border-[#9CA3AF]" />
      <div>
        {filterData.map((data, index) => (
          <div key={index} className="my-4">
            <h1 className="font-semibold text-sm text-[#111827]">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <input
                    type="radio"
                    id={itemId}
                    name={data.filterType}
                    value={item}
                    checked={selectedValue === item}
                    onChange={() => changeHandler(item)}
                    className="form-radio h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A] border-[#9CA3AF]"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-[#111827] cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
