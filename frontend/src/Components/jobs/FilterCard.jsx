import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import {
  FaFilter,
  FaMapMarkerAlt,
  FaIndustry,
  FaClock,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const filterData = [
  {
    filterType: "Location",
    icon: <FaMapMarkerAlt className="text-[#F59E0B]" />,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida"],
  },
  {
    filterType: "Industry",
    icon: <FaIndustry className="text-[#F59E0B]" />,
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "UX/UI Designer",
      "Software Developer",
      "App Developer",
    ],
  },
  {
    filterType: "Experience Level",
    icon: <FaClock className="text-[#F59E0B]" />,
    array: ["Fresher", "1-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Job Type",
    icon: <FaBriefcase className="text-[#F59E0B]" />,
    array: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleSelect = (filterType, value) => {
    setSelectedFilters((prev) => {
      const prevArray = prev[filterType] || [];
      const isSelected = prevArray.includes(value);
      const newArray = isSelected
        ? prevArray.filter((v) => v !== value)
        : [...prevArray, value];
      return { ...prev, [filterType]: newArray };
    });
  };

  useEffect(() => {
    // Flatten all selected filters into a single search query
    const query = Object.values(selectedFilters).flat().join(" ");
    dispatch(setSearchedQuery(query));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
      <h1 className="font-bold text-xl text-[#1E3A8A] flex items-center gap-2 mb-4">
        <FaFilter className="text-[#F59E0B]" /> Filter Jobs
      </h1>

      {filterData.map((data, idx) => {
        const isOpen = openFilter === data.filterType;
        return (
          <div key={idx} className="mb-4 border-b border-gray-200 pb-3">
            <button
              type="button"
              className="w-full flex items-center justify-between text-[#111827] font-semibold text-sm hover:text-[#1E3A8A] transition-all"
              onClick={() => toggleFilter(data.filterType)}
            >
              <span className="flex items-center gap-2">
                {data.icon} {data.filterType}
              </span>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen && (
              <div className="mt-2 flex flex-col gap-2">
                {data.array.map((item, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border 
                                ${
                                  selectedFilters[data.filterType]?.includes(
                                    item
                                  )
                                    ? "border-[#1E3A8A] bg-[#E5E7EB]"
                                    : "border-gray-300"
                                }
                                hover:bg-[#F3F4F6] transition-all`}
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={
                        selectedFilters[data.filterType]?.includes(item) ||
                        false
                      }
                      onChange={() => handleSelect(data.filterType, item)}
                      className="form-checkbox h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
                    />
                    <span className="text-[#111827]">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Reset Button */}
      <button
        onClick={() => setSelectedFilters({})}
        className="mt-4 w-full bg-[#1E3A8A] text-white font-bold py-2 px-4 rounded-xl shadow hover:bg-[#163275] transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterCard;
