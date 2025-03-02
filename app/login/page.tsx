"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider"; // Ensure you have an AuthProvider
import Link from "next/link";

export default function LoginPage() {
  const { supabase } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

    // Check if user is already logged in
    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          router.replace("/"); // Redirect if logged in
        } else {
          setCheckingAuth(false); // Allow rendering if not logged in
        }
      };
  
      checkUser();
    }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      setSuccess(true);

      // 🔥 Ensure session is properly stored
      await supabase.auth.getSession();

      // Redirect to protected page after login
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
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
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-lg border border-gray-600 bg-black/30 px-4 py-2 text-white outline-none focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full rounded-lg border border-gray-600 bg-black/30 px-4 py-2 text-white outline-none focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-center text-red-500">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm text-gray-400 mt-4">
            Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
