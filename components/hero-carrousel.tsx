import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel'

import Image from 'next/image'

import carrouselImage1 from '@/public/1-sean-oulashin-unsplash.jpg'
import carrouselImage2 from '@/public/2-johannes-krupinski-unsplash.jpg'
import carrouselImage3 from '@/public/3-holly-mandarich-unsplash.jpg'

const slides = [
  {
    id: 1,
    title: 'Explore praias paradisíacas"',
    image: carrouselImage1,
    alt: 'beira mar durante a hora dourada',
  },
  {
    id: 2,
    title: 'Descubra novos destinos',
    image: carrouselImage2,
    alt: 'uma vista de uma aldeia em um lado da montanha',
  },
  {
    id: 3,
    title: 'Planeje sua próxima aventura',
    image: carrouselImage3,
    alt: 'pessoa carregando mochila amarela e preta caminhando entre plantas verdes',
  },
]

export function HeroCarrousel() {
  return (
    <div className="relative w-full" aria-label="Destaques do Destination Map">
      <Carousel opts={{ loop: true }} autoPlay autoPlayInterval={5000}>
        <CarouselContent>
          {slides.map(slide => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[80vh] w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  className="object-cover"
                  priority
                  fill
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-center font-bold text-4xl text-white md:text-6xl">
                      {slide.title}
                    </h1>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  )
}