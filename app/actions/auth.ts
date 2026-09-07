'use server'

import { redirect } from 'next/navigation'
import { LoginFormSchema, FormState } from '@/lib/definitions'
import { createSession, deleteSession, getSession } from '@/lib/session'
import { cookies } from 'next/headers'

const API_LOGIN_URL = 'http://localhost:5500/api/auth/login'
const API_LOGOUT_URL = 'http://localhost:3500/api/auth/logout'

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate input fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    // 2. Call backend login API
    const response = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()

    if (!response.ok || !result.data) {
      return {
        message: result.message || 'Invalid credentials. Please try again.',
      }
    }

    // 3. Extract tokens from nested data object and create session
    const { accessToken, refreshToken } = result.data
    await createSession(accessToken, refreshToken)
  } catch (error) {
    return {
      message: 'Server error. Please try again later.',
    }
  }

  // 4. Redirect user after session creation (outside try/catch)
  redirect('/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  try {
    if (refreshToken) {
      await fetch(API_LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({ refreshToken }),
      })
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Clear cookies regardless of API success
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
  }

  // MUST BE OUTSIDE TRY/CATCH
  redirect('/login')
}