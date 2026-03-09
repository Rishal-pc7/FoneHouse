"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { SignupInput, SignupSchema } from "../../login/login.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputVariants = {
    idle: { y: 0, opacity: 1 },
    focused: { y: -2, opacity: 1 }
};

const fields = [
    { name: "name", type: "text", label: "Full Name", autoComplete: "name" },
    { name: "email", type: "email", label: "Email Address", autoComplete: "email" },
    { name: "password", type: "password", label: "Password", autoComplete: "new-password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password", autoComplete: "new-password" }
] as const;

export default function SignupForm() {
    const router = useRouter();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupInput>({
        resolver: zodResolver(SignupSchema)
    });

    const onSubmit = async (data: SignupInput) => {
        setServerError(null);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (!res.ok) {
                setServerError(result.error || "Registration failed");
            } else {
                router.push("/login");
            }
        } catch (error) {
            setServerError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
            {fields.map(({ name, type, label, autoComplete }) => (
                <motion.div
                    key={name}
                    className="relative group mt-2"
                    variants={inputVariants}
                    animate={focusedField === name ? 'focused' : 'idle'}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <input
                        id={name}
                        type={type}
                        {...register(name)}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        autoComplete={autoComplete}
                        className="peer w-full bg-transparent border-b-2 border-border/50 py-3 text-lg md:text-xl outline-none transition-all placeholder:text-transparent focus:border-brandGreen text-foreground font-manrope font-medium"
                        placeholder={label}
                    />
                    <label
                        htmlFor={name}
                        className="absolute left-0 top-3 text-muted-foreground text-lg md:text-xl transition-all duration-300 pointer-events-none peer-focus:-top-5 peer-focus:text-xs peer-focus:text-brandGreen peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 opacity-60 peer-valid:-top-5 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:opacity-100 font-manrope"
                    >
                        {label}
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-brandGreen w-0 peer-focus:w-full transition-all duration-500 ease-out" />
                    {errors[name] && (
                        <p className="absolute -bottom-5 left-0 text-xs text-destructive font-bold">{errors[name]?.message}</p>
                    )}
                </motion.div>
            ))}

            <AnimatePresence>
                {serverError && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-destructive/10 text-destructive px-6 py-4 rounded-xl border border-destructive/20 font-medium mt-4"
                    >
                        {serverError}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden group bg-foreground text-background py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-6"
                >
                    <div className="absolute inset-0 w-full h-full bg-linear-to-r from-brandGreen to-brandBlue opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                Complete Registration
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </>
                        )}
                    </span>
                </button>
            </div>

            <p className="text-center text-muted-foreground font-manrope mt-4 text-base md:text-lg">
                Already part of the network?{" "}
                <Link href="/login" className="text-foreground font-bold hover:text-brandBlue hover:underline underline-offset-4 decoration-2 transition-all">
                    Sign in here
                </Link>
            </p>
        </form>
    );
}
