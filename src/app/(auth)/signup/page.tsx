"use client";

import { useState } from "react";
import { signUpSchema } from "@/lib/validations/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string[]; email?: string[]; password?: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const calculateStrength = (pwd: string) => {
    if (pwd.length < 8) return "Weak";
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    if (hasUpper && hasNumber && hasSpecial) return "Strong";
    return "Fair";
  };

  const strength = calculateStrength(password);
  const strengthColor =
    password.length === 0
      ? "bg-slate-700"
      : strength === "Weak"
      ? "bg-red-500"
      : strength === "Fair"
      ? "bg-yellow-500"
      : "bg-green-500";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = signUpSchema.safeParse({ name, email, password });
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as any);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Something went wrong");
      } else {
        setSuccessMsg(data.message);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setServerError("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
      {successMsg && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-md">
          {successMsg}
        </div>
      )}
      {serverError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-md">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: password.length === 0 ? '0%' : strength === 'Weak' ? '33%' : strength === 'Fair' ? '66%' : '100%' }}></div>
            </div>
            <span className="text-xs text-slate-400 w-12 text-right">{password.length > 0 ? strength : ""}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !!successMsg}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-md font-medium transition-colors"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
