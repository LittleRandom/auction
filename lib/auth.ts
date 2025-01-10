// lib/auth.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
        return null
    }

    try {
        // Here you would validate the token and fetch user data
        // This is a placeholder implementation
        const response = await fetch('YOUR_AUTH_API/validate', {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })

        if (!response.ok) {
            return null
        }

        return response.json()
    } catch (error) {
        console.error('Session validation failed:', error)
        return null
    }
}

export async function requireAuth() {
    const session = await getSession()

    if (!session) {
        const params = new URLSearchParams()
        params.set('callbackUrl', '/protected')
        redirect(`/signin?${params.toString()}`)
    }

    return session
}
