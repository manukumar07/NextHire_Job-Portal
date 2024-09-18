import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] text-[#111827] py-8 px-4 md:px-8 mt-2">
      <div className="max-w-1xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold text-[#1E3A8A]">
                Next<span className="text-[#F59E0B]">Hire</span>
              </h1>
            </Link>

            <p className="text-md mb-4 mt-2 ">
              Our platform offers a seamless experience for job seekers and
              recruiters.
            </p>
            <Link to="/about" className="text-[#1E3A8A] hover:text-[#F59E0B]">
              Learn More
            </Link>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#111827] hover:text-[#F59E0B]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-[#111827] hover:text-[#F59E0B]"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-[#111827] hover:text-[#F59E0B]"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#111827] hover:text-[#F59E0B]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Follow Us
            </h2>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] hover:text-[#F59E0B]"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] hover:text-[#F59E0B]"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] hover:text-[#F59E0B]"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] hover:text-[#F59E0B]"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t border-[#E5E7EB] pt-4 text-center text-md text-[#111827] font-bold">
          <p>
            &copy; {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
          <p className="mt-2 text-[#1E3A8A]">
            Made with <FaHeart className="inline text-red-500" />{" "}
            <span className="font-bold">Manu Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
