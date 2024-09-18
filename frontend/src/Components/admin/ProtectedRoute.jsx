import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/"); // Redirect if user is not authenticated or not a recruiter
    }
  }, [user, navigate]); // Include user and navigate in the dependency array

  return <>{children}</>; // Ensure children are rendered properly
};

export default ProtectedRoute;
