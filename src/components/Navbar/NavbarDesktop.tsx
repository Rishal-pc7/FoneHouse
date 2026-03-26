import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../logo.webp';
import SearchBar from './SearchBar.client';
import CartButton from './CartButton.client';
import ProfileButton from './ProfileButton.client';

export default function NavbarDesktop({ isAuthPage }: { isAuthPage: boolean }) {
  return (
    <div className="hidden md:block bg-black/30 backdrop-blur-md border-b border-white/10 py-4">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
        {/* Left: Logo */}
        <Link href="/" className="relative flex items-center h-10 w-40 shrink-0">
          <Image
            src={Logo}
            alt="Fone House"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-auto">
          {!isAuthPage && (
            <div className="relative w-full group">
              <SearchBar />
            </div>
          )}
        </div>

        {/* Right: Links & Icons */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Specific Links */}
          <nav className="flex items-center gap-6 font-medium text-sm text-gray-200">
            <Link href="/shop" className="hover:text-brandBlue transition-colors">Shop</Link>
            <Link href="/contact" className="hover:text-brandBlue transition-colors">Contact</Link>
          </nav>

          <div className="h-6 w-px bg-white/10"></div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <CartButton />
            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}
