export default function Loading() {
  return (
    <div
      className="container flex min-h-[40vh] items-start justify-center py-16 text-sm text-neutral-500"
      role="status"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600"
        />
        <span>Lehe laadimine…</span>
      </div>
    </div>
  )
}
