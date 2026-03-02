function PredictionHistoryView() {
  const history = [
    {
      id: "PRED-0028",
      date: "Oct 24, 2024",
      dog: "Max",
      result: "Low Risk",
    },
    {
      id: "PRED-0027",
      date: "Oct 22, 2024",
      dog: "Bella",
      result: "Medium Risk",
    },
    {
      id: "PRED-0026",
      date: "Oct 18, 2024",
      dog: "Rocky",
      result: "High Risk",
    },
  ];

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Prediction History
      </h1>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Prediction ID</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Dog</th>
              <th className="px-5 py-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-slate-100 text-sm text-slate-700 last:border-b-0"
              >
                <td className="px-5 py-3 font-semibold text-slate-900">
                  {entry.id}
                </td>
                <td className="px-5 py-3">{entry.date}</td>
                <td className="px-5 py-3">{entry.dog}</td>
                <td className="px-5 py-3">{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}

export default PredictionHistoryView;
