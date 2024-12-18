import states from '@/json/states.json'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country_id = searchParams.get('country_id')

  if (country_id) {
    const filteredStates = states.filter(
      state => state.country_id === Number.parseInt(country_id)
    )
    return NextResponse.json(filteredStates)
  }

  return NextResponse.json(states)
}
