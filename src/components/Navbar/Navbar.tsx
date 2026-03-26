'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

export default function Navbar() {
  const pathname = usePathname();

  // Hide entirely on admin pages
  if (pathname?.startsWith('/admin')) return null;

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <header className="z-50 transition-all duration-300 relative md:sticky md:top-0">
      <NavbarMobile isAuthPage={isAuthPage} />
      <NavbarDesktop isAuthPage={isAuthPage} />
    </header>
  );
}
