import { personas, getPersonaById } from '@/entities/persona/data/personas'
import type { Persona } from '@/entities/persona/model/types'

const PERSONA_CHIPS: Record<string, string[]> = {
  nopo: ['고즈넉한', '정겨운', '편안한', '아늑한', '그리운', '위로가 되는', '불멍', '골목노포', '한옥마을', '시골오일장', '템플스테이', '촌캉스', '걷기여행', '휴식여행', '발길 닿는대로'],
  beach: ['자유로운', '이국적인', '낭만적인', '몽환적인', '짜릿한', '도망치고 싶은', '서핑', '오션뷰', '즉흥여행', '노을감상', '멍때리기', '독채펜션', '드라이브'],
  urban: ['트렌디한', '활기찬', '설레는', '인생샷', '팝업스토어', '루프탑', '인스타감성', '야경', '전시관람', '로컬 쇼핑', '소품샵투어', '플렉스', '알찬 일정'],
  mountain: ['차분한', '웅장한', '충만한', '뭉클한', '평화로운', '트레킹', '깊은산속', '산림욕', '마음비우기', '북스테이', '패러글라이딩', '발길 닿는대로', '기차여행'],
  foodie: ['뿌듯한', '맛집탐방', '로컬미식', '미식클래스', '시골오일장', '골목노포', '현지인처럼', '지역축제', '이색체험', '가성비', '로컬 쇼핑'],
}

export function getPersona(answers: string[][]): Persona {
  const flat = answers.flat()
  const scores: Record<string, number> = { nopo: 0, beach: 0, urban: 0, mountain: 0, foodie: 0 }

  for (const chip of flat) {
    for (const [personaId, chips] of Object.entries(PERSONA_CHIPS)) {
      if (chips.includes(chip)) scores[personaId]++
    }
  }

  const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return getPersonaById(topId) ?? personas[0]
}
