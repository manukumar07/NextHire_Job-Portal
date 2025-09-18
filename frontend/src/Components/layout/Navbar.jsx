import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Menu, User2, X, ChevronDown } from "lucide-react";
import {
  FaUserCircle,
  FaUserPlus,
  FaSignInAlt,
  FaBriefcase,
  FaRobot,
} from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { Popover } from "@headlessui/react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const aiTools = [
    { name: "AI Resume Parser", path: "/ai-parser" },
    { name: "AI Job Matcher", path: "/ai-job-matching" },
  ];

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-[#F9FAFB] shadow-md fixed top-0 w-full z-50">
      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-3xl text-[#F59E0B]" />
          <Link to="/">
            <h1 className="text-2xl font-bold text-[#1E3A8A]">
              Next<span className="text-[#F59E0B]">Hire</span>
            </h1>
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 font-medium text-[#111827]">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Companies
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                {/* AI Tools Dropdown */}
                <Popover className="relative">
                  <Popover.Button className="flex items-center gap-1 hover:text-[#F59E0B] transition-colors">
                    <FaRobot className="text-[#F59E0B]" /> AI Tools{" "}
                    <ChevronDown className="w-4 h-4" />
                  </Popover.Button>
                  <Popover.Panel className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    {aiTools.map((tool, index) => (
                      <Link
                        key={index}
                        to={tool.path}
                        className=" px-4 py-2 hover:bg-[#F3F4F6] flex items-center gap-2"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </Popover.Panel>
                </Popover>
              </>
            )}
          </ul>
        </div>

        {/* Right Side - Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="flex items-center gap-2 text-[#1E3A8A] border border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white py-2 px-4 rounded-lg font-bold transition-all duration-300">
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="flex items-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-2 px-4 rounded-lg font-bold transition-all duration-300">
                  <FaUserPlus /> Signup
                </button>
              </Link>
            </>
          ) : (
            <Popover className="relative">
              <Popover.Button className="text-4xl text-[#1E3A8A]">
                <FaUserCircle className="cursor-pointer hover:text-[#F59E0B] transition-colors" />
              </Popover.Button>
              <Popover.Panel className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-slideUp">
                <div className="flex gap-3 items-center border-b pb-3 mb-3">
                  <FaUserCircle className="text-3xl text-[#1E3A8A]" />
                  <div>
                    <h4 className="font-semibold text-[#111827]">
                      {user.fullname}
                    </h4>
                    <p className="text-sm text-[#6B7280]">{user.profile.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-[#111827]">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 hover:text-[#F59E0B] transition-colors"
                    >
                      <User2 /> View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-3 text-[#1E3A8A] font-bold hover:text-[#F59E0B] transition-colors"
                  >
                    <LogOut /> Logout
                  </button>
                </div>
              </Popover.Panel>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1E3A8A] focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 text-lg font-medium text-[#111827]">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#F59E0B]"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#F59E0B]"
          >
            Jobs
          </Link>
          <Link
            to="/browse"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#F59E0B]"
          >
            Browse
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#F59E0B]"
          >
            About Us
          </Link>

          {/* AI Tools Mobile - collapsible */}
          <details className="w-full">
            <summary className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#F59E0B]">
              <FaRobot className="text-[#F59E0B]" /> AI Tools
            </summary>
            <div className="flex flex-col items-center gap-2 mt-2">
              {aiTools.map((tool, index) => (
                <Link
                  key={index}
                  to={tool.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[#F59E0B] flex items-center gap-2"
                >
                  <FaRobot className="text-[#F59E0B]" /> {tool.name}
                </Link>
              ))}
            </div>
          </details>

          {!user ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="flex items-center gap-2 text-[#1E3A8A] border border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white py-2 px-6 rounded-lg font-bold">
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="flex items-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-2 px-6 rounded-lg font-bold">
                  <FaUserPlus /> Signup
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logoutHandler();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 text-[#1E3A8A] border border-[#1E3A8A] py-2 px-4 rounded-lg font-bold hover:bg-[#F59E0B] hover:text-white transition-all"
            >
              <LogOut /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
