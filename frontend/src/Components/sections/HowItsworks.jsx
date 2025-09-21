import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Briefcase, Send } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Create an Account",
    desc: "Sign up and complete your profile to get started",
    icon: <UserPlus className="h-10 w-10 text-[#1E3A8A]" />,
  },
  {
    step: 2,
    title: "Find Your Job",
    desc: "Browse listings or use our advanced search filters",
    icon: <Briefcase className="h-10 w-10 text-[#6A38C2]" />,
  },
  {
    step: 3,
    title: "Apply with Ease",
    desc: "Submit your application with just a few clicks",
    icon: <Send className="h-10 w-10 text-[#F59E0B]" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
            How It <span className="text-[#F59E0B]">Works</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Simple steps to find your next career opportunity
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-center"
            >
              {/* Icon only (no background) */}
              <motion.div className="flex items-center justify-center mx-auto">
                {item.icon}
              </motion.div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-semibold text-[#1E3A8A]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
