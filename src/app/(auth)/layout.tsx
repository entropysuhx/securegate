import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1117] text-white p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">SecureGate</h1>
        <p className="text-slate-400 mt-2">Enterprise-grade authentication</p>
      </div>
      {children}
    </div>
  );
}
