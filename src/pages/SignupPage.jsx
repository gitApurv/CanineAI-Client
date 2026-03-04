import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { registerUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import { handleImageUpload } from "../utils/imageUpload";

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [uploadedProfileImageUrl, setUploadedProfileImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();

  const handleProfilePictureChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (errorMessage) {
      setErrorMessage("");
    }

    if (!selectedFile) {
      setUploadedProfileImageUrl("");
      setProfilePreviewUrl("");
      return;
    }

    const uploadedImageUrl = await handleImageUpload(selectedFile, {
      setLoading: setIsSubmitting,
      setValue: (field, value) => {
        if (field === "image") {
          setUploadedProfileImageUrl(value);
          setProfilePreviewUrl(value);
        }
      },
      showAlert: (message) => setErrorMessage(message),
    });

    if (uploadedImageUrl) {
      setUploadedProfileImageUrl(uploadedImageUrl);
      setProfilePreviewUrl(uploadedImageUrl);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const profilePictureFile = formData.get("profilePicture");
    const password = String(formData.get("password") || "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") || "",
    ).trim();

    if (!name) {
      setErrorMessage("Name is required.");
      return;
    }

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

    if (!confirmPassword) {
      setErrorMessage("Please confirm your password.");
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

    setErrorMessage("");

    try {
      setIsSubmitting(true);

      let profilePictureUrl = uploadedProfileImageUrl;
      const hasSelectedProfilePicture =
        profilePictureFile instanceof File && profilePictureFile.size > 0;

      if (hasSelectedProfilePicture && !profilePictureUrl) {
        const uploadedImageUrl = await handleImageUpload(profilePictureFile, {
          setLoading: setIsSubmitting,
          setValue: (field, value) => {
            if (field === "image") {
              setUploadedProfileImageUrl(value);
              setProfilePreviewUrl(value);
            }
          },
          showAlert: (message) => setErrorMessage(message),
        });

        if (!uploadedImageUrl) {
          return;
        }

        profilePictureUrl = uploadedImageUrl;
      }

      await registerUser({
        name,
        email,
        password,
        profilePictureUrl,
      });

      setIsUserLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed.";
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
          <section className="flex w-full items-center justify-center px-4 py-10">
            <div className="w-full max-w-[430px] rounded-3xl border border-slate-200 bg-white px-8 py-8 shadow-lg shadow-slate-300/40 sm:px-9">
              <div className="mb-7 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Create Your Account
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Start tracking your dog&apos;s health in a few simple steps
                </p>
              </div>
              <form
                className="space-y-4"
                method="POST"
                onSubmit={handleSignupSubmit}
              >
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="signup-full-name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      id="signup-full-name"
                      name="name"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Enter your full name"
                      type="text"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      person
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="signup-email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      id="signup-email"
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
                    htmlFor="signup-profile-picture"
                  >
                    Profile Picture (Optional)
                  </label>
                  <div className="relative">
                    <input
                      accept="image/*"
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-11 pr-3 text-sm text-slate-700 outline-none transition-all file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-blue-600 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      id="signup-profile-picture"
                      name="profilePicture"
                      onChange={handleProfilePictureChange}
                      type="file"
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      photo_camera
                    </span>
                  </div>

                  {profilePreviewUrl ? (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        alt="Selected profile preview"
                        className="h-14 w-14 rounded-full border border-slate-200 object-cover"
                        src={profilePreviewUrl}
                      />
                      <p className="text-xs font-medium text-slate-500">
                        Profile image preview
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="signup-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-11 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      id="signup-password"
                      name="password"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock
                    </span>
                    <button
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                      onClick={() => setShowPassword((current) => !current)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-5 text-slate-500">
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
                    htmlFor="signup-confirm-password"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-11 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      id="signup-confirm-password"
                      name="confirmPassword"
                      onChange={() => errorMessage && setErrorMessage("")}
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock
                    </span>
                    <button
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-5">
                  {errorMessage ? (
                    <div
                      className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  ) : null}

                  <button
                    className="w-full rounded-xl bg-primary py-3 text-sm font-bold tracking-wide text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  className="font-bold text-slate-900 transition-colors hover:text-primary"
                  to="/login"
                >
                  Login
                </Link>
              </p>
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

export default SignupPage;
