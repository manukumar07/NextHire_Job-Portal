// import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Icons for contact information

const Contact = () => {
  return (
    <section id="contact" className="bg-[#ECF0F1] text-[#2C3E50] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#FFCC00]">
          Contact Us
        </h2>
        <p className="text-lg text-center mb-8">
          We’d love to hear from you! Whether you have questions, feedback, or
          just want to get in touch, feel free to reach out using the contact
          methods below or fill out the form.
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <div className="flex items-center mb-4">
              <FaPhone className="w-6 h-6 text-[#2C3E50] mr-3" />
              <p className="text-base">+91 9817859713</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="w-6 h-6 text-[#2C3E50] mr-3" />
              <p className="text-base">mkcontact@jobportal.com</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-6 h-6 text-[#2C3E50] mr-3" />
              <p className="text-base">
                #10 Jagadhri workshop, Yamuna Nagar, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2C3E50] text-white py-2 px-4 rounded-lg hover:bg-[#1A252F]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
