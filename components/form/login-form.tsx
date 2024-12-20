'use client'

import { loginAction } from '@/app/actions/login'
import {
  LoginFormSchema,
  type TLoginFormData,
} from '@/app/actions/login/schema'
import { CustomFormField } from '@/components/form/custom-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { customToast } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const [open, setOpen] = useState(false)
  const [formState, formAction, isPending] = useActionState(
    loginAction,
    undefined
  )
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '' },
  })

  const { handleSubmit } = form

  async function onSubmit(formData: TLoginFormData) {
    startTransition(() => formAction(formData))
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
      if (formState.status <= 300) {
        getUser(formState.userId, formState.email as string)
      }
    }
  }, [formState])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="font-heading">
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomFormField
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
            />
            <Button type="submit" disabled={isPending}>
              Entrar / Cadastrar
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
