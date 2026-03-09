'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import HeroBg from '../../hero-bg.webp'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function AdminLoginPage() {
    const router = useRouter()
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: any) => {
        setServerError(null)
        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (res?.error) {
                setServerError("Invalid credentials.")
            } else if (res?.ok) {
                // Explicitly check role before redirecting
                const { getSession, signOut } = await import('next-auth/react')
                const session = await getSession()

                if (session?.user?.role !== 'ADMIN') {
                    await signOut({ redirect: false })
                    setServerError("Access denied. Admin privileges required.")
                    return
                }

                window.location.href = "/admin"
            }
        } catch (e) {
            setServerError("Something went wrong.")
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src={HeroBg}
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={50}
                    priority
                    unoptimized
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md p-8 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brandBlue to-brandGreen mb-2">
                        Admin Portal
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Sign in to manage FoneHouse
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                            placeholder="Enter username or email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    {serverError && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-500 text-sm text-center font-medium">
                                {serverError}
                            </p>
                        </div>
                    )}

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-brandBlue text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
