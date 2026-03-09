import React from 'react'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Users from 'lucide-react/dist/esm/icons/users';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Activity from 'lucide-react/dist/esm/icons/activity';

const stats = [
    { name: 'Total Revenue', value: 'SAR 45,231', change: '+20.1%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Active Users', value: '2,350', change: '+180.1%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Sales', value: '12,234', change: '+19%', icon: ShoppingBag, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { name: 'Active Now', value: '573', change: '+201', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of your store&apos;s performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-emerald-500 font-medium">{stat.change}</span>
                            <span className="text-gray-400 ml-2">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 h-64">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="flex items-center justify-center h-full text-gray-400">Coming soon</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 h-64">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Products</h3>
                    <div className="flex items-center justify-center h-full text-gray-400">Coming soon</div>
                </div>
            </div>
        </div>
    )
}
