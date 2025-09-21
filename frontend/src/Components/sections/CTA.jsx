import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#84a2f6] via-[#6A38C2] to-[#eec378]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white">
          Ready to Take the Next Step in Your Career?
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands of job seekers who have found their dream jobs through
          JobSphere.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {/* Create Account Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/register">
              <button className="px-6 py-3 text-lg font-semibold bg-white text-[#1E3A8A] rounded-full shadow-md hover:bg-gray-100 transition duration-300">
                Create Account
              </button>
            </Link>
          </motion.div>

          {/* Browse Jobs Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/jobs">
              <button className="px-6 py-3 text-lg font-semibold text-white border border-white rounded-full hover:bg-white/20 transition duration-300">
                Browse Jobs
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
