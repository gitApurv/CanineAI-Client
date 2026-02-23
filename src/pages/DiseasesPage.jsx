import { useMemo, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import DiseasesFilters from "../components/diseases/DiseasesFilters";
import DiseasesGrid from "../components/diseases/DiseasesGrid";
import Pagination from "../components/diseases/Pagination";
import { diseaseItems } from "../components/diseases/diseaseData";

const PAGE_SIZE = 6;

function DiseasesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDiseases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return diseaseItems.filter((disease) => {
      const matchesCategory =
        category === "All Categories" || disease.category === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        disease.name.toLowerCase().includes(normalizedQuery) ||
        disease.summary.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDiseases.length / PAGE_SIZE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagedDiseases = filteredDiseases.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const handleClear = () => {
    setQuery("");
    setCategory("All Categories");
    setCurrentPage(1);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
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
              <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-4xl">
                Canine Disease Knowledge Base
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
                Explore our growing library of canine health conditions,
                symptoms, and care guidelines trusted by professionals.
              </p>
            </div>
          </section>

          <DiseasesFilters
            query={query}
            category={category}
            onQueryChange={handleQueryChange}
            onCategoryChange={handleCategoryChange}
            onClear={handleClear}
          />

          <section className="mx-auto min-h-[600px] max-w-[1440px] px-4 py-12 lg:px-40">
            <DiseasesGrid diseases={pagedDiseases} />
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DiseasesPage;
