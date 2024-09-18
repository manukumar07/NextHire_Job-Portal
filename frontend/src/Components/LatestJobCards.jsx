import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-background border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg text-text">{job?.company?.name}</h1>
        <p className="text-sm text-secondary">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-text">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="bg-secondary text-primary font-bold px-2 py-1 rounded">
          {job?.position} Positions
        </span>
        <span className="bg-accent text-white font-bold px-2 py-1 rounded">
          {job?.jobType}
        </span>
        <span className="bg-primary text-white font-bold px-2 py-1 rounded">
          {job?.salary} LPA
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
