import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
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
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
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
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col transition-all duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg animate-slideUp mt-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-[#9CA3AF] border border-[#9CA3AF] px-3 py-1 rounded hover:text-[#1E3A8A] hover:border-[#1E3A8A] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-[#1E3A8A] font-bold text-2xl">Company Setup</h1>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Company Name",
                name: "name",
                type: "text",
                placeholder: "Enter the company name",
              },
              {
                label: "Description",
                name: "description",
                type: "text",
                placeholder: "Enter a short description about the company",
              },
              {
                label: "Website",
                name: "website",
                type: "text",
                placeholder: "https://www.companywebsite.com",
              },
              {
                label: "Location",
                name: "location",
                type: "text",
                placeholder: "City, State or Remote",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-[#1E3A8A] font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={input[field.name]}
                  placeholder={field.placeholder}
                  onChange={changeEventHandler}
                  className="mt-1 w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all duration-300"
                />
              </div>
            ))}

            {/* Logo */}
            <div>
              <label className="text-[#1E3A8A] font-medium">Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 w-full p-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <button className="w-full flex items-center justify-center py-2 rounded-lg bg-[#1E3A8A] text-white hover:bg-[#1E40AF] transition-all duration-300">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#1E40AF] transition-all duration-300"
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
