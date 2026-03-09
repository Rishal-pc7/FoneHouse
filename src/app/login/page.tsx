import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm.client";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Logo from "../../logo.webp";

export const metadata: Metadata = {
    title: "Sign In | FoneHouse",
    description: "Sign in to your FoneHouse account to track orders, manage your cart, and more.",
};

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full bg-background flex flex-col md:flex-row relative overflow-hidden text-foreground">
            {/* Ambient Background Glows - Reduced Opacity */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brandBlue/10 blur-[120px] pointer-events-none mix-blend-screen" />

            {/* Content Container */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-24 relative z-10 w-full md:w-1/2 min-h-screen py-10 md:py-0">
                <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-muted-foreground/80 hover:text-foreground transition-colors group">
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-manrope font-semibold text-xs tracking-wider uppercase">Return Home</span>
                </Link>

                <div className="w-full max-w-sm mx-auto">
                    <h1 className="text-4xl md:text-5xl font-urbanist font-extrabold tracking-tight mb-3 leading-tight">
                        Welcome <br /> Back.
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground/80 font-manrope font-medium mb-10 max-w-sm leading-relaxed">
                        Log in to continue your journey with FoneHouse.
                    </p>

                    <LoginForm />
                </div>
            </div>

            {/* Decorative Right Panel (Elegant Photo Base) */}
            <div className="hidden md:flex flex-1 relative items-center justify-center border-l border-border/20 bg-zinc-950 min-h-screen overflow-hidden">
                {/* Photo Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" />

                {/* Dark Overlays for text legibility and mood */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-background via-brandBlue/5 to-brandBlue/10 mix-blend-overlay" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 max-w-lg">
                    <div className="mb-8 flex items-center justify-center select-none w-48 h-16 rounded-2xl shadow-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-3">
                        <Image
                            src={Logo}
                            alt="FoneHouse Logo"
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <h2 className="font-urbanist text-3xl font-bold text-white mb-4">Your Tech Ecosystem</h2>
                    <p className="font-manrope text-white/60 text-lg leading-relaxed">
                        Access your orders, manage preferences, and explore the latest in mobile innovation all from your personalized dashboard.
                    </p>
                </div>
            </div>
        </main>
    );
}
