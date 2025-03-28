"use client";

import Link from "next/link";
import { useState } from "react";
import supabase from '@/utils/supabaseClient';

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Step 2: Insert user details into the `users` table
      const {error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id, // Link to the auth user
            name,
            email,
          },
        ])
        .select();

      if (userError) {
        throw userError;
      }

      setSuccess(true);
    } catch (error : unknown) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Sign up failed. Please try again.');
      }
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-black/80 px-6">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-black/60 p-8 shadow-lg backdrop-blur-xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Create an Account
        </h2>

        {success ? (
          <div className="text-center text-green-500">
            <p>Sign up successful! Please check your email to verify your account.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-600 bg-black/30 px-4 py-2 text-white outline-none focus:border-blue-500"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-500"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Already have an account? */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}