export const SCREEN_TYPES = ['intro', 'quiz', 'loading', 'result'] as const
export type ScreenType = typeof SCREEN_TYPES[number]
