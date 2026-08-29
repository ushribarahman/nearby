import { useMemo, useState } from "react";

function Reports() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([
    {
      id: "REP-1024",
      type: "Event",
      target: "Dhaka Art Festival",
      organizer: "Dhaka Art Club",
      reportedBy: "Arif Rahman",
      reason: "Fake / misleading event",
      description:
        "The event information appears to be misleading. The reported user mentioned that the organizer is advertising a venue and schedule that could not be verified.",
      date: "Aug 28, 2026",
      status: "Pending",
    },
    {
      id: "REP-1023",
      type: "Offer",
      target: "20% Off Weekend Dining",
      organizer: "Taste Bangladesh",
      reportedBy: "Nusrat Jahan",
      reason: "Offer not valid",
      description:
        "The discount mentioned in the offer was not provided when the user tried to redeem it.",
      date: "Aug 27, 2026",
      status: "Under Review",
    },
    {
      id: "REP-1022",
      type: "Event",
      target: "Tech Meetup 2026",
      organizer: "Tech Community BD",
      reportedBy: "Sakib Hasan",
      reason: "Incorrect event information",
      description:
        "The location and event details shown on the platform appear to be different from the information provided by the organizer.",
      date: "Aug 26, 2026",
      status: "Resolved",
    },
    {
      id: "REP-1021",
      type: "Offer",
      target: "Student Tech Pass",
      organizer: "Tech Community BD",
      reportedBy: "Mim Akter",
      reason: "Misleading offer",
      description:
        "The offer advertises a student discount but does not clearly mention the eligibility requirements.",
      date: "Aug 25, 2026",
      status: "Dismissed",
    },
    {
      id: "REP-1020",
      type: "Event",
      target: "Night Music Festival",
      organizer: "Live Nation BD",
      reportedBy: "Tanvir Ahmed",
      reason: "Suspicious event",
      description:
        "The reported user believes that the event may not be legitimate because the organizer has not provided enough information about the venue and registration process.",
      date: "Aug 24, 2026",
      status: "Pending",
    },
    {
      id: "REP-1019",
      type: "Offer",
      target: "Photography Workshop Deal",
      organizer: "City Walk Dhaka",
      reportedBy: "Farhana Islam",
      reason: "Incorrect discount",
      description:
        "The displayed discount percentage appears to be different from what was communicated by the organizer.",
      date: "Aug 23, 2026",
      status: "Under Review",
    },
  ]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        report.target.toLowerCase().includes(searchText) ||
        report.organizer.toLowerCase().includes(searchText) ||
        report.reportedBy.toLowerCase().includes(searchText) ||
        report.reason.toLowerCase().includes(searchText) ||
        report.id.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, search, typeFilter, statusFilter]);

  const updateReportStatus = (id, status) => {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? {
              ...report,
              status,
            }
          : report
      )
    );

    setSelectedReport(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700";

      case "Under Review":
        return "bg-blue-50 text-blue-700";

      case "Resolved":
        return "bg-gray-100 text-gray-700";

      case "Dismissed":
        return "bg-gray-100 text-gray-500";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeClass = (type) => {
    if (type === "Event") {
      return "bg-gray-100 text-gray-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const pendingCount = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const reviewCount = reports.filter(
    (report) => report.status === "Under Review"
  ).length;

  const resolvedCount = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <p className="text-sm font-medium text-gray-500">
            Administration
          </p>

          <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-gray-500">
                Review reports submitted about events and offers and
                take appropriate action.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">

              <p className="text-xs text-gray-400">
                Total Reports
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                {reports.length}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Pending */}
          <button
            type="button"
            onClick={() => {
              setStatusFilter("Pending");
              setTypeFilter("All");
            }}
            className={`rounded-2xl border bg-white p-5 text-left transition hover:shadow-sm ${
              statusFilter === "Pending"
                ? "border-black"
                : "border-gray-200"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Reports
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pendingCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-sm font-bold text-yellow-700">
                !
              </div>

            </div>

            <p className="mt-3 text-xs text-gray-400">
              Waiting for admin review
            </p>

          </button>


          {/* Under Review */}
          <button
            type="button"
            onClick={() => {
              setStatusFilter("Under Review");
              setTypeFilter("All");
            }}
            className={`rounded-2xl border bg-white p-5 text-left transition hover:shadow-sm ${
              statusFilter === "Under Review"
                ? "border-black"
                : "border-gray-200"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Under Review
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {reviewCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                ?
              </div>

            </div>

            <p className="mt-3 text-xs text-gray-400">
              Currently being investigated
            </p>

          </button>


          {/* Resolved */}
          <button
            type="button"
            onClick={() => {
              setStatusFilter("Resolved");
              setTypeFilter("All");
            }}
            className={`rounded-2xl border bg-white p-5 text-left transition hover:shadow-sm ${
              statusFilter === "Resolved"
                ? "border-black"
                : "border-gray-200"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Resolved
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {resolvedCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-700">
                ✓
              </div>

            </div>

            <p className="mt-3 text-xs text-gray-400">
              Reports that have been handled
            </p>

          </button>

        </div>


        {/* =====================================================
            FILTER BAR
        ====================================================== */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

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
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search reports..."
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  py-2.5
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-black
                  focus:bg-white
                "
              />

            </div>


            {/* Filters */}

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Type */}

              <div className="flex gap-2">

                {["All", "Event", "Offer"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      typeFilter === type
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}

              </div>


              {/* Status */}

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-black
                "
              >

                <option value="All">
                  All Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Under Review">
                  Under Review
                </option>

                <option value="Resolved">
                  Resolved
                </option>

                <option value="Dismissed">
                  Dismissed
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* =====================================================
            REPORT TABLE
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          {/* Table Header */}

          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

            <div>

              <h2 className="font-semibold text-gray-900">
                Reported Content
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Reports concerning events and offers.
              </p>

            </div>

            <span className="text-sm text-gray-400">
              {filteredReports.length} result
              {filteredReports.length !== 1 ? "s" : ""}
            </span>

          </div>


          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px] text-left">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    Reported Content
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Type
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Report Reason
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Reported By
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
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

                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (

                    <tr
                      key={report.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Target */}

                      <td className="px-6 py-5">

                        <div className="max-w-[260px]">

                          <p className="truncate font-medium text-gray-900">
                            {report.target}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {report.organizer}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-300">
                            {report.id}
                          </p>

                        </div>

                      </td>


                      {/* Type */}

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeClass(
                            report.type
                          )}`}
                        >
                          {report.type}
                        </span>

                      </td>


                      {/* Reason */}

                      <td className="px-6 py-5">

                        <p className="max-w-[190px] text-sm text-gray-700">
                          {report.reason}
                        </p>

                      </td>


                      {/* Reporter */}

                      <td className="px-6 py-5">

                        <p className="text-sm text-gray-700">
                          {report.reportedBy}
                        </p>

                      </td>


                      {/* Date */}

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {report.date}
                      </td>


                      {/* Status */}

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>

                      </td>


                      {/* Action */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedReport(report)
                            }
                            className="
                              rounded-lg
                              border
                              border-gray-200
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-gray-700
                              transition
                              hover:bg-gray-50
                            "
                          >
                            Review
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="px-6 py-20 text-center"
                    >

                      <div className="mx-auto max-w-sm">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500">
                          ✓
                        </div>

                        <p className="mt-4 font-medium text-gray-900">
                          No reports found
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          No reports match the selected filters.
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setTypeFilter("All");
                            setStatusFilter("All");
                          }}
                          className="mt-4 text-sm font-medium text-gray-900 underline underline-offset-4"
                        >
                          Clear filters
                        </button>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* =====================================================
          REPORT REVIEW MODAL
      ====================================================== */}

      {selectedReport && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            px-6
            py-8
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}

            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">

              <div>

                <div className="flex items-center gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeClass(
                      selectedReport.type
                    )}`}
                  >
                    {selectedReport.type}
                  </span>

                  <span className="text-xs text-gray-400">
                    {selectedReport.id}
                  </span>

                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {selectedReport.target}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Organized by {selectedReport.organizer}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-600
                  transition
                  hover:bg-gray-200
                "
              >
                ×
              </button>

            </div>


            {/* Modal Content */}

            <div className="space-y-6 px-6 py-6">

              {/* Status */}

              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

                <div>

                  <p className="text-xs text-gray-400">
                    Current Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                      selectedReport.status
                    )}`}
                  >
                    {selectedReport.status}
                  </span>

                </div>

                <p className="text-xs text-gray-400">
                  Reported {selectedReport.date}
                </p>

              </div>


              {/* Report Information */}

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Report Information
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl border border-gray-200 p-4">

                    <p className="text-xs text-gray-400">
                      Reason
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {selectedReport.reason}
                    </p>

                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">

                    <p className="text-xs text-gray-400">
                      Reported By
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {selectedReport.reportedBy}
                    </p>

                  </div>

                </div>

              </div>


              {/* Description */}

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Report Description
                </h3>

                <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

                  <p className="text-sm leading-6 text-gray-600">
                    {selectedReport.description}
                  </p>

                </div>

              </div>


              {/* Target Details */}

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Reported Content
                </h3>

                <div className="mt-3 rounded-xl border border-gray-200 p-4">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs text-gray-400">
                        {selectedReport.type}
                      </p>

                      <p className="mt-1 font-medium text-gray-900">
                        {selectedReport.target}
                      </p>

                    </div>

                    <div className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
                      {selectedReport.organizer}
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Modal Actions */}

            <div className="border-t border-gray-200 px-6 py-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                Take Action
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    updateReportStatus(
                      selectedReport.id,
                      "Under Review"
                    )
                  }
                  className="
                    flex-1
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-50
                  "
                >
                  Mark Under Review
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateReportStatus(
                      selectedReport.id,
                      "Resolved"
                    )
                  }
                  className="
                    flex-1
                    rounded-lg
                    bg-black
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-gray-800
                  "
                >
                  Resolve Report
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateReportStatus(
                      selectedReport.id,
                      "Dismissed"
                    )
                  }
                  className="
                    flex-1
                    rounded-lg
                    bg-gray-100
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-200
                  "
                >
                  Dismiss
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Reports;