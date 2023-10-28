import { setYear, parseISO } from 'date-fns'

/**
 * Receives "2022-08-06" and returns "2023-08-06"
*/

export function getFutureDate (date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}
