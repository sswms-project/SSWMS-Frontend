import { Spinner } from '@/components/ui/spinner'

export function LoadingState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="bg-accent text-primary flex size-20 items-center justify-center rounded-full">
        <Spinner className="size-9" aria-hidden="true" />
      </div>
      <p className="text-primary mt-6 text-xs font-semibold">Đang xác minh email</p>
      <h2 className="text-foreground mt-2 text-2xl leading-8 font-semibold">
        Vui lòng chờ trong giây lát
      </h2>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
        KOVIA đang kiểm tra token từ email và cập nhật trạng thái tài khoản của bạn.
      </p>
    </div>
  )
}
