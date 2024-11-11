import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useSearchParams, redirect } from 'react-router-dom'
import { decode } from 'punycode'
import { useUser } from '../services/user'

export default function Login() {
  const [searchParams] = useSearchParams()
  const jwtoken = searchParams.get('token')
  const { user, login, logout } = useUser()

  interface JWToken {
    id: string
    username: string
    email: string
    // whatever else is in the JWT.
  }
  // Retrieve JWT token from URL and log in
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const jwtToken = queryParams.get('token')
    if (jwtToken) {
      login(jwtToken)
      // Clear the token from URL
      window.history.replaceState({}, document.title, '/')
    }
  }, [login])

  const errorMessage = () => {}

  const handleLogin = () => {
    window.location.href = 'http://localhost:3333/auth/login/google'
  }
  return (
    <div className="flex w-screen justify-center mt-10">
      {user && user.id && <div>Logged in as {user.name}</div>}
      {!user && (
        <button
          onClick={handleLogin}
          className="px-4 py-2 border flex gap-2 hover:cursor-pointer border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      )}
    </div>
  )
}
