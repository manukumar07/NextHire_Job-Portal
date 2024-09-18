// Function to format numbers
const formatNumber = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`; // Converts to "1.2k" format
  }
  return num;
};

const JobCounter = ({ title, count }) => {
  return (
    <div className="w-full bg-[#F9FAFB] p-6 rounded-md shadow-lg">
      <h3 className="text-2xl font-bold text-[#1E3A8A] mb-2 text-center">
        {title}
      </h3>
      <p className="text-2xl font-medium text-[#111827] text-center">
        {formatNumber(count)}
      </p>
    </div>
  );
};

const JobCounters = () => {
  const counters = [
    { title: "Total Jobs", count: 800 },
    { title: "Open Positions", count: 350 },
    { title: "Applications Received", count: 1200 },
    { title: "Companies Hiring", count: 75 },
  ];

  return (
    <div className="w-full bg-[#F9FAFB] p-6 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center">
        Job Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[#F59E0B]">
        {counters.map((counter, index) => (
          <JobCounter key={index} title={counter.title} count={counter.count} />
        ))}
      </div>
    </div>
  );
};

export default JobCounters;
