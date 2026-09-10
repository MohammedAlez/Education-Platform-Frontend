// app/lib/api.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSession, destroySession } from './session'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api'

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value

  const headers = new Headers(options.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    const refreshSuccess = await refreshTokens()

    if (refreshSuccess) {
      const updatedCookieStore = await cookies()
      const newAccessToken = updatedCookieStore.get('accessToken')?.value

      if (newAccessToken) {
        headers.set('Authorization', `Bearer ${newAccessToken}`)
      }

      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })
    } else {
      await destroySession()
      redirect('/login')
    }
  }

  return response
}

// --- Single-flight lock for refreshTokens() ---------------------------------
// Problem this solves: if two Server Components on the same page both call
// fetchWithAuth() while the access token is expired, both would previously
// hit /auth/refresh independently. Since refresh tokens are rotated, the
// second call sends an already-invalidated token and fails, logging the user
// out even though their session was valid a moment earlier.
//
// This module-scoped promise dedupes concurrent refresh calls that happen
// within the same request/render. It does NOT protect against two entirely
// separate concurrent HTTP requests hitting the server at the same instant —
// for that, ask your API team whether /auth/refresh tolerates a short reuse
// grace period on the just-rotated refresh token.
let refreshPromise: Promise<boolean> | null = null

async function refreshTokens(): Promise<boolean> {
  if (refreshPromise) return refreshPromise

  refreshPromise = doRefresh()
  const result = await refreshPromise
  refreshPromise = null
  return result
}

async function doRefresh(): Promise<boolean> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) return false

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!res.ok) return false

    const result = await res.json()
    const { accessToken, refreshToken: newRefreshToken } = result.data

    await createSession(accessToken, newRefreshToken)
    return true
  } catch (error) {
    return false
  }
}