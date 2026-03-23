import CartContent from './CartContent';
import { getCart } from './cart.actions';
import { EmptyCart } from './EmptyCart';

export default async function CartPage() {
    const cart = await getCart();

    return (
            (!cart || cart.CartItem.length === 0) ? <EmptyCart />
                : <CartContent cart={cart} />
            
    );
}
