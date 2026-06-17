import type { Recommendation } from '@/entities/recommendation/model/types'

export type Persona = {
  id: string
  title: string
  subtitle: string
  description: string
  recommendations: Recommendation[]
}
