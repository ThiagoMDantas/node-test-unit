import { Appointment } from '../entities/appointment'

export interface AppoitmentsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverWriteAppointment(initialDate: Date, finishDate: Date): Promise<Appointment | null>;
}
