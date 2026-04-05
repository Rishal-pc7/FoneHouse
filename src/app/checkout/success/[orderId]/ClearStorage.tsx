'use client'

import { useCart } from '@/context/CartContext';
import { useEffect } from 'react'

export function ClearStorage() {
    const {setCount}=useCart();
    useEffect(() => {
        setCount(0);
        localStorage.removeItem('cartCount')
        localStorage.removeItem('orderId')
        localStorage.removeItem('sessionId')
    }, [])

    return null
}
