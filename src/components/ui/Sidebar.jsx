import { BriefcaseBusinessIcon, CloudUploadIcon, CreditCard, IdCard, LayoutDashboard, LucideBookOpenText, Settings } from "lucide-react"
import React from "react"
import NavItem from "./NavItem"
import NACOSIMG from "../../assets/images/nacossLogo.png"


export default function Sidebar({ active }) {
    const navItems = [
        { icon: <LayoutDashboard />, label: "Dashboard" },
        { icon: <LucideBookOpenText />, label: "Academic Library" },
        { icon: <BriefcaseBusinessIcon />, label: "SIWES" },
        { icon: <CreditCard />, label: "Payments" },
        { icon: <CloudUploadIcon />, label: "Resources" },
        { icon: <IdCard />, label: "Profile" },
        { icon: <Settings />, label: "Settings" },
    ]

    return (
        <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
            <div className="mb-8 flex items-center gap-2">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                    <img src={ NACOSIMG } />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900">NACOS</h1>
                    <p className="text-xs text-gray-500">Anchor University</p>
                </div>
            </div>

            <nav className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <NavItem key={item.label} icon={item.icon} label={item.label} active={active === item.label} />
                ))}
            </nav>

            <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium">
                    <span>⬅️</span>
                    Logout
                </button>
            </div>
        </aside>
    )
}
