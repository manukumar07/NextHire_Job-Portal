import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        open ? "block" : "hidden"
      }`}
      onClick={() => setOpen(false)}
    >
      <div className="flex justify-center items-center min-h-screen p-4">
        <div
          className="bg-background rounded-lg shadow-lg max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold text-text mb-4">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="text-text">
                  Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-text">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-text">
                  Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bio" className="text-text">
                  Bio
                </label>
                <input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="skills" className="text-text">
                  Skills (comma-separated)
                </label>
                <input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="file" className="text-text">
                  Resume
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              {loading ? (
                <button className="w-full flex items-center justify-center bg-primary text-white rounded-md py-2 px-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-primary text-white rounded-md py-2 px-4"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
