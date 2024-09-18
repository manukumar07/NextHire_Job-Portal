import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Footer from "../Footer";
// import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";

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

  //
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file); // Ensure 'file' is appended
    }

    try {
      // dispatch(setLoading(true));
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
        console.log("Data recieved", res.data);
      }
    } catch (error) {
      console.log(error);
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
      <div className="min-h-screen bg-gray-100 flex flex-col ">
        <Navbar />
        <div className="flex items-center justify-center flex-1 p-4">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8"
          >
            <h1 className="text-3xl font-semibold mb-6 text-[#1E3A8A] text-center">
              Sign Up
            </h1>

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
                placeholder="Enter a name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
              />
            </div>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
              />
            </div>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
              />
            </div>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
              />
            </div>

            <div className="mb-4">
              <radioGroup className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    id="student"
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
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
                    className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
                  />
                  <label htmlFor="recruiter" className="text-sm text-gray-700">
                    Recruiter
                  </label>
                </div>
              </radioGroup>
            </div>

            <div className="mb-4 flex items-center space-x-4">
              <label
                htmlFor="file"
                className="block text-sm font-small text-gray-700"
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

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading
                  ? "bg-[#1E3A8A] cursor-wait"
                  : "bg-[#6A38C2] hover:bg-[#5b30a6]"
              } focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1E3A8A] hover:underline">
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
