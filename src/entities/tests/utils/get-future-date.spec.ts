import { expect, test } from 'vitest'
import { getFutureDate } from './get-future-date'

test('increases date with one year', () => {
  const dataAtual = new Date().getFullYear()
  const dataFutura = new Date().getFullYear() + 1
  expect(getFutureDate(`${dataAtual}-08-06`).getFullYear()).toEqual(dataFutura)
})
