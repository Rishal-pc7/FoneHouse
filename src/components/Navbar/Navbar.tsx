

'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navlinks } from './NavActions';
import MobNav from './MobNav';
import Logo from '../../logo.webp';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';

function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="z-50 transition-all duration-300 relative md:sticky md:top-0">

      {/* Mobile Layout (2 Rows) */}
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
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full relative"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brandBlue text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full"
                asChild
              >
                <Link href="/profile">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Full Width Search Bar (Not Sticky, offset for fixed header) */}
        <div className="mt-[68px] bg-black/30 backdrop-blur-md border-b border-white/10 py-3">
          <div className="container mx-auto px-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all outline-none focus:bg-white/10 focus:border-brandBlue/50 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Sticky Header) */}
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
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm transition-all outline-none focus:bg-white/10 focus:border-brandBlue/50 text-white placeholder:text-gray-400"
              />
            </div>
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
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full relative"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brandBlue text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full"
                asChild
              >
                <Link href="/profile">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
