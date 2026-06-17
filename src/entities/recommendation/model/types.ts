export type RecommendationCategory = '숙박' | '액티비티' | '체험'

export type Recommendation = {
  id: string
  region: string
  title: string
  category: RecommendationCategory
  imageUrl: string
}
