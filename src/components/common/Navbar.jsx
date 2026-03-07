import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/AuthService";

function Navbar({ onDashboardMenuToggle = null }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/", isRoute: true },
    { label: "Diseases", to: "/diseases", isRoute: true },
    { label: "About", to: "/about", isRoute: true },
    { label: "FAQs", to: "/faqs", isRoute: true },
  ];

  const visibleNavLinks = isUserLoggedIn
    ? [...navLinks, { label: "Dashboard", to: "/dashboard", isRoute: true }]
    : navLinks;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      setIsUserLoggedIn(false);
      setIsMobileMenuOpen(false);
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[72px] w-full border-b border-slate-200/80 bg-white/90 px-4 py-4 shadow-[0_8px_30px_rgb(15_23_42/0.06)] backdrop-blur-md md:px-10">
      <div className="flex h-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {typeof onDashboardMenuToggle === "function" ? (
            <button
              aria-label="Open dashboard menu"
              className="rounded-lg p-2 text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 lg:hidden"
              onClick={onDashboardMenuToggle}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          ) : null}

          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2 rounded-xl px-1 py-1 text-slate-900 transition-all duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-primary/15 transition-transform duration-200 group-hover:scale-105">
              <img
                src="https://res.cloudinary.com/cloudapurv/image/upload/v1772861361/tqkpqllozdjlhmo7ddqf.webp"
                alt="Canine AI Logo"
              />
            </div>
            <h2 className="truncate text-base font-bold leading-tight tracking-[-0.015em] sm:text-lg">
              Canine AI
            </h2>
          </Link>
        </div>

        <div className="hidden flex-1 justify-end gap-8 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-9">
            {visibleNavLinks.map((link) =>
              link.isRoute ? (
                <NavLink
                  key={link.label}
                  className={({ isActive }) =>
                    `rounded-lg px-2.5 py-1.5 text-sm font-semibold leading-normal transition-all duration-200 hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-slate-700"
                    }`
                  }
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.label}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-semibold leading-normal text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  href={link.to}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex gap-3">
            {isUserLoggedIn ? (
              <button
                className="flex h-10 min-w-[90px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoggingOut}
                onClick={handleLogout}
                type="button"
              >
                <span className="truncate">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            ) : (
              <>
                <Link
                  className="flex h-10 min-w-[90px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  to="/login"
                >
                  <span className="truncate">Login</span>
                </Link>
                <Link
                  className="flex h-10 min-w-[90px] items-center justify-center overflow-hidden rounded-xl bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  to="/signup"
                >
                  <span className="truncate">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          type="button"
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="absolute left-0 right-0 top-[72px] border-b border-slate-200 bg-white px-4 pb-4 pt-3 shadow-lg md:hidden">
          <nav aria-label="Primary mobile" className="flex flex-col gap-1">
            {visibleNavLinks.map((link) =>
              link.isRoute ? (
                <NavLink
                  key={link.label}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                    }`
                  }
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.label}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-primary"
                  href={link.to}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {isUserLoggedIn ? (
              <Link
                className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm"
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : null}

            {isUserLoggedIn ? (
              <button
                className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-900 ring-1 ring-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoggingOut}
                onClick={handleLogout}
                type="button"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-900 ring-1 ring-slate-200"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
