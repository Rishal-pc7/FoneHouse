import React from 'react'
import { DesktopSidebar, MobileHeader } from './_components/AdminSidebar.client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex font-manrope">
            <DesktopSidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <MobileHeader />
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
