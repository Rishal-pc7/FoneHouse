'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
type ActionState = {
  error?: string
} | null

export async function login(prevState: ActionState, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')
  if (username === 'admin' && password === 'admin123') {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    redirect('/admin')
  }
  return {
    error: 'Invalid credentials'
  }
}
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}
