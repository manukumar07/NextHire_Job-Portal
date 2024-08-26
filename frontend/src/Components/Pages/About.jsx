// import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-[#ECF0F1] text-[#2C3E50] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#FFCC00]">
          About Us
        </h2>
        <p className="text-lg text-center mb-8">
          Welcome to JobPortal, your go-to destination for finding the best job
          opportunities. We are dedicated to connecting job seekers with top
          employers and helping you find your perfect job match.
        </p>

        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Mission Statement Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-base">
              Our mission is to simplify the job search process for candidates
              and streamline hiring for employers. We strive to create a
              user-friendly platform where you can easily search, apply, and get
              hired with confidence.
            </p>
          </div>

          {/* Services Offered Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">What We Offer</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Access to a wide range of job listings across various
                industries.
              </li>
              <li>
                Advanced search filters to find jobs that match your skills and
                preferences.
              </li>
              <li>
                Easy application process with resume upload and tracking
                features.
              </li>
              <li>
                Employer profiles to learn more about potential companies before
                applying.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
