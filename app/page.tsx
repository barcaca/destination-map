import { Recommendations } from '@/components/recommendations'
import { SectionContinents } from '@/components/section-continents'
import { UserPlaces } from '@/components/user-places'
import { verifySession } from '@/lib/dal'
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
  const session = await verifySession()

  return (
    <>
      <div className="bg-background text-foreground">
        <main className="space-y-16 py-16">
          <Recommendations recommendations={recommendations} />
          {session?.isAuth && (
            <UserPlaces user={{ id: session.userId, email: session.email }} />
          )}
          <SectionContinents groupedContinents={groupedContinents} />
        </main>
      </div>
    </>
  )
}
