'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import Users from 'lucide-react/dist/esm/icons/users';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Image from 'next/image'
import Logo from '../../../logo.webp'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: FileText },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
]

function NavLinks({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname()
    return (
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                            ? 'bg-brandBlue text-white shadow-lg shadow-brandBlue/30'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                )
            })}
        </nav>
    )
}

function SidebarShell({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <Image src={Logo} alt="FoneHouse" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-xl text-brandBlue">Admin</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>
            {children}
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}

export function DesktopSidebar() {
    return (
        <aside className="w-64 shrink-0 hidden md:flex flex-col h-screen sticky top-0">
            <SidebarShell>
                <NavLinks />
            </SidebarShell>
        </aside>
    )
}

export function MobileHeader() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <div className="md:hidden p-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <Image src={Logo} alt="FoneHouse" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-xl text-brandBlue">Admin</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-600 dark:text-gray-300"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
                        >
                            <SidebarShell onClose={() => setIsSidebarOpen(false)}>
                                <NavLinks onClose={() => setIsSidebarOpen(false)} />
                            </SidebarShell>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
