"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, Settings, LogOut, ChevronRight, MapPin, Eye, Edit2, Key, Bell } from "lucide-react";

// Dummy User Data
const USER_DATA = {
    firstName: "Alex",
    lastName: "Designer",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://ui-avatars.com/api/?name=Alex+Designer&background=3277bc&color=fff",
    memberSince: "March 2025"
};

// Dummy Orders Data
const ORDERS_DATA = [
    {
        id: "ORD-84392XL",
        date: "Oct 24, 2026",
        status: "shipped",
        items: 2,
        total: 1357.20
    },
    {
        id: "ORD-79281AM",
        date: "Sep 12, 2026",
        status: "delivered",
        items: 1,
        total: 899.00
    },
    {
        id: "ORD-65123OP",
        date: "Aug 05, 2026",
        status: "delivered",
        items: 4,
        total: 245.50
    }
];

const TABS = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "profile", label: "Profile Information", icon: User },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "security", label: "Security & Password", icon: Key },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("orders");
    const [isHoveringLogout, setIsHoveringLogout] = useState(false);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background text-foreground selection:bg-brandBlue/30 selection:text-brandBlue">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10 md:mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-urbanist)] leading-tight text-foreground">
                        Account Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2 font-[family-name:var(--font-manrope)] max-w-xl">
                        Manage your orders, personal information, and security settings.
                    </p>
                </motion.div>

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
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-brandBlue/10 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={USER_DATA.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg font-[family-name:var(--font-urbanist)] line-clamp-1">
                                    {USER_DATA.firstName} {USER_DATA.lastName}
                                </h3>
                                <span className="text-xs text-brandBlue font-semibold bg-brandBlue/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                    Premium Member
                                </span>
                            </div>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
                            {TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
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
                                );
                            })}

                            <div className="h-px bg-border/50 my-2 hidden lg:block" />

                            <button
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

                            {/* ORDERS TAB */}
                            {activeTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-urbanist)]">Order History</h2>
                                        <span className="text-sm text-muted-foreground">{ORDERS_DATA.length} Total Orders</span>
                                    </div>

                                    <div className="grid gap-4">
                                        {ORDERS_DATA.map((order, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                key={order.id}
                                                className="group bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:border-brandBlue/30 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                            >
                                                <div className="flex items-start gap-4 md:gap-6">
                                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                                                        <Package className="w-6 h-6 text-foreground/70" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-brandBlue font-semibold tracking-wider mb-1 uppercase">
                                                            {order.id}
                                                        </p>
                                                        <p className="font-bold text-foreground text-lg mb-1">{order.date}</p>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                            {order.items} {order.items === 1 ? 'Item' : 'Items'}
                                                            <span className="w-1 h-1 rounded-full bg-border" />
                                                            <span className="capitalize font-medium flex items-center gap-1.5">
                                                                {order.status === 'delivered' && <span className="w-2 h-2 rounded-full bg-brandGreen"></span>}
                                                                {order.status === 'shipped' && <span className="w-2 h-2 rounded-full bg-brandBlue"></span>}
                                                                {order.status === 'processing' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                                                                {order.status}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t border-border md:border-none pt-4 md:pt-0">
                                                    <p className="font-bold text-xl font-[family-name:var(--font-urbanist)] mb-0 md:mb-3">
                                                        ${order.total.toFixed(2)}
                                                    </p>
                                                    <a
                                                        href={`/track-order?id=${order.id}`}
                                                        className="text-sm font-semibold flex items-center gap-1 text-foreground bg-muted hover:bg-border px-4 py-2 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" /> View Details
                                                    </a>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* PROFILE TAB */}
                            {activeTab === "profile" && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-8 max-w-2xl"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-urbanist)]">Profile Information</h2>
                                        <button className="text-brandBlue text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </button>
                                    </div>

                                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                            {/* Form Fields - Read Only State visually */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                                                <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{USER_DATA.firstName}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                                                <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{USER_DATA.lastName}</p>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                                                <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{USER_DATA.email}</p>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                                                <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{USER_DATA.phone}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-muted-foreground text-sm">
                                            <Bell className="w-4 h-4" />
                                            <span>Member since {USER_DATA.memberSince}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ADDRESSES TAB */}
                            {activeTab === "addresses" && (
                                <motion.div
                                    key="addresses"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-urbanist)]">Saved Addresses</h2>
                                        <button className="bg-foreground text-background text-sm font-bold px-4 py-2 rounded-xl hover:bg-foreground/90 transition-colors">
                                            + Add New
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Primary Address */}
                                        <div className="bg-card border-2 border-brandBlue rounded-2xl p-6 relative overflow-hidden shadow-sm">
                                            <div className="absolute top-0 right-0 bg-brandBlue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                                Default
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">Home</h3>
                                            <p className="text-muted-foreground mb-1">{USER_DATA.firstName} {USER_DATA.lastName}</p>
                                            <p className="text-muted-foreground leading-relaxed mb-4">
                                                123 Aesthetic Avenue<br />
                                                Design District<br />
                                                New York, NY 10001
                                            </p>
                                            <div className="flex gap-4 text-sm font-bold">
                                                <button className="text-foreground hover:text-brandBlue transition-colors">Edit</button>
                                                <button className="text-destructive hover:text-destructive/80 transition-colors">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SECURITY TAB */}
                            {activeTab === "security" && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6 max-w-xl"
                                >
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-urbanist)]">Security & Password</h2>
                                        <p className="text-muted-foreground mt-1">Update your password to keep your account secure.</p>
                                    </div>

                                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                                        <form className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold tracking-wider">Current Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all text-foreground"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold tracking-wider">New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all text-foreground"
                                                />
                                            </div>
                                            <div className="space-y-2 pb-4 border-b border-border/50">
                                                <label className="text-sm font-bold tracking-wider">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all text-foreground"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="w-full md:w-auto bg-foreground text-background font-bold px-8 py-3 rounded-xl hover:bg-foreground/90 transition-colors mt-4"
                                            >
                                                Update Password
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
