import type { Request, Response } from 'express'
import { GenerarFeedbackUseCase } from '../../application/use-cases/GenerarFeedbackUseCase'

export class FeedbackController {
  constructor(private readonly generarFeedbackUseCase: GenerarFeedbackUseCase) {}

  async generar(req: Request, res: Response): Promise<void> {
    try {
      const procesoId = Number(req.params.procesoId)
      if (isNaN(procesoId)) {
        res.status(400).json({ error: 'procesoId inválido' })
        return
      }
      const result = await this.generarFeedbackUseCase.execute(procesoId)
      res.status(201).json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(500).json({ error: message })
    }
  }
}
