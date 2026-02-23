import { Link, NavLink } from "react-router-dom";
import { navLinks } from "./navLinks";

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[72px] w-full items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md md:px-10">
      <Link
        to="/"
        className="flex items-center gap-3 text-slate-900 transition-colors hover:text-primary"
      >
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-3xl">pets</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Canine AI
        </h2>
      </Link>

      <div className="hidden flex-1 justify-end gap-8 md:flex">
        <nav aria-label="Primary" className="flex items-center gap-9">
          {navLinks.map((link) =>
            link.isRoute ? (
              <NavLink
                key={link.label}
                className={({ isActive }) =>
                  `rounded-md px-1.5 py-1 text-sm font-medium leading-normal transition-colors hover:text-primary ${
                    isActive ? "text-primary font-bold" : "text-slate-700"
                  }`
                }
                to={link.to}
              >
                {link.label}
              </NavLink>
            ) : (
              <a
                key={link.label}
                className="rounded-md px-1.5 py-1 text-sm font-medium leading-normal text-slate-700 transition-colors hover:text-primary"
                href={link.to}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex gap-3">
          <button
            className="flex h-10 min-w-[84px] items-center justify-center overflow-hidden rounded-lg bg-slate-100 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 transition-colors hover:bg-slate-200"
            type="button"
          >
            <span className="truncate">Login</span>
          </button>
          <button
            className="flex h-10 min-w-[84px] items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white shadow-sm transition-colors hover:bg-blue-600"
            type="button"
          >
            <span className="truncate">Sign Up</span>
          </button>
        </div>
      </div>

      <button
        aria-label="Open menu"
        className="text-slate-900 md:hidden"
        type="button"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}

export default Navbar;
