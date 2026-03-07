import { useNavigate } from "react-router-dom";
import DynamicInfoCard from "../components/common/DynamicInfoCard";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const solutionItems = [
  {
    title: "Add Profiles",
    description:
      "Create detailed digital profiles for each of your dogs, including breed, age, and pre-existing conditions.",
    icon: "add_circle",
    iconBgClass:
      "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white",
  },
  {
    title: "Select Symptoms",
    description:
      "Input observed behaviors or physical signs through our intuitive symptom checker interface.",
    icon: "checklist",
    iconBgClass:
      "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
  },
  {
    title: "ML Prediction",
    description:
      "Our trained AI model analyzes the inputs against thousands of veterinary cases to predict potential issues.",
    icon: "psychology",
    iconBgClass:
      "bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
  },
  {
    title: "Track History",
    description:
      "Maintain a longitudinal record of health checks to easily share trends with your veterinarian.",
    icon: "history",
    iconBgClass:
      "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
  },
];

const audienceItems = [
  {
    title: "Pet Owners",
    description:
      "Responsible dog parents who want to proactively monitor their pet's health and catch issues early.",
    icon: "person",
    iconBgClass:
      "bg-pink-50 text-pink-500 group-hover:bg-pink-500 group-hover:text-white",
  },
  {
    title: "Animal Shelters",
    description:
      "Organizations needing efficient, low-cost health screening tools for incoming rescues.",
    icon: "home_health",
    iconBgClass:
      "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
  },
  {
    title: "Veterinarians",
    description:
      "Practitioners looking for patient history logs to aid in faster, more accurate diagnosis.",
    icon: "stethoscope",
    iconBgClass:
      "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
  },
];

const architectureItems = [
  {
    title: "User Input",
    icon: "input",
    iconClass: "text-slate-500",
    containerClass: "border-slate-100 bg-white text-slate-900",
  },
  {
    title: "Secure API",
    icon: "api",
    iconClass: "text-blue-500",
    containerClass: "border-slate-100 bg-white text-slate-900",
  },
  {
    title: "ML Model",
    icon: "model_training",
    iconClass: "text-primary",
    containerClass: "border-blue-100 bg-blue-50 text-primary",
  },
  {
    title: "Result",
    icon: "health_and_safety",
    iconClass: "text-green-600",
    containerClass: "border-green-100 bg-green-50 text-green-700",
  },
];

