import { areIntervalsOverlapping } from 'date-fns'
import { Appointment } from '../../entities/appointment'
import { AppoitmentsRepository } from '../appointments-repository'

export class InMemoryAppointmentsRepository implements AppoitmentsRepository {
  public items: Appointment[] = []

  async create (appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findOverWriteAppointment (initialDate: Date, finishDate: Date): Promise<Appointment | null> {
    const overWrite = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: initialDate, end: finishDate },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    })

    if (!overWrite) {
      return null
    }

    return overWrite
  }
}
