"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const getDisplayName = (email: string) => {
    return email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const savedAccount = localStorage.getItem("complyai_account");

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (savedAccount) {
        const existing = JSON.parse(savedAccount);

        if (existing.email === email) {
          setError("Account already exists. Please login.");
          return;
        }
      }

      const account = {
        name: name.trim(),
        email,
        password,
      };

      localStorage.setItem(
        "complyai_account",
        JSON.stringify(account)
      );

      localStorage.setItem(
        "complyai_user",
        JSON.stringify({
          name: name.trim(),
          email,
        })
      );

      router.push("/dashboard");
      return;
    }

    if (savedAccount) {
      const account = JSON.parse(savedAccount);

      if (
        account.email !== email ||
        account.password !== password
      ) {
        setError("Incorrect email or password.");
        return;
      }

      localStorage.setItem(
        "complyai_user",
        JSON.stringify({
          name: account.name,
          email: account.email,
        })
      );
    } else {
      const user = {
        name: getDisplayName(email),
        email,
      };

      localStorage.setItem(
        "complyai_user",
        JSON.stringify(user)
      );
    }

    router.push("/dashboard");
  };
  return (
    <div className="min-h-screen bg-[#080d19] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-600/30">
            C
          </div>

          <h1 className="text-3xl font-bold text-white">
            ComplyAI
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Intelligent Compliance Management Platform
          </p>

        </div>

        {/* Login Card */}

        <div className="bg-[#111a2b] border border-gray-800 rounded-2xl p-7 shadow-2xl">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-white">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              {isSignup
                ? "Create your account to get started."
                : "Login to access your compliance dashboard."}
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}

            {isSignup && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-[#080d19] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Email */}

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#080d19] border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#080d19] border border-gray-700 rounded-lg px-4 py-3 pr-20 text-white outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>
            {/* Remember Me */}

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-blue-600"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError("Please contact your administrator to reset your password.")
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* Error Message */}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-600/20"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>

          </form>

          {/* Signup / Login Switch */}

          <div className="text-center mt-7 text-sm text-gray-400">

            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
                setName("");
                setEmail("");
                setPassword("");
              }}
              className="text-blue-400 font-semibold ml-2 hover:text-blue-300"
            >
              {isSignup ? "Login" : "Create Account"}
            </button>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center text-gray-600 text-xs mt-7">
          © 2026 ComplyAI. All rights reserved.
        </p>

        <button
          onClick={() => router.push("/")}
          className="block mx-auto text-gray-400 hover:text-white text-sm mt-4"
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}