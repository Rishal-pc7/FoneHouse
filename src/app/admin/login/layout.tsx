import React from 'react'

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-manrope flex flex-col">
            {children}
        </div>
    )
}
