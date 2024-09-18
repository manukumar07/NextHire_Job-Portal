import company1Logo from "../assets/1.png";
import company2Logo from "../assets/2.png";
import company3Logo from "../assets/3.png";
import company4Logo from "../assets/4.png";
import company5Logo from "../assets/fb.jpg";
import company6Logo from "../assets/6.png";
import company7Logo from "../assets/7.png";
import company8Logo from "../assets/8.png";
import company9Logo from "../assets/9.png";
import company10Logo from "../assets/10.png";

const TopCompaniesHire = () => {
  // Array of companies with their logos and names
  const companies = [
    { name: "Google", logo: company1Logo },
    { name: "Microsoft", logo: company2Logo },
    { name: "Apple", logo: company3Logo },
    { name: "Samsung", logo: company4Logo },
    { name: "facebook", logo: company5Logo },
    { name: "Amazon", logo: company6Logo },
    { name: "Netflix", logo: company7Logo },
    { name: "Tcs", logo: company8Logo },
    { name: "Capegimini", logo: company9Logo },
    { name: "Wipro", logo: company10Logo },
  ];

  return (
    <div className="w-full bg-[#F9FAFB] p-6 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center">
        Top Companies Hiring
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={company.logo}
              alt={company.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <span className="text-[#111827] text-sm text-center">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompaniesHire;
