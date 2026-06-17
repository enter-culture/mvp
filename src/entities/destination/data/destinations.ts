import type { Destination } from '../model/types'

export const destinations: Destination[] = [
  {
    id: 'gurye',
    personaId: 'nopo',
    region: '전남 구례',
    title: '별 보며 잠드는 빈집 재생 로컬 스테이',
    mood: '고즈넉한 · 정겨운 · 아늑한',
    description:
      '지리산 자락 아래, 오래된 빈집을 정성껏 되살린 로컬 스테이. 밤이면 쏟아지는 별빛과 새벽 산안개가 지친 마음을 씻어줍니다. 마을 할머니가 만들어주시는 산채 한 상은 덤입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/4113548/4113548-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    spots: [
      { name: '산동 산수유마을', description: '봄이면 노란 산수유꽃이 온 마을을 물들이는 곳' },
      { name: '연곡사', description: '지리산 깊은 곳에 자리한 천년 고찰, 단풍이 특히 아름다움' },
      { name: '섬진강 강변길', description: '자전거로 느리게 달리는 섬진강변 5km 코스' },
    ],
    tags: ['혼자만의시간', '자연 힐링', '불멍', '걷기여행', '고즈넉한'],
  },
  {
    id: 'andong',
    personaId: 'nopo',
    region: '경북 안동',
    title: '대를 이은 골목 노포와 하회마을 탐방',
    mood: '정겨운 · 그리운 · 편안한',
    description:
      '600년 전통의 하회마을 돌담길을 걷고, 골목마다 숨어있는 50년 된 찜닭집과 간고등어 노포를 찾아다니는 여행. 안동 특유의 느린 시간 속에서 진짜 한국의 정취를 느낍니다.',
    videoUrl: 'https://videos.pexels.com/video-files/8093283/8093283-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    ],
    spots: [
      { name: '하회마을', description: 'UNESCO 세계유산, 류씨 종가와 고택이 살아 숨 쉬는 곳' },
      { name: '안동찜닭 골목', description: '원조 안동찜닭 가게들이 모인 구시장 골목' },
      { name: '월영교', description: '낙동강 위 우리나라 최장 목책교, 야경이 특히 아름다움' },
    ],
    tags: ['골목노포', '역사탐방', '로컬미식', '한옥마을', '정겨운'],
  },
  {
    id: 'goseong',
    personaId: 'beach',
    region: '강원 고성',
    title: '새벽 일출을 혼자 맞이하는 비밀 해변',
    mood: '자유로운 · 웅장한 · 낭만적인',
    description:
      '설악산과 동해가 만나는 경계, 고성. 아직 알려지지 않은 작은 해변에서 새벽 4시 일출을 맞이하는 경험은 평생 잊히지 않습니다. 맑은 날이면 멀리 금강산 능선까지 보입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1943821/1943821-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    ],
    spots: [
      { name: '아야진 해변', description: '투명한 에메랄드 물빛, 아직 덜 알려진 한적한 해변' },
      { name: '건봉사', description: '신라 시대 창건된 고찰, 소나무 숲길이 일품' },
      { name: '화진포 해양박물관', description: '이승만·김일성 별장이 있던 호수와 바다가 만나는 곳' },
    ],
    tags: ['혼자만의시간', '일출감상', '드라이브', '노을감상', '자유로운'],
  },
  {
    id: 'jeju-aewol',
    personaId: 'beach',
    region: '제주 애월',
    title: '파도 소리 들으며 자는 바다뷰 독채',
    mood: '몽환적인 · 낭만적인 · 편안한',
    description:
      '애월 해안도로를 따라 숨어있는 독채 숙소. 창문을 열면 바다가 바로 코앞. 밤새 파도 소리를 들으며 아무것도 하지 않는 것이 목적인 여행입니다. 인근 카페들은 덤.',
    videoUrl: 'https://videos.pexels.com/video-files/3168516/3168516-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '애월 해안도로', description: '드라이브 성지, 일몰 시간대에 특히 황금빛으로 물듦' },
      { name: '한담 해변', description: '현무암 바위와 에메랄드 바다의 조화가 독특한 소규모 해변' },
      { name: '협재 해수욕장', description: '비양도를 배경으로 한 제주 최고 수평선 뷰' },
    ],
    tags: ['독채펜션', '오션뷰', '즉흥여행', '멍때리기', '낭만적인'],
  },
  {
    id: 'seoul-seongsu',
    personaId: 'urban',
    region: '서울 성수',
    title: '팝업스토어 & 루프탑 카페 감성 투어',
    mood: '트렌디한 · 활기찬 · 인스타감성',
    description:
      '매주 새로운 팝업이 열리는 성수동. 오래된 공장 건물이 힙한 공간으로 변신한 이곳은 서울에서 가장 빠르게 진화하는 동네. 루프탑에서 바라보는 한강뷰도 놓치지 마세요.',
    videoUrl: 'https://videos.pexels.com/video-files/3997277/3997277-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80',
    ],
    spots: [
      { name: '성수 팝업 거리', description: '주말마다 다른 브랜드 팝업이 열리는 핫플 밀집 지역' },
      { name: '어니언 성수', description: '오래된 정수장을 개조한 인더스트리얼 카페의 원조' },
      { name: '서울숲', description: '성수동과 붙어있는 도심 속 공원, 피크닉 명소' },
    ],
    tags: ['팝업스토어', '인스타감성', '루프탑', '트렌디한', '소품샵투어'],
  },
  {
    id: 'busan-yeongdo',
    personaId: 'urban',
    region: '부산 영도',
    title: '감성 골목 & 오션뷰 루프탑 카페 탐방',
    mood: '낭만적인 · 트렌디한 · 이국적인',
    description:
      '부산의 숨겨진 보석, 영도. 흰여울 문화마을의 좁은 골목을 걸으며 바다를 내려다보고, 예술가들이 모여드는 감성 카페와 로컬 브루어리를 발견하는 여행.',
    videoUrl: 'https://videos.pexels.com/video-files/2518241/2518241-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    ],
    spots: [
      { name: '흰여울 문화마을', description: '절벽 위 골목에 형성된 감성 마을, 영화 촬영지' },
      { name: '태종대', description: '기암괴석과 푸른 바다가 어우러진 영도 끝 절경' },
      { name: '깡깡이 예술마을', description: '조선소 지역이 예술로 재탄생한 부산의 힙한 공간' },
    ],
    tags: ['야경', '오션뷰', '인생샷', '동네산책', '이국적인'],
  },
  {
    id: 'inje',
    personaId: 'mountain',
    region: '강원 인제',
    title: '하얀 자작나무 숲 트레킹과 고독한 새벽',
    mood: '웅장한 · 차분한 · 충만한',
    description:
      '강원도 인제 원대리 자작나무 숲. 하얀 나무 기둥들이 빽빽하게 들어선 숲속을 혼자 걸으며 자신과 대화하는 시간. 이른 새벽 안개 속 자작나무 숲은 또 다른 세계입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '원대리 자작나무 숲', description: '138ha 규모, 왕복 3시간 트레킹, 새벽 입산 가능' },
      { name: '설악산 백담사', description: '만해 한용운이 머물렀던 천년 고찰과 계곡' },
      { name: '내린천', description: '래프팅의 성지, 투명한 계곡물이 흐르는 청정 지역' },
    ],
    tags: ['트레킹', '깊은산속', '혼자만의시간', '마음비우기', '산림욕'],
  },
  {
    id: 'muju',
    personaId: 'mountain',
    region: '전북 무주',
    title: '덕유산 설천봉 케이블카와 고원의 밤하늘',
    mood: '웅장한 · 뭉클한 · 평화로운',
    description:
      '곤돌라를 타고 1520m 설천봉에 오르면 구름 위의 세상이 펼쳐집니다. 겨울엔 설원, 여름엔 초록 융단. 무주 반딧불 축제 시즌엔 오염되지 않은 밤하늘에 반딧불이가 수를 놓습니다.',
    videoUrl: 'https://videos.pexels.com/video-files/4113548/4113548-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    ],
    spots: [
      { name: '덕유산 설천봉', description: '케이블카로 오를 수 있는 1520m 고원, 사계절 절경' },
      { name: '무주 반딧불 축제', description: '오염되지 않은 청정 지역에서 만나는 반딧불이' },
      { name: '구천동 계곡', description: '무주 구천동 33경, 33개의 절경이 이어지는 계곡 트레킹' },
    ],
    tags: ['패러글라이딩', '지역축제', '가족과함께', '웅장한', '북스테이'],
  },
  {
    id: 'suncheon',
    personaId: 'foodie',
    region: '전남 순천',
    title: '낙안읍성 향토 밥상과 시골 오일장 탐방',
    mood: '정겨운 · 뿌듯한 · 충만한',
    description:
      '살아있는 민속촌 낙안읍성에서 진짜 한옥 민박을 경험하고, 5일장이 서는 날 오일장에서 할머니 손맛 향토 음식을 맛보는 여행. 순천만 갈대밭의 노을은 말이 필요 없습니다.',
    videoUrl: 'https://videos.pexels.com/video-files/8093283/8093283-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80',
    ],
    spots: [
      { name: '낙안읍성', description: '600년 역사의 살아있는 읍성 민속촌, 민박 가능' },
      { name: '순천 오일장', description: '매달 2·7일 열리는 전통 오일장, 향토 음식 천국' },
      { name: '순천만 습지', description: 'UNESCO 람사르 습지, 갈대밭 노을이 장관' },
    ],
    tags: ['시골오일장', '로컬미식', '한옥마을', '현지인처럼', '정겨운'],
  },
  {
    id: 'yesan',
    personaId: 'foodie',
    region: '충남 예산',
    title: '예당호 황금 물빛과 로컬 양조장 막걸리 빚기',
    mood: '뿌듯한 · 아늑한 · 낭만적인',
    description:
      '충청도의 숨은 미식 성지, 예산. 예당호 출렁다리를 건너 석양을 감상하고, 대를 이어 막걸리를 빚는 양조장에서 직접 술을 담그는 미식 클래스를 경험합니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '예당호 출렁다리', description: '국내 최장 402m 출렁다리, 호수 위를 걷는 특별한 경험' },
      { name: '예산 양조장', description: '3대째 이어온 전통 막걸리 양조장, 빚기 클래스 운영' },
      { name: '예산 시장 순대국밥', description: '60년 전통 시장 국밥, 새벽 4시부터 문을 여는 노포' },
    ],
    tags: ['미식클래스', '로컬미식', '이색체험', '가성비', '뿌듯한'],
  },
]

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id)
}

export function getDestinationsByPersona(personaId: string): Destination[] {
  return destinations.filter(d => d.personaId === personaId)
}
