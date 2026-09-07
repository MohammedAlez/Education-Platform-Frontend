import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { refreshAccessToken } from '@/lib/session'

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!accessToken && refreshToken) {
    accessToken = (await refreshAccessToken()) ?? undefined
  }

  if (!accessToken) {
    redirect('/login')
  }

  return { isAuth: true, accessToken }
})