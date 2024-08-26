// import { useState } from "react";
// import { Link } from "react-router-dom"; // If you are using React Router for navigation
// import { FiX } from "react-icons/fi"; // Close icon from react-icons

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="bg-[#003366] text-[#F4F4F4] shadow-md">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         <div className="text-xl font-bold">
//           <Link to="/" className="text-[#F1C40F] hover:text-[#F4F4F4]">
//             JobPortal
//           </Link>
//         </div>
//         <div className="hidden md:flex items-center flex-grow justify-center space-x-6">
//           <Link to="/" className="hover:text-[#F1C40F]">
//             Home
//           </Link>
//           <Link to="/jobs" className="hover:text-[#F1C40F]">
//             Jobs
//           </Link>
//           <Link to="/about" className="hover:text-[#F1C40F]">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-[#F1C40F]">
//             Contact
//           </Link>
//         </div>
//         <div className="hidden md:flex items-center space-x-4">
//           <Link
//             to="/login"
//             className="bg-[#F1C40F] text-[#003366] px-4 py-2 rounded hover:bg-[#e0b53b] font-bold"
//           >
//             Login
//           </Link>
//         </div>
//         <button className="md:hidden text-[#F1C40F]" onClick={toggleMenu}>
//           {isOpen ? (
//             <FiX className="w-6 h-6" />
//           ) : (
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           )}
//         </button>
//       </div>
//       <div
//         className={`md:hidden ${
//           isOpen ? "block" : "hidden"
//         } absolute top-16 left-0 w-full bg-[#003366] text-[#F4F4F4]`}
//       >
//         <div className="flex flex-col items-center">
//           <Link
//             to="/"
//             className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
//           >
//             Home
//           </Link>
//           <Link
//             to="/jobs"
//             className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
//           >
//             Jobs
//           </Link>
//           <Link
//             to="/about"
//             className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
//           >
//             About
//           </Link>
//           <Link
//             to="/contact"
//             className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
//           >
//             Contact
//           </Link>
//           <Link
//             to="/login"
//             className="block px-6 py-3 mt-4 bg-[#F1C40F] text-[#003366] rounded text-lg font-semibold text-center hover:bg-[#e0b53b] text-white"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you are using React Router for navigation
import { FiX } from "react-icons/fi"; // Close icon from react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#003366] text-[#F4F4F4] shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">
          <Link to="/" className="text-[#F1C40F] hover:text-[#F4F4F4]">
            JobPortal
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-grow justify-center space-x-6">
          <Link to="/" className="hover:text-[#F1C40F]">
            Home
          </Link>
          <Link to="/jobs" className="hover:text-[#F1C40F]">
            Jobs
          </Link>
          <Link to="/about" className="hover:text-[#F1C40F]">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#F1C40F]">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-[#F1C40F] text-[#003366] px-4 py-2 rounded hover:bg-[#e0b53b] font-bold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#00A3E0] text-[#F4F4F4] px-4 py-2 rounded hover:bg-[#008ACF] font-bold"
          >
            Sign Up
          </Link>
        </div>
        <button className="md:hidden text-[#F1C40F]" onClick={toggleMenu}>
          {isOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-[#003366] text-[#F4F4F4]`}
      >
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-[#00A3E0] w-full text-center"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block px-6 py-3 mt-4 bg-[#F1C40F] text-[#003366] rounded text-lg font-semibold text-center hover:bg-[#e0b53b]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-6 py-3 mt-4 bg-[#00A3E0] text-[#F4F4F4] rounded text-lg font-semibold text-center hover:bg-[#008ACF]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
