import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/UserService";

function SideMenu({ activePage, menuItems, onMenuSelect }) {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
  });

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser({
          name: user?.name || user?.fullName || "",
          email: user?.email || "",
          profilePictureUrl: user?.profilePictureUrl || "",
        });
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    };

    loadCurrentUser();
  }, []);

  const userInitials = (currentUser?.name || "User")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");

  return (
    <aside className="flex h-full min-h-0 w-full max-w-[280px] flex-col border-r border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          {currentUser?.profilePictureUrl ? (
            <img
              alt={currentUser.name}
              className="h-12 w-12 rounded-full border-2 border-white object-cover shadow"
              src={currentUser.profilePictureUrl}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary shadow-inner">
              {userInitials || "U"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {currentUser?.name || "User"}
            </p>
            <p className="truncate text-xs text-slate-500">
              {currentUser?.email || "No email added"}
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Dashboard menu"
        className="flex-1 space-y-1 overflow-y-auto p-4"
      >
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const isActive = activePage === item.key;

          return (
            <button
              key={item.key}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900"
              }`}
              onClick={() => onMenuSelect(item.key)}
              type="button"
            >
              <span
                className={`material-symbols-outlined shrink-0 text-[20px] leading-none transition-transform duration-200 ${
                  isActive ? "scale-105" : "group-hover:scale-105"
                }`}
                style={{
                  fontVariationSettings: isActive
                    ? '"FILL" 1, "wght" 600, "GRAD" 0, "opsz" 24'
                    : '"FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24',
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>

              {isActive ? (
                <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
              ) : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SideMenu;
