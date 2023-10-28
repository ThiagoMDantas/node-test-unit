import { expect, test } from 'vitest'
import { Appointment } from '../appointments'
import { getFutureDate } from './utils/get-future-date'

test('create an appointment', () => {
  const startDate = getFutureDate('2023-08-06')
  const endDate = getFutureDate('2023-08-11')

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt: startDate,
    endsAt: endDate
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('Jhon Doe')
})

test('validate date appointment', () => {
  const startDate = new Date()
  const endDate = new Date()

  startDate.setDate(startDate.getDate() - 1)
  endDate.setDate(endDate.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt: startDate,
      endsAt: endDate
    })
  }).toThrow()
})
