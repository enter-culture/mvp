import type { Persona } from '../model/types'

export const personas: Persona[] = [
  {
    id: 'nopo',
    title: '삼시세끼 노포 정착민',
    subtitle: '화려한 핫플은 사절. 따뜻한 온기가 있는 조용한 시골 마을에서 위로받고 싶은 당신.',
    description:
      '당신은 빠르게 스쳐 지나가는 여행보다, 한 곳에 오래 머물며 그 마을의 냄새와 소리에 스며드는 여행을 사랑합니다. 유명 관광지 대신 골목 끝 낡은 국밥집, 할머니가 직접 담근 김치 한 종지에서 진짜 위로를 찾는 사람. 이번 여행은 아무도 모르는 그 동네 단골이 되어보세요.',
    recommendations: [
      {
        id: 'rec-1',
        region: '전남 구례',
        title: '별 보며 잠드는 빈집 재생 로컬 스테이',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      },
      {
        id: 'rec-2',
        region: '경북 안동',
        title: '대를 이은 시골 장터 국밥집 탐방',
        category: '액티비티',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
      },
      {
        id: 'rec-3',
        region: '충남 예산',
        title: '로컬 양조장에서 막걸리 빚기 클래스',
        category: '체험',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
      },
      {
        id: 'rec-4',
        region: '전북 남원',
        title: '지리산 둘레길 새벽 산책과 민박 조식',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
      },
    ],
  },
  {
    id: 'beach',
    title: '파도 앞 멍 때리기 선수',
    subtitle: '생각이 많아질수록 바다 소리가 그리워지는 당신.',
    description:
      '머릿속이 복잡해질 때, 당신은 본능적으로 물을 찾습니다. 파도 소리가 잡념을 지워주고, 수평선 너머를 바라보다 보면 어느새 마음이 가벼워지죠. 이번 여행은 핫플 카페나 맛집 리스트 대신, 모래사장에 발을 묻고 아무것도 하지 않는 것이 목적입니다.',
    recommendations: [
      {
        id: 'rec-5',
        region: '강원 고성',
        title: '새벽 일출을 혼자 맞이하는 비밀 해변',
        category: '액티비티',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      },
      {
        id: 'rec-6',
        region: '제주 애월',
        title: '파도 소리 들으며 자는 바다뷰 독채',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
      },
      {
        id: 'rec-7',
        region: '부산 기장',
        title: '해녀 할머니와 함께하는 조개잡이 체험',
        category: '체험',
        imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
      },
    ],
  },
]
