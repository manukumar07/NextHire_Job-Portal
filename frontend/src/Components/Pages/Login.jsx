// import React from "react";
import { Link } from "react-router-dom"; // If you are using React Router for navigation
import { FaGoogle } from "react-icons/fa"; // Google icon from react-icons

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9] p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#FF5722]">Login</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#212121] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md border-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#212121] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md border-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF5722] text-white py-2 px-4 rounded-md hover:bg-[#E64A19] focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-md font-bold"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-[#212121]">Or</p>
          <button className="mt-4 flex items-center justify-center w-full bg-[#4285F4] text-white py-2 px-4 rounded-md hover:bg-[#357ae8] focus:outline-none focus:ring-2 focus:ring-[#4285F4] text-md font-semibold">
            <FaGoogle className="w-5 h-5 mr-2" /> {/* Google icon */}
            Login with Google
          </button>
        </div>
        {/* <div className="mt-4 text-center">
          <Link to="/signup" className="text-[#FF5722] hover:underline">
            Dnt have an account? SignUp
          </Link>
        </div> */}
        <p className="mt-4 text-center">
          Dnt have an account?{" "}
          <Link to="/signup" className="text-[#FF5722] hover:underline">
            Go SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
