// import { useState } from "react";
// import Navbar from "./Navbar";
// import { Contact, Mail, Pen } from "lucide-react";
// import AppliedJobTable from "./AppliedJobTable";
// import UpdateProfileDialog from "./UpdateProfileDialog";
// import { useSelector } from "react-redux";
// import useGetAppliedJobs from "../hooks/useGetAppliesdJobs";

// // const skills = ["Html", "Css", "Javascript", "Reactjs"]
// const isResume = true;

// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
//           <div className="flex items-center gap-4">
//             <avatar className="h-24 w-24">
//               <avatarImage src="" alt="profile" />
//             </avatar>
//             <div>
//               <h1 className="font-medium text-xl text-[#111827]">
//                 {user?.fullname}
//               </h1>
//               <p className="text-gray-800">{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setOpen(true)}
//             className="mt-4 md:mt-0 text-right border-[#1E3A8A] text-[#1E3A8A]"
//           >
//             <Pen />
//           </button>
//         </div>
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail className="text-[#1E3A8A]" />
//             <span>{user?.email}</span>
//           </div>
//           <div className="flex items-center gap-3 my-2">
//             <Contact className="text-[#1E3A8A]" />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>
//         <div className="my-5">
//           <h1 className="font-semibold text-[#111827]">Skills</h1>
//           <div className="flex flex-wrap items-center gap-2">
//             {user?.profile?.skills.length !== 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <badge key={index} className="bg-[#E0E7FF] text-[#1E3A8A]">
//                   {item}
//                 </badge>
//               ))
//             ) : (
//               <span className="text-gray-500">NA</span>
//             )}
//           </div>
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <label className="text-md font-bold text-[#111827]">Resume</label>
//           {isResume ? (
//             <a
//               target="_blank"
//               href={user?.profile?.resume}
//               className="text-[#1E3A8A] hover:underline"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span className="text-gray-500">NA</span>
//           )}
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
//         <h1 className="font-bold text-lg my-5 text-[#111827]">Applied Jobs</h1>
//         {/* Applied Job Table */}
//         <AppliedJobTable />
//       </div>
//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Profile;
import { useState } from "react";
import Navbar from "./Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliesdJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar with profile picture */}
            <div className="h-24 w-24 rounded-full overflow-hidden border border-gray-300">
              <img
                src={user?.profile?.avatar || "/path-to-default-avatar.png"} // Add a default avatar if none exists
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-medium text-xl text-[#111827]">
                {user?.fullname}
              </h1>
              <p className="text-gray-800">{user?.profile?.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 md:mt-0 text-right border-[#1E3A8A] text-[#1E3A8A]"
          >
            <Pen />
          </button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-[#1E3A8A]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="text-[#1E3A8A]" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-semibold text-[#111827]">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <span
                  key={index}
                  className="bg-[#E0E7FF] text-[#1E3A8A] px-2 py-1 rounded-md"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold text-[#111827]">Resume</label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-[#1E3A8A] hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
        <h1 className="font-bold text-lg my-5 text-[#111827]">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
