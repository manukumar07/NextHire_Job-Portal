import { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-6 md:py-12 bg-[#F9FAFB]">
      <div className="flex flex-col gap-3 my-8">
        <span className="mx-auto px-3 py-1 rounded-full bg-[#F9FAFB] text-[red] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-4xl md:text-4xl font-medium text-[#1E3A8A]">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#F59E0B] ">Dream Jobs</span>
        </h1>
        <p className="text-base md:text-lg text-[#111827] font-mono">
          Our platform offers a seamless experience to connect professionals
          with leading companies. Explore, apply, and advance your career with
          ease.
        </p>
        <div className="flex justify-center mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-[#9CA3AF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            />
            <button
              onClick={searchJobHandler}
              className="absolute inset-y-0 right-0 px-4 py-2 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
