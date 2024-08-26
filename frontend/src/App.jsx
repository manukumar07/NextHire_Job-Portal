// src/App.jsx
// import React from "react";
import Jobs from "./Components/Pages/Jobs";
import About from "./Components/Pages/About";
import Home from "./Components/Home";
import Navbar from "./Components/Pages/Navbar";
import Login from "./Components/Pages/Login";
import Contact from "./Components/Pages/Contact";
import Signup from "./Components/Pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // If using React Router
import Footer from "./Components/Pages/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
