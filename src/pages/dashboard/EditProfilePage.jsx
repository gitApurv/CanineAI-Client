import { useEffect, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { handleImageUpload } from "../../utils/imageUpload";

function EditProfilePage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userInitials = (formValues?.name || "User")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");

  const onFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setImageValue = (key, value) => {
    if (key !== "image") return;

    setFormValues((prev) => ({
      ...prev,
      profilePictureUrl: value,
    }));
  };

  const showAlert = (message, type) => {
    if (type === "error") {
      setError(message);
    }
  };

  const onImageChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setError("");

    await handleImageUpload(selectedFile, {
      setLoading: setImageUploading,
      setValue: setImageValue,
      showAlert,
    });
  };

  const onRemoveImage = () => {
    setFormValues((prev) => ({
      ...prev,
      profilePictureUrl: null,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const { name, email, profilePictureUrl } = formValues;

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    setSubmitting(true);

    try {
      await updateCurrentUser({
        name: name.trim(),
        email: email.trim(),
        profilePictureUrl: profilePictureUrl || null,
      });
      navigate("/dashboard/profile");
    } catch (submitError) {
      setError(
        submitError?.message || "Unable to update profile. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCurrentUser();
        setFormValues({
          name: data?.name || "",
          email: data?.email || "",
          profilePictureUrl: data?.profilePictureUrl || null,
        });
      } catch (error) {
        const message =
          error?.message || "Unable to load profile details. Please try again.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <section className="space-y-7" aria-live="polite" aria-busy="true">
        <div>
          <div className="h-10 w-56 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
        </div>

        <article className="mx-auto w-full max-w-[840px] animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-8 w-48 rounded bg-slate-200" />
              <div className="h-4 w-72 rounded bg-slate-200" />
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <div className="h-12 w-full rounded-xl bg-slate-200" />
            <div className="h-12 w-full rounded-xl bg-slate-200" />
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-7">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Edit Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Update your personal information.
        </p>
      </header>

      <article className="mx-auto w-full max-w-[840px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {formValues.profilePictureUrl ? (
              <img
                alt={formValues.name}
                className="h-16 w-16 rounded-full object-cover"
                src={formValues.profilePictureUrl}
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl font-semibold text-primary">
                {userInitials || "U"}
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Profile Picture
              </h2>
              <p className="text-sm text-slate-500">
                Upload a new avatar or remove the current one.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              accept="image/jpeg,image/png,image/jpg"
              className="hidden"
              id="profile-image-input"
              onChange={onImageChange}
              type="file"
            />
            <label
              className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              htmlFor="profile-image-input"
            >
              Change
            </label>
            <button
              className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              onClick={onRemoveImage}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>

        {imageUploading && (
          <p className="mt-3 text-xs font-medium text-slate-500">
            Uploading image...
          </p>
        )}

        <form
          className="mt-6 space-y-5 border-t border-slate-100 pt-6"
          onSubmit={onSubmit}
        >
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="profile-full-name"
            >
              Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="profile-full-name"
              name="name"
              onChange={onFieldChange}
              required
              type="text"
              value={formValues.name}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="profile-email"
            >
              Email Address
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="profile-email"
              name="email"
              onChange={onFieldChange}
              required
              type="email"
              value={formValues.email}
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              type="button"
              onClick={() => {
                navigate("/dashboard/profile");
              }}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              disabled={submitting || imageUploading}
              type="submit"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default EditProfilePage;
