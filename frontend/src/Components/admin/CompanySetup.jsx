import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/companies")}
            className="text-[#9CA3AF] border-[#9CA3AF] flex items-center gap-2 hover:text-[#6B7280] hover:border-[#6B7280]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="font-bold text-[#1E3A8A] text-xl">Company Setup</h1>
        </div>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#1E3A8A]">Company Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Website</label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="text-[#1E3A8A]">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="border border-[#D1D5DB] rounded p-2 w-full"
              />
            </div>
          </div>
          {loading ? (
            <button className="w-full bg-[#1E3A8A] text-white flex items-center justify-center py-2 rounded hover:bg-[#1E40AF]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white py-2 rounded hover:bg-[#1E40AF]"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
