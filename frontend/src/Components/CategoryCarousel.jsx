import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";
import { motion } from "framer-motion"; // Import Framer Motion

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Framer motion variants for smooth animations
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#F59E0B", color: "#FFFFFF" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="text-center">
      <div className="w-full max-w-7xl mx-auto my-6 flex items-center justify-between gap-4">
        {/* Left Chevron Button */}
        <button className="p-3 bg-[#1E3A8A] text-white rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Content */}
        <div className="flex overflow-x-auto gap-6 scrollbar-hide">
          {category.map((cat, index) => (
            <motion.button
              key={index}
              onClick={() => searchJobHandler(cat)}
              className="px-6 py-3 border border-[#9CA3AF] rounded-full text-[#111827] transition-all"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants} // Apply motion variants
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Right Chevron Button */}
        <button className="p-3 bg-[#1E3A8A] text-white rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
