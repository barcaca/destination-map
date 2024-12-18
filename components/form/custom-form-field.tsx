import { ErrorTooltip } from '@/components/form/error-tooltip'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'

interface CustomFormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'textarea'
}

export function CustomFormField({
  name,
  label,
  placeholder,
  type = 'text',
}: CustomFormFieldProps) {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea rows={5} placeholder={placeholder} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <ErrorTooltip fieldState={fieldState} />
        </FormItem>
      )}
    />
  )
}