function AboutPage() {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 pt-[72px]">
          <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
            <div className="relative mx-auto max-w-[1440px] px-4 text-center lg:px-40">
              <span className="mb-5 inline-block rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Our Mission
              </span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
                About the Canine Disease
                <br className="hidden md:block" /> Prediction System
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 lg:text-xl">
                Leveraging advanced machine learning to empower pet owners with
                early detection tools, bridging the gap between subtle symptoms
                and professional veterinary care.
              </p>
            </div>
          </section>

          <section className="relative overflow-hidden border-t border-slate-200/80 bg-white py-20">
            <div className="relative mx-auto max-w-[1440px] px-4 lg:px-40">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="px-1 md:px-2 lg:pr-6">
                  <span className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Why It Matters
                  </span>
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-4xl">
                    The Problem:{" "}
                    <span className="text-primary">Silent Symptoms</span>
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
                    <p>
                      Dogs are experts at masking pain and illness. Often, by
                      the time a symptom becomes obvious to a pet owner, the
                      underlying condition may have progressed significantly.
                    </p>
                    <p>
                      Traditional diagnosis relies heavily on periodic vet
                      visits, which can leave months of health data unmonitored.
                      Delayed recognition of symptoms like lethargy, appetite
                      changes, or minor behavioral shifts can lead to more
                      severe health outcomes and higher treatment costs.
                    </p>
                    <p className="font-semibold text-slate-800">
                      We saw a need for a tool that translates these subtle
                      signals into actionable health insights instantly.
                    </p>
                  </div>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                  <div className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-100 via-cyan-50 to-teal-100 opacity-70 blur-3xl"></div>

                  <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl shadow-slate-300/40">
                    <img
                      alt="Veterinarian examining a dog"
                      className="h-full w-full object-cover"
                      src="https://res.cloudinary.com/cloudapurv/image/upload/v1772895180/ntrsp1vytay8zjgoo0ln.png"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>

                    <div className="hero-tooltip hero-tooltip--top absolute bottom-6 left-6 flex items-center gap-3 rounded-xl bg-white/95 p-3.5 shadow-xl backdrop-blur-sm">
                      <div className="rounded-full bg-red-100 p-2 text-red-600">
                        <span className="material-symbols-outlined text-xl">
                          warning
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">
                          Risk Factor
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          Delayed Diagnosis
                        </p>
                      </div>
                    </div>

                    <div className="hero-tooltip hero-tooltip--bottom absolute right-6 top-6 flex items-center gap-3 rounded-xl bg-white/95 p-3.5 shadow-xl backdrop-blur-sm">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <span className="material-symbols-outlined text-xl">
                          analytics
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">
                          AI Screening
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          Early Insights
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-[1440px] px-4 lg:px-40">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-slate-900">
                  Our Solution
                </h2>
                <p className="mx-auto max-w-2xl text-slate-600">
                  A seamless workflow designed to give you clarity and peace of
                  mind.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {solutionItems.map((item) => (
                  <DynamicInfoCard
                    key={item.title}
                    item={item}
                    cardClassName="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
                    iconWrapperClassName={`mb-6 flex h-14 w-14 items-center justify-center rounded-lg transition-colors ${item.iconBgClass}`}
                    titleClassName="mb-3 text-lg font-bold text-slate-900"
                    descriptionClassName="text-sm text-slate-600"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1440px] px-4 py-20 lg:px-40">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                Technical Architecture
              </h2>
              <p className="text-slate-600">
                How the data flows securely from your device to our insights
                engine.
              </p>
            </div>

            <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm shadow-slate-200/60">
              <div className="relative mx-auto flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-6">
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-slate-200 md:left-[12%] md:right-[12%] md:top-16 md:h-1 md:w-auto md:translate-x-0 md:-translate-y-1/2"></div>

                {architectureItems.map((item) => (
                  <div
                    key={item.title}
                    className="group relative z-10 flex w-full max-w-[180px] flex-col items-center text-center"
                  >
                    <div
                      className={`flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${item.containerClass}`}
                    >
                      <span
                        className={`material-symbols-outlined mb-1 text-3xl ${item.iconClass}`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm font-bold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-[1440px] px-4 lg:px-40">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-slate-900">
                  Who is this for?
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {audienceItems.map((item) => (
                  <DynamicInfoCard
                    key={item.title}
                    item={item}
                    cardClassName="group rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
                    iconWrapperClassName={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${item.iconBgClass}`}
                    titleClassName="mb-2 text-xl font-bold text-slate-900"
                    descriptionClassName="leading-relaxed text-slate-600"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1440px] px-4 py-12 lg:px-40">
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-red-100 bg-red-50 p-8 shadow-sm md:flex-row md:items-center">
              <div className="shrink-0 rounded-full bg-red-100 p-3 text-red-600">
                <span className="material-symbols-outlined text-3xl">
                  medical_information
                </span>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-red-800">
                  Important Medical Disclaimer
                </h3>
                <p className="text-sm leading-relaxed text-red-700">
                  Canine AI is an informational tool designed to assist in
                  health monitoring. It is <strong>not</strong> a substitute for
                  professional veterinary advice, diagnosis, or treatment.
                  Always seek the advice of your veterinarian with any questions
                  you may have regarding a medical condition. If you think your
                  dog has a medical emergency, call your vet immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="w-full bg-primary px-4 py-20 text-center">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Ready to start monitoring your dog&apos;s health?
              </h2>
              <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                {isUserLoggedIn ? (
                  <button
                    className="flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold leading-normal tracking-[0.015em] text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto sm:min-w-[200px]"
                    onClick={() => navigate("/dashboard")}
                    type="button"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      className="flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-lg font-bold leading-normal tracking-[0.015em] text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto sm:min-w-[200px]"
                      onClick={() => navigate("/signup")}
                      type="button"
                    >
                      Create Account
                    </button>
                    <button
                      className="flex h-14 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-white/30 px-8 text-lg font-bold leading-normal tracking-[0.015em] text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto sm:min-w-[200px]"
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

export default AboutPage;
