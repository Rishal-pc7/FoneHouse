'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

export default function ProfileButton() {
  const { data: session } = useSession();
  const userInitials = session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : '';

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full"
      asChild
    >
      <Link href="/profile">
        {session?.user && session.user.role === 'USER' ? (
          <div className="w-6 h-6 rounded-full bg-white text-brandBlue text-xs font-bold flex items-center justify-center">
            {userInitials}
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
      </Link>
    </Button>
  );
}
