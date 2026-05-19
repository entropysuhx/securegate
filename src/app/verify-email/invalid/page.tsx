import Link from "next/link";
import { XCircle } from "lucide-react";

export default function VerifyInvalidPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1117] text-white p-4">
      <div className="max-w-md w-full bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Invalid Link</h2>
        <p className="text-slate-400 mb-8">This verification link is invalid or has already been used.</p>
        <Link
          href="/login"
          className="inline-block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
