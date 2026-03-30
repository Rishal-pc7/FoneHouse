"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { LoginInput, LoginSchema } from "../login.types";
import Link from "next/link";
import { signIn} from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCartSession } from "../login.actions";

const inputVariants = {
    idle: { y: 0, opacity: 1 },
    focused: { y: -2, opacity: 1 }
};

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema)
    });


    const onSubmit = async (data: LoginInput) => {
        setServerError(null);
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });

            if (res?.error) {
                setServerError("Invalid email or password");
            } else if (res?.ok) {
                const res=await updateCartSession();
                if(res.status && res.cartCount){
                    localStorage.setItem("cartCount",res.cartCount.toString());
                }
                window.location.href = callbackUrl;
            }
        } catch (error) {
            setServerError("Unexpected Error occured");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
            <motion.div
                className="relative group mt-2"
                variants={inputVariants}
                animate={focusedField === 'email' ? 'focused' : 'idle'}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="email"
                    className="peer w-full bg-transparent border-b-2 border-border/50 py-4 text-xl md:text-2xl outline-none transition-all placeholder:text-transparent focus:border-brandBlue text-foreground font-manrope font-medium"
                    placeholder="Email Address"
                />
                <label
                    htmlFor="email"
                    className="absolute left-0 top-4 text-muted-foreground text-xl md:text-2xl transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-xs peer-focus:text-brandBlue peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 opacity-60 peer-valid:-top-6 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:opacity-100 font-manrope"
                >
                    Email Address
                </label>
                <div className="absolute bottom-0 left-0 h-0.5 bg-brandBlue w-0 peer-focus:w-full transition-all duration-500 ease-out" />
                {errors.email && (
                    <p className="absolute -bottom-6 left-0 text-sm text-destructive font-bold">{errors.email.message}</p>
                )}
            </motion.div>

            <motion.div
                className="relative group mt-2"
                variants={inputVariants}
                animate={focusedField === 'password' ? 'focused' : 'idle'}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    autoComplete="current-password"
                    className="peer w-full bg-transparent border-b-2 border-border/50 py-4 text-xl md:text-2xl outline-none transition-all placeholder:text-transparent focus:border-brandBlue text-foreground font-manrope font-medium"
                    placeholder="Password"
                />
                <label
                    htmlFor="password"
                    className="absolute left-0 top-4 text-muted-foreground text-xl md:text-2xl transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-xs peer-focus:text-brandBlue peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 opacity-60 peer-valid:-top-6 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:opacity-100 font-manrope"
                >
                    Password
                </label>
                <div className="absolute bottom-0 left-0 h-0.5 bg-brandBlue w-0 peer-focus:w-full transition-all duration-500 ease-out" />
                {errors.password && (
                    <p className="absolute -bottom-6 left-0 text-sm text-destructive font-bold">{errors.password.message}</p>
                )}
            </motion.div>

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

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden group bg-foreground text-background py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-4"
                >
                    <div className="absolute inset-0 w-full h-full bg-linear-to-r from-brandBlue to-brandGreen opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                Sign In To Account
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </>
                        )}
                    </span>
                </button>
            </div>

            <p className="text-center text-muted-foreground font-manrope mt-4 text-lg">
                New to FoneHouse?{" "}
                <Link href="/signup" className="text-foreground font-bold hover:text-brandGreen hover:underline underline-offset-4 decoration-2 transition-all">
                    Create an account
                </Link>
            </p>
        </form>
    );
}
