export type Spot = {
  name: string
  description: string
}

export type Destination = {
  id: string
  personaId: string
  region: string
  title: string
  mood: string
  description: string
  videoUrl: string
  images: string[]
  spots: Spot[]
  tags: string[]
}
