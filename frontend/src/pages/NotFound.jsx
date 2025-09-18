import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-[#1E3A8A]/10"
          >
            <AlertTriangle className="w-10 h-10 text-[#F59E0B]" />
          </motion.div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-[#1E3A8A] mb-4">404</h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold text-[#111827] mb-4">
          Page Not Found
        </h2>

        {/* Paragraph */}
        <p className="text-[#9CA3AF] text-lg mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved. Try
          going back to the homepage.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-4 py-3 rounded-xl bg-[#1E3A8A] text-white font-semibold shadow-md hover:bg-[#F59E0B] transition"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </section>
  );
};

export default NotFound;
