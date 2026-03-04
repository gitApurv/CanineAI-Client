import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = prefersReducedMotion ? "auto" : "smooth";

    const dashboardScrollContainer = document.getElementById(
      "dashboard-scroll-container",
    );

    if (dashboardScrollContainer) {
      dashboardScrollContainer.scrollTo({
        top: 0,
        left: 0,
        behavior,
      });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
