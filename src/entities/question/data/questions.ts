import type { Question } from '../model/types'

export const questions: Question[] = [
  {
    id: 1,
    text: '잠시 눈을 감고 상상해 보세요.\n주말 국내 여행을 생각했을 때,\n가장 마음이 끌리는 단어는?',
    chips: ['설레는', '홀가분한', '고즈넉한', '활기찬', '따뜻한', '새로운'],
    multiSelect: true,
  },
  {
    id: 2,
    text: '문을 열고 나가면 어떤 풍경이 펼쳐지나요?\n그곳에서 무엇을 하며 머물고 있을까요?',
    chips: ['산속 오두막', '해변 산책', '시골 마을', '도심 골목', '계곡 물놀이', '논밭 사이 카페'],
    multiSelect: true,
  },
  {
    id: 3,
    text: "이번 여행을 함께하고 싶은 '대상'과\n채우고 싶은 '경험'은?",
    chips: ['혼자만의 시간', '소중한 사람과', '밤샘수다', '맛집 탐방', '사진 찍기', '아무것도 안 하기'],
    multiSelect: true,
  },
]
