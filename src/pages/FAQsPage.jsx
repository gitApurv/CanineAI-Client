import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useMemo, useState } from "react";

function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqId, setOpenFaqId] = useState("prediction");

  const faqItems = useMemo(
    () => [
      {
        id: "prediction",
        question: "How does disease prediction work?",
        answer:
          "Our proprietary AI models analyze vast amounts of data including your dog's breed-specific genetic markers, historical clinical data, and real-time activity metrics. By identifying subtle patterns often invisible to the human eye, the system can flag potential health risks weeks before physical symptoms may appear.",
      },
      {
        id: "diagnosis",
        question: "Is this a medical diagnosis?",
        answer:
          "No. Canine AI provides risk-based guidance and early warnings, not a definitive medical diagnosis. Always consult a licensed veterinarian for diagnosis and treatment decisions.",
      },
      {
        id: "multiple-dogs",
        question: "Can I add multiple dogs?",
        answer:
          "Yes. You can create and manage multiple dog profiles from your dashboard and run predictions separately for each dog.",
      },
      {
        id: "accuracy",
        question: "How accurate are predictions?",
        answer:
          "Prediction quality depends on the quality and completeness of the information provided. Our models are continuously improved, but predictions should always be reviewed with veterinary advice.",
      },
      {
        id: "data-safety",
        question: "Is my data safe?",
        answer:
          "Yes. We use secure storage and modern encryption standards to protect account and pet health data. Access is restricted and monitored.",
      },
      {
        id: "vet-account",
        question: "Do I need a veterinarian account?",
        answer:
          "No veterinarian account is required for pet owners. You can use core features with a regular user account.",
      },
    ],
    [],
  );

  const filteredFaqItems = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return faqItems;
    }

    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalizedSearchTerm) ||
        item.answer.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [faqItems, searchTerm]);

  const onToggleFaq = (faqId) => {
    setOpenFaqId((currentOpenFaqId) =>
      currentOpenFaqId === faqId ? "" : faqId,
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 pt-[72px]">
          <section className="px-4 pb-12 pt-14 text-center">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
                Everything you need to know about our AI-powered canine health
                monitoring platform.
              </p>
              <p className="mt-1 text-base leading-relaxed text-slate-500 sm:text-lg">
                Can&apos;t find what you&apos;re looking for? Reach out to our
                team.
              </p>
            </div>
          </section>

          <section className="mx-auto w-full max-w-4xl px-4 pb-20">
            <div className="relative mx-auto mb-10 max-w-3xl">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full rounded-xl border border-slate-300 bg-white px-12 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for questions (e.g. data safety, accuracy)..."
                type="text"
                value={searchTerm}
              />
            </div>

            <div className="space-y-3">
              {filteredFaqItems.length ? (
                filteredFaqItems.map((faqItem) => {
                  const isOpen = openFaqId === faqItem.id;

                  return (
                    <article
                      key={faqItem.id}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                    >
                      <button
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                        onClick={() => onToggleFaq(faqItem.id)}
                        type="button"
                      >
                        <span className="text-xl font-semibold text-slate-900">
                          {faqItem.question}
                        </span>
                        <span
                          className={`material-symbols-outlined text-primary transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden px-5 transition-all duration-300 ${
                          isOpen
                            ? "max-h-64 pb-4 opacity-100"
                            : "max-h-0 pb-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-slate-600">
                          {faqItem.answer}
                        </p>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
                  No FAQs found for your search.
                </div>
              )}
            </div>

            <article className="mt-10 rounded-2xl bg-slate-900 px-6 py-8 text-center text-white shadow-lg shadow-slate-300/40 sm:px-8">
              <h3 className="text-4xl font-bold">Still have questions?</h3>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Our support team is here to help you and your furry friend.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600"
                  href="mailto:official.canineai@gmail.com"
                >
                  Contact Support
                </a>
              </div>
            </article>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default FAQsPage;
