import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!email) {
      setErrorMessage("Email address is required.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return;
    }

    setErrorMessage("");

    try {
      setIsSubmitting(true);
      await loginUser({ email, password });
      setIsUserLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error?.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex flex-1 pt-[72px]">
          <section className="flex w-full items-center justify-center px-4 py-12">
            <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white px-8 py-9 shadow-lg shadow-slate-300/30 sm:px-9">
              <div className="mb-7 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Login to Your Account
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Access your dashboard and manage your dog&apos;s health
                </p>
              </div>

              <form
                className="space-y-5"
                method="POST"
                onSubmit={handleLoginSubmit}
              >
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="login-email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="login-email"
                      name="email"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Enter your email"
                      type="email"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      mail
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="login-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="login-password"
                      name="password"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Enter your password"
                      type="password"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock
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
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-6 space-y-4 text-center text-sm">
                <Link
                  className="font-medium text-primary transition-colors hover:text-blue-600"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
                <p className="text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="font-bold text-slate-900 transition-colors hover:text-primary"
                    to="/signup"
                  >
                    Create an Account
                  </Link>
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
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

export default LoginPage;
