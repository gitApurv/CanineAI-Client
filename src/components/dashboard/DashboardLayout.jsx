import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import SideMenu from "./SideMenu";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "overview",
      label: "Dashboard",
      icon: "dashboard",
    },
    {
      key: "dogs",
      label: "My Dogs",
      icon: "sound_detection_dog_barking",
    },
    {
      key: "predict",
      label: "Predict",
      icon: "analytics",
    },
    {
      key: "prediction-history",
      label: "Prediction History",
      icon: "history",
    },
    {
      key: "profile",
      label: "Profile",
      icon: "person",
    },
  ];

  const currentSection = location.pathname.includes("/dashboard/dogs")
    ? "dogs"
    : location.pathname.includes("/dashboard/dog/edit")
      ? "dogs"
      : location.pathname.split("/")[2] || "overview";

  const activePage = menuItems.some((item) => item.key === currentSection)
    ? currentSection
    : "overview";

  const handleMenuSelect = (selectedKey) => {
    navigate(`/dashboard/${selectedKey}`);
  };

  return (
    <div className="h-screen overflow-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex h-full w-full flex-col">
        <Navbar />

        <div className="flex min-h-0 flex-1 flex-col pt-[72px]">
          <main className="flex min-h-0 flex-1 overflow-hidden">
            <div className="flex w-full min-h-0 flex-1">
              <SideMenu
                activePage={activePage}
                menuItems={menuItems}
                onMenuSelect={handleMenuSelect}
              />

              <section
                id="dashboard-scroll-container"
                className="min-w-0 flex-1 overflow-y-auto px-4 py-6 md:px-6"
              >
                <Outlet />
              </section>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
