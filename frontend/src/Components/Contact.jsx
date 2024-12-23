import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";

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
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Contact Information and Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center">
              Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                  Get in Touch
                </h2>
                <p className="flex items-center gap-2 mb-4 text-[#111827]">
                  <FaMapMarkerAlt className="text-xl text-[#1E3A8A]" />
                  Yamuna Nagar, Haryana
                </p>
                <p className="flex items-center gap-2 mb-4 text-[#111827]">
                  <FaPhone className="text-xl text-[#1E3A8A]" />
                  (+91) 9817859713
                </p>
                <p className="flex items-center gap-2 mb-4 text-[#111827]">
                  <FaEnvelope className="text-xl text-[#1E3A8A]" />
                  contact@nexthire.com
                </p>
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
                  Find Us Here
                </h3>
                <div className="w-full h-64 rounded-lg overflow-hidden">
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
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
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
                      placeholder="enter a name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
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
                      placeholder="enter a email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#111827] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="type message.."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-4 py-2 rounded-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
