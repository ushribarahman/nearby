// The title/description block repeated at the top of every admin page,
// with an optional right-aligned slot (a count pill, a date, etc.)
function AdminPageHeader({ title, description, right }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#01BBC1]" />
            <p className="text-sm font-medium text-gray-400">
              Administration
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-2xl text-gray-500">{description}</p>
          )}
        </div>

        {right && <div>{right}</div>}
      </div>
    </div>
  );
}

export default AdminPageHeader;
