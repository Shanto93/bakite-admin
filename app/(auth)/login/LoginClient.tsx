"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Add redirect: false to handle the response manually
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        // Handle authentication errors
        toast.error("Invalid email or password");
        setLoading(false);
      } else if (result?.ok) {
        // Success - redirect manually
        toast.success("User Logged In Successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-black">
      {/* subtle grid bg */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_30%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "36px 36px, 36px 36px",
          backgroundPosition: "-1px -1px, -1px -1px",
        }}
      />

      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/70">
            {/* Logo / heading */}
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-sm">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h16M12 4v16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="text-center">
                <h1 className="text-xl font-semibold leading-tight">
                  Sign in to your account
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Use your admin credentials to continue
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-neutral-700 dark:bg-neutral-900"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 pr-24 text-sm outline-none ring-0 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-neutral-700 dark:bg-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500 dark:border-neutral-700"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-cyan-700 hover:underline dark:text-cyan-400"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:from-cyan-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Don’t have an account?{" "}
              <a
                href="#"
                className="font-medium text-cyan-700 hover:underline dark:text-cyan-400"
              >
                Create one
              </a>
            </div>
          </div>

          {/* Note */}
          <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Tip: Admin login is restricted. Contact your administrator if you
            can’t access.
            <br />
            Email: admin@gmail.com — Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
