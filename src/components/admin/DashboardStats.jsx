function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>

            {stat.Icon && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#01BBC1]/10 text-[#01BBC1]">
                <stat.Icon className="h-[18px] w-[18px]" />
              </div>
            )}
          </div>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {stat.value}
          </h2>

          <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
