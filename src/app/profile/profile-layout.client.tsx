"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Package, LogOut, Key } from "lucide-react"
import { signOut } from "next-auth/react"
import OrdersTab from "./orders-tab.client"
import InfoTab from "./info-tab.client"
import SecurityTab from "./security-tab.client"
import { OrderData, UserSessionData } from "./profile.types"

// Removed 'addresses' from TABS
const TABS = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security & Password", icon: Key },
]

interface ProfileLayoutClientProps {
    user: UserSessionData
    orders: OrderData[]
}

export default function ProfileLayoutClient({ user, orders }: ProfileLayoutClientProps) {
    const [activeTab, setActiveTab] = useState("orders")
    const [isHoveringLogout, setIsHoveringLogout] = useState(false)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12">
            {/* Sidebar Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-1 border-r-0 lg:border-r border-border/50 pr-0 lg:pr-6"
            >
                {/* User Mini Profile */}
                <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-brandBlue/10 flex-shrink-0 flex items-center justify-center text-brandBlue font-bold text-2xl uppercase">
                        {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg font-[family-name:var(--font-urbanist)] line-clamp-1">
                            {user.name || "User"}
                        </h3>
                        <span className="text-xs text-brandBlue font-semibold bg-brandBlue/10 px-2 py-0.5 rounded-full inline-block mt-1">
                            Member
                        </span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
                    {TABS.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap lg:whitespace-normal group ${isActive
                                    ? "bg-brandBlue text-white shadow-md"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"}`} />
                                <span>{tab.label}</span>
                            </button>
                        )
                    })}

                    <div className="h-px bg-border/50 my-2 hidden lg:block" />

                    <button
                        onClick={() => 
                        {
                            localStorage.removeItem("cartCount")
                            signOut({ callbackUrl: "/login" })
                        }
                        }
                        onMouseEnter={() => setIsHoveringLogout(true)}
                        onMouseLeave={() => setIsHoveringLogout(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-destructive hover:bg-destructive/10 whitespace-nowrap lg:whitespace-normal"
                    >
                        <LogOut className={`w-5 h-5 transition-transform ${isHoveringLogout ? "-translate-x-1" : ""}`} />
                        <span>Log Out</span>
                    </button>
                </nav>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 min-h-[500px]"
            >
                <AnimatePresence mode="wait">
                    {activeTab === "orders" && <OrdersTab orders={orders} />}
                    {activeTab === "profile" && <InfoTab user={user} />}
                    {activeTab === "security" && <SecurityTab />}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
