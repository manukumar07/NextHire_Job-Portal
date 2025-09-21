import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaUsers, FaBriefcase } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const About = () => {
  const values = [
    {
      icon: <FaUsers className="text-5xl mx-auto mb-4 text-[#F59E0B]" />,
      title: "Our Community",
      desc: "We believe in the power of community. Thousands of employers and job seekers trust our platform to find the right match.",
      bg: "bg-[#F59E0B20]",
    },
    {
      icon: <FaBriefcase className="text-5xl mx-auto mb-4 text-[#9CA3AF]" />,
      title: "Opportunities",
      desc: "Our platform lists numerous job openings across various industries, ensuring that there is something for everyone.",
      bg: "bg-[#9CA3AF20]",
    },
    {
      icon: <FaMedal className="text-5xl mx-auto mb-4 text-[#1E3A8A]" />,
      title: "Achievements",
      desc: "Over the years, we have helped thousands of job seekers and companies, building a solid track record of success.",
      bg: "bg-[#1E3A8A20]",
    },
  ];

  const team = [
    {
      name: "Manu Kumar Pal",
      role: "Full Stack Developer",
      image: "https://via.placeholder.com/300x300.png?text=Manu+Kumar+Pal",
      bio: "Full-stack engineer passionate about building scalable platforms for creators.",
      skills: ["React", "AI/ML", "Frontend", "Backend"],
    },
    // add more team members here later
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-[#F9FAFB] text-[#111827] p-12 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Section 1: Hero */}
          <motion.section
            className="text-center py-12 animate-fadeIn"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#1E3A8A] mb-4">
              About Us
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-[#6B7280]">
              We are dedicated to connecting talented job seekers with top
              companies. Our platform helps recruiters find the best candidates
              and helps job seekers land their dream roles.
            </p>
          </motion.section>

          {/* Section 2: Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {values.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 shadow-lg rounded-2xl text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#F9FAFB] animate-slideUp"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className={`${item.bg} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-float`}
                >
                  {item.icon}
                </div>
                <h2 className="text-2xl font-heading font-bold text-[#1E3A8A] mb-2">
                  {item.title}
                </h2>
                <p className="text-md mt-2 text-[#6B7280]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Section 3: Our Mission */}
          <motion.section
            className="bg-[#1E3A8A] text-white py-12 text-center rounded-2xl shadow-lg mt-12 animate-zoomIn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold animate-gradientText bg-clip-text text-transparent bg-gradient-to-r from-[#F59E0B] via-[#9CA3AF] to-white">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-white/90 font-highlight">
              Our mission is to empower professionals to advance their careers,
              and help companies find the talent they need to grow. We are
              passionate about connecting people and fostering growth.
            </p>
          </motion.section>

          {/* Section 4: Meet Our Team */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#3366FF] to-[#efb919] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Meet Our Team
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
                    />
                    <h3 className="text-2xl font-heading font-bold text-[#1E3A8A]">
                      {member.name}
                    </h3>
                    <p className="text-lg text-[#6B7280] mb-2">{member.role}</p>
                    <p className="text-md text-[#4B5563] mb-4">{member.bio}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-[#F3F4F6] text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                className="text-center mt-16 animate-fadeIn"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-heading font-bold text-[#1E3A8A] mb-4">
                  Want to be part of our journey?
                </h3>
                <p className="text-[#9CA3AF] max-w-xl mx-auto mb-6 font-sans">
                  We’re always looking for passionate people to join our mission
                  of connecting talent with opportunities.
                </p>
                <a
                  href="#"
                  className="inline-block bg-gradient-to-r from-[#1E3A8A] via-[#fdf1dc] to-[#9CA3AF] 
               bg-[length:200%_200%] animate-gradientText text-white px-8 py-3 
               rounded-full font-highlight font-semibold shadow-lg 
               hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Join Our Team
                </a>
              </motion.div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
