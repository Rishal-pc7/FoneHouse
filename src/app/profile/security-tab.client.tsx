"use client"

import React from "react"
import { motion } from "framer-motion"

export default function SecurityTab() {
    return (
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
    )
}
