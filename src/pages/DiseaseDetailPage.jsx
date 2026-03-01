import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Breadcrumbs from "../components/disease-detail/Breadcrumbs";
import CausesSection from "../components/disease-detail/CausesSection";
import DiseaseDetailHero from "../components/disease-detail/DiseaseDetailHero";
import OverviewSection from "../components/disease-detail/OverviewSection";
import PreventionSection from "../components/disease-detail/PreventionSection";
import SymptomsGrid from "../components/disease-detail/SymptomsGrid";
import { fetchDiseaseById } from "../services/DiseasesService";

function DiseaseDetailPage() {
  const { diseaseId } = useParams();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDiseaseDetail() {
      if (!diseaseId) {
        setDetail(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchDiseaseById(diseaseId);
        if (isMounted) {
          setDetail(data || null);
        }
      } catch {
        if (isMounted) {
          setDetail(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDiseaseDetail();

    return () => {
      isMounted = false;
    };
  }, [diseaseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
        <div className="relative flex min-h-screen w-full flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-[88px]">
            <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-base font-medium text-slate-700">
                Loading disease details...
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
        <div className="relative flex min-h-screen w-full flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-[88px]">
            <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900">
                Disease not found
              </h2>
              <p className="text-slate-600">
                The disease you are looking for is not available right now.
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-14 pt-[88px] lg:px-8">
          <Breadcrumbs currentLabel={detail.name || detail.title || ""} />
          <DiseaseDetailHero
            name={detail.name || detail.title || ""}
            tags={detail.tags || []}
            imageUrl={detail.diseaseImageUrl || ""}
            summary={detail.shortDescription || ""}
          />
          <OverviewSection overview={detail.overview || ""} />
          <SymptomsGrid symptoms={detail.symptoms || []} />
          <CausesSection causes={detail.causes || []} />
          <PreventionSection preventionTips={detail.preventionTips || []} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DiseaseDetailPage;
