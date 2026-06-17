import { personas } from '@/entities/persona/data/personas'
import type { Persona } from '@/entities/persona/model/types'

const BEACH_CHIPS = ['해변 산책', '계곡 물놀이']

export function getPersona(answers: string[][]): Persona {
  const flat = answers.flat()
  const hasBeach = flat.some(a => BEACH_CHIPS.includes(a))
  return hasBeach ? personas[1] : personas[0]
}
