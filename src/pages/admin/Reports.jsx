import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ReportsSummaryCards from "../../components/admin/ReportsSummaryCards";
import ReportsFilterBar from "../../components/admin/ReportsFilterBar";
import ReportsTable from "../../components/admin/ReportsTable";
import ReportReviewModal from "../../components/admin/ReportReviewModal";
import initialReports from "../../data/admin/reports";

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
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Reports"
        description="Review reports submitted about events and offers and take appropriate action."
        right={
          <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
            {reports.length} total reports
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
