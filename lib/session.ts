import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SessionPayload } from './definitions'

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API || 'http://localhost:5500/api/auth'
const REFRESH_API_URL = process.env.NEXT_PUBLIC_REFRESH_API || 'http://localhost:3500/api/auth'

export async function createSession(accessToken: string, refreshToken: string) {
  const expiresAt = Date.now() + 15 * 60 * 1000 // e.g., 15 minutes access token lifetime
  const cookieStore = await cookies()

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!accessToken && !refreshToken) return null

  return { accessToken, refreshToken }
}

export async function refreshAccessToken() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) {
    await deleteSession()
    return null
  }

  try {
    const response = await fetch(`${REFRESH_API_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      await deleteSession()
      return null
    }

    const data = await response.json()
    // Assuming backend returns { accessToken, refreshToken } (or reuses existing refreshToken)
    const newAccessToken = data.accessToken
    const newRefreshToken = data.refreshToken || refreshToken

    await createSession(newAccessToken, newRefreshToken)
    return newAccessToken
  } catch (error) {
    await deleteSession()
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}