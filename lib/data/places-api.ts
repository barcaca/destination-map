'use server'
import type { Country, Place, Region, State } from '@/types/place'
import { generateUniqueRandomNumbers } from '../utils'
import { BASE_URL, ENDPOINTS } from './base'

export async function fetchPlaces(): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM`

  const response = await fetch(url, { cache: 'force-cache' })
  const places: Place[] = await response.json()

  return places
}

export async function fetchUserPlaces(userId: string): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=${userId}`

  const response = await fetch(url, { cache: 'force-cache' })
  const places: Place[] = await response.json()

  return places
}

export async function fetchRecommendations(placeData: Place[]) {
  const numbers = generateUniqueRandomNumbers(4, placeData.length)
  const recommendations = numbers.map(index => placeData[index])
  return recommendations
}

export async function fetchContinents(placeData: Place[]) {
  const groupedContinents = placeData.reduce(
    (acc: { [key: string]: Place[] }, place) => {
      const continent = place.location.continent
      acc[continent.name] = (acc[continent.name] || []).concat(place)
      return acc
    },
    {}
  )
  return groupedContinents
}

export async function fetchContinentsPlaces(continent: string) {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM&location.continent.name=${continent}`
  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}

export async function getRegions(): Promise<Region[]> {
  const res = await fetch('http://localhost:3000/api/regions')
  if (!res.ok) throw new Error('Falha a buscar regiões')
  return res.json()
}

export async function getCountries(
  regionId: string | number
): Promise<Country[]> {
  const res = await fetch(
    `http://localhost:3000/api/countries?region_id=${regionId}`
  )
  if (!res.ok) throw new Error('Falha a buscar países')
  return res.json()
}

export async function getStates(countryId: string | number): Promise<State[]> {
  const res = await fetch(
    `http://localhost:3000/api/states?country_id=${countryId}`
  )
  if (!res.ok) throw new Error('Falha a buscar estados')
  return res.json()
}
