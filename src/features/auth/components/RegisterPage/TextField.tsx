import * as React from 'react'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  readonly label: string
  readonly error?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, error, className, ...props }, ref) => (
    <Field className={className} data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id} className="text-muted-foreground text-xs font-semibold">
        {label}
      </FieldLabel>
      <Input
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        className="bg-card h-11 rounded-md px-3 text-sm"
        {...props}
      />
      <FieldError>{error}</FieldError>
    </Field>
  )
)
TextField.displayName = 'TextField'
