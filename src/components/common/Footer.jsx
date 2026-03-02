function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 px-6 py-7">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-slate-500">
          © 2026 Canine AI Inc. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-3 text-sm text-slate-500"
        >
          <a
            className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            href="/"
          >
            Privacy Policy
          </a>
          <a
            className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            href="/"
          >
            Terms of Service
          </a>
          <a
            className="rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            href="/"
          >
            Help Center
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
