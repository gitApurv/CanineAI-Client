function VetAlertSection({ alerts }) {
  return (
    <section className="mb-12 rounded-2xl border border-red-200 bg-red-50 p-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="self-start rounded-xl bg-red-500 p-4 text-white">
          <span className="material-symbols-outlined text-4xl">
            emergency_home
          </span>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-bold text-red-700">
            When to Consult a Veterinarian
          </h3>
          <p className="mb-4 font-semibold italic text-slate-800">
            Contact your vet immediately if you notice:
          </p>
          <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {alerts.map((alert) => (
              <li key={alert} className="flex items-start gap-2 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span className="leading-relaxed">{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default VetAlertSection;
