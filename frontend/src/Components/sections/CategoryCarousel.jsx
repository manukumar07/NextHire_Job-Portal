import React from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";
import { motion } from "framer-motion";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "Machine Learning",
  "UI/UX Designer",
  "DevOps Engineer",
  "Cybersecurity",
  "Mobile Developer",
  "Cloud Engineer",
  "Product Manager",
  "QA Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Smooth scroll handler
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250; // adjust for step
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="text-center my-10">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-4 relative">
        {/* Left Chevron */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 p-3 bg-[#1E3A8A] hover:bg-[#F59E0B] transition-all text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden scroll-smooth gap-4 mx-14 py-4"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={index}
              onClick={() => searchJobHandler(cat)}
              whileHover={{
                scale: 1.08,
                backgroundColor: "#F59E0B",
                color: "#fff",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 min-w-[200px] border border-gray-300 rounded-full bg-white text-[#111827] font-medium shadow-sm hover:shadow-md transition-all"
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Right Chevron */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 p-3 bg-[#1E3A8A] hover:bg-[#F59E0B] transition-all text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
