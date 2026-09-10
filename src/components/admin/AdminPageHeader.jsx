// The "Administration / Title / description" block repeated at the top
// of every admin page, with an optional right-aligned slot (a count pill,
// a date, etc.)
function AdminPageHeader({ title, description, right }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-gray-500">Administration</p>

      <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
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
