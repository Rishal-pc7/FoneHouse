"use client"

import React from "react"
import { motion } from "framer-motion"
import { Edit2 } from "lucide-react"
import { UserSessionData } from "./profile.types"

interface InfoTabProps {
    user: UserSessionData
}

export default function InfoTab({ user }: InfoTabProps) {
    return (
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
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                        <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{user.name || "Unknown User"}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                        <p className="text-lg font-medium border-b border-border/50 pb-2 bg-transparent">{user.email || ""}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
