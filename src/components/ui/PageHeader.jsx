import { Menu } from "lucide-react"

export default function PageHeader({ setIsOpen, location }) {
    return (
        <>
            <div className="mb-10"></div>
            <div className="bg-white border-b border-gray-200 fixed top-0 left-0 lg:left-72 right-0 z-40">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="h-16 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsOpen(true)} className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
                                <Menu className="h-5 w-5" />
                            </button>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Dashboard</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="font-bold text-gray-900">{location}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative hidden sm:block">
                                <input type="text" placeholder="Search payments..." className="w-72 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/30 focus:outline-none transition" />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600/30 transition" aria-label="Notifications">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z" />
                                </svg>
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
