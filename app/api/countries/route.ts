import countries from '@/json/countries.json'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region_id = searchParams.get('region_id')

  if (region_id) {
    const filteredCountries = countries.filter(
      country => country.region_id === Number.parseInt(region_id)
    )
    return NextResponse.json(filteredCountries)
  }

  return NextResponse.json(countries)
}
