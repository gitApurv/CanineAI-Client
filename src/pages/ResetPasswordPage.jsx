import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { resetPassword } from "../services/AuthService";

function ResetPasswordPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = String(searchParams.get("token") || "").trim();
  const email = String(searchParams.get("email") || "").trim();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") || "",
    ).trim();

    if (!password || !confirmPassword) {
      setErrorMessage("Please enter both password fields.");
      return;
    }

    const isLongEnough = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

    if (!isLongEnough || !hasNumber || !hasSpecialCharacter) {
      setErrorMessage(
        "Password must be at least 8 characters and include 1 number and 1 special character.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!token || !email) {
      setErrorMessage("Invalid reset link. Please request a new one.");
      return;
    }

    setErrorMessage("");

    try {
      setIsSubmitting(true);
      await resetPassword({ token, email, password });
      setSuccessMessage("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      const message = error?.message || "Failed to reset password.";
      setErrorMessage(message);
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
            <div className="w-full max-w-[430px] rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-lg shadow-slate-300/40 sm:px-9 sm:py-9">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Reset Your Password
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Create a new password for your account.
                </p>
              </div>

              <form
                className="space-y-5"
                method="POST"
                onSubmit={handleResetPassword}
              >
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="reset-password"
                  >
                    New Password
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                    id="reset-password"
                    name="password"
                    onChange={() => errorMessage && setErrorMessage("")}
                    placeholder="Enter new password"
                    type="password"
                  />
                  <p className="flex items-start gap-1.5 text-[11px] leading-5 text-slate-500">
                    <span className="material-symbols-outlined mt-[1px] text-sm text-slate-400">
                      info
                    </span>
                    Must be at least 8 characters, include 1 number and 1
                    special character.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="reset-confirm-password"
                  >
                    Confirm New Password
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                    id="reset-confirm-password"
                    name="confirmPassword"
                    onChange={() => errorMessage && setErrorMessage("")}
                    placeholder="Confirm new password"
                    type="password"
                  />
                </div>

                {errorMessage ? (
                  <div
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                ) : null}

                {successMessage ? (
                  <div
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                    role="status"
                  >
                    {successMessage}
                  </div>
                ) : null}

                <button
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
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

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Secure 256-bit SSL Connection</span>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
