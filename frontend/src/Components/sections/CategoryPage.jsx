import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  TrendingUp,
  Palette,
  Briefcase,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Technology",
    count: 1243,
    icon: Code,
    desc: "Work on cutting-edge software, AI, and IT roles.",
  },
  {
    name: "Marketing",
    count: 873,
    icon: TrendingUp,
    desc: "Shape brands and drive growth with innovative campaigns.",
  },
  {
    name: "Design",
    count: 654,
    icon: Palette,
    desc: "Create impactful visuals, UI/UX, and product experiences.",
  },
  {
    name: "Sales",
    count: 512,
    icon: Briefcase,
    desc: "Connect with clients and boost business growth.",
  },
  {
    name: "Healthcare",
    count: 387,
    icon: Stethoscope,
    desc: "Support patients and innovate in medical care.",
  },
  {
    name: "Engineering",
    count: 321,
    icon: Wrench,
    desc: "Design, build, and optimize technical solutions.",
  },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans flex flex-col">
      {/* Hero Section */}
      <div className="text-center mt-16 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
          Explore <span className="text-[#F59E0B]">Job Categories</span>
        </h2>
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
          Find opportunities across industries and connect with your dream role.
        </p>
      </div>

      {/* Categories Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="bg-white p-10 rounded-2xl shadow-lg text-center 
              cursor-pointer transform transition-all duration-300 
              hover:scale-105 hover:shadow-2xl hover:bg-[#F3F4F6] w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <cat.icon className="w-14 h-14 mx-auto mb-5 text-[#F59E0B]" />
              <h3 className="text-2xl font-heading font-bold text-[#1E3A8A] mb-3">
                {cat.name}
              </h3>
              <p className="text-[#6B7280] font-sans mb-3">{cat.desc}</p>
              <p
                className="text-[#374151] font-medium transition-all duration-300 
                hover:underline underline-offset-4"
              >
                <Link to="/jobs">{cat.count} Jobs</Link>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default CategoriesPage;
