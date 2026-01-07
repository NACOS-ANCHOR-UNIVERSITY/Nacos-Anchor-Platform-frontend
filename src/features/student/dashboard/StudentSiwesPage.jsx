import { useState } from "react"
import PageHeader from "../../../components/ui/PageHeader"
import Sidebar from "../../../components/ui/Sidebar"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock5, Code, HardDrive, Paintbrush, Search, ShieldUser } from "lucide-react"

function StudentSiwesPageHeader() {
    return (
        <div className="bg-white rounded-2xl p-8 mt-2 mb-8 border-1 border-[#E2E8F099]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 text-stroke-1 mb-2">SIWES Opportunities Board</h1>
                    <p className="text-gray-600 text-sm ">
                        Find your perfect Industrial Training placement. Browse curated <br />internships and job openings posted
                        directly by the NACOS executives.
                    </p>
                </div>
                <button className="bg-[#138601] hover:bg-[#0f6600] text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 transition whitespace-nowrap sm:ml-4 w-full sm:w-auto ">
                    <span>+</span> Post Opportunity
                </button>
            </div>
        </div>
    )
}

function StudentSiwesPageBody() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState(["Data Analysis"])
    const [sortBy, setSortBy] = useState("Newest")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedLocation, setSelectedLocation] = useState(null)

    const opportunities = [
        { id: 1, title: "Frontend Developer Intern", company: "Paystack", location: "Ikeja, Lagos (Hybrid)", duration: "6 Months", skills: ["React", "TypeScript"], postedDays: 2, status: "Active", icon: <Code className="text-[#94A3B8]" /> },
        { id: 2, title: "Network Administrator Intern", company: "MainOne Cabales", location: "Victoria Island, Lagos", duration: "1 Year", skills: ["Cisco", "Troubleshooting"], postedDays: 3, status: "Featured", icon: <HardDrive className="text-[#6366F1]" /> },
        { id: 3, title: "UI/UX Design Intern", company: "Kuda Bank", location: "Remote", duration: "3 Months", skills: ["Figma", "Prototyping"], postedDays: 7, status: "", icon: <Paintbrush className="text-[#F97316]" /> },
        { id: 4, title: "Cyber Security Analyst Intern", company: "First Bank", location: "Marina, Lagos", duration: "6 Months", skills: ["Pen-Testing", "Networking"], postedDays: 7, status: "", icon: <ShieldUser className="text-[#A855F7]" /> },
    ]

    const categories = ["Software Dev", "Networking", "Data Analysis", "Product Design"]
    const locations = ["Lagos", "Remote", "Abuja", "Hybrid"]

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 lg:gap-2 rounded-2xl p-0 lg:p-6 h-fit lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl p-6 border-1 border-[#E2E8F099]">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-[10px] w-5 h-5 text-[#138601]" />
                        <input type="text" placeholder="Keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-1 border-[#E2E8F099]">
                    <div className="flex justify-end">
                        <button className="text-sm text-[#138601] cursor-pointer" onClick={() => setSelectedCategories([])}>
                            Clear
                        </button>
                    </div>
                    <div className="mb-8 pb-8 border-b border-gray-200">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Category</label>
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={(e) => e.target.checked ? setSelectedCategories([...selectedCategories, category]) : setSelectedCategories(selectedCategories.filter((c) => c !== category))} className="w-4 h-4 cursor-pointer appearance-none rounded-md border border-[#CBD5E1] bg-[#F8FAFC] checked:bg-[#138601] checked:border-[#138601] flex items-center justify-center after:content-['✔'] after:text-white after:text-xs after:hidden checked:after:block" />
                                    <span className="text-sm text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <label className="block text-sm font-bold text-gray-900 mb-3">Location</label>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => {
                            const isSelected = selectedLocation === location
                            return (
                                <button key={location} onClick={() => setSelectedLocation(isSelected ? null : location)} className={`px-3 py-1 text-xs rounded-lg transition font-medium ${isSelected ? "border border-[#138601] text-[#138601] bg-[#1386010D]" : "bg-[#F1F5F9] text-gray-600 border border-[#F1F5F9] hover:border-0 hover:border-[#138601] hover:text-[#138601] hover:bg-[#1386010D]"}`}> {/*bg-[#138601] text-white border border-[#138601] */}
                                    {location}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                    <p className="text-[#64748B] font-medium text-sm"><span className="font-bold text-black">12 </span>opportunities found</p>
                    <div>
                        <span className="text-gray-600 text">Sort by:</span>
                        <div className="relative inline-block">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1 pr-8 bg-transparent rounded-lg text-sm font-semibold text-[#138601] focus:outline-none focus:ring-2 focus:ring-[#138601] cursor-pointer appearance-none">
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Most Relevant</option>
                            </select>
                            {/* <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#138601]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg> */}
                            <ChevronDown className=" pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600"/>
                        </div>

                    </div>
                </div>

                <div className="space-y-4">
                    {opportunities.map((opp) => (
                        <div key={opp.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition border-1 border-[#E2E8F099]">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#1386010D] flex items-center justify-center flex-shrink-0">{opp.icon}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900">{opp.title}</h3>
                                            <p className="text-gray-600 text-sm">{opp.company} • {opp.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="text-xs bg-[#1386010D] text-[#138601] px-2 py-1/2 rounded flex items-center gap-1"><Clock5 width="10" />{opp.duration}</span>
                                        {opp.skills.map((skill) => <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 flex items-center py-1/2 rounded">{skill}</span>)}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {/* <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3" />Posted {opp.postedDays} days ago</p> */}
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3" />Posted {formatPostedTime(opp.postedDays)} ago</p>

                                        <a href="#" className="text-[#138601] font-semibold text-sm hover:underline">View Details →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                    <button className="px-3 py-2 text-gray-400 rounded transition"><ChevronLeft /></button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded transition font-semibold ${page === currentPage ? "bg-[#138601] text-white" : "text-[#475569] hover:bg-[#1386010D] border-1 border-[#E2E8F0] hover:border-[#138601]"}`}>
                            {page}
                        </button>
                    ))}
                    <button className="px-3 py-2 text-[#475569] rounded transition"><ChevronRight /></button>
                </div>
            </div>
        </div>
    )
}

function StudentSiwesPageCTA() {
    return (
        <div className="mt-16 bg-gradient-to-r from-[#138601] to-[#1A4A12] rounded-2xl p-8 py-10 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Are you a Student Representative?</h2>
                    <p className="text-green-100 text-sm lg:w-3/5">
                        If you have verified SIWES opportunities, please contact the Excos to get them listed here for your
                        fellow students.
                    </p>
                </div>
                <button className="bg-white text-[#138601] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex-shrink-0 w-full sm:w-auto">
                    Contact Excos
                </button>
            </div>
        </div>
    )
}
const formatPostedTime = (days) => days < 7 ? `${days} day${days === 1 ? "" : "s"}` : days < 30 ? `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? "" : "s"}` : `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? "" : "s"}`;

export default function StudentSiwesPage() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-[#F8FCF8] font-sans">
            <Sidebar {...{ isOpen, setIsOpen, active: "SIWES" }} />
            <main className="flex-1 relative">
                <PageHeader {...{ isOpen, setIsOpen, location: "SIWES Board" }} />
                <div className="flex justify-center">
                    <div className="container w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:p-8">
                        <StudentSiwesPageHeader />
                        <StudentSiwesPageBody />
                        <StudentSiwesPageCTA />
                    </div>
                </div>
            </main>
        </div>
    )
}
