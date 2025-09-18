import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeUp, formatNumber } from "../../utils/helpers";

const JobCounter = ({ title, count }) => (
  <motion.div
    className="w-full bg-white p-6 rounded-xl shadow-lg border border-[#9CA3AF] transform transition-all hover:scale-105"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-xl md:text-2xl font-bold text-[#1E3A8A] mb-2 text-center">
      {title}
    </h3>
    <p className="text-2xl md:text-3xl font-extrabold text-[#F59E0B] text-center">
      <CountUp
        start={0}
        end={count}
        duration={2}
        separator=","
        formattingFn={formatNumber}
      />
    </p>
  </motion.div>
);

const JobCounters = () => {
  const counters = [
    { title: "Total Jobs", count: 800 },
    { title: "Open Positions", count: 350 },
    { title: "Applications Received", count: 1200 },
    { title: "Companies Hiring", count: 75 },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-16 px-5">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
            Job <span className="text-[#F59E0B]">Statistics</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Discover key insights into job opportunities, applications, and
            companies hiring — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((counter, index) => (
            <JobCounter
              key={index}
              title={counter.title}
              count={counter.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCounters;
