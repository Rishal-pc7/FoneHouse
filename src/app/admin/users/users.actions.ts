"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";

export type UserDto = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export async function getUsers(): Promise<UserDto[]> {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function deleteUserAction(id: number): Promise<{success: boolean, message?: string}> {
  try {
    const userCart = await prisma.cart.findUnique({ where: { userId: id } });

    // Completely empty the user's active cart and safely detach it
    if (userCart) {
      await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });
      await prisma.cart.update({ 
        where: { id: userCart.id }, 
        data: { userId: null, totalPrice: 0, totalItems: 0 } 
      });
    }

    // Keep financial historical records intact but anonymize them
    await prisma.orders.updateMany({ where: { userId: id }, data: { userId: null } });
    
    // Sessions and Reviews will Cascade automatically in DB
    await prisma.users.delete({ where: { id } });

    // Using simple revalidatePath works if imported here, otherwise we'll just return true and refresh on client
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete user Prisma error:", error);
    return { success: false, message: "A database error occurred while deleting." };
  }
}
