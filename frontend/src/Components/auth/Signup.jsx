import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#6A38C2] to-[#f0bb60] flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1 p-4 mt-24 mb-10">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-[1.01]"
          >
            {/* Heading with Animated Icon */}
            <h1 className="text-3xl font-bold mb-6 text-center text-[#1E3A8A]">
              Create Account
            </h1>
            {/* Fullname */}
            <div className="mb-2">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Enter your full name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="example@example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="1234567890"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div className="mb-4 flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#F59E0B]"
                />
                <label htmlFor="student" className="text-sm text-gray-700">
                  Student
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#F59E0B]"
                />
                <label htmlFor="recruiter" className="text-sm text-gray-700">
                  Recruiter
                </label>
              </div>
            </div>

            {/* Profile Pic */}
            <div className="mb-4 flex items-center space-x-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Pic
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>

            {/* Gradient Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold shadow-md bg-gradient-to-r from-[#1E3A8A] via-[#6A38C2] to-[#F59E0B] hover:opacity-90 transition-all duration-300`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </div>
              ) : (
                "Sign Up"
              )}
            </motion.button>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6A38C2] font-medium hover:underline hover:text-[#F59E0B] transition-colors"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
