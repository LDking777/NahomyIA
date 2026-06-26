import type { Request, Response } from 'express'
import { EjecutarComandoUseCase } from '../../application/use-cases/EjecutarComandoUseCase'

export class ComandoController {
  constructor(private readonly ejecutarComandoUseCase: EjecutarComandoUseCase) {}

  async ejecutar(req: Request, res: Response): Promise<void> {
    try {
      const { procesoId, funcionId, ordenEjecucion } = req.body
      if (!procesoId || !funcionId || ordenEjecucion === undefined) {
        res.status(400).json({ error: 'procesoId, funcionId y ordenEjecucion requeridos' })
        return
      }
      const result = await this.ejecutarComandoUseCase.execute({
        procesoId,
        funcionId,
        ordenEjecucion,
      })
      res.status(201).json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error interno'
      res.status(500).json({ error: message })
    }
  }
}
