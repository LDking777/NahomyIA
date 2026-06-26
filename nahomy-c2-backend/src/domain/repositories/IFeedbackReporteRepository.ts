import { FeedbackReporte } from '../entities/FeedbackReporte'

export interface IFeedbackReporteRepository {
  findById(id: number): Promise<FeedbackReporte | null>
  findByProcesoId(procesoId: number): Promise<FeedbackReporte | null>
  save(feedback: FeedbackReporte): Promise<number>
  update(feedback: FeedbackReporte): Promise<void>
}
