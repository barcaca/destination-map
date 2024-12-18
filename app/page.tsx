import { Recommendations } from '@/components/recommendations'
import { SectionContinents } from '@/components/section-continents'
import {
  fetchContinents,
  fetchPlaces,
  fetchRecommendations,
} from '@/lib/data/places-api'

export default async function Home() {
  const places = await fetchPlaces()
  const [groupedContinents, recommendations] = await Promise.all([
    fetchContinents(places),
    fetchRecommendations(places),
  ])
  return (
    <>
      <div className="bg-background text-foreground">
        <main className="space-y-16 py-16">
          <Recommendations recommendations={recommendations} />
          <SectionContinents groupedContinents={groupedContinents} />
        </main>
      </div>
    </>
  )
}
