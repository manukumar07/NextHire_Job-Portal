import { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import About from "./About";
import TopCompaniesHire from "./TopCompanyHire";
import JobCounters from "./JobCounters";
import Testimonial from "./Testimonial";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <TopCompaniesHire />
      <JobCounters />
      <Testimonial />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
