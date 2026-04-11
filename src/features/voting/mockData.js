export const ELECTION_SESSION = "2024/2025 Academic Session";

// Mock vote counts per candidate (base values — LiveStatsView adds small live drift)
export const MOCK_VOTES = {
  president:              { "pres-1": 145, "pres-2": 89,  "pres-3": 67  },
  "vice-president":       { "vp-1": 132,  "vp-2": 95,    "vp-3": 74    },
  "general-secretary":    { "gs-1": 158,  "gs-2": 88,    "gs-3": 55    },
  "financial-secretary":  { "fs-1": 120,  "fs-2": 105,   "fs-3": 76    },
  "sports-director":      { "sd-1": 99,   "sd-2": 87,    "sd-3": 115   },
};

export const ELECTION_END_DATE = new Date("2026-04-15T23:59:59");

export const ELECTION_ROLES = [
  { id: "president", title: "President", shortName: "PRESIDENT" },
  { id: "vice-president", title: "Vice President", shortName: "VICE PRES." },
  { id: "general-secretary", title: "General Secretary", shortName: "GEN. SECRETARY" },
  { id: "financial-secretary", title: "Financial Secretary", shortName: "FINANCIAL SEC." },
  { id: "sports-director", title: "Sports Director", shortName: "SPORTS DIRECTOR" },
];

