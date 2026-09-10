// Generic modal shell (overlay + card + header with an eyebrow/title and
// a close button) shared by every admin review/detail modal. Callers pass
// the body as children and any action buttons as `footer`.
function AdminModal({
  eyebrow,
  title,
  subtitle,
  onClose,
  children,
  footer,
  maxWidthClassName = "max-w-lg",
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full ${maxWidthClassName} max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl`}
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            {eyebrow && <p className="text-sm text-gray-500">{eyebrow}</p>}

            <h2 className="mt-1 text-xl font-bold text-gray-900">{title}</h2>

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6">{children}</div>

        {footer && (
          <div className="border-t border-gray-200 px-6 py-5">{footer}</div>
        )}
      </div>
    </div>
  );
}

export default AdminModal;
