'use client';

import Link from "next/link";
import { useState } from "react";
import supabase from '@/utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Log in with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Step 2: Handle successful login
      setSuccess(true);
      console.log('Logged in:', data);
      // Redirect or perform other actions after login
    } catch (error :unknown) {
      console.error('Login Error:', error);
      if (error instanceof Error) {
        setError(error.message)
      }
      else {
        setError('Login failed. Please try again.') 
      }
      
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/80 px-6">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-black/60 p-8 shadow-lg backdrop-blur-xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Login to SafeReport
        </h2>

        {success ? (
          <div className="text-center text-green-500">
            <p>Login successful! Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-600 bg-black/30 px-4 py-2 text-white outline-none focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-gray-600 bg-black/30 px-4 py-2 text-white outline-none focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <Link href="/forgot-password" className="hover:text-white">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-500"
            >
              Login
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}