import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ReportsSummaryCards from "../../components/admin/ReportsSummaryCards";
import ReportsFilterBar from "../../components/admin/ReportsFilterBar";
import ReportsTable from "../../components/admin/ReportsTable";
import ReportReviewModal from "../../components/admin/ReportReviewModal";

const initialReports = [
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
];

function Reports() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState(initialReports);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        report.target.toLowerCase().includes(searchText) ||
        report.organizer.toLowerCase().includes(searchText) ||
        report.reportedBy.toLowerCase().includes(searchText) ||
        report.reason.toLowerCase().includes(searchText) ||
        report.id.toLowerCase().includes(searchText);

      const matchesType = typeFilter === "All" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, search, typeFilter, statusFilter]);

  const updateReportStatus = (id, status) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );

    setSelectedReport(null);
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

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminPageHeader
          title="Reports"
          description="Review reports submitted about events and offers and take appropriate action."
          right={
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-400">Total Reports</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {reports.length}
              </p>
            </div>
          }
        />

        <ReportsSummaryCards
          pendingCount={pendingCount}
          reviewCount={reviewCount}
          resolvedCount={resolvedCount}
          statusFilter={statusFilter}
          onSelectStatus={(status) => {
            setStatusFilter(status);
            setTypeFilter("All");
          }}
        />

        <ReportsFilterBar
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <ReportsTable
          reports={filteredReports}
          onReview={setSelectedReport}
          onClearFilters={clearFilters}
        />
      </div>

      {selectedReport && (
        <ReportReviewModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onMarkUnderReview={(id) => updateReportStatus(id, "Under Review")}
          onResolve={(id) => updateReportStatus(id, "Resolved")}
          onDismiss={(id) => updateReportStatus(id, "Dismissed")}
        />
      )}
    </div>
  );
}

export default Reports;
