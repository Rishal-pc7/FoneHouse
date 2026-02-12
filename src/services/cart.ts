export const updateCartItemQuantity = async (id: number, quantity: number, productId: number) => {
    try {
        const response = await fetch(`/api/cart/updateQuantity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, quantity, productId }),
        });

        if (!response.ok) {
            throw new Error('Failed to update quantity');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

export const removeCartItem = async (id: number) => {
    try {
        const response = await fetch(`/api/cart/remove/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
};
