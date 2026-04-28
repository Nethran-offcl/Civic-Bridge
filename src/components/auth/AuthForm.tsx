'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'register'
  action: (formData: FormData) => Promise<{ error?: string } | void>
}

export function AuthForm({ type, action }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{type === 'login' ? 'Welcome Back' : 'Create an Account'}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {type === 'login' ? 'Sign in to access your profile' : 'Register to create your user profile'}
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-3 text-sm text-red-500 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        {type === 'login' ? (
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
