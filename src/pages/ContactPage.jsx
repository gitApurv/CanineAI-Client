import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background-light font-display text-slate-900 antialiased">
      <div className="relative flex min-h-screen w-full flex-col">
        <Navbar />

        <main className="flex-1 pt-[72px]">
          <section className="px-4 pb-12 pt-16 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Contact & Support
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                We&apos;re here to help you and your canine companion. Reach out
                with any questions about our AI diagnostics, partnership
                opportunities, or technical support.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pb-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
                  <form className="space-y-6" method="POST">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-semibold text-slate-700"
                          htmlFor="contact-full-name"
                        >
                          Full Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          id="contact-full-name"
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-semibold text-slate-700"
                          htmlFor="contact-email"
                        >
                          Email Address
                        </label>
                        <input
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          id="contact-email"
                          placeholder="name@example.com"
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-slate-700"
                        htmlFor="contact-subject"
                      >
                        Subject
                      </label>
                      <select
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        id="contact-subject"
                      >
                        <option value="">Select a topic</option>
                        <option value="technical">Technical Support</option>
                        <option value="medical">Diagnostic Inquiry</option>
                        <option value="billing">Billing & Subscription</option>
                        <option value="partnership">Partnerships</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-slate-700"
                        htmlFor="contact-message"
                      >
                        Message
                      </label>
                      <textarea
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        id="contact-message"
                        placeholder="How can we help you and your pet today?"
                        rows="5"
                      ></textarea>
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                      <button
                        className="flex-1 rounded-lg bg-primary py-3 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        type="submit"
                      >
                        Submit Message
                      </button>
                      <button
                        className="rounded-lg bg-slate-100 px-8 py-3 font-bold text-slate-600 transition-all hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        type="reset"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <span className="material-symbols-outlined text-primary">
                        mail
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Email Us</h3>
                      <p className="text-sm text-slate-500">
                        Direct contact for general inquiries
                      </p>
                      <a
                        className="mt-1 block font-semibold text-primary"
                        href="mailto:support@caninepredict.com"
                      >
                        canineAI@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <span className="material-symbols-outlined text-primary">
                        schedule
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Response Time
                      </h3>
                      <p className="text-sm text-slate-500">
                        Average response time
                      </p>
                      <p className="mt-1 font-semibold text-primary">
                        Under 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-primary p-6 text-white shadow-xl shadow-primary/20">
                  <h3 className="mb-2 text-xl font-bold">
                    Looking for quick answers?
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-blue-100">
                    Check our Frequently Asked Questions first. We might have
                    already answered your question!
                  </p>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-primary transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    type="button"
                  >
                    View FAQs
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
