import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <div className="bg-destructive/10 flex size-16 items-center justify-center rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-destructive size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>
      <h1 className="text-foreground text-2xl font-semibold">Không có quyền truy cập</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        Bạn không có quyền xem trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là
        lỗi.
      </p>
      <Link
        href="/dashboard"
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        Quay về Dashboard
      </Link>
    </div>
  )
}
