"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyExpiredPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || "Failed to resend");
      } else {
        setMessage("Verification email sent! Check your inbox.");
        setEmail("");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1117] text-white p-4">
      <div className="max-w-md w-full bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="text-yellow-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Link Expired</h2>
        <p className="text-slate-400 mb-6">This verification link has expired.</p>

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-md text-sm text-left">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-md text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleResend} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Enter your email to resend</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-md font-medium transition-colors"
          >
            {isLoading ? "Sending..." : "Resend Verification Email"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Return to login
          </Link>
        </p>
      </div>
    </div>
  );
}
