'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  Rocket,
  ShieldCheck,
  Warehouse,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRegisterMutation } from '@/features/auth/api'
import {
  passwordRequirements,
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/register.schema'

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
  const passwordValue = useWatch({ control, name: 'password' }) ?? ''
  const confirmPasswordValue = useWatch({ control, name: 'confirmPassword' }) ?? ''

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
    <main className="bg-background text-foreground min-h-[100dvh]">
      <header className="border-border bg-background/90 sticky top-0 z-40 border-b px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between">
          <Link href="/" className="text-primary flex items-center gap-2" aria-label="SSWMS">
            <Warehouse className="size-7" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">SSWMS</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs font-semibold md:inline">
              Hỗ trợ trực tuyến: 1800-SSWMS
            </span>
            <Link
              href="/login"
              className="text-primary text-xs font-semibold underline-offset-4 hover:underline"
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
          <div className="border-border bg-card relative flex min-h-[540px] flex-1 overflow-hidden rounded-lg border">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${warehouseVisualUrl})` }}
              role="img"
              aria-label="Kho hàng tự động hiện đại với ánh sáng xanh cyan"
            />
            <div className="from-primary/90 via-primary/30 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="text-primary-foreground relative mt-auto p-8">
              <p className="bg-primary-foreground/15 mb-3 w-fit rounded-md px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                Operational Intelligence
              </p>
              <h1 className="text-2xl leading-8 font-semibold">Quản trị kho bãi thế hệ mới</h1>
              <p className="text-primary-foreground/90 mt-3 max-w-sm text-sm leading-6">
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
          <Card className="border-border bg-card min-h-[640px] rounded-lg border py-0 shadow-sm">
            <CardContent className="flex flex-1 flex-col px-5 py-6 md:px-10 md:py-8">
              {successMessage ? (
                <RegisterSuccess
                  message={successMessage}
                  onCreateAnother={() => setSuccessMessage(null)}
                />
              ) : (
                <>
                  <div className="mb-7">
                    <p className="text-primary text-xs font-semibold">Tạo tenant owner</p>
                    <h2 className="text-foreground mt-2 text-2xl leading-8 font-semibold">
                      Đăng ký tài khoản hệ thống
                    </h2>
                    <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
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
                        className="text-muted-foreground text-xs font-semibold"
                      >
                        Địa chỉ / Khu vực vận hành
                      </FieldLabel>
                      <Textarea
                        id="address"
                        placeholder="123 Nguyễn Huệ, TP.HCM"
                        aria-invalid={Boolean(errors.address)}
                        className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 min-h-20 rounded-md px-3 py-2.5 text-sm"
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

                    <div className="border-border bg-muted text-muted-foreground space-y-3 rounded-md border p-3 text-xs leading-5 md:col-span-2">
                      <PasswordRequirementList password={passwordValue} />
                      <ConfirmPasswordHint
                        password={passwordValue}
                        confirmPassword={confirmPasswordValue}
                      />
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
                            className="border-border data-checked:border-primary data-checked:bg-primary mt-0.5 rounded-sm"
                          />
                          <div className="space-y-1">
                            <FieldLabel
                              htmlFor="acceptTerms"
                              className="text-muted-foreground block text-sm leading-5"
                            >
                              Tôi đồng ý với{' '}
                              <span className="text-primary font-semibold">Điều khoản Dịch vụ</span>{' '}
                              và{' '}
                              <span className="text-primary font-semibold">Chính sách Bảo mật</span>{' '}
                              của SSWMS.
                            </FieldLabel>
                            <FieldError>{errors.acceptTerms?.message}</FieldError>
                          </div>
                        </Field>
                      )}
                    />

                    <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row md:items-center md:justify-between">
                      <p className="text-muted-foreground text-xs leading-5">
                        Sau khi đăng ký, hệ thống sẽ gửi email xác minh có hiệu lực trong 15 phút.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={registerMutation.isPending}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-5 text-sm font-semibold active:scale-[0.98] md:min-w-44"
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

interface PasswordRequirementListProps {
  readonly password: string
}

function PasswordRequirementList({ password }: PasswordRequirementListProps) {
  return (
    <div aria-live="polite">
      <p className="text-foreground mb-2 font-semibold">Mật khẩu cần đáp ứng:</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {passwordRequirements.map((requirement) => {
          const isMet = requirement.validate(password)
          const Icon = isMet ? CheckCircle2 : Circle

          return (
            <li
              key={requirement.id}
              className={isMet ? 'text-primary flex items-center gap-2' : 'flex items-center gap-2'}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{requirement.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface ConfirmPasswordHintProps {
  readonly password: string
  readonly confirmPassword: string
}

function ConfirmPasswordHint({ password, confirmPassword }: ConfirmPasswordHintProps) {
  if (!confirmPassword) return null

  const isMatched = password.length > 0 && password === confirmPassword
  const Icon = isMatched ? CheckCircle2 : AlertCircle

  return (
    <div
      className={
        isMatched
          ? 'text-primary flex items-center gap-2'
          : 'text-destructive flex items-center gap-2'
      }
      aria-live="polite"
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{isMatched ? 'Mật khẩu xác nhận khớp' : 'Mật khẩu xác nhận chưa khớp'}</span>
    </div>
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
    <div className="border-border bg-card rounded-lg border p-5">
      <Icon
        className={accent ? 'text-secondary size-5' : 'text-primary size-5'}
        aria-hidden="true"
      />
      <p className="text-foreground mt-3 text-sm font-semibold">{title}</p>
      <p className="text-muted-foreground mt-1 text-xs leading-5">{description}</p>
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
      <FieldLabel htmlFor={id} className="text-muted-foreground text-xs font-semibold">
        {label}
      </FieldLabel>
      <Input
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        className="border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 h-11 rounded-md px-3 text-sm"
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
      <div className="bg-accent text-primary flex size-20 items-center justify-center rounded-full">
        <CheckCircle2 className="size-10" aria-hidden="true" />
      </div>
      <h2 className="text-foreground mt-6 text-2xl font-semibold">Đăng ký thành công</h2>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/login">Đến trang đăng nhập</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-secondary text-secondary hover:bg-muted h-11 rounded-md px-5 text-sm font-semibold"
          onClick={onCreateAnother}
        >
          Đăng ký tenant khác
        </Button>
      </div>
    </div>
  )
}
