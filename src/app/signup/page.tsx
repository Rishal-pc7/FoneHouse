import type { Metadata } from "next";
import SignupForm from "./_components/SignupForm.client";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Logo from "../../logo.webp";

export const metadata: Metadata = {
    title: "Create Account | FoneHouse",
    description: "Sign up for a FoneHouse account.",
};

export default function SignupPage() {
    return (
        <main className="min-h-screen w-full bg-background flex flex-col md:flex-row relative overflow-hidden text-foreground">
            {/* Ambient Background Glows - Reduced Opacity */}
            <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brandGreen/10 blur-[120px] pointer-events-none mix-blend-screen" />

            {/* Decorative Left Panel (Elegant Photo Base) */}
            <div className="hidden md:flex flex-1 relative items-center justify-center border-r border-border/20 bg-zinc-950 min-h-screen overflow-hidden">
                {/* Photo Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" />

                {/* Dark Overlays for text legibility and mood */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-l from-background via-brandGreen/5 to-brandGreen/10 mix-blend-overlay" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 max-w-lg">
                    <div className="mb-8 flex items-center justify-center select-none w-48 h-16 rounded-2xl shadow-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-3">
                        <Image
                            src={Logo}
                            alt="FoneHouse Logo"
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <h2 className="font-urbanist text-3xl font-bold text-white mb-4">Join the Network</h2>
                    <p className="font-manrope text-white/60 text-lg leading-relaxed">
                        Become a part of thousands of satisfied customers enjoying premium tech delivered with seamless service.
                    </p>
                </div>
            </div>

            {/* Content Container (Right Side) */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-24 relative z-10 w-full md:w-1/2 min-h-screen py-10 md:py-0">
                <Link href="/" className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 text-muted-foreground/80 hover:text-foreground transition-colors group">
                    <span className="font-manrope font-semibold text-xs tracking-wider uppercase">Return Home</span>
                    <MoveLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform rotate-180" />
                </Link>

                <div className="w-full max-w-sm mx-auto">
                    <h1 className="text-4xl md:text-5xl font-urbanist font-extrabold tracking-tight mb-3 leading-tight">
                        Create an <span className="text-brandGreen">Account.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground/80 font-manrope font-medium mb-10 max-w-sm leading-relaxed">
                        Create your account to unlock exclusive access to the FoneHouse ecosystem.
                    </p>

                    <SignupForm />
                </div>
            </div>
        </main>
    );
}
