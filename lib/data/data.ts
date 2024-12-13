import data from '@/json/data.json'
import type { Place } from '@/types/place'
import { generateUniqueRandomNumbers } from '../utils'

export async function fetchRecommendations() {
  const numbers = generateUniqueRandomNumbers(4, data.length)
  const recommendations = numbers.map(index => data[index])
  return recommendations
}

export async function fetchContinents() {
  const groupedContinents = data.reduce(
    (acc: { [key: string]: Place[] }, place) => {
      const continent = place.location.continent
      acc[continent] = (acc[continent] || []).concat(place)
      return acc
    },
    {}
  )
  return groupedContinents
}
