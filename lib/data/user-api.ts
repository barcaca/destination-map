'use server'

import { createSession } from '@/lib/session'

export async function getUser(id: string, email: string) {
  await createSession(id, email)
}
