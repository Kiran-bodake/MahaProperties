"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: "Lead Generation", subtitle: "Track every lead from source to closure", accent: "Gradients by channel" },
  { title: "Pipeline Management", subtitle: "Drag and drop stages with ease", accent: "High priority status" },
  { title: "Insightful Analytics", subtitle: "Real-time funnel and source charts", accent: "Powerful reporting" },
];

function formatOrgName() {
  return "MahaProperties";
}

export default function AdminLogin() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((old) => (old + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const complete = useMemo(() => `${formatOrgName()}Admin`, []);

  const handlePrev = () => setActive((old) => (old - 1 + slides.length) % slides.length);
  const handleNext = () => setActive((old) => (old + 1) % slides.length);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, securityCode }),
      });

      let data: { message?: string } = { message: "Unexpected server response" };
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.warn("API returned non-JSON response", jsonErr);
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      router.push("/x-admin/dashboard");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Authentication error");
    } finally {
      setBusy(false);
    }
  };

  const continueWithGoogle = () => {
    window.location.href = "/api/admin/auth/google";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-10 text-white lg:p-14">
            <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_45%)]" />
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl" />

            {slides.map((slide, idx) => (
              <div
                key={slide.title}
                className={`absolute inset-0 p-10 transition-all duration-700 ease-in-out lg:p-14 ${
                  idx === active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
              >
                <div className="flex h-full flex-col justify-center">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.18)]">
                    *
                  </div>
                  <h2 className="text-3xl font-bold md:text-4xl">Hello {complete}!</h2>
                  <p className="mt-4 max-w-md text-base text-white/85">
                    {slide.subtitle}
                  </p>
                  <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/60">{slide.accent}</p>
                </div>
              </div>
            ))}

            <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-6 lg:px-10">
              <button
                onClick={handlePrev}
                className="rounded-full border border-white/30 bg-white/15 p-2 text-white/90 transition hover:bg-white/25"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                className="rounded-full border border-white/30 bg-white/15 p-2 text-white/90 transition hover:bg-white/25"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    idx === active ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-12 lg:px-14">
            <div className="w-full max-w-sm space-y-7">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Welcome back</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in to your account</h1>
                <p className="mt-2 text-sm text-slate-500">Use your admin credentials to continue.</p>
              </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={continueWithGoogle}
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-[10px] font-bold text-slate-700">G</span>
                </span>
                Continue with Google
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or sign in with email
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-600">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200/70 bg-white px-4 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="admin@mahaproperties.in"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-600">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200/70 bg-white px-4 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-slate-600">Security Code</label>
                <input
                  id="code"
                  type="text"
                  required
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200/70 bg-white px-4 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Enter security code"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  Keep me logged in
                </label>
                <button type="button" className="text-indigo-600 hover:text-indigo-700">Forgot password?</button>
              </div>

              {error && <p className="text-sm text-rose-500">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="h-11 w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.3)] transition hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {busy ? "Signing in..." : "Sign in"}
              </button>
            </form>

              <p className="text-center text-sm text-slate-500">
                Need an account? <span className="font-semibold text-indigo-600">Contact admin</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
