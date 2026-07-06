'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Loader2, Rocket, ShieldCheck, Warehouse } from 'lucide-react'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRegisterMutation } from '@/features/auth/api'
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas/register.schema'

const warehouseVisualUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNB9ii5e04oPKxDw8BflJrd37LtYxdqM5OLE-ECfVe7LAcIVfoUS7yHRGX_9auGqNY_tPSZjH-zi3T-NDTWo7kQkYGS-zV_5-MZD-IXkyeQ-pkzOXIEUfvfgXBeNl2L9B6r0S3jbYDwrtfwyXPYc7gXTGBv28HgsQGmAGYVEYh5euVNUaemcHcNDNJY7nwvp8mcOCJawFWF7GnP2igfWDmC7Glr4v9AsWP5MEMynD_dio68r_r4TJ31TaKgqb0a81psIFwzzsaLNY'

const defaultValues: RegisterFormValues = {
  tenantName: '',
  ownerName: '',
  phone: '',
  email: '',
  address: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
}

function getApiErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }

  return 'Không thể đăng ký tài khoản. Vui lòng thử lại sau.'
}

export function RegisterForm() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
  const registerMutation = useRegisterMutation()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form

  async function onSubmit(values: RegisterFormValues) {
    try {
      const response = await registerMutation.mutateAsync({
        tenantName: values.tenantName.trim(),
        ownerName: values.ownerName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
        acceptTerms: values.acceptTerms,
      })

      setSuccessMessage(response.data)
      form.reset(defaultValues)
      toast.success('Đăng ký thành công. Vui lòng kiểm tra email xác minh.')
    } catch (error) {
      const message = getApiErrorMessage(error)
      console.error(error)
      toast.error(message)
    }
  }

  return (
    <main className="min-h-[100dvh] bg-[#f6fafc] text-[#171c1e]">
      <header className="sticky top-0 z-40 border-b border-[#bdc8cd] bg-[#f6fafc]/90 px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#00677d]" aria-label="SSWMS">
            <Warehouse className="size-7" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">SSWMS</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold text-[#3e484c] md:inline">
              Hỗ trợ trực tuyến: 1800-SSWMS
            </span>
            <Link
              href="/login"
              className="text-xs font-semibold text-[#00677d] underline-offset-4 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-4 px-4 py-8 md:grid-cols-12 md:px-6 md:py-10">
        <aside
          className="hidden md:col-span-5 md:flex md:flex-col md:gap-4"
          aria-label="SSWMS benefits"
        >
          <div className="relative flex min-h-[540px] flex-1 overflow-hidden rounded-lg border border-[#bdc8cd] bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${warehouseVisualUrl})` }}
              role="img"
              aria-label="Kho hàng tự động hiện đại với ánh sáng xanh cyan"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003f4d]/90 via-[#003f4d]/30 to-transparent" />
            <div className="relative mt-auto p-8 text-white">
              <p className="mb-3 w-fit rounded-md bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                Operational Intelligence
              </p>
              <h1 className="text-2xl leading-8 font-semibold">Quản trị kho bãi thế hệ mới</h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
                Nền tảng vận hành tập trung giúp kiểm soát tồn kho, vận chuyển và nhân sự trong một
                giao diện thống nhất.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <BenefitCard
              icon={ShieldCheck}
              title="Bảo mật đa tầng"
              description="Xác minh email và quản trị truy cập theo tenant."
            />
            <BenefitCard
              icon={Rocket}
              title="Triển khai nhanh"
              description="Khởi tạo workspace và owner trong một lần đăng ký."
              accent
            />
          </div>
        </aside>

        <section className="md:col-span-7">
          <Card className="min-h-[640px] rounded-lg border border-[#bdc8cd] bg-white py-0 shadow-sm">
            <CardContent className="flex flex-1 flex-col px-5 py-6 md:px-10 md:py-8">
              {successMessage ? (
                <RegisterSuccess
                  message={successMessage}
                  onCreateAnother={() => setSuccessMessage(null)}
                />
              ) : (
                <>
                  <div className="mb-7">
                    <p className="text-xs font-semibold text-[#00677d]">Tạo tenant owner</p>
                    <h2 className="mt-2 text-2xl leading-8 font-semibold text-[#171c1e]">
                      Đăng ký tài khoản hệ thống
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#3e484c]">
                      Cung cấp thông tin doanh nghiệp và người đại diện để khởi tạo workspace SSWMS.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
                    <TextField
                      id="tenantName"
                      label="Tên doanh nghiệp / Kho hàng"
                      placeholder="Warehouse Solution Vietnam"
                      error={errors.tenantName?.message}
                      className="md:col-span-2"
                      {...register('tenantName')}
                    />
                    <TextField
                      id="ownerName"
                      label="Tên chủ sở hữu"
                      placeholder="Nguyễn Văn A"
                      error={errors.ownerName?.message}
                      {...register('ownerName')}
                    />
                    <TextField
                      id="phone"
                      label="Số điện thoại"
                      placeholder="0901234567"
                      type="tel"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <TextField
                      id="email"
                      label="Email công việc"
                      placeholder="admin@domain.com"
                      type="email"
                      error={errors.email?.message}
                      className="md:col-span-2"
                      {...register('email')}
                    />
                    <Field className="md:col-span-2" data-invalid={Boolean(errors.address)}>
                      <FieldLabel
                        htmlFor="address"
                        className="text-xs font-semibold text-[#3e484c]"
                      >
                        Địa chỉ / Khu vực vận hành
                      </FieldLabel>
                      <Textarea
                        id="address"
                        placeholder="123 Nguyễn Huệ, TP.HCM"
                        aria-invalid={Boolean(errors.address)}
                        className="min-h-20 rounded-md border-[#bdc8cd] bg-white px-3 py-2.5 text-sm text-[#171c1e] placeholder:text-[#6e797d] focus-visible:border-[#00677d] focus-visible:ring-[#00677d]/20"
                        {...register('address')}
                      />
                      <FieldError>{errors.address?.message}</FieldError>
                    </Field>
                    <TextField
                      id="password"
                      label="Mật khẩu"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      error={errors.password?.message}
                      {...register('password')}
                    />
                    <TextField
                      id="confirmPassword"
                      label="Xác nhận mật khẩu"
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      error={errors.confirmPassword?.message}
                      {...register('confirmPassword')}
                    />

                    <div className="rounded-md border border-[#bdc8cd] bg-[#f0f4f6] p-3 text-xs leading-5 text-[#3e484c] md:col-span-2">
                      Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường, chữ số và ký tự đặc
                      biệt.
                    </div>

                    <Controller
                      control={control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <Field
                          orientation="horizontal"
                          className="items-start gap-3 md:col-span-2"
                          data-invalid={Boolean(errors.acceptTerms)}
                        >
                          <Checkbox
                            id="acceptTerms"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                            aria-invalid={Boolean(errors.acceptTerms)}
                            className="mt-0.5 rounded-sm border-[#6e797d] data-checked:border-[#00677d] data-checked:bg-[#00677d]"
                          />
                          <div className="space-y-1">
                            <FieldLabel
                              htmlFor="acceptTerms"
                              className="block text-sm leading-5 text-[#3e484c]"
                            >
                              Tôi đồng ý với{' '}
                              <Link
                                href="#"
                                className="font-semibold text-[#00677d] underline-offset-4 hover:underline"
                              >
                                Điều khoản Dịch vụ
                              </Link>{' '}
                              và{' '}
                              <Link
                                href="#"
                                className="font-semibold text-[#00677d] underline-offset-4 hover:underline"
                              >
                                Chính sách Bảo mật
                              </Link>{' '}
                              của SSWMS.
                            </FieldLabel>
                            <FieldError>{errors.acceptTerms?.message}</FieldError>
                          </div>
                        </Field>
                      )}
                    />

                    <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row md:items-center md:justify-between">
                      <p className="text-xs leading-5 text-[#3e484c]">
                        Sau khi đăng ký, hệ thống sẽ gửi email xác minh có hiệu lực trong 15 phút.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={registerMutation.isPending}
                        className="h-11 rounded-md bg-[#00677d] px-5 text-sm font-semibold text-white hover:bg-[#00566a] active:scale-[0.98] md:min-w-44"
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="size-4" aria-hidden="true" />
                        )}
                        Tạo tài khoản
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  )
}

