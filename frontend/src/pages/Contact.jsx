import React from "react";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FFFFFF] min-h-screen py-12 px-4 md:px-8 font-sans mt-24">
        <div className="max-w-5xl mx-auto">
          {/* Contact Section Wrapper */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#1E3A8A] mb-3">
                Contact Us
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
                Have questions? Reach out to our team — we’re here to help.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-heading font-bold text-[#1E3A8A] mb-6">
                  Get in Touch
                </h2>
                <p className="flex items-center gap-3 mb-4 text-[#111827]">
                  <FaMapMarkerAlt className="text-xl text-[#F59E0B]" />
                  Yamuna Nagar, Haryana
                </p>
                <p className="flex items-center gap-3 mb-4 text-[#111827]">
                  <FaPhone className="text-xl text-[#1E3A8A]" />
                  (+91) 98178XXXXX
                </p>
                <p className="flex items-center gap-3 mb-6 text-[#111827]">
                  <FaEnvelope className="text-xl text-[#9CA3AF]" />
                  demo@nexthire.com
                </p>
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
                  Find Us Here
                </h3>
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110421.5610555984!2d77.18781080247744!3d30.13214682429061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ef99b8b19ea25%3A0xfc76e2b1f391902!2sYamuna%20Nagar%2C%20Haryana!5e0!3m2!1sen!2sin!4v1726570663031!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Map Location"
                  ></iframe>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-heading font-bold text-[#1E3A8A] mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#111827] mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#111827] mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#111827] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Type your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1E3A8A] hover:bg-[#162e6e] text-white px-4 py-3 rounded-lg font-highlight font-semibold transition transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
