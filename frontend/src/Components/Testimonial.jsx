// import React from "react";
import { motion } from "framer-motion";
import userImage from "../assets/m.jpg";
import userImage2 from "../assets/n.jpg";
import userImage3 from "../assets/mk.png";
const testimonials = [
  {
    name: "Manu Kumar",
    position: "Full Satck Developer",
    testimonial:
      "This job portal helped me land my dream job. The user interface is easy to navigate, and the job search filters are fantastic!",
    image: userImage,
  },
  {
    name: "Neeraj",
    position: "Software Engineer",
    testimonial:
      "I've applied for multiple jobs using this platform, and the process has been seamless. The portal connects you directly to top companies.",
    image: userImage2,
  },
  {
    name: "Mk",
    position: "Frontend Developer",
    testimonial:
      "This platform gave me access to a range of job opportunities I wouldn't have found anywhere else. Highly recommend!",
    image: userImage3,
  },
];

const Testimonial = () => {
  return (
    <section className="bg-[#F9FAFB] py-16 px-5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 shadow-lg rounded-lg border border-[#9CA3AF] transform transition-all hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-[#F59E0B]"
              />
              <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
                {testimonial.name}
              </h3>
              <p className="text-md text-[#9CA3AF] mb-4 font-bold">
                {testimonial.position}
              </p>
              <p className="text-[#111827] italic">{testimonial.testimonial}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
