import type { Persona } from '../model/types'

export const personas: Persona[] = [
  {
    id: 'nopo',
    title: '삼시세끼 노포 정착민',
    subtitle: '화려한 핫플은 사절. 따뜻한 온기가 있는 시골 마을에서 위로받고 싶은 당신.',
    description:
      '빠르게 스쳐 지나가는 여행보다, 한 곳에 오래 머물며 그 마을의 냄새와 소리에 스며드는 여행을 사랑합니다. 유명 관광지 대신 골목 끝 낡은 국밥집, 할머니가 담근 김치 한 종지에서 진짜 위로를 찾는 사람. 이번 여행은 아무도 모르는 그 동네 단골이 되어보세요.',
    destinationIds: ['gurye', 'andong'],
  },
  {
    id: 'beach',
    title: '파도 앞 멍때리기 선수',
    subtitle: '생각이 많아질수록 바다 소리가 그리워지는 당신.',
    description:
      '머릿속이 복잡해질 때, 본능적으로 물을 찾습니다. 파도 소리가 잡념을 지워주고, 수평선 너머를 바라보다 보면 어느새 마음이 가벼워지죠. 핫플 카페나 맛집 리스트 대신, 모래사장에 발을 묻고 아무것도 하지 않는 것이 목적입니다.',
    destinationIds: ['goseong', 'jeju-aewol'],
  },
  {
    id: 'urban',
    title: '도심 감성 콜렉터',
    subtitle: '새로운 공간, 새로운 경험. 트렌드의 최전선에서 에너지를 얻는 당신.',
    description:
      '골목 끝 숨은 카페, 이번 주 새로 오픈한 팝업스토어, 루프탑에서 마시는 칵테일. 당신의 여행은 감성을 수집하는 행위입니다. 인스타 감성이 아니라, 진짜 자신의 취향을 쌓아가는 과정. 도시도 충분히 여행이 됩니다.',
    destinationIds: ['seoul-seongsu', 'busan-yeongdo'],
  },
  {
    id: 'mountain',
    title: '산속 고독 탐험가',
    subtitle: '혼자 오르는 산이 제일 무섭고, 제일 좋은 당신.',
    description:
      '정상에서 느끼는 그 충만함을 아는 사람만 압니다. 묵묵히 걷고, 깊게 숨 쉬고, 아무 말 없이 앉아서 바람 소리를 듣는 것. 가이드북에 없는 루트를 혼자 찾아가는 것이 진짜 모험입니다. 이번엔 조금 더 높이, 조금 더 깊이 들어가 봅니다.',
    destinationIds: ['inje', 'muju'],
  },
  {
    id: 'foodie',
    title: '로컬 미식 기록자',
    subtitle: '맛있는 것 앞에서는 어디든 갈 수 있는 당신.',
    description:
      '여행의 목적이 음식인 사람. 현지 재래시장을 먼저 검색하고, 할머니 손맛 식당 앞에서는 줄 서는 것도 즐겁습니다. SNS 맛집이 아닌, 현지 주민이 30년째 다니는 그 식당을 찾아내는 것이 당신의 특기. 한 끼 한 끼가 이 지역의 이야기입니다.',
    destinationIds: ['suncheon', 'yesan'],
  },
]

export function getPersonaById(id: string): Persona | undefined {
  return personas.find(p => p.id === id)
}
