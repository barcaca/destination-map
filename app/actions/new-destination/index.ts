'use server'

import { verifySession } from '@/lib/dal'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'node:crypto'
import { NewDestinationFormSchema, type TNewDestinationData } from './schema'

export async function newDestinationAction(
  prevState: unknown,
  formData: TNewDestinationData
) {
  const validation = NewDestinationFormSchema.safeParse(formData)

  if (!validation.success)
    return { message: validation.error.message, status: 400 }

  const user = await verifySession()

  if (!user?.isAuth) return { message: 'Não há usuário logado', status: 401 }

  const validationData = validation.data
  const validationDataWithId = {
    id: randomUUID(),
    ...validationData,
    user_id: user.userId,
  }

  try {
    const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationDataWithId),
    }

    const response = await fetch(url, options)
    revalidatePath('/')

    return { message: 'Destino criado com sucesso', status: 200 }
  } catch (error) {
    return { message: 'Erro ao criar o destino', status: 500 }
  }
}
