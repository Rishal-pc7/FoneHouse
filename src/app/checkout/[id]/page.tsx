import prisma from "@/lib/db";
import CheckoutContent from "./checkoutContent";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    const cart=await prisma.cart.findUnique({
        where:{
            id:parseInt(id)
        },
        include:{
            CartItem:{
                include:{
                    Products:{
                        select:{
                            id:true,
                            name:true,
                            price:true,
                            img:true,
                            category:true,
                            isInStock:true,
                            brand:true,
                            created_at:true
                        }
                    }
                }
            }
        }
    })    
    const serializedCart = cart ? {
        ...cart,
        CartItem: cart.CartItem.map((item) => ({
            ...item,
            Products: {
                ...item.Products,
                price: item.Products.price.toNumber(),
            }
        }))
    } : null;
    return (
        <div>
            <CheckoutContent cart={serializedCart}/>
        </div>
    )

}