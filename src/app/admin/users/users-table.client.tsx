"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Search from 'lucide-react/dist/esm/icons/search';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import { UserDto, deleteUserAction } from './users.actions';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UsersTableProps {
  initialUsers: UserDto[];
}

export default function UsersTable({ initialUsers }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    setIsDeleting(confirmDeleteId);
    try {
      const result = await deleteUserAction(confirmDeleteId);
      if (result.success) {
        setConfirmDeleteId(null);
        router.refresh();
      } else {
        setConfirmDeleteId(null);
        setAlertMessage("Failed to delete user: " + result.message);
      }
    } catch (err: any) {
      setConfirmDeleteId(null);
      setAlertMessage("Network/Server Action Error: " + err.message + " --- Please hard refresh the page (F5) and try again.");
    }
    setIsDeleting(null);
  };

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your registered users and their accounts.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-brandBlue outline-none w-full md:w-64 transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <Link 
                href="/admin/users/add"
                className="bg-brandBlue text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-brandBlue/20"
            >
                Add User
            </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                          <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">User</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Contact</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Role</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
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
                                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                      <Mail className="w-4 h-4 text-gray-400" />{user.email}
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                                      {user.role}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <button 
                                      onClick={() => handleDeleteClick(user.id)}
                                      disabled={isDeleting === user.id}
                                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                      title="Delete User"
                                  >
                                      {isDeleting === user.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                  </button>
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                  No users found.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredUsers.length} user(s)
              </p>
          </div>
      </div>

      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this user? This will anonymize their orders and carts. This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setConfirmDeleteId(null)} disabled={isDeleting !== null}>Cancel</Button>
                <Button variant="destructive" onClick={executeDelete} disabled={isDeleting !== null}>
                    {isDeleting !== null ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!alertMessage} onOpenChange={(open) => !open && setAlertMessage(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Notice</DialogTitle>
                <DialogDescription>
                    {alertMessage}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setAlertMessage(null)}>Close</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
