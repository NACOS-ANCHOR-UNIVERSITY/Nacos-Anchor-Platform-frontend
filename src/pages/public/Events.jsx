import { useState } from "react"
import Team from "../../assets/images/team.png"
import Ticket from "../../assets/icons/ticket.svg"
import Arrow from "../../assets/icons/arrow.svg"
import View from "../../assets/icons/view.svg"
import TechWeek from "../../assets/images/tech_week.png"
import Bootcamp from "../../assets/images/bootcamp.png"
import Nacos from "../../assets/images/nacos night.png"
import UIUX from "../../assets/images/ui ux.png"
import CareerTalk from "../../assets/images/career talk.png"
import CodeAThon from "../../assets/images/code a thon.png"

const Events = () => {
    const [filter, setFilter] = useState("All Events")
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const itemsPerPage = 4

    const eventsData = [
        {
            id: 1,
            title: "Tech Week 2024: The Future of AI",
            category: "Seminar",
            date: { month: "Oct", day: "24" },
            time: "10:00 AM - 2:00 PM",
            location: "Main Auditorium, AUL",
            description: "Join us for a week of coding challenges, seminars, and networking with industry leaders in Artificial...",
            image: TechWeek,
            status: "open",
            buttonText: "Register Now",
            icons: Arrow
        },
        {
            id: 2,
            title: "Web Dev Bootcamp: Zero to Hero",
            category: "Workshop",
            date: { month: "Nov", day: "05" },
            time: "9:00 AM - 4:00 PM",
            location: "Computer Lab 3, ICT Center",
            description: "A hands-on workshop teaching HTML, CSS, and React basics. Perfect for beginners looking to...",
            image: Bootcamp,
            status: "open",
            buttonText: "Register Now",
            icons: Arrow
        },
        {
            id: 3,
            title: "NACOS Fresher's Night",
            category: "Social",
            date: { month: "Nov", day: "12" },
            time: "6:00 PM - 9:00 PM",
            location: "Student Center Hall",
            description: "Welcome party for new students! Come meet your excos, make friends, and enjoy music, games, an...",
            image: Nacos,
            status: "open",
            buttonText: "Get Ticket",
            icons: Ticket
        },
        {
            id: 4,
            title: "UI/UX Design Principles",
            category: "Workshop",
            date: { month: "Nov", day: "18" },
            time: "12:00 PM - 3:00 PM",
            location: "Design Studio 1",
            description: "Learn the fundamentals of User Interface and User Experience design. We will cover Figma...",
            image: UIUX,
            status: "open",
            buttonText: "Register Now",
            icons: Arrow
        },
        {
            id: 5,
            title: "Career Talk: Tech in Nigeria",
            category: "Seminar",
            date: { month: "Dec", day: "02" },
            time: "11:00 AM - 1:00 PM",
            location: "Virtual (Google Meet)",
            description: "A webinar featuring alumni from Google and Paystack discussing the current landscape of the...",
            image: CareerTalk,
            status: "open",
            buttonText: "View Details",
            icons: View
        },
        {
            id: 6,
            title: "Code-a-thon 2024",
            category: "Hackathon",
            date: { month: "Dec", day: "10" },
            time: "All Day Event",
            location: "Library Extension",
            description: "24-hour hackathon focused on solving campus problems. Teams of 4 will compete for cash prizes.",
            image: CodeAThon,
            status: "sold-out",
            buttonText: "Registration Closed"
        }
    ]

    // Filter Logic
    const filteredEvents = eventsData.filter((event) => {
        // Check Category
        const matchesCategory = filter === "All Events" || event.category === filter
        
        // Check Search Term
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              event.description.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesCategory && matchesSearch
    })

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="py-20 px-4 sm:px-8 md:px-20 lg:px-32 min-h-screen w-full flex flex-col items-center gap-20 bg-[#F6F8F5]">

            {/* Header Section */}
            <div className="flex justify-center items-center rounded-2xl relative w-full h-64 md:h-80 lg:h-96 overflow-hidden group">
                <img src={Team} alt="Events Placeholder" className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 w-full h-full"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center w-full max-w-2xl px-4 text-center">
                    <div className="uppercase bg-brand-primary rounded-full text-[10px] md:text-xs px-3 py-1.5 font-bold mb-4">
                        connect & grow
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Events & Activities</h1>
                    <p className="text-sm md:text-lg font-normal max-w-xl">
                        Join workshops, hackathons, and social gatherings designed to boost your tech career and network at NACOS Anchor University.
                    </p>
                </div>
            </div>

            {/* Events Section */}
            <div className="w-full">

                {/* Controls: Search & Filter */}
                <div className="flex flex-col gap-8 mb-10">
                    <div className="flex flex-col gap-6 md:flex-row justify-between md:items-center mb-6">
                        <div className="flex">
                            <button className="text-[14px] font-bold border-b-2 border-brand-primary px-4 pb-2.5">Upcoming Events</button>
                            <button className="text-[14px] font-bold border-b-2 border-[#D0E6CC] px-4 pb-2.5 text-gray-500">Past Events</button>
                        </div>
                        <input
                            type="search"
                            placeholder="Search by event name..."
                            className="py-2 px-4 w-full md:w-80 rounded-lg outline-none font-medium border border-[#D0E6CC] focus:border-[#138301] transition-colors"
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {["All Events", "Workshop", "Hackathon", "Social", "Seminar"].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setFilter(item)
                                    setCurrentPage(1) // Reset to page 1 on filter change
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                                ${filter === item
                                        ? 'bg-[#138301] text-white border-[#138301]'
                                        : 'bg-white text-[#475569] border-[#D0E6CC] hover:border-[#138301] hover:text-[#138301]'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentItems.map((event) => (
                        <div key={event.id} className="bg-white rounded-2xl p-4 border border-[#E2E8F0] hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">

                            {/* Image Container */}
                            <div className="h-48 w-full bg-[#F1F5F9] rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-sm">Event Image</span>
                                )}

                                {/* Date Badge */}
                                <div className="absolute top-3 left-3 bg-white p-2 rounded-lg text-center shadow-sm min-w-12.5 z-10">
                                    <span className="block text-xs font-bold text-red-500 uppercase">{event.date.month}</span>
                                    <span className="block text-xl font-bold text-[#0F172A]">{event.date.day}</span>
                                </div>

                                {/* Category Badge */}
                                <span
                                    className={`absolute top-3 right-3 ${event.category === "Workshop" ? "bg-[#2563EB]"
                                        : event.category === "Hackathon" ? "bg-[#007BFF]" : event.category === "Social" ?
                                            "bg-[#9333EA]" : event.category === "Seminar" ? "bg-[#138301]" : ""} text-white 
                                    text-xs font-bold px-3 py-1 rounded-full uppercase z-10`}
                                >
                                    {event.category}
                                </span>

                                {/* SOLD OUT OVERLAY */}
                                {event.status === 'sold-out' && (
                                    <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                                        <div className="border-4 border-white text-white text-2xl font-black px-6 py-2 -rotate-12 uppercase tracking-widest">
                                            Sold Out
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col grow gap-2">
                                <h3 className="text-xl font-bold text-[#0F172A] line-clamp-2">{event.title}</h3>

                                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <span>🕒 {event.time}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>📍 {event.location}</span>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-3 mt-3 mb-4 grow">
                                    {event.description}
                                </p>

                                <button
                                    disabled={event.status === 'sold-out'}
                                    className={`w-full py-3 rounded-lg font-medium transition-colors mt-auto flex items-center justify-center gap-2 ${event.status === 'sold-out'
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-[#E8F3E6] text-brand-primary hover:bg-[#D0E6CC]'
                                        }`}
                                >
                                    {event.buttonText}
                                    {event.icons && event.status !== 'sold-out' && <img src={event.icons} alt="Event icon" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Message */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No events found for "{filter}".
                    </div>
                )}

                {/* Pagination Controls */}
                {filteredEvents.length > itemsPerPage && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        {/* Prev Button */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${currentPage === 1
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-[#D0E6CC] text-[#0F172A] hover:bg-[#E8F3E6]'
                                }`}
                        >
                            &lt;
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`w-10 h-10 rounded-lg font-bold border transition-all ${currentPage === i + 1
                                        ? 'bg-[#138301] text-white border-[#138301]'
                                        : 'bg-white text-[#0F172A] border-[#D0E6CC] hover:bg-[#E8F3E6]'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${currentPage === totalPages
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-[#D0E6CC] text-[#0F172A] hover:bg-[#E8F3E6]'
                                }`}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>

            {/* Newsletter CTA */}
            <div className="flex flex-col lg:flex-row gap-8 justify-between items-center bg-[#E8F4E6] border border-[#D0E6CC] rounded-2xl p-8 md:p-12 w-full">
                <div className="max-w-xl">
                    <h3 className="font-bold text-2xl md:text-3xl text-[#0F1C0C]">Don't Miss Out on Updates</h3>
                    <p className="text-sm md:text-base text-[#475569] mt-3 leading-relaxed">
                        Subscribe to our newsletter to get notified about upcoming workshops, exam schedules, and department news.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <input
                        type="email"
                        placeholder="Enter your student mail"
                        className="bg-white border border-[#D0E6CC] rounded-lg px-4 py-3 outline-none w-full sm:w-64 focus:border-brand-primary transition-colors"
                    />
                    <button className="bg-brand-primary hover:bg-[#0e6301] transition-colors rounded-lg py-3 px-6 text-white font-bold whitespace-nowrap">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Events