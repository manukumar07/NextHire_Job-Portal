import { motion } from "framer-motion";
import { Briefcase, Users, Search, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Briefcase className="w-10 h-10 text-[#F59E0B]" />,
    title: "Top Job Opportunities",
    desc: "Access thousands of verified jobs from leading companies across industries.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#1E3A8A]" />,
    title: "Trusted by Professionals",
    desc: "Join a growing community of job seekers and recruiters who trust NextHire.",
  },
  {
    icon: <Search className="w-10 h-10 text-[#6A38C2]" />,
    title: "Smart Job Matching",
    desc: "Our advanced filters and AI recommendations help you find the perfect role faster.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#10B981]" />,
    title: "Secure & Reliable",
    desc: "Your data and applications are always protected with enterprise-grade security.",
  },
];

const WhyChooseNextHire = () => {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
          Why Choose <span className="text-[#F59E0B]">NextHire?</span>
        </h2>

        {/* Subtext */}
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto mb-12">
          NextHire makes your job search smarter, faster, and more effective.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#374151]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNextHire;
