import { personas } from '@/entities/persona/data/personas'
import type { Persona } from '@/entities/persona/model/types'

const BEACH_CHIPS = ['해변 산책', '계곡 물놀이']

export function getPersona(answers: string[][]): Persona {
  const flat = answers.flat()
  const hasBeach = flat.some(a => BEACH_CHIPS.includes(a))
  const id = hasBeach ? 'beach' : 'nopo'
  return personas.find(p => p.id === id) ?? personas[0]
}
