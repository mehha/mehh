export default function Loading() {
  return (
    <div className="container min-h-[40vh] py-16" role="status">
      <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full w-full animate-pulse bg-neutral-950" />
      </div>
      <span className="sr-only">Lehe laadimine…</span>
    </div>
  )
}
