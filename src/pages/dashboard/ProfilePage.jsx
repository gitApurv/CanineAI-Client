import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../../services/UserService";

function ProfilePage() {
  const [currentUserDetails, setCurrentUserDetails] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
    createdAt: "",
  });
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    const loadCurrentUserDetails = async () => {
      try {
        setIsLoadingUser(true);
        const user = await getCurrentUser();
        setCurrentUserDetails(user);
      } catch (error) {
        console.error("Failed to load profile details:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadCurrentUserDetails();
  }, []);

  const userInitials = useMemo(() => {
    const sourceName = currentUserDetails?.name || "User";

    return sourceName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart.charAt(0).toUpperCase())
      .join("");
  }, [currentUserDetails?.name]);

  return (
    <section className="space-y-8">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          My Profile
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Manage your personal information and account settings.
        </p>
      </header>

      <div className="mx-auto w-full max-w-[820px] space-y-5">
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
          <div className="bg-gradient-to-b from-blue-50/60 to-white px-6 py-8 text-center sm:px-10 sm:py-10">
            {currentUserDetails?.profilePictureUrl ? (
              <img
                alt={currentUserDetails.name}
                className="mx-auto h-24 w-24 rounded-full border-2 border-white object-cover shadow-md"
                src={currentUserDetails.profilePictureUrl}
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-primary shadow-inner">
                {userInitials || "U"}
              </div>
            )}

            <p className="mt-5 text-4xl font-extrabold text-slate-900 sm:text-5xl">
              {isLoadingUser
                ? "Loading profile..."
                : currentUserDetails?.name || "User"}
            </p>
            <p className="mt-1 text-sm font-medium tracking-wide text-slate-500">
              PET OWNER
            </p>
          </div>

          <div className="grid gap-4 border-t border-slate-100 px-6 py-4 sm:grid-cols-2 sm:px-10">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                Email Address
              </p>
              <p className="mt-1 text-lg font-medium text-slate-900">
                {currentUserDetails?.email || "No email added"}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                Member Since
              </p>
              <p className="mt-1 text-lg font-medium text-slate-900">
                {currentUserDetails?.createdAt
                  ? new Date(currentUserDetails.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric" },
                    )
                  : "January 2023"}
              </p>
            </div>
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
