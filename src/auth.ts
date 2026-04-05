import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/app/login/login.types"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login", // Redirect unauthorized users here
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Validate credentials against Zod schema
                const validatedFields = LoginSchema.safeParse(credentials)
                if (!validatedFields.success) return null

                const { email, password } = validatedFields.data

                // 2. Fetch User
                const user = await prisma.users.findUnique({ where: { email } })
                if (!user || !user.password) return null

                // 3. Verify Password securely
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if (!passwordsMatch) return null

                // 4. Return safe user object (NEVER return the password here)
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        // Auth.js automatically encrypts this token into a JWE and stores it in an HttpOnly cookie
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        }
    }
})
