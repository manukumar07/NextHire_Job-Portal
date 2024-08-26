import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("student"); // Default role is student

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#FF5722]">
        Sign Up
      </h2>

      {/* Profile Image Upload */}
      <div className="mb-4 text-center relative">
        <label htmlFor="profileImageUpload" className="cursor-pointer">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form Fields */}
      <form>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Role</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={handleRoleChange}
                className="mr-1"
              />
              I am a Student
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={role === "recruiter"}
                onChange={handleRoleChange}
                className="mr-1"
              />
              I am a Recruiter
            </label>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-2 px-3 bg-[#FF5722] text-white rounded-lg hover:bg-[#E64A19] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
        >
          Sign Up
        </button>
      </form>

      {/* Already Have an Account */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#FF5722] hover:underline">
          Go to login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
