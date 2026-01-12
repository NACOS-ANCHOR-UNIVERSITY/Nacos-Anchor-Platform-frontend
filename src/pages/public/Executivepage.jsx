import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail,Star,Users, User, Linkedin, Twitter } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
// import client from '@/config/axios-client'; // Uncomment when API is ready

// Mock data for development (remove when API is ready)
const mockExecutives = {
  president: {
    name: "OMOSIGHO GODSWILL",
    image: "https://ui-avatars.com/api/?name=Omodosho+Godswill&size=200&background=128401&color=fff",
    bio: "Leading the vision for a digital transformation in the department. Committed to serving every student's interest and bridging the gap between students and the faculty management.",
    email: "president@nacos.edu",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  council: [
    {
      name: "JULIA FRANCES",
      position: "Vice President",
      image: "https://ui-avatars.com/api/?name=Alex+Johnson&size=200&background=128401&color=fff",
      bio: "Ensuring smooth operations and suppodting welfare initiatives across all levels.",
      email: "vp@nacos.edu",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      name: "EZIRIM KINGDOM",
      position: "Software Director",
      image: "https://ui-avatars.com/api/?name=Emmanuel+Brown&size=200&background=128401&color=fff",
      bio: "Managing communications and documentation for the executive council.",
      email: "secretary@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "RAPHEAL FULFILLED",
      position: "General Secretary",
      image: "https://ui-avatars.com/api/?name=Sarah+Williams&size=200&background=128401&color=fff",
      bio: "Overseeing financial operations and ensuring transparency in all transactions.",
      email: "general@nacos.edu",
      twitter: "https://twitter.com"
    },
    {
      name: "IYANDA JERRIE",
      position: "Financial Secretary",
      image: "https://ui-avatars.com/api/?name=Michael+Davis&size=200&background=128401&color=fff",
      bio: "Managing the association's funds and financial planning.",
      email: "finance@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "FAITHFUL",
      position: "Legislative Officer I",
      image: "https://ui-avatars.com/api/?name=Favour+Wilson&size=200&background=128401&color=fff",
      bio: "Public Relations Officer handling media and external communications.",
      email: "legislative@nacos.edu",
      twitter: "https://twitter.com"
    },
    {
      name: "NORUWA CALEB",
      position: "Director of Sports",
      image: "https://ui-avatars.com/api/?name=Daniel+Moore&size=200&background=128401&color=fff",
      bio: "Organizing social events and fostering community engagement.",
      email: "sports@nacos.edu"
    },
    {
      name: "OKEOGHENE",
      position: "Welfare Director",
      image: "https://ui-avatars.com/api/?name=Grace+Taylor&size=200&background=128401&color=fff",
      bio: "Ensuring the wellbeing and welfare of all NACOS members.",
      email: "welfare@nacos.edu",
      linkedin: "https://linkedin.com"
    },
    {
      name: "TREASURE",
      position: "Treasurer",
      image: "https://ui-avatars.com/api/?name=James+Anderson&size=200&background=128401&color=fff",
      bio: "Coordinating sports activities and inter-departmental competitions.",
      email: "treasure@nacos.edu",
      twitter: "https://twitter.com"
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
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8 ml-10">
              <Star className=" text-green-700 "/>
              <h2 className="text-2xl font-bold text-gray-900">The President</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border  border-gray-200 p-8 max-w-4xl px-6 max-w-[1274px] flex items-center justify-center">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className= "rounded-full bg-green-50">
                <User className="w-32 h-32 object-cover text-green-200"/>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {executives.president.name}
                  </h3>
                  <p className="text-[#128401] font-semibold mb-3">President</p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {executives.president.bio || 'Leading the NACOS community with a vision for academic excellence and student empowerment.'}
                  </p>
                  <div className="flex gap-3">
                    {executives.president.email && (
                      <a
                        href={`mailto:${executives.president.email}`}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {executives.president.linkedin && (
                      <a
                        href={executives.president.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {executives.president.twitter && (
                      <a
                        href={executives.president.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
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
                <Users className="text-green-700"/>
                <h2 className="text-2xl font-bold text-gray-900">Executive Council</h2>
              </div>
              <span className="text-sm text-gray-500">
                {executives.council.length} Members
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {executives.council.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                <div className= "rounded-full bg-green-50 p-5 m-5">
                <User className="w-32 h-32 object-cover text-green-200 justify-center "/>
                </div>

                 {/* <img
                    src={member.image || '/placeholder-avatar.jpg'}
                    alt={member.name}
                    className="w-20 h-20 rounded-lg object-cover mx-auto mb-4"
                  />*/}

                  <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#128401] text-sm font-semibold text-center mb-3">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                  <div className="flex gap-2 justify-center">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5" />
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