import { BriefcaseBusinessIcon, CloudUploadIcon, CreditCard, IdCard, LayoutDashboard, LucideBookOpenText, Menu, Settings, X } from "lucide-react"
import React, { useState } from "react"
import NavItem from "./NavItem"
import NACOSIMG from "../../assets/images/nacossLogo.png"

export default function Sidebar({ active, isOpen, setIsOpen }) {
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
        <>
            <div className="hidden lg:block md:w-72"></div>

            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden"></div>}

            <aside className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 p-6 flex flex-col overflow-y-auto transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                    <X />
                </button>

                <div className="mb-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <img src={NACOSIMG} alt="NACOS Logo" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900">NACOS</h1>
                        <p className="text-xs text-gray-500">Anchor University</p>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map(item => (
                        <NavItem key={item.label} icon={item.icon} label={item.label} active={active === item.label} onClick={() => setIsOpen(false)} />
                    ))}
                </nav>

                <hr className="border-gray-200 mt-4" />

                <div className="pt-4 mt-6">
                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium">
                        <span>⬅️</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    )
}
