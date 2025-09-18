import { useState } from "react";
import Navbar from "./Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "../jobs/AppliedJobTable";
import UpdateProfileDialog from "../sections/UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliesdJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className=" min-h-screen font-sans">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto  border-[#D1D5DB] rounded-2xl my-8 p-8 shadow-lg transition-all duration-300 hover:shadow-xl mt-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-[#1E3A8A] shadow-sm transition-transform duration-300 hover:scale-105">
              <img
                src={user?.profile?.avatar || "/path-to-default-avatar.png"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-[#1E3A8A]">
                {user?.fullname}
              </h1>
              <p className="text-[#4B5563] mt-1">
                {user?.profile?.bio || "No bio added yet"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 md:mt-0 text-[#1E3A8A] border border-[#1E3A8A] px-3 py-2 rounded-lg font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
          >
            <Pen />
          </button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-2">
          <div className="flex items-center gap-3 text-[#111827]">
            <Mail className="text-[#1E3A8A] w-5 h-5" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-[#111827]">
            <Contact className="text-[#1E3A8A] w-5 h-5" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="font-semibold text-[#1E3A8A] text-lg mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-[#E0E7FF] to-[#C7D2FE] text-[#1E3A8A] font-medium text-sm shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-[#9CA3AF]">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <label className="font-bold text-[#1E3A8A] mb-1 block">Resume</label>
          {isResume && user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E3A8A] font-medium hover:underline hover:text-[#3B82F6] transition-colors duration-300"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-[#9CA3AF]">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl mb-8">
        <h1 className="font-bold text-xl text-[#1E3A8A] mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
