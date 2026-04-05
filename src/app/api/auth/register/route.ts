import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignupSchema } from "@/app/login/login.types";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = SignupSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const existing = await prisma.users.findUnique({
            where: { email: parsed.data.email },
        });
        if (existing) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
        }

        const hashed = await bcrypt.hash(parsed.data.password, 12);
        const user = await prisma.users.create({
            data: { name: parsed.data.name, email: parsed.data.email, password: hashed },
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
