import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

function ForgotPasswordPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      setErrorMessage("Email address is required.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex flex-1 pt-[72px]">
          <section className="flex w-full items-center justify-center px-4 py-12">
            <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white px-8 py-9 shadow-lg shadow-slate-300/30 sm:px-9">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Forgot Your Password?
                </h1>
                <p className="mx-auto mt-2 max-w-[300px] text-sm text-slate-500">
                  Enter your registered email address and we&apos;ll send you a
                  password reset link.
                </p>
              </div>

              <form
                className="space-y-6"
                method="POST"
                onSubmit={handleForgotPasswordSubmit}
              >
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="forgot-email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="forgot-email"
                      name="email"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Enter your registered email"
                      type="email"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      mail
                    </span>
                  </div>
                </div>

                {errorMessage ? (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                <button
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-md shadow-primary/30 transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  type="submit"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-7 text-center text-sm">
                <Link
                  className="inline-flex items-center gap-1.5 font-semibold text-slate-900 transition-colors hover:text-primary"
                  to="/login"
                >
                  <span className="material-symbols-outlined text-base">
                    arrow_back
                  </span>
                  Back to Login
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Secure 256-bit SSL Encrypted Connection</span>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
