import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, CheckCircle, Users, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
// import client from '@/config/axios-client'; // Uncomment when API is ready

// Mock data for development (remove when API is ready)
const mockExecutives = {
  president: {
    name: "OMOSIGHO GODSWILL",
    image: "/president_image.png",
    bio: "Leading the vision for a digital transformation in the department. Committed to serving every student's interest and bridging the gap between students and the faculty management.",
    email: "president@nacos.edu",
    linkedin: "https://linkedin.com",
  },
  council: [
    {
      name: "JULIA FRANCES",
      position: "Vice President",
      image: "/vice_president_image.png",
      icon:"/vice_president_icon.svg",
      bio: "Ensuring smooth operations and suppodting welfare initiatives across all levels.",
      email: "vp@nacos.edu",
      linkedin: "https://linkedin.com",
      
    },
    {
      name: "EZIRIM KINGDOM",
      position: "Software Director",
      image: "/software_director_image.png",
      icon:"/software_director_icon.svg",
      bio: "Managing communications and documentation for the executive council.",
      email: "secretary@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "RAPHEAL FULFILLED",
      position: "General Secretary",
      image: "/general_secretary_image.png",
      icon:"/general_secretary_icon.svg",
      bio: "Overseeing financial operations and ensuring transparency in all transactions.",
      email: "general@nacos.edu",
      linkedin:"https://linkedin.com"
    },
    {
      name: "IYANDA JERRIE",
      position: "Financial Secretary",
      image: "/financial_secretary_image.png",
      icon:"/financial_secretary_icon.svg",
      bio: "Managing the association's funds and financial planning.",
      email: "finance@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "FAITHFUL",
      position: "Legislative Officer I",
      image: "/legislative_officer_image.png",
      icon:"/legislative_officer_icon.svg",
      bio: "Public Relations Officer handling media and external communications.",
      email: "legislative@nacos.edu",
      twitter: "https://twitter.com"
    },
    {
      name: "NORUWA CALEB",
      position: "Director of Sports",
      image: "/director_sports_image.png",
      icon:"/director_sports_icon.svg",
      bio: "Organizing social events and fostering community engagement.",
      email: "sports@nacos.edu"
    },
    {
      name: "OKEOGHENE",
      position: "Welfare Director",
      image: "/welfare_director_image.png",
      icon:"/welfare_director_icon.svg",
      bio: "Ensuring the wellbeing and welfare of all NACOS members.",
      email: "welfare@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "TREASURE",
      position: "Treasurer",
      image: "/treasurer_image.png",
      icon:"/treasurer_icon.svg",
      bio: "Coordinating sports activities and inter-departmental competitions.",
      email: "treasure@nacos.edu",
      linkedin: "https://linkedin.com"
    }
  ]
};

// Fetch executives data
const fetchExecutives = async () => {
  // TODO: Uncomment when API is ready
  // const response = await client.get('/executives');
  // return response.data;

  // Using mock data for now
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockExecutives), 500);
  });
};

const Executivepage = () => {
  const { data: executives, isLoading, error } = useQuery({
    queryKey: ['executives'],
    queryFn: fetchExecutives,
  });

  return (
    <div className="min-h-screen bg-[#f8f9f7]">
      <section className="bg-gradient-to-b from-[#0a6b01] via-[#0a5001] to-[#0a3001] text-white mx-auto my-6 rounded-[16px] px-6 max-w-[1274px] h-[400px] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Meet Our Executives
          </h1>
          <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Dedicated student leaders committed to academic excellence, innovation, and
            fostering a collaborative community for the 2023/2024 session.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-[#128401] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg">
            <Mail className="w-5 h-5" />
            Contact the Team
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#128401] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading executives...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error loading executives</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        {/* President Section */}
        {executives?.president && (
          <section className="mb-16 mr-5 pr-9">
            <div className="flex items-center gap-3 mb-8">
              <img 
              src="/president.svg"/>
              <h2 className="text-2xl font-bold text-gray-900">The President</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-5xl ">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* President Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-64 h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={executives.president.image}
                      alt={executives.president.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* President Info */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 ">
                    {executives.president.name}
                  </h3>
                  <img
                  src="/president_icon.jpg"
                  className="mb-5"/>
                  <p className="text-gray-600 leading-relaxed mb-6 text-base">
                    {executives.president.bio || 'Leading the NACOS community with a vision for academic excellence and student empowerment.'}
                  </p>
                  <div className="flex gap-3">
                    {executives.president.email && (
                      <a
                        href={`mailto:${executives.president.email}`}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-white  transition-colors shadow-md"
                        title="Email"
                      >
                        <img
                        src="/email.svg"
                        />
                      </a>
                    )}
                    {executives.president.linkedin && (
                      <a
                        href={executives.president.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#128401] text-white hover:bg-[#0f6b01] transition-colors shadow-md"
                        title="LinkedIn"
                      >
                        <img
                        src="/Link.svg"/>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Executive Council Section */}
        {executives?.council && executives.council.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img 
                src="/executive.svg"/>
                <h2 className="text-2xl font-bold text-gray-900">Executive Council</h2>
              </div>
              <div className="">
              <span className="text-sm text-gray-500 flex-items-center gap-2 font-medium">
                View All Roles 
                <img
                src="/up_arrow.svg"
                />
              </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {executives.council.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Profile Image with Online Status */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online Status Indicator */}
                   
                    <div className="absolute bottom-2 right-1/2 transform translate-x-12 w-8 h-8 rounded-full border-4 flex items-center justify-center">
                     <img
                    src={member.icon}/>
                    </div>
                  </div>

                  {/* Member Info */}
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#128401] text-sm font-semibold text-center mb-3">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {/* Social Icons */}
                  <div className="flex gap-2 justify-center pt-4 border-t border-gray-100">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#128401] text-white hover:bg-[#0f6b01] transition-colors shadow-sm"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#128401] text-white hover:bg-[#0f6b01] transition-colors shadow-sm"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#128401] text-white hover:bg-[#0f6b01] transition-colors shadow-sm"
                        title="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Executivepage;