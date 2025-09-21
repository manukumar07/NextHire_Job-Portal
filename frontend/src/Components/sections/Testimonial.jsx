import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Quote } from "lucide-react";

// import userImage from "../../assets/m.jpg";
// import userImage2 from "../assets/n.jpg";
// import userImage3 from "../../assets/mk.png";

const testimonials = [
  {
    name: "Manu Kumar",
    position: "Full Stack Developer",
    testimonial:
      "This job portal helped me land my dream job. The user interface is easy to navigate, and the job search filters are fantastic!",
    // image: userImage,
  },
  {
    name: "Neeraj Pal",
    position: "Software Engineer",
    testimonial:
      "I've applied for multiple jobs using this platform, and the process has been seamless. The portal connects you directly to top companies.",
    // image: userImage2,
  },
  {
    name: "Manu ",
    position: "Frontend Developer",
    testimonial:
      "This platform gave me access to a range of job opportunities I wouldn't have found anywhere else. Highly recommend!",
    // image: userImage3,
  },
];

const Testimonial = () => {
  return (
    <section className="bg-[#F9FAFB] py-16 px-5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
          What Our <span className="text-[#F59E0B]">Users Say</span>
        </h2>

        {/* Intro Paragraph */}
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Hear from professionals who found their dream jobs through our
          platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-xl shadow-lg cursor-pointer overflow-hidden bg-white border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.12)",
              }}
            >
              {/* User Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-[#f8f3ea] shadow-md"
              />

              {/* Name + Star */}
              <h3 className="text-2xl font-semibold text-[#1E3A8A] mb-2 flex items-center justify-center gap-2">
                {testimonial.name}
                <Star className="h-5 w-5 text-[#F59E0B] animate-pulse" />
              </h3>

              {/* Position */}
              <p className="text-md text-[#6A38C2] mb-4 font-bold">
                {testimonial.position}
              </p>

              {/* Testimonial Text */}

              <p className="text-gray-800 font-serif italic relative max-w-2xl mx-auto text-center leading-relaxed">
                <Quote className="w-4 h-4 text-[#F59E0B] inline-block mr-2 -translate-y-1" />
                {testimonial.testimonial}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
