import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Breadcrumbs from "../components/disease-detail/Breadcrumbs";
import CausesSection from "../components/disease-detail/CausesSection";
import DiseaseDetailHero from "../components/disease-detail/DiseaseDetailHero";
import OverviewSection from "../components/disease-detail/OverviewSection";
import PreventionSection from "../components/disease-detail/PreventionSection";
import SymptomsGrid from "../components/disease-detail/SymptomsGrid";
import VetAlertSection from "../components/disease-detail/VetAlertSection";
import { diseaseDetailMap } from "../components/disease-detail/detailData";
import { diseaseItems } from "../components/diseases/diseaseData";

const fallbackImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAicFk1oKxN6BbrT-wpG0PjJHvD1Zk9X8_Zk3o1D3f2M2Zxblz7g4KQnF2fvm1L5s0kZkEBxU1b9I3bAPgcE1F2NxYq3h5aKkCGp8_Q4r8m0T1yCT6Cy8gG1T6nYPSw4uJ1L6v5JYv3lKJ2x1xGfX7uU3r6e9b5EwR7M6cQWg4tqKjvFtp";

function buildFallback(disease) {
  if (!disease) {
    return null;
  }

  return {
    id: disease.id,
    name: disease.name,
    category: disease.category,
    tags: ["Clinical Overview"],
    imageUrl: fallbackImage,
    summary: disease.summary,
    overview: [
      "This condition affects dogs and may present with a range of symptoms depending on severity and overall health.",
      "Use this page as a starting point before speaking with your veterinarian for guidance tailored to your pet.",
    ],
    symptoms: [
      {
        title: "Behavior Changes",
        detail: "Reduced activity or appetite.",
        icon: "mood",
      },
      {
        title: "Physical Signs",
        detail: "Noticeable discomfort or pain.",
        icon: "health_and_safety",
      },
      {
        title: "Digestive Changes",
        detail: "Vomiting or diarrhea.",
        icon: "sick",
      },
      { title: "Energy Levels", detail: "Fatigue or weakness.", icon: "bed" },
    ],
    causes: [
      {
        title: "Multiple Factors",
        detail:
          "Conditions can arise from genetics, environment, or infection.",
      },
      {
        title: "Individual Risk",
        detail: "Breed, age, and immune health can influence risk.",
      },
    ],
    prevention: [
      {
        title: "Routine Care",
        detail: "Stay on schedule with vet visits and vaccines.",
      },
      {
        title: "Balanced Nutrition",
        detail: "Support overall health with quality diet.",
      },
      {
        title: "Early Monitoring",
        detail: "Track symptoms and seek help early.",
      },
    ],
    vetAlerts: ["Sudden worsening symptoms", "Persistent vomiting or diarrhea"],
    cta: {
      title: "Need clarity on your dog's symptoms?",
      description:
        "Run a quick symptom check for helpful insights and next steps.",
      buttonLabel: "Use Symptom Checker",
    },
  };
}

function DiseaseDetailPage() {
  const { diseaseId } = useParams();

  const firstDetail = useMemo(
    () =>
      Object.values(diseaseDetailMap)[0] ||
      buildFallback(diseaseItems[0]) ||
      null,
    [],
  );

  const detail = useMemo(() => {
    if (!diseaseId) {
      return null;
    }

    return firstDetail;
  }, [diseaseId, firstDetail]);

  if (!detail) {
    return (
      <div className="min-h-screen bg-background-light font-display text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 pt-[72px]">
          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Disease not found</h2>
            <p className="text-slate-600">
              The disease you are looking for is not available right now.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-[88px]">
          <Breadcrumbs currentLabel={detail.name} />
          <DiseaseDetailHero
            name={detail.name}
            category={detail.category}
            tags={detail.tags}
            imageUrl={detail.imageUrl}
            summary={detail.summary}
          />
          <OverviewSection overview={detail.overview} />
          <SymptomsGrid symptoms={detail.symptoms} />
          <CausesSection causes={detail.causes} />
          <PreventionSection prevention={detail.prevention} />
          <VetAlertSection alerts={detail.vetAlerts} />
          <section className="relative mb-12 overflow-hidden rounded-2xl bg-primary p-8 text-center text-white md:p-12">
            <div className="relative z-10">
              <h3 className="mb-4 text-3xl font-extrabold">
                Worried about your dog's health?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                Use our AI-powered symptom checker to get instant insights and
                risk assessments for common canine diseases.
              </p>
              <button
                className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                type="button"
              >
                Predict Disease Now
              </button>
            </div>
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 translate-y-1/2 -translate-x-1/2 rounded-full bg-white/5"></div>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700">
                <span className="material-symbols-outlined text-xl">gavel</span>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-amber-900">
                  Medical Disclaimer
                </h4>
                <p className="text-sm leading-relaxed text-amber-900/90">
                  This information is for educational purposes only and is not a
                  substitute for professional veterinary advice, diagnosis, or
                  treatment. Always seek guidance from a licensed veterinarian
                  with questions about your pet&apos;s health. Do not delay care
                  based on content from this app. If you suspect an emergency,
                  contact your veterinarian or an emergency animal clinic
                  immediately.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DiseaseDetailPage;
