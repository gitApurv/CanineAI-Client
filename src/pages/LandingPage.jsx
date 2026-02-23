import DynamicInfoCard from "../components/common/DynamicInfoCard";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

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
  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 pt-[72px]">
          <section>
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-40 lg:py-20">
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
                    className="flex h-12 min-w-[140px] items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-base font-bold leading-normal tracking-[0.015em] text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    type="button"
                  >
                    <span className="truncate">Get Started</span>
                  </button>

                  <button
                    className="flex h-12 min-w-[140px] items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white px-6 text-base font-bold leading-normal tracking-[0.015em] text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    type="button"
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
                <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-100 to-teal-50 opacity-60 blur-3xl"></div>

                <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
                  <img
                    alt="Golden retriever dog with stethoscope looking healthy"
                    className="h-full w-full object-cover object-top"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQAorUcEy0ScdlMdKUZPzqmfubPiPSM5O31C0RzlPQEzFZil-IBXzgK-MBJ16WlXfihDVs4jv5xJupnauESZc4T_fBbri820FVCN73obJQPr7gfoyfcbUHXB_5bLQ1EbR2TfBn-CssoN_P9Ce-6C299OKx701ZEHwl3X8blSmYumlbdR7bGPKzF8jaKFetB2v9Dfb_kOyi_dlCc0mRlIuOOXgK2ZsvJIr01fTEIGjirtwgI6JdvkZN5I4l0WP-lxykCA1wDCAZMko"
                  />

                  <div
                    className="absolute left-8 top-8 flex animate-bounce items-center gap-3 rounded-lg bg-white p-3 shadow-lg"
                    style={{ animationDuration: "3s" }}
                  >
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

                  <div
                    className="absolute bottom-8 right-8 flex animate-bounce items-center gap-3 rounded-lg bg-white p-3 shadow-lg"
                    style={{ animationDuration: "3s" }}
                  >
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
                  </div>
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
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-extrabold text-slate-900">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                Get peace of mind in three simple steps.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-8 hidden h-1 bg-slate-200 md:block"></div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
                {stepItems.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 mb-6 flex size-16 items-center justify-center rounded-full border-4 border-primary bg-white text-2xl font-bold text-primary shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="px-4 text-sm text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
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
                <button
                  className="flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-lg bg-white px-8 text-lg font-bold leading-normal tracking-[0.015em] text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  type="button"
                >
                  Create Account
                </button>
                <button
                  className="flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-lg border-2 border-white/30 px-8 text-lg font-bold leading-normal tracking-[0.015em] text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  type="button"
                >
                  Login
                </button>
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
