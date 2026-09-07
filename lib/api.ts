// app/lib/api.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api'

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value

  // Attach Current Access Token
  const headers = new Headers(options.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // If Token Expired (401), Attempt Token Refresh
  if (response.status === 401) {
    const refreshSuccess = await refreshAccessToken()

    if (refreshSuccess) {
      // Retry original request with new access token
      const newAccessToken = cookieStore.get('accessToken')?.value
      headers.set('Authorization', `Bearer ${newAccessToken}`)

      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })
    } else {
      // Refresh failed or refresh token expired -> Clear cookies & redirect
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      redirect('/login')
    }
  }

  return response
}

async function refreshAccessToken(): Promise<boolean> {
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

    const data = await res.json()
    
    // Update Cookies with New Access Token
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return true
  } catch (error) {
    return false
  }
}