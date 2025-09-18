import { useState } from "react";
import { Search, Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative bg-[#F9FAFB] py-12 px-6 md:py-20 font-sans">
      <div className="max-w-5xl mx-auto text-center animate-fadeIn">
        {/* Tagline */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0E7FF] text-[#1E3A8A] font-semibold text-sm tracking-wide shadow-sm animate-bounceSlow mt-8">
          <Briefcase className="w-4 h-4" /> No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#1E3A8A] leading-snug">
          Search, Apply & <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-[#F59E0B] to-[#6A38C2] bg-clip-text text-transparent animate-gradientText">
            Dream Job
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-base md:text-lg text-[#374151] max-w-2xl mx-auto font-light">
          Our platform connects professionals with leading companies. Explore,
          apply, and grow your career with confidence.
        </p>

        {/* Search Box */}
        <div className="flex justify-center mt-8">
          <div className="relative w-full max-w-lg group">
            <input
              type="text"
              placeholder="Find your dream job..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-[#9CA3AF] shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent 
                transition-all duration-300 text-[#111827] placeholder:text-[#9CA3AF]"
            />
            <button
              onClick={searchJobHandler}
              className="absolute inset-y-0 right-0 px-5 py-3 rounded-full bg-[#1E3A8A] text-white 
                hover:bg-[#F59E0B] transition-colors duration-300 flex items-center justify-center gap-2 font-semibold"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F9FAFB] via-[#E0E7FF] to-[#F9FAFB] opacity-70"></div>
    </section>
  );
};

export default HeroSection;
