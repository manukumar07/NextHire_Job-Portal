import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] text-[#111827] py-12 px-6 md:px-16 mt-10 animate-fadeIn font-sans border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="animate-slideUp">
            <Link to="/" className="group">
              <h1 className="text-3xl font-heading font-bold text-[#1E3A8A] group-hover:text-[#F59E0B] transition-colors duration-300">
                Next<span className="text-[#F59E0B]">Hire</span>
              </h1>
            </Link>
            <p className="text-md mt-3 text-[#6B7280] leading-relaxed">
              A modern platform connecting job seekers with recruiters for the
              best career opportunities.
            </p>
            <Link
              to="/about"
              className="mt-3 inline-block font-highlight text-[#1E3A8A] hover:text-[#F59E0B] transition-colors duration-300"
            >
              Learn More →
            </Link>
          </div>

          {/* Quick Links */}
          <div className="animate-slideRight">
            <h2 className="text-xl font-heading font-bold text-[#1E3A8A] mb-4 border-b border-[#E5E7EB] pb-2">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Jobs", link: "/jobs" },
                { name: "Browse", link: "/browse" },
                { name: "Contact", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="hover:text-[#F59E0B] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-slideUp">
            <h2 className="text-xl font-heading font-bold text-[#1E3A8A] mb-4 border-b border-[#E5E7EB] pb-2">
              Resources
            </h2>
            <ul className="space-y-2">
              {[
                { name: "About Us", link: "/about" },
                { name: "Blog", link: "/blog" },
                { name: "FAQs", link: "/faqs" },
                { name: "Support", link: "/support" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="hover:text-[#F59E0B] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slideRight">
            <h2 className="text-xl font-heading font-bold text-[#1E3A8A] mb-4 border-b border-[#E5E7EB] pb-2">
              Contact Us
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 hover:text-[#F59E0B] transition-all duration-300">
                <FaEnvelope className="text-[#1E3A8A]" /> demo@nexthire.com
              </li>
              <li className="flex items-center gap-2 hover:text-[#F59E0B] transition-all duration-300">
                <FaPhoneAlt className="text-[#1E3A8A]" /> +91 98178XXXXX
              </li>
              <li className="flex items-center gap-2 hover:text-[#F59E0B] transition-all duration-300">
                <FaMapMarkerAlt className="text-[#1E3A8A]" /> Yamuna Nagar
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[
                {
                  icon: <FaFacebookF size={18} />,
                  link: "https://facebook.com",
                  hover: "hover:bg-[#1E3A8A]",
                },
                {
                  icon: <FaTwitter size={18} />,
                  link: "https://twitter.com",
                  hover: "hover:bg-[#1DA1F2]",
                },
                {
                  icon: <FaLinkedinIn size={18} />,
                  link: "https://linkedin.com",
                  hover: "hover:bg-[#0A66C2]",
                },
                {
                  icon: <FaInstagram size={18} />,
                  link: "https://instagram.com",
                  hover: "hover:bg-[#E1306C]",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full border border-[#E5E7EB] transition-all duration-300 transform hover:scale-110 hover:text-white ${item.hover}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-[#E5E7EB] pt-4 text-center text-sm text-[#6B7280] animate-fadeIn">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#1E3A8A]">NextHire</span>. All
            rights reserved.
          </p>
          <p className="mt-2 text-[#1E3A8A] font-highlight">
            Made with <FaHeart className="inline text-red-500 animate-pulse" />{" "}
            by <span className="font-bold">Manu Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
