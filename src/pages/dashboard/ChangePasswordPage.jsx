import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/UserService";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formValues.currentPassword ||
      !formValues.newPassword ||
      !formValues.confirmNewPassword
    ) {
      setError("Please fill all password fields.");
      return;
    }

    const isLongEnough = formValues.newPassword.length >= 8;
    const hasNumber = /\d/.test(formValues.newPassword);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(formValues.newPassword);

    if (!isLongEnough || !hasNumber || !hasSpecialCharacter) {
      setError(
        "New password must be at least 8 characters and include 1 number and 1 special character.",
      );
      return;
    }

    if (formValues.currentPassword === formValues.newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    if (formValues.newPassword !== formValues.confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const payload = {
      currentPassword: formValues.currentPassword,
      newPassword: formValues.newPassword,
    };

    try {
      setIsSubmitting(true);
      await changePassword(payload);
      navigate("/dashboard/profile");
    } catch (error) {
      setError(error.message || "Failed to change password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Change Password
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Update your account password to keep your account secure.
        </p>
      </header>

      <article className="mx-auto w-full max-w-[840px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
              <input
                className="w-full border-0 bg-transparent p-0 text-slate-900 outline-none"
                id="current-password"
                name="currentPassword"
                onChange={onFieldChange}
                type={showCurrentPassword ? "text" : "password"}
                value={formValues.currentPassword}
              />
              <button
                className="text-slate-400"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showCurrentPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="new-password"
            >
              New Password
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
              <input
                className="w-full border-0 bg-transparent p-0 text-slate-900 outline-none"
                id="new-password"
                name="newPassword"
                onChange={onFieldChange}
                type={showNewPassword ? "text" : "password"}
                value={formValues.newPassword}
              />
              <button
                className="text-slate-400"
                onClick={() => setShowNewPassword((prev) => !prev)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showNewPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-5 text-slate-500">
              <span className="material-symbols-outlined mt-[1px] text-sm text-slate-400">
                info
              </span>
              Must be at least 8 characters, include 1 number and 1 special
              character.
            </p>
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
              <input
                className="w-full border-0 bg-transparent p-0 text-slate-900 outline-none"
                id="confirm-password"
                name="confirmNewPassword"
                onChange={onFieldChange}
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.confirmNewPassword}
              />
              <button
                className="text-slate-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              disabled={isSubmitting}
              onClick={() => navigate("/dashboard/profile")}
              type="button"
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default ChangePasswordPage;
