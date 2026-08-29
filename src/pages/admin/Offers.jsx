import { useMemo, useState } from "react";

function Offers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOffer, setSelectedOffer] = useState(null);

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "20% Off Weekend Dining",
      organizer: "Taste Bangladesh",
      category: "Food",
      discount: "20%",
      validUntil: "Sep 10, 2026",
      status: "Approved",
    },
    {
      id: 2,
      title: "Early Bird Event Tickets",
      organizer: "Live Nation BD",
      category: "Entertainment",
      discount: "15%",
      validUntil: "Sep 05, 2026",
      status: "Pending",
    },
    {
      id: 3,
      title: "Free Coffee with Breakfast",
      organizer: "Grand Dining",
      category: "Food",
      discount: "Free",
      validUntil: "Sep 15, 2026",
      status: "Approved",
    },
    {
      id: 4,
      title: "Photography Workshop Deal",
      organizer: "City Walk Dhaka",
      category: "Photography",
      discount: "25%",
      validUntil: "Sep 20, 2026",
      status: "Pending",
    },
    {
      id: 5,
      title: "Student Tech Pass",
      organizer: "Tech Community BD",
      category: "Technology",
      discount: "30%",
      validUntil: "Sep 25, 2026",
      status: "Rejected",
    },
    {
      id: 6,
      title: "Creative Market Special",
      organizer: "Creative Hub",
      category: "Shopping",
      discount: "10%",
      validUntil: "Sep 30, 2026",
      status: "Approved",
    },
  ]);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.organizer.toLowerCase().includes(search.toLowerCase()) ||
        offer.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || offer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [offers, search, filter]);

  const updateStatus = (id, status) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === id
          ? { ...offer, status }
          : offer
      )
    );

    setSelectedOffer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-medium text-gray-500">
            Administration
          </p>

          <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Offers
              </h1>

              <p className="mt-2 text-gray-500">
                Review and manage promotional offers.
              </p>
            </div>

            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {offers.length} total offers
            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search offers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            {["All", "Pending", "Approved", "Rejected"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-left">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    Offer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Organizer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Discount
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Valid Until
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOffers.map((offer) => (

                  <tr
                    key={offer.id}
                    className="transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-medium text-gray-900">
                        {offer.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Offer #{offer.id}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {offer.organizer}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {offer.category}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {offer.discount}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {offer.validUntil}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          offer.status === "Approved"
                            ? "bg-gray-100 text-gray-700"
                            : offer.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {offer.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() => setSelectedOffer(offer)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Review
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredOffers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-gray-900">
                No offers found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Offer Review Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Offer Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedOffer.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOffer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Organizer
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {selectedOffer.organizer}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedOffer.category}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Discount
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedOffer.discount}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Valid Until
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedOffer.validUntil}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Current Status
                </p>

                <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {selectedOffer.status}
                </span>
              </div>

            </div>

            <div className="mt-6 flex gap-2">

              <button
                type="button"
                onClick={() =>
                  updateStatus(selectedOffer.id, "Approved")
                }
                className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Approve
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(selectedOffer.id, "Rejected")
                }
                className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => setSelectedOffer(null)}
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Offers;