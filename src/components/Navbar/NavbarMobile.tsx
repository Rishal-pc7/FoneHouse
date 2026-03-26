import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../logo.webp';
import MobNav from './MobNav';
import SearchBar from './SearchBar.client';
import CartButton from './CartButton.client';
import ProfileButton from './ProfileButton.client';

export default function NavbarMobile({ isAuthPage }: { isAuthPage: boolean }) {
  return (
    <div className="md:hidden flex flex-col">
      {/* Row 1: Menu | Logo | Icons (Fixed) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          {/* Left: Hamburger Menu */}
          <div className="shrink-0">
            <MobNav />
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="relative flex items-center h-8 w-28 shrink-0">
              <Image
                src={Logo}
                alt="Fone House"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Cart & Profile */}
          <div className="flex items-center gap-1 shrink-0">
            <CartButton />
            <ProfileButton />
          </div>
        </div>
      </div>

      {/* Row 2: Full Width Search Bar (Not Sticky, offset for fixed header) */}
      {!isAuthPage && (
        <div className="mt-[68px] bg-black/30 backdrop-blur-md border-b border-white/10 py-3">
          <div className="container mx-auto px-4">
            <div className="relative w-full group">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
