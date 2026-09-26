function Block({ className = "" }) {
  return <span className={"block rounded-lg bg-gray-200/80 " + className} />;
}
export default function LoadingSkeleton({ variant = "list", rows = 4 }) {
  if (variant === "number")
    return (
      <span
        role="status"
        aria-label="Loading count"
        className="inline-block h-9 w-16 animate-pulse rounded-lg bg-gray-200/80 align-middle motion-reduce:animate-none"
      />
    );
  return (
    <div role="status" aria-label="Loading content" aria-busy="true">
      <span className="sr-only">Loading content</span>
      <div
        aria-hidden="true"
        className="animate-pulse motion-reduce:animate-none"
      >
        {variant === "details" || variant === "form" ? (
          <div className="space-y-6">
            <Block className="aspect-video w-full rounded-xl" />
            <Block className="h-8 w-2/3" />
            <Block className="h-4 w-1/3" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <Block key={i} className="h-24" />
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Block className="h-40" />
              <Block className="h-40" />
            </div>
          </div>
        ) : variant === "cards" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-white p-2"
              >
                <Block className="h-52" />
                <div className="space-y-3 p-3">
                  <Block className="h-6 w-3/4" />
                  <Block className="h-4 w-1/2" />
                  <Block className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {Array.from({ length: rows }, (_, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <Block className="h-16 w-24 shrink-0" />
                <div className="flex-1 space-y-3">
                  <Block className="h-5 w-2/3" />
                  <Block className="h-3 w-1/2" />
                </div>
                <Block className="hidden h-7 w-20 sm:block" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
