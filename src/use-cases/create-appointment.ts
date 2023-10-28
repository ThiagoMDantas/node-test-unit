import { Appointment } from '../entities/appointment'
import { AppoitmentsRepository } from '../repositories/appointments-repository'

interface Request {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type Response = Appointment

export class CreateAppointment {
  constructor (
    private appointmenstRepository: AppoitmentsRepository
  ) {}

  async execute ({ customer, startsAt, endsAt }: Request): Promise<Response> {
    const overlapping = await this.appointmenstRepository.findOverWriteAppointment(
      startsAt, endsAt
    )

    if (overlapping) {
      throw new Error('Overlapping appointments')
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    })

    await this.appointmenstRepository.create(appointment)
    return appointment
  }
}
