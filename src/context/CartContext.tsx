'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface CartContextType {
    cartCount: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, hasSession }: { children: ReactNode; hasSession: boolean }) {

    const [cartCount, setCount] = useState<number>(0);

    useEffect(() => {
        if (!hasSession) {
            localStorage.removeItem('cartCount');
            setCount(0);
        } else {
            const count = localStorage.getItem('cartCount');
            if (count) {
                setCount(parseInt(count));
            }
        }
    }, [hasSession]);

    return (
        <CartContext.Provider value={{ cartCount, setCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
