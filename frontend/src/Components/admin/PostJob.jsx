import { useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center w-full my-5 p-6">
        <form
          onSubmit={submitHandler}
          className="p-6 sm:p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#1E3A8A]">Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Requirements</label>
              <input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Salary</label>
              <input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Experience Level</label>
              <input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">No of Position</label>
              <input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            {companies.length > 0 && (
              <div className="col-span-2">
                <label className="text-[#1E3A8A]">Company</label>
                <select
                  className="w-full border border-[#D1D5DB] p-2 rounded focus:outline-none"
                  onChange={selectChangeHandler}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Company
                  </option>
                  {companies.map((company) => (
                    <option
                      key={company._id}
                      value={company.name.toLowerCase()}
                    >
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {loading ? (
            <button className="w-full my-4 bg-[#1E3A8A] text-white flex items-center justify-center py-2 rounded hover:bg-[#1E40AF]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full my-4 bg-[#1E3A8A] text-white py-2 rounded hover:bg-[#1E40AF]"
            >
              Post New Job
            </button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
