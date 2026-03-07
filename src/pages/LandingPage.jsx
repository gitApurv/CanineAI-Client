import { useNavigate } from "react-router-dom";
import DynamicInfoCard from "../components/common/DynamicInfoCard";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const featureItems = [
  {
    title: "Symptom Prediction",
    description:
      "Early detection logic based on symptoms input by you, powered by vet-verified data.",
    icon: "medical_services",
    iconBgClass:
      "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white",
  },
  {
    title: "Multi-Dog Profiles",
    description:
      "Create and manage individual health profiles for all your dogs in one dashboard.",
    icon: "pets",
    iconBgClass:
      "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
  },
  {
    title: "Health History",
    description:
      "Track health trends and symptom history over time to share with your vet.",
    icon: "show_chart",
    iconBgClass:
      "bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
  },
  {
    title: "Secure Data",
    description:
      "Bank-level encryption ensures your pet's medical data remains private and secure.",
    icon: "security",
    iconBgClass:
      "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
  },
];

const stepItems = [
  {
    title: "Add Dog Profile",
    description: "Enter your dog's breed, age, and basic medical history.",
  },
  {
    title: "Select Symptoms",
    description:
      "Choose from our comprehensive list of symptoms or use the smart search.",
  },
  {
    title: "Get Prediction",
    description: "Receive instant AI analysis and recommended next steps.",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 pt-[72px]">
          <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:px-40 lg:py-24">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 text-left">
                  <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.033em] text-slate-900 @[480px]:text-5xl lg:text-6xl">
                    AI-Powered Disease Prediction for{" "}
                    <span className="text-primary">Dogs</span>
                  </h1>

                  <h2 className="text-lg font-normal leading-relaxed text-slate-600">
                    Get instant, symptom-based analysis to keep your furry
                    friend healthy. Our advanced AI helps you interpret signs
                    early and monitor your dog&apos;s well-being with
                    confidence.
                  </h2>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    className="flex h-12 min-w-[140px] items-center justify-center overflow-hidden rounded-xl bg-primary px-6 text-base font-bold leading-normal tracking-[0.015em] text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    type="button"
                    onClick={() =>
                      navigate(isUserLoggedIn ? "/dashboard" : "/login")
                    }
                  >
                    <span className="truncate">
                      {isUserLoggedIn ? "Go to Dashboard" : "Get Started"}
                    </span>
                  </button>

                  <button
                    className="flex h-12 min-w-[140px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-6 text-base font-bold leading-normal tracking-[0.015em] text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    type="button"
                    onClick={() => navigate("/diseases")}
                  >
                    <span className="truncate">Explore Diseases</span>
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  * Disclaimer: This tool is for informational purposes only and
                  does not replace professional veterinary advice.
                </p>
              </div>

              <div className="relative flex w-full justify-center lg:justify-end">
                <div className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-100 via-cyan-50 to-teal-100 opacity-70 blur-3xl"></div>

                <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl shadow-slate-300/40">
                  <img
                    alt="Golden retriever dog with stethoscope looking healthy"
                    className="h-full w-full object-cover object-top"
                    src="https://res.cloudinary.com/cloudapurv/image/upload/v1772861999/dadvoiuk08vzze8azbdv.png"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                  <div className="hero-tooltip hero-tooltip--top absolute left-6 top-6 flex items-center gap-3 rounded-xl bg-white/95 p-3.5 shadow-xl backdrop-blur-sm">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <span className="material-symbols-outlined text-xl">
                        check_circle
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Health Status
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        Healthy
                      </p>
                    </div>
                  </div>
                  <div className="hero-tooltip hero-tooltip--bottom absolute bottom-6 right-6 flex items-center gap-3 rounded-xl bg-white/95 p-3.5 shadow-xl backdrop-blur-sm">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <span className="material-symbols-outlined text-xl">
                        analytics
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Prediction Accuracy
                      </p>
                      <p className="text-sm font-bold text-slate-900">98.5%</p>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-[1440px] px-4 lg:px-40">
              <div className="mx-auto mb-12 flex max-w-[720px] flex-col gap-4 text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                  Key Features
                </h2>
                <h3 className="text-3xl font-extrabold leading-tight text-slate-900 lg:text-4xl">
                  Comprehensive tools to manage your pet&apos;s health
                </h3>
                <p className="text-lg text-slate-600">
                  Everything you need to monitor, track, and understand your
                  dog&apos;s well-being in one secure platform.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {featureItems.map((item) => (
                  <DynamicInfoCard
                    key={item.title}
                    item={item}
                    cardClassName="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    iconWrapperClassName={`flex size-12 items-center justify-center rounded-lg transition-colors ${item.iconBgClass}`}
                    titleClassName="text-lg font-bold text-slate-900"
                    descriptionClassName="text-sm leading-relaxed text-slate-600"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1440px] px-4 py-20 lg:px-40">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
              <div className="mb-14 text-center">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  How It Works
                </h2>
                <p className="mx-auto max-w-2xl text-slate-600">
                  Get peace of mind in three simple steps.
                </p>
              </div>

              <div className="relative mx-auto max-w-3xl">
                <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-blue-200 via-primary/50 to-blue-100"></div>

                <div className="space-y-6">
                  {stepItems.map((step, index) => (
                    <div key={step.title} className="relative pl-16">
                      <div className="absolute left-0 top-1.5 z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-lg font-extrabold text-primary shadow-sm">
                        {index + 1}
                      </div>

                      <div className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-md">
                        <h3 className="mb-2 text-xl font-bold text-slate-900">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-primary px-4 py-20 text-center">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Start monitoring your dog&apos;s health today
              </h2>

              <p className="max-w-xl text-lg text-blue-100">
                Join thousands of pet owners who trust Canine AI for early
                disease detection and health tracking.
              </p>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                {isUserLoggedIn ? (
                  <button
                    className="flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold leading-normal tracking-[0.015em] text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    onClick={() => navigate("/dashboard")}
                    type="button"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      className="flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold leading-normal tracking-[0.015em] text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      onClick={() => navigate("/signup")}
                      type="button"
                    >
                      Create Account
                    </button>
                    <button
                      className="flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-xl border-2 border-white/30 px-8 text-lg font-bold leading-normal tracking-[0.015em] text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      onClick={() => navigate("/login")}
                      type="button"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
