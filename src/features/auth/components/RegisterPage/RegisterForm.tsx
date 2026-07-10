'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas/register.schema'
import { ConfirmPasswordHint } from './ConfirmPasswordHint'
import { PasswordRequirementList } from './PasswordRequirementList'
import { TextField } from './TextField'

interface RegisterFormProps {
  readonly onSubmit: (values: RegisterFormValues) => Promise<void>
  readonly isLoading: boolean
}

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

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
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

  return (
    <div className="w-full">
      <header className="mb-6">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary mb-3 rounded-full"
        >
          Tạo tenant owner
        </Badge>
        <h1 className="text-foreground text-2xl leading-tight font-bold">
          Đăng ký tài khoản hệ thống
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Cung cấp thông tin doanh nghiệp và người đại diện để khởi tạo workspace SSWMS.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
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
          <FieldLabel htmlFor="address" className="text-muted-foreground text-xs font-semibold">
            Địa chỉ / Khu vực vận hành
          </FieldLabel>
          <Textarea
            id="address"
            placeholder="123 Nguyễn Huệ, TP.HCM"
            aria-invalid={Boolean(errors.address)}
            className="bg-card min-h-[80px] rounded-md px-3 py-2.5 text-sm"
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

        <Card size="sm" className="border-border bg-surface-container-low rounded-lg md:col-span-2">
          <CardContent className="text-muted-foreground space-y-2.5 text-xs leading-5">
            <PasswordRequirementList password={passwordValue} />
            <ConfirmPasswordHint password={passwordValue} confirmPassword={confirmPasswordValue} />
          </CardContent>
        </Card>

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
              <>
                <FieldLabel
                  htmlFor="acceptTerms"
                  className="text-muted-foreground block text-sm leading-5"
                >
                  Tôi đồng ý với{' '}
                  <span className="text-primary font-semibold">Điều khoản Dịch vụ</span> và{' '}
                  <span className="text-primary font-semibold">Chính sách Bảo mật</span> của SSWMS.
                </FieldLabel>
                <FieldError>{errors.acceptTerms?.message}</FieldError>
              </>
            </Field>
          )}
        />

        <div className="flex flex-col gap-3 pt-1 md:col-span-2 md:flex-row md:items-center md:justify-between">
          <small className="text-muted-foreground text-xs leading-5">
            Sau khi đăng ký, hệ thống sẽ gửi email xác minh có hiệu lực trong 15 phút.
          </small>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 cursor-pointer rounded-lg px-6 text-sm font-semibold transition-colors active:scale-[0.98] md:min-w-44"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4" aria-hidden="true" />
            )}
            Tạo tài khoản
          </Button>
        </div>
      </form>
    </div>
  )
}
