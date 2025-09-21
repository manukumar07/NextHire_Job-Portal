import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

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
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
        open ? "block" : "hidden"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg  w-full p-6 transform transition-all duration-300 scale-100 hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
          Update Profile
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber", type: "text" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Skills (comma-separated)", name: "skills", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-[#1E3A8A] font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={input[field.name]}
                onChange={changeEventHandler}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition duration-200"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-[#1E3A8A] font-medium mb-1">Resume</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-[#1E3A8A] transition duration-200"
            />
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white font-semibold rounded-lg py-2 px-4 mt-2 hover:scale-105 transition-transform duration-200`}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? "Please wait" : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
