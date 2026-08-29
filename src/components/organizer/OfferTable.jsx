import SearchFilter from "./SearchFilter";

function OfferTable({ filteredOffers, handleEdit, handleDelete, searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  if (filteredOffers.length === 0) {
    let message = "";
    if (filterStatus === "all") {
      message = "No offers found. Create your first offer!";
    } else if (filterStatus === "Approved") {
      message = "No offers have been approved yet.";
    } else if (filterStatus === "Pending") {
      message = "No offers are pending approval.";
    }

    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          placeholder="Search offers..."
        />
        
        <div className="py-16 text-center">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        placeholder="Search offers..."
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">

          <thead className="border-b border-gray-100 bg-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Offer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Discount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredOffers.map((offer) => (
              <tr key={offer.id} className="transition hover:bg-gray-50">

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={offer.image || "https://via.placeholder.com/48"}
                      alt={offer.title}
                      className="h-11 w-11 rounded-lg object-cover bg-gray-100"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{offer.title}</p>
                      <p className="mt-1 text-xs text-gray-400">{offer.category}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">{offer.location}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{offer.date}</td>
                <td className="px-6 py-5 text-sm font-medium text-gray-700">
                  ৳{offer.originalPrice || 0}
                </td>
                <td className="px-6 py-5 text-sm font-medium text-[#01BBC1]">
                  {offer.discount || "No discount"}
                </td>

                <td className="px-6 py-5">
                  <span className={"inline-flex rounded-full px-3 py-1 text-xs font-medium " + (
                    offer.status === "Approved" ? "bg-[#01BBC1]/10 text-[#01BBC1]" : "bg-gray-100 text-gray-600"
                  )}>
                  {offer.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="rounded-lg border border-[#01BBC1] px-3 py-2 text-xs font-medium text-[#01BBC1] transition hover:bg-[#01BBC1]/10"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default OfferTable;