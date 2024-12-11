export type Location = {
  continent: string
  country: string
  state: string
}

export type Place = {
  id: number
  title: string
  description: string
  location: Location
  images: string[]
  favorite: boolean
}