export const CANDIDATES = {
  president: [
    {
      id: "pres-1",
      name: "Omosiogo Godswill",
      photo: "/src/assets/images/president_image.jpeg",
      level: "400 Level",
      department: "Software Engineering",
      gpa: "4.72",
      roleTag: "EX-EXCO",
      quote:
        "Committed to excellence and digital transparency for all NACOSites. I will build bridges between leadership and the student body.",
      manifesto:
        "Distinguished delegates and fellow students of the Computer Science Department, I stand before you not just as a candidate, but as a student who shares your dreams, challenges, and aspirations. My administration will focus on three key pillars: Innovation, Integration, and Inclusion.",
      manifestoPoints: [
        {
          title: "DIGITAL TRANSFORMATION",
          body: "We will fully digitize all departmental processes — from resource access to event sign-ups — ensuring every NACOSite can engage seamlessly from anywhere.",
        },
        {
          title: "INDUSTRY LINKAGE PROGRAM",
          body: "My team will secure partnerships with at least five major tech firms to provide internship opportunities, sponsored workshops, and job placement support for our members.",
        },
        {
          title: "TRANSPARENT GOVERNANCE",
          body: "I will publish monthly activity reports accessible to all students, ensuring every decision and expenditure is visible and accountable to the community.",
        },
      ],
      hashtags: ["#NACOSFirst", "#TransparentLeadership"],
      aiTextPercent: 8,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "First Class Honors",
    },
    {
      id: "pres-2",
      name: "Adebayo Olakunle",
      photo: "/src/assets/images/person1.png",
      level: "400 Level",
      department: "Computer Science",
      gpa: "4.61",
      roleTag: "NACOS MEMBER",
      quote:
        "Building a stronger NACOS through transparent leadership and grassroots innovation.",
      manifesto:
        "I believe every student deserves a voice. My campaign is rooted in listening to the concerns of every level — from 100 level students navigating their first year to 400 level students preparing for the industry.",
      manifestoPoints: [
        {
          title: "PEER MENTORSHIP NETWORK",
          body: "Establish a structured mentorship program connecting 300/400 level students with 100/200 level students for academic and career guidance.",
        },
        {
          title: "WELFARE & MENTAL HEALTH",
          body: "Create a confidential student welfare desk to address academic stress, financial challenges, and mental health concerns within the department.",
        },
        {
          title: "TECH EVENTS CALENDAR",
          body: "Organize at least three major tech events per semester including hackathons, tech talks, and code-a-thons open to all department members.",
        },
      ],
      hashtags: ["#VoiceForAll", "#NACOSUnity"],
      aiTextPercent: 15,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
    {
      id: "pres-3",
      name: "Chidera Eze",
      photo: "/src/assets/images/person2.png",
      level: "400 Level",
      department: "Cyber Security",
      gpa: "4.45",
      roleTag: "NACOS MEMBER",
      quote:
        "Security, accountability, and student welfare — my three pillars for a better NACOS.",
      manifesto:
        "As someone who has been deeply involved in departmental activities since 100 level, I understand the gaps in our current leadership structure. I'm running to close those gaps.",
      manifestoPoints: [
        {
          title: "CYBERSECURITY AWARENESS",
          body: "Launch a department-wide cybersecurity awareness initiative to protect students' digital identities and promote safe internet practices.",
        },
        {
          title: "STUDENT GRIEVANCE SYSTEM",
          body: "Introduce a transparent online grievance portal where students can report issues anonymously and track resolution progress.",
        },
        {
          title: "ALUMNI ENGAGEMENT",
          body: "Create a structured alumni engagement program that connects current students with graduates for networking and career development.",
        },
      ],
      hashtags: ["#SecureNACOS", "#StudentFirst"],
      aiTextPercent: 22,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
  ],

  "vice-president": [
    {
      id: "vp-1",
      name: "Jullia Fransis",
      photo: "/src/assets/images/person3.png",
      level: "300 Level",
      department: "Computer Science",
      gpa: "4.55",
      roleTag: "EX-EXCO",
      quote:
        "Fostering community and academic collaboration across all levels. Together we rise.",
      manifesto:
        "My vision for NACOS is a department where every student feels included, supported, and empowered. As Vice President, I will serve as the bridge between the President's vision and the day-to-day realities of our student community.",
      manifestoPoints: [
        {
          title: "INTER-LEVEL COLLABORATION",
          body: "Organize quarterly inter-level mixers and collaborative study groups to foster relationships across all levels of the department.",
        },
        {
          title: "WOMEN IN TECH INITIATIVE",
          body: "Establish a dedicated sub-committee to support and encourage female students in tech through mentorship, coding workshops, and exposure to female tech leaders.",
        },
        {
          title: "ACADEMIC SUPPORT HUB",
          body: "Create a central repository of past question papers, model answers, and course materials freely accessible to all department members.",
        },
      ],
      hashtags: ["#TogetherWeRise", "#InclusiveNACOS"],
      aiTextPercent: 11,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "First Class Honors",
    },
    {
      id: "vp-2",
      name: "Emmanuel Nwosu",
      photo: "/src/assets/images/person1.png",
      level: "300 Level",
      department: "Information Technology",
      gpa: "4.38",
      roleTag: "NACOS MEMBER",
      quote:
        "A VP who listens, acts, and delivers. I'm running to make real change happen.",
      manifesto:
        "Having served as class representative for two consecutive years, I know exactly what students need from their leadership — action, not promises.",
      manifestoPoints: [
        {
          title: "DEPARTMENTAL NEWSLETTER",
          body: "Launch a bi-weekly digital newsletter featuring academic updates, tech news, upcoming events, and student spotlights to keep everyone informed.",
        },
        {
          title: "EXAM PREPARATION SESSIONS",
          body: "Coordinate free pre-examination tutorial sessions facilitated by top-performing senior students for all departmental courses.",
        },
        {
          title: "SPORTS & WELLNESS PROGRAM",
          body: "Partner with the sports director to organize regular wellness activities including inter-departmental sports competitions and fitness challenges.",
        },
      ],
      hashtags: ["#ActionOverWords", "#NACOSForward"],
      aiTextPercent: 18,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
    {
      id: "vp-3",
      name: "Amara Okonkwo",
      photo: "/src/assets/images/person4.png",
      level: "300 Level",
      department: "Software Engineering",
      gpa: "4.29",
      roleTag: "NACOS MEMBER",
      quote:
        "Innovation starts from within. Let's build a smarter, more connected NACOS together.",
      manifesto:
        "I'm passionate about using technology to solve real student problems. As VP, I will focus on building systems that make student life easier and more connected.",
      manifestoPoints: [
        {
          title: "NACOS MOBILE APP",
          body: "Spearhead the development of a NACOS student app for event notifications, resource sharing, dues payment tracking, and direct communication with executives.",
        },
        {
          title: "OPEN SOURCE PROJECTS",
          body: "Establish NACOS open source projects that students can contribute to for their portfolio, gaining real-world development experience.",
        },
        {
          title: "FEEDBACK CULTURE",
          body: "Introduce monthly town-hall sessions where any student can raise concerns, suggest improvements, and receive direct responses from the executive team.",
        },
      ],
      hashtags: ["#TechDrivenNACOS", "#SmartLeadership"],
      aiTextPercent: 29,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
  ],

  "general-secretary": [
    {
      id: "gs-1",
      name: "Rapheal Fufiled",
      photo: "/src/assets/images/Gen Sec.png",
      level: "400 Level",
      department: "Computer Science",
      gpa: "4.82",
      roleTag: "EX-EXCO",
      quote:
        "Transparency and Accountability are my watchwords. I will bridge the gap between 100 level students and the seniors through a dedicated mentorship program.",
      manifesto:
        "Distinguished delegates and fellow students, I stand before you as a candidate anchored in service. My administration will focus on three key pillars: Innovation, Integration, and Inclusion.",
      manifestoPoints: [
        {
          title: "ACADEMIC SUPPORT INITIATIVE",
          body: "We will establish a Peer-to-Peer mentorship program where senior students assist levels 100 and 200 with core programming concepts and mathematical foundations.",
        },
        {
          title: "TECH HUB PARTNERSHIPS",
          body: "My team will secure partnerships with at least three major tech startups in Nigeria to provide internship opportunities and professional workshops for our members.",
        },
        {
          title: "ENHANCED DIGITAL PLATFORM",
          body: "Building on our current portal, we will introduce a project repository where students can showcase their portfolios to potential recruiters directly from the NACOS platform.",
        },
      ],
      hashtags: ["#TheFutureNow", "#NACOSUnity"],
      aiTextPercent: 90,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "First Class Honors",
    },
    {
      id: "gs-2",
      name: "Victor Oyinyechi",
      photo: "/src/assets/images/person2.png",
      level: "300 Level",
      department: "Computer Science",
      gpa: "4.25",
      roleTag: "NACOS MEMBER",
      quote:
        "Committed to digitalizing our departmental records and ensuring seamless communication between students and the faculty through automated newsletters.",
      manifesto:
        "I bring a fresh, system-oriented approach to the role of General Secretary. My background in software development means I can automate and improve many of the manual processes currently bogging down our secretariat.",
      manifestoPoints: [
        {
          title: "DIGITAL RECORDS SYSTEM",
          body: "Implement a fully digital document management system for all NACOS records — meeting minutes, attendance, correspondence — accessible and searchable by authorized parties.",
        },
        {
          title: "AUTOMATED NEWSLETTERS",
          body: "Build an automated newsletter system that delivers weekly updates, announcements, and academic reminders directly to all registered students' email addresses.",
        },
        {
          title: "MEETING TRANSPARENCY",
          body: "Publish all executive meeting agendas before meetings and minutes within 48 hours after, ensuring complete transparency in our governance process.",
        },
      ],
      hashtags: ["#DigitalSecretariat", "#SystemsThinking"],
      aiTextPercent: 14,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
    {
      id: "gs-3",
      name: "Michael Taiwo",
      photo: "/src/assets/images/person1.png",
      level: "300 Level",
      department: "Cyber Security",
      gpa: "3.90",
      roleTag: "NACOS MEMBER",
      quote:
        "I aim to improve the security protocols of our departmental portal and manage all secretarial duties with utmost precision.",
      manifesto:
        "As a Cyber Security student, I bring a unique perspective to the Secretary role. I understand the importance of secure record-keeping, data privacy, and systematic communication.",
      manifestoPoints: [
        {
          title: "SECURE COMMUNICATION CHANNELS",
          body: "Establish encrypted, secure communication channels for official NACOS correspondence to protect sensitive student and organizational information.",
        },
        {
          title: "ARCHIVAL SYSTEM",
          body: "Create a comprehensive digital archive of all past NACOS activities, events, and decisions accessible to current and future executives.",
        },
        {
          title: "CORRESPONDENCE TRACKING",
          body: "Introduce a ticketing system for all official correspondence ensuring no communication is lost and response times are tracked and improved.",
        },
      ],
      hashtags: ["#SecureRecords", "#PrecisionFirst"],
      aiTextPercent: 7,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Lower",
    },
  ],

  "financial-secretary": [
    {
      id: "fs-1",
      name: "Faithful Okeke",
      photo: "/src/assets/images/person4.png",
      level: "200 Level",
      department: "Computer Science",
      gpa: "4.60",
      roleTag: "NACOS MEMBER",
      quote:
        "Transparency in every naira. Accountable leadership for all.",
      manifesto:
        "Financial accountability is the backbone of any successful organization. I am running for Financial Secretary because I believe our dues and funds deserve the highest level of transparency and professional management.",
      manifestoPoints: [
        {
          title: "REAL-TIME FINANCIAL DASHBOARD",
          body: "Build and maintain a public financial dashboard that shows all income, expenditures, and balances in real-time, accessible to every NACOS member.",
        },
        {
          title: "DUES MANAGEMENT SYSTEM",
          body: "Streamline the dues payment process with automated reminders, multiple payment options, and instant digital receipts for all transactions.",
        },
        {
          title: "ANNUAL FINANCIAL REPORT",
          body: "Publish a comprehensive annual financial report detailing all transactions, budget allocations, and financial performance with full audit trail.",
        },
      ],
      hashtags: ["#EveryNairaAccountable", "#FinancialClarity"],
      aiTextPercent: 5,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "First Class Honors",
    },
    {
      id: "fs-2",
      name: "Babatunde Salami",
      photo: "/src/assets/images/person2.png",
      level: "300 Level",
      department: "Information Technology",
      gpa: "4.20",
      roleTag: "EX-EXCO",
      quote:
        "Having managed funds in my class association for 2 years, I bring proven experience to this role.",
      manifesto:
        "Money management in student organizations requires both technical know-how and integrity. I have demonstrated both as class treasurer, and I'm ready to scale those skills to the entire department.",
      manifestoPoints: [
        {
          title: "BUDGET PLANNING COMMITTEE",
          body: "Establish a student budget planning committee that gives members a say in how organizational funds are allocated across events, welfare, and projects.",
        },
        {
          title: "EMERGENCY WELFARE FUND",
          body: "Create a dedicated emergency welfare fund to support students facing sudden financial hardships, funded by a percentage of dues and voluntary contributions.",
        },
        {
          title: "COST REDUCTION DRIVE",
          body: "Audit all current expenditures and identify areas where costs can be reduced without compromising event quality, reinvesting savings into student benefits.",
        },
      ],
      hashtags: ["#ProvenFinancials", "#WelfareFirst"],
      aiTextPercent: 20,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
    {
      id: "fs-3",
      name: "Grace Afolabi",
      photo: "/src/assets/images/person3.png",
      level: "200 Level",
      department: "Software Engineering",
      gpa: "4.15",
      roleTag: "NACOS MEMBER",
      quote:
        "Clean books, clear records, and complete accountability — that's my promise to NACOS.",
      manifesto:
        "I am a detail-oriented and disciplined student with a passion for numbers and systems. Financial Secretary is not just a title — it's a responsibility I take very seriously.",
      manifestoPoints: [
        {
          title: "DIGITAL PAYMENT INTEGRATION",
          body: "Integrate modern payment platforms into NACOS operations, making it easy for members to pay dues, register for events, and access financial history from their phones.",
        },
        {
          title: "MONTHLY EXPENDITURE REPORTS",
          body: "Publish itemized monthly expense reports, breaking down every naira spent with evidence, to maintain full transparency with the student body.",
        },
        {
          title: "FINANCIAL LITERACY SESSIONS",
          body: "Organize quarterly financial literacy workshops for students covering personal budgeting, investments, and financial planning for life after graduation.",
        },
      ],
      hashtags: ["#CleanBooks", "#StudentFinancials"],
      aiTextPercent: 33,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
  ],

  "sports-director": [
    {
      id: "sd-1",
      name: "Chukwuemeka Obi",
      photo: "/src/assets/images/software_director_image.png",
      level: "300 Level",
      department: "Computer Science",
      gpa: "3.85",
      roleTag: "NACOS MEMBER",
      quote:
        "A healthy body fuels a sharp mind. Let's build a culture of fitness and sportsmanship in NACOS.",
      manifesto:
        "Sports and physical wellness are often overlooked in academic settings. I am running for Sports Director to change that narrative and create a NACOS that values the whole student — mind and body.",
      manifestoPoints: [
        {
          title: "INTER-DEPARTMENTAL TOURNAMENTS",
          body: "Organize at least two major inter-departmental sports tournaments per semester covering football, basketball, table tennis, and e-sports.",
        },
        {
          title: "FITNESS CHALLENGE PROGRAM",
          body: "Launch a monthly fitness challenge initiative with prizes for participants, encouraging students to stay active and build healthy routines.",
        },
        {
          title: "SPORTS EQUIPMENT DRIVE",
          body: "Raise funds and partner with sponsors to acquire proper sports equipment for the department, available for all members to use during free periods.",
        },
      ],
      hashtags: ["#NACOSFit", "#SportsAndCode"],
      aiTextPercent: 10,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
    {
      id: "sd-2",
      name: "Tochukwu Nnadi",
      photo: "/src/assets/images/person1.png",
      level: "200 Level",
      department: "Cyber Security",
      gpa: "3.70",
      roleTag: "NACOS MEMBER",
      quote:
        "Sports build character, teamwork, and resilience — values every NACOS student needs.",
      manifesto:
        "I have been involved in sports at every level of my academic journey. From secondary school athletics to university basketball, I know what it takes to build and sustain a thriving sports culture.",
      manifestoPoints: [
        {
          title: "E-SPORTS LEAGUE",
          body: "Create a structured department-wide e-sports league with regular competitions in popular games, recognizing e-sports as a legitimate form of competitive activity.",
        },
        {
          title: "SPORTS SCHOLARSHIP ADVOCACY",
          body: "Advocate at the faculty level for sports scholarships and recognition for students who represent the department in university-level competitions.",
        },
        {
          title: "STUDENT WELLNESS WEEK",
          body: "Organize an annual Student Wellness Week featuring sports competitions, fitness workshops, nutrition talks, and mental health awareness sessions.",
        },
      ],
      hashtags: ["#SportsForAll", "#WellnessMatters"],
      aiTextPercent: 16,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Lower",
    },
    {
      id: "sd-3",
      name: "Adaeze Nwofor",
      photo: "/src/assets/images/person3.png",
      level: "300 Level",
      department: "Information Technology",
      gpa: "4.05",
      roleTag: "NACOS MEMBER",
      quote:
        "Breaking barriers in sports — first female Sports Director candidate in NACOS history.",
      manifesto:
        "I am proud to be the first female candidate for the Sports Director position in our department's history. My candidacy represents a new era of inclusion, and my policies reflect that same spirit.",
      manifestoPoints: [
        {
          title: "GENDER-INCLUSIVE SPORTS PROGRAM",
          body: "Develop sports programs specifically designed to encourage female student participation, including women-only tournaments and mixed-gender team competitions.",
        },
        {
          title: "YOGA & MINDFULNESS SESSIONS",
          body: "Introduce weekly yoga and mindfulness sessions to complement traditional sports, addressing the mental wellness needs of students during exam periods.",
        },
        {
          title: "SPORTS TRACKING APP",
          body: "Develop a simple departmental sports app to track student participation, scores, standings, and upcoming events, keeping the sports community engaged year-round.",
        },
      ],
      hashtags: ["#BreakingBarriers", "#InclusiveSports"],
      aiTextPercent: 24,
      eligibility: "Cleared by Electoral Com.",
      academicStanding: "Second Class Upper",
    },
  ],
};
