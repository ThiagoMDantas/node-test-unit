import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../entities/tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const startDate = getFutureDate('2023-08-06')
    const endDate = getFutureDate('2023-08-07')

    const appointmenstRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmenstRepository)

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: startDate,
      endsAt: endDate
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not to be able to create an appointment overlapping dates', async () => {
    const startDate = getFutureDate('2023-08-06')
    const endDate = getFutureDate('2023-08-15')

    const appointmenstRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmenstRepository)

    await createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: startDate,
      endsAt: endDate
    })

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2023-08-07'),
      endsAt: getFutureDate('2023-08-11')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2023-08-10'),
      endsAt: getFutureDate('2023-08-15')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt: getFutureDate('2023-08-11'),
      endsAt: getFutureDate('2023-08-19')
    })).rejects.toBeInstanceOf(Error)
  })
})
