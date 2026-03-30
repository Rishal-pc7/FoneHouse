import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getUserOrders } from "./profile.actions"
import ProfileLayoutClient from "./profile-layout.client"

export const metadata = {
    title: "Account Dashboard - FoneHouse",
    description: "Manage your orders, personal information, and security settings."
}

export default async function ProfilePage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const { data: orders, success } = await getUserOrders()

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background text-foreground selection:bg-brandBlue/30 selection:text-brandBlue">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Page Header */}
                <div className="mb-10 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-urbanist)] leading-tight text-foreground">
                        Account Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2 font-[family-name:var(--font-manrope)] max-w-xl">
                        Manage your orders, personal information, and security settings.
                    </p>
                </div>

                <ProfileLayoutClient 
                    user={session.user} 
                    orders={success && orders ? orders : []} 
                />

            </div>
        </main>
    )
}
