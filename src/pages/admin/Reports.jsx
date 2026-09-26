import { useEffect, useMemo, useState } from "react";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ReportsSummaryCards from "../../components/admin/ReportsSummaryCards";
import ReportsFilterBar from "../../components/admin/ReportsFilterBar";
import ReportsTable from "../../components/admin/ReportsTable";
import ReportReviewModal from "../../components/admin/ReportReviewModal";
import reportService from "../../services/reportService";

// Keeps the list fresh without a websocket: refetch on an interval and
// whenever the tab regains focus — the same pattern useEvents/useOffers
// use elsewhere in the app.
const POLL_INTERVAL_MS = 15000;

function Reports() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [saving, setSaving] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    let active = true;

    const refresh = () =>
      reportService
        .adminList()
        .then(({ reports }) => {
          if (!active) return;
          setReports(reports);
          setLoadError("");
        })
        .catch((error) => {
          if (active) setLoadError(error.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });

    refresh();
    const timer = window.setInterval(refresh, POLL_INTERVAL_MS);
    window.addEventListener("focus", refresh);

    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, []);

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

  const updateReportStatus = async (id, status) => {
    if (saving) return;
    setSaving(true);
    setReviewError("");
    try {
      const { report } = await reportService.updateStatus(id, status);
      setReports((current) =>
        current.map((item) => (item.id === id ? report : item)),
      );
      setSelectedReport(null);
    } catch (error) {
      setReviewError(error.message);
    } finally {
      setSaving(false);
    }
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

      {loadError && (
        <p role="alert" className="mb-4 text-red-600">
          {loadError}
        </p>
      )}

      {loading ? (
        <LoadingSkeleton variant="list" />
      ) : (
        <ReportsTable
          reports={filteredReports}
          onReview={(report) => {
            setReviewError("");
            setSelectedReport(report);
          }}
          onClearFilters={clearFilters}
        />
      )}

      {selectedReport && (
        <ReportReviewModal
          key={selectedReport.id}
          report={selectedReport}
          saving={saving}
          error={reviewError}
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
