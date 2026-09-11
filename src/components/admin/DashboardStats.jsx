function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <h2 className="text-3xl font-bold text-gray-900">
              {stat.value}
            </h2>

            {stat.change && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                {stat.change}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
