import React from 'react';
import UsersTable from './users-table.client';
import { getUsers } from './users.actions';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <UsersTable initialUsers={users} />
    </div>
  );
}
