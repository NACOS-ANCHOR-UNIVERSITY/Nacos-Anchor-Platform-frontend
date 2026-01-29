import {
  Flag,
  LayoutGrid,
  Calendar,
  Mail,
  Link as LinkIcon,
} from "lucide-react";
import Communication from "../../assets/images/communication.png";
import Collaboration from "../../assets/images/collaboration.png";
import Innovation from "../../assets/images/innovation.png";
import Person1 from "../../assets/images/person1.png";
import Person2 from "../../assets/images/person2.png";
import Person3 from "../../assets/images/person3.png";
import Person4 from "../../assets/images/person4.png";

const AboutUs = () => {
  const coreMission = [
    {
      icon: Collaboration,
      heading: "Collaboration",
      description:
        "Creating a unified network where students from 100L to 400L can connect, share resources, and foster peer-to-peer learning environments.",
    },
    {
      icon: Communication,
      heading: "Communication",
      description:
        "Bridging the information gap between the department faculty and the student body through transparent and timely digital channels.",
    },
    {
      icon: Innovation,
      heading: "Innovation",
      description:
        "Encouraging students to build real-world solutions. We support hackathons, workshops, and project showcases that solve local problems.",
    },
  ];

  const timelineData = [
    {
      year: "2018",
      title: "Chapter Establishment",
      description:
        "NACOS Anchor University chapter was officially inaugurated, setting the foundation for student-led technological growth on campus.",
      IconComponent: Flag,
    },
    {
      year: "2020",
      title: "Inaugural Tech Week",
      description:
        "Despite global challenges, we hosted our first hybrid Tech Week, featuring guest speakers from major Nigerian tech firms.",
      IconComponent: Calendar,
    },
    {
      year: "2023",
      title: "Digital Platform Launch",
      description:
        "The launch of this centralized portal to streamline dues, event registration, and academic resources for all students.",
      IconComponent: LayoutGrid,
    },
  ];

  const teamMembers = [
    {
      name: "God’swill Omosigho",
      role: "President",
      image: Person1,
      socials: {
        email: "",
        linkedin: "",
      },
    },
    {
      name: "Julia Frances",
      role: "Vice President",
      image: Person2,
      socials: {
        email: "",
        linkedin: "",
      },
    },
    {
      name: "Raphael Fulfilled",
      role: "Gen. Secretary",
      image: Person3,
      socials: {
        email: "",
        linkedin: "",
      },
    },
    {
      name: "Jerrie",
      role: "Financial Sec.",
      image: Person4,
      socials: {
        email: "",
        linkedin: "",
      },
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-8 md:px-18 lg:px-30 min-h-screen w-full flex flex-col justify-center items-center gap-20 bg-[#F6F8F5]">
      {/* Core Mission Section */}
      <section className="flex flex-col items-center">
        <h1 className="text-[#0F172A] text-[24px] md:text-[36px] font-bold">
          Our Core Mission
        </h1>
        <p className="text-sm sm:text-[18px] font-normal text-[#475569] text-center max-w-2xl">
          Driven by a commitment to excellence, student welfare, and
          technological advancement within the university ecosystem.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 mt-10 w-full">
          {coreMission.map(({ icon, heading, description }, index) => (
            <div
              className="bg-white rounded-2xl border-[#E2E8F0] border-2 p-6 flex-1"
              key={index}
            >
              <div className="p-5 bg-[#E8F3E6] rounded-xl w-16 h-16 flex items-center justify-center">
                <img src={icon} alt={heading} className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-[#0F172A] text-[18px] md:text-[20px] font-bold mt-4">
                  {heading}
                </h2>
                <p className="text-[#475569] text-sm md:text-base font-normal mt-2">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History of the Chapter section */}

      <section className="flex flex-col items-center justify-center w-full max-w-3xl mt-10">
        <p className="uppercase text-brand-primary text-[14px] font-bold">
          our journey
        </p>
        <h1 className="text-[#0F172A] text-[20px] md:text-[30px] font-bold">
          History of the Chapter
        </h1>

        <div className="relative mt-10 w-full">
          <div className="absolute left-8 top-4 bottom-0 w-0.5 bg-[#E2E8F0] -translate-x-1/2"></div>

          <div className="flex flex-col gap-10">
            {timelineData.map(
              ({ year, title, description, IconComponent }, index) => (
                <div className="flex items-start gap-6 relative" key={index}>
                  <div className="w-16 h-16 rounded-full bg-[#E8F3E6] border-4 border-[#D0E6CC] z-10 shrink-0 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[#138601]" />
                  </div>

                  <div className="pt-2">
                    <div className="w-11.5 h-6 py-4 px-7 flex items-center justify-center bg-[#E0EDDD] rounded-lg">
                      <p className="text-brand-primary font-bold">{year}</p>
                    </div>
                    <h2 className="text-[#0F172A] text-[18px] md:text-[20px] font-bold">
                      {title}
                    </h2>
                    <p className="text-[#475569] text-sm md:text-[16px] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Executive section */}
      <section className="flex flex-col items-center mt-10">
        <h1 className="text-[#0F172A] text-[24px] md:text-[36px] font-bold">
          Meet the Executives
        </h1>
        <p className="text-sm sm:text-[18px] font-normal text-[#475569] text-center max-w-2xl mt-2">
          The team working behind the scenes to serve the department.
        </p>

        <div className="flex flex-wrap gap-10 justify-center mt-10">
          {teamMembers.map(({ name, socials, image, role }, index) => (
            <div key={index} className="flex flex-col items-center mt-10">
              <img
                src={image}
                alt={name}
                className="w-38 h-38 rounded-full object-cover shadow-md border-4 border-white"
              />
              <h2 className="text-[#0F172A] text-[18px] font-bold mt-4">
                {name}
              </h2>
              <p className="text-brand-primary text-sm md:text-[14px] font-medium my-2">
                {role}
              </p>

              {/* Executive social links */}
              <div className="flex gap-4 mt-2 items-center">
                <a href={socials.email}>
                  <Mail className="w-5 h-5 text-[#64748B] hover:text-[#138601]" />
                </a>
                <a href={socials.linkedin}>
                  <LinkIcon className="w-5 h-5 text-[#64748B] hover:text-[#138601]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <div className="flex flex-col justify-center items-center text-white bg-brand-primary text-center p-10 gap-6 rounded-3xl mt-10 w-full max-w-3xl">
        <h1 className="font-black text-[30px]">
          Ready to be part of the movement?
        </h1>
        <p className="text-sm md:text-[18px] max-w-xl">
          Join NACOS Anchor University today to access exclusive resources,
          mentorship, and event updates.
        </p>
        <div className="flex gap-4">
          {/* convert to Link once react router is implemented */}
          {/* <Link to="/register">Register on Portal</Link>
              <Link to="/support">Contact Support</Link> */}

          <button className="bg-white text-brand-primary font-bold px-6 py-2 rounded-lg">
            Register on Portal
          </button>
          <button className="border border-white text-white font-bold px-6 py-2 rounded-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
