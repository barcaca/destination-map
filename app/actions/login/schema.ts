import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
})

export const LoginFormSchema = formSchema
export type TLoginFormData = z.infer<typeof LoginFormSchema>
