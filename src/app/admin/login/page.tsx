'use client'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { login } from '@/app/actions/auth'
import Image from 'next/image'
import HeroBg from '../../hero-bg.webp'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full bg-brandBlue text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    )
}

export default function AdminLoginPage() {
    const [state, formAction] = useActionState(login, null)

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-20">
                <Image
                    src={HeroBg}
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={50}
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

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-500 text-sm text-center font-medium">
                                {state.error}
                            </p>
                        </div>
                    )}

                    <SubmitButton />
                </form>
            </motion.div>
        </div>
    )
}
