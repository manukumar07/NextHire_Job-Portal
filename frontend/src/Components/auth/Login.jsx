import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react"; // Added icons
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import axios from "axios";
import Navbar from "../layout/Navbar";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#6A38C2] to-[#F59E0B] flex flex-col">
        <Navbar />

        {/* Center Form */}
        <div className="flex items-center justify-center flex-1 px-4 mt-24 mb-10">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-[#1E3A8A]">
              Welcome Back 👋
            </h1>

            {/* Email Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] sm:text-sm 
                  transition-all duration-300 hover:border-[#6A38C2]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] sm:text-sm 
                  transition-all duration-300 hover:border-[#6A38C2]"
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </span>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
                  />
                  <span className="text-sm text-gray-700">Student</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
                  />
                  <span className="text-sm text-gray-700">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-white font-medium 
              transition-all duration-300 transform ${
                loading
                  ? "bg-[#1E3A8A] cursor-wait"
                  : "bg-[#6A38C2] hover:bg-[#5b30a6] hover:scale-105"
              } focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Signup Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#1E3A8A] hover:text-[#F59E0B] font-semibold transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
