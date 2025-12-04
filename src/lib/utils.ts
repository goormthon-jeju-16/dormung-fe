import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePeriodLabel(createdAt: string): string {
  const now = new Date()
  const created = new Date(createdAt)
  const diffTime = now.getTime() - created.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  const diffMonths = diffDays / 30

  if (diffMonths < 1) {
    return '신규'
  } else if (diffMonths < 2) {
    return '1달'
  } else if (diffMonths < 3) {
    return '3달'
  } else {
    return '3달 이상'
  }
}