interface BenefitCardProps {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  readonly title: string
  readonly description: string
  readonly accent?: boolean
}

function BenefitCard({ icon: Icon, title, description, accent = false }: BenefitCardProps) {
  return (
    <div className="rounded-lg border border-[#bdc8cd] bg-white p-5">
      <Icon
        className={accent ? 'size-5 text-[#794d8f]' : 'size-5 text-[#00677d]'}
        aria-hidden="true"
      />
      <p className="mt-3 text-sm font-semibold text-[#171c1e]">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[#3e484c]">{description}</p>
    </div>
  )
}

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  readonly label: string
  readonly error?: string
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, error, className, ...props }, ref) => (
    <Field className={className} data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id} className="text-xs font-semibold text-[#3e484c]">
        {label}
      </FieldLabel>
      <Input
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        className="h-11 rounded-md border-[#bdc8cd] bg-white px-3 text-sm text-[#171c1e] placeholder:text-[#6e797d] focus-visible:border-[#00677d] focus-visible:ring-[#00677d]/20"
        {...props}
      />
      <FieldError>{error}</FieldError>
    </Field>
  )
)
TextField.displayName = 'TextField'

interface RegisterSuccessProps {
  readonly message: string
  readonly onCreateAnother: () => void
}

function RegisterSuccess({ message, onCreateAnother }: RegisterSuccessProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-[#c5e8f6] text-[#00677d]">
        <CheckCircle2 className="size-10" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-[#171c1e]">Đăng ký thành công</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#3e484c]">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="h-11 rounded-md bg-[#00677d] px-5 text-sm font-semibold text-white hover:bg-[#00566a]"
        >
          <Link href="/login">Đến trang đăng nhập</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-md border-[#42636f] px-5 text-sm font-semibold text-[#42636f] hover:bg-[#f0f4f6]"
          onClick={onCreateAnother}
        >
          Đăng ký tenant khác
        </Button>
      </div>
    </div>
  )
}
