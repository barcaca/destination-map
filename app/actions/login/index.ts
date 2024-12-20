'use server'

import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { deleteSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { randomUUID } from 'node:crypto'
import { LoginFormSchema, type TLoginFormData } from './schema'

export async function loginAction(
  _prevState: unknown,
  { email }: TLoginFormData
) {
  const parsedEmail = LoginFormSchema.safeParse({ email })

  if (!parsedEmail.success) {
    return { message: parsedEmail.error.message, status: 400 }
  }

  const userId = randomUUID()
  const user = { id: userId, email }

  try {
    const url = `${BASE_URL.REST}${ENDPOINTS.USERS}`
    const response = await fetch(`${url}?email=${email}`)
    const existingUsers = await response.json()

    if (!existingUsers.length) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }

      await fetch(url, options)

      revalidatePath('/')

      return {
        message: 'Usuário criado com sucesso',
        status: 201,
        userId,
        email,
      }
    }

    const existingUser = existingUsers[0]

    return {
      message: 'Usuário logado com sucesso',
      status: 200,
      userId: existingUser.id,
      email,
    }
  } catch (error) {
    return { message: 'Erro ao processar a solicita o processo', status: 500 }
  }
}

export async function logoutAction() {
  await deleteSession()
  redirect('/')
}
