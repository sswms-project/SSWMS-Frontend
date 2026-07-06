'use client'

import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  MailCheck,
  RotateCcw,
  ShieldCheck,
  Warehouse,
} from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useVerifyEmailQuery } from '@/features/auth/api'
import type { ApiErrorResponse } from '@/types/api'

interface VerifyEmailResultProps {
  readonly token?: string
}

function getApiErrorMessage(error: ApiErrorResponse | null) {
  return error?.message ?? 'Không thể xác minh email. Vui lòng thử lại sau.'
}

function isAlreadyVerified(message: string) {
  return message.toLowerCase().includes('trước đó')
}

export function VerifyEmailResult({ token }: VerifyEmailResultProps) {
  const verifyEmailQuery = useVerifyEmailQuery(token)
  const errorMessage = getApiErrorMessage(verifyEmailQuery.error)
  const successMessage = verifyEmailQuery.data?.data

  React.useEffect(() => {
    if (!verifyEmailQuery.error) return

    console.error(verifyEmailQuery.error)
    toast.error(getApiErrorMessage(verifyEmailQuery.error))
  }, [verifyEmailQuery.error])

  return (
    <main className="min-h-[100dvh] bg-[#f6fafc] text-[#171c1e]">
      <header className="border-b border-[#bdc8cd] bg-[#f6fafc]/90 px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#00677d]" aria-label="SSWMS">
            <Warehouse className="size-7" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">SSWMS</span>
          </Link>
          <Button
            asChild
            variant="ghost"
            className="h-9 rounded-md px-3 text-xs font-semibold text-[#00677d] hover:bg-[#e4e9eb]"
          >
            <Link href="/login">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Đăng nhập
            </Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-4 px-4 py-8 md:grid-cols-[1fr_320px] md:px-6 md:py-14">
        <Card className="rounded-lg border border-[#bdc8cd] bg-white py-0 shadow-sm">
          <CardContent className="px-5 py-8 md:px-10 md:py-10">
            {!token ? (
              <MissingTokenState />
            ) : verifyEmailQuery.isPending ? (
              <LoadingState />
            ) : verifyEmailQuery.isSuccess && successMessage ? (
              <SuccessState message={successMessage} />
            ) : (
              <ErrorState message={errorMessage} />
            )}
          </CardContent>
        </Card>

        <aside className="rounded-lg border border-[#bdc8cd] bg-white p-5">
          <div className="flex size-10 items-center justify-center rounded-md bg-[#c5e8f6] text-[#00677d]">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-sm font-semibold text-[#171c1e]">Bảo vệ workspace</h2>
          <p className="mt-2 text-sm leading-6 text-[#3e484c]">
            Email xác minh giúp SSWMS đảm bảo người tạo tenant là chủ sở hữu hợp lệ trước khi kích
            hoạt tài khoản vận hành.
          </p>
          <div className="mt-5 rounded-md border border-[#bdc8cd] bg-[#f0f4f6] p-3 text-xs leading-5 text-[#3e484c]">
            Link xác minh được backend cấp sau khi đăng ký và có thời hạn 15 phút.
          </div>
        </aside>
      </section>
    </main>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-[#c5e8f6] text-[#00677d]">
        <Spinner className="size-9" aria-hidden="true" />
      </div>
      <p className="mt-6 text-xs font-semibold text-[#00677d]">Đang xác minh email</p>
      <h1 className="mt-2 text-2xl leading-8 font-semibold text-[#171c1e]">
        Vui lòng chờ trong giây lát
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#3e484c]">
        SSWMS đang kiểm tra token từ email và cập nhật trạng thái tài khoản của bạn.
      </p>
    </div>
  )
}

function SuccessState({ message }: { readonly message: string }) {
  const alreadyVerified = isAlreadyVerified(message)

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-[#c5e8f6] text-[#00677d]">
        {alreadyVerified ? (
          <MailCheck className="size-10" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="size-10" aria-hidden="true" />
        )}
      </div>
      <p className="mt-6 text-xs font-semibold text-[#00677d]">
        {alreadyVerified ? 'Email đã được xác minh' : 'Xác minh thành công'}
      </p>
      <h1 className="mt-2 text-2xl leading-8 font-semibold text-[#171c1e]">
        Tài khoản đã sẵn sàng đăng nhập
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#3e484c]">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="h-11 rounded-md bg-[#00677d] px-5 text-sm font-semibold text-white hover:bg-[#00566a]"
        >
          <Link href="/login">Đến trang đăng nhập</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-md border-[#42636f] px-5 text-sm font-semibold text-[#42636f] hover:bg-[#f0f4f6]"
        >
          <Link href="/register">Tạo tenant khác</Link>
        </Button>
      </div>
    </div>
  )
}

function ErrorState({ message }: { readonly message: string }) {
  return (
    <div className="flex min-h-[360px] flex-col justify-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#ffdad6] text-[#ba1a1a]">
        <AlertCircle className="size-10" aria-hidden="true" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold text-[#ba1a1a]">Không thể xác minh email</p>
        <h1 className="mt-2 text-2xl leading-8 font-semibold text-[#171c1e]">
          Link xác minh không còn hợp lệ
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#3e484c]">{message}</p>
      </div>
      <Alert className="mt-7 rounded-md border-[#bdc8cd] bg-[#f0f4f6] text-[#171c1e]">
        <AlertCircle className="size-4 text-[#ba1a1a]" aria-hidden="true" />
        <AlertTitle>Gợi ý xử lý</AlertTitle>
        <AlertDescription>
          Nếu link đã hết hạn, hãy đăng ký lại để nhận email xác minh mới hoặc liên hệ quản trị viên
          hệ thống.
        </AlertDescription>
      </Alert>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          asChild
          className="h-11 rounded-md bg-[#00677d] px-5 text-sm font-semibold text-white hover:bg-[#00566a]"
        >
          <Link href="/register">
            <RotateCcw className="size-4" aria-hidden="true" />
            Đăng ký lại
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-md border-[#42636f] px-5 text-sm font-semibold text-[#42636f] hover:bg-[#f0f4f6]"
        >
          <Link href="/login">Về trang đăng nhập</Link>
        </Button>
      </div>
    </div>
  )
}

function MissingTokenState() {
  return (
    <div className="flex min-h-[360px] flex-col justify-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#ffdad6] text-[#ba1a1a]">
        <AlertCircle className="size-10" aria-hidden="true" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold text-[#ba1a1a]">Thiếu token xác minh</p>
        <h1 className="mt-2 text-2xl leading-8 font-semibold text-[#171c1e]">
          Link email chưa đầy đủ
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#3e484c]">
          Vui lòng mở đúng link xác minh được gửi tới email sau khi đăng ký tài khoản SSWMS.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          asChild
          className="h-11 rounded-md bg-[#00677d] px-5 text-sm font-semibold text-white hover:bg-[#00566a]"
        >
          <Link href="/register">Quay lại đăng ký</Link>
        </Button>
      </div>
    </div>
  )
}
