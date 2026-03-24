"use server";

import prisma from "@/lib/db";

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
