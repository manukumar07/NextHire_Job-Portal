import { useEffect } from "react";
import Navbar from "../Components/layout/Navbar";
import HeroSection from "../Components/sections/HeroSection";
import CategoryCarousel from "../Components/sections/CategoryCarousel";
import LatestJobs from "../Components/jobs/LatestJobs";
import Footer from "../Components/layout/Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobCounters from "../Components/sections/JobCounters";
import Testimonial from "../Components/sections/Testimonial";
import HowItWorks from "../Components/sections/HowItsworks";
import CTA from "../Components/sections/CTA";
import CategoriesPage from "../Components/sections/CategoryPage";
import WhyChooseNextHire from "../Components/sections/WhyChooseNextHire";

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
      <CategoriesPage />
      <JobCounters />
      <Testimonial />
      <WhyChooseNextHire />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
