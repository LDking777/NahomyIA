import type { Request, Response } from 'express'
import { ObtenerMetricasUseCase } from '../../application/use-cases/ObtenerMetricasUseCase'
import { ObtenerLogsAuditoriaUseCase } from '../../application/use-cases/ObtenerLogsAuditoriaUseCase'

export class MetricasController {
  constructor(
    private readonly obtenerMetricasUseCase: ObtenerMetricasUseCase,
    private readonly obtenerLogsUseCase: ObtenerLogsAuditoriaUseCase,
  ) {}

  async getMetricas(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.obtenerMetricasUseCase.execute()
      res.json(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(500).json({ error: message })
    }
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const limit = Number(req.query.limit) || 50
      const offset = Number(req.query.offset) || 0
      const data = await this.obtenerLogsUseCase.execute(limit, offset)
      res.json(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(500).json({ error: message })
    }
  }
}
