import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Menu, User2 } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { Popover } from "@headlessui/react";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#F9FAFB]">
      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Next<span className="text-[#F59E0B]">Hire</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1E3A8A] focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`fixed inset-0 bg-white md:static md:flex items-center justify-between gap-6 md:gap-12 md:flex-row md:items-center transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <ul className="flex flex-col md:flex-row font-medium items-center gap-4 md:gap-6 text-[#111827] p-4 md:p-0">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#F59E0B]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#F59E0B]">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#F59E0B]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#F59E0B]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#F59E0B]">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#F59E0B]">
                    About-us
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 p-4 md:p-0">
              <Link to="/login">
                <button className="text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white py-2 px-4 rounded-md font-bold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-2 px-4 rounded-md font-bold">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative flex items-center">
              <Popover>
                <Popover.Button className="text-4xl text-[#1E3A8A]">
                  <FaUserCircle className="cursor-pointer" />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-4">
                    <div className="flex gap-4 items-center">
                      <FaUserCircle className="text-3xl text-[#1E3A8A]" />
                      <div>
                        <h4 className="font-medium text-[#111827]">
                          {user.fullname}
                        </h4>
                        <p className="text-sm text-[#9CA3AF]">
                          {user.profile.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-[#111827]">
                      {user && user.role === "student" && (
                        <div className="flex items-center gap-4 cursor-pointer">
                          <User2 />
                          <Link
                            to="/profile"
                            className="text-[#1E3A8A] font-bold"
                          >
                            View Profile
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center gap-4 cursor-pointer font-bold">
                        <LogOut />
                        <button
                          onClick={logoutHandler}
                          className="text-[#1E3A8A] underline"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
