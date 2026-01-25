'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, MoreVertical, Search, User } from 'lucide-react'

// Mock User Data
const users = [
    {
        id: 1,
        name: 'Sarah Ahmed',
        email: 'sarah.ahmed@example.com',
        phone: '+966 50 123 4567',
        role: 'Customer',
        joinDate: '2024-01-15',
        status: 'Active',
        avatar: null
    },
    {
        id: 2,
        name: 'Mohammed Ali',
        email: 'm.ali@example.com',
        phone: '+966 55 987 6543',
        role: 'Admin',
        joinDate: '2023-11-20',
        status: 'Active',
        avatar: null
    },
    {
        id: 3,
        name: 'Faisal Omar',
        email: 'faisal.o@example.com',
        phone: '+966 54 321 0987',
        role: 'Customer',
        joinDate: '2024-02-01',
        status: 'Inactive',
        avatar: null
    },
    {
        id: 4,
        name: 'Noura Saleh',
        email: 'noura.saleh@example.com',
        phone: '+966 56 654 3210',
        role: 'Customer',
        joinDate: '2024-01-28',
        status: 'Active',
        avatar: null
    },
    {
        id: 5,
        name: 'Yousef Rami',
        email: 'yousef.r@example.com',
        phone: '+966 59 111 2222',
        role: 'Customer',
        joinDate: '2024-02-10',
        status: 'Active',
        avatar: null
    },
]

export default function UsersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Manage your registered users and their accounts.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-brandBlue outline-none w-full md:w-64 transition-all"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button className="bg-brandBlue text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-brandBlue/20">
                        Add User
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">User</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Role</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {users.map((user, i) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                                                <p className="text-xs text-gray-400">ID: #{user.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {user.phone}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${user.role === 'Admin'
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${user.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-900'
                                                : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:border-zinc-700'
                                            }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 opacity-70" />
                                            {user.joinDate}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Showing 1-5 of 42 users</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">Previous</button>
                        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">Next</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
