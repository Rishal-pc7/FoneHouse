'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function createUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
    }

    const existingUser = await db.users.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    });

    revalidatePath('/admin/users');
    redirect('/admin/users');
}
