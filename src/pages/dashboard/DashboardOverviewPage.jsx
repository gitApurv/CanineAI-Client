function DashboardOverviewView() {
  const recentPredictions = [
    {
      dogName: "Max",
      date: "Oct 24, 2024",
      disease: "Canine Diabetes",
      riskLevel: "Low Risk",
      riskStyle: "bg-emerald-100 text-emerald-700",
    },
    {
      dogName: "Bella",
      date: "Oct 22, 2024",
      disease: "Hip Dysplasia",
      riskLevel: "Medium Risk",
      riskStyle: "bg-amber-100 text-amber-700",
    },
    {
      dogName: "Rocky",
      date: "Oct 18, 2024",
      disease: "Heartworm",
      riskLevel: "High Risk",
      riskStyle: "bg-red-100 text-red-700",
    },
  ];

  const quickActions = [
    {
      icon: "add",
      title: "Add New Dog",
      subtitle: "Register a new pet",
      iconStyle: "bg-blue-100 text-primary",
    },
    {
      icon: "monitor_heart",
      title: "Start Prediction",
      subtitle: "Run health analysis",
      iconStyle: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: "help",
      title: "FAQs",
      subtitle: "Get quick help and answers",
      iconStyle: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Track your dogs, monitor predictions, and take quick actions from one
          place.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <span className="pointer-events-none absolute -right-6 -top-6 text-slate-100 transition-colors group-hover:text-slate-200">
            <span className="material-symbols-outlined text-[96px]">pets</span>
          </span>
          <p className="text-sm font-medium text-slate-500">Total Dogs</p>
          <p className="mt-2 text-5xl font-extrabold text-slate-900">4</p>
          <p className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            ↗ +1 this month
          </p>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <span className="pointer-events-none absolute -right-6 -top-6 text-indigo-50 transition-colors group-hover:text-indigo-100">
            <span className="material-symbols-outlined text-[96px]">
              analytics
            </span>
          </span>
          <p className="text-sm font-medium text-slate-500">
            Total Predictions
          </p>
          <p className="mt-2 text-5xl font-extrabold text-slate-900">28</p>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Last run: 2 hours ago
          </p>
        </article>

        <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
          <span className="pointer-events-none absolute -right-6 -top-6 text-amber-50">
            <span className="material-symbols-outlined text-[96px]">
              health_and_safety
            </span>
          </span>
          <p className="text-sm font-medium text-slate-500">
            Latest Prediction Result
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              Low Risk
            </span>
            <span className="text-sm font-semibold text-slate-900">
              for Max
            </span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[14%] rounded-full bg-emerald-500" />
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Predictions
            </h2>
            <button
              className={`text-sm font-semibold transition-colors ${
                recentPredictions.length > 0
                  ? "text-primary hover:text-blue-600"
                  : "cursor-not-allowed text-slate-300"
              }`}
              disabled={recentPredictions.length === 0}
              type="button"
            >
              View All
            </button>
          </div>

          {recentPredictions.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <span className="material-symbols-outlined">history</span>
              </span>
              <p className="mt-4 text-base font-semibold text-slate-900">
                No recent predictions yet
              </p>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Start your first health analysis to see prediction history and
                risk insights here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-3">Dog Name</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Predicted Disease</th>
                    <th className="px-6 py-3">Risk Level</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPredictions.map((prediction) => (
                    <tr
                      key={`${prediction.dogName}-${prediction.date}`}
                      className="border-b border-slate-100 text-sm text-slate-700 last:border-b-0"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {prediction.dogName.charAt(0)}
                          </span>
                          {prediction.dogName}
                        </div>
                      </td>
                      <td className="px-6 py-4">{prediction.date}</td>
                      <td className="px-6 py-4">{prediction.disease}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${prediction.riskStyle}`}
                        >
                          {prediction.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-semibold text-primary transition-colors hover:text-blue-600"
                          type="button"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all group-hover:scale-105 ${action.iconStyle}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {action.icon}
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {action.title}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {action.subtitle}
                    </span>
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-slate-600">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default DashboardOverviewView;
