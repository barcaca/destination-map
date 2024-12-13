import { Recommendations } from '@/components/recommendations'
import { SectionContinents } from '@/components/section-continents'

export default function Home() {
  return (
    <>
      <div className="bg-background text-foreground">
        <main className="space-y-16 py-16">
          <Recommendations />
          <SectionContinents />
        </main>
      </div>
    </>
  )
}
