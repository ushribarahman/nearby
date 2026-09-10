function ReportsSummaryCards({
  pendingCount,
  reviewCount,
  resolvedCount,
  statusFilter,
  onSelectStatus,
}) {
  const cards = [
    {
      status: "Pending",
      label: "Pending Reports",
      count: pendingCount,
      description: "Waiting for admin review",
      icon: "!",
      iconClass: "bg-yellow-50 text-yellow-700",
    },
    {
      status: "Under Review",
      label: "Under Review",
      count: reviewCount,
      description: "Currently being investigated",
      icon: "?",
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      status: "Resolved",
      label: "Resolved",
      count: resolvedCount,
      description: "Reports that have been handled",
      icon: "✓",
      iconClass: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <button
          key={card.status}
          type="button"
          onClick={() => onSelectStatus(card.status)}
          className={`rounded-2xl border bg-white p-5 text-left transition hover:shadow-sm ${
            statusFilter === card.status
              ? "border-black"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {card.count}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${card.iconClass}`}
            >
              {card.icon}
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400">{card.description}</p>
        </button>
      ))}
    </div>
  );
}

export default ReportsSummaryCards;
