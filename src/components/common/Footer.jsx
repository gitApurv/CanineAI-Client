function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">
          © 2026 Canine AI Inc. All rights reserved.
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-6 text-sm text-slate-500"
        >
          <a className="transition-colors hover:text-primary" href="/">
            Privacy Policy
          </a>
          <a className="transition-colors hover:text-primary" href="/">
            Terms of Service
          </a>
          <a className="transition-colors hover:text-primary" href="/">
            Help Center
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
