import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function VerifySuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1117] text-white p-4">
      <div className="max-w-md w-full bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Email verified!</h2>
        <p className="text-slate-400 mb-8">Your account is now active and you can log in securely.</p>
        <Link
          href="/login"
          className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
