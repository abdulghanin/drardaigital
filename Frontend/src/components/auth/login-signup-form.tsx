"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

type Mode = "login" | "signup";

export function LoginSignupForm({ dict }: { dict: Dictionary }) {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);
  const copy = dict.loginSignup;
  const isSignup = mode === "signup";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(true);
  };

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setNotice(false);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section className="w-full max-w-md" aria-labelledby="account-title">
        <div className="mb-7 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-dara-blue/10 text-dara-blue">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase text-dara-blue">{copy.eyebrow}</p>
          <h1 id="account-title" className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            {isSignup ? copy.signupTitle : copy.loginTitle}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {isSignup ? copy.signupDescription : copy.loginDescription}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5 shadow-card sm:p-7">
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-background p-1" role="tablist" aria-label={copy.eyebrow}>
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              onClick={() => changeMode("login")}
              className={`min-h-10 rounded-md px-3 text-sm font-semibold transition-colors ${
                !isSignup ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              {copy.loginTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              onClick={() => changeMode("signup")}
              className={`min-h-10 rounded-md px-3 text-sm font-semibold transition-colors ${
                isSignup ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              {copy.signupTab}
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-foreground">{copy.fullName}</span>
                <input
                  autoComplete="name"
                  name="name"
                  required
                  className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-dara-blue"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-foreground">{copy.email}</span>
              <input
                autoComplete="email"
                name="email"
                type="email"
                required
                dir="ltr"
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-dara-blue"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-foreground">{copy.password}</span>
              <span className="relative block">
                <input
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={isSignup ? 8 : undefined}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  dir="ltr"
                  className="h-11 w-full rounded-lg border border-border bg-background px-3.5 pe-11 text-sm text-foreground outline-none transition-colors focus:border-dara-blue"
                />
                <button
                  type="button"
                  aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                  title={showPassword ? copy.hidePassword : copy.showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 end-0 flex w-11 items-center justify-center text-muted transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
              {isSignup && <span className="mt-1.5 block text-xs text-muted">{copy.passwordHint}</span>}
            </label>

            {isSignup ? (
              <div className="pt-1">
                <Button type="submit" className="w-full" size="lg">
                  {copy.signupSubmit}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-muted">
                  <input type="checkbox" name="remember" className="h-4 w-4 rounded accent-dara-blue" />
                  {copy.remember}
                </label>
                <button type="button" onClick={() => setNotice(true)} className="text-xs font-semibold text-dara-blue hover:underline">
                  {copy.forgotPassword}
                </button>
              </div>
            )}

            {!isSignup && (
              <Button type="submit" className="w-full" size="lg">
                {copy.loginSubmit}
              </Button>
            )}

            {notice && (
              <p className="rounded-lg border border-dara-blue/20 bg-dara-blue/5 p-3 text-sm leading-relaxed text-foreground" role="status" aria-live="polite">
                {copy.authNotice}
              </p>
            )}
          </form>

          <div className="mt-5 border-t border-border pt-4 text-center">
            <button
              type="button"
              onClick={() => changeMode(isSignup ? "login" : "signup")}
              className="text-sm font-semibold text-dara-blue hover:underline"
            >
              {isSignup ? copy.switchToLogin : copy.switchToSignup}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}