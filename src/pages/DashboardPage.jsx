import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

function DashboardPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex flex-1 items-center justify-center px-4 pt-[72px]">
          <section className="w-full max-w-[720px] rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-300/30">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-3 text-slate-600">
              Dashboard page placeholder. Full implementation will be added
              later.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardPage;
