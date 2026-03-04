import { useEffect, useMemo, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import DiseasesFilters from "../components/diseases/DiseasesFilters";
import DiseasesGrid from "../components/diseases/DiseasesGrid";
import { fetchDiseases } from "../services/DiseaseService";

function DiseasesPage() {
  const [diseases, setDiseases] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDiseases() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const items = await fetchDiseases();

        if (isMounted && items.length > 0) {
          setDiseases(items);
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Unable to load diseases from the server.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDiseases();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDiseases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return diseases.filter((disease) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        disease.title.toLowerCase().includes(normalizedQuery) ||
        disease.shortDescription.toLowerCase().includes(normalizedQuery);

      return matchesQuery;
    });
  }, [diseases, query]);

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-50 pt-[72px]">
          <section className="relative border-b border-slate-200 bg-white py-12 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-blue-50/50"></div>
            <div className="relative mx-auto max-w-[1440px] px-4 text-center lg:px-40">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  medical_services
                </span>
              </div>
              <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
                Canine Disease Knowledge Base
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
                Explore our growing library of canine health conditions,
                symptoms, and care guidelines trusted by professionals.
              </p>
            </div>
          </section>

          <DiseasesFilters query={query} onQueryChange={handleQueryChange} />

          <section className="mx-auto min-h-[600px] max-w-[1440px] px-4 py-12 lg:px-40">
            {errorMessage ? (
              <div
                aria-live="polite"
                className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  Error Loading Diseases
                </h3>
                <p className="mt-2 text-sm text-slate-600">{errorMessage}</p>
              </div>
            ) : isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-sm text-slate-600">Loading diseases...</p>
              </div>
            ) : (
              <DiseasesGrid diseases={filteredDiseases} />
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DiseasesPage;
