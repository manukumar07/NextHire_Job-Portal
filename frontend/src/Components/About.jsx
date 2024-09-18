// import React from "react";
import { FaMedal, FaUsers, FaBriefcase } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="bg-[#F9FAFB] text-[#111827] min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Section 1: Hero */}
          <section className="text-center py-12">
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-4">About Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              We are dedicated to connecting talented job seekers with top
              companies. Our platform helps recruiters find the best candidates
              and helps job seekers land their dream roles.
            </p>
          </section>

          {/* Section 2: Values */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <FaUsers className="text-[#F59E0B] text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Our Community</h2>
              <p className="text-md mt-2 text-[#111827]">
                We believe in the power of community. Thousands of employers and
                job seekers trust our platform to find the right match.
              </p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <FaBriefcase className="text-[#9CA3AF] text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Opportunities</h2>
              <p className="text-md mt-2 text-[#111827]">
                Our platform lists numerous job openings across various
                industries, ensuring that there something for everyone.
              </p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <FaMedal className="text-[#1E3A8A] text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Achievements</h2>
              <p className="text-md mt-2 text-[#111827]">
                Over the years, we have helped thousands of job seekers and
                companies, building a solid track record of success.
              </p>
            </div>
          </section>

          {/* Section 3: Our Mission */}
          <section className="bg-[#1E3A8A] text-white py-12 text-center rounded-lg">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg mt-4 max-w-3xl mx-auto">
              Our mission is to empower professionals to advance their careers,
              and help companies find the talent they need to grow. We are
              passionate about connecting people and fostering growth.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
