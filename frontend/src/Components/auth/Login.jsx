import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
// import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";

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
          headers: {
            "Content-Type": "application/json",
          },
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
      toast.error(error.response.data.message);
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
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1 p-4">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-lg p-8"
          >
            <h1 className="text-2xl font-semibold mb-6 text-[#1E3A8A]">
              Login
            </h1>

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
                placeholder="Enter a email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1E3A8A] focus:border-[#1E3A8A] sm:text-sm"
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
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1E3A8A] focus:border-[#1E3A8A] sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700">
                  Role
                </legend>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="student"
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
                      type="radio"
                      id="recruiter"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-[#1E3A8A] border-gray-300 focus:ring-[#1E3A8A]"
                    />
                    <label
                      htmlFor="recruiter"
                      className="text-sm text-gray-700"
                    >
                      Recruiter
                    </label>
                  </div>
                </div>
              </fieldset>
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
                "Login"
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don t have an account?{" "}
              <Link to="/signup" className="text-[#1E3A8A] hover:underline">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
