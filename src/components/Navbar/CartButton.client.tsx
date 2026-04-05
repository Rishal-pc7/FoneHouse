'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-white/10 hover:text-brandBlue transition-colors rounded-full relative"
      asChild
    >
      <Link href="/cart" prefetch={true}>
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-brandBlue text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
